---
sidebar_position: 1
title: Local API Overview
description: TikMatrix Local API for programmatic task management
---

TikMatrix provides a local RESTful API that allows you to manage tasks programmatically. This is useful for integrating TikMatrix with your own automation systems, building custom workflows, or creating batch operations.

## Requirements

:::warning License Requirement
**The Local API is only available for Pro, Team, and Business plan subscribers.** Starter plan does not have access to the API.
:::

## Base URL

The API runs on your local machine at:

```text
http://localhost:50809/api/v1/
```

:::note
The port `50809` is the default port. Make sure TikMatrix is running before making API requests.
:::

## Response Format

All API responses follow this format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Response Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 40001 | Bad Request - Invalid parameters |
| 40002 | Bad Request - Missing script_name |
| 40003 | Bad Request - Script not supported via API |
| 40301 | Forbidden - API access requires Pro+ plan |
| 40401 | Not Found - Resource not found |
| 50001 | Internal Server Error |

## Quick Start

### 1. Check API Access

First, verify your license supports API access:

```bash
curl http://localhost:50809/api/v1/license/check
```

Response:

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

### 2. Create a Task

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Check out my new video! #viral"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. List Tasks

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Available Scripts

The `script_name` parameter accepts the following values:

| Script Name | Description | API Support |
|-------------|-------------|-------------|
| `post` | Publish content | ✅ Supported |
| `follow` | Follow users | ✅ Supported |
| `unfollow` | Unfollow users | ✅ Supported |
| `account_warmup` | Warm up accounts | ✅ Supported |
| `comment` | Comment on posts | ✅ Supported |
| `like` | Like posts | 🔜 Coming Soon |
| `message` | Send direct messages | 🔜 Coming Soon |
| `super_marketing` | Super marketing campaign | 🔜 Coming Soon |
| `profile` | Update profile | 🔜 Coming Soon |
| `scrape_user` | Scrape user data | 🔜 Coming Soon |

## Task Status

| Status Code | Status Text | Description |
|-------------|-------------|-------------|
| 0 | pending | Task is waiting to be executed |
| 1 | running | Task is currently running |
| 2 | completed | Task completed successfully |
| 3 | failed | Task failed |

## Next Steps

- [Task Management API](./task-management) - Create, query, and manage tasks
- [Post Script Configuration](./post-script) - Configure post script parameters
- [Follow Script Configuration](./follow-script) - Configure follow script parameters
- [Unfollow Script Configuration](./unfollow-script) - Configure unfollow script parameters
- [Account Warmup Script Configuration](./account-warmup-script) - Configure account warmup script parameters
- [Comment Script Configuration](./comment-script) - Configure comment script parameters
- [API Examples](./examples) - Code examples in different languages
