---
sidebar_position: 9
---

# White Label-konfiguration

:::info Årsprenumeration krävs
White Label-funktionalitet är endast tillgänglig för användare med **årsprenumeration**. Kontakta vårt supportteam via [Telegram](https://t.me/tikmatrix_agent_bot) för att få din upplåsningskod efter att du köpt en årsplan.
:::

White Label-funktionen låter dig anpassa TikMatrix:s varumärke för att matcha din företagsidentitet. Du kan ändra appnamnet, logotypen och varumärkesinformationen för att skapa en personlig version av TikMatrix.

## Funktioner

### Grundinställningar

- **App Name**: Anpassa applikationens visningsnamn
- **Logo Upload**: Ladda upp din anpassade huvudlogotyp (rekommenderat 128x128px)
- **Favicon**: Ställ in anpassad favicon för applikationen

### Varumärkesinställningar

- **Support Email**: E-postadress för kundsupport
- **Tutorial URL**: Anpassad handlednings-/dokumentationslänk
- **Telegram URL**: Ställ in din Telegram-grupp eller kanallänk

### Funktionsväxlare

- **Show Tutorial Link**: Styr synlighet för handledningslänk
- **Show Brand Info**: Styr visning av varumärkesinformation

## Konfigurationsmetoder

### Metod 1: UI-konfiguration

1. Starta TikMatrix-applikationen
2. Klicka på palettikonen 🎨 i titelraden
3. Konfigurera parametrar i dialogen White Label Settings:
   - **App Name**: Ange ditt anpassade applikationsnamn
   - **Main Logo**: Ladda upp din logotypfil (PNG/JPG, 128x128px rekommenderat)
   - **Support Email**: Ange din support-e-postadress
   - **Tutorial URL**: Ange din anpassade handlednings-URL
   - **Telegram URL**: Ange din Telegram-grupp/kanal-URL
   - **Feature Toggles**: Aktivera/inaktivera handledningslänkar och visning av varumärkesinformation
4. Klicka på "Save" för att tillämpa inställningarna

### Metod 2: Konfigurationsfil

1. Kopiera exempelkonfigurationsfilen:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Redigera konfigurationsfilen:

   ```json
   {
     "appName": "Your App Name",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Spara filen och starta om applikationen

### Metod 3: Kommandoradsverktyg

1. Navigera till projektkatalogen:

   ```bash
   cd tikmatrix-desktop
   ```

2. Kör konfigurationsverktyget:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Följ anvisningarna för att konfigurera varje parameter steg för steg

## Bygga anpassad version

### 1. Förbered resursfiler

```bash
# Placera dina logotypfiler på rätt platser
src/assets/your-logo.webp       # Huvudlogotyp
public/your-favicon.ico        # Webb-favicon
src-tauri/icons/               # Applikationsikoner (olika storlekar)
```

### 2. Konfigurera byggparametrar

Använd kommandoradsverktyget eller redigera konfigurationen manuellt:

```bash
# Använd kommandoradsverktyget
node scripts/whitelabel-config.js

# Eller redigera manuellt
src/config/whitelabel-build.json
```

### 3. Bygg applikationen

```bash
# Utvecklingsläge
npm run dev

# Produktionsbygge
npm run build

# Bygg Tauri-applikation
npm run tauri build
```

## Konfigurationsprioritet

Systemet använder följande prioritetsordning för konfiguration:

1. **Runtime Config**: Browser LocalStorage `whitelabel_config`
2. **Build Config**: `src/config/whitelabel-build.json` (används under bygge)
3. **Example Config**: `examples/whitelabel-config.json`
4. **Default Config**: Inbyggda standardvärden

## Logotypkrav

### Huvudlogotyp

- **Format**: PNG, JPG eller SVG
- **Storlek**: 128x128px (rekommenderat)
- **Bakgrund**: Transparent (för PNG)
- **Användning**: Sidhuvud, startskärm, om-dialog

### Favicon

- **Format**: ICO eller PNG
- **Storlek**: 32x32px eller 16x16px
- **Användning**: Webbläsarflik, fönsterikon

### Applikationsikoner (för byggen)

- **Format**: PNG, ICO, ICNS
- **Storlekar**: 32x32, 128x128, 256x256, 512x512
- **Plats**: `src-tauri/icons/`-katalog

## API-integration

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Get current configuration
const config = getWhiteLabelConfig();

// Save new configuration
saveWhiteLabelConfig(newConfig);

// Reset to defaults
resetWhiteLabelConfig();

// Validate configuration
validateWhiteLabelConfig(config);
```

### Verktygsfunktioner

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Initialize white label on app start
initWhiteLabel();

// Update document title
updateDocumentTitle('Your App Name');

// Update favicon
updateFavicon('/path/to/favicon.ico');
```

## Bästa praxis

### Logotypdesign

- Använd högupplösta bilder för skarp visning
- Behåll konsekvent varumärke över alla logotypstorlekar
- Testa logotyper på både ljusa och mörka bakgrunder
- Se till att logotyper är läsbara i små storlekar

### Varumärkeskonsistens

- Använd konsekventa färger och typsnitt genomgående
- Anpassa till dina befintliga varumärkesriktlinjer
- Testa det anpassade gränssnittet på olika skärmstorlekar
- Bibehåll professionellt utseende

### URL-konfiguration

- Använd HTTPS-URL:er för alla externa länkar
- Testa alla länkar före distribution
- Se till att supportkanaler övervakas ordentligt
- Håll dokumentations-URL:er uppdaterade

## Felsökning

### Vanliga problem

**Logotypen visas inte:**

- Kontrollera filsökväg och behörigheter
- Verifiera att bildformatet stöds
- Se till att bildstorleken är lämplig
- Rensa webbläsarcachen och starta om appen

**Konfigurationen sparas inte:**

- Kontrollera filsystembehörigheter
- Verifiera att JSON-syntaxen är korrekt
- Se till att konfigurationskatalogen finns
- Försök köra som administratör (om det behövs)

**Bygget misslyckas:**

- Verifiera att alla resursfiler finns
- Kontrollera konfigurationsfilens syntax
- Se till att ikonfiler är i korrekt format
- Granska byggloggar för specifika fel

### Få hjälp

Om du stöter på problem med White Label-konfiguration:

1. Kontrollera felsökningssektionen ovan
2. Granska konfigurationsfilens syntax
3. Kontakta support via [Telegram](https://t.me/tikmatrix_agent_bot)
4. Inkludera din konfigurationsfil och felmeddelanden när du rapporterar problem

## Licens och användning

- White Label-funktionalitet är endast tillgänglig för användare med årsprenumeration
- Anpassade varumärkesrättigheter ingår i din prenumeration
- Omdistribution av anpassade versioner kan kräva ytterligare licensiering
- Kontakta support för företagslicensalternativ

---

**Behöver du upplåsningskoden?** Kontakta vårt supportteam via [Telegram](https://t.me/tikmatrix_agent_bot) med dina årsprenumerationsdetaljer.
