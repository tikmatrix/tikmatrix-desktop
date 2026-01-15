---
sidebar_position: 2
title: 任务管理 API
description: 任务管理端点的完整参考
---

本页面记录了管理 TikMatrix 任务的所有可用 API 端点。

## 创建任务

为一个或多个设备或用户名创建新任务。

- **端点：** `POST /api/v1/task`
- **Content-Type：** `application/json`

### 请求参数

API 支持两种模式创建任务：

**模式 1：设备模式** - 使用 `serials` 为设备创建任务
**模式 2：用户名模式** - 使用 `usernames` 直接为特定账号创建任务

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| serials | string[] | 条件必需 | 设备序列号数组（如果未提供 `usernames` 则必需） |
| usernames | string[] | 条件必需 | 用户名数组（如果未提供 `serials` 则必需）。提供此参数时，直接为这些账号创建任务。 |
| script_name | string | 是 | 要执行的脚本名称 |
| script_config | object | 是 | 脚本的配置参数（请参阅对应脚本文档） |
| enable_multi_account | boolean | 否 | 是否启用多账号模式（默认：false）。仅在设备模式下生效。 |
| start_time | string | 否 | 计划执行时间，格式为 "HH:MM" |

### 支持的脚本

| 脚本名称 | 描述 | 文档 |
|----------|------|------|
| post | 发布视频或图片到 TikTok/Instagram | [Post 脚本配置](./post-script.md) |

### 示例

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

有关 `script_config` 的详细参数和更多示例，请参阅 [Post 脚本配置](./post-script.md)。

### 响应

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

## 列表任务

使用可选过滤条件查询任务。

- **端点：** `GET /api/v1/task`

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| status | integer | 否 | 按状态过滤（0=pending, 1=running, 2=completed, 3=failed） |
| serial | string | 否 | 按设备序列号过滤 |
| script_name | string | 否 | 按脚本名称过滤 |
| source | string | 否 | 按来源过滤（"ui" 或 "api"） |
| page | integer | 否 | 页码（默认：1） |
| page_size | integer | 否 | 每页条目数（默认：20，最大：100） |

## 获取任务详情

获取指定任务的详细信息。

- **端点：** `GET /api/v1/task/{task_id}`

## 删除任务

删除任务。如果任务正在运行，会先尝试停止它。

- **端点：** `DELETE /api/v1/task/{task_id}`

## 批量删除任务

一次删除多个任务，正在运行的任务会先被停止。

- **端点：** `DELETE /api/v1/task/batch`
- **请求体：** `{ "task_ids": [1, 2, 3] }`

## 停止任务

停止正在运行的任务。

- **端点：** `POST /api/v1/task/{task_id}/stop`

## 重试失败任务

重试单个失败任务。

- **端点：** `POST /api/v1/task/{task_id}/retry`

## 重试所有失败任务

一次性重试所有失败的任务。

- **端点：** `POST /api/v1/task/retry-all`

## 获取任务统计

获取任务总体统计数据。

- **端点：** `GET /api/v1/task/stats`
- **响应：** 返回 total、pending、running、completed、failed 的计数。

## 检查 API 许可

检查你的许可证是否支持 API 访问。

- **端点：** `GET /api/v1/license/check`
- **注意：** Starter 计划会返回错误码 40301；Pro/Team/Business 计划可访问 API。
