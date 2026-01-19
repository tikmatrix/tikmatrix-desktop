---
sidebar_position: 3
title: API Voorbeelden
description: Codevoorbeelden voor het gebruik van TikMatrix Local API
---

Deze pagina biedt codevoorbeelden voor het gebruik van de TikMatrix Local API in verschillende programmeertalen.

## Python

```python
import requests
import json

BASE_URL = "http://localhost:50809/api/v1"

def check_license():
    """Controleer of API-toegang beschikbaar is"""
    response = requests.get(f"{BASE_URL}/license/check")
    return response.json()

def create_task(serials, script_name, script_config=None, multi_account=False):
    """Maak een nieuwe taak"""
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
    """Taken weergeven met optionele filters"""
    params = {"page": page, "page_size": page_size}
    if status is not None:
        params["status"] = status
    response = requests.get(f"{BASE_URL}/task", params=params)
    return response.json()

def get_task(task_id):
    """Taakdetails ophalen"""
    response = requests.get(f"{BASE_URL}/task/{task_id}")
    return response.json()

def delete_task(task_id):
    """Een taak verwijderen"""
    response = requests.delete(f"{BASE_URL}/task/{task_id}")
    return response.json()

def stop_task(task_id):
    """Een actieve taak stoppen"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/stop")
    return response.json()

def retry_task(task_id):
    """Een mislukte taak opnieuw proberen"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/retry")
    return response.json()

def get_stats():
    """Taakstatistieken ophalen"""
    response = requests.get(f"{BASE_URL}/task/stats")
    return response.json()

# Gebruiksvoorbeeld
if __name__ == "__main__":
    # Controleer eerst de licentie
    license_info = check_license()
    if license_info["code"] != 0:
        print("API-toegang niet beschikbaar:", license_info["message"])
        exit(1)
    
    print("Licentie OK:", license_info["data"]["plan_name"])
    
    # Maak een follow taak
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("Taak gemaakt:", result)
    
    # Krijg statistieken
    stats = get_stats()
    print("Stats:", stats["data"])
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

// Usage example
async function main() {
  // Check license
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('API access not available:', license.message);
    return;
  }
  console.log('License OK:', license.data.plan_name);

  // Create a task
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('Task created:', result);

  // Get stats
  const stats = await getStats();
  console.log('Stats:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# Controleer licentie
curl http://localhost:50809/api/v1/license/check

# Maak een taak
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# Toon wachtende taken
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# Haal taakdetails op
curl http://localhost:50809/api/v1/task/1

# Stop een taak
curl -X POST http://localhost:50809/api/v1/task/1/stop

# Probeer een taak opnieuw
curl -X POST http://localhost:50809/api/v1/task/1/retry

# Verwijder een taak
curl -X DELETE http://localhost:50809/api/v1/task/1

# Verwijder taken in batch
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# Probeer alle mislukte taken opnieuw
curl -X POST http://localhost:50809/api/v1/task/retry-all

# Haal taakstatistieken op
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

# Gebruiksvoorbeeld
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "API-toegang niet beschikbaar: $($license.message)"
    exit 1
}

Write-Host "Licentie OK: $($license.data.plan_name)"

# Maak een taak
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "Taak gemaakt: $($result | ConvertTo-Json)"
```

## Veelvoorkomende Gebruikssituaties

### Batch Taken Maken voor Meerdere Apparaten

```python
# Python voorbeeld: Maak follow taken voor alle verbonden apparaten
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"Gemaakt {result['data']['created_count']} taken")
```

### Taakvoortgang Monitoren

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """Wacht tot alle taken zijn voltooid"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("Alle taken voltooid!")
            return True
        
        print(f"Actief: {running}, Wachtend: {pending}")
        time.sleep(5)
    
    print("Timeout bij het wachten op taken")
    return False
```

### Automatisch Mislukte Taken Opnieuw Proberen

```python
def auto_retry_failed(max_retries=3):
    """Probeer mislukte taken automatisch opnieuw"""
    for i in range(max_retries):
        # Haal mislukte taken op
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("Geen mislukte taken")
            return
        
        print(f"Probeer {failed['data']['total']} mislukte taken opnieuw (poging {i+1})")
        
        # Probeer alle opnieuw
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # Wacht op voltooiing
        time.sleep(30)
```
