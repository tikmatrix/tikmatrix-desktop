---
sidebar_position: 3
title: أمثلة API
description: أمثلة التعليمات البرمجية لاستخدام API المحلي لـ TikMatrix
---

توفر هذه الصفحة أمثلة التعليمات البرمجية لاستخدام TikMatrix API المحلي بلغات برمجة مختلفة.

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

# 使用示例
if __name__ == "__main__":
    # 首先检查许可证
    license_info = check_license()
    if license_info["code"] != 0:
        print("API 访问不可用:", license_info["message"])
        exit(1)
    
    print("许可证正常:", license_info["data"]["plan_name"])
    
    # 创建一个关注任务
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("任务已创建:", result)
    
    # 获取统计信息
    stats = get_stats()
    print("统计:", stats["data"])
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

// 使用示例
async function main() {
  // 检查许可证
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('API 访问不可用:', license.message);
    return;
  }
  console.log('许可证正常:', license.data.plan_name);

  // 创建任务
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('任务已创建:', result);

  // 获取统计信息
  const stats = await getStats();
  console.log('统计:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# 检查许可证
curl http://localhost:50809/api/v1/license/check

# 创建任务
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# 列出待处理任务
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# 获取任务详情
curl http://localhost:50809/api/v1/task/1

# 停止任务
curl -X POST http://localhost:50809/api/v1/task/1/stop

# 重试任务
curl -X POST http://localhost:50809/api/v1/task/1/retry

# 删除任务
curl -X DELETE http://localhost:50809/api/v1/task/1

# 批量删除任务
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# 重试所有失败任务
curl -X POST http://localhost:50809/api/v1/task/retry-all

# 获取任务统计
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

# 使用示例
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "API 访问不可用: $($license.message)"
    exit 1
}

Write-Host "许可证正常: $($license.data.plan_name)"

# 创建任务
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "任务已创建: $($result | ConvertTo-Json)"
```

## 常见استخدام场景

### 为多个设备批量إنشاء مهمة

```python
# Python 示例：为所有已连接设备创建关注任务
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"已创建 {result['data']['created_count']} 个任务")
```

### 监控任务进度

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """等待所有任务完成"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("所有任务已完成！")
            return True
        
        print(f"运行中: {running}, 等待中: {pending}")
        time.sleep(5)
    
    print("等待任务超时")
    return False
```

### 自动重试失败任务

```python
def auto_retry_failed(max_retries=3):
    """自动重试失败的任务"""
    for i in range(max_retries):
        # 获取失败任务
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("没有失败的任务")
            return
        
        print(f"重试 {failed['data']['total']} 个失败任务（第 {i+1} 次尝试）")
        
        # 重试所有
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # 等待完成
        time.sleep(30)
```
