---
sidebar_position: 3
title: Ejemplos de API
description: Ejemplos de código para usar la API local de TikMatrix
---

Esta página proporciona ejemplos de código para usar la API local de TikMatrix en diferentes lenguajes de programación.

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

# Ejemplo de uso
if __name__ == "__main__":
    # Primero verificar la licencia
    license_info = check_license()
    if license_info["code"] != 0:
        print("API no disponible:", license_info["message"])
        exit(1)
    
    print("Licencia válida:", license_info["data"]["plan_name"])
    
    # Crear una tarea de seguir
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("Tarea creada:", result)
    
    # Obtener estadísticas
    stats = get_stats()
    print("Estadísticas:", stats["data"])
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

// Ejemplo de uso
async function main() {
  // Verificar licencia
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('API no disponible:', license.message);
    return;
  }
  console.log('Licencia válida:', license.data.plan_name);

  // Crear tarea
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('Tarea creada:', result);

  // Obtener estadísticas
  const stats = await getStats();
  console.log('Estadísticas:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# Verificar licencia
curl http://localhost:50809/api/v1/license/check

# Crear tarea
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# Listar tareas pendientes
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# Obtener detalles de tarea
curl http://localhost:50809/api/v1/task/1

# Detener tarea
curl -X POST http://localhost:50809/api/v1/task/1/stop

# Reintentar tarea
curl -X POST http://localhost:50809/api/v1/task/1/retry

# Eliminar tarea
curl -X DELETE http://localhost:50809/api/v1/task/1

# Eliminar tareas por lotes
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# Reintentar todas las tareas fallidas
curl -X POST http://localhost:50809/api/v1/task/retry-all

# Obtener estadísticas de tareas
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

# Ejemplo de uso
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "API no disponible: $($license.message)"
    exit 1
}

Write-Host "Licencia válida: $($license.data.plan_name)"

# Crear tarea
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "Tarea creada: $($result | ConvertTo-Json)"
```

## Escenarios de Uso Comunes

### Crear Tareas por Lotes para Múltiples Dispositivos

```python
# Ejemplo en Python: Crear tarea de seguir para todos los dispositivos conectados
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"Se crearon {result['data']['created_count']} tareas")
```

### Monitorear Progreso de Tareas

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """Esperar a que todas las tareas se completen"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("¡Todas las tareas completadas!")
            return True
        
        print(f"En ejecución: {running}, Pendientes: {pending}")
        time.sleep(5)
    
    print("Tiempo de espera agotado")
    return False
```

### Reintentar Automáticamente Tareas Fallidas

```python
def auto_retry_failed(max_retries=3):
    """Reintentar automáticamente tareas fallidas"""
    for i in range(max_retries):
        # Obtener tareas fallidas
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("No hay tareas fallidas")
            return
        
        print(f"Reintentando {failed['data']['total']} tareas fallidas (intento {i+1})")
        
        # Reintentar todas
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # Esperar completar
        time.sleep(30)
```
