use crate::http_client;
use serde::{Deserialize, Serialize};
use std::fs;
use std::process::{Command, Stdio};
use std::sync::atomic::AtomicBool;
use std::sync::Arc;
use tauri::{AppHandle, Manager};

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

// NOTE: VC_REDIST_GUIDE_URL should not be hardcoded here anymore.
// Frontend will construct the full guide URL based on the configured `officialWebsite`.

// Global state for agent monitor
lazy_static::lazy_static! {
    static ref MONITOR_RUNNING: Arc<AtomicBool> = Arc::new(AtomicBool::new(false));
    static ref MONITOR_ENABLED: Arc<AtomicBool> = Arc::new(AtomicBool::new(true));
    // Pause flag to temporarily prevent auto-restart during updates
    static ref MONITOR_PAUSED: Arc<AtomicBool> = Arc::new(AtomicBool::new(false));
}

#[cfg(target_os = "windows")]
fn has_vc_runtime() -> bool {
    use std::path::PathBuf;

    let system_root = std::env::var("SystemRoot").unwrap_or_else(|_| "C:\\Windows".to_string());
    let candidates = [
        PathBuf::from(&system_root).join("System32\\vcruntime140.dll"),
        PathBuf::from(&system_root).join("System32\\vcruntime140_1.dll"),
        PathBuf::from(&system_root).join("SysWOW64\\vcruntime140.dll"),
        PathBuf::from(&system_root).join("SysWOW64\\vcruntime140_1.dll"),
    ];

    candidates.iter().any(|path| path.exists())
}

// Agent monitor configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentMonitorConfig {
    pub enabled: bool,
    pub check_interval_seconds: u64,
    pub max_restart_attempts: u32,
    pub restart_cooldown_seconds: u64,
}

impl Default for AgentMonitorConfig {
    fn default() -> Self {
        Self {
            enabled: true,
            check_interval_seconds: 10,
            max_restart_attempts: 3,
            restart_cooldown_seconds: 30,
        }
    }
}

// Agent monitor state info for frontend
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentMonitorState {
    pub is_monitoring: bool,
    pub is_enabled: bool,
    pub is_paused: bool,
    pub restart_count: u32,
    pub last_restart_time: Option<String>,
}

// Report distributor installation to agent using common agent request logic
async fn report_distributor_install(app_handle: AppHandle) {
    // Get distributor code from environment variable
    let distributor_code =
        std::env::var("DISTRIBUTOR_CODE").unwrap_or_else(|_| "OFFICIAL".to_string());

    // Get app version
    let app_version = app_handle.package_info().version.to_string();

    let os_type = std::env::consts::OS;
    let os_arch = std::env::consts::ARCH;
    let os_version = &format!("{} ({})", os_type, os_arch);

    log::info!(
        "Reporting distributor install: distributor={}, version={}, os={}",
        distributor_code,
        app_version,
        os_version,
    );

    // Build request payload
    let payload = serde_json::json!({
        "distributor_code": distributor_code,
        "app_version": app_version,
        "os_version": os_version,
    });

    // Call agent API using common http_client module
    match http_client::agent_request(
        app_handle.clone(),
        "POST".to_string(),
        "/api/report_distributor_install".to_string(),
        None,          // params
        None,          // headers
        None,          // body
        None,          // form
        Some(payload), // data
        Some(30),      // timeout
        false,         // raw_response
        None,          // response_type
    )
    .await
    {
        Ok(response) => {
            log::info!("Distributor install reported successfully: {:?}", response);
        }
        Err(e) => {
            log::error!("Failed to report distributor install: {}", e);
        }
    }
}

// Initialization result for the entire startup process
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InitializationResult {
    pub success: bool,
    pub agent_status: AgentStatus,
    pub updates_checked: bool,
    pub updates_applied: Vec<String>,
    pub error: String,
    pub tauri_update: Option<crate::update_manager::TauriUpdateInfo>,
}

// Initialization options
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InitOptions {
    pub check_updates: bool,
    pub silent: bool,
    #[serde(default)]
    pub check_tauri_update: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentStatus {
    pub running: bool,
    pub process_name: String,
    pub error: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentStartResult {
    pub success: bool,
    pub error_type: String, // "notfound", "port", "timeout", "start"
    pub process_name: String,
    pub message: String,
}

// Check if agent is running by checking port 50809
pub fn check_agent_running() -> AgentStatus {
    use std::net::TcpListener;

    let port = 50809;
    match TcpListener::bind(("0.0.0.0", port)) {
        Ok(_) => {
            log::info!("Agent is not running on port {}", port);
            AgentStatus {
                running: false,
                process_name: String::new(),
                error: String::new(),
            }
        }
        Err(_) => {
            log::debug!("Agent is running on port {}", port);
            let process_name = get_process_using_port(port);
            AgentStatus {
                running: true,
                process_name,
                error: String::new(),
            }
        }
    }
}

// Get the process name using a specific port
fn get_process_using_port(port: u16) -> String {
    #[cfg(target_os = "windows")]
    {
        use std::process::Command;

        let mut command = Command::new("netstat");
        command.args(&["-ano"]);
        command.creation_flags(0x08000000); // Hide console window

        if let Ok(output) = command.output() {
            if output.status.success() {
                let output_str = String::from_utf8_lossy(&output.stdout);
                if let Some(line) = output_str
                    .lines()
                    .find(|line| line.contains(&format!(":{}", port)))
                {
                    if let Some(pid) = line.split_whitespace().last() {
                        let mut tasklist = Command::new("tasklist");
                        tasklist.args(&["/FI", &format!("PID eq {}", pid)]);
                        tasklist.creation_flags(0x08000000);

                        if let Ok(task_output) = tasklist.output() {
                            let task_str = String::from_utf8_lossy(&task_output.stdout);
                            if let Some(process_line) = task_str.lines().nth(3) {
                                let process_name =
                                    process_line.split_whitespace().next().unwrap_or("unknown");
                                log::debug!(
                                    "Process using port {}: {} (PID: {})",
                                    port,
                                    process_name,
                                    pid
                                );
                                return process_name.to_string();
                            }
                        }
                    }
                }
            }
        }
        String::new()
    }

    #[cfg(target_os = "macos")]
    {
        use std::process::Command;

        let mut command = Command::new("lsof");
        command.args(&["-i", &format!(":{}", port)]);

        if let Ok(output) = command.output() {
            if output.status.success() {
                let output_str = String::from_utf8_lossy(&output.stdout);
                if let Some(line) = output_str.lines().nth(1) {
                    let process_name = line.split_whitespace().next().unwrap_or("unknown");
                    log::debug!("Process using port {}: {}", port, process_name);
                    return process_name.to_string();
                }
            }
        }
        String::new()
    }
}

// Start agent process
pub fn start_agent_process(app_handle: &AppHandle) -> Result<AgentStartResult, String> {
    // Check if agent is already running
    let status = check_agent_running();

    if status.running {
        // Check if it's our agent
        if status.process_name == "agent.exe" || status.process_name == "agent" {
            log::info!("Agent is already running");
            return Ok(AgentStartResult {
                success: true,
                error_type: String::new(),
                process_name: status.process_name,
                message: "Agent is already running".to_string(),
            });
        } else {
            let pname = status.process_name.clone();
            log::warn!("Port 50809 is occupied by: {}", pname);
            return Ok(AgentStartResult {
                success: false,
                error_type: "port".to_string(),
                process_name: status.process_name,
                message: format!("Port 50809 is occupied by {}", pname),
            });
        }
    }

    // Get agent binary path
    let app_data_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data directory")?;

    #[cfg(target_os = "windows")]
    let agent_filename = "agent.exe";

    #[cfg(target_os = "macos")]
    let agent_filename = "agent";

    let agent_path = app_data_dir.join("bin").join(agent_filename);

    // Check if agent binary exists
    if !agent_path.exists() {
        log::error!("Agent binary not found at: {:?}", agent_path);
        return Ok(AgentStartResult {
            success: false,
            error_type: "notfound".to_string(),
            process_name: String::new(),
            message: format!("Agent binary not found at: {:?}", agent_path),
        });
    }

    // Ensure required redistributables are available before starting agent
    #[cfg(target_os = "windows")]
    {
        if !has_vc_runtime() {
            // Don't include full guide URL here; frontend will construct link from officialWebsite
            let message = "missing_vc_runtime: Microsoft Visual C++ Redistributable is not installed. Please follow the troubleshooting guide.".to_string();
            log::warn!("{}", message);
            return Ok(AgentStartResult {
                success: false,
                error_type: "runtime".to_string(),
                process_name: String::new(),
                message,
            });
        }
    }

    // Start agent process
    log::info!("Starting agent from: {:?}", agent_path);

    #[cfg(target_os = "windows")]
    {
        let mut command = Command::new(&agent_path);
        command.creation_flags(0x08000000); // Hide console window
        command.stdout(Stdio::piped());
        command.stderr(Stdio::piped());

        match command.spawn() {
            Ok(mut child) => {
                let pid = child.id();
                log::info!("Agent started with PID: {}", pid);

                // Save PID to file
                let pid_file = app_data_dir.join("agent.pid");
                if let Err(e) = fs::write(&pid_file, pid.to_string()) {
                    log::warn!("Failed to write PID file: {}", e);
                }
                if cfg!(debug_assertions) {
                    //output the stdout and stderr for debugging
                    let (mut stdout, mut stderr) =
                        (child.stdout.take().unwrap(), child.stderr.take().unwrap());
                    std::thread::spawn(move || {
                        use std::io::{BufRead, BufReader};
                        let reader = BufReader::new(&mut stdout);
                        for line in reader.lines() {
                            if let Ok(l) = line {
                                log::info!("[agent stdout] {}", l);
                            }
                        }
                    });
                    std::thread::spawn(move || {
                        use std::io::{BufRead, BufReader};
                        let reader = BufReader::new(&mut stderr);
                        for line in reader.lines() {
                            if let Ok(l) = line {
                                log::info!("[agent stderr] {}", l);
                            }
                        }
                    });
                }

                Ok(AgentStartResult {
                    success: true,
                    error_type: String::new(),
                    process_name: agent_filename.to_string(),
                    message: format!("Agent started with PID: {}", pid),
                })
            }
            Err(e) => {
                log::error!("Failed to start agent: {}", e);
                Ok(AgentStartResult {
                    success: false,
                    error_type: "start".to_string(),
                    process_name: String::new(),
                    message: format!("Failed to start agent: {}", e),
                })
            }
        }
    }

    #[cfg(target_os = "macos")]
    {
        match Command::new(&agent_path)
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
        {
            Ok(child) => {
                let pid = child.id();
                log::info!("Agent started with PID: {}", pid);

                // Save PID to file
                let pid_file = app_data_dir.join("agent.pid");
                if let Err(e) = fs::write(&pid_file, pid.to_string()) {
                    log::warn!("Failed to write PID file: {}", e);
                }

                Ok(AgentStartResult {
                    success: true,
                    error_type: String::new(),
                    process_name: agent_filename.to_string(),
                    message: format!("Agent started with PID: {}", pid),
                })
            }
            Err(e) => {
                log::error!("Failed to start agent: {}", e);
                Ok(AgentStartResult {
                    success: false,
                    error_type: "start".to_string(),
                    process_name: String::new(),
                    message: format!("Failed to start agent: {}", e),
                })
            }
        }
    }
}

// Wait for agent to be ready by checking port.txt
pub async fn wait_agent_ready(
    app_handle: &AppHandle,
    timeout_seconds: u64,
) -> Result<bool, String> {
    let app_data_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data directory")?;

    let port_file = app_data_dir.join("port.txt");

    for i in 0..timeout_seconds {
        tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;

        if let Ok(content) = fs::read_to_string(&port_file) {
            if let Ok(port) = content.trim().parse::<u16>() {
                if port > 0 {
                    log::info!("Agent is ready on port: {}", port);
                    //wait 1s
                    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
                    return Ok(true);
                }
            }
        }

        log::debug!("Waiting for agent... ({}/{})", i + 1, timeout_seconds);
    }

    log::error!(
        "Agent did not become ready within {} seconds",
        timeout_seconds
    );
    Ok(false)
}

// Shutdown agent and script processes
pub fn shutdown_processes(app_handle: &AppHandle) {
    #[cfg(target_os = "windows")]
    {
        // Kill agent
        let mut command = Command::new("taskkill");
        command.creation_flags(0x08000000);
        command.args(&["/F", "/IM", "agent.exe"]);
        if let Err(e) = command.status() {
            log::warn!("Failed to kill agent.exe: {}", e);
        } else {
            log::info!("Killed agent.exe");
        }

        // Kill script
        let mut command = Command::new("taskkill");
        command.creation_flags(0x08000000);
        command.args(&["/F", "/IM", "script.exe"]);
        if let Err(e) = command.status() {
            log::warn!("Failed to kill script.exe: {}", e);
        } else {
            log::info!("Killed script.exe");
        }
    }

    #[cfg(target_os = "macos")]
    {
        // Kill agent
        let mut command = Command::new("pkill");
        command.args(&["-f", "agent"]);
        if let Err(e) = command.status() {
            log::warn!("Failed to kill agent: {}", e);
        } else {
            log::info!("Killed agent");
        }

        // Kill script
        let mut command = Command::new("pkill");
        command.args(&["-f", "script"]);
        if let Err(e) = command.status() {
            log::warn!("Failed to kill script: {}", e);
        } else {
            log::info!("Killed script");
        }
    }

    // Clear PID file
    if let Some(app_data_dir) = app_handle.path_resolver().app_data_dir() {
        let pid_file = app_data_dir.join("agent.pid");
        if let Err(e) = fs::write(&pid_file, "") {
            log::warn!("Failed to clear PID file: {}", e);
        }
    }
}

// Tauri commands
#[tauri::command]
pub fn check_agent_status() -> AgentStatus {
    check_agent_running()
}

#[tauri::command]
pub fn start_agent(app_handle: AppHandle) -> Result<AgentStartResult, String> {
    start_agent_process(&app_handle)
}

#[tauri::command]
pub async fn wait_for_agent_ready(
    app_handle: AppHandle,
    timeout_seconds: u64,
) -> Result<bool, String> {
    wait_agent_ready(&app_handle, timeout_seconds).await
}

#[tauri::command]
pub fn shutdown_agent(app_handle: AppHandle) {
    shutdown_processes(&app_handle);
}

// Unified initialization process
#[tauri::command]
pub async fn initialize_app(
    app_handle: AppHandle,
    options: InitOptions,
) -> Result<InitializationResult, String> {
    log::info!("Starting app initialization with options: {:?}", options);

    let mut result = InitializationResult {
        success: false,
        agent_status: check_agent_running(),
        updates_checked: false,
        updates_applied: Vec::new(),
        error: String::new(),
        tauri_update: None,
    };

    // Emit initialization started event
    app_handle
        .emit_all(
            "INIT_STATUS",
            &serde_json::json!({
                "stage": "started",
                "message": "Initialization started"
            }),
        )
        .ok();

    // Step 0: Check Tauri app updates if requested (only in non-silent mode)
    // Tauri updates require user interaction for confirmation dialogs,
    // so we skip this in silent/background mode (e.g., auto-update timer)
    if options.check_tauri_update && !options.silent {
        app_handle
            .emit_all(
                "INIT_STATUS",
                &serde_json::json!({
                    "stage": "checking_tauri_update",
                    "message": "Checking for application updates..."
                }),
            )
            .ok();

        match crate::update_manager::check_tauri_update(&app_handle).await {
            Ok(update_info) => {
                log::info!("Tauri update check result: {:?}", update_info);
                result.tauri_update = Some(update_info);
            }
            Err(e) => {
                log::error!("Failed to check Tauri updates: {}", e);
                // Don't fail initialization, just log the error
            }
        }
    }

    // Step 1: Check updates if requested
    if options.check_updates {
        // Check and process library updates
        match check_and_process_library_updates(&app_handle, options.silent).await {
            Ok(updates_applied) => {
                result.updates_checked = true;
                result.updates_applied = updates_applied;
            }
            Err(e) => {
                log::error!("Failed to check/process library updates: {}", e);
                result.error = e;
            }
        }
    }

    // Step 2: Check and start agent
    app_handle
        .emit_all(
            "INIT_STATUS",
            &serde_json::json!({
                "stage": "starting_agent",
                "message": "Starting agent..."
            }),
        )
        .ok();

    result.agent_status = check_agent_running();

    if !result.agent_status.running {
        // Agent not running, start it
        match start_agent_process(&app_handle) {
            Ok(start_result) => {
                if start_result.success {
                    // Wait for agent to be ready
                    match wait_agent_ready(&app_handle, 10).await {
                        Ok(ready) => {
                            if ready {
                                result.success = true;
                                // Agent is confirmed ready by wait_agent_ready, don't re-check
                                // to avoid timing issues with port detection
                                result.agent_status = AgentStatus {
                                    running: true,
                                    process_name: "agent.exe".to_string(),
                                    error: String::new(),
                                };

                                app_handle
                                    .emit_all(
                                        "INIT_STATUS",
                                        &serde_json::json!({
                                            "stage": "completed",
                                            "message": "Initialization completed successfully"
                                        }),
                                    )
                                    .ok();

                                // Emit agent_started event for backward compatibility
                                app_handle
                                    .emit_all("agent_started", &serde_json::json!({}))
                                    .ok();

                                // Report distributor installation after agent is ready
                                tokio::spawn(report_distributor_install(app_handle.clone()));

                                // Start agent monitor after agent is successfully started
                                let monitor_handle = app_handle.clone();
                                tokio::spawn(async move {
                                    start_agent_monitor(
                                        monitor_handle,
                                        AgentMonitorConfig::default(),
                                    )
                                    .await;
                                });
                            } else {
                                result.error = "Agent startup timeout".to_string();
                            }
                        }
                        Err(e) => {
                            result.error = format!("Failed to wait for agent: {}", e);
                        }
                    }
                } else {
                    result.error = start_result.message;
                }
            }
            Err(e) => {
                result.error = format!("Failed to start agent: {}", e);
            }
        }
    } else if result.agent_status.process_name == "agent.exe"
        || result.agent_status.process_name == "agent"
    {
        // Agent is already running - no need to emit agent_started or report distributor
        // These should only happen on first startup when agent transitions from not running to running
        result.success = true;
        app_handle
            .emit_all(
                "INIT_STATUS",
                &serde_json::json!({
                    "stage": "already_running",
                    "message": "Agent already running"
                }),
            )
            .ok();

        // Start agent monitor even if agent is already running
        let monitor_handle = app_handle.clone();
        tokio::spawn(async move {
            start_agent_monitor(monitor_handle, AgentMonitorConfig::default()).await;
        });
    } else {
        // Port occupied by another process
        result.error = format!(
            "Port 50809 is occupied by {}",
            result.agent_status.process_name
        );
    }

    if !result.success && result.error.is_empty() {
        result.error = "Initialization failed for unknown reason".to_string();
    }

    log::info!("App initialization result: {:?}", result);
    Ok(result)
}

// Get platform string
fn get_platform() -> String {
    #[cfg(target_os = "windows")]
    {
        "windows".to_string()
    }

    #[cfg(all(target_os = "macos", target_arch = "aarch64"))]
    {
        "mac-arm".to_string()
    }

    #[cfg(all(target_os = "macos", not(target_arch = "aarch64")))]
    {
        "mac-intel".to_string()
    }

    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        "unknown".to_string()
    }
}

/// Check and process library updates
/// Returns a list of successfully updated libraries
pub async fn check_and_process_library_updates(
    app_handle: &AppHandle,
    silent: bool,
) -> Result<Vec<String>, String> {
    let platform = get_platform();
    let app_name = app_handle.package_info().name.clone();

    if !silent {
        app_handle
            .emit_all(
                "INIT_STATUS",
                &serde_json::json!({
                    "stage": "checking_updates",
                    "message": "Checking for updates..."
                }),
            )
            .ok();
    }

    let log_prefix = if silent { "Background update: " } else { "" };

    // Check for library updates
    match crate::update_manager::check_libs_update(app_handle, &platform, &app_name).await {
        Ok(response) => {
            let libs = response.data.libs;
            let mut updates_applied = Vec::new();

            // Update each library
            for lib in libs {
                match crate::update_manager::process_lib_update(app_handle, &lib).await {
                    Ok(true) => {
                        log::info!("{}Library {} updated successfully", log_prefix, lib.name);
                        updates_applied.push(lib.name.clone());
                    }
                    Ok(false) => {
                        log::debug!("{}Library {} is up to date", log_prefix, lib.name);
                    }
                    Err(e) => {
                        let error_msg = format!("Failed to update library {}: {}", lib.name, e);
                        if silent {
                            log::warn!("{}{}", log_prefix, error_msg);
                            // Continue with other libraries in silent mode
                        } else {
                            log::error!("{}", error_msg);
                            return Err(format!("Library update failed: {}", e));
                        }
                    }
                }
            }

            Ok(updates_applied)
        }
        Err(e) => {
            let error_msg = format!("Failed to check library updates: {}", e);
            log::error!("{}", error_msg);
            Err(error_msg)
        }
    }
}

// ============ Agent Monitor Functions ============

/// Start agent monitoring task
pub async fn start_agent_monitor(app_handle: AppHandle, config: AgentMonitorConfig) {
    // Check if already running
    if MONITOR_RUNNING.load(std::sync::atomic::Ordering::SeqCst) {
        log::info!("Agent monitor is already running");
        return;
    }

    if !config.enabled {
        log::info!("Agent monitor is disabled");
        return;
    }

    MONITOR_RUNNING.store(true, std::sync::atomic::Ordering::SeqCst);
    MONITOR_ENABLED.store(true, std::sync::atomic::Ordering::SeqCst);

    log::info!(
        "Starting agent monitor with config: interval={}s, max_attempts={}, cooldown={}s",
        config.check_interval_seconds,
        config.max_restart_attempts,
        config.restart_cooldown_seconds
    );

    let check_interval = std::time::Duration::from_secs(config.check_interval_seconds);
    let cooldown = std::time::Duration::from_secs(config.restart_cooldown_seconds);
    let max_attempts = config.max_restart_attempts;

    tokio::spawn(async move {
        let mut restart_count: u32 = 0;
        let mut last_restart_time: Option<std::time::Instant> = None;
        let mut consecutive_failures: u32 = 0;

        loop {
            // Check if monitor should stop
            if !MONITOR_ENABLED.load(std::sync::atomic::Ordering::SeqCst) {
                log::info!("Agent monitor stopped by user");
                break;
            }

            // Wait for check interval
            tokio::time::sleep(check_interval).await;

            // Check if monitor is paused (during agent update)
            if MONITOR_PAUSED.load(std::sync::atomic::Ordering::SeqCst) {
                log::debug!("Agent monitor is paused, skipping restart check");
                continue;
            }

            // Check agent status
            let status = check_agent_running();

            if status.running {
                // Agent is running, reset failure counter
                if consecutive_failures > 0 {
                    log::info!("Agent recovered, resetting failure counter");
                    consecutive_failures = 0;
                }
                continue;
            }

            // Agent not running, check if we should restart
            log::warn!("Agent is not running, attempting to restart...");

            // Check cooldown period
            if let Some(last_time) = last_restart_time {
                if last_time.elapsed() < cooldown {
                    log::info!(
                        "Restart cooldown in effect, waiting... ({:.1}s remaining)",
                        (cooldown - last_time.elapsed()).as_secs_f32()
                    );
                    continue;
                }
            }

            // Check restart attempt limit
            if restart_count >= max_attempts {
                log::error!(
                    "Max restart attempts ({}) reached, stopping monitor",
                    max_attempts
                );

                // Emit event to notify frontend
                app_handle
                    .emit_all(
                        "AGENT_MONITOR_STATUS",
                        &serde_json::json!({
                            "event": "max_restarts_reached",
                            "restart_count": restart_count,
                            "message": "Agent failed to start after maximum restart attempts"
                        }),
                    )
                    .ok();

                break;
            }

            // Attempt to restart agent
            match start_agent_process(&app_handle) {
                Ok(result) => {
                    if result.success {
                        restart_count += 1;
                        last_restart_time = Some(std::time::Instant::now());
                        consecutive_failures = 0;

                        log::info!(
                            "Agent restarted successfully (attempt {}/{})",
                            restart_count,
                            max_attempts
                        );

                        // Wait for agent to be ready
                        match wait_agent_ready(&app_handle, 10).await {
                            Ok(ready) => {
                                if ready {
                                    log::info!("Agent is ready after restart");

                                    // Emit success event
                                    app_handle
                                        .emit_all(
                                            "AGENT_MONITOR_STATUS",
                                            &serde_json::json!({
                                                "event": "agent_restarted",
                                                "restart_count": restart_count,
                                                "message": "Agent was automatically restarted"
                                            }),
                                        )
                                        .ok();

                                    // Also emit agent_started event for backward compatibility
                                    app_handle
                                        .emit_all("agent_started", &serde_json::json!({}))
                                        .ok();
                                } else {
                                    consecutive_failures += 1;
                                    log::error!("Agent failed to become ready after restart");
                                }
                            }
                            Err(e) => {
                                consecutive_failures += 1;
                                log::error!("Error waiting for agent: {}", e);
                            }
                        }
                    } else {
                        consecutive_failures += 1;
                        log::error!("Failed to restart agent: {}", result.message);

                        // Emit failure event
                        app_handle
                            .emit_all(
                                "AGENT_MONITOR_STATUS",
                                &serde_json::json!({
                                    "event": "restart_failed",
                                    "error_type": result.error_type,
                                    "message": result.message
                                }),
                            )
                            .ok();
                    }
                }
                Err(e) => {
                    consecutive_failures += 1;
                    log::error!("Error restarting agent: {}", e);
                }
            }
        }

        MONITOR_RUNNING.store(false, std::sync::atomic::Ordering::SeqCst);
        log::info!("Agent monitor task ended");
    });
}

/// Stop agent monitoring
pub fn stop_agent_monitor() {
    log::info!("Stopping agent monitor...");
    MONITOR_ENABLED.store(false, std::sync::atomic::Ordering::SeqCst);
}

/// Pause agent monitoring temporarily (e.g., during agent update)
/// This prevents auto-restart while installing updates
pub fn pause_agent_monitor() {
    log::info!("Pausing agent monitor for update...");
    MONITOR_PAUSED.store(true, std::sync::atomic::Ordering::SeqCst);
}

/// Resume agent monitoring after update is complete
pub fn resume_agent_monitor() {
    log::info!("Resuming agent monitor after update...");
    MONITOR_PAUSED.store(false, std::sync::atomic::Ordering::SeqCst);
}

/// Check if agent monitor is paused
#[allow(dead_code)]
pub fn is_agent_monitor_paused() -> bool {
    MONITOR_PAUSED.load(std::sync::atomic::Ordering::SeqCst)
}

// ============ Tauri Commands for Agent Monitor ============

#[tauri::command]
pub async fn start_agent_monitoring(
    app_handle: AppHandle,
    config: Option<AgentMonitorConfig>,
) -> Result<(), String> {
    let cfg = config.unwrap_or_default();
    start_agent_monitor(app_handle, cfg).await;
    Ok(())
}

#[tauri::command]
pub fn stop_agent_monitoring() -> Result<(), String> {
    stop_agent_monitor();
    Ok(())
}

#[tauri::command]
pub fn get_agent_monitor_state() -> AgentMonitorState {
    AgentMonitorState {
        is_monitoring: MONITOR_RUNNING.load(std::sync::atomic::Ordering::SeqCst),
        is_enabled: MONITOR_ENABLED.load(std::sync::atomic::Ordering::SeqCst),
        is_paused: MONITOR_PAUSED.load(std::sync::atomic::Ordering::SeqCst),
        restart_count: 0, // This would need persistent state to track
        last_restart_time: None,
    }
}
