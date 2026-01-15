---
sidebar_position: 3
title: Post-Skript-Konfiguration
description: Vollständige Dokumentation der Post-Skript-Konfigurationsparameter
---

Auf dieser Seite werden die Konfigurationsparameter für das `post`-Skript beschrieben, das beim Erstellen von Aufgaben verwendet wird.

## Überblick

Das `post`-Skript wird verwendet, um automatisch Inhalte (Videos oder Bilder) auf TikTok oder Instagram zu veröffentlichen. Es unterstützt verschiedene Veröffentlichungsmethoden, Materialquellen und Audio-Optionen.

## Skript-Konfiguration (`script_config`)

Das `script_config`-Objekt enthält Parameter für das Post-Skript. Nachfolgend die verfügbaren Parameter:

### Allgemeine Parameter (TikTok und Instagram)

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|---------|-----|-----------|-------------|---------|
| content_type | integer | Nein | 0 | Inhaltstyp: `0` = Video, `1` = Bilder |
| image_count | integer | Nein | 1 | Anzahl der auszuwählenden Bilder (wenn content_type = 1) |
| captions | string | Nein | "" | Untertiteltext für den Beitrag. Unterstützt Spintax: `{Option1\|Option2\|Option3}` |
| post_way | string | Nein | "share" | Veröffentlichungsmethode: `share`, `addButton` oder `useSound` |
| material_source | string | Nein | "materialLibrary" | Materialquelle: `materialLibrary` (Bibliothek) oder `localFolder` (lokaler Ordner), wird ignoriert wenn material_list angegeben |
| material_path | string | Bedingt | "" | Pfad zum lokalen Ordner (erforderlich, wenn material_source = "localFolder") |
| material_list | string[] | Nein | [] | **Array direkter Dateipfade zu Materialien.** Wenn dieser Parameter angegeben ist, werden material_source und material_path-Logik ignoriert. Ideal für API-Automatisierung. |
| materials_tags | string | Nein | "" | Kommagetrennte Material-Tags zum Filtern aus der Bibliothek |
| upload_wait_time | integer | Nein | 30 | Upload-Wartezeit in Sekunden |
| sound_wait_time | integer | Nein | 10 | Audio-Lade-Wartezeit in Sekunden |
| add_sound | string/integer | Nein | "-1" | Audio-Optionen: `-1` = Standard, `0` = deaktiviert, `1` = aktiviert, `custom` = benutzerdefiniertes Audio verwenden |
| sound_name | string | Bedingt | "" | Audio-Name/URL (erforderlich, wenn post_way = "useSound") |
| custom_sound_keyword | string | Bedingt | "" | Suchbegriff für benutzerdefiniertes Audio (erforderlich, wenn add_sound = "custom") |
| origin_sound_volume | integer | Nein | 50 | Lautstärke des Originaltons (0-100) |
| add_sound_volume | integer | Nein | 50 | Lautstärke des hinzugefügten Tons (0-100) |

### Nur TikTok-Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|---------|-----|-----------|-------------|---------|
| add_product_link | integer | Nein | 0 | Produktlink hinzufügen: `0` = nein, `1` = ja |

### Nur Instagram-Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|---------|-----|-----------|-------------|---------|
| placement | string | Nein | "reel" | Veröffentlichungsplatzierung: `reel` oder `story` |

## Beispiele

### Basis-Post-Aufgabe mit direkter Materialliste

Dies ist der empfohlene Ansatz für API-Automatisierung - Materialpfade direkt übergeben ohne Verwendung der Bibliothek oder Ordner-Scanning:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Schaut euch mein neues Video an! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Post mit Materialbibliothek (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Schaut euch mein neues Video an! #trending #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Aufgabe nach Benutzernamen-Liste erstellen

Dieser Modus ermöglicht es, Aufgaben direkt für bestimmte Konten zu erstellen, ohne deren Geräteseriennummern zu kennen:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Schaut euch mein neues Video an! #trending #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Post aus lokalem Ordner (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Toller Content! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Post mit benutzerdefiniertem Audio

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Tanze zu diesem Track!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending music 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Post mit spezifischer Audio-URL

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Verwende diesen coolen Sound!",
      "material_source": "materialLibrary"
    }
  }'
```

### Bild-Post (Karussell)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Schaut euch diese Fotos an! #carousel",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Antwort

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

## Siehe auch

- [Task-Management-API](./task-management.md) - Erstellen, Anzeigen und Verwalten von Aufgaben
