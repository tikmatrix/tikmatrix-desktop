---
sidebar_position: 6
title: Account Warmup Script Configuration
description: Complete configuration reference for the account warmup script
---

This page documents the configuration parameters for the `account_warmup` script used in task creation.

## Overview

The `account_warmup` script is used to warm up TikTok or Instagram accounts by simulating natural user behavior. It watches videos, randomly likes, follows, collects, and comments based on configured probabilities. This helps new accounts build engagement history and avoid bot detection.

## Script Configuration (`script_config`)

The `script_config` object contains the parameters for the account warmup script. Below are the available parameters:

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| task_duration | number | No | 600 | Total duration of warmup task in seconds |
| topic | string | No | "" | Search topic keywords (one per line, randomly selected) |
| min_duration | number | No | 15 | Minimum video watch duration in seconds |
| max_duration | number | No | 30 | Maximum video watch duration in seconds |
| like_probable | number | No | 0 | Probability (0-100) of liking a video |
| floow_probable | number | No | 0 | Probability (0-100) of following the video creator |
| collect_probable | number | No | 0 | Probability (0-100) of collecting/bookmarking a video |
| comment_probable | number | No | 0 | Probability (0-100) of commenting on a video |
| comment | string | No | "" | Comment templates (one per line, randomly selected) |
| insert_emoji | boolean | No | false | Whether to insert random emoji in comments |
| comment_order | string | No | "random" | Comment selection order: `random` or `sequential` |
| generate_by_chatgpt | boolean | No | false | Whether to generate comments using ChatGPT |
| chatgpt_settings | object | No | {} | ChatGPT configuration settings (see below) |

### ChatGPT Settings Structure

When `generate_by_chatgpt` is set to `true`, you can configure ChatGPT comment generation with the `chatgpt_settings` object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| api_key | string | Yes | Your OpenAI API key |
| model | string | No | The model to use (default: "gpt-3.5-turbo"). Options: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | No | Custom prompt for generating comments. Default generates friendly, relevant comments |
| max_tokens | number | No | Maximum tokens for the response (default: 100) |
| temperature | number | No | Creativity level 0-2 (default: 0.7). Higher values = more creative |
| base_url | string | No | Custom API endpoint URL (for Azure OpenAI or compatible APIs) |

Example `chatgpt_settings` object:

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "Generate a short, friendly comment about this video in English",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Recommendation
For new accounts, start with low interaction probabilities (5-15%) and gradually increase them over time. This mimics natural user behavior.
:::

## Examples

### Basic Account Warmup

Simple warmup with video watching only:

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

### Warmup with Topic Search

Warm up account by searching specific topics:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "funny cats\ndog videos\npet compilation",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Warmup with Interactions

Full warmup with likes, follows, and comments:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "cooking\nrecipes\nfood",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "This is amazing! 🔥\nLove this content!\nSo good! 👏\nWow, incredible!",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Warmup with ChatGPT Comments

Generate intelligent comments using ChatGPT:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "tech reviews\ngadgets",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "Generate a short, friendly comment about this video"
      }
    }
  }'
```

### Batch Warmup on Multiple Devices

Run warmup on multiple devices simultaneously:

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

### Schedule Warmup Task

Schedule warmup to run at a specific time:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "music\ndance\ntrending",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Warmup by Username List

Create warmup tasks for specific accounts:

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

## Response

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

## Best Practices

1. **Start with low probabilities**: For new accounts, use low interaction probabilities (5-15%) and increase gradually over days/weeks.

2. **Use relevant topics**: Choose topics that align with your account niche to build a relevant engagement history.

3. **Vary watch duration**: Set a range between min_duration and max_duration to simulate natural viewing patterns.

4. **Moderate task duration**: Run warmup sessions of 10-30 minutes, 2-3 times daily, rather than continuous long sessions.

5. **Use diverse comments**: Provide multiple comment templates to avoid repetitive patterns that may trigger spam detection.

6. **Schedule wisely**: Use `start_time` to run warmup tasks during active hours in your target audience's timezone.

## See Also

- [Task Management API](./task-management.md) - Create, list, and manage tasks
- [Post Script Configuration](./post-script.md) - Configure post script parameters
- [Follow Script Configuration](./follow-script.md) - Configure follow script parameters
- [Unfollow Script Configuration](./unfollow-script.md) - Configure unfollow script parameters
