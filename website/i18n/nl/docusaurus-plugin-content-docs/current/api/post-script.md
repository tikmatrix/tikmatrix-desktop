---
sidebar_position: 3
title: Post 脚本配置
description: Post 脚本的完整配置参考
---

本页面记录了任务创建中使用的 `post` 脚本的配置参数。

## 概述

`post` 脚本用于自动发布内容（视频或图片）到 TikTok 或 Instagram。它支持多种发布方式、素材来源和音频选项。

## 脚本配置 (`script_config`)

`script_config` 对象包含发布脚本的参数。以下是可用参数：

### 通用参数（TikTok 和 Instagram）

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| content_type | integer | 否 | 0 | 内容类型：`0` = 视频，`1` = 图片 |
| image_count | integer | 否 | 1 | 选择图片数量（当 content_type = 1 时） |
| captions | string | 否 | "" | 帖子标题文本。支持 spintax 格式：`{选项1\|选项2\|选项3}` |
| post_way | string | 否 | "share" | 发布方式：`share`、`addButton` 或 `useSound` |
| material_source | string | 否 | "materialLibrary" | 素材来源：`materialLibrary`（素材库）或 `localFolder`（本地文件夹），如果提供了 material_list 则忽略此参数 |
| material_path | string | 条件必需 | "" | 本地文件夹路径（当 material_source = "localFolder" 时必需） |
| material_list | string[] | 否 | [] | **直接传递素材文件路径数组。** 提供此参数时，将跳过 material_source 和 material_path 的逻辑。推荐用于 API 自动化场景。 |
| materials_tags | string | 否 | "" | 逗号分隔的素材标签，用于从素材库筛选 |
| upload_wait_time | integer | 否 | 30 | 等待上传完成的秒数 |
| sound_wait_time | integer | 否 | 10 | 等待音频加载的秒数 |
| add_sound | string/integer | 否 | "-1" | 音频选项：`-1` = 默认，`0` = 禁用，`1` = 启用，`custom` = 使用自定义音频 |
| sound_name | string | 条件必需 | "" | 音频名称/URL（当 post_way = "useSound" 时必需） |
| custom_sound_keyword | string | 条件必需 | "" | 搜索自定义音频的关键词（当 add_sound = "custom" 时必需） |
| origin_sound_volume | integer | 否 | 50 | 原始音频音量（0-100） |
| add_sound_volume | integer | 否 | 50 | 添加音频音量（0-100） |

### TikTok 专属参数

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| add_product_link | integer | 否 | 0 | 添加商品链接：`0` = 否，`1` = 是 |

### Instagram 专属参数

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| placement | string | 否 | "reel" | 发布位置：`reel`（快拍）或 `story`（故事） |

## 示例

### 基础发布任务 - 直接传递素材路径

这是 API 自动化的推荐方式 - 直接传递素材文件路径，无需依赖素材库或文件夹扫描：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### 使用素材库发布（TikTok）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "热门, 舞蹈",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### 通过用户名列表创建发布任务

此模式允许您直接为特定账号创建任务，无需知道它们的设备序列号：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### 使用本地文件夹发布（Instagram）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "精彩内容！#instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### 使用自定义音频发布

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "跟着这首热门音乐跳舞！",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "热门舞曲 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### 使用指定音频 URL 发布

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "使用这个超棒的音乐！",
      "material_source": "materialLibrary"
    }
  }'
```

### 发布图片（轮播图）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "看看这些照片！#图集",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## 响应

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

## 相关文档

- [任务管理 API](./task-management.md) - 创建、列表和管理任务
