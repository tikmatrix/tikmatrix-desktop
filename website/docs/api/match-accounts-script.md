---
sidebar_position: 9
title: Match Accounts Script Configuration
description: Complete configuration reference for the match accounts script
---

This page documents the configuration parameters for the `match_accounts` script used in task creation.

## Overview

The `match_accounts` script is used to recognize social media accounts that are currently logged in on devices and automatically add them to the account list. This is useful for syncing device states with your account management system.

## Script Configuration (`script_config`)

The `match_accounts` script does not require any additional `script_config` parameters. It automatically scans the device for logged-in accounts.

:::note
The `enable_multi_account` parameter is always set to `false` for match accounts tasks, regardless of the value provided.
:::

## Examples

### Match Accounts on Single Device

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "match_accounts",
    "script_config": {}
  }'
```

### Match Accounts on Multiple Devices

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "match_accounts",
    "script_config": {}
  }'
```

### Schedule Match Accounts Task

Schedule account matching to run at a specific time:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "match_accounts",
    "script_config": {},
    "start_time": "08:00"
  }'
```

## Response

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301],
    "created_count": 1
  }
}
```

## Important Notes

- The match accounts script may not recognize all accounts in one run. If some accounts are missed, run the script again.
- This script scans for accounts currently logged in on the device and adds them to the TikMatrix account list.
- Running this script multiple times is safe — it will not create duplicate account entries.

## Best Practices

1. **Run after login**: After logging in accounts on devices, run the match accounts script to sync the account list.

2. **Run multiple times if needed**: If some accounts are not detected in the first run, execute the script again.

3. **Use for device inventory**: Run match accounts across all devices to build a complete picture of which accounts are on which devices.

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Login Script Configuration](./login-script.md) - Configure login script parameters
- [Profile Script Configuration](./profile-script.md) - Configure profile script parameters
