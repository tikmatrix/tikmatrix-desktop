use serde::{Deserialize, Serialize};
use std::process::Command;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use tauri::{AppHandle, Manager};

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AutoUpdateConfig {
    pub enabled: bool,
    pub check_interval_minutes: u64,
    pub idle_threshold_minutes: u64,
}

impl Default for AutoUpdateConfig {
    fn default() -> Self {
        Self {
            enabled: false,
            check_interval_minutes: 60,
            idle_threshold_minutes: 10,
        }
    }
}

#[derive(Debug, Clone)]
pub struct AutoUpdateState {
    pub last_check: Option<Instant>,
    pub last_user_activity: Instant,
    pub is_running: bool,
}

impl Default for AutoUpdateState {
    fn default() -> Self {
        Self {
            last_check: None,
            last_user_activity: Instant::now(),
            is_running: false,
        }
    }
}

// Global state for auto-update manager
lazy_static::lazy_static! {
    static ref AUTO_UPDATE_STATE: Arc<Mutex<AutoUpdateState>> = Arc::new(Mutex::new(AutoUpdateState::default()));
    pub static ref AUTO_UPDATE_CONFIG: Arc<Mutex<AutoUpdateConfig>> = Arc::new(Mutex::new(AutoUpdateConfig::default()));
}

/// Check if enough time has elapsed since last update check
fn should_check_for_update(check_interval_minutes: u64) -> bool {
    AUTO_UPDATE_STATE
        .lock()
        .ok()
        .and_then(|state| {
            state.last_check.map(|last_check| {
                let elapsed = last_check.elapsed();
                let interval_duration = Duration::from_secs(check_interval_minutes * 60);
                elapsed >= interval_duration
            })
        })
        .unwrap_or(true) // If no last check, should check
}

/// Check all conditions required for auto-update to proceed
async fn can_auto_update(
    app_handle: &AppHandle,
    config: &AutoUpdateConfig,
) -> Result<bool, String> {
    // Check if auto-update is enabled
    if !config.enabled {
        log::debug!("Auto-update is disabled");
        return Ok(false);
    }

    // Check if system is idle
    if !is_system_idle(config.idle_threshold_minutes) {
        log::debug!("System is not idle");
        return Ok(false);
    }

    // Check if script process is running
    if is_script_running() {
        log::debug!("Script process is running");
        return Ok(false);
    }

    // Check time since last check
    if !should_check_for_update(config.check_interval_minutes) {
        log::debug!("Not enough time since last check");
        return Ok(false);
    }

    // Check if has running tasks
    match check_has_running_tasks(app_handle).await {
        Ok(has_tasks) => {
            if has_tasks {
                log::debug!("Has running tasks");
                return Ok(false);
            }
        }
        Err(e) => {
            log::warn!("Failed to check running tasks: {}", e);
            return Ok(false);
        }
    }

    Ok(true)
}

/// Update user activity timestamp (called from frontend)
pub fn update_user_activity() {
    if let Ok(mut state) = AUTO_UPDATE_STATE.lock() {
        state.last_user_activity = Instant::now();
        log::debug!("User activity updated");
    }
}

/// Check if system is idle based on last user activity
pub fn is_system_idle(idle_threshold_minutes: u64) -> bool {
    if let Ok(state) = AUTO_UPDATE_STATE.lock() {
        let elapsed = state.last_user_activity.elapsed();
        let threshold = Duration::from_secs(idle_threshold_minutes * 60);
        let is_idle = elapsed >= threshold;
        log::debug!(
            "System idle check: elapsed={:?}, threshold={:?}, is_idle={}",
            elapsed,
            threshold,
            is_idle
        );
        return is_idle;
    }
    false
}

/// Check if script process is running
pub fn is_script_running() -> bool {
    #[cfg(target_os = "windows")]
    {
        let mut command = Command::new("tasklist");
        command.creation_flags(0x08000000); // CREATE_NO_WINDOW
        command.args(&["/FI", "IMAGENAME eq script.exe", "/NH"]);

        match command.output() {
            Ok(output) => {
                let output_str = String::from_utf8_lossy(&output.stdout);
                let is_running = output_str.contains("script.exe");
                log::debug!("Script process check: is_running={}", is_running);
                return is_running;
            }
            Err(e) => {
                log::warn!("Failed to check script process: {}", e);
                return false;
            }
        }
    }

    #[cfg(target_os = "macos")]
    {
        let mut command = Command::new("pgrep");
        command.args(&["-x", "script"]);

        match command.status() {
            Ok(status) => {
                let is_running = status.success();
                log::debug!("Script process check: is_running={}", is_running);
                return is_running;
            }
            Err(e) => {
                log::warn!("Failed to check script process: {}", e);
                return false;
            }
        }
    }

    #[cfg(target_os = "linux")]
    {
        let mut command = Command::new("pgrep");
        command.args(&["-x", "script"]);

        match command.status() {
            Ok(status) => {
                let is_running = status.success();
                log::debug!("Script process check: is_running={}", is_running);
                return is_running;
            }
            Err(e) => {
                log::warn!("Failed to check script process: {}", e);
                return false;
            }
        }
    }

    #[cfg(not(any(target_os = "windows", target_os = "macos", target_os = "linux")))]
    {
        false
    }
}

/// Update the last check timestamp
fn update_last_check() {
    if let Ok(mut state) = AUTO_UPDATE_STATE.lock() {
        state.last_check = Some(Instant::now());
        log::debug!("Updated last check timestamp");
    }
}

/// Start auto-update timer
pub async fn start_auto_update_timer(
    app_handle: AppHandle,
    config: AutoUpdateConfig,
) -> Result<(), String> {
    log::info!(
        "Starting auto-update timer with interval: {} minutes",
        config.check_interval_minutes
    );

    // Update config
    if let Ok(mut cfg) = AUTO_UPDATE_CONFIG.lock() {
        *cfg = config.clone();
    }

    // Mark as running
    if let Ok(mut state) = AUTO_UPDATE_STATE.lock() {
        state.is_running = true;
    }

    // Spawn background task
    tokio::spawn(async move {
        let interval = Duration::from_secs(config.check_interval_minutes * 60);
        let mut interval_timer = tokio::time::interval(interval);

        loop {
            interval_timer.tick().await;

            // Check if still should be running
            let is_running = AUTO_UPDATE_STATE
                .lock()
                .map(|s| s.is_running)
                .unwrap_or(false);

            if !is_running {
                log::info!("Auto-update timer stopped");
                break;
            }

            log::debug!("Auto-update timer tick");

            // Get current config
            let current_config = AUTO_UPDATE_CONFIG
                .lock()
                .map(|c| c.clone())
                .unwrap_or_default();

            // Check if all conditions are met for auto-update
            match can_auto_update(&app_handle, &current_config).await {
                Ok(true) => {
                    // All conditions met, trigger both Tauri and library updates
                    log::info!("Auto-update conditions met, checking for updates");
                    update_last_check();

                    // Check Tauri application update
                    match crate::update_manager::check_tauri_update(&app_handle).await {
                        Ok(info) => {
                            log::info!("Tauri update check result: {:?}", info);
                            if let Err(e) = app_handle.emit_all("TAURI_UPDATE_STATUS", &info) {
                                log::error!("Failed to emit Tauri update status: {}", e);
                            }
                        }
                        Err(e) => {
                            log::warn!("Background Tauri update check failed: {}", e);
                        }
                    }

                    // Check and apply library updates
                    match crate::process_manager::check_and_process_library_updates(
                        &app_handle,
                        true, // Silent mode for background updates
                    )
                    .await
                    {
                        Ok(updates_applied) => {
                            if !updates_applied.is_empty() {
                                log::info!("Library updates applied: {:?}", updates_applied);
                            } else {
                                log::debug!("All libraries are up to date");
                            }
                        }
                        Err(e) => {
                            log::warn!("Background library update check failed: {}", e);
                        }
                    }
                }
                Ok(false) => {
                    // Conditions not met, skip this check
                    continue;
                }
                Err(e) => {
                    log::error!("Error checking auto-update conditions: {}", e);
                    continue;
                }
            }
        }
    });

    Ok(())
}

/// Check if agent has running tasks
async fn check_has_running_tasks(app_handle: &AppHandle) -> Result<bool, String> {
    // Read agent port
    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let port_file = app_data_dir.join("port.txt");

    let port = match std::fs::read_to_string(&port_file) {
        Ok(content) => {
            let trimmed = content.trim();
            if trimmed == "0" {
                // Agent not ready, assume no tasks
                return Ok(false);
            }
            trimmed.to_string()
        }
        Err(_) => {
            return Ok(false); // Can't read port, assume no tasks
        }
    };

    // Query agent for running tasks
    let url = format!("http://localhost:{}/api/get_running_tasks", port);

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(5))
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    match client.get(&url).send().await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<serde_json::Value>().await {
                    Ok(json) => {
                        // Check if data array is empty
                        if let Some(data) = json.get("data") {
                            if let Some(arr) = data.as_array() {
                                return Ok(!arr.is_empty());
                            }
                        }
                        Ok(false)
                    }
                    Err(_) => Ok(false),
                }
            } else {
                Ok(false)
            }
        }
        Err(_) => Ok(false), // Network error, assume no tasks
    }
}

/// Get current auto-update state info
#[derive(Debug, Clone, Serialize)]
pub struct AutoUpdateStateInfo {
    pub is_running: bool,
    pub enabled: bool,
    pub check_interval_minutes: u64,
    pub idle_threshold_minutes: u64,
    pub seconds_since_last_activity: u64,
    pub seconds_since_last_check: Option<u64>,
}

pub fn get_auto_update_state() -> AutoUpdateStateInfo {
    let state = AUTO_UPDATE_STATE.lock().ok();
    let config = AUTO_UPDATE_CONFIG.lock().ok();

    let seconds_since_last_activity = state
        .as_ref()
        .map(|s| s.last_user_activity.elapsed().as_secs())
        .unwrap_or(0);

    let seconds_since_last_check = state
        .as_ref()
        .and_then(|s| s.last_check)
        .map(|t| t.elapsed().as_secs());

    AutoUpdateStateInfo {
        is_running: state.as_ref().map(|s| s.is_running).unwrap_or(false),
        enabled: config.as_ref().map(|c| c.enabled).unwrap_or(false),
        check_interval_minutes: config
            .as_ref()
            .map(|c| c.check_interval_minutes)
            .unwrap_or(10),
        idle_threshold_minutes: config
            .as_ref()
            .map(|c| c.idle_threshold_minutes)
            .unwrap_or(5),
        seconds_since_last_activity,
        seconds_since_last_check,
    }
}
