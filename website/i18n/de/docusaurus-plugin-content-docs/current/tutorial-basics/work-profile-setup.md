# Arbeitsprofil-Einrichtung

TikMatrix unterstützt die individuelle Konfiguration von Arbeitsprofil-Benutzern für jedes Gerät, was sehr nützlich für Unternehmensgeräte oder Dual-App-Umgebungen ist.

## Was ist ein Arbeitsprofil

Ein Arbeitsprofil ist eine Android-Funktion, die es ermöglicht, eine unabhängige Arbeitsumgebung auf einem Gerät zu erstellen. Durch Konfiguration verschiedener Benutzer-IDs können Sie:

- TikMatrix normal auf Unternehmensgeräten verwenden
- Verschiedene Benutzerkonfigurationen für unterschiedliche App-Umgebungen einrichten
- Detailliertere Geräteverwaltung und Berechtigungskontrolle erreichen

## Verwendung des Shelter-Tools zum Klonen von Apps

Vor der Konfiguration des Arbeitsprofils müssen Sie das Shelter-Tool verwenden, um TikTok- und TikMatrix-Apps zu klonen:

### Was ist Shelter

Shelter ist eine Open-Source-App, die Arbeitsprofile auf Android-Geräten erstellt und verwaltet. Sie ermöglicht das Ausführen duplizierter Apps in einer isolierten Arbeitsumgebung.

### Installation von Shelter

1. Laden Sie Shelter von [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) oder [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter) herunter
2. Installieren und öffnen Sie Shelter auf Ihrem Gerät
3. Folgen Sie dem Setup-Assistenten zum Erstellen eines Arbeitsprofils

### Klonen der erforderlichen Apps

Nach der Einrichtung von Shelter müssen Sie TikTok- und TikMatrix-Apps klonen:

1. **TikTok-App klonen**:
   - Öffnen Sie Shelter und wechseln Sie zur Registerkarte "Hauptprofil"
   - Finden Sie TikTok in der App-Liste
   - Klicken Sie auf die Schaltfläche "In Arbeitsprofil klonen"
   - Warten Sie auf den Abschluss des Klonvorgangs

2. **TikMatrix-App klonen**:
   - Finden Sie in Shelter TikMatrix in der App-Liste
   - Klicken Sie auf die Schaltfläche "In Arbeitsprofil klonen"
   - Bestätigen Sie den Klonvorgang

### Überprüfung des erfolgreichen Klonens

Nach erfolgreichem Klonen:

- Sie sehen TikTok und TikMatrix mit einem Aktentaschen-Symbol im App-Drawer
- Dies sind die Arbeitsprofil-Versionen der Apps
- Die Original-Apps bleiben im Hauptprofil unverändert

## So konfigurieren Sie das Arbeitsprofil

### 1. Geräte-Werkzeugleiste öffnen

Wenn Ihr Gerät verbunden ist und in der TikMatrix-Hauptoberfläche angezeigt wird:

1. Doppelklicken Sie auf die Gerätekarte, um in den Vollbildmodus zu gelangen
2. Rechts neben dem Gerätebildschirm erscheint eine Werkzeugleiste
3. Die Werkzeugleiste ist standardmäßig eingeklappt und erweitert sich automatisch beim Hovern

### 2. Arbeitsprofil-Schaltfläche finden

Am unteren Rand der Werkzeugleiste sehen Sie eine Schaltfläche mit einem Aktentaschen-Symbol - dies ist die Arbeitsprofil-Konfigurationsschaltfläche.

### 3. Benutzer-ID festlegen

1. Klicken Sie auf die Schaltfläche mit dem Aktentaschen-Symbol
2. Geben Sie die Benutzer-ID im Popup-Dialog ein (z. B.: 10)
3. Klicken Sie auf die Schaltfläche "Speichern"

### 4. Konfiguration bestätigen

Nach erfolgreicher Konfiguration zeigt das System die Benachrichtigung "Arbeitsprofil-Benutzereinstellungen gespeichert" an.

## Benutzer-ID-Beschreibung

### Übliche Benutzer-IDs

- **0**: Hauptbenutzer (Standardbenutzer)
- **10**: Erster Arbeitsprofil-Benutzer
- **11**: Zweiter Arbeitsprofil-Benutzer
- Zusätzliche Benutzer-IDs folgen diesem Muster

### So finden Sie die Benutzer-ID

Wenn Sie sich über die Benutzer-IDs auf Ihrem Gerät nicht sicher sind, können Sie sie finden mit:

```bash
adb shell pm list users
```

Oder führen Sie in den TikMatrix-Debug-Tools aus:

```bash
pm list users
```

Beispielausgabe:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Speicherung der Konfigurationsdatei

Die Arbeitsprofil-Einstellungen werden automatisch in der Datei `data/work_profile_user.json` im folgenden Format gespeichert:

```json
{
  "geräteseriennummer_1": "10",
  "geräteseriennummer_2": "0",
  "geräteseriennummer_3": "11"
}
```

## Verwaltung von Gerätekonfigurationen

### Aktuelle Konfiguration anzeigen

Die Arbeitsprofil-Einrichtung jedes Geräts ist unabhängig. Sie können:

1. Verschiedene Benutzer-IDs für jedes Gerät festlegen
2. Bestehende Benutzereinstellungen von Geräten jederzeit ändern
3. Einstellungen löschen (geben Sie einen leeren Wert ein und speichern Sie zum Entfernen der Einstellung)

### Massenverwaltung

Wenn Sie eine große Anzahl von Geräten verwalten müssen, können Sie die Datei `data/work_profile_user.json` direkt bearbeiten:

1. Schließen Sie die TikMatrix-Anwendung
2. Öffnen Sie die Konfigurationsdatei
3. Fügen Sie Geräteeinstellungen im JSON-Format hinzu oder ändern Sie sie
4. Starten Sie TikMatrix neu

## Fehlerbehebung

### Häufige Probleme

#### F: Befehle werden nach Arbeitsprofil-Konfiguration nicht ausgeführt

A: Bitte überprüfen Sie:

- Ist die Benutzer-ID korrekt
- Existiert der entsprechende Benutzer auf dem Gerät
- Haben Sie ausreichende Berechtigungen für den Zugriff auf diesen Benutzer

#### F: Wie mache ich die Arbeitsprofil-Konfiguration rückgängig

A: Leeren Sie das Benutzer-ID-Eingabefeld im Konfigurationsdialog und klicken Sie auf Speichern.

#### F: Was tun, wenn Einstellungen verloren gehen

A: Die Einstellungen werden in einer lokalen JSON-Datei gespeichert. Wenn sie verloren gehen, können Sie neu konfigurieren oder die Datei `data/work_profile_user.json` aus einem Backup wiederherstellen.

#### F: Probleme im Zusammenhang mit Shelter

A: Wenn Sie auf Shelter-Probleme stoßen:

- **Klonen schlägt fehl**: Stellen Sie sicher, dass Sie Administratorrechte haben und ausreichend Speicherplatz
- **Geklonte Apps nicht sichtbar**: Überprüfen Sie, ob das Arbeitsprofil in Shelter ordnungsgemäß aktiviert ist
- **Apps stürzen im Arbeitsprofil ab**: Versuchen Sie, Apps erneut zu klonen oder Shelter zu aktualisieren
- **Kann geklonte Apps nicht finden**: Suchen Sie nach Apps mit Aktentaschen-Symbolen im App-Drawer

## Best Practices

### Unternehmensumgebung

1. **Einheitliche Verwaltung**: Legen Sie dieselbe Benutzer-ID für alle Unternehmensgeräte fest
2. **Berechtigungstrennung**: Verwenden Sie verschiedene Benutzer-IDs zur Unterscheidung von Berechtigungsstufen
3. **Einstellungs-Backup**: Erstellen Sie regelmäßig Backups der Datei `work_profile_user.json`

### Persönliche Nutzung

1. **App-Isolation**: Richten Sie verschiedene Benutzerumgebungen für verschiedene Zwecke ein
2. **Testumgebung**: Verwenden Sie unabhängige Benutzer-IDs zum Testen von Apps
3. **Datenschutz**: Erhöhen Sie die Datenschutzsicherheit durch Benutzertrennung

### Verwaltung des Shelter-Tools

1. **Regelmäßige Updates**: Halten Sie die Shelter-App aktuell, um Kompatibilität zu gewährleisten
2. **App-Synchronisation**: Stellen Sie sicher, dass TikTok und TikMatrix vor der Arbeitsprofil-Konfiguration geklont sind
3. **Backup von Shelter-Einstellungen**: Exportieren und sichern Sie Shelter-Konfigurationen für einfache Wiederherstellung
4. **App-Update-Überwachung**: Beim Aktualisieren von TikTok oder TikMatrix müssen möglicherweise geklonte Versionen aktualisiert werden

## Technische Details

Die Arbeitsprofil-Funktion wird durch Hinzufügen des Parameters `--user` zu ADB-Befehlen implementiert:

```bash
# Ohne Arbeitsprofil
adb shell input tap 100 200

# Mit Arbeitsprofil (Benutzer-ID: 10)
adb shell --user 10 input tap 100 200
```

Dies stellt sicher, dass Befehle in der richtigen Benutzerumgebung ausgeführt werden, wodurch Berechtigungsprobleme und Umgebungskonflikte vermieden werden.

---

Durch ordnungsgemäße Konfiguration des Arbeitsprofils können Sie TikMatrix reibungslos in verschiedenen komplexen Geräteumgebungen verwenden und die Arbeitseffizienz und Verwaltungskomfort verbessern.
