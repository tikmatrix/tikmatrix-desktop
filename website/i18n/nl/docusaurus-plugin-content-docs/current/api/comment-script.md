---
sidebar_position: 5
title: Comment Script Configuratie
description: Volledige configuratiereferentie voor het comment script
---

Deze pagina documenteert de configuratieparameters voor het `comment` script dat gebruikt wordt bij het aanmaken van taken.

## Overzicht

Het `comment` script wordt gebruikt om automatisch reacties te plaatsen op TikTok of Instagram posts. Wanneer u meerdere doel post URL's via API aanlevert, **wordt er één taak gemaakt per doel post URL**. U kunt bepalen wanneer elke taak wordt uitgevoerd met de `start_time` parameter.

## Script Configuratie (`script_config`)

Het `script_config` object bevat de parameters voor het comment script. Hieronder staan de beschikbare parameters:

### Parameters

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Ja* | [] | Array van doel post URL's om op te reageren (één taak per URL) |
| target_post_url | string | Ja* | "" | Enkele doel post URL of meerdere URL's gescheiden door nieuwe regels/komma's |
| comment_content | string | Ja | "" | Reactietekst inhoud. Kan meerdere reacties bevatten gescheiden door nieuwe regels |
| comment_order | string | Nee | "random" | Hoe reacties te selecteren: `random` of `sequential` |
| insert_emoji | boolean | Nee | false | Of willekeurige emoji in de reactie moeten worden ingevoegd |
| comment_image_path | string | Nee | "" | Pad naar afbeeldingsbestand voor afbeeldingsreactie (alleen TikTok). Ondersteunt absoluut pad of relatief pad naar work_dir/upload/ |

:::note
Ofwel `target_post_urls` array of `target_post_url` string moet worden opgegeven. Als beide worden opgegeven, heeft `target_post_urls` voorrang.
:::

:::tip Afbeeldingsreactie (Alleen TikTok)
De `comment_image_path` parameter stelt u in staat om een afbeelding aan uw reactie toe te voegen. Deze functie wordt **alleen ondersteund op TikTok** - Instagram reacties ondersteunen geen afbeeldingsbijlagen. De afbeelding wordt naar het apparaat gepusht en geselecteerd als de eerste afbeelding in de galerij.
:::

:::info Taak Aanmaken
Wanneer meerdere doel post URL's worden opgegeven, maakt de API **één taak per doel post URL** aan. Bijvoorbeeld, als u 3 post URL's en 2 apparaten opgeeft, worden er 6 taken aangemaakt. Gebruik de `start_time` parameter om te bepalen wanneer taken beginnen met uitvoeren.
:::

## Voorbeelden

### Reageren op Enkele Post

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Great content! 🔥"
    }
  }'
```

### Reageren met Meerdere Reactie Opties

Geef meerdere reacties gescheiden door nieuwe regels. Het systeem selecteert er één op basis van `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Amazing video!\nLove this content!\nKeep it up! 👏\nThis is so good!",
      "comment_order": "random"
    }
  }'
```

### Reageren op Meerdere Posts

Bij het reageren op meerdere posts, wordt er één taak per post aangemaakt:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "Great video!\nAwesome!\nLove it!",
      "comment_order": "sequential"
    }
  }'
```

Dit maakt 3 afzonderlijke taken die onmiddellijk worden uitgevoerd.

### Plan Reacties met Start Tijd

Gebruik `start_time` om te plannen wanneer taken moeten starten:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Scheduled comment!"
    },
    "start_time": "14:30"
  }'
```

### Reageren met Emoji Invoegen

Schakel automatisch emoji invoegen in om reacties aantrekkelijker te maken:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "This is amazing",
      "insert_emoji": true
    }
  }'
```

### Reageren op Gebruikersnaamlijst Modus

Maak reactietaken direct voor specifieke accounts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Nice video!"
    }
  }'
```

### Batch Reageren op Meerdere Apparaten

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Great content!\nAmazing work!\nLove this!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram Reactie Voorbeeld

Dezelfde API werkt voor Instagram posts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Beautiful photo! 📸",
      "insert_emoji": true
    }
  }'
```

### TikTok Afbeeldingsreactie Voorbeeld

Voeg een afbeelding toe aan uw TikTok reactie (niet ondersteund op Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Check out this image!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Afbeeldingspad
De `comment_image_path` kan zijn:

- **Absoluut pad**: `C:/images/my_image.jpg` of `/home/user/images/my_image.jpg`
- **Relatief pad**: `my_image.jpg` (relatief ten opzichte van `work_dir/upload/`)

:::

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

## Reactievolgorde

### Willekeurige Volgorde (`random`)

- Selecteert willekeurig één reactie uit de opgegeven lijst
- Goed om reacties natuurlijker te laten lijken
- Standaard gedrag

### Sequentiële Volgorde (`sequential`)

- Selecteert reacties op volgorde op basis van `job_count`
- Eerste taak gebruikt eerste reactie, tweede taak gebruikt tweede reactie, etc.
- Keert terug naar het begin wanneer het einde van de lijst is bereikt
- Goed voor het verdelen van verschillende reacties over meerdere taken

## Post URL Formaten

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## Beste Praktijken

1. **Varieer uw reacties**: Geef meerdere reactie opties om spamachtig te lijken te voorkomen.

2. **Gebruik sequentiële volgorde voor variatie**: Bij het reageren op meerdere posts met hetzelfde apparaat, gebruik `sequential` volgorde om verschillende reacties te verdelen.

3. **Schakel emoji invoegen in**: Stel `insert_emoji: true` in om reacties natuurlijker en aantrekkelijker te laten lijken.

4. **Plan taken**: Gebruik de `start_time` parameter om reacties over tijd te spreiden, waardoor de kans op rate limiting wordt verminderd.

5. **Respecteer platformlimieten**: Maak niet te veel reactietaken tegelijk. De meeste platforms hebben rate limieten voor het reageren.

## Foutcodes

| Code | Beschrijving |
|------|-------------|
| 40001 | Ontbrekende doel post URL of reactie inhoud |
| 40003 | Script niet ondersteund via API |
| 40301 | API toegang vereist Pro+ plan |

## Zie Ook

- [Task Management API](./task-management.md) - Taken maken, weergeven en beheren
- [Post Script Configuratie](./post-script.md) - Post script parameters configureren
- [Follow Script Configuratie](./follow-script.md) - Follow script parameters configureren
- [Local API Overzicht](./local-api.md) - API overzicht en snelstart
