---
sidebar_position: 3
title: أمثلة API
description: أمثلة أكواد لاستخدام API المحلي لـ TikMatrix
---

تقدم هذه الصفحة أمثلة أكواد لاستخدام API المحلي لـ TikMatrix في لغات برمجة مختلفة.

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

# مثال على الاستخدام
if __name__ == "__main__":
    # أولاً، تحقق من الترخيص
    license_info = check_license()
    if license_info["code"] != 0:
        print("الوصول إلى API غير متاح:", license_info["message"])
        exit(1)
    
    print("الترخيص صالح:", license_info["data"]["plan_name"])
    
    # إنشاء مهمة متابعة
    result = create_task(
        serials=["device_serial_1"],
        script_name="follow",
        script_config={"target_username": "@tikmatrix"}
    )
    print("تم إنشاء المهمة:", result)
    
    # الحصول على الإحصائيات
    stats = get_stats()
    print("الإحصائيات:", stats["data"])
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

// مثال على الاستخدام
async function main() {
  // التحقق من الترخيص
  const license = await checkLicense();
  if (license.code !== 0) {
    console.error('الوصول إلى API غير متاح:', license.message);
    return;
  }
  console.log('الترخيص صالح:', license.data.plan_name);

  // إنشاء مهمة
  const result = await createTask(
    ['device_serial_1'],
    'follow',
    { target_username: '@tikmatrix' }
  );
  console.log('تم إنشاء المهمة:', result);

  // الحصول على الإحصائيات
  const stats = await getStats();
  console.log('الإحصائيات:', stats.data);
}

main().catch(console.error);
```

## cURL

```bash
# التحقق من الترخيص
curl http://localhost:50809/api/v1/license/check

# إنشاء مهمة
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"},
    "enable_multi_account": false
  }'

# إدراج المهام المعلقة
curl "http://localhost:50809/api/v1/task?status=0&page=1&page_size=20"

# الحصول على تفاصيل المهمة
curl http://localhost:50809/api/v1/task/1

# إيقاف مهمة
curl -X POST http://localhost:50809/api/v1/task/1/stop

# إعادة محاولة مهمة
curl -X POST http://localhost:50809/api/v1/task/1/retry

# حذف مهمة
curl -X DELETE http://localhost:50809/api/v1/task/1

# حذف مهام دفعية
curl -X DELETE http://localhost:50809/api/v1/task/batch \
  -H "Content-Type: application/json" \
  -d '{"task_ids": [1, 2, 3]}'

# إعادة محاولة جميع المهام الفاشلة
curl -X POST http://localhost:50809/api/v1/task/retry-all

# الحصول على إحصائيات المهام
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

# مثال على الاستخدام
$license = Check-License
if ($license.code -ne 0) {
    Write-Error "الوصول إلى API غير متاح: $($license.message)"
    exit 1
}

Write-Host "الترخيص صالح: $($license.data.plan_name)"

# إنشاء مهمة
$result = Create-Task -Serials @("device_serial_1") `
    -ScriptName "follow" `
    -ScriptConfig @{ target_username = "@tikmatrix" }

Write-Host "تم إنشاء المهمة: $($result | ConvertTo-Json)"
```

## سيناريوهات الاستخدام الشائعة

### إنشاء مهام دفعية لعدة أجهزة

```python
# مثال Python: إنشاء مهام متابعة لجميع الأجهزة المتصلة
devices = ["device_1", "device_2", "device_3", "device_4", "device_5"]

result = create_task(
    serials=devices,
    script_name="follow",
    script_config={"target_username": "@target_user"},
    multi_account=True
)

print(f"تم إنشاء {result['data']['created_count']} مهمة")
```

### مراقبة تقدم المهام

```python
import time

def wait_for_completion(task_ids, timeout=300):
    """انتظار اكتمال جميع المهام"""
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        stats = get_stats()
        running = stats['data']['running']
        pending = stats['data']['pending']
        
        if running == 0 and pending == 0:
            print("اكتملت جميع المهام!")
            return True
        
        print(f"قيد التشغيل: {running}, في الانتظار: {pending}")
        time.sleep(5)
    
    print("انتهى وقت انتظار المهام")
    return False
```

### إعادة محاولة المهام الفاشلة تلقائيًا

```python
def auto_retry_failed(max_retries=3):
    """إعادة محاولة المهام الفاشلة تلقائيًا"""
    for i in range(max_retries):
        # الحصول على المهام الفاشلة
        failed = list_tasks(status=3)
        if failed['data']['total'] == 0:
            print("لا توجد مهام فاشلة")
            return
        
        print(f"إعادة محاولة {failed['data']['total']} مهمة فاشلة (المحاولة {i+1})")
        
        # إعادة محاولة الجميع
        result = requests.post(f"{BASE_URL}/task/retry-all")
        
        # الانتظار حتى الاكتمال
        time.sleep(30)
```
