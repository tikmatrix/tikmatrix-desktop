---
sidebar_position: 3
title: Post Script Configuration
description: Complete configuration reference for the post script
---

This page documents the configuration parameters for the `post` script used in task creation.

## Overview

The `post` script is used to automatically publish content (videos or images) to TikTok or Instagram. It supports various posting methods, material sources, and sound options.

## Script Configuration (`script_config`)

The `script_config` object contains the parameters for the post script. Below are the available parameters:

### Common Parameters (TikTok & Instagram)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| content_type | integer | No | 0 | Content type: `0` = Video, `1` = Images |
| image_count | integer | No | 1 | Number of images to select (when content_type = 1) |
| captions | string | No | "" | Caption text for the post. Supports spintax format: `{option1\|option2\|option3}` |
| post_way | string | No | "share" | Post method: `share`, `addButton`, or `useSound` |
| material_source | string | No | "materialLibrary" | Material source: `materialLibrary` or `localFolder` (ignored if material_list is provided) |
| material_path | string | Conditional | "" | Local folder path (required when material_source = "localFolder") |
| material_list | string[] | No | [] | **Direct material file paths array.** When provided, bypasses material_source and material_path logic. Ideal for API automation. |
| materials_tags | string | No | "" | Comma-separated material tags for filtering from library |
| upload_wait_time | integer | No | 30 | Seconds to wait for upload completion |
| sound_wait_time | integer | No | 10 | Seconds to wait for sound loading |
| add_sound | string/integer | No | "-1" | Sound option: `-1` = default, `0` = disable, `1` = enable, `custom` = use custom sound |
| sound_name | string | Conditional | "" | Sound name/URL (required when post_way = "useSound") |
| custom_sound_keyword | string | Conditional | "" | Keyword to search for custom sound (required when add_sound = "custom") |
| origin_sound_volume | integer | No | 50 | Original sound volume (0-100) |
| add_sound_volume | integer | No | 50 | Added sound volume (0-100) |

### TikTok Specific Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| add_product_link | integer | No | 0 | Add product link: `0` = No, `1` = Yes |

### Instagram Specific Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| placement | string | No | "reel" | Post placement: `reel` or `story` |

## Examples

### Basic Post Task with Direct Material List

This is the recommended approach for API automation - pass material paths directly without relying on material library or folder scanning:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Post Task with Material Library (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Post Task by Username List

This mode allows you to create tasks directly for specific accounts without knowing their device serial numbers:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Post Task with Local Folder (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Amazing content! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Post with Custom Sound

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Dancing to this trending sound!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending dance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Post Using Specific Sound URL

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Using this awesome sound!",
      "material_source": "materialLibrary"
    }
  }'
```

### Post Images (Carousel)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Check out these photos! #photocarousel",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Response

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

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
