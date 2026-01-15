---
sidebar_position: 4
title: Follow-Skript-Konfiguration
description: Vollständige Referenz für die Follow-Skript-Konfiguration
---

Auf dieser Seite werden die Konfigurationsparameter für das `follow`-Skript beschrieben, das beim Erstellen von Aufgaben verwendet wird.

## Überblick

Das `follow`-Skript wird verwendet, um Benutzern auf TikTok oder Instagram automatisch zu folgen. Wenn mehrere Zielbenutzer über die API angegeben werden, **erstellt das System eine Aufgabe pro Benutzer**. Sie können die Ausführungszeit von Aufgaben mit dem Parameter `start_time` steuern.

## Skript-Konfiguration (`script_config`)

Das `script_config`-Objekt enthält Parameter für das Follow-Skript. Nachfolgend die verfügbaren Parameter:

### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|----------|-----|--------------|----------|--------------|
| target_users | string[] | Ja* | [] | Array von Zielbenutzernamen (eine Aufgabe pro Benutzer) |
| target_user | string | Ja* | "" | Ein Benutzername oder mehrere durch Zeilenumbruch/Komma getrennte Namen |
| access_method | string | Nein | "direct" | Profilzugriffsmethode: `direct` (per URL) oder `search` |

:::note
Entweder `target_users`-Array oder `target_user`-String muss angegeben werden. Wenn beide angegeben sind, hat `target_users` Priorität.
:::

:::info Aufgabenerstellung
Wenn mehrere Zielbenutzer angegeben werden, erstellt die API **eine Aufgabe für jeden**. Zum Beispiel werden bei 3 Zielbenutzern und 2 Geräten 6 Aufgaben erstellt. Verwenden Sie den Parameter `start_time` zur Steuerung der Aufgabenausführungszeit.
:::

## Beispiele

### Einem Benutzer folgen

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

### Mehreren Benutzern folgen

Beim Folgen mehrerer Benutzer wird für jeden eine separate Aufgabe erstellt:

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

Dies erstellt 3 separate Aufgaben, die sofort ausgeführt werden.

### Aufgaben zeitlich planen

Verwenden Sie `start_time`, um die Startzeit der Aufgaben zu planen:

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

### Folgen über Suche

Verwenden Sie die Suchmethode, wenn der direkte URL-Zugriff nicht funktioniert:

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

### Batch-Folgen auf mehreren Geräten

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

## Antwort

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

## Zugriffsmethoden

### Direkte Methode (`direct`)

- Öffnet Profil per URL: `tiktok.com/@username` oder `instagram.com/username`
- Schneller und zuverlässiger
- Für die meisten Fälle empfohlen

### Suchmethode (`search`)

- Geht zur Suche, gibt Benutzernamen ein, klickt auf Ergebnis
- Langsamer, funktioniert aber bei blockiertem direkten Zugriff
- Kann bei ähnlichen Namen weniger genau sein

## Best Practices

1. **Verwenden Sie start_time zur Planung**: Verwenden Sie den Parameter `start_time`, um die Ausführungszeit von Aufgaben zu planen (Format: "HH:MM").

2. **Bevorzugen Sie direkten Zugriff**: Die Methode `direct` ist schneller und zuverlässiger als `search`.

3. **Vernünftige Stapelverarbeitung**: Folgen Sie nicht zu vielen Benutzern auf einmal. Das System erstellt eine Aufgabe pro Benutzer, große Listen erzeugen also viele Aufgaben.

## Siehe auch

- [Task-Management-API](./task-management.md) - Erstellen, Abfragen und Verwalten von Aufgaben
- [Post-Skript-Konfiguration](./post-script.md) - Konfiguration der Post-Skript-Parameter
- [Unfollow-Skript-Konfiguration](./unfollow-script.md) - Konfiguration der Unfollow-Skript-Parameter
