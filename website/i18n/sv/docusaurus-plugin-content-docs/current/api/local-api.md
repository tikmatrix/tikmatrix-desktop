---
sidebar_position: 1
title: Översikt över lokalt API
description: TikMatrix lokalt API för programmatisk uppgiftshantering
---

TikMatrix tillhandahåller ett lokalt RESTful API som gör det möjligt att hantera uppgifter programmatiskt. Detta är användbart för att integrera TikMatrix med dina egna automationssystem, bygga anpassade arbetsflöden eller skapa batch-operationer.

## Krav

:::warning Licenskrav
**Det lokala API:et är endast tillgängligt för Pro, Team och Business-prenumeranter.** Starter-planen har inte tillgång till API:et.
:::

## Bas-URL

API:et körs på din lokala maskin på:

```text
http://localhost:50809/api/v1/
```

:::note
Porten `50809` är standardporten. Se till att TikMatrix körs innan du gör API-förfrågningar.
:::

## Svarsformat

Alla API-svar följer detta format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Svarskoder

| Kod | Beskrivning |
|------|-------------|
| 0 | Framgång |
| 40001 | Felaktig begäran - Ogiltiga parametrar |
| 40002 | Felaktig begäran - Saknar script_name |
| 40003 | Felaktig begäran - Script stöds inte via API |
| 40301 | Förbjuden - API-åtkomst kräver Pro+ plan |
| 40401 | Hittades inte - Resurs hittades inte |
| 50001 | Internt serverfel |

## Snabbstart

### 1. Kontrollera API-åtkomst

Först, verifiera att din licens stöder API-åtkomst:

```bash
curl http://localhost:50809/api/v1/license/check
```

Svar:

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

### 2. Skapa en uppgift

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Check out my new video! #viral"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. Lista uppgifter

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Tillgängliga scripts

Parametern `script_name` accepterar följande värden:

| Script-namn | Beskrivning | API-stöd |
|-------------|-------------|-------------|
| `post` | Publicera innehåll | ✅ Stöds |
| `follow` | Följ användare | ✅ Stöds |
| `unfollow` | Sluta följa användare | ✅ Stöds |
| `account_warmup` | Värm upp konton | ✅ Stöds |
| `comment` | Kommentera inlägg | ✅ Stöds |
| `like` | Gilla inlägg | 🔜 Kommer snart |
| `message` | Skicka direktmeddelanden | 🔜 Kommer snart |
| `super_marketing` | Supermarknadsföringskampanj | 🔜 Kommer snart |
| `profile` | Uppdatera profil | 🔜 Kommer snart |
| `scrape_user` | Skrapa användardata | 🔜 Kommer snart |

## Uppgiftsstatus

| Statuskod | Statustext | Beskrivning |
|-------------|-------------|-------------|
| 0 | pending | Uppgiften väntar på att utföras |
| 1 | running | Uppgiften körs för närvarande |
| 2 | completed | Uppgiften slutfördes framgångsrikt |
| 3 | failed | Uppgiften misslyckades |

## Nästa steg

- [API för uppgiftshantering](./task-management) - Skapa, fråga och hantera uppgifter
- [Konfiguration av post-script](./post-script) - Konfigurera parametrar för post-script
- [Konfiguration av follow-script](./follow-script) - Konfigurera parametrar för follow-script
- [Konfiguration av unfollow-script](./unfollow-script) - Konfigurera parametrar för unfollow-script
- [Konfiguration av account warmup-script](./account-warmup-script) - Konfigurera parametrar för account warmup-script
- [Konfiguration av comment-script](./comment-script) - Konfigurera parametrar för comment-script
- [API-exempel](./examples) - Kodexempel på olika språk
