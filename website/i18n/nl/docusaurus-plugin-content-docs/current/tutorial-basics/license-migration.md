---
sidebar_position: 9
---

# Licentiemigratie

Draag je TikMatrix-licentie over van de ene computer naar de andere. Dit is handig bij het upgraden van hardware of het wisselen van computers.

## Vereisten

- Actieve licentie op huidige computer (activatiecode of Stripe-abonnement)
- Doelcomputer zonder bestaande TikMatrix-licentie
- Maximaal 5 migraties per maand toegestaan

## Migratiestappen

### Stap 1: Open Migratie Dialoogvenster

1. Start TikMatrix op je huidige computer
2. Klik op het **Licentie-pictogram** in de titelbalk
3. Klik op de knop **"Licentie Migreren"**

![Licentie Migratie Knop](../img/migrate-button.webp)

### Stap 2: Haal Doelmachine-ID Op

Op je doelcomputer:

1. Installeer en start TikMatrix
2. Klik op het **Licentie-pictogram** in de titelbalk
3. Kopieer de **Machine-ID**
4. Stuur deze ID naar je huidige computer

![Doelmachine-ID](../img/target-machine-id.webp)

### Stap 3: Valideer en Migreer

Terug op je huidige computer:

1. Plak de **Doelmachine-ID** in het migratiedialoogvenster
2. Klik op **"Valideren"** om compatibiliteit te controleren
3. Bekijk de getoonde licentiedetails

![Validatie Gelukt](../img/validation-success.webp)

1. Vink het bevestigingsselect vakje aan
2. Klik op **"Licentie Migreren"** en bevestig

![Migratie Bevestiging](../img/migration-confirm.webp)

### Stap 4: Voltooiing Setup

1. Wacht tot de migratie is voltooid
2. Herstart TikMatrix op je doelcomputer
3. Je licentie is nu actief op de nieuwe computer

![Migratie Gelukt](../img/migration-success.webp)

## Belangrijke Waarschuwingen

⚠️ **Licentiemigratie kan niet ongedaan worden gemaakt**

- De licentie verhuist volledig van bron naar doel
- Je oude computer verliest onmiddellijk toegang
- Maximaal 5 migraties per maand
- Beide computers hebben een stabiele internetverbinding nodig

## Wat Wordt Gemigreerd

### Voor Activatiecodes

- Licentiestatus en resterende dagen
- Licentiecodegegevens

### Voor Stripe-abonnementen

- Abonnementsstatus en factuurgegevens
- Verlengingsdatums en plandetails

## Probleemoplossing

### Veelvoorkomende Foutmeldingen

#### "Doelmachine heeft al een licentie"

De doelcomputer heeft al een actieve licentie. Migratie werkt alleen naar computers zonder bestaande licenties.

#### "Maandelijkse migratielimiet overschreden"

Je kunt slechts 5 keer per maand migreren. Wacht tot volgende maand of neem contact op met support.

#### "Ongeldig machine-ID formaat"

Zorg ervoor dat je de volledige Machine-ID correct hebt gekopieerd. Het moet minimaal 10 tekens lang zijn.

#### "Migratie validatie mislukt"

Controleer dat:

- Je huidige licentie actief is en niet verlopen
- De doelmachine-ID correct is
- Beide computers internettoegang hebben

### Support Verkrijgen

Neem contact op met [Telegram Support](https://t.me/tikmatrix_agent_bot) met:

- Screenshots van foutmeldingen
- Je huidige en doel Machine-ID's
- Beschrijving van het probleem

## FAQ

**Kan ik terugmigreren naar mijn oorspronkelijke computer?**

Ja, maar het telt als een andere migratie naar je maandelijkse limiet.

**Wat gebeurt er met mijn apparaatverbindingen?**

Apparaatverbindingen zijn gebonden aan de computer. Je moet apparaten opnieuw verbinden op de nieuwe computer.

**Kan ik een proeflicentie migreren?**

Nee, alleen betaalde licenties kunnen worden gemigreerd.

**Heeft migratie invloed op resterende licentiedagen?**

Nee, je resterende dagen blijven hetzelfde na migratie.
