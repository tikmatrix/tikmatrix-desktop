---
sidebar_position: 5
title: Comment-Skript-Konfiguration
description: Vollständige Referenz für die Comment-Skript-Konfiguration
---

Auf dieser Seite werden die Konfigurationsparameter für das `comment`-Skript beschrieben, das beim Erstellen von Aufgaben verwendet wird.

## Überblick

Das `comment`-Skript wird verwendet, um automatisch Kommentare zu TikTok- oder Instagram-Posts zu veröffentlichen. Wenn mehrere Ziel-Post-URLs über die API angegeben werden, **wird für jede URL eine separate Aufgabe erstellt**. Sie können die Ausführungszeit jeder Aufgabe mit dem Parameter `start_time` steuern.

## Skript-Konfiguration (`script_config`)

Das `script_config`-Objekt enthält Parameter für das Comment-Skript. Nachfolgend die verfügbaren Parameter:

### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Ja* | [] | Array von Ziel-Post-URLs zum Kommentieren (eine Aufgabe pro URL) |
| target_post_url | string | Ja* | "" | Eine Ziel-Post-URL oder mehrere durch Zeilenumbruch/Komma getrennte URLs |
| comment_content | string | Ja | "" | Kommentartext. Kann mehrere durch Zeilenumbrüche getrennte Kommentare enthalten |
| comment_order | string | Nein | "random" | Wie Kommentare ausgewählt werden: `random` (zufällig) oder `sequential` (sequenziell) |
| insert_emoji | boolean | Nein | false | Ob zufällige Emojis in Kommentare eingefügt werden sollen |
| comment_image_path | string | Nein | "" | Pfad zur Bilddatei für Bild-Kommentar (nur TikTok). Unterstützt absoluten Pfad oder relativen Pfad zu work_dir/upload/ |

:::note
Entweder `target_post_urls`-Array oder `target_post_url`-String muss angegeben werden. Wenn beide angegeben sind, hat `target_post_urls` Priorität.
:::

:::tip Bild-Kommentar (nur TikTok)
Der Parameter `comment_image_path` ermöglicht es, ein Bild an Ihren Kommentar anzuhängen. Diese Funktion wird **nur in TikTok unterstützt** – Instagram-Kommentare unterstützen keine Bildanhänge. Das Bild wird auf das Gerät hochgeladen und als erstes Bild in der Galerie ausgewählt.
:::

:::info Aufgabenerstellung
Wenn mehrere Ziel-Post-URLs angegeben werden, erstellt die API **eine Aufgabe pro Ziel-URL**. Zum Beispiel werden bei 3 Post-URLs und 2 Geräten 6 Aufgaben erstellt. Verwenden Sie den Parameter `start_time` zur Steuerung der Aufgabenstartzeit.
:::

## Beispiele

### Einen Post kommentieren

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Toller Content! 🔥"
    }
  }'
```

### Kommentar mit mehreren Varianten

Geben Sie mehrere durch Zeilenumbrüche getrennte Kommentare an. Das System wählt einen basierend auf `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Tolles Video!\nLiebe diesen Content!\nWeiter so! 👏\nDas ist super!",
      "comment_order": "random"
    }
  }'
```

### Mehrere Posts kommentieren

Beim Kommentieren mehrerer Posts wird für jeden Post eine Aufgabe erstellt:

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
      "comment_content": "Tolles Video!\nCool!\nGefällt mir!",
      "comment_order": "sequential"
    }
  }'
```

Dies erstellt 3 separate Aufgaben, die sofort ausgeführt werden.

### Geplante Kommentare

Verwenden Sie `start_time`, um die Startzeit der Aufgaben zu planen:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Geplanter Kommentar!"
    },
    "start_time": "14:30"
  }'
```

### Kommentar mit Emoji-Einfügung

Aktivieren Sie die automatische Emoji-Einfügung, um Kommentare ansprechender zu gestalten:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Das ist fantastisch",
      "insert_emoji": true
    }
  }'
```

### Kommentar nach Benutzernamen-Liste

Erstellen Sie Kommentar-Aufgaben direkt für bestimmte Konten:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Tolles Video!"
    }
  }'
```

### Massenkommentare auf mehreren Geräten

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Toller Content!\nFantastische Arbeit!\nLiebe es!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram-Kommentar-Beispiel

Dieselbe API funktioniert für Instagram-Posts:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Schönes Foto! 📸",
      "insert_emoji": true
    }
  }'
```

### TikTok-Bild-Kommentar-Beispiel

Hängen Sie ein Bild an Ihren TikTok-Kommentar an (nicht unterstützt in Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Schau dir dieses Bild an!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Bildpfad
`comment_image_path` kann sein:

- **Absoluter Pfad**: `C:/images/my_image.jpg` oder `/home/user/images/my_image.jpg`
- **Relativer Pfad**: `my_image.jpg` (relativ zu `work_dir/upload/`)

:::

## Antwort

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

## Kommentarreihenfolge

### Zufällige Reihenfolge (`random`)

- Wählt zufällig einen Kommentar aus der bereitgestellten Liste
- Geeignet, um Kommentare natürlicher erscheinen zu lassen
- Standardverhalten

### Sequenzielle Reihenfolge (`sequential`)

- Wählt Kommentare der Reihe nach basierend auf `job_count`
- Erste Aufgabe verwendet ersten Kommentar, zweite Aufgabe zweiten Kommentar usw.
- Kehrt zum Anfang zurück, wenn Ende der Liste erreicht
- Geeignet zur Verteilung unterschiedlicher Kommentare über mehrere Aufgaben

## Post-URL-Formate

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

## Best Practices

1. **Variieren Sie Kommentare**: Stellen Sie mehrere Kommentarvarianten bereit, um Spam-Eindruck zu vermeiden.

2. **Verwenden Sie sequenzielle Reihenfolge für Vielfalt**: Beim Kommentieren mehrerer Posts von einem Gerät verwenden Sie `sequential` Reihenfolge zur Verteilung unterschiedlicher Kommentare.

3. **Aktivieren Sie Emoji-Einfügung**: Setzen Sie `insert_emoji: true`, damit Kommentare natürlicher und ansprechender wirken.

4. **Planen Sie Aufgaben**: Verwenden Sie den Parameter `start_time`, um Kommentare zeitlich zu verteilen und die Wahrscheinlichkeit von Rate-Limits zu reduzieren.

5. **Beachten Sie Plattform-Limits**: Erstellen Sie nicht zu viele Kommentar-Aufgaben gleichzeitig. Die meisten Plattformen haben Limits für Kommentarhäufigkeit.

## Fehlercodes

| Code | Beschreibung |
|------|-------------|
| 40001 | Fehlende Ziel-Post-URL oder Kommentarinhalt |
| 40003 | Skript wird nicht über API unterstützt |
| 40301 | API-Zugriff erfordert Pro+-Plan |

## Siehe auch

- [Task-Management-API](./task-management.md) - Erstellen, Anzeigen und Verwalten von Aufgaben
- [Post-Skript-Konfiguration](./post-script.md) - Konfiguration der Post-Skript-Parameter
- [Follow-Skript-Konfiguration](./follow-script.md) - Konfiguration der Follow-Skript-Parameter
- [Lokale API-Übersicht](./local-api.md) - API-Übersicht und Schnellstart
