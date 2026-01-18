---
sidebar_position: 3
title: API उदाहरण
description: TikMatrix स्थानीय API का उपयोग करने के लिए कोड उदाहरण
---

यह पृष्ठ विभिन्न प्रोग्रामिंग भाषाओं में TikMatrix स्थानीय API का उपयोग करने के लिए उदाहरण कोड प्रदान करता है।

## Python

```python
import requests
import json

BASE_URL = "http://localhost:50809/api/v1"

def check_license():
    """Check if API access is available"""
    response = requests.get(f"{BASE_URL}/license/check")
    return response.json()

def create_task(serials, script_name, script_config=None, multi_account=False):
    """Create a new task"""
    payload = {
        "serials": serials,
        "script_name": script_name,
        "script_config": script_config or {},
        "enable_multi_account": multi_account
    }
    response = requests.post(
        f"{BASE_URL}/task",
        headers={"Content-Type": "application/json"},
        json=payload
    )
    return response.json()

def list_tasks(status=None, page=1, page_size=20):
    """List tasks with optional filters"""
    params = {"page": page, "page_size": page_size}
    if status is not None:
        params["status"] = status
    response = requests.get(f"{BASE_URL}/task", params=params)
    return response.json()

def get_task(task_id):
    """Get task details"""
    response = requests.get(f"{BASE_URL}/task/{task_id}")
    return response.json()

def delete_task(task_id):
    """Delete a task"""
    response = requests.delete(f"{BASE_URL}/task/{task_id}")
    return response.json()

def stop_task(task_id):
    """Stop a running task"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/stop")
    return response.json()

def retry_task(task_id):
    """Retry a failed task"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/retry")
    return response.json()

def get_stats():
    """Get task statistics"""
    response = requests.get(f"{BASE_URL}/task/stats")
    return response.json()

# उपयोग उदाहरण
if __name__ == "__main__":
    # पहले लाइसेंस की जांच करें
    license_info = check_license()
    if license_info["code"] != 0:
        print("API पहुंच उपलब्ध नहीं है:", license_info["message"])
        exit(1)
    
    print("लाइसेंस सामान्य:", license_info["data"]["plan_name"])
    
    # एक फ़ॉलो कार्य बनाएं
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("कार्य बनाया गया:", result)
    
    # सांख्यिकी प्राप्त करें
    stats = get_stats()
    print("सांख्यिकी:", stats["data"])
```

## JavaScript / Node.js

```javascript
const BASE_URL = 'http://localhost:50809/api/v1';

async function checkLicense() {
  const response = await fetch(`${BASE_URL}/license/check`);
  return response.json();
}

async function createTask(serials, scriptName, scriptConfig = {}, multiAccount = false) {
  const response = await fetch(`${BASE_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serials,
      script_name: scriptName,
      script_config: scriptConfig,
      enable_multi_account: multiAccount
    })
  });
  return response.json();
}

async function listTasks(status = null, page = 1, pageSize = 20) {
  const params = new URLSearchParams({ page, page_size: pageSize });
  if (status !== null) params.append('status', status);
  const response = await fetch(`${BASE_URL}/task?${params}`);
  return response.json();
}

async function getTask(taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}`);
  return response.json();
}

async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}`, { method: 'DELETE' });
  return response.json();
}

async function stopTask(taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}/stop`, { method: 'POST' });
  return response.json();
}

async function retryTask(taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}/retry`, { method: 'POST' });
  return response.json();
}

async function getStats() {
  const response = await fetch(`${BASE_URL}/task/stats`);
  return response.json();
}

// उपयोग उदाहरण
async function main() {
  // लाइसेंस की जांच करें
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('API पहुंच उपलब्ध नहीं है:', license.message);
    return;
  }
  console.log('लाइसेंस सामान्य:', license.data.plan_name);

  // कार्य बनाएं
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('कार्य बनाया गया:', result);

  // सांख्यिकी प्राप्त करें
  const stats = await getStats();
  console.log('सांख्यिकी:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# लाइसेंस की जांच करें
curl http://localhost:50809/api/v1/license/check

# कार्य बनाएं
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# लंबित कार्यों की सूची बनाएं
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# कार्य विवरण प्राप्त करें
curl http://localhost:50809/api/v1/task/1

# कार्य रोकें
curl -X POST http://localhost:50809/api/v1/task/1/stop

# कार्य पुनः प्रयास करें
curl -X POST http://localhost:50809/api/v1/task/1/retry

# कार्य हटाएं
curl -X DELETE http://localhost:50809/api/v1/task/1

# बैच में कार्य हटाएं
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# सभी विफल कार्य पुनः प्रयास करें
curl -X POST http://localhost:50809/api/v1/task/retry-all

# कार्य सांख्यिकी प्राप्त करें
curl http://localhost:50809/api/v1/task/stats
```

## PowerShell

```powershell
$BaseUrl = "http://localhost:50809/api/v1"

function Check-License {
    $response = Invoke-RestMethod -Uri "$BaseUrl/license/check" -Method Get
    return $response
}

function Create-Task {
    param(
        [string[]]$Serials,
        [string]$ScriptName,
        [hashtable]$ScriptConfig = @{},
        [bool]$MultiAccount = $false
    )
    
    $body = @{
        serials = $Serials
        script_name = $ScriptName
        script_config = $ScriptConfig
        enable_multi_account = $MultiAccount
    } | ConvertTo-Json -Depth 10
    
    $response = Invoke-RestMethod -Uri "$BaseUrl/task" -Method Post `
        -ContentType "application/json" -Body $body
    return $response
}

function Get-Tasks {
    param(
        [int]$Status = $null,
        [int]$Page = 1,
        [int]$PageSize = 20
    )
    
    $uri = "$BaseUrl/task?page=$Page&page_size=$PageSize"
    if ($null -ne $Status) { $uri += "&status=$Status" }
    
    $response = Invoke-RestMethod -Uri $uri -Method Get
    return $response
}

function Stop-TaskById {
    param([int]$TaskId)
    $response = Invoke-RestMethod -Uri "$BaseUrl/task/$TaskId/stop" -Method Post
    return $response
}

function Remove-TaskById {
    param([int]$TaskId)
    $response = Invoke-RestMethod -Uri "$BaseUrl/task/$TaskId" -Method Delete
    return $response
}

# उपयोग उदाहरण
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "API पहुंच उपलब्ध नहीं है: $($license.message)"
    exit 1
}

Write-Host "लाइसेंस सामान्य: $($license.data.plan_name)"

# कार्य बनाएं
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "कार्य बनाया गया: $($result | ConvertTo-Json)"
```

## सामान्य उपयोग परिदृश्य

### कई डिवाइस के लिए बैच में कार्य बनाएं

```python
# Python उदाहरण: सभी कनेक्टेड डिवाइस के लिए फ़ॉलो कार्य बनाएं
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"{result['data']['created_count']} कार्य बनाए गए")
```

### कार्य प्रगति की निगरानी करें

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """सभी कार्यों के पूरा होने की प्रतीक्षा करें"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("सभी कार्य पूर्ण!")
            return True
        
        print(f"चल रहे: {running}, प्रतीक्षा में: {pending}")
        time.sleep(5)
    
    print("कार्य प्रतीक्षा समय समाप्त")
    return False
```

### विफल कार्यों को स्वचालित रूप से पुनः प्रयास करें

```python
def auto_retry_failed(max_retries=3):
    """विफल कार्यों को स्वचालित रूप से पुनः प्रयास करें"""
    for i in range(max_retries):
        # विफल कार्य प्राप्त करें
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("कोई विफल कार्य नहीं")
            return
        
        print(f"{failed['data']['total']} विफल कार्यों को पुनः प्रयास कर रहे हैं (प्रयास {i+1})")
        
        # सभी को पुनः प्रयास करें
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # पूर्ण होने की प्रतीक्षा करें
        time.sleep(30)
```
