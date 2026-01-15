---
sidebar_position: 9
---

# White-Label-Einrichtung

:::info Jahresabonnement erforderlich
Die White-Label-Funktionalität ist ausschließlich für Benutzer mit **Jahresabonnement** verfügbar. Kontaktieren Sie unseren Support über [Telegram](https://t.me/tikmatrix_agent_bot), um nach dem Kauf eines Jahresplans einen Freischaltcode zu erhalten.
:::

Die White-Label-Funktion ermöglicht es, das Branding von TikMatrix an die Unternehmensidentität Ihres Unternehmens anzupassen. Sie können den Anwendungsnamen, das Logo und Markeninformationen ändern, um eine personalisierte Version von TikMatrix zu erstellen.

## Funktionen

### Grundeinstellungen

- **Anwendungsname**: Anpassen des angezeigten Anwendungsnamens
- **Logo-Upload**: Laden Sie Ihr Hauptlogo hoch (empfohlen 128x128px)
- **Favicon**: Setzen Sie ein benutzerdefiniertes Favicon für die Anwendung

### Markeneinstellungen

- **Support-E-Mail**: E-Mail-Adresse des Kundensupports
- **Tutorial-URL**: Link zu benutzerdefinierten Schulungsmaterialien/Dokumentation
- **Telegram-URL**: Einrichten des Links zu Ihrer Telegram-Gruppe oder Ihrem Kanal

### Funktionsschalter

- **Tutorial-Link anzeigen**: Steuerung der Sichtbarkeit des Tutorial-Links
- **Markeninformationen anzeigen**: Steuerung der Anzeige von Markeninformationen

## Konfigurationsmethoden

### Methode 1: Konfiguration über die Benutzeroberfläche

1. Starten Sie die TikMatrix-Anwendung
2. Klicken Sie auf das Paletten-Symbol 🎨 im Fenstertitel
3. Konfigurieren Sie Parameter im White-Label-Einstellungsdialog:
   - **Anwendungsname**: Geben Sie Ihren Anwendungsnamen ein
   - **Hauptlogo**: Laden Sie die Logo-Datei hoch (PNG/JPG, empfohlen 128x128px)
   - **Support-E-Mail**: Geben Sie die E-Mail-Adresse des Supports ein
   - **Tutorial-URL**: Geben Sie die URL Ihrer Schulungsmaterialien ein
   - **Telegram-URL**: Geben Sie den Link zu Ihrer Gruppe/Ihrem Kanal ein
   - **Funktionsschalter**: Aktivieren/Deaktivieren Sie die Anzeige von Tutorial-Links und Markeninformationen
4. Klicken Sie auf "Speichern", um die Einstellungen anzuwenden

### Methode 2: Konfigurationsdatei

1. Kopieren Sie die Beispielkonfigurationsdatei:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Bearbeiten Sie die Konfigurationsdatei:

   ```json
   {
     "appName": "Ihr Anwendungsname",
     "logo": {
       "main": "/pfad/zu/ihrem/logo.webp",
       "favicon": "/pfad/zu/ihrem/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@ihrfirma.com",
       "tutorialUrl": "https://ihrfirma.com/docs",
       "telegramUrl": "https://t.me/ihregruppe"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Speichern Sie die Datei und starten Sie die Anwendung neu

### Methode 3: Kommandozeilen-Tool

1. Navigieren Sie zum Projektverzeichnis:

   ```bash
   cd tikmatrix-desktop
   ```

2. Führen Sie das Konfigurationstool aus:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Folgen Sie den Anweisungen zur schrittweisen Konfiguration jedes Parameters

## Erstellen einer benutzerdefinierten Version

### 1. Vorbereitung der Ressourcendateien

```bash
# Platzieren Sie Logo-Dateien an den richtigen Stellen
src/assets/ihr-logo.webp       # Hauptlogo
public/ihr-favicon.ico        # Web-Favicon
src-tauri/icons/               # Anwendungssymbole (verschiedene Größen)
```

### 2. Konfiguration der Build-Parameter

Verwenden Sie das Kommandozeilen-Tool oder bearbeiten Sie die Konfiguration manuell:

```bash
# Verwendung des Kommandozeilen-Tools
node scripts/whitelabel-config.js

# Oder manuelle Bearbeitung
src/config/whitelabel-build.json
```

### 3. Erstellen der Anwendung

```bash
# Entwicklungsmodus
npm run dev

# Produktions-Build
npm run build

# Tauri-Anwendungs-Build
npm run tauri build
```

## Konfigurationspriorität

Das System verwendet die folgende Prioritätsreihenfolge für die Konfiguration:

1. **Laufzeitkonfiguration**: `whitelabel_config` im Browser-LocalStorage
2. **Build-Konfiguration**: `src/config/whitelabel-build.json` (beim Build verwendet)
3. **Beispielkonfiguration**: `examples/whitelabel-config.json`
4. **Standardkonfiguration**: Eingebaute Standardwerte

## Logo-Anforderungen

### Hauptlogo

- **Format**: PNG, JPG oder SVG
- **Größe**: 128x128px (empfohlen)
- **Hintergrund**: Transparent (für PNG)
- **Verwendung**: Kopfzeile, Ladebildschirm, "Über"-Dialog

### Favicon

- **Format**: ICO oder PNG
- **Größe**: 32x32px oder 16x16px
- **Verwendung**: Browser-Tab, Fenstersymbol

### Anwendungssymbole (für Builds)

- **Formate**: PNG, ICO, ICNS
- **Größen**: 32x32, 128x128, 256x256, 512x512
- **Ort**: `src-tauri/icons/` Verzeichnis

## API-Integration

### JavaScript-API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Aktuelle Konfiguration abrufen
const config = getWhiteLabelConfig();

// Neue Konfiguration speichern
saveWhiteLabelConfig(newConfig);

// Auf Standardwerte zurücksetzen
resetWhiteLabelConfig();

// Konfiguration überprüfen
validateWhiteLabelConfig(config);
```

### Hilfsfunktionen

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// White-Label beim App-Start initialisieren
initWhiteLabel();

// Dokumenttitel aktualisieren
updateDocumentTitle('Ihr Anwendungsname');

// Favicon aktualisieren
updateFavicon('/pfad/zu/favicon.ico');
```

## Best Practices

### Logo-Design

- Verwenden Sie hochauflösende Bilder für klare Darstellung
- Halten Sie konsistentes Branding über alle Logo-Größen
- Testen Sie Logos auf hellem und dunklem Hintergrund
- Stellen Sie sicher, dass Logos in kleinen Größen lesbar sind

### Markenkonsistenz

- Verwenden Sie konsistente Farben und Schriftarten in der gesamten Oberfläche
- Halten Sie sich an bestehende Markenrichtlinien
- Testen Sie die angepasste Oberfläche auf verschiedenen Bildschirmgrößen
- Wahren Sie ein professionelles Erscheinungsbild

### URL-Konfiguration

- Verwenden Sie HTTPS-URLs für alle externen Links
- Testen Sie alle Links vor der Bereitstellung
- Stellen Sie sicher, dass Support-Kanäle ordnungsgemäß überwacht werden
- Halten Sie Dokumentations-URLs aktuell

## Fehlerbehebung

### Häufige Probleme

**Logo wird nicht angezeigt:**

- Überprüfen Sie Dateipfad und Berechtigungen
- Stellen Sie sicher, dass das Bildformat unterstützt wird
- Stellen Sie sicher, dass die Bildgröße angemessen ist
- Leeren Sie den Browser-Cache und starten Sie die Anwendung neu

**Konfiguration wird nicht gespeichert:**

- Überprüfen Sie Dateisystem-Berechtigungen
- Stellen Sie sicher, dass die JSON-Syntax korrekt ist
- Stellen Sie sicher, dass das Konfigurationsverzeichnis existiert
- Versuchen Sie, als Administrator auszuführen (falls erforderlich)

**Build schlägt fehl:**

- Stellen Sie sicher, dass alle Ressourcendateien existieren
- Überprüfen Sie die Syntax der Konfigurationsdatei
- Stellen Sie sicher, dass Symbol-Dateien im richtigen Format vorliegen
- Überprüfen Sie Build-Protokolle auf spezifische Fehler

### Hilfe erhalten

Wenn Sie Probleme mit der White-Label-Einrichtung haben:

1. Überprüfen Sie den Fehlerbehebungsabschnitt oben
2. Überprüfen Sie die Syntax der Konfigurationsdatei
3. Kontaktieren Sie den Support über [Telegram](https://t.me/tikmatrix_agent_bot)
4. Fügen Sie Ihre Konfigurationsdatei und Fehlermeldungen bei der Problemmeldung bei

## Lizenz und Verwendung

- White-Label-Funktionalität ist nur für Benutzer mit Jahresabonnement verfügbar
- Rechte für benutzerdefiniertes Branding sind in Ihrem Abonnement enthalten
- Vertrieb benutzerdefinierter Versionen kann zusätzliche Lizenzierung erfordern
- Kontaktieren Sie den Support für Enterprise-Lizenzierungsoptionen

---

**Benötigen Sie einen Freischaltcode?** Kontaktieren Sie unseren Support über [Telegram](https://t.me/tikmatrix_agent_bot) mit den Details Ihres Jahresabonnements.
