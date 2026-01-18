---
sidebar_position: 2
title: API ניהול משימות
description: מדריך מלא לנקודות קצה ניהול משימות
---

עמוד זה מתעד את כל נקודות הקצה הזמינות לניהול משימות TikMatrix.

## יצירת משימה

צור משימות חדשות עבור מכשירים או שמות משתמש.

- **נקודת קצה:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### פרמטרי בקשה

| פרמטר | סוג | נדרש | תיאור |
|------|------|------|------|
| serials | string[] | תנאי | מערך מספרי סידורי של מכשירים |
| usernames | string[] | תנאי | מערך שמות משתמש |
| script_name | string | כן | שם הסקריפט לביצוע |
| script_config | object | כן | פרמטרי תצורת סקריפט |
| enable_multi_account | boolean | לא | האם להפעיל מצב ריבוי חשבונות |
| start_time | string | לא | זמן ביצוע מתוכנן (פורמט: "HH:MM") |

## רשימת משימות

שאל משימות עם מסננים אופציונליים.

- **נקודת קצה:** `GET /api/v1/task`

| פרמטר | סוג | תיאור |
|------|------|------|
| status | integer | סינון לפי מצב |
| serial | string | סינון לפי מספר סידורי מכשיר |
| page | integer | מספר עמוד |
| page_size | integer | פריטים לעמוד |

## קבלת פרטי משימה

- **נקודת קצה:** `GET /api/v1/task/{task_id}`

## מחיקת משימה

- **נקודת קצה:** `DELETE /api/v1/task/{task_id}`

## עצירת משימה

- **נקודת קצה:** `POST /api/v1/task/{task_id}/stop`

## ניסיון חוזר למשימה

- **נקודת קצה:** `POST /api/v1/task/{task_id}/retry`

## סטטיסטיקות משימות

- **נקודת קצה:** `GET /api/v1/task/stats`

## ראה גם

- [תצורת סקריפט פרסום](./post-script.md)
