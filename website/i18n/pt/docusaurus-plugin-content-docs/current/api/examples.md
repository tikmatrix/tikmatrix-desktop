---
sidebar_position: 3
title: Exemplos de API
description: Exemplos de código para usar a API Local do TikMatrix
---

Esta página fornece exemplos de código para usar a API Local do TikMatrix em diferentes linguagens de programação.

## Python

```python
import requests
import json

BASE_URL = "http://localhost:50809/api/v1"

def check_license():
    """Verifica se o acesso à API está disponível"""
    response = requests.get(f"{BASE_URL}/license/check")
    return response.json()

def create_task(serials, script_name, script_config=None, multi_account=False):
    """Cria uma nova tarefa"""
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
    """Lista tarefas com filtros opcionais"""
    params = {"page": page, "page_size": page_size}
    if status is not None:
        params["status"] = status
    response = requests.get(f"{BASE_URL}/task", params=params)
    return response.json()

def get_task(task_id):
    """Obtém detalhes da tarefa"""
    response = requests.get(f"{BASE_URL}/task/{task_id}")
    return response.json()

def delete_task(task_id):
    """Deleta uma tarefa"""
    response = requests.delete(f"{BASE_URL}/task/{task_id}")
    return response.json()

def stop_task(task_id):
    """Para uma tarefa em execução"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/stop")
    return response.json()

def retry_task(task_id):
    """Retenta uma tarefa que falhou"""
    response = requests.post(f"{BASE_URL}/task/{task_id}/retry")
    return response.json()

def get_stats():
    """Obtém estatísticas de tarefas"""
    response = requests.get(f"{BASE_URL}/task/stats")
    return response.json()

# Exemplo de uso
if __name__ == "__main__":
    # Verifica licença primeiro
    license_info = check_license()
    if license_info["code"] != 0:
        print("Acesso à API não disponível:", license_info["message"])
        exit(1)
    
    print("Licença OK:", license_info["data"]["plan_name"])
    
    # Cria uma tarefa de follow
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("Tarefa criada:", result)
    
    # Obtém estatísticas
    stats = get_stats()
    print("Estatísticas:", stats["data"])
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

// Exemplo de uso
async function main() {
  // Verifica licença
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('Acesso à API não disponível:', license.message);
    return;
  }
  console.log('Licença OK:', license.data.plan_name);

  // Cria uma tarefa
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('Tarefa criada:', result);

  // Obtém estatísticas
  const stats = await getStats();
  console.log('Estatísticas:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# Verifica licença
curl http://localhost:50809/api/v1/license/check

# Cria uma tarefa
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# Lista tarefas pendentes
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# Obtém detalhes da tarefa
curl http://localhost:50809/api/v1/task/1

# Para uma tarefa
curl -X POST http://localhost:50809/api/v1/task/1/stop

# Retenta uma tarefa
curl -X POST http://localhost:50809/api/v1/task/1/retry

# Deleta uma tarefa
curl -X DELETE http://localhost:50809/api/v1/task/1

# Deleta tarefas em lote
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# Retenta todas as tarefas que falharam
curl -X POST http://localhost:50809/api/v1/task/retry-all

# Obtém estatísticas de tarefas
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

# Exemplo de uso
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "Acesso à API não disponível: $($license.message)"
    exit 1
}

Write-Host "Licença OK: $($license.data.plan_name)"

# Cria uma tarefa
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "Tarefa criada: $($result | ConvertTo-Json)"
```

## Casos de Uso Comuns

### Criar Tarefas em Lote para Múltiplos Dispositivos

```python
# Exemplo Python: Criar tarefas de follow para todos os dispositivos conectados
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"Criadas {result['data']['created_count']} tarefas")
```

### Monitorar Progresso da Tarefa

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """Aguarda todas as tarefas serem concluídas"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("Todas as tarefas concluídas!")
            return True
        
        print(f"Em execução: {running}, Pendentes: {pending}")
        time.sleep(5)
    
    print("Tempo esgotado aguardando tarefas")
    return False
```

### Retentar Tarefas que Falharam Automaticamente

```python
def auto_retry_failed(max_retries=3):
    """Retenta automaticamente tarefas que falharam"""
    for i in range(max_retries):
        # Obtém tarefas que falharam
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("Nenhuma tarefa falhou")
            return
        
        print(f"Retentando {failed['data']['total']} tarefas que falharam (tentativa {i+1})")
        
        # Retenta todas
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # Aguarda conclusão
        time.sleep(30)
```
