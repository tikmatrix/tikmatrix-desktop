---
sidebar_position: 1
title: Lokale API-Übersicht
description: Lokale TikMatrix-API für programmatische Aufgabenverwaltung
---

TikMatrix bietet eine lokale RESTful-API, die es ermöglicht, Aufgaben programmatisch zu verwalten. Dies ist nützlich für die Integration von TikMatrix in Ihre Automatisierungssysteme, das Erstellen benutzerdefinierter Workflows oder das Durchführen von Batch-Operationen.

## Anforderungen

:::warning Lizenzanforderung
**Die lokale API ist nur für Abonnenten der Pro-, Team- und Business-Pläne verfügbar.** Für den Starter-Plan ist kein API-Zugriff verfügbar.
:::

## Basis-URL

Die API läuft lokal unter:

```text
http://localhost:50809/api/v1/
```

:::note
Port `50809` ist der Standardport. Stellen Sie sicher, dass TikMatrix läuft, bevor Sie Anfragen senden.
:::

## Antwortformat

Alle API-Antworten haben das Format:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Antwortcodes

| Code | Beschreibung |
|------|----------|
| 0 | Erfolg |
| 40001 | Ungültige Anfrage - falsche Parameter |
| 40002 | Ungültige Anfrage - fehlender script_name |
| 40003 | Ungültige Anfrage - Skript wird nicht über API unterstützt |
| 40301 | Verboten - API-Zugriff erfordert Pro+-Plan |
| 40401 | Nicht gefunden - Ressource existiert nicht |
| 50001 | Interner Serverfehler |

## Schnellstart

### 1. API-Zugriff prüfen

Prüfen Sie zunächst, ob Ihre Lizenz API-Zugriff unterstützt:

```bash
curl http://localhost:50809/api/v1/license/check
```

Beispielantwort:

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

### 2. Aufgabe erstellen

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Schaut euch mein neues Video an! #viral"
    },
    "enable_multi_account": false
  }'
```

### 3. Aufgaben auflisten

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Verfügbare Skripte

:::info Aktuelle Unterstützung
Derzeit unterstützt die lokale API die Skripte `post`, `follow`, `unfollow`, `account_warmup` und `comment`. Unterstützung für andere Skripte wird in zukünftigen Versionen hinzugefügt.
:::

Der Parameter `script_name` kann folgende Werte annehmen:

| Skript | Beschreibung | API-Unterstützung |
|-------|----------|---------------|
| `post` | Inhalt veröffentlichen | ✅ Unterstützt |
| `follow` | Benutzer folgen | ✅ Unterstützt |
| `unfollow` | Entfolgen | ✅ Unterstützt |
| `account_warmup` | Account-Warmup | ✅ Unterstützt |
| `comment` | Kommentar hinterlassen | ✅ Unterstützt |
| `like` | Liken | 🔜 Bald |
| `message` | Nachricht senden | 🔜 Bald |
| `super_marketing` | Super-Marketing-Kampagne | 🔜 Bald |
| `profile` | Profil aktualisieren | 🔜 Bald |
| `scrape_user` | Benutzerdaten sammeln | 🔜 Bald |

## Aufgabenstatus

| Statuscode | Status | Beschreibung |
|------------|--------|----------|
| 0 | pending | Aufgabe wartet auf Ausführung |
| 1 | running | Aufgabe wird ausgeführt |
| 2 | completed | Aufgabe erfolgreich abgeschlossen |
| 3 | failed | Aufgabe mit Fehler beendet |

## Weiterführend

- [Task-Management-API](./task-management) - Erstellen, Abfragen und Verwalten von Aufgaben
- [Post-Skript-Konfiguration](./post-script) - Konfiguration der Post-Skript-Parameter
- [Follow-Skript-Konfiguration](./follow-script) - Konfiguration der Follow-Skript-Parameter
- [Unfollow-Skript-Konfiguration](./unfollow-script) - Konfiguration der Unfollow-Skript-Parameter
- [Account-Warmup-Skript-Konfiguration](./account-warmup-script) - Konfiguration der Account-Warmup-Skript-Parameter
- [Comment-Skript-Konfiguration](./comment-script) - Konfiguration der Comment-Skript-Parameter
- [API-Beispiele](./examples) - Code-Beispiele in mehreren Sprachen
