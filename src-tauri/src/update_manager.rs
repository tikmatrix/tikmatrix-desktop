use crate::file_utils;
use crate::proxy_config;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Manager};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TauriUpdateInfo {
    pub should_update: bool,
    pub version: Option<String>,
    pub date: Option<String>,
    pub body: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibInfo {
    pub name: String,
    pub version: String,
    #[serde(rename = "downloadUrl")]
    pub download_url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckLibsResponse {
    pub code: i32,
    pub data: LibsData,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibsData {
    pub libs: Vec<LibInfo>,
}

#[derive(Debug, Clone, Serialize)]
pub struct UpdateStatus {
    pub status: String, // "checking", "downloading", "installing", "completed", "error"
    pub message: String,
    pub lib_name: Option<String>,
}

impl UpdateStatus {
    pub fn emit(&self, handle: &AppHandle) {
        handle.emit_all("UPDATE_STATUS", &self).ok();
    }
}

/// Helper function to reset port files to prevent conflicts
fn reset_port_files(app_data_dir: &PathBuf) {
    let port_files = ["port.txt", "wsport.txt", "wssport.txt"];
    for file in &port_files {
        let path = app_data_dir.join(file);
        if let Err(e) = std::fs::write(&path, "0") {
            log::error!("Failed to reset {}: {}", file, e);
        }
    }
}

/// Helper function to kill agent and script processes and reset ports
fn kill_agent_and_script(app_data_dir: &PathBuf) {
    crate::kill_process("agent".to_string());
    crate::kill_process("script".to_string());
    reset_port_files(app_data_dir);
}

fn copy_file_with_retry(
    src: &Path,
    dest: &Path,
    max_attempts: u32,
    delay_ms: u64,
    mut on_retry: Option<&mut dyn FnMut(u32)>,
) -> Result<(), std::io::Error> {
    let mut attempt = 0;
    loop {
        match fs::copy(src, dest) {
            Ok(_) => return Ok(()),
            Err(err) => {
                let should_retry = {
                    #[cfg(target_os = "windows")]
                    {
                        err.raw_os_error() == Some(32)
                    }

                    #[cfg(not(target_os = "windows"))]
                    {
                        false
                    }
                };

                if should_retry && attempt + 1 < max_attempts {
                    if let Some(callback) = &mut on_retry {
                        callback(attempt + 1);
                    }
                    log::warn!(
                        "{} is locked, retrying copy ({}/{})",
                        dest.display(),
                        attempt + 2,
                        max_attempts
                    );
                    std::thread::sleep(std::time::Duration::from_millis(delay_ms));
                    attempt += 1;
                    continue;
                }

                return Err(err);
            }
        }
    }
}
/// Get default check_libs_url based on build configuration
fn get_default_check_libs_url() -> String {
    if cfg!(debug_assertions) {
        // In dev builds prefer local dev server
        "http://127.0.0.1:8787/front-api/check_libs?beta=0".to_string()
    } else {
        // Production default
        "https://api.niostack.com/front-api/check_libs?beta=0".to_string()
    }
}

/// Check libraries update from remote server
pub async fn check_libs_update(
    app_handle: &AppHandle,
    platform: &str,
    app_name: &str,
) -> Result<CheckLibsResponse, String> {
    let status = UpdateStatus {
        status: "checking".to_string(),
        message: "Checking libraries update...".to_string(),
        lib_name: None,
    };
    status.emit(app_handle);
    let check_libs_url = get_default_check_libs_url();
    // Build the request URL first for proxy bypass check
    let url = format!("{}&time={}", check_libs_url, chrono::Utc::now().timestamp());
    log::info!("Checking libraries update from: {}", url);

    // Create client with timeout and proxy configuration
    let mut client_builder = reqwest::Client::builder().timeout(std::time::Duration::from_secs(10));

    // Apply proxy configuration using the shared function (bypasses localhost automatically)
    client_builder = proxy_config::apply_proxy_config(client_builder, &url)?;

    let client = client_builder
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;
    // curl https://api.niostack.com/front-api/check_libs?beta=0 -H "User-Agent: windows" -H "X-App-Id: AGA TikTok"
    let response = client
        .get(&url)
        .header("User-Agent", platform)
        .header("X-App-Id", app_name)
        .send()
        .await
        .map_err(|e| format!("Failed to fetch update info: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("Server returned error: {}", response.status()));
    }

    let check_response: CheckLibsResponse = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse response: {}", e))?;

    if check_response.code != 20000 {
        return Err(format!("Invalid response code: {}", check_response.code));
    }

    Ok(check_response)
}

/// Get local library version from storage (uses app_state.json for compatibility with frontend)
pub fn get_local_lib_version(app_handle: &AppHandle, lib_name: &str) -> String {
    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let storage_path = app_data_dir.join("data").join("app_state.json");

    if !storage_path.exists() {
        return "0".to_string();
    }

    if let Ok(content) = fs::read_to_string(&storage_path) {
        if content.trim().is_empty() {
            return "0".to_string();
        }

        if let Ok(store) = serde_json::from_str::<serde_json::Value>(&content) {
            if let Some(value) = store.get(lib_name) {
                if let Some(s) = value.as_str() {
                    return s.trim().replace("\"", "").to_string();
                }
            }
        }
    }

    "0".to_string()
}

/// Save library version to storage (uses app_state.json for compatibility with frontend)
pub fn save_local_lib_version(
    app_handle: &AppHandle,
    lib_name: &str,
    version: &str,
) -> Result<(), String> {
    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let data_dir = app_data_dir.join("data");
    let storage_path = data_dir.join("app_state.json");

    // Ensure data directory exists
    fs::create_dir_all(&data_dir).map_err(|e| e.to_string())?;

    // Load existing store or create new one
    let mut store: serde_json::Map<String, serde_json::Value> = if storage_path.exists() {
        let content = fs::read_to_string(&storage_path).map_err(|e| e.to_string())?;
        if content.trim().is_empty() {
            serde_json::Map::new()
        } else {
            serde_json::from_str(&content).unwrap_or_else(|_| serde_json::Map::new())
        }
    } else {
        serde_json::Map::new()
    };

    // Update the value
    store.insert(
        lib_name.to_string(),
        serde_json::Value::String(version.to_string()),
    );

    // Write back to file
    let json_str = serde_json::to_string_pretty(&store).map_err(|e| e.to_string())?;
    fs::write(&storage_path, json_str).map_err(|e| e.to_string())?;

    log::info!("Saved {} version: {}", lib_name, version);
    Ok(())
}

/// Check if library file exists
pub fn check_lib_file_exists(app_handle: &AppHandle, lib: &LibInfo) -> Result<bool, String> {
    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let os_type = std::env::consts::OS;

    let file_path = match lib.name.as_str() {
        "platform-tools" => {
            let filename = if os_type == "macos" { "adb" } else { "adb.exe" };
            app_data_dir.join("platform-tools").join(filename)
        }
        "PaddleOCR" => {
            let filename = if os_type == "macos" {
                "PaddleOCR-json"
            } else {
                "PaddleOCR-json.exe"
            };
            app_data_dir.join("PaddleOCR-json").join(filename)
        }
        "apk" | "test-apk" | "scrcpy" => {
            let url_name = lib.download_url.split('/').last().unwrap_or("");
            app_data_dir.join("bin").join(url_name)
        }
        "script" | "agent" => {
            let filename = if os_type == "macos" {
                lib.name.clone()
            } else {
                format!("{}.exe", lib.name)
            };
            app_data_dir.join("bin").join(filename)
        }
        _ => return Ok(false),
    };

    Ok(file_path.exists())
}

/// Download library file to tmp directory
pub async fn download_lib_file(app_handle: &AppHandle, lib: &LibInfo) -> Result<PathBuf, String> {
    let status = UpdateStatus {
        status: "downloading".to_string(),
        message: format!("Downloading {}...", lib.name),
        lib_name: Some(lib.name.clone()),
    };
    status.emit(app_handle);

    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let tmp_dir = app_data_dir.join("tmp");
    fs::create_dir_all(&tmp_dir).map_err(|e| e.to_string())?;

    let filename = lib.download_url.split('/').last().unwrap_or("download");
    let file_path = tmp_dir.join(filename);

    // Use existing download_file_with_version command
    let download_result = file_utils::download_file_with_version(
        lib.download_url.clone(),
        file_path.to_str().unwrap().to_string(),
        app_handle.clone(),
        Some(lib.version.clone()),
    )
    .await;

    if let Err(e) = download_result {
        return Err(format!("Failed to download {}: {}", lib.name, e));
    }

    log::info!("Downloaded {} to {:?}", lib.name, file_path);
    Ok(file_path)
}

/// Install downloaded library file
pub async fn install_lib_file(
    app_handle: &AppHandle,
    lib: &LibInfo,
    tmp_file_path: &PathBuf,
) -> Result<(), String> {
    let status = UpdateStatus {
        status: "installing".to_string(),
        message: format!("Installing {}...", lib.name),
        lib_name: Some(lib.name.clone()),
    };
    status.emit(app_handle);

    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();

    match lib.name.as_str() {
        "platform-tools" => {
            // Kill adb process before update
            crate::kill_process("adb".to_string());
            std::thread::sleep(std::time::Duration::from_secs(3));

            // Unzip platform-tools
            file_utils::unzip_file(
                tmp_file_path.to_str().unwrap().to_string(),
                app_data_dir.to_str().unwrap().to_string(),
            )?;

            // Grant permission on macOS
            #[cfg(target_os = "macos")]
            file_utils::grant_permission(app_handle.clone(), "platform-tools/adb".to_string());

            log::info!("Installed platform-tools");
        }
        "PaddleOCR" => {
            // Kill PaddleOCR process before update
            crate::kill_process("PaddleOCR-json".to_string());

            // Unzip PaddleOCR
            file_utils::unzip_file(
                tmp_file_path.to_str().unwrap().to_string(),
                app_data_dir.to_str().unwrap().to_string(),
            )?;

            log::info!("Installed PaddleOCR");
        }
        "apk" | "test-apk" | "scrcpy" => {
            let bin_dir = app_data_dir.join("bin");
            fs::create_dir_all(&bin_dir).map_err(|e| e.to_string())?;

            let dest_file = bin_dir.join(tmp_file_path.file_name().unwrap());
            fs::copy(tmp_file_path, &dest_file).map_err(|e| e.to_string())?;

            log::info!("Installed {} to {:?}", lib.name, dest_file);
        }
        "script" | "agent" => {
            // Pause agent monitor to prevent auto-restart during update
            crate::process_manager::pause_agent_monitor();

            // Kill processes and reset ports
            kill_agent_and_script(&app_data_dir);
            std::thread::sleep(std::time::Duration::from_secs(3));

            let bin_dir = app_data_dir.join("bin");
            fs::create_dir_all(&bin_dir).map_err(|e| e.to_string())?;

            let dest_file = bin_dir.join(tmp_file_path.file_name().unwrap());

            // Define retry hook to kill processes if file is locked
            let mut retry_hook = |attempt: u32| {
                log::info!(
                    "Re-killing agent/script before retry attempt {} due to locked file",
                    attempt + 1
                );
                kill_agent_and_script(&app_data_dir);
            };

            // Copy file with retry logic
            copy_file_with_retry(tmp_file_path, &dest_file, 5, 500, Some(&mut retry_hook))
                .map_err(|e| {
                    // Resume monitor on error
                    crate::process_manager::resume_agent_monitor();
                    e.to_string()
                })?;

            // Grant permission on macOS
            #[cfg(target_os = "macos")]
            file_utils::grant_permission(app_handle.clone(), format!("bin/{}", lib.name));

            log::info!("Installed {} to {:?}", lib.name, dest_file);

            // Resume agent monitor after successful installation
            crate::process_manager::resume_agent_monitor();

            // Wait for agent to be fully ready before continuing
            log::info!("Waiting for agent to be ready after {} update...", lib.name);
            match crate::process_manager::wait_agent_ready(app_handle, 15).await {
                Ok(true) => {
                    log::info!("Agent is ready after {} update", lib.name);
                }
                Ok(false) => {
                    log::warn!(
                        "Agent did not become ready within timeout after {} update",
                        lib.name
                    );
                }
                Err(e) => {
                    log::error!("Error waiting for agent after {} update: {}", lib.name, e);
                }
            }
        }
        _ => {
            return Err(format!("Unknown library type: {}", lib.name));
        }
    }

    Ok(())
}

/// Process single library update
pub async fn process_lib_update(app_handle: &AppHandle, lib: &LibInfo) -> Result<bool, String> {
    log::info!(
        "Processing library: {} (version: {})",
        lib.name,
        lib.version
    );

    let local_version = get_local_lib_version(app_handle, &lib.name);
    let file_exists = check_lib_file_exists(app_handle, lib)?;

    log::info!(
        "Library {} - Local version: {}, Remote version: {}, File exists: {}",
        lib.name,
        local_version,
        lib.version,
        file_exists
    );

    // Check if update is needed: skip if file exists and version matches
    if file_exists && local_version == lib.version {
        log::info!("Library {} is up to date", lib.name);
        return Ok(false);
    }

    log::info!(
        "Library {} needs update (file_exists={}, version_match={})",
        lib.name,
        file_exists,
        local_version == lib.version
    );

    // Download file
    let tmp_file = download_lib_file(app_handle, lib).await?;

    // Install file
    install_lib_file(app_handle, lib, &tmp_file).await?;

    // Save version
    save_local_lib_version(app_handle, &lib.name, &lib.version)?;

    log::info!("Successfully updated library: {}", lib.name);
    Ok(true)
}

/// Check for Tauri application updates
pub async fn check_tauri_update(app_handle: &AppHandle) -> Result<TauriUpdateInfo, String> {
    log::info!("Checking for Tauri application updates...");

    let status = UpdateStatus {
        status: "checking".to_string(),
        message: "Checking application update...".to_string(),
        lib_name: None,
    };
    status.emit(app_handle);

    match app_handle.updater().check().await {
        Ok(update) => {
            if update.is_update_available() {
                log::info!(
                    "Update available: version {}, date: {:?}",
                    update.latest_version(),
                    update.date()
                );

                Ok(TauriUpdateInfo {
                    should_update: true,
                    version: Some(update.latest_version().to_string()),
                    date: update.date().map(|d| d.to_string()),
                    body: update.body().map(|b| b.to_string()),
                })
            } else {
                log::info!("No application update available");
                Ok(TauriUpdateInfo {
                    should_update: false,
                    version: None,
                    date: None,
                    body: None,
                })
            }
        }
        Err(e) => {
            let error_msg = format!("Failed to check for updates: {}", e);
            log::error!("{}", error_msg);
            Err(error_msg)
        }
    }
}

/// Install Tauri application update and relaunch
pub async fn install_and_relaunch_update(app_handle: &AppHandle) -> Result<(), String> {
    log::info!("Installing Tauri application update...");

    let status = UpdateStatus {
        status: "downloading".to_string(),
        message: "Downloading application update...".to_string(),
        lib_name: Some("app".to_string()),
    };
    status.emit(app_handle);

    match app_handle.updater().check().await {
        Ok(update) => {
            if update.is_update_available() {
                log::info!("Downloading and installing update...");

                let status = UpdateStatus {
                    status: "installing".to_string(),
                    message: "Installing application update...".to_string(),
                    lib_name: Some("app".to_string()),
                };
                status.emit(app_handle);

                match update.download_and_install().await {
                    Ok(_) => {
                        log::info!("Update installed successfully, relaunching...");

                        let status = UpdateStatus {
                            status: "completed".to_string(),
                            message: "Update completed, relaunching...".to_string(),
                            lib_name: Some("app".to_string()),
                        };
                        status.emit(app_handle);

                        // Relaunch the application
                        app_handle.restart();
                    }
                    Err(e) => {
                        let error_msg = format!("Failed to install update: {}", e);
                        log::error!("{}", error_msg);
                        return Err(error_msg);
                    }
                }
            } else {
                return Err("No update available to install".to_string());
            }
        }
        Err(e) => {
            let error_msg = format!("Failed to check for updates: {}", e);
            log::error!("{}", error_msg);
            return Err(error_msg);
        }
    }

    Ok(())
}
