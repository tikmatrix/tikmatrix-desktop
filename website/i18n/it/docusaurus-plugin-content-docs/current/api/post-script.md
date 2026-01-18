---
sidebar_position: 3
title: Post ScriptConfigurazione
description: Post Script的完整Configurazione参考
---

本页面记录了Attività创建中Utilizzo的 `post` Script的Configurazione参数。

## Panoramica

`post` Script用于AutomaticoPubblica Contenuto（Video或图片）到 TikTok 或 Instagram。它Supporto多种Pubblica方式、素材来源和音频选项。

## ScriptConfigurazione (`script_config`)

`script_config` 对象包含PubblicaScript的参数。以下SìDisponibile参数：

### 通用参数（TikTok 和 Instagram）

| 参数 | 类型 | 必需 | Predefinito值 | Descrizione |
|------|------|------|--------|------|
| content_type | integer | No | 0 | Contenuto类型：`0` = Video，`1` = 图片 |
| image_count | integer | No | 1 | 选择图片数量（当 content_type = 1 时） |
| captions | string | No | "" | 帖子Titolo文本。Supporto spintax 格式：`{选项1\|选项2\|选项3}` |
| post_way | string | No | "share" | Pubblica方式：`share`、`addButton` 或 `useSound` |
| material_source | string | No | "materialLibrary" | 素材来源：`materialLibrary`（素材库）或 `localFolder`（本地文件夹），如果提供了 material_list 则忽略此参数 |
| material_path | string | 条件必需 | "" | 本地文件夹路径（当 material_source = "localFolder" 时必需） |
| material_list | string[] | No | [] | **直接传递素材文件路径数组。** 提供此参数时，将Salta material_source 和 material_path 的逻辑。Consigliati用于 API Automatico化场景。 |
| materials_tags | string | No | "" | 逗号分隔的素材Tag，用于从素材库Filtra |
| upload_wait_time | integer | No | 30 | In AttesaCaricaCompletato的secondi数 |
| sound_wait_time | integer | No | 10 | In Attesa音频加载的secondi数 |
| add_sound | string/integer | No | "-1" | 音频选项：`-1` = Predefinito，`0` = Disabilita，`1` = Abilita，`custom` = UtilizzoPersonalizzato音频 |
| sound_name | string | 条件必需 | "" | 音频名称/URL（当 post_way = "useSound" 时必需） |
| custom_sound_keyword | string | 条件必需 | "" | CercaPersonalizzato音频的关键词（当 add_sound = "custom" 时必需） |
| origin_sound_volume | integer | No | 50 | 原始音频音量（0-100） |
| add_sound_volume | integer | No | 50 | Aggiungi音频音量（0-100） |

### TikTok 专属参数

| 参数 | 类型 | 必需 | Predefinito值 | Descrizione |
|------|------|------|--------|------|
| add_product_link | integer | No | 0 | Aggiungi商品链接：`0` = No，`1` = Sì |

### Instagram 专属参数

| 参数 | 类型 | 必需 | Predefinito值 | Descrizione |
|------|------|------|--------|------|
| placement | string | No | "reel" | Pubblica位置：`reel`（快拍）或 `story`（故事） |

## Esempio

### BasePubblicaAttività - 直接传递素材路径

这Sì API Automatico化的Consigliati方式 - 直接传递素材文件路径，无需依赖素材库或文件夹扫描：

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

### Utilizzo素材库Pubblica（TikTok）

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

### 通过用户名列表创建PubblicaAttività

此模式允许您直接为特定Account创建Attività，无需知道它们的Dispositivi序列号：

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

### Utilizzo本地文件夹Pubblica（Instagram）

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

### UtilizzoPersonalizzato音频Pubblica

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

### Utilizzo指定音频 URL Pubblica

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

### Pubblica图片（轮播图）

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

## 相关Documentazione

- [任务管理 API](./task-management.md) - 创建、列表和GestioneAttività
