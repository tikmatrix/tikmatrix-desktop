---
sidebar_position: 6
title: Account Warmup Script Configuratie
description: Volledige configuratiereferentie voor het account warmup script
---

Deze pagina documenteert de configuratieparameters voor het `account_warmup` script dat gebruikt wordt bij het aanmaken van taken.

## Overzicht

Het `account_warmup` script wordt gebruikt om TikTok of Instagram accounts op te warmen door natuurlijk gebruikersgedrag te simuleren. Het bekijkt video's, liket willekeurig, volgt, verzamelt en reageert op basis van geconfigureerde waarschijnlijkheden. Dit helpt nieuwe accounts om een betrokkenheidsgeschiedenis op te bouwen en botdetectie te vermijden.

## Script Configuratie (`script_config`)

Het `script_config` object bevat de parameters voor het account warmup script. Hieronder staan de beschikbare parameters:

### Parameters

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| task_duration | number | Nee | 600 | Totale duur van warmup taak in seconden |
| topic | string | Nee | "" | Zoekonderwerp zoekwoorden (één per regel, willekeurig geselecteerd) |
| min_duration | number | Nee | 15 | Minimale video bekijkduur in seconden |
| max_duration | number | Nee | 30 | Maximale video bekijkduur in seconden |
| like_probable | number | Nee | 0 | Waarschijnlijkheid (0-100) van het liken van een video |
| floow_probable | number | Nee | 0 | Waarschijnlijkheid (0-100) van het volgen van de video maker |
| collect_probable | number | Nee | 0 | Waarschijnlijkheid (0-100) van het verzamelen/bookmarken van een video |
| comment_probable | number | Nee | 0 | Waarschijnlijkheid (0-100) van het reageren op een video |
| comment | string | Nee | "" | Reactiesjablonen (één per regel, willekeurig geselecteerd) |
| insert_emoji | boolean | Nee | false | Of willekeurige emoji in reacties moeten worden ingevoegd |
| comment_order | string | Nee | "random" | Reactieselectievolgorde: `random` of `sequential` |
| generate_by_chatgpt | boolean | Nee | false | Of reacties gegenereerd moeten worden met ChatGPT |
| chatgpt_settings | object | Nee | {} | ChatGPT configuratie-instellingen (zie hieronder) |

### ChatGPT Settings Structuur

Wanneer `generate_by_chatgpt` is ingesteld op `true`, kunt u ChatGPT reactiegeneratie configureren met het `chatgpt_settings` object:

| Parameter | Type | Verplicht | Beschrijving |
|-----------|------|----------|-------------|
| api_key | string | Ja | Uw OpenAI API sleutel |
| model | string | Nee | Het te gebruiken model (standaard: "gpt-3.5-turbo"). Opties: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Nee | Aangepaste prompt voor het genereren van reacties. Standaard genereert vriendelijke, relevante reacties |
| max_tokens | number | Nee | Maximum tokens voor het antwoord (standaard: 100) |
| temperature | number | Nee | Creativiteitsniveau 0-2 (standaard: 0.7). Hogere waarden = meer creatief |
| base_url | string | Nee | Aangepaste API endpoint URL (voor Azure OpenAI of compatibele API's) |

Voorbeeld `chatgpt_settings` object:

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

:::tip Aanbeveling
Voor nieuwe accounts, begin met lage interactiewaarschijnlijkheden (5-15%) en verhoog deze geleidelijk in de loop van de tijd. Dit bootst natuurlijk gebruikersgedrag na.
:::

## Voorbeelden

### Basis Account Warmup

Eenvoudige warmup met alleen video's bekijken:

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

### Warmup met Onderwerp Zoeken

Warm account op door specifieke onderwerpen te zoeken:

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

### Warmup met Interacties

Volledige warmup met likes, volgen en reacties:

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

### Warmup met ChatGPT Reacties

Genereer intelligente reacties met ChatGPT:

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

### Batch Warmup op Meerdere Apparaten

Voer warmup uit op meerdere apparaten tegelijkertijd:

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

### Plan Warmup Taak

Plan warmup om op een specifiek tijdstip uit te voeren:

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

### Warmup op Gebruikersnaamlijst

Maak warmup taken voor specifieke accounts:

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

## Beste Praktijken

1. **Begin met lage waarschijnlijkheden**: Voor nieuwe accounts, gebruik lage interactiewaarschijnlijkheden (5-15%) en verhoog deze geleidelijk over dagen/weken.

2. **Gebruik relevante onderwerpen**: Kies onderwerpen die aansluiten bij de niche van uw account om een relevante betrokkenheidsgeschiedenis op te bouwen.

3. **Varieer bekijkduur**: Stel een bereik in tussen min_duration en max_duration om natuurlijke kijkpatronen te simuleren.

4. **Gematigde taakduur**: Voer warmup sessies uit van 10-30 minuten, 2-3 keer per dag, in plaats van continue lange sessies.

5. **Gebruik diverse reacties**: Bied meerdere reactiesjablonen om repetitieve patronen te vermijden die spam detectie kunnen activeren.

6. **Plan slim**: Gebruik `start_time` om warmup taken uit te voeren tijdens actieve uren in de tijdzone van uw doelpubliek.

## Zie Ook

- [Task Management API](./task-management.md) - Taken maken, weergeven en beheren
- [Post Script Configuratie](./post-script.md) - Post script parameters configureren
- [Follow Script Configuratie](./follow-script.md) - Follow script parameters configureren
- [Unfollow Script Configuratie](./unfollow-script.md) - Unfollow script parameters configureren
