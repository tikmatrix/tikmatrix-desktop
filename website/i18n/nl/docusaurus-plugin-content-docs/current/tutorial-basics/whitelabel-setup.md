---
sidebar_position: 9
---

# White Label Setup

:::info Jaarabonnement Vereist
White Label-functionaliteit is exclusief beschikbaar voor gebruikers met een **Jaarabonnement**. Neem contact op met ons supportteam via [Telegram](https://t.me/tikmatrix_agent_bot) om je ontgrendelingscode te verkrijgen na aankoop van een jaarplan.
:::

De White Label-functie stelt je in staat om de branding van TikMatrix aan te passen aan je bedrijfsidentiteit. Je kunt de app-naam, het logo en de merkinformatie wijzigen om een gepersonaliseerde versie van TikMatrix te creëren.

## Functies

### Basisinstellingen

- **App-naam**: Pas de weergavenaam van de applicatie aan
- **Logo Upload**: Upload je aangepaste hoofdlogo (aanbevolen 128x128px)
- **Favicon**: Stel aangepaste favicon in voor de applicatie

### Merkinstellingen

- **Support E-mail**: E-mailadres voor klantenondersteuning
- **Tutorial URL**: Aangepaste tutorial/documentatie link
- **Telegram URL**: Stel je Telegram groep of kanaal link in

### Functie Schakelaars

- **Toon Tutorial Link**: Beheer zichtbaarheid van tutorial link
- **Toon Merkinfo**: Beheer weergave van merkinformatie

## Setup Methoden

### Methode 1: UI Configuratie

1. Start de TikMatrix applicatie
2. Klik op het palet pictogram 🎨 in de titelbalk
3. Configureer parameters in het White Label Instellingen dialoogvenster:
   - **App-naam**: Voer je aangepaste applicatienaam in
   - **Hoofdlogo**: Upload je logobestand (PNG/JPG, 128x128px aanbevolen)
   - **Support E-mail**: Voer je support e-mailadres in
   - **Tutorial URL**: Voer je aangepaste tutorial URL in
   - **Telegram URL**: Voer je Telegram groep/kanaal URL in
   - **Functie Schakelaars**: Tutorial links en merkinfo weergave in-/uitschakelen
4. Klik op "Opslaan" om instellingen toe te passen

### Methode 2: Configuratiebestand

1. Kopieer het voorbeeldconfiguratiebestand:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Bewerk het configuratiebestand:

   ```json
   {
     "appName": "Je App Naam",
     "logo": {
       "main": "/pad/naar/je/logo.webp",
       "favicon": "/pad/naar/je/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@jouwbedrijf.com",
       "tutorialUrl": "https://jouwbedrijf.com/docs",
       "telegramUrl": "https://t.me/jouwgroep"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Sla het bestand op en herstart de applicatie

### Methode 3: Commandoregel Tool

1. Navigeer naar de projectmap:

   ```bash
   cd tikmatrix-desktop
   ```

2. Voer de configuratietool uit:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Volg de prompts om elke parameter stap voor stap te configureren

## Aangepaste Versie Bouwen

### 1. Bronbestanden Voorbereiden

```bash
# Plaats je logobestanden op de juiste locaties
src/assets/jouw-logo.webp       # Hoofdlogo
public/jouw-favicon.ico        # Web favicon
src-tauri/icons/               # Applicatie iconen (verschillende groottes)
```

### 2. Build Parameters Configureren

Gebruik de commandoregel tool of bewerk handmatig de configuratie:

```bash
# Commandoregel tool gebruiken
node scripts/whitelabel-config.js

# Of handmatig bewerken
src/config/whitelabel-build.json
```

### 3. Applicatie Bouwen

```bash
# Ontwikkelmodus
npm run dev

# Productie build
npm run build

# Tauri applicatie bouwen
npm run tauri build
```

## Configuratie Prioriteit

Het systeem gebruikt de volgende prioriteitsvolgorde voor configuratie:

1. **Runtime Config**: Browser LocalStorage `whitelabel_config`
2. **Build Config**: `src/config/whitelabel-build.json` (gebruikt tijdens build)
3. **Voorbeeld Config**: `examples/whitelabel-config.json`
4. **Standaard Config**: Ingebouwde standaardwaarden

## Logo Vereisten

### Hoofdlogo

- **Formaat**: PNG, JPG, of SVG
- **Grootte**: 128x128px (aanbevolen)
- **Achtergrond**: Transparant (voor PNG)
- **Gebruik**: Header, splash screen, over dialoog

### Favicon

- **Formaat**: ICO of PNG
- **Grootte**: 32x32px of 16x16px
- **Gebruik**: Browser tab, venster icoon

### Applicatie Iconen (voor builds)

- **Formaten**: PNG, ICO, ICNS
- **Groottes**: 32x32, 128x128, 256x256, 512x512
- **Locatie**: `src-tauri/icons/` map

## API Integratie

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Huidige configuratie ophalen
const config = getWhiteLabelConfig();

// Nieuwe configuratie opslaan
saveWhiteLabelConfig(newConfig);

// Terugzetten naar standaard
resetWhiteLabelConfig();

// Configuratie valideren
validateWhiteLabelConfig(config);
```

### Hulpfuncties

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// White label initialiseren bij app start
initWhiteLabel();

// Document titel bijwerken
updateDocumentTitle('Je App Naam');

// Favicon bijwerken
updateFavicon('/pad/naar/favicon.ico');
```

## Best Practices

### Logo Ontwerp

- Gebruik hoge resolutie afbeeldingen voor scherpe weergave
- Handhaaf consistente branding over alle logogroottes
- Test logo's op zowel lichte als donkere achtergronden
- Zorg ervoor dat logo's leesbaar zijn bij kleine groottes

### Merkconsistentie

- Gebruik consistente kleuren en lettertypen overal
- Stem af op je bestaande merkrichtlijnen
- Test de aangepaste interface op verschillende schermgroottes
- Handhaaf professioneel uiterlijk

### URL Configuratie

- Gebruik HTTPS URL's voor alle externe links
- Test alle links voor implementatie
- Zorg ervoor dat supportkanalen goed worden gemonitord
- Houd documentatie URL's up-to-date

## Probleemoplossing

### Veelvoorkomende Problemen

**Logo wordt niet weergegeven:**

- Controleer bestandspad en machtigingen
- Verifieer dat afbeeldingsformaat wordt ondersteund
- Zorg ervoor dat afbeeldingsgrootte passend is
- Wis browsercache en herstart app

**Configuratie wordt niet opgeslagen:**

- Controleer bestandssysteemmachtigingen
- Verifieer JSON-syntax is correct
- Zorg ervoor dat configuratiemap bestaat
- Probeer als administrator uit te voeren (indien nodig)

**Build mislukt:**

- Verifieer dat alle bronbestanden bestaan
- Controleer configuratiebestand syntax
- Zorg ervoor dat icoonbestanden in correct formaat zijn
- Bekijk build logs voor specifieke fouten

### Hulp Verkrijgen

Als je problemen ondervindt met White Label setup:

1. Controleer de probleemoplossing sectie hierboven
2. Bekijk configuratiebestand syntax
3. Neem contact op met support via [Telegram](https://t.me/tikmatrix_agent_bot)
4. Voeg je configuratiebestand en foutmeldingen toe bij het rapporteren van problemen

## Licentie en Gebruik

- White Label functionaliteit is alleen beschikbaar voor gebruikers met een Jaarabonnement
- Aangepaste branding rechten zijn inbegrepen bij je abonnement
- Herdistributie van aangepaste versies kan aanvullende licenties vereisen
- Neem contact op met support voor enterprise licentie-opties

---

**Heb je de ontgrendelingscode nodig?** Neem contact op met ons supportteam via [Telegram](https://t.me/tikmatrix_agent_bot) met je jaarabonnement details.
