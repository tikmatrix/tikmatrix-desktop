---
sidebar_position: 2
title: Task Management API
description: Complete API reference for task management endpoints
---

This page documents all available API endpoints for managing tasks in TikMatrix.

## Create Task

Create a new task for one or more devices or usernames.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Request Parameters

The API supports two modes for creating tasks:

**Mode 1: Device-based** - Use `serials` to create tasks for devices
**Mode 2: Username-based** - Use `usernames` to create tasks directly for specific accounts

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| serials | string[] | Conditional | Array of device serial numbers (required if `usernames` is not provided) |
| usernames | string[] | Conditional | Array of usernames to create tasks for (required if `serials` is not provided). When provided, tasks are created directly for these accounts. |
| script_name | string | Yes | Name of the script to execute |
| script_config | object | Yes | Configuration parameters for the script (see script-specific documentation) |
| enable_multi_account | boolean | No | Enable multi-account mode (default: false). Only applicable in device-based mode. |
| start_time | string | No | Scheduled start time in "HH:MM" format |

### Supported Scripts

| Script Name | Description | Documentation |
|-------------|-------------|---------------|
| post | Publish videos or images to TikTok/Instagram | [Post Script Configuration](./post-script.md) |
| follow | Follow or unfollow users | [Follow Script Configuration](./follow-script.md) |

### Example

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

For detailed `script_config` parameters and more examples, see [Post Script Configuration](./post-script.md) and [Follow Script Configuration](./follow-script.md).

### Response

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

## List Tasks

Query tasks with optional filters.

- **Endpoint:** `GET /api/v1/task`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | integer | No | Filter by status (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | No | Filter by device serial |
| script_name | string | No | Filter by script name |
| source | string | No | Filter by source ("ui" or "api") |
| page | integer | No | Page number (default: 1) |
| page_size | integer | No | Items per page (default: 20, max: 100) |

## Get Task Details

Get detailed information about a specific task.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Delete Task

Delete a task. If the task is running, it will be stopped first.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Batch Delete Tasks

Delete multiple tasks at once. Running tasks will be stopped first.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Body:** `{ "task_ids": [1, 2, 3] }`

## Stop Task

Stop a running task.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Retry Failed Task

Retry a failed task.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Retry All Failed Tasks

Retry all failed tasks at once.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Get Task Statistics

Get statistics about all tasks.

- **Endpoint:** `GET /api/v1/task/stats`
- **Response:** Returns total, pending, running, completed, and failed counts.

## Check API License

Check if your license supports API access.

- **Endpoint:** `GET /api/v1/license/check`
- **Note:** Starter plan returns error code 40301. Pro, Team, and Business plans have API access.
