---
sidebar_position: 1
title: סקירת API מקומי
description: API מקומי של TikMatrix לניהול משימות באופן תכנותי
---

TikMatrix מספק API מקומי בסגנון RESTful המאפשר לך לנהל משימות באופן תכנותי.

## דרישות

:::warning דרישות רישיון
**ה-API המקומי זמין רק למשתמשי תוכניות Pro, Team ו-Business.** תוכנית Starter אינה כוללת גישה ל-API.
:::

## כתובת URL בסיסית

ה-API פועל מקומית בכתובת:

```text
http://localhost:50809/api/v1/
```

## פורמט תגובה

כל תגובות ה-API עוקבות אחר הפורמט הבא:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

## קודי תגובה

| קוד | תיאור |
|------|------|
| 0 | הצלחה |
| 40001 | שגיאת פרמטר |
| 40301 | אסור - דרושה תוכנית Pro+ |
| 40401 | לא נמצא |
| 50001 | שגיאת שרת פנימית |

## התחלה מהירה

### 1. בדוק גישת API

```bash
curl http://localhost:50809/api/v1/license/check
```

### 2. צור משימה

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {...}
  }'
```

## סקריפטים זמינים

| שם סקריפט | תיאור | תמיכה ב-API |
|--------|------|----------|
| `post` | פרסום תוכן | ✅ נתמך |
| `follow` | מעקב אחרי משתמשים | ✅ נתמך |
| `unfollow` | ביטול מעקב | ✅ נתמך |
| `account_warmup` | חימום חשבון | ✅ נתמך |
| `comment` | תגובות | ✅ נתמך |

## ראה גם

- [API ניהול משימות](./task-management)
- [דוגמאות API](./examples)
