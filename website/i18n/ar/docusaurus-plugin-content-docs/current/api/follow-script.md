---
sidebar_position: 4
title: تكوين برنامج المتابعة النصي
description: مرجع التكوين الكامل لبرنامج المتابعة النصي
---

توضح هذه الصفحة معاملات التكوين لبرنامج `follow` النصي المستخدم في إنشاء المهام.

## نظرة عامة

`follow` يُستخدم البرنامج النصي لمتابعة المستخدمين تلقائيًا على TikTok أو Instagram .عند توفير مستخدمين مستهدفين متعددين عبر API،**سينشئ النظام مهمة لكل مستخدم مستهدف**。يمكنك استخدام معامل `start_time` للتحكم في وقت تنفيذ المهمة.

## تكوين البرنامج النصي (`script_config`)

`script_config` يحتوي كائن关注النصي المستخدم في إنشاء المهام.فيما يلينعم可用المعاملات：

### المعاملات

| المعاملات | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| target_users | نص[] | نعم* | [] | مصفوفة أسماء المستخدمين المستهدفين للمتابعة (مهمة واحدة لكل مستخدم) |
| target_user | نص | نعم* | "" | اسم مستخدم مستهدف واحد، أو أسماء مستخدمين متعددة مفصولة بأسطر جديدة/فواصل |
| access_method | نص | لا | "direct" | طريقة التنقل إلى ملف تعريف المستخدم：`direct`（عبر URL）أو `search` |

:::note
يجب توفير `target_users` مصفوفة أو `target_user` نص.إذا تم توفير كليهما،`target_users` له الأولوية.
:::

:::info إنشاء المهام
عند توفير مستخدمين مستهدفين متعددين، سينشئ API**مهمة لكل مستخدم مستهدف**。على سبيل المثال، إذا حددت 3 مستخدمين مستهدفين وجهازين، سيتم إنشاء 6 مهام.استخدام `start_time` للتحكم في وقت تنفيذ المهمة.
:::

## أمثلة

### 关注单个用户

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### 关注多个用户

关注多个用户时，每个用户创建一个任务：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

这将创建 3 个独立的任务，立即执行。

### استخدام开始时间调度任务

استخدام `start_time` 来调度任务的开始时间：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### 通过بحث方式关注用户

عندما直接 URL 访问不起作用时，استخدامبحث方式：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### 多设备批量关注

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## 响应

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

## 访问方式

### 直接访问 (`direct`)

- عبر URL 打开用户资料：`tiktok.com/@username` أو `instagram.com/username`
- 更快更可靠
- 大多数情况下موصى بهاستخدام

### بحث访问 (`search`)

- 导航到بحث，输入用户名，点击结果
- 较慢但在直接 URL 访问被阻止时有效
- 如果存在多个相似用户名，可能不太准确

## 最佳实践

1. **استخدام start_time 调度**：استخدام `start_time` المعاملات来调度任务的执行时间（格式："HH:MM"）。

2. **优先直接访问**：`direct` 访问方式比 `search` 更快更可靠。

3. **合理批量处理**：不要一次关注太多用户。سينشئ النظام مهمة لكل مستخدم مستهدف，因此大列表会产生许多任务。

## انظر أيضًا

- [API إدارة المهام](./task-management.md) - 创建、查询和管理任务
- [النشرتكوين البرنامج النصي](./post-script.md) - التكوينالنشر脚本المعاملات
- [取消تكوين برنامج المتابعة النصي](./unfollow-script.md) - التكوين取消关注脚本المعاملات
