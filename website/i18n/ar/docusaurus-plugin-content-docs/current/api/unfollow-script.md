---
sidebar_position: 5
title: تكوين نص إلغاء المتابعة
description: مرجع تكوين كامل لنص إلغاء المتابعة
---

تقدم هذه الصفحة معاملات تكوين نص `unfollow` لإنشاء المهام.

## نظرة عامة

يُستخدم نص `unfollow` لإلغاء المتابعة التلقائية للمستخدمين على TikTok أو Instagram. عند توفير عدة مستخدمين مستهدفين عبر API، **سينشئ النظام مهمة لكل مستخدم مستهدف**. يمكنك استخدام معامل `start_time` للتحكم في وقت تنفيذ المهام.

## تكوين النص البرمجي (`script_config`)

يحتوي كائن `script_config` على معاملات تكوين نص إلغاء المتابعة. فيما يلي المعاملات المتاحة:

### المعاملات

| المعامل | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| target_users | string[] | نعم* | [] | مصفوفة أسماء المستخدمين المستهدفين لإلغاء المتابعة (مهمة لكل مستخدم) |
| target_user | string | نعم* | "" | اسم مستخدم مستهدف واحد، أو أسماء مستخدمين متعددة مفصولة بفواصل أسطر/فواصل |
| access_method | string | لا | "direct" | طريقة الانتقال إلى ملف المستخدم: `direct` (عبر URL) أو `search` |

:::note
يجب توفير مصفوفة `target_users` أو سلسلة `target_user`. إذا تم توفير كليهما، فإن `target_users` له الأولوية.
:::

:::info إنشاء المهام
عند توفير عدة مستخدمين مستهدفين، سينشئ API **مهمة لكل مستخدم مستهدف**. على سبيل المثال، إذا حددت 3 مستخدمين مستهدفين وجهازين، سيتم إنشاء 6 مهام. استخدم معامل `start_time` للتحكم في وقت تنفيذ المهام.
:::

## أمثلة

### إلغاء متابعة مستخدم واحد

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### إلغاء متابعة عدة مستخدمين

عند إلغاء متابعة عدة مستخدمين، يتم إنشاء مهمة لكل مستخدم:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

سيؤدي هذا إلى إنشاء 3 مهام مستقلة يتم تنفيذها على الفور.

### جدولة المهام باستخدام وقت البدء

استخدم `start_time` لجدولة وقت بدء المهام:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### إلغاء متابعة المستخدمين عبر طريقة البحث

استخدم طريقة البحث عندما لا يعمل الوصول المباشر عبر URL:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### إلغاء متابعة دفعي على عدة أجهزة

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## الاستجابة

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## طرق الوصول

### الوصول المباشر (`direct`)

- فتح ملف المستخدم عبر URL: `tiktok.com/@username` أو `instagram.com/username`
- أسرع وأكثر موثوقية
- موصى به في معظم الحالات

### الوصول عبر البحث (`search`)

- الانتقال إلى البحث، وإدخال اسم المستخدم، والنقر على النتيجة
- أبطأ ولكنه يعمل عند حظر الوصول المباشر عبر URL
- قد يكون أقل دقة إذا كان هناك أسماء مستخدمين متشابهة متعددة

## أفضل الممارسات

1. **استخدام start_time للجدولة**: استخدم معامل `start_time` لجدولة وقت تنفيذ المهام (التنسيق: "HH:MM").

2. **إعطاء الأولوية للوصول المباشر**: طريقة الوصول `direct` أسرع وأكثر موثوقية من `search`.

3. **معالجة دفعية معقولة**: لا تلغي متابعة الكثير من المستخدمين مرة واحدة. سينشئ النظام مهمة لكل مستخدم مستهدف، لذا ستنتج القوائم الكبيرة مهام كثيرة.

## انظر أيضًا

- [API إدارة المهام](./task-management.md) - إنشاء والاستعلام وإدارة المهام
- [تكوين نص النشر](./post-script.md) - تكوين معاملات نص النشر
- [تكوين نص المتابعة](./follow-script.md) - تكوين معاملات نص المتابعة
