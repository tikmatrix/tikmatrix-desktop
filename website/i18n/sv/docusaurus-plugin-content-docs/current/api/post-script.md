---
sidebar_position: 3
title: Konfiguration av post-script
description: Komplett konfigurationsreferens för post-scriptet
---

Den här sidan dokumenterar konfigurationsparametrarna för `post`-scriptet som används vid skapande av uppgifter.

## Översikt

`post`-scriptet används för att automatiskt publicera innehåll (videor eller bilder) till TikTok eller Instagram. Det stöder olika publiceringsmetoder, materialkällor och ljudalternativ.

## Scriptkonfiguration (`script_config`)

Objektet `script_config` innehåller parametrarna för post-scriptet. Nedan finns tillgängliga parametrar:

### Gemensamma parametrar (TikTok & Instagram)

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| content_type | integer | Nej | 0 | Innehållstyp: `0` = Video, `1` = Bilder |
| image_count | integer | Nej | 1 | Antal bilder att välja (när content_type = 1) |
| captions | string | Nej | "" | Bildtexttext för inlägget. Stöder spintax-format: `{option1\|option2\|option3}` |
| post_way | string | Nej | "share" | Publiceringsmetod: `share`, `addButton`, eller `useSound` |
| material_source | string | Nej | "materialLibrary" | Materialkälla: `materialLibrary` eller `localFolder` (ignoreras om material_list anges) |
| material_path | string | Villkorligt | "" | Lokal mappsökväg (krävs när material_source = "localFolder") |
| material_list | string[] | Nej | [] | **Array med direkta materialfilsökvägar.** När detta anges kringgås material_source och material_path logik. Idealisk för API-automation. |
| materials_tags | string | Nej | "" | Kommaseparerade materialtaggar för filtrering från bibliotek |
| upload_wait_time | integer | Nej | 30 | Sekunder att vänta på att uppladdning ska slutföras |
| sound_wait_time | integer | Nej | 10 | Sekunder att vänta på att ljud ska laddas |
| add_sound | string/integer | Nej | "-1" | Ljudalternativ: `-1` = standard, `0` = inaktivera, `1` = aktivera, `custom` = använd anpassat ljud |
| sound_name | string | Villkorligt | "" | Ljudnamn/URL (krävs när post_way = "useSound") |
| custom_sound_keyword | string | Villkorligt | "" | Nyckelord för att söka efter anpassat ljud (krävs när add_sound = "custom") |
| origin_sound_volume | integer | Nej | 50 | Originalljudvolym (0-100) |
| add_sound_volume | integer | Nej | 50 | Tillagt ljudvolym (0-100) |

### TikTok-specifika parametrar

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| add_product_link | integer | Nej | 0 | Lägg till produktlänk: `0` = Nej, `1` = Ja |

### Instagram-specifika parametrar

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| placement | string | Nej | "reel" | Inläggsplacering: `reel` eller `story` |

## Exempel

### Grundläggande postuppgift med direkt materiallista

Detta är den rekommenderade metoden för API-automation - skicka materialsökvägar direkt utan att förlita sig på materialbibliotek eller mappskanning:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Postuppgift med materialbibliotek (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Postuppgift efter användarnamnslista

Detta läge gör det möjligt att skapa uppgifter direkt för specifika konton utan att känna till deras enhetserienummer:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Postuppgift med lokal mapp (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Amazing content! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Post med anpassat ljud

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Dancing to this trending sound!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending dance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Post med specifik ljud-URL

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Using this awesome sound!",
      "material_source": "materialLibrary"
    }
  }'
```

### Posta bilder (Karusell)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Check out these photos! #photocarousel",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Svar

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## Se även

- [API för uppgiftshantering](./task-management.md) - Skapa, lista och hantera uppgifter
