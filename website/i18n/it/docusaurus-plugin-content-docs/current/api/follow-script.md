---
sidebar_position: 4
title: SeguiScriptConfigurazione
description: SeguiScript完整Configurazione参考
---

本页面介绍创建Attività时 `follow` Script的Configurazione参数。

## Panoramica

`follow` Script用于在 TikTok 或 Instagram 上Follow Automatico用户。当您通过 API 提供多个目标用户时，**系统会为Ogni个目标用户创建一个Attività**。您可以Utilizzo `start_time` 参数来控制Attività的Esegui时间。

## ScriptConfigurazione (`script_config`)

`script_config` 对象包含SeguiScript的Configurazione参数。以下SìDisponibile参数：

### 参数

| 参数 | 类型 | 必需 | Predefinito值 | Descrizione |
|------|------|------|--------|------|
| target_users | string[] | Sì* | [] | 要Segui的目标用户名数组（Ogni个用户一个Attività） |
| target_user | string | Sì* | "" | 单个目标用户名，或多个用户名以换行/逗号分隔 |
| access_method | string | No | "direct" | 导航到用户资料的方式：`direct`（通过 URL）或 `search` |

:::note
Richiesto提供 `target_users` 数组或 `target_user` 字符串。如果两者都提供，`target_users` 优先。
:::

:::info Attività创建
当提供多个目标用户时，API 会**为Ogni个目标用户创建一个Attività**。例如，如果您指定 3 个目标用户和 2 个Dispositivi，将创建 6 个Attività。Utilizzo `start_time` 参数来控制Attività的Esegui时间。
:::

## Esempio

### Segui单个用户

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

### Segui多个用户

Segui多个用户时，Ogni个用户创建一个Attività：

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

这将创建 3 个独立的Attività，立即Esegui。

### Utilizzo开始时间调度Attività

Utilizzo `start_time` 来调度Attività的开始时间：

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

### 通过Cerca方式Segui用户

当直接 URL 访问不起作用时，UtilizzoCerca方式：

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

### 多DispositiviIn MassaSegui

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

- 通过 URL Apri用户资料：`tiktok.com/@username` 或 `instagram.com/username`
- 更快更可靠
- 大多数情况下ConsigliatiUtilizzo

### Cerca访问 (`search`)

- 导航到Cerca，输入用户名，点击结果
- 较慢但在直接 URL 访问被阻止时有效
- 如果存在多个相似用户名，可能不太准确

## 最佳实践

1. **Utilizzo start_time 调度**：Utilizzo `start_time` 参数来调度Attività的Esegui时间（格式："HH:MM"）。

2. **优先直接访问**：`direct` 访问方式比 `search` 更快更可靠。

3. **合理In Massa处理**：不要一volteSegui太多用户。系统会为Ogni个目标用户创建一个Attività，因此大列表会产生许多Attività。

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、查询和GestioneAttività
- [发布脚本配置](./post-script.md) - ConfigurazionePubblicaScript参数
- [取消关注脚本配置](./unfollow-script.md) - ConfigurazioneNon Seguire PiùScript参数
