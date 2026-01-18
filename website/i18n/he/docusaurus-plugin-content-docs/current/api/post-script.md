---
sidebar_position: 3
title: תצורת סקריפט פרסום
description: מדריך תצורה מלא עבור סקריפט פרסום
---

עמוד זה מתעד את פרמטרי התצורה עבור סקריפט `post` המשמש ליצירת משימות.

## סקירה כללית

סקריפט `post` משמש לפרסום תוכן אוטומטי (סרטונים או תמונות) ל-TikTok או Instagram.

## פרמטרים כלליים

| פרמטר | סוג | נדרש | תיאור |
|------|------|------|--------|
| content_type | integer | לא | 0=וידאו, 1=תמונה |
| captions | string | לא | כיתוב הפוסט |
| material_list | string[] | לא | רשימת נתיבי קבצים |
| post_way | string | לא | שיטת פרסום |
| upload_wait_time | integer | לא | זמן המתנה להעלאה (שניות) |

## פרמטרים ספציפיים ל-TikTok

| פרמטר | סוג | תיאור |
|------|------|--------|
| add_product_link | integer | הוספת קישור למוצר |

## פרמטרים ספציפיים ל-Instagram

| פרמטר | סוג | תיאור |
|------|------|--------|
| placement | string | reel או story |

## דוגמאות

### פרסום בסיסי

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "סרטון חדש!",
      "material_list": ["C:/Videos/video1.mp4"]
    }
  }'
```

## ראה גם

- [API ניהול משימות](./task-management.md)
