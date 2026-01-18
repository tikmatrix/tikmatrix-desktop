use crate::http_client::Progress;
use crate::proxy_config;
use futures_util::stream::StreamExt;
use reqwest::Client;
use std::cmp::min;
use std::fs::File;
use std::io::{self, BufReader, Write};
use std::path::Path;
use std::process::Command;
use std::time::Instant;
use tauri::http::header::{ACCEPT, USER_AGENT};
use zip::read::ZipArchive;

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

#[tauri::command]
pub async fn download_file(
    url: String,
    path: String,
    app_handle: tauri::AppHandle,
) -> Result<(), String> {
    download_file_with_version(url, path, app_handle, None).await
}

#[tauri::command]
pub async fn download_file_with_version(
    url: String,
    path: String,
    app_handle: tauri::AppHandle,
    version: Option<String>,
) -> Result<(), String> {
    // Build request URL with version or timestamp parameter first
    let request_url = if let Some(v) = version {
        if url.contains('?') {
            format!("{}&v={}", url, v)
        } else {
            format!("{}?v={}", url, v)
        }
    } else {
        // Fallback to timestamp for cache busting
        if url.contains('?') {
            format!("{}&t={}", url, Instant::now().elapsed().as_secs())
        } else {
            format!("{}?t={}", url, Instant::now().elapsed().as_secs())
        }
    };
    log::info!("Downloading from URL: {}", &request_url);

    // Create client with longer timeout and explicit proxy configuration
    let mut client_builder = Client::builder()
        .connect_timeout(std::time::Duration::from_secs(30))
        .timeout(std::time::Duration::from_secs(300)); // 5 minutes for large files

    // Apply detected proxy configuration (bypasses localhost automatically)
    client_builder = proxy_config::apply_proxy_config(client_builder, &request_url)?;

    let client = client_builder
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    // Request URL is already built above
    log::info!("Sending HTTP request...");

    let res = client
        .get(&request_url)
        .header(
            USER_AGENT,
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
        )
        .header(ACCEPT, "application/octet-stream")
        .send()
        .await
        .map_err(|e| format!("Failed to send request to `{}`: {}", &request_url, e))?;

    // Check response status
    if !res.status().is_success() {
        return Err(format!(
            "Server returned error status {} for `{}`",
            res.status(),
            &request_url
        ));
    }

    let total_size = res.content_length().ok_or(format!(
        "Failed to get content length from `{}`",
        &request_url
    ))?;

    let mut file: File = File::create(&path).or(Err(format!("创建 `{}` 文件失败", &path)))?;
    let mut stream = res.bytes_stream();
    let mut progress = Progress {
        filesize: total_size,
        transfered: 0,
        transfer_rate: 0.0,
        percentage: 0.0,
    };

    let start = Instant::now();
    let mut downloaded_bytes = 0;
    let mut last_update = Instant::now();
    while let Some(item) = stream.next().await {
        let chunk =
            item.map_err(|e| format!("Stream error while downloading `{}`: {}", &request_url, e))?;
        file.write(&chunk)
            .map_err(|e| format!("Failed to write to file `{}`: {}", &path, e))?;
        downloaded_bytes = min(downloaded_bytes + (chunk.len() as u64), total_size);

        progress.transfered = downloaded_bytes;
        progress.percentage = (progress.transfered * 100 / total_size) as f64;
        progress.transfer_rate = (downloaded_bytes as f64) / (start.elapsed().as_secs() as f64)
            + (start.elapsed().subsec_nanos() as f64 / 1_000_000_000.0).trunc();

        if last_update.elapsed().as_millis() >= 100 {
            progress.emit_progress(&app_handle);
            last_update = std::time::Instant::now();
        }
    }

    progress.emit_finished(&app_handle);
    log::info!(
        "Successfully downloaded {} bytes to {}",
        downloaded_bytes,
        &path
    );

    return Ok(());
}

#[tauri::command]
pub fn unzip_file(zip_path: String, dest_dir: String) -> Result<(), String> {
    let file = File::open(&zip_path).map_err(|e| e.to_string())?;
    let mut archive = ZipArchive::new(BufReader::new(file)).map_err(|e| e.to_string())?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
        let outpath = Path::new(&dest_dir).join(file.name());

        if (*file.name()).ends_with('/') {
            std::fs::create_dir_all(&outpath).map_err(|e| e.to_string())?;
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    std::fs::create_dir_all(&p).map_err(|e| e.to_string())?;
                }
            }
            let mut outfile = File::create(&outpath).map_err(|e| e.to_string())?;
            io::copy(&mut file, &mut outfile).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

#[tauri::command]
pub fn grant_permission(app: tauri::AppHandle, path: String) {
    // exec chmod +x only on macOS
    #[cfg(target_os = "macos")]
    {
        let work_dir = app.path_resolver().app_data_dir().unwrap();
        let work_dir = work_dir.to_str().unwrap();
        let path = format!("{}/{}", work_dir, path);
        // chmod +x
        let mut command = Command::new("chmod");
        command
            .args(&["+x", &path])
            .status()
            .expect("failed to chmod");
        log::info!("grant_permission: {}", path);
    }
    #[cfg(target_os = "windows")]
    {
        let work_dir = app.path_resolver().app_data_dir().unwrap();
        let work_dir = work_dir.to_str().unwrap();
        let path = format!("{}/{}", work_dir, path);
        log::info!("no need grant_permission: {}", path);
    }
}

#[tauri::command]
pub fn open_dir(name: String, app: tauri::AppHandle) {
    let path = format!(
        "{}{}{}",
        app.path_resolver()
            .app_data_dir()
            .unwrap()
            .to_str()
            .unwrap(),
        std::path::MAIN_SEPARATOR,
        name
    );
    log::info!("open_dir: {}", path);
    let _ = open::that(path);
}

#[tauri::command]
pub fn open_adb_terminal(dir: String) {
    #[cfg(target_os = "windows")]
    {
        const CREATE_NEW_CONSOLE: u32 = 0x00000010;
        // powershell -NoExit -Command "cd 'C:/path/to/platform-tools'"
        let mut command = Command::new("powershell.exe");
        command.args(&[
            "-NoExit",
            "-Command",
            &format!("cd '{}';", dir.replace("\\", "/")),
        ]);
        command
            .creation_flags(CREATE_NEW_CONSOLE)
            .spawn()
            .expect("failed to open PowerShell");
    }
    #[cfg(target_os = "macos")]
    {
        // osascript -e 'tell application "Terminal" to do script "cd /path/to/platform-tools"'
        let script = format!(
            "tell application \"Terminal\" to do script \"cd '{}'\"",
            dir.replace("'", "\\'")
        );
        let mut command = Command::new("osascript");
        command.args(&["-e", &script]);
        command.spawn().expect("failed to open Terminal");
    }
}

/// Delete logs older than 3 days
pub fn delete_logs_older_than_3_days(work_dir: &str) {
    let logs_dir = format!("{}/logs", work_dir);
    let logs_dir = Path::new(&logs_dir);
    if logs_dir.exists() {
        for entry in std::fs::read_dir(logs_dir).unwrap() {
            let entry = entry.unwrap();
            let path = entry.path();
            if path.is_file() {
                let metadata = std::fs::metadata(&path).unwrap();
                let last_modified = metadata.created().unwrap();
                let three_days_ago =
                    std::time::SystemTime::now() - std::time::Duration::from_secs(3 * 24 * 60 * 60);
                if last_modified < three_days_ago {
                    log::info!("delete expired log: {}", path.to_str().unwrap());
                    std::fs::remove_file(&path).unwrap();
                }
            }
        }
    }
}
