---
sidebar_position: 2
title: Task-Management-API
description: Vollständige Dokumentation der Task-Management-Endpunkte
---

Auf dieser Seite werden alle verfügbaren API-Endpunkte für die Verwaltung von Aufgaben in TikMatrix beschrieben.

## Aufgabe erstellen

Erstellen Sie eine neue Aufgabe für ein oder mehrere Geräte oder Benutzernamen.

- **Endpunkt:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Request-Parameter

Die API unterstützt zwei Modi zur Aufgabenerstellung:

**Modus 1: Nach Geräten** - verwenden Sie `serials` zur Erstellung von Aufgaben für Geräte
**Modus 2: Nach Benutzernamen** - verwenden Sie `usernames` zur direkten Erstellung von Aufgaben für bestimmte Konten

| Parameter | Typ | Erforderlich | Beschreibung |
|---------|-----|-----------|---------|
| serials | string[] | Bedingt | Array von Geräteseriennummern (erforderlich, wenn `usernames` nicht angegeben) |
| usernames | string[] | Bedingt | Array von Benutzernamen (erforderlich, wenn `serials` nicht angegeben). Wenn angegeben, werden Aufgaben direkt für diese Konten erstellt. |
| script_name | string | Ja | Name des auszuführenden Skripts |
| script_config | object | Ja | Skript-Konfigurationsparameter (siehe spezifische Skript-Dokumentation) |
| enable_multi_account | boolean | Nein | Multi-Account-Modus aktivieren (Standard: false). Gilt nur im Gerätemodus. |
| start_time | string | Nein | Geplante Ausführungszeit, Format "HH:MM" |

### Unterstützte Skripte

| Skriptname | Beschreibung | Dokumentation |
|-----------------|---------|--------------|
| post | Video oder Bilder auf TikTok/Instagram veröffentlichen | [Post-Skript-Konfiguration](./post-script.md) |

### Beispiel

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Schaut euch mein neues Video an! #trending #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Detaillierte `script_config`-Parameter und zusätzliche Beispiele finden Sie im Abschnitt [Post-Skript-Konfiguration](./post-script.md).

### Antwort

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

## Aufgaben auflisten

Aufgaben mit optionalen Filtern abfragen.

- **Endpunkt:** `GET /api/v1/task`

| Parameter | Typ | Erforderlich | Beschreibung |
|---------|-----|-----------|---------|
| status | integer | Nein | Nach Status filtern (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | Nein | Nach Geräteseriennummer filtern |
| script_name | string | Nein | Nach Skriptname filtern |
| source | string | Nein | Nach Quelle filtern ("ui" oder "api") |
| page | integer | Nein | Seitennummer (Standard: 1) |
| page_size | integer | Nein | Einträge pro Seite (Standard: 20, max: 100) |

## Aufgabendetails

Detaillierte Informationen über eine bestimmte Aufgabe abrufen.

- **Endpunkt:** `GET /api/v1/task/{task_id}`

## Aufgabe löschen

Löscht eine Aufgabe. Wenn die Aufgabe ausgeführt wird, wird zuerst versucht, sie zu stoppen.

- **Endpunkt:** `DELETE /api/v1/task/{task_id}`

## Mehrere Aufgaben löschen

Löscht mehrere Aufgaben gleichzeitig. Laufende Aufgaben werden vor dem Löschen gestoppt.

- **Endpunkt:** `DELETE /api/v1/task/batch`
- **Request-Body:** `{ "task_ids": [1, 2, 3] }`

## Aufgabe stoppen

Stoppt eine laufende Aufgabe.

- **Endpunkt:** `POST /api/v1/task/{task_id}/stop`

## Fehlgeschlagene Aufgaben wiederholen

Eine einzelne fehlgeschlagene Aufgabe erneut ausführen.

- **Endpunkt:** `POST /api/v1/task/{task_id}/retry`

## Alle fehlgeschlagenen Aufgaben wiederholen

Alle Aufgaben im Status "failed" erneut ausführen.

- **Endpunkt:** `POST /api/v1/task/retry-all`

## Aufgabenstatistiken

Statistiken über alle Aufgaben abrufen.

- **Endpunkt:** `GET /api/v1/task/stats`
- **Antwort:** Gibt Anzahl von total, pending, running, completed und failed zurück.

## Lizenzprüfung für API

Prüfen, ob die Lizenz API-Zugriff unterstützt.

- **Endpunkt:** `GET /api/v1/license/check`
- **Hinweis:** Der Starter-Plan gibt Fehlercode 40301 zurück. Zugriff ist für Pro, Team und Business gewährt.
