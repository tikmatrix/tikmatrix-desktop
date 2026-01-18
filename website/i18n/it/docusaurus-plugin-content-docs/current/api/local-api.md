---
sidebar_position: 1
title: 本地 API 概览
description: TikMatrix 本地 API，用于以编程方式GestioneAttività
---

TikMatrix 提供了一个本地的 RESTful API，允许你以编程方式GestioneAttività。这对于将 TikMatrix 集成到你自己的Automatico化系统、构建Personalizzato工作流程或创建Operazioni in Massa非常有用。

## 要求

:::warning Licenza要求
**本地 API 仅对 Pro、Team 和 Business 计划用户开放。** Starter 计划不提供 API 访问权限。
:::

## Base URL

API 在本机Esegui，地址为：

```text
http://localhost:50809/api/v1/
```

:::note
Porta `50809` 为PredefinitoPorta。请在发起请求前确保 TikMatrix 已在Esegui。
:::

## 响应格式

Tutti API 响应遵循以下格式：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### 响应码Istruzioni

| Code | Descrizione |
|------|------|
| 0 | Successo |
| 40001 | 参数Errore - 无效的请求参数 |
| 40002 | 参数Errore - 缺少 script_name |
| 40003 | 参数Errore - Script暂不Supporto API 调用 |
| 40301 | 禁止 - API 访问需要 Pro+ 计划 |
| 40401 | 未找到 - 资源不存在 |
| 50001 | 服务器内部Errore |

## Avvio Rapido

### 1. 检查 API 访问权限

首先，Conferma你的LicenzaVuoiSupporto API：

```bash
curl http://localhost:50809/api/v1/license/check
```

Esempio响应：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "plan_name": "Pro",
    "api_enabled": true,
    "device_limit": 20,
    "message": "API access enabled"
  }
}
```

### 2. 创建Attività

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "看看我的新视频！#热门"
    },
    "enable_multi_account": false
  }'
```

### 3. 查询Attività列表

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## DisponibileScript

:::info CorrenteSupporto
目前，本地 API Supporto `post`、`follow`、`unfollow`、`account_warmup` 和 `comment` Script。AltroScript将在未来Versione中陆续Aggiungi。
:::

`script_name` 参数可接受下列值：

| Script名 | Descrizione | API Supporto |
|--------|------|----------|
| `post` | Pubblica Contenuto | ✅ 已Supporto |
| `follow` | Segui用户 | ✅ 已Supporto |
| `unfollow` | Non Seguire Più | ✅ 已Supporto |
| `account_warmup` | Account预热 | ✅ 已Supporto |
| `comment` | Commento | ✅ 已Supporto |
| `like` | Mi Piace | 🔜 即将推出 |
| `message` | Messaggio Diretto | 🔜 即将推出 |
| `super_marketing` | Super Marketing活动 | 🔜 即将推出 |
| `profile` | AggiornaProfilo | 🔜 即将推出 |
| `scrape_user` | Scraping Utenti数据 | 🔜 即将推出 |

## Attività状态

| 状态码 | 状态文本 | Descrizione |
|--------|----------|------|
| 0 | pending | AttivitàIn AttesaEsegui |
| 1 | running | Attività正在Esegui |
| 2 | completed | AttivitàEseguiSuccesso |
| 3 | failed | AttivitàEseguiFallito |

## 后续

- [任务管理 API](./task-management) - 创建、查询和GestioneAttività
- [发布脚本配置](./post-script) - ConfigurazionePubblicaScript参数
- [关注脚本配置](./follow-script) - ConfigurazioneSeguiScript参数
- [取消关注脚本配置](./unfollow-script) - ConfigurazioneNon Seguire PiùScript参数
- [账号预热脚本配置](./account-warmup-script) - ConfigurazioneAccount预热Script参数
- [评论脚本配置](./comment-script) - ConfigurazioneCommentoScript参数
- [API 示例](./examples) - 不同语言的代码Esempio
