---
sidebar_position: 5
title: 评论脚本配置
description: 评论脚本的完整配置参考
---

本页介绍用于任务创建的 `comment` 脚本的配置参数。

## 概述

`comment` 脚本用于自动在 TikTok 或 Instagram 帖子上发布评论。当您通过 API 提供多个目标帖子 URL 时，**每个目标帖子 URL 创建一个任务**。您可以使用 `start_time` 参数控制每个任务的执行时间。

## 脚本配置 (`script_config`)

`script_config` 对象包含评论脚本的参数。以下是可用的参数：

### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | 是* | [] | 要评论的目标帖子 URL 数组（每个 URL 一个任务） |
| target_post_url | string | 是* | "" | 单个目标帖子 URL 或用换行符/逗号分隔的多个 URL |
| comment_content | string | 是 | "" | 评论文本内容。可以包含用换行符分隔的多条评论 |
| comment_order | string | 否 | "random" | 如何选择评论：`random`（随机）或 `sequential`（顺序） |
| insert_emoji | boolean | 否 | false | 是否在评论中插入随机表情符号 |
| comment_image_path | string | 否 | "" | 图片评论的图片文件路径（仅限 TikTok）。支持绝对路径或相对于 work_dir/upload/ 的相对路径 |

:::note
必须提供 `target_post_urls` 数组或 `target_post_url` 字符串。如果两者都提供，`target_post_urls` 优先。
:::

:::tip 图片评论（仅限 TikTok）
`comment_image_path` 参数允许您在评论中附加图片。此功能**仅在 TikTok 上支持** - Instagram 评论不支持图片附件。图片将被推送到设备并作为图库中的第一张图片被选择。
:::

:::info 任务创建
当提供多个目标帖子 URL 时，API 会 **为每个目标帖子 URL 创建一个任务**。例如，如果您指定 3 个帖子 URL 和 2 个设备，将创建 6 个任务。使用 `start_time` 参数控制任务开始执行的时间。
:::

## 示例

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

### 使用多个评论选项

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

当评论多个帖子时，每个帖子创建一个任务：

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

使用 `start_time` 安排任务开始执行的时间：

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

### 在多设备上批量评论

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

### Instagram 评论示例

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

### TikTok 图片评论示例

在您的 TikTok 评论中附加图片（不支持 Instagram）：

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

:::info 图片路径
`comment_image_path` 可以是：

- **绝对路径**：`C:/images/my_image.jpg` 或 `/home/user/images/my_image.jpg`
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
- 第一个任务使用第一条评论，第二个任务使用第二条评论，依此类推
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

1. **变化您的评论**：提供多个评论选项以避免看起来像垃圾信息。

2. **使用顺序模式获得多样性**：当使用同一设备评论多个帖子时，使用 `sequential` 顺序来分发不同的评论。

3. **启用表情符号插入**：设置 `insert_emoji: true` 使评论看起来更自然和有吸引力。

4. **安排任务**：使用 `start_time` 参数将评论分散在一段时间内，减少触发频率限制的机会。

5. **遵守平台限制**：不要一次创建太多评论任务。大多数平台对评论有频率限制。

## 错误代码

| 代码 | 描述 |
|------|-------------|
| 40001 | 缺少目标帖子 URL 或评论内容 |
| 40003 | API 不支持该脚本 |
| 40301 | API 访问需要 Pro+ 计划 |

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、列出和管理任务
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [关注脚本配置](./follow-script.md) - 配置关注脚本参数
- [本地 API 概述](./local-api.md) - API 概述和快速入门
