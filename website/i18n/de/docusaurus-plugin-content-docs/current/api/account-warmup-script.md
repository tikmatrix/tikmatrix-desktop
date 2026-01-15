---
sidebar_position: 6
title: Konfiguration des Account-Warmup-Skripts
description: Vollständige Referenz für die Konfiguration des Account-Warmup-Skripts
---

Auf dieser Seite werden die Konfigurationsparameter für das `account_warmup`-Skript dokumentiert, das beim Erstellen von Aufgaben verwendet wird.

## Überblick

Das `account_warmup`-Skript wird verwendet, um TikTok- oder Instagram-Konten durch Simulation natürlichen Nutzerverhaltens aufzuwärmen. Es schaut Videos an, liked, folgt, speichert Favoriten und kommentiert zufällig basierend auf konfigurierten Wahrscheinlichkeiten. Dies hilft neuen Konten, eine Interaktionshistorie aufzubauen und Bot-Erkennung zu vermeiden.

## Skript-Konfiguration (`script_config`)

Das `script_config`-Objekt enthält Parameter für das Warmup-Skript. Nachfolgend die verfügbaren Parameter:

### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|----------|-----|--------------|----------|--------------|
| task_duration | number | Nein | 600 | Gesamtdauer der Warmup-Aufgabe in Sekunden |
| topic | string | Nein | "" | Suchbegriffe (einer pro Zeile, wird zufällig ausgewählt) |
| min_duration | number | Nein | 15 | Minimale Videowiedergabedauer in Sekunden |
| max_duration | number | Nein | 30 | Maximale Videowiedergabedauer in Sekunden |
| like_probable | number | Nein | 0 | Wahrscheinlichkeit (0-100) ein Video zu liken |
| floow_probable | number | Nein | 0 | Wahrscheinlichkeit (0-100) dem Video-Ersteller zu folgen |
| collect_probable | number | Nein | 0 | Wahrscheinlichkeit (0-100) das Video zu favorisieren |
| comment_probable | number | Nein | 0 | Wahrscheinlichkeit (0-100) das Video zu kommentieren |
| comment | string | Nein | "" | Kommentarvorlagen (eine pro Zeile, wird zufällig ausgewählt) |
| insert_emoji | boolean | Nein | false | Ob zufällige Emojis in Kommentare eingefügt werden sollen |
| comment_order | string | Nein | "random" | Reihenfolge der Kommentarauswahl: `random` (zufällig) oder `sequential` (sequenziell) |
| generate_by_chatgpt | boolean | Nein | false | Ob Kommentare mit ChatGPT generiert werden sollen |
| chatgpt_settings | object | Nein | {} | ChatGPT-Konfigurationseinstellungen (siehe unten) |

### ChatGPT-Einstellungsstruktur

Wenn `generate_by_chatgpt` auf `true` gesetzt ist, können Sie die ChatGPT-Kommentargenerierung mit dem `chatgpt_settings`-Objekt konfigurieren:

| Parameter | Typ | Erforderlich | Beschreibung |
|----------|-----|--------------|--------------|
| api_key | string | Ja | Ihr OpenAI API-Schlüssel |
| model | string | Nein | Zu verwendendes Modell (Standard: "gpt-3.5-turbo"). Optionen: "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Nein | Benutzerdefinierter Prompt zur Kommentargenerierung. Standardmäßig werden freundliche, relevante Kommentare generiert |
| max_tokens | number | Nein | Maximale Anzahl von Tokens in der Antwort (Standard: 100) |
| temperature | number | Nein | Kreativitätslevel 0-2 (Standard: 0.7). Höhere Werte = kreativer |
| base_url | string | Nein | Benutzerdefinierte API-Endpunkt-URL (für Azure OpenAI oder kompatible APIs) |

Beispiel für ein `chatgpt_settings`-Objekt:

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "Generiere einen kurzen, freundlichen Kommentar zu diesem Video auf Deutsch",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Empfehlung
Für neue Konten beginnen Sie mit niedrigen Interaktionswahrscheinlichkeiten (5-15%) und erhöhen Sie diese schrittweise im Laufe der Zeit. Dies imitiert natürliches Nutzerverhalten.
:::

## Beispiele

### Basis-Account-Warmup

Einfaches Warmup nur mit Videowiedergabe:

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

### Warmup mit Themensuche

Account-Warmup durch Suche nach bestimmten Themen:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "lustige Katzen\nHundevideos\nHaustiercompilationen",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Warmup mit Interaktionen

Vollständiges Warmup mit Likes, Follows und Kommentaren:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "Kochen\nRezepte\nEssen",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "Das ist fantastisch! 🔥\nLiebe diesen Content!\nSo gut! 👏\nWow, unglaublich!",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Warmup mit ChatGPT-Kommentaren

Generierung intelligenter Kommentare mit ChatGPT:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "Tech-Reviews\nGadgets",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "Generiere einen kurzen, freundlichen Kommentar zu diesem Video"
      }
    }
  }'
```

### Batch-Warmup auf mehreren Geräten

Warmup auf mehreren Geräten gleichzeitig ausführen:

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

### Geplante Warmup-Aufgabe

Warmup für eine bestimmte Zeit planen:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "Musik\nTänze\nTrends",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Warmup nach Benutzernamen-Liste

Warmup-Aufgaben für bestimmte Konten erstellen:

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

## Best Practices

1. **Beginnen Sie mit niedrigen Wahrscheinlichkeiten**: Verwenden Sie für neue Konten niedrige Interaktionswahrscheinlichkeiten (5-15%) und erhöhen Sie diese schrittweise über Tage/Wochen.

2. **Verwenden Sie relevante Themen**: Wählen Sie Themen, die zur Nische Ihres Kontos passen, um eine relevante Interaktionshistorie aufzubauen.

3. **Variieren Sie die Wiedergabedauer**: Setzen Sie einen Bereich zwischen min_duration und max_duration, um natürliche Wiedergabemuster zu simulieren.

4. **Moderate Aufgabendauer**: Führen Sie Warmup-Sitzungen von 10-30 Minuten durch, 2-3 Mal täglich, anstatt kontinuierlicher langer Sitzungen.

5. **Verwenden Sie vielfältige Kommentare**: Stellen Sie mehrere Kommentarvorlagen bereit, um sich wiederholende Muster zu vermeiden, die Spam-Erkennung auslösen könnten.

6. **Planen Sie sinnvoll**: Verwenden Sie `start_time`, um Warmup-Aufgaben während der aktiven Stunden in der Zeitzone Ihrer Zielgruppe zu starten.

## Siehe auch

- [Task-Management-API](./task-management.md) - Erstellen, Anzeigen und Verwalten von Aufgaben
- [Post-Skript-Konfiguration](./post-script.md) - Konfiguration der Post-Skript-Parameter
- [Follow-Skript-Konfiguration](./follow-script.md) - Konfiguration der Follow-Skript-Parameter
- [Unfollow-Skript-Konfiguration](./unfollow-script.md) - Konfiguration der Unfollow-Skript-Parameter
