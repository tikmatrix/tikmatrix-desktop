---
sidebar_position: 4
title: Follow Script Configuratie
description: Volledige configuratiereferentie voor het follow script
---

Deze pagina documenteert de configuratieparameters voor het `follow` script dat gebruikt wordt bij het aanmaken van taken.

## Overzicht

Het `follow` script wordt gebruikt om automatisch gebruikers te volgen op TikTok of Instagram. Wanneer u meerdere doelgebruikers via API aanlevert, **wordt er één taak gemaakt per doelgebruiker**. U kunt bepalen wanneer elke taak wordt uitgevoerd met de `start_time` parameter.

## Script Configuratie (`script_config`)

Het `script_config` object bevat de parameters voor het follow script. Hieronder staan de beschikbare parameters:

### Parameters

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| target_users | string[] | Ja* | [] | Array van doel gebruikersnamen om te volgen (één taak per gebruiker) |
| target_user | string | Ja* | "" | Enkele doel gebruikersnaam of meerdere gebruikersnamen gescheiden door nieuwe regels/komma's |
| access_method | string | Nee | "direct" | Hoe naar gebruikersprofiel te navigeren: `direct` (via URL) of `search` |

:::note
Ofwel `target_users` array of `target_user` string moet worden opgegeven. Als beide worden opgegeven, heeft `target_users` voorrang.
:::

:::info Taak Aanmaken
Wanneer meerdere doelgebruikers worden opgegeven, maakt de API **één taak per doelgebruiker** aan. Bijvoorbeeld, als u 3 doelgebruikers en 2 apparaten opgeeft, worden er 6 taken aangemaakt. Gebruik de `start_time` parameter om te bepalen wanneer taken beginnen met uitvoeren.
:::

## Voorbeelden

### Volg Enkele Gebruiker

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### Volg Meerdere Gebruikers

Bij het volgen van meerdere gebruikers, wordt er één taak per gebruiker aangemaakt:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Dit maakt 3 afzonderlijke taken die onmiddellijk worden uitgevoerd.

### Plan Taken met Start Tijd

Gebruik `start_time` om te plannen wanneer taken moeten starten:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Volg Gebruikers via Zoekmethode

Gebruik de zoekmethode wanneer directe URL toegang niet werkt:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Volg Gebruikers op Gebruikersnaamlijst Modus

Maak follow taken direct voor specifieke accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@target_user"],
      "access_method": "direct"
    }
  }'
```

### Batch Volgen op Meerdere Apparaten

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Response

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

## Toegangsmethoden

### Directe Methode (`direct`)

- Opent gebruikersprofiel via URL: `tiktok.com/@username` of `instagram.com/username`
- Sneller en betrouwbaarder
- Aanbevolen voor de meeste gebruikssituaties

### Zoekmethode (`search`)

- Navigeert naar zoeken, typt gebruikersnaam, klikt op resultaat
- Langzamer maar werkt wanneer directe URL toegang geblokkeerd is
- Mogelijk minder nauwkeurig als meerdere vergelijkbare gebruikersnamen bestaan

## Beste Praktijken

1. **Gebruik start_time voor planning**: Gebruik de `start_time` parameter om te plannen wanneer taken moeten worden uitgevoerd (formaat: "HH:MM").

2. **Geef voorkeur aan directe toegang**: De `direct` toegangsmethode is sneller en betrouwbaarder dan `search`.

3. **Batch verstandig**: Volg niet te veel gebruikers tegelijk. Het systeem maakt één taak per doelgebruiker, dus grote lijsten resulteren in veel taken.

## Zie Ook

- [Task Management API](./task-management.md) - Taken maken, weergeven en beheren
- [Post Script Configuratie](./post-script.md) - Post script parameters configureren
- [Unfollow Script Configuratie](./unfollow-script.md) - Unfollow script parameters configureren
