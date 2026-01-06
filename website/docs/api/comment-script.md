---
sidebar_position: 5
title: Comment Script Configuration
description: Complete configuration reference for the comment script
---

This page documents the configuration parameters for the `comment` script used in task creation.

## Overview

The `comment` script is used to automatically post comments on TikTok or Instagram posts. When you provide multiple target post URLs via API, **one task is created per target post URL**. You can control when each task executes using the `start_time` parameter.

## Script Configuration (`script_config`)

The `script_config` object contains the parameters for the comment script. Below are the available parameters:

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Yes* | [] | Array of target post URLs to comment on (one task per URL) |
| target_post_url | string | Yes* | "" | Single target post URL or multiple URLs separated by newlines/commas |
| comment_content | string | Yes | "" | Comment text content. Can contain multiple comments separated by newlines |
| comment_order | string | No | "random" | How to select comments: `random` or `sequential` |
| insert_emoji | boolean | No | false | Whether to insert random emoji into the comment |
| comment_image_path | string | No | "" | Path to image file for image comment (TikTok only). Supports absolute path or relative path to work_dir/upload/ |

:::note
Either `target_post_urls` array or `target_post_url` string must be provided. If both are provided, `target_post_urls` takes priority.
:::

:::tip Image Comment (TikTok Only)
The `comment_image_path` parameter allows you to attach an image to your comment. This feature is **only supported on TikTok** - Instagram comments do not support image attachments. The image will be pushed to the device and selected as the first image in the gallery.
:::

:::info Task Creation
When multiple target post URLs are provided, the API creates **one task per target post URL**. For example, if you specify 3 post URLs and 2 devices, 6 tasks will be created. Use the `start_time` parameter to control when tasks start executing.
:::

## Examples

### Comment on Single Post

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Great content! 🔥"
    }
  }'
```

### Comment with Multiple Comment Options

Provide multiple comments separated by newlines. The system will select one based on `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Amazing video!\nLove this content!\nKeep it up! 👏\nThis is so good!",
      "comment_order": "random"
    }
  }'
```

### Comment on Multiple Posts

When commenting on multiple posts, one task is created per post:

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
      "comment_content": "Great video!\nAwesome!\nLove it!",
      "comment_order": "sequential"
    }
  }'
```

This creates 3 separate tasks that execute immediately.

### Schedule Comments with Start Time

Use `start_time` to schedule when tasks should start:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Scheduled comment!"
    },
    "start_time": "14:30"
  }'
```

### Comment with Emoji Insertion

Enable automatic emoji insertion to make comments more engaging:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "This is amazing",
      "insert_emoji": true
    }
  }'
```

### Comment by Username List Mode

Create comment tasks directly for specific accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Nice video!"
    }
  }'
```

### Batch Comment on Multiple Devices

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Great content!\nAmazing work!\nLove this!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram Comment Example

The same API works for Instagram posts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Beautiful photo! 📸",
      "insert_emoji": true
    }
  }'
```

### TikTok Image Comment Example

Attach an image to your TikTok comment (not supported on Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Check out this image!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Image Path
The `comment_image_path` can be:

- **Absolute path**: `C:/images/my_image.jpg` or `/home/user/images/my_image.jpg`
- **Relative path**: `my_image.jpg` (relative to `work_dir/upload/`)

:::

## Response

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

## Comment Order

### Random Order (`random`)

- Randomly selects one comment from the provided list
- Good for making comments appear more natural
- Default behavior

### Sequential Order (`sequential`)

- Selects comments in order based on `job_count`
- First task uses first comment, second task uses second comment, etc.
- Cycles back to beginning when reaching the end of the list
- Good for distributing different comments across multiple tasks

## Post URL Formats

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

## Best Practices

1. **Vary your comments**: Provide multiple comment options to avoid appearing spammy.

2. **Use sequential order for variety**: When commenting on multiple posts with the same device, use `sequential` order to distribute different comments.

3. **Enable emoji insertion**: Set `insert_emoji: true` to make comments appear more natural and engaging.

4. **Schedule tasks**: Use the `start_time` parameter to spread out comments over time, reducing the chance of rate limiting.

5. **Respect platform limits**: Don't create too many comment tasks at once. Most platforms have rate limits on commenting.

## Error Codes

| Code | Description |
|------|-------------|
| 40001 | Missing target post URL or comment content |
| 40003 | Script not supported via API |
| 40301 | API access requires Pro+ plan |

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Post Script Configuration](./post-script.md) - Configure post script parameters
- [Follow Script Configuration](./follow-script.md) - Configure follow script parameters
- [Local API Overview](./local-api.md) - API overview and quick start
