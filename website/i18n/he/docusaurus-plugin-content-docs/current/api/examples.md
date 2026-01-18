---
sidebar_position: 3
title: דוגמאות API
description: דוגמאות קוד לשימוש ב-API המקומי של TikMatrix
---

עמוד זה מספק דוגמאות קוד לשימוש ב-API המקומי של TikMatrix בשפות תכנות שונות.

## Python

```python
import requests

BASE_URL = "http://localhost:50809/api/v1"

def create_task(serials, script_name, script_config):
    response = requests.post(
        f"{BASE_URL}/task",
        json={
            "serials": serials,
            "script_name": script_name,
            "script_config": script_config
        }
    )
    return response.json()
```

## JavaScript / Node.js

```javascript
const BASE_URL = 'http://localhost:50809/api/v1';

async function createTask(serials, scriptName, scriptConfig) {
  const response = await fetch(`${BASE_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serials,
      script_name: scriptName,
      script_config: scriptConfig
    })
  });
  return response.json();
}
```

## cURL

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {"target_username": "@tikmatrix"}
  }'
```

## שיטות עבודה מומלצות

- בדוק תמיד את הרישיון לפני יצירת משימות
- השתמש במטפלי שגיאות מתאימים
- נטר את מצב המשימות
