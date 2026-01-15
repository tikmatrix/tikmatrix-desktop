---
sidebar_position: 5
title: تكوين برنامج التعليقات النصي
description: مرجع التكوين الكامل لبرنامج التعليقات النصي
---

本页مقدمة用于إنشاء المهام的 `comment` النصي المستخدم في إنشاء المهام.

## نظرة عامة

`comment` يستخدم البرنامج النصي لـ自动在 TikTok أو Instagram 帖子上النشر评论。عندما您通过 API 提供多个目标帖子 URL 时，**每个目标帖子 URL 创建一个任务**。يمكنك استخدام معامل `start_time` المعاملات控制每个任务的执行时间。

## تكوين البرنامج النصي (`script_config`)

`script_config` يحتوي كائن评论على معاملات البرنامج النصي. فيما يلي المعاملات المتاحة:

### المعاملات

| المعاملات | النوع | مطلوب | القيمة الافتراضية | الوصف |
|-----------|------|----------|---------|-------------|
| target_post_urls | نص[] | نعم* | [] | 要评论的目标帖子 URL 数组（每个 URL 一个任务） |
| target_post_url | نص | نعم* | "" | 单个目标帖子 URL أو用换行符/逗号分隔的多个 URL |
| comment_content | نص | نعم | "" | 评论文本内容。可以包含用换行符分隔的多条评论 |
| comment_order | نص | لا | "random" | 如何选择评论：`random`（随机）أو `sequential`（顺序） |
| insert_emoji | منطقي | لا | false | ما إذا كان سيتم إدراج رموز تعبيرية عشوائية في التعليقات符号 |
| comment_image_path | نص | لا | "" | صور评论的صور文件路径（仅限 TikTok）。支持绝对路径أو相对于 work_dir/upload/ 的相对路径 |

:::note
يجب توفير `target_post_urls` مصفوفة أو `target_post_url` نص.إذا تم توفير كليهما،`target_post_urls` له الأولوية.
:::

:::tip صور评论（仅限 TikTok）
`comment_image_path` المعاملات允许您在评论中附加صور。此功能**仅在 TikTok 上支持** - Instagram 评论不支持صور附件。صور将被推送到设备并作为图库中的第一张صور被选择。
:::

:::info إنشاء المهام
عندما提供多个目标帖子 URL 时，API 会 **为每个目标帖子 URL 创建一个任务**。على سبيل المثال，如果您指定 3 个帖子 URL 和 2 个设备，将创建 6 个任务。استخدام `start_time` المعاملات控制任务开始执行的时间。
:::

## أمثلة

### 评论单个帖子

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "精彩内容！🔥"
    }
  }'
```

### استخدام多个评论الخيارات

提供用换行符分隔的多条评论。系统将根据 `comment_order` 选择其中一条：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "视频太棒了！\n喜欢这个内容！\n继续加油！👏\n真的很不错！",
      "comment_order": "random"
    }
  }'
```

### 评论多个帖子

عندما评论多个帖子时，每个帖子创建一个任务：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "好视频！\n太棒了！\n喜欢！",
      "comment_order": "sequential"
    }
  }'
```

这将创建 3 个立即执行的独立任务。

### 定时评论

استخدام `start_time` 安排任务开始执行的时间：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "定时评论！"
    },
    "start_time": "14:30"
  }'
```

### 带表情符号插入的评论

启用自动表情符号插入使评论更具吸引力：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "这太棒了",
      "insert_emoji": true
    }
  }'
```

### 按用户名列表模式评论

直接为特定账号创建评论任务：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "视频不错！"
    }
  }'
```

### 在多设备上التعليق الجماعي

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "内容很棒！\n出色的作品！\n太喜欢了！",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram 评论أمثلة

同样的 API 适用于 Instagram 帖子：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "美丽的照片！📸",
      "insert_emoji": true
    }
  }'
```

### TikTok صور评论أمثلة

在您的 TikTok 评论中附加صور（不支持 Instagram）：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "看看这张图片！",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info صور路径
`comment_image_path` 可以نعم：

- **绝对路径**：`C:/images/my_image.jpg` أو `/home/user/images/my_image.jpg`
- **相对路径**：`my_image.jpg`（相对于 `work_dir/upload/`）

:::

## 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## 评论顺序

### 随机顺序 (`random`)

- 从提供的列表中随机选择一条评论
- 适合使评论看起来更自然
- 默认行为

### 顺序 (`sequential`)

- 根据 `job_count` 按顺序选择评论
- 第一个任务استخدام第一条评论，第二个任务استخدام第二条评论，依此类推
- 到达列表末尾时循环回开头
- 适合在多个任务之间分发不同的评论

## 帖子 URL 格式

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## 最佳实践

1. **变化您的评论**：提供多个评论الخيارات以避免看起来像垃圾معلومات。

2. **استخدام顺序模式获得多样性**：عندمااستخدام同一设备评论多个帖子时，استخدام `sequential` 顺序来分发不同的评论。

3. **启用表情符号插入**：设置 `insert_emoji: true` 使评论看起来更自然和有吸引力。

4. **安排任务**：استخدام `start_time` المعاملات将评论分散在一段时间内，减少触发频率限制的机会。

5. **遵守平台限制**：不要一次创建太多评论任务。大多数平台对评论有频率限制。

## 错误代码

| 代码 | الوصف |
|------|-------------|
| 40001 | 缺少目标帖子 URL أو评论内容 |
| 40003 | API 不支持该脚本 |
| 40301 | API 访问需要 Pro+ 计划 |

## انظر أيضًا

- [API إدارة المهام](./task-management.md) - 创建、列出和管理任务
- [النشرتكوين البرنامج النصي](./post-script.md) - التكوينالنشر脚本المعاملات
- [تكوين برنامج المتابعة النصي](./follow-script.md) - التكوين关注脚本المعاملات
- [API المحلي نظرة عامة](./local-api.md) - API نظرة عامة和دليل البدء السريع
