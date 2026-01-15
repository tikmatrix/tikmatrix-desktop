---
sidebar_position: 6
title: 账号预热脚本配置
description: 账号预热脚本的完整配置参考
---

本页面记录了用于任务创建的 `account_warmup` 脚本的配置参数。

## 概述

`account_warmup` 脚本用于通过模拟自然用户行为来预热 TikTok 或 Instagram 账号。它会观看视频，并根据配置的概率随机进行点赞、关注、收藏和评论。这有助于新账号建立互动历史并避免被检测为机器人。

## 脚本配置 (`script_config`)

`script_config` 对象包含账号预热脚本的参数。以下是可用的参数：

### 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|-----|------|------|-------|------|
| task_duration | number | 否 | 600 | 预热任务的总时长（秒） |
| topic | string | 否 | "" | 搜索主题关键词（每行一个，随机选择） |
| min_duration | number | 否 | 15 | 最小视频观看时长（秒） |
| max_duration | number | 否 | 30 | 最大视频观看时长（秒） |
| like_probable | number | 否 | 0 | 点赞视频的概率（0-100） |
| floow_probable | number | 否 | 0 | 关注视频创作者的概率（0-100） |
| collect_probable | number | 否 | 0 | 收藏/书签视频的概率（0-100） |
| comment_probable | number | 否 | 0 | 评论视频的概率（0-100） |
| comment | string | 否 | "" | 评论模板（每行一个，随机选择） |
| insert_emoji | boolean | 否 | false | 是否在评论中插入随机表情 |
| comment_order | string | 否 | "random" | 评论选择顺序：`random`（随机）或 `sequential`（顺序） |
| generate_by_chatgpt | boolean | 否 | false | 是否使用 ChatGPT 生成评论 |
| chatgpt_settings | object | 否 | {} | ChatGPT 配置设置（见下文） |

### ChatGPT 设置结构

当 `generate_by_chatgpt` 设置为 `true` 时，您可以使用 `chatgpt_settings` 对象配置 ChatGPT 评论生成：

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| api_key | string | 是 | 您的 OpenAI API 密钥 |
| model | string | 否 | 使用的模型（默认："gpt-3.5-turbo"）。选项："gpt-3.5-turbo"、"gpt-4"、"gpt-4-turbo" |
| prompt | string | 否 | 生成评论的自定义提示词。默认生成友好、相关的评论 |
| max_tokens | number | 否 | 响应的最大 token 数（默认：100） |
| temperature | number | 否 | 创造性等级 0-2（默认：0.7）。数值越高 = 越有创意 |
| base_url | string | 否 | 自定义 API 端点 URL（用于 Azure OpenAI 或兼容的 API） |

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
对于新账号，建议从低互动概率（5-15%）开始，然后随时间逐渐增加。这模拟了自然用户行为。
:::

## 示例

### 基本账号预热

仅观看视频的简单预热：

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

### 带主题搜索的预热

通过搜索特定主题来预热账号：

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

### 带互动的预热

完整预热，包含点赞、关注和评论：

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

### 使用 ChatGPT 评论的预热

使用 ChatGPT 生成智能评论：

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

### 多设备批量预热

在多个设备上同时运行预热：

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

### 定时预热任务

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

### 按用户名列表预热

为特定账号创建预热任务：

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

## 最佳实践

1. **从低概率开始**：对于新账号，使用低互动概率（5-15%），然后在几天/几周内逐渐增加。

2. **使用相关主题**：选择与您账号定位相关的主题，以建立相关的互动历史。

3. **变化观看时长**：设置 min_duration 和 max_duration 之间的范围，以模拟自然的观看模式。

4. **适度的任务时长**：每天运行 2-3 次，每次 10-30 分钟的预热会话，而不是持续长时间的会话。

5. **使用多样化评论**：提供多个评论模板，以避免可能触发垃圾检测的重复模式。

6. **明智地安排时间**：使用 `start_time` 在目标受众时区的活跃时段运行预热任务。

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、列出和管理任务
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [关注脚本配置](./follow-script.md) - 配置关注脚本参数
- [取消关注脚本配置](./unfollow-script.md) - 配置取消关注脚本参数
