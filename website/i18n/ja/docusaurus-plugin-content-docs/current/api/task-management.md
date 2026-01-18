---
sidebar_position: 2
title: タスク管理 API
description: タスク管理端点の完整参考
---

本页面记录管理 TikMatrix タスクの所有できます用 API 端点。

## 创建タスク

に一个または複数デバイスまたはユーザー名创建新タスク。

- **端点：** `POST /api/v1/task`
- **Content-Type：** `application/json`

### 请求参数

API サポート两种模式创建タスク：

**模式 1：デバイス模式** - 使用 `serials` にデバイス创建タスク
**模式 2：ユーザー名模式** - 使用 `usernames` 直接に特定アカウント创建タスク

| 参数 | 类型 | 必需 | 説明 |
|------|------|------|------|
| serials | string[] | 条件必需 | デバイス序列号数组（など果未提供 `usernames` 则必需） |
| usernames | string[] | 条件必需 | ユーザー名数组（など果未提供 `serials` 则必需）。提供此参数时，直接に这些アカウント创建タスク。 |
| script_name | string | 是 | 要実行の脚本名称 |
| script_config | object | 是 | 脚本の配置参数（请参阅对应脚本文档） |
| enable_multi_account | boolean | 否 | 是否启用多アカウント模式（默认：false）。仅在デバイス模式下生效。 |
| start_time | string | 否 | 计划実行时间，形式に "HH:MM" |

### サポートの脚本

| 脚本名称 | 説明 | 文档 |
|----------|------|------|
| post | 发布動画または画像到 TikTok/Instagram | [Post 脚本配置](./post-script.md) |

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

有关 `script_config` の详细参数和更多示例，请参阅 [Post 脚本配置](./post-script.md)。

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

## 列表タスク

使用できます选过滤条件查询タスク。

- **端点：** `GET /api/v1/task`

| 参数 | 类型 | 必需 | 説明 |
|------|------|------|------|
| status | integer | 否 | 按状态过滤（0=pending, 1=running, 2=completed, 3=failed） |
| serial | string | 否 | 按デバイス序列号过滤 |
| script_name | string | 否 | 按脚本名称过滤 |
| source | string | 否 | 按来源过滤（"ui" または "api"） |
| page | integer | 否 | 页码（默认：1） |
| page_size | integer | 否 | 每页条目数（默认：20，最大：100） |

## 获取タスク详情

获取指定されたタスクの详细信息。

- **端点：** `GET /api/v1/task/{task_id}`

## 删除タスク

删除タスク。など果タスク正在运行，会先尝试停止它。

- **端点：** `DELETE /api/v1/task/{task_id}`

## 一括删除タスク

一次删除複数タスク，正在运行のタスク会先被停止。

- **端点：** `DELETE /api/v1/task/batch`
- **请求体：** `{ "task_ids": [1, 2, 3] }`

## 停止タスク

停止正在运行のタスク。

- **端点：** `POST /api/v1/task/{task_id}/stop`

## 再試行失败タスク

再試行单个失败タスク。

- **端点：** `POST /api/v1/task/{task_id}/retry`

## 再試行所有失败タスク

一次性再試行所有失败のタスク。

- **端点：** `POST /api/v1/task/retry-all`

## 获取タスク统计

获取タスク总体统计数据。

- **端点：** `GET /api/v1/task/stats`
- **响应：** 返回 total、pending、running、completed、failed の计数。

## 检查 API 许できます

检查你の许できます证是否サポート API 訪問。

- **端点：** `GET /api/v1/license/check`
- **注意：** Starter 计划会返回错误码 40301；Pro/Team/Business 计划できます訪問 API。
