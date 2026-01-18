---
sidebar_position: 6
title: Account预热ScriptConfigurazione
description: Account预热Script的完整Configurazione参考
---

本页面记录了用于Attività创建的 `account_warmup` Script的Configurazione参数。

## Panoramica

`account_warmup` Script用于通过模拟自然用户行为来预热 TikTok 或 Instagram Account。它会VisualizzazioniVideo，并根据Configurazione的概率Casuale进行Mi Piace、Segui、Preferiti和Commento。这有助于新Account建立Interazioni历史并避免被检测为机器人。

## ScriptConfigurazione (`script_config`)

`script_config` 对象包含Account预热Script的参数。以下SìDisponibile的参数：

### 参数

| 参数 | 类型 | Obbligatorio | Predefinito值 | Istruzioni |
|-----|------|------|-------|------|
| task_duration | number | No | 600 | 预热Attività的总时长（secondi） |
| topic | string | No | "" | Cerca主题关键词（Ogni行一个，Casuale选择） |
| min_duration | number | No | 15 | 最小VideoVisualizzazioni时长（secondi） |
| max_duration | number | No | 30 | 最大VideoVisualizzazioni时长（secondi） |
| like_probable | number | No | 0 | Mi Piace ai Video的概率（0-100） |
| floow_probable | number | No | 0 | SeguiVideo创作者的概率（0-100） |
| collect_probable | number | No | 0 | Preferiti/书签Video的概率（0-100） |
| comment_probable | number | No | 0 | Commenta Video的概率（0-100） |
| comment | string | No | "" | Commento模板（Ogni行一个，Casuale选择） |
| insert_emoji | boolean | No | false | Vuoi在Commento中插入Casuale表情 |
| comment_order | string | No | "random" | Commento选择顺序：`random`（Casuale）或 `sequential`（顺序） |
| generate_by_chatgpt | boolean | No | false | VuoiUtilizzo ChatGPT 生成Commento |
| chatgpt_settings | object | No | {} | ChatGPT ConfigurazioneImpostazioni（见下文） |

### ChatGPT Impostazioni结构

当 `generate_by_chatgpt` Impostazioni为 `true` 时，您可以Utilizzo `chatgpt_settings` 对象Configurazione ChatGPT Commento生成：

| 参数 | 类型 | Obbligatorio | Istruzioni |
|-----|------|------|------|
| api_key | string | Sì | 您的 OpenAI API 密钥 |
| model | string | No | Utilizzo的模型（Predefinito："gpt-3.5-turbo"）。选项："gpt-3.5-turbo"、"gpt-4"、"gpt-4-turbo" |
| prompt | string | No | 生成Commento的PersonalizzatoSuggerimento词。Predefinito生成友好、相关的Commento |
| max_tokens | number | No | 响应的最大 token 数（Predefinito：100） |
| temperature | number | No | 创造性等级 0-2（Predefinito：0.7）。数值越高 = 越有创意 |
| base_url | string | No | Personalizzato API 端点 URL（用于 Azure OpenAI 或兼容的 API） |

`chatgpt_settings` 对象Esempio：

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

:::tip Consigliato
对于新Account，Consigliato从低Interazioni概率（5-15%）开始，然后随时间逐渐Aumenta。这模拟了自然用户行为。
:::

## Esempio

### 基本Account预热

仅VisualizzazioniVideo的简单预热：

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

### 带主题Cerca的预热

通过Cerca特定主题来预热Account：

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

### 带Interazioni的预热

完整预热，包含Mi Piace、Segui和Commento：

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

### Utilizzo ChatGPT Commento的预热

Utilizzo ChatGPT 生成智能Commento：

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

### 多DispositiviIn Massa预热

在多个Dispositivi上同时Esegui预热：

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

### 定时预热Attività

安排预热在特定时间Esegui：

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

为特定Account创建预热Attività：

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

1. **从低概率开始**：对于新Account，Utilizzo低Interazioni概率（5-15%），然后在几giorni/几settimane内逐渐Aumenta。

2. **Utilizzo相关主题**：选择与您Account定位相关的主题，以建立相关的Interazioni历史。

3. **变化Visualizzazioni时长**：Impostazioni min_duration 和 max_duration 之间的范围，以模拟自然的Visualizzazioni模式。

4. **适度的Attività时长**：OgnigiorniEsegui 2-3 volte，Ognivolte 10-30 minuti的预热会话，而不Sì持续长时间的会话。

5. **Utilizzo多样化Commento**：提供多个Commento模板，以避免可能触发垃圾检测的重复模式。

6. **明智地安排时间**：Utilizzo `start_time` 在目标受众时区的活跃时段Esegui预热Attività。

## 另请参阅

- [任务管理 API](./task-management.md) - 创建、列出和GestioneAttività
- [发布脚本配置](./post-script.md) - ConfigurazionePubblicaScript参数
- [关注脚本配置](./follow-script.md) - ConfigurazioneSeguiScript参数
- [取消关注脚本配置](./unfollow-script.md) - ConfigurazioneNon Seguire PiùScript参数
