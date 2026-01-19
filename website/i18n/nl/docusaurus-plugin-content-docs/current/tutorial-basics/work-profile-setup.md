# Work Profile Configuratie

TikMatrix ondersteunt het configureren van Work Profile-gebruikers voor elk apparaat afzonderlijk, wat zeer nuttig is voor bedrijfsbeheerde apparaten of dual-app omgevingen.

## Wat is Work Profile

Work Profile is een Android-functie die het mogelijk maakt om een onafhankelijke werkomgeving op hetzelfde apparaat te creëren. Door verschillende gebruikers-ID's te configureren, kun je:

- TikMatrix normaal gebruiken op bedrijfsbeheerde apparaten
- Verschillende gebruikersconfiguraties instellen voor verschillende app-omgevingen
- Gedetailleerder apparaatbeheer en machtigingscontrole bereiken

## Shelter Tool Gebruiken om Applicaties te Klonen

Voordat je Work Profile configureert, moet je de Shelter-tool gebruiken om TikTok en TikMatrix applicaties te klonen:

### Wat is Shelter

Shelter is een open-source applicatie die Work Profile op Android-apparaten creëert en beheert. Het stelt je in staat om dubbele applicaties uit te voeren in een geïsoleerde werkomgeving.

### Shelter Installeren

1. Download Shelter van [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) of [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Installeer en open Shelter op je apparaat
3. Volg de setup-wizard om een Work Profile aan te maken

### Vereiste Applicaties Klonen

Na het instellen van Shelter, moet je zowel TikTok als TikMatrix applicaties klonen:

1. **TikTok Applicatie Klonen**:
   - Open Shelter en ga naar het tabblad "Main"
   - Zoek TikTok in de applicatielijst
   - Tik op de knop "Clone to Work Profile"
   - Wacht tot het kloonproces is voltooid

2. **TikMatrix Applicatie Klonen**:
   - Zoek TikMatrix in de applicatielijst in Shelter
   - Tik op de knop "Clone to Work Profile"
   - Bevestig de kloonbewerking

### Verifieer Klonen Gelukt

Na succesvol klonen:

- Je ziet zowel TikTok als TikMatrix met een aktetas-pictogram in je app drawer
- Dit zijn de Work Profile-versies van de applicaties
- De originele applicaties blijven ongewijzigd in het hoofdprofiel

## Hoe Work Profile te Configureren

### 1. Open Apparaat Werkbalk

Wanneer je apparaat is verbonden en wordt weergegeven in de TikMatrix hoofdinterface:

1. Dubbelklik op de apparaatkaart om naar volledig schermmodus te gaan
2. Een werkbalk verschijnt aan de rechterkant van het apparaatscherm
3. De werkbalk is standaard ingeklapt en zal automatisch uitklappen wanneer je eroverheen zweeft

### 2. Vind de Work Profile Knop

Onderaan de werkbalk zie je een aktetas-pictogram knop, dit is de Work Profile configuratieknop.

### 3. Gebruikers-ID Instellen

1. Klik op de aktetas-pictogram knop
2. Voer de gebruikers-ID in het pop-up dialoogvenster in (bijv. 10)
3. Klik op de "Opslaan" knop

### 4. Configuratie Bevestigen

Na succesvolle configuratie toont het systeem een melding "Work Profile gebruikersinstellingen opgeslagen".

## Gebruikers-ID Beschrijving

### Veelvoorkomende Gebruikers-ID's

- **0**: Primaire gebruiker (standaardgebruiker)
- **10**: Eerste work profile gebruiker
- **11**: Tweede work profile gebruiker
- Extra gebruikers-ID's volgen dit patroon

### Hoe Gebruikers-ID te Vinden

Als je onzeker bent over de gebruikers-ID's op je apparaat, kun je ze vinden met:

```bash
adb shell pm list users
```

Of uitvoeren in TikMatrix debug tools:

```bash
pm list users
```

Voorbeelduitvoer:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Configuratiebestand Opslag

Work Profile configuraties worden automatisch opgeslagen in het bestand `data/work_profile_user.json` met het volgende formaat:

```json
{
  "device_serial_1": "10",
  "device_serial_2": "0",
  "device_serial_3": "11"
}
```

## Apparaatconfiguraties Beheren

### Huidige Configuratie Bekijken

De Work Profile configuratie van elk apparaat is onafhankelijk. Je kunt:

1. Verschillende gebruikers-ID's instellen voor elk apparaat
2. Bestaande apparaat gebruikersconfiguraties op elk moment wijzigen
3. Configuratie wissen (voer lege waarde in en sla op om configuratie te verwijderen)

### Batchbeheer

Als je een groot aantal apparaten moet beheren, kun je het bestand `data/work_profile_user.json` direct bewerken:

1. Sluit de TikMatrix applicatie
2. Open het configuratiebestand
3. Voeg apparaatconfiguraties toe of wijzig ze in JSON-formaat
4. Herstart TikMatrix

## Probleemoplossing

### Veelvoorkomende Problemen

#### V: Commando's mislukken na instellen Work Profile

A: Bevestig alsjeblieft:

- Of de gebruikers-ID correct is
- Of de bijbehorende gebruiker bestaat op het apparaat
- Of je voldoende machtigingen hebt om toegang te krijgen tot die gebruiker

#### V: Hoe Work Profile configuratie annuleren

A: Wis het gebruikers-ID invoerveld in het configuratiedialoogvenster en klik op opslaan.

#### V: Wat te doen als configuratie verloren gaat

A: Configuraties worden opgeslagen in een lokaal JSON-bestand. Als ze verloren gaan, kun je opnieuw configureren of het bestand `data/work_profile_user.json` herstellen vanaf een backup.

#### V: Shelter-gerelateerde problemen

A: Als je problemen ondervindt met Shelter:

- **Klonen mislukt**: Zorg ervoor dat je beheerdersrechten hebt en voldoende opslagruimte
- **Gekloonde apps niet zichtbaar**: Controleer of Work Profile correct is geactiveerd in Shelter
- **Apps crashen in Work Profile**: Probeer de applicaties opnieuw te klonen of Shelter bij te werken
- **Kan gekloonde apps niet vinden**: Zoek naar apps met aktetas-pictogrammen in je app drawer

## Best Practices

### Enterprise Omgeving

1. **Uniform Beheer**: Stel dezelfde gebruikers-ID in voor alle bedrijfsapparaten
2. **Machtigingsscheiding**: Gebruik verschillende gebruikers-ID's om verschillende machtigingsniveaus te onderscheiden
3. **Backup Configuratie**: Maak regelmatig een backup van het bestand `work_profile_user.json`

### Persoonlijk Gebruik

1. **App Isolatie**: Stel verschillende gebruikersomgevingen in voor verschillende doeleinden
2. **Testomgeving**: Gebruik onafhankelijke gebruikers-ID's voor app-testen
3. **Privacybescherming**: Verbeter privacybeveiliging door gebruikersscheiding

### Shelter Tool Beheer

1. **Regelmatige Updates**: Houd Shelter applicatie bijgewerkt om compatibiliteit te garanderen
2. **Applicatie Synchronisatie**: Zorg ervoor dat zowel TikTok als TikMatrix zijn gekloond voordat je Work Profile configureert
3. **Backup Shelter Instellingen**: Exporteer en maak een backup van Shelter configuraties voor eenvoudig herstel
4. **Monitor App Updates**: Wanneer TikTok of TikMatrix updatet, moet je mogelijk ook de gekloonde versies bijwerken

## Technische Details

De Work Profile functie wordt geïmplementeerd door de parameter `--user` toe te voegen aan ADB-commando's:

```bash
# Zonder Work Profile
adb shell input tap 100 200

# Met Work Profile (Gebruikers-ID: 10)
adb shell --user 10 input tap 100 200
```

Dit zorgt ervoor dat commando's worden uitgevoerd in de juiste gebruikersomgeving, waardoor machtigingsproblemen en omgevingsconflicten worden voorkomen.

---

Door Work Profile correct te configureren, kun je TikMatrix soepel gebruiken in verschillende complexe apparaatomgevingen, waardoor werkefficiëntie en beheergemak worden verbeterd.
