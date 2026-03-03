---
sidebar_position: 7
title: Login Script Configuration
description: Complete configuration reference for the login script
---

This page documents the configuration parameters for the `login` script used in task creation.

## Overview

The `login` script is used to automatically log in to TikTok or Instagram accounts on devices. It uses account credentials (email/password or username/password) that are already stored in the account list. The script automatically enables multi-account mode.

## Login Priority

The system uses the following login priority:

1. **Email + Password**: If an email is configured for the account, it will be used for login first.
2. **Username + Password**: If no email is configured, the username will be used for login.

## 2FA Support (Instagram Only)

For Instagram accounts with Two-Factor Authentication enabled, format the password as:

```plaintext
your_password:your_2fa_secret_key
```

**Example:**

```plaintext
mypassword123:JBSWY3DPEHPK3PXP
```

The system automatically detects the 2FA secret key, generates the TOTP code, and enters it during login.

## Script Configuration (`script_config`)

The `login` script does not require any additional `script_config` parameters. Account credentials are read from the account list.

:::note
The `enable_multi_account` parameter is always set to `true` for login tasks, regardless of the value provided.
:::

## Examples

### Login on Single Device

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "login",
    "script_config": {}
  }'
```

### Login on Multiple Devices

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "login",
    "script_config": {}
  }'
```

### Login by Username List

Create login tasks directly for specific accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "login",
    "script_config": {}
  }'
```

### Schedule Login Task

Schedule login to run at a specific time:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "login",
    "script_config": {},
    "start_time": "09:00"
  }'
```

## Response

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

## Important Notes

- **TikTok**: Login is not 100% fully automatic. You may need to manually enter email verification codes or complete other verification steps (such as image CAPTCHAs or human verification).
- **Instagram**: Can achieve 100% automated login when using 2FA-enabled accounts with the correct secret key format.
- Make sure accounts are added to the account list before running the login script.

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Profile Script Configuration](./profile-script.md) - Configure profile script parameters
- [Match Accounts Script Configuration](./match-accounts-script.md) - Configure match accounts script parameters
