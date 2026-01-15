---
sidebar_position: 3
title: تكوين نص النشر
description: مرجع تكوين كامل لنص النشر
---

تسجل هذه الصفحة معاملات تكوين نص `post` المستخدم في إنشاء المهام.

## نظرة عامة

يُستخدم نص `post` لنشر المحتوى (الفيديوهات أو الصور) تلقائيًا على TikTok أو Instagram. يدعم طرق نشر متعددة ومصادر مواد وخيارات صوتية.

## تكوين النص البرمجي (`script_config`)

يحتوي كائن `script_config` على معاملات نص النشر. فيما يلي المعاملات المتاحة:

### المعاملات العامة (TikTok و Instagram)

| المعامل | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| content_type | integer | لا | 0 | نوع المحتوى: `0` = فيديو، `1` = صورة |
| image_count | integer | لا | 1 | عدد الصور المراد تحديدها (عندما content_type = 1) |
| captions | string | لا | "" | نص عنوان المنشور. يدعم تنسيق spintax: `{خيار1\|خيار2\|خيار3}` |
| post_way | string | لا | "share" | طريقة النشر: `share` أو `addButton` أو `useSound` |
| material_source | string | لا | "materialLibrary" | مصدر المواد: `materialLibrary` (مكتبة المواد) أو `localFolder` (مجلد محلي)، يتم تجاهل هذا المعامل إذا تم توفير material_list |
| material_path | string | مطلوب شرطيًا | "" | مسار المجلد المحلي (مطلوب عندما material_source = "localFolder") |
| material_list | string[] | لا | [] | **تمرير مصفوفة مسارات ملفات المواد مباشرة.** عند توفير هذا المعامل، سيتم تخطي منطق material_source و material_path. موصى به لسيناريوهات أتمتة API. |
| materials_tags | string | لا | "" | علامات المواد مفصولة بفواصل، تُستخدم لتصفية من مكتبة المواد |
| upload_wait_time | integer | لا | 30 | الثواني للانتظار حتى اكتمال التحميل |
| sound_wait_time | integer | لا | 10 | الثواني للانتظار حتى تحميل الصوت |
| add_sound | string/integer | لا | "-1" | خيارات الصوت: `-1` = افتراضي، `0` = تعطيل، `1` = تمكين، `custom` = استخدام صوت مخصص |
| sound_name | string | مطلوب شرطيًا | "" | اسم/URL الصوت (مطلوب عندما post_way = "useSound") |
| custom_sound_keyword | string | مطلوب شرطيًا | "" | كلمة مفتاحية للبحث عن صوت مخصص (مطلوب عندما add_sound = "custom") |
| origin_sound_volume | integer | لا | 50 | مستوى صوت الصوت الأصلي (0-100) |
| add_sound_volume | integer | لا | 50 | مستوى صوت الصوت المضاف (0-100) |

### معاملات خاصة بـ TikTok

| المعامل | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| add_product_link | integer | لا | 0 | إضافة رابط منتج: `0` = لا، `1` = نعم |

### معاملات خاصة بـ Instagram

| المعامل | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| placement | string | لا | "reel" | موضع النشر: `reel` (ريل) أو `story` (قصة) |

## أمثلة

### مهمة نشر أساسية - تمرير مسارات المواد مباشرة

هذه هي الطريقة الموصى بها لأتمتة API - تمرير مسارات ملفات المواد مباشرة، دون الاعتماد على مكتبة المواد أو مسح المجلدات:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "شاهد الفيديو الجديد الخاص بي! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### النشر باستخدام مكتبة المواد (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "شاهد الفيديو الجديد الخاص بي! #trending #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### إنشاء مهام نشر عبر قائمة أسماء المستخدمين

يتيح لك هذا الوضع إنشاء مهام مباشرة لحسابات محددة، دون الحاجة إلى معرفة أرقامها التسلسلية:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "شاهد الفيديو الجديد الخاص بي! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### النشر من مجلد محلي (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "محتوى رائع! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### النشر باستخدام صوت مخصص

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "الرقص مع هذه الموسيقى الشعبية!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "موسيقى رقص شعبية 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### النشر باستخدام URL صوت محدد

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "استخدام هذه الموسيقى الرائعة!",
      "material_source": "materialLibrary"
    }
  }'
```

### نشر الصور (ألبوم دوار)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "شاهد هذه الصور! #photoset",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## الاستجابة

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## الوثائق ذات الصلة

- [API إدارة المهام](./task-management.md) - إنشاء وإدراج وإدارة المهام
