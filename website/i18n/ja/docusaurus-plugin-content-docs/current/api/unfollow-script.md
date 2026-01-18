---
sidebar_position: 5
title: 取消フォロー脚本配置
description: 取消フォロー脚本完整配置参考
---

本页面介绍创建タスク时 `unfollow` 脚本の配置参数。

## 概述

`unfollow` 脚本用于在 TikTok または Instagram 上で自動取消フォロー用户。当您通じて API 提供複数ターゲット用户时，**系统会に每个ターゲット用户创建一个タスク**。您できます以使用 `start_time` 参数来制御タスクの実行时间。

## 脚本配置 (`script_config`)

`script_config` 对象含む取消フォロー脚本の配置参数。以下是できます用参数：

### 参数

| 参数 | 类型 | 必需 | 默认值 | 説明 |
|------|------|------|--------|------|
| target_users | string[] | 是* | [] | 要取消フォローのターゲットユーザー名数组（每个用户一个タスク） |
| target_user | string | 是* | "" | 单个ターゲットユーザー名，または複数ユーザー名以换行/逗号分隔 |
| access_method | string | 否 | "direct" | 导航到用户资料の方式：`direct`（通じて URL）または `search` |

:::note
必须提供 `target_users` 数组または `target_user` 字符串。など果两者都提供，`target_users` 优先。
:::

:::info タスク创建
当提供複数ターゲット用户时，API 会**に每个ターゲット用户创建一个タスク**。例など，など果您指定された 3 个ターゲット用户和 2 个デバイス，将创建 6 个タスク。使用 `start_time` 参数来制御タスクの実行时间。
:::

## 示例

### 取消フォロー单个用户

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### 取消フォロー複数用户

取消フォロー複数用户时，每个用户创建一个タスク：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

这将创建 3 个独立のタスク，立即実行。

### 使用开始时间スケジューリングタスク

使用 `start_time` 来スケジューリングタスクの开始时间：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### 通じて検索方式取消フォロー用户

当直接 URL 訪問不起作用时，使用検索方式：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### 多デバイス一括取消フォロー

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
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

## 訪問方式

### 直接訪問 (`direct`)

- 通じて URL 開く用户资料：`tiktok.com/@username` または `instagram.com/username`
- 更快更できます靠
- 大多数情况下推荐使用

### 検索訪問 (`search`)

- 导航到検索，输入ユーザー名，点击结果
- 较慢但在直接 URL 訪問被阻止时有效
- など果存在複数相似ユーザー名，できます能不太准确

## 最適な实践

1. **使用 start_time スケジューリング**：使用 `start_time` 参数来スケジューリングタスクの実行时间（形式："HH:MM"）。

2. **优先直接訪問**：`direct` 訪問方式比 `search` 更快更できます靠。

3. **合理一括处理**：不要一次取消フォロー太多用户。系统会に每个ターゲット用户创建一个タスク，因此大列表会产生许多タスク。

## 另请参阅

- [タスク管理 API](./task-management.md) - 创建、查询和管理タスク
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [フォロー脚本配置](./follow-script.md) - 配置フォロー脚本参数
