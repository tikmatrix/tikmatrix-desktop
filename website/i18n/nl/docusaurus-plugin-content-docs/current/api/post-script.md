---
sidebar_position: 3
title: Post Script Configuratie
description: Volledige configuratiereferentie voor het post script
---

Deze pagina documenteert de configuratieparameters voor het `post` script dat gebruikt wordt bij het aanmaken van taken.

## Overzicht

Het `post` script wordt gebruikt om automatisch inhoud (video's of afbeeldingen) te publiceren naar TikTok of Instagram. Het ondersteunt verschillende post methoden, materiaalbronnen en geluidsopties.

## Script Configuratie (`script_config`)

Het `script_config` object bevat de parameters voor het post script. Hieronder staan de beschikbare parameters:

### Gemeenschappelijke Parameters (TikTok & Instagram)

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| content_type | integer | Nee | 0 | Inhoudstype: `0` = Video, `1` = Afbeeldingen |
| image_count | integer | Nee | 1 | Aantal te selecteren afbeeldingen (wanneer content_type = 1) |
| captions | string | Nee | "" | Bijschrifttekst voor de post. Ondersteunt spintax formaat: `{optie1\|optie2\|optie3}` |
| post_way | string | Nee | "share" | Post methode: `share`, `addButton`, of `useSound` |
| material_source | string | Nee | "materialLibrary" | Materiaalbron: `materialLibrary` of `localFolder` (genegeerd als material_list is opgegeven) |
| material_path | string | Voorwaardelijk | "" | Lokale map pad (verplicht wanneer material_source = "localFolder") |
| material_list | string[] | Nee | [] | **Directe materiaalbestandpaden array.** Wanneer opgegeven, omzeilt material_source en material_path logica. Ideaal voor API automatisering. |
| materials_tags | string | Nee | "" | Komma-gescheiden materiaaltags voor filteren uit bibliotheek |
| upload_wait_time | integer | Nee | 30 | Seconden te wachten op voltooiing upload |
| sound_wait_time | integer | Nee | 10 | Seconden te wachten op laden geluid |
| add_sound | string/integer | Nee | "-1" | Geluidsoptie: `-1` = standaard, `0` = uitschakelen, `1` = inschakelen, `custom` = gebruik aangepast geluid |
| sound_name | string | Voorwaardelijk | "" | Geluidsnaam/URL (verplicht wanneer post_way = "useSound") |
| custom_sound_keyword | string | Voorwaardelijk | "" | Zoekwoord om aangepast geluid te zoeken (verplicht wanneer add_sound = "custom") |
| origin_sound_volume | integer | Nee | 50 | Origineel geluidsvolume (0-100) |
| add_sound_volume | integer | Nee | 50 | Toegevoegd geluidsvolume (0-100) |

### TikTok Specifieke Parameters

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| add_product_link | integer | Nee | 0 | Voeg productlink toe: `0` = Nee, `1` = Ja |

### Instagram Specifieke Parameters

| Parameter | Type | Verplicht | Standaard | Beschrijving |
|-----------|------|----------|---------|-------------|
| placement | string | Nee | "reel" | Post plaatsing: `reel` of `story` |

## Voorbeelden

### Basis Post Taak met Directe Materiaallijst

Dit is de aanbevolen aanpak voor API automatisering - geef materiaalpaden direct door zonder te vertrouwen op materiaalbibliotheek of mapscannen:

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

### Post Taak met Materiaalbibliotheek (TikTok)

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

### Post Taak op Gebruikersnaamlijst

Deze modus stelt u in staat om taken direct te maken voor specifieke accounts zonder hun apparaat serienummers te kennen:

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

### Post Taak met Lokale Map (Instagram)

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

### Post met Aangepast Geluid

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

### Post met Specifieke Geluids URL

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

### Post Afbeeldingen (Carrousel)

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

## Response

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

## Zie Ook

- [Task Management API](./task-management.md) - Taken maken, weergeven en beheren
