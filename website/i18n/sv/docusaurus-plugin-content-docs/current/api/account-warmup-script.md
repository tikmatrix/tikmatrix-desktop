---
sidebar_position: 6
title: Konfiguration av account warmup-script
description: Komplett konfigurationsreferens för account warmup-scriptet
---

Den här sidan dokumenterar konfigurationsparametrarna för `account_warmup`-scriptet som används vid skapande av uppgifter.

## Översikt

`account_warmup`-scriptet används för att värma upp TikTok- eller Instagram-konton genom att simulera naturligt användarbeteende. Det tittar på videor, gillar slumpmässigt, följer, samlar och kommenterar baserat på konfigurerade sannolikheter. Detta hjälper nya konton att bygga engagemangshistorik och undvika bot-detektering.

## Scriptkonfiguration (`script_config`)

Objektet `script_config` innehåller parametrarna för account warmup-scriptet. Nedan finns tillgängliga parametrar:

### Parametrar

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| task_duration | number | Nej | 600 | Total varaktighet för warmup-uppgift i sekunder |
| topic | string | Nej | "" | Sök nyckelord för ämne (ett per rad, väljs slumpmässigt) |
| min_duration | number | Nej | 15 | Minsta tittvaraktighet för video i sekunder |
| max_duration | number | Nej | 30 | Maximal tittvaraktighet för video i sekunder |
| like_probable | number | Nej | 0 | Sannolikhet (0-100) att gilla en video |
| floow_probable | number | Nej | 0 | Sannolikhet (0-100) att följa videoskaparen |
| collect_probable | number | Nej | 0 | Sannolikhet (0-100) att samla/bokmärka en video |
| comment_probable | number | Nej | 0 | Sannolikhet (0-100) att kommentera en video |
| comment | string | Nej | "" | Kommentarsmallar (ett per rad, väljs slumpmässigt) |
| insert_emoji | boolean | Nej | false | Om slumpmässiga emoji ska infogas i kommentarer |
| comment_order | string | Nej | "random" | Kommentarurvalsordning: `random` eller `sequential` |
| generate_by_chatgpt | boolean | Nej | false | Om kommentarer ska genereras med ChatGPT |
| chatgpt_settings | object | Nej | {} | ChatGPT-konfigurationsinställningar (se nedan) |

### ChatGPT-inställningsstruktur

När `generate_by_chatgpt` är satt till `true` kan du konfigurera ChatGPT-kommentarsgenerering med objektet `chatgpt_settings`:

| Parameter | Typ | Krävs | Beskrivning |
|-----------|------|----------|-------------|
| api_key | string | Ja | Din OpenAI API-nyckel |
| model | string | Nej | Modellen som ska användas (standard: "gpt-3.5-turbo"). Alternativ: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Nej | Anpassad prompt för att generera kommentarer. Standard genererar vänliga, relevanta kommentarer |
| max_tokens | number | Nej | Maximalt antal tokens för svaret (standard: 100) |
| temperature | number | Nej | Kreativitetsnivå 0-2 (standard: 0.7). Högre värden = mer kreativt |
| base_url | string | Nej | Anpassad API-endpoint URL (för Azure OpenAI eller kompatibla API:er) |

Exempel på `chatgpt_settings`-objekt:

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

:::tip Rekommendation
För nya konton, börja med låga interaktionssannolikheter (5-15%) och öka dem gradvis över tid. Detta efterliknar naturligt användarbeteende.
:::

## Exempel

### Grundläggande account warmup

Enkel warmup med endast videovisning:

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

### Warmup med ämnessökning

Värm upp konto genom att söka specifika ämnen:

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

### Warmup med interaktioner

Fullständig warmup med gillningar, följningar och kommentarer:

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

### Warmup med ChatGPT-kommentarer

Generera intelligenta kommentarer med ChatGPT:

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

### Batch warmup på flera enheter

Kör warmup på flera enheter samtidigt:

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

### Schemalägg warmup-uppgift

Schemalägg warmup för att köras vid en specifik tid:

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

### Warmup efter användarnamslista

Skapa warmup-uppgifter för specifika konton:

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

## Svar

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

## Bästa praxis

1. **Börja med låga sannolikheter**: För nya konton, använd låga interaktionssannolikheter (5-15%) och öka gradvis över dagar/veckor.

2. **Använd relevanta ämnen**: Välj ämnen som överensstämmer med din kontonisch för att bygga en relevant engagemangshistorik.

3. **Variera tittvaraktighet**: Ställ in ett intervall mellan min_duration och max_duration för att simulera naturliga visningsmönster.

4. **Måttlig uppgiftsvaraktighet**: Kör warmup-sessioner på 10-30 minuter, 2-3 gånger dagligen, snarare än kontinuerliga långa sessioner.

5. **Använd olika kommentarer**: Tillhandahåll flera kommentarsmallar för att undvika repetitiva mönster som kan utlösa spam-detektering.

6. **Schemalägg klokt**: Använd `start_time` för att köra warmup-uppgifter under aktiva timmar i din målgrupps tidszon.

## Se även

- [API för uppgiftshantering](./task-management.md) - Skapa, lista och hantera uppgifter
- [Konfiguration av post-script](./post-script.md) - Konfigurera parametrar för post-script
- [Konfiguration av follow-script](./follow-script.md) - Konfigurera parametrar för follow-script
- [Konfiguration av unfollow-script](./unfollow-script.md) - Konfigurera parametrar för unfollow-script
