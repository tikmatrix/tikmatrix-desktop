---
sidebar_position: 4
title: 关注脚本配置
description: 关注脚本完整配置参考
---

本页面介绍创建任务时 `follow` 脚本的配置参数。

## 概述

`follow` 脚本用于在 TikTok 或 Instagram 上自动关注用户。当您通过 API 提供多个目标用户时，**系统会为每个目标用户创建一个任务**。您可以使用 `start_time` 参数来控制任务的执行时间。

## 脚本配置 (`script_config`)

`script_config` 对象包含关注脚本的配置参数。以下是可用参数：

### 参数

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| target_users | string[] | 是* | [] | 要关注的目标用户名数组（每个用户一个任务） |
| target_user | string | 是* | "" | 单个目标用户名，或多个用户名以换行/逗号分隔 |
| access_method | string | 否 | "direct" | 导航到用户资料的方式：`direct`（通过 URL）或 `search` |

:::note
必须提供 `target_users` 数组或 `target_user` 字符串。如果两者都提供，`target_users` 优先。
:::

:::info 任务创建
当提供多个目标用户时，API 会**为每个目标用户创建一个任务**。例如，如果您指定 3 个目标用户和 2 个设备，将创建 6 个任务。使用 `start_time` 参数来控制任务的执行时间。
:::

## 示例

### 关注单个用户

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

### 关注多个用户

关注多个用户时，每个用户创建一个任务：

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

这将创建 3 个独立的任务，立即执行。

### 使用开始时间调度任务

使用 `start_time` 来调度任务的开始时间：

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

### 通过搜索方式关注用户

当直接 URL 访问不起作用时，使用搜索方式：

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

### 多设备批量关注

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

- 通过 URL 打开用户资料：`tiktok.com/@username` 或 `instagram.com/username`
- 更快更可靠
- 大多数情况下推荐使用

### 搜索访问 (`search`)

- 导航到搜索，输入用户名，点击结果
- 较慢但在直接 URL 访问被阻止时有效
- 如果存在多个相似用户名，可能不太准确

## 最佳实践

1. **使用 start_time 调度**：使用 `start_time` 参数来调度任务的执行时间（格式："HH:MM"）。

2. **优先直接访问**：`direct` 访问方式比 `search` 更快更可靠。

3. **合理批量处理**：不要一次关注太多用户。系统会为每个目标用户创建一个任务，因此大列表会产生许多任务。

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、查询和管理任务
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [取消关注脚本配置](./unfollow-script.md) - 配置取消关注脚本参数
