# Work Profile-konfiguration

TikMatrix stöder konfiguration av Work Profile-användare för varje enhet individuellt, vilket är mycket användbart för företagshanterade enheter eller dual-app-miljöer.

## Vad är Work Profile

Work Profile är en Android-funktion som tillåter att skapa en oberoende arbetsmiljö på samma enhet. Genom att konfigurera olika användar-ID:n kan du:

- Använd TikMatrix normalt på företagshanterade enheter
- Ställa in olika användarkonfigurationer för olika app-miljöer
- Uppnå mer detaljerad enhetshantering och behörighetskontroll

## Använda Shelter-verktyget för att klona applikationer

Innan du konfigurerar Work Profile behöver du använda Shelter-verktyget för att klona TikTok- och TikMatrix-applikationer:

### Vad är Shelter

Shelter är en open source-applikation som skapar och hanterar Work Profile på Android-enheter. Den låter dig köra dubbletter av applikationer i en isolerad arbetsmiljö.

### Installera Shelter

1. Ladda ner Shelter från [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) eller [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Installera och öppna Shelter på din enhet
3. Följ installationsguiden för att skapa en Work Profile

### Klona nödvändiga applikationer

Efter att ha ställt in Shelter behöver du klona både TikTok- och TikMatrix-applikationer:

1. **Klona TikTok-applikationen**:
   - Öppna Shelter och gå till fliken "Main"
   - Hitta TikTok i applikationslistan
   - Tryck på knappen "Clone to Work Profile"
   - Vänta på att kloningsprocessen ska slutföras

2. **Klona TikMatrix-applikationen**:
   - I Shelter, lokalisera TikMatrix i applikationslistan
   - Tryck på knappen "Clone to Work Profile"
   - Bekräfta kloningsoperationen

### Verifiera att kloningen lyckades

Efter lyckad kloning:

- Du kommer att se både TikTok och TikMatrix med en portföljikon i din applåda
- Dessa är Work Profile-versionerna av applikationerna
- De ursprungliga applikationerna förblir oförändrade i huvudprofilen

## Hur man konfigurerar Work Profile

### 1. Öppna enhetsverktygsfältet

När din enhet är ansluten och visas i TikMatrix huvudgränssnitt:

1. Dubbelklicka på enhetskortet för att gå in i helskärmsläge
2. Ett verktygsfält kommer att visas på höger sida av enhetsskärmen
3. Verktygsfältet är ihopfällt som standard och expanderar automatiskt när du hovrar över det

### 2. Hitta Work Profile-knappen

Längst ner i verktygsfältet ser du en portföljikonsknapp, som är Work Profile-konfigurationsknappen.

### 3. Ställ in användar-ID

1. Klicka på portföljikonknappen
2. Ange användar-ID:t i popup-dialogen (t.ex. 10)
3. Klicka på knappen "Save"

### 4. Bekräfta konfiguration

Efter lyckad konfiguration kommer systemet att visa ett meddelande "Work Profile user settings saved".

## Användar-ID-beskrivning

### Vanliga användar-ID:n

- **0**: Primär användare (standardanvändare)
- **10**: Första work profile-användaren
- **11**: Andra work profile-användaren
- Ytterligare användar-ID:n följer detta mönster

### Hur man hittar användar-ID

Om du är osäker på användar-ID:na på din enhet kan du hitta dem med:

```bash
adb shell pm list users
```

Eller kör i TikMatrix-felsökningsverktyg:

```bash
pm list users
```

Exempel på utdata:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Lagring av konfigurationsfil

Work Profile-konfigurationer sparas automatiskt till filen `data/work_profile_user.json` med följande format:

```json
{
  "device_serial_1": "10",
  "device_serial_2": "0",
  "device_serial_3": "11"
}
```

## Hantera enhetskonfigurationer

### Visa aktuell konfiguration

Varje enhets Work Profile-konfiguration är oberoende. Du kan:

1. Ställa in olika användar-ID:n för varje enhet
2. Ändra befintliga enhets användarkonfigurationer när som helst
3. Rensa konfiguration (ange tomt värde och spara för att ta bort konfiguration)

### Masshantering

Om du behöver hantera ett stort antal enheter kan du direkt redigera filen `data/work_profile_user.json`:

1. Stäng TikMatrix-applikationen
2. Öppna konfigurationsfilen
3. Lägg till eller ändra enhetskonfigurationer i JSON-format
4. Starta om TikMatrix

## Felsökning

### Vanliga problem

#### F: Kommandon misslyckas efter att ha ställt in Work Profile

S: Vänligen bekräfta:

- Om användar-ID:t är korrekt
- Om motsvarande användare finns på enheten
- Om du har tillräckliga behörigheter för att komma åt den användaren

#### F: Hur man avbryter Work Profile-konfiguration

S: Rensa användar-ID-inmatningsfältet i konfigurationsdialogen och klicka på spara.

#### F: Vad du ska göra om konfigurationen går förlorad

S: Konfigurationer lagras i en lokal JSON-fil. Om de går förlorade kan du omkonfigurera eller återställa filen `data/work_profile_user.json` från backup.

#### F: Shelter-relaterade problem

S: Om du stöter på problem med Shelter:

- **Kloning misslyckas**: Se till att du har administratörsbehörigheter och tillräckligt lagringsutrymme
- **Klonade appar inte synliga**: Kontrollera om Work Profile är ordentligt aktiverad i Shelter
- **Appar kraschar i Work Profile**: Försök klona om applikationerna eller uppdatera Shelter
- **Kan inte hitta klonade appar**: Leta efter appar med portföljikoner i din applåda

## Bästa praxis

### Företagsmiljö

1. **Enhetlig hantering**: Ställ in samma användar-ID för alla företagsenheter
2. **Behörighetsseparation**: Använd olika användar-ID:n för att skilja olika behörighetsnivåer
3. **Backup-konfiguration**: Säkerhetskopiera regelbundet filen `work_profile_user.json`

### Personlig användning

1. **Appisolering**: Ställ in olika användarmiljöer för olika ändamål
2. **Testmiljö**: Använd oberoende användar-ID:n för apptestning
3. **Integritetsskydd**: Förbättra integritetssäkerhet genom användarseparation

### Shelter-verktygshantering

1. **Regelbundna uppdateringar**: Håll Shelter-applikationen uppdaterad för att säkerställa kompatibilitet
2. **Applikationssynkronisering**: Se till att både TikTok och TikMatrix är klonade innan du konfigurerar Work Profile
3. **Backup Shelter-inställningar**: Exportera och säkerhetskopiera Shelter-konfigurationer för enkel återställning
4. **Övervaka appuppdateringar**: När TikTok eller TikMatrix uppdateras kan du behöva uppdatera de klonade versionerna också

## Tekniska detaljer

Work Profile-funktionen implementeras genom att lägga till parametern `--user` till ADB-kommandon:

```bash
# Utan Work Profile
adb shell input tap 100 200

# Med Work Profile (User ID: 10)
adb shell --user 10 input tap 100 200
```

Detta säkerställer att kommandon körs i rätt användarmiljö, vilket undviker behörighetsproblem och miljökonflikter.

---

Genom att korrekt konfigurera Work Profile kan du smidigt använda TikMatrix i olika komplexa enhetsmiljöer, vilket förbättrar arbetseffektiviteten och hanteringsbekvämligheten.
