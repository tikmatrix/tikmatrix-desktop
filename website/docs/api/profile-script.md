---
sidebar_position: 8
title: Profile Script Configuration
description: Complete configuration reference for the profile script
---

This page documents the configuration parameters for the `profile` script used in task creation.

## Overview

The `profile` script is used to automatically set up account profiles on TikTok or Instagram. It supports setting nicknames, usernames, bios, link URLs, and avatars. Content can be selected randomly or sequentially to ensure unique profiles across accounts.

## Script Configuration (`script_config`)

The `script_config` object contains the parameters for the profile script. Below are the available parameters:

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| profile_order | string | No | "random" | Content selection order: `random` or `sequential` |
| nicknames | string | No | "" | Nicknames to set, one per line (separated by newlines `\n`) |
| usernames | string | No | "" | Usernames to set, one per line (separated by newlines `\n`) |
| bios | string | No | "" | Bios to set, one per line (separated by newlines `\n`). To add line breaks within a single bio, use `\\n` in the text |
| link_url | string | No | "" | Link URL to set on profile |
| avatars_path | string | No | "" | Absolute path to the folder containing avatar images |

:::tip Selection Order
Use `sequential` mode to ensure each account gets unique profile information. In `random` mode, the same content may be reused across different accounts.
:::

## Examples

### Basic Profile Setup

Set nicknames and bios for a single device:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "profile",
    "script_config": {
      "nicknames": "CoolUser123\nAwesomeCreator",
      "bios": "Content creator\nLiving my best life",
      "profile_order": "random"
    }
  }'
```

### Full Profile with Avatar

Set complete profile including avatar:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "profile",
    "script_config": {
      "nicknames": "MyBrand Official",
      "usernames": "mybrand_official",
      "bios": "Official account\nFollow for updates!",
      "link_url": "https://example.com",
      "avatars_path": "C:/Users/Admin/Desktop/avatars",
      "profile_order": "random"
    }
  }'
```

### Sequential Profile Setup for Multiple Devices

Assign unique profiles to each device using sequential mode:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "profile",
    "script_config": {
      "nicknames": "User One\nUser Two\nUser Three",
      "usernames": "user_one\nuser_two\nuser_three",
      "bios": "Bio for user one\nBio for user two\nBio for user three",
      "avatars_path": "C:/Users/Admin/Desktop/avatars",
      "profile_order": "sequential"
    },
    "enable_multi_account": true
  }'
```

### Profile Setup by Username List

Create profile tasks directly for specific accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "profile",
    "script_config": {
      "nicknames": "Account One\nAccount Two",
      "bios": "Welcome to my page!\nCheck out my content!",
      "profile_order": "sequential"
    }
  }'
```

### Schedule Profile Update

Schedule profile update to run at a specific time:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "profile",
    "script_config": {
      "nicknames": "Updated Name",
      "bios": "Updated bio with link\nFollow me!",
      "link_url": "https://example.com"
    },
    "start_time": "10:00"
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

## Selection Order

### Random Mode (`random`)

- Content (nicknames, usernames, bios, avatars) is randomly selected for each task
- The same content may be used multiple times across different accounts
- Suitable when content uniqueness is not critical

### Sequential Mode (`sequential`)

- Content is selected in order: 1st task gets 1st item, 2nd task gets 2nd item, etc.
- When all items are used, it cycles back to the beginning
- **Important**: To ensure each account gets unique information, provide at least as many items as the number of accounts in a single batch run

## Best Practices

1. **Use sequential mode for unique profiles**: When setting up profiles for multiple accounts, use `sequential` mode to ensure each account gets different information.

2. **Prepare enough content**: When using sequential mode, provide at least as many nicknames, usernames, and bios as you have accounts.

3. **Clear gallery before setting avatar**: The script uses the first photo in the gallery as the avatar. It is recommended to clear the gallery before running the profile script.

4. **Bio line breaks**: To add line breaks within a single bio entry, use `\\n` in the JSON string. For example: `"First line\\nSecond line"`.

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Login Script Configuration](./login-script.md) - Configure login script parameters
- [Match Accounts Script Configuration](./match-accounts-script.md) - Configure match accounts script parameters
