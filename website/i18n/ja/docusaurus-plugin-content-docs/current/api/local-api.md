---
sidebar_position: 1
title: 本地 API 概览
description: TikMatrix 本地 API，用于以编程方式管理タスク
---

TikMatrix 提供一个本地の RESTful API，允许你以编程方式管理タスク。这对于将 TikMatrix 集成到你自己の自動化系统、构建カスタム工作流程または创建一括操作非常有用。

## 必要

:::warning 许できます证必要
**本地 API 仅对 Pro、Team 和 Business 计划用户开放。** Starter 计划不提供 API 訪問权限。
:::

## 基础 URL

API 在本机运行，地址に：

```text
http://localhost:50809/api/v1/
```

:::note
端口 `50809` に默认端口。请在发起请求前确保 TikMatrix 済み在运行。
:::

## 响应形式

所有 API 响应遵循以下形式：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### 响应码说明

| Code | 説明 |
|------|------|
| 0 | 成功 |
| 40001 | 参数错误 - 无效の请求参数 |
| 40002 | 参数错误 - 缺少 script_name |
| 40003 | 参数错误 - 脚本暂不サポート API 调用 |
| 40301 | 禁止 - API 訪問需要 Pro+ 计划 |
| 40401 | 未找到 - 资源不存在 |
| 50001 | 服务器内部错误 |

## 快速开始

### 1. 检查 API 訪問权限

首先，确认你の许できます证是否サポート API：

```bash
curl http://localhost:50809/api/v1/license/check
```

示例响应：

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

### 2. 创建タスク

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "看看我的新视频！#热门"
    },
    "enable_multi_account": false
  }'
```

### 3. 查询タスク列表

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## できます用脚本

:::info 当前サポート
目前，本地 API サポート `post`、`follow`、`unfollow`、`account_warmup` 和 `comment` 脚本。更多脚本将在未来版本中陆续添加。
:::

`script_name` 参数できます接受下列值：

| 脚本名 | 説明 | API サポート |
|--------|------|----------|
| `post` | 发布コンテンツ | ✅ 済みサポート |
| `follow` | フォロー用户 | ✅ 済みサポート |
| `unfollow` | 取消フォロー | ✅ 済みサポート |
| `account_warmup` | アカウント预热 | ✅ 済みサポート |
| `comment` | コメント | ✅ 済みサポート |
| `like` | いいね | 🔜 即将推出 |
| `message` | ダイレクトメッセージ | 🔜 即将推出 |
| `super_marketing` | スーパーマーケティング活动 | 🔜 即将推出 |
| `profile` | 更新个人资料 | 🔜 即将推出 |
| `scrape_user` | 抓取用户数据 | 🔜 即将推出 |

## タスク状态

| 状态码 | 状态文本 | 説明 |
|--------|----------|------|
| 0 | pending | タスクなど待実行 |
| 1 | running | タスク正在実行 |
| 2 | completed | タスク実行成功 |
| 3 | failed | タスク実行失败 |

## 后续

- [タスク管理 API](./task-management) - 创建、查询和管理タスク
- [发布脚本配置](./post-script) - 配置发布脚本参数
- [フォロー脚本配置](./follow-script) - 配置フォロー脚本参数
- [取消フォロー脚本配置](./unfollow-script) - 配置取消フォロー脚本参数
- [アカウント预热脚本配置](./account-warmup-script) - 配置アカウント预热脚本参数
- [コメント脚本配置](./comment-script) - 配置コメント脚本参数
- [API 示例](./examples) - 異なる言語の代码示例
