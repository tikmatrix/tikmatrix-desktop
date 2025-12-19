// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::{fs, process::Command};

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

use tauri::Manager;

mod auto_update_manager;
mod file_utils;
mod http_client;
mod init_log;
mod process_manager;
mod proxy_config;
mod storage;
mod update_manager;
mod websocket_manager;

/**
 * 读取分发商标识
 * 优先从资源目录读取 distributor.txt,如果不存在则返回 "OFFICIAL"
 */
#[tauri::command]
fn get_distributor_code(app_handle: tauri::AppHandle) -> Result<String, String> {
    // 方法 1: 从资源目录读取
    if let Some(resource_dir) = app_handle.path_resolver().resource_dir() {
        let distributor_file = resource_dir.join("distributor.txt");
        if distributor_file.exists() {
            if let Ok(code) = fs::read_to_string(&distributor_file) {
                let trimmed = code.trim().to_string();
                if !trimmed.is_empty() {
                    log::info!("📋 Distributor code loaded from resource: {}", trimmed);
                    return Ok(trimmed);
                }
            }
        }
    }

    // 方法 2: 从可执行文件同目录读取
    if let Ok(exe_path) = std::env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            let distributor_file = exe_dir.join("distributor.txt");
            if distributor_file.exists() {
                if let Ok(code) = fs::read_to_string(&distributor_file) {
                    let trimmed = code.trim().to_string();
                    if !trimmed.is_empty() {
                        log::info!("📋 Distributor code loaded from exe dir: {}", trimmed);
                        return Ok(trimmed);
                    }
                }
            }
        }
    }

    // 默认返回 OFFICIAL
    log::info!("📋 No distributor code found, using OFFICIAL");
    Ok("OFFICIAL".to_string())
}

fn setup_env(working_dir: &str, version: String) {
    unsafe {
        std::env::set_var("MATRIX_APP_WORK_DIR", working_dir);
        std::env::set_var("MATRIX_APP_NAME", "TikMatrix".to_string());
        std::env::set_var("MATRIX_APP_VERSION", version.clone());
    };
    // Log proxy configuration for debugging
    proxy_config::log_proxy_config();
}

#[tauri::command]
fn get_env(key: String) -> String {
    std::env::var(key.clone()).unwrap_or_default()
}

#[tauri::command]
fn kill_process(name: String) {
    #[cfg(target_os = "windows")]
    {
        let mut command = Command::new("taskkill");
        command.creation_flags(0x08000000);
        command
            .args(&["/F", "/IM", format!("{}.exe", name).as_str()])
            .status()
            .expect("failed to kill processes");
        log::info!("kill process:{} success", name);
    }

    #[cfg(target_os = "macos")]
    {
        let mut command = Command::new("pkill");
        command
            .args(&["-f", name.as_str()])
            .status()
            .expect("failed to kill processes");
        log::info!("kill process:{} success", name);
    }
}

// ============ Update Manager Commands ============

/// Check libraries update from remote server
#[tauri::command]
async fn check_libs_update(
    app_handle: tauri::AppHandle,
    platform: String,
    app_name: String,
) -> Result<update_manager::CheckLibsResponse, String> {
    update_manager::check_libs_update(&app_handle, &platform, &app_name).await
}

/// Get local library version
#[tauri::command]
fn get_local_lib_version(app_handle: tauri::AppHandle, lib_name: String) -> String {
    update_manager::get_local_lib_version(&app_handle, &lib_name)
}

/// Process single library update (download + install)
#[tauri::command]
async fn process_lib_update(
    app_handle: tauri::AppHandle,
    lib: update_manager::LibInfo,
) -> Result<bool, String> {
    update_manager::process_lib_update(&app_handle, &lib).await
}

/// Check for Tauri application updates
#[tauri::command]
async fn check_tauri_update(
    app_handle: tauri::AppHandle,
) -> Result<update_manager::TauriUpdateInfo, String> {
    update_manager::check_tauri_update(&app_handle).await
}

/// Install Tauri application update and relaunch
#[tauri::command]
async fn install_and_relaunch_update(app_handle: tauri::AppHandle) -> Result<(), String> {
    update_manager::install_and_relaunch_update(&app_handle).await
}

// ============ Auto Update Manager Commands ============

/// Get auto-update state info
#[tauri::command]
fn get_auto_update_state() -> auto_update_manager::AutoUpdateStateInfo {
    auto_update_manager::get_auto_update_state()
}

fn main() -> std::io::Result<()> {
    tauri::Builder::default()
        .on_window_event(|event| {
            // Handle window close/destroy events to shutdown agent processes
            match event.event() {
                tauri::WindowEvent::CloseRequested { .. } => {
                    // Don't prevent close, but shutdown processes before closing
                    log::info!("Window close requested, shutting down agent processes...");
                    process_manager::shutdown_processes(&event.window().app_handle());
                }
                tauri::WindowEvent::Destroyed => {
                    // Also handle destroy event as a fallback
                    log::info!("Window destroyed, ensuring agent processes are shutdown...");
                    process_manager::shutdown_processes(&event.window().app_handle());
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_distributor_code,
            file_utils::grant_permission,
            kill_process,
            file_utils::open_dir,
            file_utils::download_file,
            file_utils::download_file_with_version,
            file_utils::unzip_file,
            get_env,
            http_client::http_request,
            http_client::agent_request,
            storage::get_storage_item,
            storage::set_storage_item,
            storage::remove_storage_item,
            storage::clear_storage,
            storage::get_all_storage_keys,
            storage::get_storage_snapshot,
            storage::read_settings_file_generic,
            storage::write_settings_file_generic,
            storage::read_settings_file,
            storage::write_settings_file,
            storage::read_post_settings_file,
            storage::write_post_settings_file,
            file_utils::open_adb_terminal,
            check_libs_update,
            get_local_lib_version,
            process_lib_update,
            check_tauri_update,
            install_and_relaunch_update,
            get_auto_update_state,
            process_manager::check_agent_status,
            process_manager::start_agent,
            process_manager::wait_for_agent_ready,
            process_manager::shutdown_agent,
            process_manager::initialize_app,
            process_manager::start_agent_monitoring,
            process_manager::stop_agent_monitoring,
            process_manager::get_agent_monitor_state,
            websocket_manager::ws_connect,
            websocket_manager::ws_disconnect,
            websocket_manager::ws_get_status,
            websocket_manager::ws_reset_reconnect
        ])
        .setup(|app| {
            let app_data_dir = app.path_resolver().app_data_dir().unwrap();
            let work_dir = app_data_dir.to_str().unwrap();
            log::info!("work_dir: {}", work_dir);
            if cfg!(debug_assertions) {
                unsafe {
                    std::env::set_var("LOG_LEVEL", "info");
                    std::env::set_var("RUST_BACKTRACE", "1");
                };
            }
            init_log::init(work_dir);
            let version = app.package_info().version.clone();
            let version_str = version.to_string();
            setup_env(work_dir, version_str);

            // 读取并记录分发商代码
            let app_handle = app.handle();
            process_manager::shutdown_processes(&app_handle);
            match get_distributor_code(app_handle) {
                Ok(code) => {
                    log::info!("✅ Distributor Code: {}", code);
                    unsafe { std::env::set_var("DISTRIBUTOR_CODE", &code) };
                }
                Err(e) => log::warn!("⚠️  Failed to get distributor code: {}", e),
            }

            let ui_cache_dir = app_data_dir.join("upload").join("ui");
            std::fs::create_dir_all(&ui_cache_dir)?;
            app.fs_scope()
                .allow_directory(&ui_cache_dir, true)
                .map_err(|err| std::io::Error::new(std::io::ErrorKind::Other, err.to_string()))?;

            std::fs::create_dir_all(format!("{}/{}", work_dir, "bin"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "logs"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "tmp"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "data"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "upload"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "download"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "upload/material"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "upload/avatar"))?;
            std::fs::create_dir_all(format!("{}/{}", work_dir, "upload/apk"))?;
            //delete logs older than 3 days
            file_utils::delete_logs_older_than_3_days(work_dir);

            std::fs::write(format!("{}/port.txt", work_dir), "0")?;
            std::fs::write(format!("{}/wsport.txt", work_dir), "0")?;
            std::fs::write(format!("{}/wssport.txt", work_dir), "0")?;

            // Start auto-update timer automatically
            // Dev: check every 3 minutes, Prod: check every 60 minutes
            let check_interval = if cfg!(debug_assertions) { 3 } else { 60 };
            let auto_update_config = auto_update_manager::AutoUpdateConfig {
                enabled: true,
                check_interval_minutes: check_interval,
                idle_threshold_minutes: 5,
            };
            let app_handle_clone = app.handle();
            tauri::async_runtime::spawn(async move {
                if let Err(e) = auto_update_manager::start_auto_update_timer(
                    app_handle_clone,
                    auto_update_config,
                )
                .await
                {
                    log::error!("Failed to start auto-update timer: {}", e);
                } else {
                    log::info!(
                        "Auto-update timer started with {} minutes interval",
                        check_interval
                    );
                }
            });

            Ok(())
        })
        .on_page_load(|_window, _payload| {
            log::info!("[TikMatrix] page load triggered");
        })
        //listen to the tauri update event
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}
