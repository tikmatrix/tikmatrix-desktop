---
sidebar_position: 5
title: Konfiguration av unfollow-script
description: Komplett konfigurationsreferens för unfollow-scriptet
---

Den här sidan dokumenterar konfigurationsparametrarna för `unfollow`-scriptet som används vid skapande av uppgifter.

## Översikt

`unfollow`-scriptet används för att automatiskt sluta följa användare på TikTok eller Instagram. När du tillhandahåller flera målanvändare via API skapas **en uppgift per målanvändare**. Du kan styra när varje uppgift körs genom att använda parametern `start_time`.

## Scriptkonfiguration (`script_config`)

Objektet `script_config` innehåller parametrarna för unfollow-scriptet. Nedan finns tillgängliga parametrar:

### Parametrar

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| target_users | string[] | Ja* | [] | Array av målanvändarnamn att sluta följa (en uppgift per användare) |
| target_user | string | Ja* | "" | Enskilt målanvändarnamn eller flera användarnamn separerade med radbrytningar/kommatecken |
| access_method | string | Nej | "direct" | Hur man navigerar till användarprofil: `direct` (via URL) eller `search` |

:::note
Antingen `target_users`-array eller `target_user`-sträng måste anges. Om båda anges har `target_users` prioritet.
:::

:::info Uppgiftsskapande
När flera målanvändare tillhandahålls skapar API:et **en uppgift per målanvändare**. Till exempel, om du anger 3 målanvändare och 2 enheter kommer 6 uppgifter att skapas. Använd parametern `start_time` för att styra när uppgifter börjar köras.
:::

## Exempel

### Sluta följa en enskild användare

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### Sluta följa flera användare

När flera användare slutas följas skapas en uppgift per användare:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Detta skapar 3 separata uppgifter som körs omedelbart.

### Schemalägg uppgifter med starttid

Använd `start_time` för att schemalägga när uppgifter ska starta:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Sluta följa användare via sökmetod

Använd sökmetoden när direkt URL-åtkomst inte fungerar:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Batch-unfollow på flera enheter

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Svar

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## Åtkomstmetoder

### Direktmetod (`direct`)

- Öppnar användarprofil via URL: `tiktok.com/@username` eller `instagram.com/username`
- Snabbare och mer pålitlig
- Rekommenderas för de flesta användningsfall

### Sökmetod (`search`)

- Navigerar till sökning, skriver användarnamn, klickar på resultat
- Långsammare men fungerar när direkt URL-åtkomst är blockerad
- Kan vara mindre exakt om flera liknande användarnamn finns

## Bästa praxis

1. **Använd start_time för schemaläggning**: Använd parametern `start_time` för att schemalägga när uppgifter ska köras (format: "HH:MM").

2. **Föredra direkt åtkomst**: Åtkomstmetoden `direct` är snabbare och mer pålitlig än `search`.

3. **Batch klokt**: Sluta inte följa för många användare samtidigt. Systemet skapar en uppgift per målanvändare, så stora listor resulterar i många uppgifter.

## Se även

- [API för uppgiftshantering](./task-management.md) - Skapa, lista och hantera uppgifter
- [Konfiguration av post-script](./post-script.md) - Konfigurera parametrar för post-script
- [Konfiguration av follow-script](./follow-script.md) - Konfigurera parametrar för follow-script
