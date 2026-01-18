---
sidebar_position: 2
title: Gestione Attività API
description: Gestione Attività端点的完整参考
---

本页面记录了Gestione TikMatrix Attività的TuttiDisponibile API 端点。

## 创建Attività

为一个或多个Dispositivi或用户名创建新Attività。

- **端点：** `POST /api/v1/task`
- **Content-Type：** `application/json`

### 请求参数

API Supporto两种模式创建Attività：

**模式 1：Dispositivi模式** - Utilizzo `serials` 为Dispositivi创建Attività
**模式 2：用户名模式** - Utilizzo `usernames` 直接为特定Account创建Attività

| 参数 | 类型 | 必需 | Descrizione |
|------|------|------|------|
| serials | string[] | 条件必需 | Dispositivi序列号数组（如果未提供 `usernames` 则必需） |
| usernames | string[] | 条件必需 | 用户名数组（如果未提供 `serials` 则必需）。提供此参数时，直接为这些Account创建Attività。 |
| script_name | string | Sì | 要Esegui的Script名称 |
| script_config | object | Sì | Script的Configurazione参数（请参阅对应ScriptDocumentazione） |
| enable_multi_account | boolean | No | VuoiAbilita多Account模式（Predefinito：false）。仅在Dispositivi模式下生效。 |
| start_time | string | No | 计划Esegui时间，格式为 "HH:MM" |

### Supporto的Script

| Script名称 | Descrizione | Documentazione |
|----------|------|------|
| post | Pubblica Video或图片到 TikTok/Instagram | [Post 脚本配置](./post-script.md) |

### Esempio

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

有关 `script_config` 的详细参数和AltroEsempio，请参阅 [Post 脚本配置](./post-script.md)。

### 响应

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

## 列表Attività

UtilizzoOpzionale过滤条件查询Attività。

- **端点：** `GET /api/v1/task`

| 参数 | 类型 | 必需 | Descrizione |
|------|------|------|------|
| status | integer | No | 按状态过滤（0=pending, 1=running, 2=completed, 3=failed） |
| serial | string | No | 按Dispositivi序列号过滤 |
| script_name | string | No | 按Script名称过滤 |
| source | string | No | 按来源过滤（"ui" 或 "api"） |
| page | integer | No | 页码（Predefinito：1） |
| page_size | integer | No | Ogni页条目数（Predefinito：20，最大：100） |

## 获取AttivitàDettagli

获取指定Attività的Dettagli。

- **端点：** `GET /api/v1/task/{task_id}`

## EliminaAttività

EliminaAttività。如果Attività正在Esegui，会先尝试Ferma它。

- **端点：** `DELETE /api/v1/task/{task_id}`

## In MassaEliminaAttività

一volteElimina多个Attività，正在Esegui的Attività会先被Ferma。

- **端点：** `DELETE /api/v1/task/batch`
- **请求体：** `{ "task_ids": [1, 2, 3] }`

## Ferma Attività

Ferma正在Esegui的Attività。

- **端点：** `POST /api/v1/task/{task_id}/stop`

## RiprovaFallitoAttività

Riprova单个FallitoAttività。

- **端点：** `POST /api/v1/task/{task_id}/retry`

## RiprovaTuttiFallitoAttività

一volte性RiprovaTuttiFallito的Attività。

- **端点：** `POST /api/v1/task/retry-all`

## 获取Attività统计

获取Attività总体统计数据。

- **端点：** `GET /api/v1/task/stats`
- **响应：** Indietro total、pending、running、completed、failed 的计数。

## 检查 API 许可

检查你的LicenzaVuoiSupporto API 访问。

- **端点：** `GET /api/v1/license/check`
- **Nota：** Starter 计划会IndietroErrore码 40301；Pro/Team/Business 计划可访问 API。
