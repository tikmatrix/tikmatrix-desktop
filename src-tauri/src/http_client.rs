use crate::auto_update_manager;
use crate::proxy_config;
use base64::{engine::general_purpose::STANDARD as BASE64_STANDARD, Engine};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::fs;
use tauri::{AppHandle, Manager};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Progress {
    pub filesize: u64,
    pub transfered: u64,
    pub transfer_rate: f64,
    pub percentage: f64,
}

impl Progress {
    pub fn emit_progress(&self, handle: &AppHandle) {
        handle.emit_all("DOWNLOAD_PROGRESS", &self).ok();
    }

    pub fn emit_finished(&self, handle: &AppHandle) {
        handle.emit_all("DOWNLOAD_FINISHED", &self).ok();
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct HttpResponse {
    pub status: u16,
    pub headers: std::collections::HashMap<String, String>,
    pub body: String,
}

/// Generic HTTP request handler with intelligent proxy selection
#[tauri::command]
pub async fn http_request(
    method: String,
    url: String,
    headers: Option<std::collections::HashMap<String, String>>,
    body: Option<String>,
    timeout: Option<u64>,
) -> Result<HttpResponse, String> {
    // Create client with timeout
    let timeout_duration = std::time::Duration::from_secs(timeout.unwrap_or(30));
    let mut client_builder = Client::builder()
        .connect_timeout(std::time::Duration::from_secs(10))
        .timeout(timeout_duration);

    // Apply intelligent proxy configuration (bypasses localhost automatically)
    client_builder = proxy_config::apply_proxy_config(client_builder, &url)?;

    let client = client_builder
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    // Build request
    let mut request = match method.to_uppercase().as_str() {
        "GET" => client.get(&url),
        "POST" => client.post(&url),
        "PUT" => client.put(&url),
        "DELETE" => client.delete(&url),
        "PATCH" => client.patch(&url),
        "HEAD" => client.head(&url),
        _ => return Err(format!("Unsupported HTTP method: {}", method)),
    };

    // Add headers
    if let Some(headers_map) = headers {
        for (key, value) in headers_map {
            request = request.header(&key, &value);
        }
    }

    // Add body for POST/PUT/PATCH
    if let Some(body_content) = body {
        request = request.body(body_content);
    }

    // Send request
    let response = request
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    // Extract response details
    let status = response.status().as_u16();
    log::info!(
        "HTTP request: {} {} ==> Response status: {}",
        method,
        url,
        status
    );
    let mut response_headers = std::collections::HashMap::new();
    for (key, value) in response.headers() {
        if let Ok(value_str) = value.to_str() {
            response_headers.insert(key.to_string(), value_str.to_string());
        }
    }

    // Get response body as text
    let body_text = response
        .text()
        .await
        .map_err(|e| format!("Failed to read response body: {}", e))?;

    Ok(HttpResponse {
        status,
        headers: response_headers,
        body: body_text,
    })
}

/// Agent request handler - automatically reads port and handles localhost agent requests
#[tauri::command]
pub async fn agent_request(
    app_handle: tauri::AppHandle,
    method: String,
    url: String,
    params: Option<std::collections::HashMap<String, serde_json::Value>>,
    headers: Option<std::collections::HashMap<String, String>>,
    body: Option<String>,
    form: Option<std::collections::HashMap<String, String>>,
    data: Option<serde_json::Value>,
    timeout: Option<u64>,
    raw_response: bool,
    response_type: Option<String>,
) -> Result<serde_json::Value, String> {
    // Update user activity timestamp for auto-update manager
    auto_update_manager::update_user_activity();

    // Check if binary response is requested
    let is_binary = response_type
        .as_ref()
        .map(|t| t.to_lowercase() == "binary")
        .unwrap_or(false);

    // Read agent port from file
    let app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    let port_file = app_data_dir.join("port.txt");

    let port = match fs::read_to_string(&port_file) {
        Ok(content) => {
            let trimmed = content.trim();
            if trimmed == "0" {
                log::info!("Agent port is 0, agent not ready yet");
                return Ok(serde_json::json!({ "code": 0, "data": [] }));
            }
            trimmed.to_string()
        }
        Err(_) => {
            log::warn!("Failed to read agent port, using default 50809");
            "50809".to_string()
        }
    };

    // Build query string from params
    let query_string = if let Some(params_map) = params {
        let mut query_parts = Vec::new();
        for (key, value) in params_map {
            // Handle different JSON value types
            match value {
                serde_json::Value::Null => continue,
                serde_json::Value::Array(arr) => {
                    for item in arr {
                        if !item.is_null() {
                            let value_str = match item {
                                serde_json::Value::String(s) => s,
                                _ => item.to_string().trim_matches('"').to_string(),
                            };
                            query_parts.push(format!(
                                "{}={}",
                                urlencoding::encode(&key),
                                urlencoding::encode(&value_str)
                            ));
                        }
                    }
                }
                _ => {
                    let value_str = match value {
                        serde_json::Value::String(s) => s,
                        _ => value.to_string().trim_matches('"').to_string(),
                    };
                    query_parts.push(format!(
                        "{}={}",
                        urlencoding::encode(&key),
                        urlencoding::encode(&value_str)
                    ));
                }
            }
        }
        if query_parts.is_empty() {
            String::new()
        } else {
            format!("?{}", query_parts.join("&"))
        }
    } else {
        String::new()
    };

    let query_url = format!("http://localhost:{}{}{}", port, url, query_string);

    // Prepare headers
    let mut final_headers = headers.unwrap_or_default();

    // Handle body content
    let body_string = if let Some(body_content) = body {
        Some(body_content)
    } else if let Some(form_data) = form {
        // Form data - convert to URL encoded string
        final_headers.insert(
            "Content-Type".to_string(),
            "application/x-www-form-urlencoded".to_string(),
        );
        let form_parts: Vec<String> = form_data
            .iter()
            .map(|(k, v)| format!("{}={}", urlencoding::encode(k), urlencoding::encode(v)))
            .collect();
        Some(form_parts.join("&"))
    } else if let Some(json_data) = data {
        // JSON data
        if !final_headers.contains_key("Content-Type")
            && !final_headers.contains_key("content-type")
        {
            final_headers.insert("Content-Type".to_string(), "application/json".to_string());
        }
        Some(json_data.to_string())
    } else {
        None
    };

    // Handle binary response type separately
    if is_binary {
        return make_binary_request(
            app_handle,
            method,
            query_url,
            final_headers,
            body_string,
            timeout,
        )
        .await;
    }

    // Make HTTP request using the generic http_request
    let response = http_request(
        method,
        query_url.clone(),
        Some(final_headers),
        body_string,
        timeout,
    )
    .await?;

    // Handle error responses with notification
    if response.status >= 400 {
        let error_message = format!(
            "url: {}, code: {}, message: {}",
            query_url, response.status, response.body
        );

        // Emit error notification
        app_handle
            .emit_all(
                "NOTIFY",
                serde_json::json!({
                    "type": "error",
                    "message": error_message,
                    "timeout": 2000
                }),
            )
            .ok();

        if raw_response {
            return Ok(serde_json::json!(response));
        }

        // Try to parse error body as JSON
        let error_data = serde_json::from_str::<serde_json::Value>(&response.body)
            .unwrap_or_else(|_| serde_json::Value::String(response.body.clone()));

        return Ok(serde_json::json!({
            "code": response.status,
            "data": error_data,
            "error": error_data
        }));
    }

    // Return raw response if requested
    if raw_response {
        return Ok(serde_json::json!(response));
    }

    // Parse JSON response
    match serde_json::from_str::<serde_json::Value>(&response.body) {
        Ok(json) => Ok(json),
        Err(_) => Ok(serde_json::Value::String(response.body)),
    }
}

/// Handle binary response requests (for images, videos, etc.)
async fn make_binary_request(
    app_handle: tauri::AppHandle,
    method: String,
    url: String,
    headers: std::collections::HashMap<String, String>,
    body: Option<String>,
    timeout: Option<u64>,
) -> Result<serde_json::Value, String> {
    let timeout_duration = std::time::Duration::from_secs(timeout.unwrap_or(60));
    let mut client_builder = Client::builder()
        .connect_timeout(std::time::Duration::from_secs(10))
        .timeout(timeout_duration);

    client_builder = proxy_config::apply_proxy_config(client_builder, &url)?;

    let client = client_builder
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let mut request = match method.to_uppercase().as_str() {
        "GET" => client.get(&url),
        "POST" => client.post(&url),
        "PUT" => client.put(&url),
        "DELETE" => client.delete(&url),
        "PATCH" => client.patch(&url),
        "HEAD" => client.head(&url),
        _ => return Err(format!("Unsupported HTTP method: {}", method)),
    };

    for (key, value) in headers.iter() {
        request = request.header(key, value);
    }

    if let Some(body_content) = body {
        request = request.body(body_content);
    }

    let response = request
        .send()
        .await
        .map_err(|e| format!("Binary request failed: {}", e))?;

    let status = response.status().as_u16();
    log::info!(
        "Binary HTTP request: {} {} ==> Response status: {}",
        method,
        url,
        status
    );

    let mut response_headers = std::collections::HashMap::new();
    for (key, value) in response.headers() {
        if let Ok(value_str) = value.to_str() {
            response_headers.insert(key.to_string(), value_str.to_string());
        }
    }

    // Handle error responses
    if status >= 400 {
        let error_body = response
            .text()
            .await
            .unwrap_or_else(|_| "Failed to read error response".to_string());
        let error_message = format!("url: {}, code: {}, message: {}", url, status, error_body);

        app_handle
            .emit_all(
                "NOTIFY",
                serde_json::json!({
                    "type": "error",
                    "message": error_message,
                    "timeout": 2000
                }),
            )
            .ok();

        return Ok(serde_json::json!({
            "status": status,
            "headers": response_headers,
            "data": null,
            "error": error_body
        }));
    }

    // Read response as bytes and encode to base64
    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read binary response: {}", e))?;

    let base64_data = BASE64_STANDARD.encode(&bytes);

    Ok(serde_json::json!({
        "status": status,
        "headers": response_headers,
        "data": base64_data
    }))
}
