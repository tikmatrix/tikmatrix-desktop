---
sidebar_position: 6
title: アカウント预热脚本配置
description: アカウント预热脚本の完整配置参考
---

本页面记录用于タスク创建の `account_warmup` 脚本の配置参数。

## 概述

`account_warmup` 脚本用于通じてシミュレート自然用户動作来预热 TikTok または Instagram アカウント。它会观看動画，しに基づいて配置の概率ランダム进行いいね、フォロー、お気に入り和コメント。这有助于新アカウント建立互动历史し避免被检测に机器人。

## 脚本配置 (`script_config`)

`script_config` 对象含むアカウント预热脚本の参数。以下是できます用の参数：

### 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|-----|------|------|-------|------|
| task_duration | number | 否 | 600 | 预热タスクの总时长（秒） |
| topic | string | 否 | "" | 検索主题キーワード（每行一个，ランダム选择） |
| min_duration | number | 否 | 15 | 最小動画观看时长（秒） |
| max_duration | number | 否 | 30 | 最大動画观看时长（秒） |
| like_probable | number | 否 | 0 | いいね動画の概率（0-100） |
| floow_probable | number | 否 | 0 | フォロー動画创作者の概率（0-100） |
| collect_probable | number | 否 | 0 | お気に入り/书签動画の概率（0-100） |
| comment_probable | number | 否 | 0 | コメント動画の概率（0-100） |
| comment | string | 否 | "" | コメント模板（每行一个，ランダム选择） |
| insert_emoji | boolean | 否 | false | 是否在コメント中插入ランダム表情 |
| comment_order | string | 否 | "random" | コメント选择顺序：`random`（ランダム）または `sequential`（顺序） |
| generate_by_chatgpt | boolean | 否 | false | 是否使用 ChatGPT 生成コメント |
| chatgpt_settings | object | 否 | {} | ChatGPT 配置設定（见下文） |

### ChatGPT 設定结构

当 `generate_by_chatgpt` 設定に `true` 时，您できます以使用 `chatgpt_settings` 对象配置 ChatGPT コメント生成：

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| api_key | string | 是 | 您の OpenAI API 密钥 |
| model | string | 否 | 使用の模型（默认："gpt-3.5-turbo"）。选项："gpt-3.5-turbo"、"gpt-4"、"gpt-4-turbo" |
| prompt | string | 否 | 生成コメントのカスタム提示词。默认生成友好、相关のコメント |
| max_tokens | number | 否 | 响应の最大 token 数（默认：100） |
| temperature | number | 否 | 创造性など级 0-2（默认：0.7）。数值越高 = 越有创意 |
| base_url | string | 否 | カスタム API 端点 URL（用于 Azure OpenAI または兼容の API） |

`chatgpt_settings` 对象示例：

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "针对这个视频生成一条简短友好的中文评论",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip 建议
对于新アカウント，建议从低互动概率（5-15%）开始，然后随时间逐渐增加。这シミュレート自然用户動作。
:::

## 示例

### 基本アカウント预热

仅观看動画の简单预热：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 10,
      "max_duration": 30
    }
  }'
```

### 带主题検索の预热

通じて検索特定主题来预热アカウント：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "搞笑猫咪\n狗狗视频\n宠物合集",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### 带互动の预热

完整预热，含むいいね、フォロー和コメント：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "美食\n食谱\n烹饪",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "太棒了！🔥\n喜欢这个内容！\n太好了！👏\n哇，太厉害了！",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### 使用 ChatGPT コメントの预热

使用 ChatGPT 生成智能コメント：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "科技评测\n数码产品",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "针对这个视频生成一条简短友好的评论"
      }
    }
  }'
```

### 多デバイス一括预热

在複数デバイス上で同時に运行预热：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20
    },
    "enable_multi_account": true
  }'
```

### 定时预热タスク

安排预热在特定时间运行：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "音乐\n舞蹈\n热门",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### 按ユーザー名列表预热

に特定アカウント创建预热タスク：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20,
      "floow_probable": 5
    }
  }'
```

## 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## 最適な实践

1. **从低概率开始**：对于新アカウント，使用低互动概率（5-15%），然后在几天/几周内逐渐增加。

2. **使用相关主题**：选择と您アカウント定位相关の主题，以建立相关の互动历史。

3. **变化观看时长**：設定 min_duration 和 max_duration 之间の范围，以シミュレート自然の观看模式。

4. **适度のタスク时长**：每天运行 2-3 次，每次 10-30 分の预热会话，而不是持续长时间の会话。

5. **使用多样化コメント**：提供複数コメント模板，以避免できます能触发垃圾检测の重复模式。

6. **明智地安排时间**：使用 `start_time` 在ターゲット受众时区の活跃时段运行预热タスク。

## 另请参阅

- [タスク管理 API](./task-management.md) - 创建、列出和管理タスク
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [フォロー脚本配置](./follow-script.md) - 配置フォロー脚本参数
- [取消フォロー脚本配置](./unfollow-script.md) - 配置取消フォロー脚本参数
