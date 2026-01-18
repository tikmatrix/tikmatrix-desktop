---
sidebar_position: 5
title: CommentoScriptConfigurazione
description: CommentoScript的完整Configurazione参考
---

本页介绍用于Attività创建的 `comment` Script的Configurazione参数。

## Panoramica

`comment` Script用于Automatico在 TikTok 或 Instagram 帖子上PubblicaCommento。当您通过 API 提供多个目标帖子 URL 时，**Ogni个目标帖子 URL 创建一个Attività**。您可以Utilizzo `start_time` 参数控制Ogni个Attività的Esegui时间。

## ScriptConfigurazione (`script_config`)

`script_config` 对象包含CommentoScript的参数。以下SìDisponibile的参数：

### 参数

| 参数 | 类型 | Obbligatorio | Predefinito值 | Descrizione |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Sì* | [] | 要Commento的目标帖子 URL 数组（Ogni个 URL 一个Attività） |
| target_post_url | string | Sì* | "" | 单个目标帖子 URL 或用换行符/逗号分隔的多个 URL |
| comment_content | string | Sì | "" | Commento文本Contenuto。可以包含用换行符分隔的多条Commento |
| comment_order | string | No | "random" | 如何选择Commento：`random`（Casuale）或 `sequential`（顺序） |
| insert_emoji | boolean | No | false | Vuoi在Commento中插入Casuale表情符号 |
| comment_image_path | string | No | "" | 图片Commento的图片文件路径（仅限 TikTok）。Supporto绝对路径或相对于 work_dir/upload/ 的相对路径 |

:::note
Richiesto提供 `target_post_urls` 数组或 `target_post_url` 字符串。如果两者都提供，`target_post_urls` 优先。
:::

:::tip 图片Commento（仅限 TikTok）
`comment_image_path` 参数允许您在Commento中附加图片。此Funzionalità**仅在 TikTok 上Supporto** - Instagram Commento不Supporto图片附件。图片将被推送到Dispositivi并作为图库中的第一张图片被选择。
:::

:::info Attività创建
当提供多个目标帖子 URL 时，API 会 **为Ogni个目标帖子 URL 创建一个Attività**。例如，如果您指定 3 个帖子 URL 和 2 个Dispositivi，将创建 6 个Attività。Utilizzo `start_time` 参数控制Attività开始Esegui的时间。
:::

## Esempio

### Commento单个帖子

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

### Utilizzo多个Commento选项

提供用换行符分隔的多条Commento。系统将根据 `comment_order` 选择其中一条：

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

### Commento多个帖子

当Commento多个帖子时，Ogni个帖子创建一个Attività：

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

这将创建 3 个立即Esegui的独立Attività。

### 定时Commento

Utilizzo `start_time` 安排Attività开始Esegui的时间：

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

### 带表情符号插入的Commento

AbilitaAutomatico表情符号插入使Commento更具吸引力：

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

### 按用户名列表模式Commento

直接为特定Account创建CommentoAttività：

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

### 在多Dispositivi上Commenti in Massa

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

### Instagram CommentoEsempio

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

### TikTok 图片CommentoEsempio

在您的 TikTok Commento中附加图片（不Supporto Instagram）：

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
`comment_image_path` 可以Sì：

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

## Commento顺序

### Casuale顺序 (`random`)

- 从提供的列表中Casuale选择一条Commento
- 适合使Commento看起来更自然
- Predefinito行为

### 顺序 (`sequential`)

- 根据 `job_count` 按顺序选择Commento
- 第一个AttivitàUtilizzo第一条Commento，第二个AttivitàUtilizzo第二条Commento，依此类推
- 到达列表末尾时循环回开头
- 适合在多个Attività之间分发不同的Commento

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

1. **变化您的Commento**：提供多个Commento选项以避免看起来像垃圾信息。

2. **Utilizzo顺序模式获得多样性**：当Utilizzo同一DispositiviCommento多个帖子时，Utilizzo `sequential` 顺序来分发不同的Commento。

3. **Abilita表情符号插入**：Impostazioni `insert_emoji: true` 使Commento看起来更自然和有吸引力。

4. **安排Attività**：Utilizzo `start_time` 参数将Commento分散在一段时间内，减少触发频率限制的机会。

5. **遵守平台限制**：不要一volte创建太多CommentoAttività。大多数平台对Commento有频率限制。

## Errore代码

| 代码 | Descrizione |
|------|-------------|
| 40001 | 缺少目标帖子 URL 或CommentoContenuto |
| 40003 | API 不Supporto该Script |
| 40301 | API 访问需要 Pro+ 计划 |

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、列出和GestioneAttività
- [发布脚本配置](./post-script.md) - ConfigurazionePubblicaScript参数
- [关注脚本配置](./follow-script.md) - ConfigurazioneSeguiScript参数
- [本地 API 概述](./local-api.md) - API Panoramica和快速Per Iniziare
