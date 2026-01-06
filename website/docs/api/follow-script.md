---
sidebar_position: 4
title: Follow Script Configuration
description: Complete configuration reference for the follow script
---

This page documents the configuration parameters for the `follow` script used in task creation.

## Overview

The `follow` script is used to automatically follow users on TikTok or Instagram. When you provide multiple target users via API, **one task is created per target user**. You can control when each task executes using the `start_time` parameter.

## Script Configuration (`script_config`)

The `script_config` object contains the parameters for the follow script. Below are the available parameters:

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| target_users | string[] | Yes* | [] | Array of target usernames to follow (one task per user) |
| target_user | string | Yes* | "" | Single target username or multiple usernames separated by newlines/commas |
| access_method | string | No | "direct" | How to navigate to user profile: `direct` (via URL) or `search` |

:::note
Either `target_users` array or `target_user` string must be provided. If both are provided, `target_users` takes priority.
:::

:::info Task Creation
When multiple target users are provided, the API creates **one task per target user**. For example, if you specify 3 target users and 2 devices, 6 tasks will be created. Use the `start_time` parameter to control when tasks start executing.
:::

## Examples

### Follow Single User

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

### Follow Multiple Users

When following multiple users, one task is created per user:

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

This creates 3 separate tasks that execute immediately.

### Schedule Tasks with Start Time

Use `start_time` to schedule when tasks should start:

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

### Follow Users via Search Method

Use the search method when direct URL access is not working:

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

### Follow Users by Username List Mode

Create follow tasks directly for specific accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@target_user"],
      "access_method": "direct"
    }
  }'
```

### Batch Follow on Multiple Devices

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

## Response

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

## Access Methods

### Direct Method (`direct`)

- Opens user profile via URL: `tiktok.com/@username` or `instagram.com/username`
- Faster and more reliable
- Recommended for most use cases

### Search Method (`search`)

- Navigates to search, types username, clicks on result
- Slower but works when direct URL access is blocked
- May be less accurate if multiple similar usernames exist

## Best Practices

1. **Use start_time for scheduling**: Use the `start_time` parameter to schedule when tasks should execute (format: "HH:MM").

2. **Prefer direct access**: The `direct` access method is faster and more reliable than `search`.

3. **Batch wisely**: Don't follow too many users at once. The system creates one task per target user, so large lists result in many tasks.

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Post Script Configuration](./post-script.md) - Configure post script parameters
- [Unfollow Script Configuration](./unfollow-script.md) - Configure unfollow script parameters
