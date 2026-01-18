---
sidebar_position: 3
title: Exemples d'API
description: Exemples de code utilisant l'API locale TikMatrix
---

Cette page fournit des exemples de code pour utiliser l'API locale TikMatrix dans différents langages de programmation.

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

# Exemple d'utilisation
if __name__ == "__main__":
    # Vérifier d'abord la licence
    license_info = check_license()
    if license_info["code"] != 0:
        print("Accès API non disponible:", license_info["message"])
        exit(1)
    
    print("Licence valide:", license_info["data"]["plan_name"])
    
    # Créer une tâche de suivi
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("Tâche créée:", result)
    
    # Obtenir les statistiques
    stats = get_stats()
    print("Statistiques:", stats["data"])
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

// Exemple d'utilisation
async function main() {
  // Vérifier la licence
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('Accès API non disponible:', license.message);
    return;
  }
  console.log('Licence valide:', license.data.plan_name);

  // Créer une tâche
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('Tâche créée:', result);

  // Obtenir les statistiques
  const stats = await getStats();
  console.log('Statistiques:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# Vérifier la licence
curl http://localhost:50809/api/v1/license/check

# Créer une tâche
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# Lister les tâches en attente
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# Obtenir les détails d'une tâche
curl http://localhost:50809/api/v1/task/1

# Arrêter une tâche
curl -X POST http://localhost:50809/api/v1/task/1/stop

# Réessayer une tâche
curl -X POST http://localhost:50809/api/v1/task/1/retry

# Supprimer une tâche
curl -X DELETE http://localhost:50809/api/v1/task/1

# Supprimer plusieurs tâches
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# Réessayer toutes les tâches échouées
curl -X POST http://localhost:50809/api/v1/task/retry-all

# Obtenir les statistiques des tâches
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

# Exemple d'utilisation
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "Accès API non disponible: $($license.message)"
    exit 1
}

Write-Host "Licence valide: $($license.data.plan_name)"

# Créer une tâche
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "Tâche créée: $($result | ConvertTo-Json)"
```

## Cas d'Usage Courants

### Créer des Tâches en Masse pour Plusieurs Appareils

```python
# Exemple Python : Créer une tâche de suivi pour tous les appareils connectés
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"{result['data']['created_count']} tâches créées")
```

### Surveiller la Progression des Tâches

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """Attendre que toutes les tâches soient terminées"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("Toutes les tâches sont terminées !")
            return True
        
        print(f"En cours: {running}, En attente: {pending}")
        time.sleep(5)
    
    print("Délai d'attente des tâches dépassé")
    return False
```

### Réessayer Automatiquement les Tâches Échouées

```python
def auto_retry_failed(max_retries=3):
    """Réessayer automatiquement les tâches échouées"""
    for i in range(max_retries):
        # Obtenir les tâches échouées
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("Aucune tâche échouée")
            return
        
        print(f"Réessayer {failed['data']['total']} tâches échouées (tentative {i+1})")
        
        # Réessayer toutes
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # Attendre la fin
        time.sleep(30)
```
