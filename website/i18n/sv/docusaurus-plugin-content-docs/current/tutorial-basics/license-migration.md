---
sidebar_position: 9
---

# Licensmigrering

Överför din TikMatrix-licens från en dator till en annan. Detta är användbart när du uppgraderar hårdvara eller byter dator.

## Krav

- Aktiv licens på nuvarande dator (aktiveringskod eller Stripe-prenumeration)
- Måldator utan befintlig TikMatrix-licens
- Maximalt 5 migreringar per månad tillåts

## Migrationssteg

### Steg 1: Öppna migreringsdialog

1. Starta TikMatrix på din nuvarande dator
2. Klicka på **Licensikonen** i titelraden
3. Klicka på knappen **"Migrate License"**

![License Migration Button](../img/migrate-button.webp)

### Steg 2: Hämta måldatorns ID

På din måldator:

1. Installera och starta TikMatrix
2. Klicka på **Licensikonen** i titelraden
3. Kopiera **Machine ID**
4. Skicka detta ID till din nuvarande dator

![Target Machine ID](../img/target-machine-id.webp)

### Steg 3: Validera och migrera

Tillbaka på din nuvarande dator:

1. Klistra in **Target Machine ID** i migreringsdialogen
2. Klicka på **"Validate"** för att kontrollera kompatibilitet
3. Granska licensdetaljerna som visas

![Validation Success](../img/validation-success.webp)

1. Markera bekräftelsekryssrutan
2. Klicka på **"Migrate License"** och bekräfta

![Migration Confirmation](../img/migration-confirm.webp)

### Steg 4: Slutför installationen

1. Vänta på att migreringen ska slutföras
2. På din måldator, starta om TikMatrix
3. Din licens är nu aktiv på den nya datorn

![Migration Success](../img/migration-success.webp)

## Viktiga varningar

⚠️ **Licensmigrering kan inte ångras**

- Licensen flyttas helt från källa till mål
- Din gamla dator förlorar åtkomst omedelbart
- Maximalt 5 migreringar per månad
- Båda datorerna behöver stabil internetanslutning

## Vad som migreras

### För aktiveringskoder

- Licensstatus och återstående dagar
- Licenskodinformation

### För Stripe-prenumerationer

- Prenumerationsstatus och faktureringsinformation
- Förnyelsedatum och plandetaljer

## Felsökning

### Vanliga felmeddelanden

#### "Target machine already has a license"

Måldatorn har redan en aktiv licens. Migrering fungerar endast till datorer utan befintliga licenser.

#### "Monthly migration limit exceeded"

Du kan endast migrera 5 gånger per månad. Vänta till nästa månad eller kontakta support.

#### "Invalid machine ID format"

Se till att du kopierade hela Machine ID korrekt. Det bör vara minst 10 tecken långt.

#### "Migration validation failed"

Kontrollera att:

- Din nuvarande licens är aktiv och inte utgången
- Target Machine ID är korrekt
- Båda datorerna har internetåtkomst

### Få support

Kontakta [Telegram Support](https://t.me/tikmatrix_agent_bot) med:

- Skärmbilder av felmeddelanden
- Dina nuvarande och mål-Machine ID:n
- Beskrivning av problemet

## FAQ

**Kan jag migrera tillbaka till min ursprungliga dator?**

Ja, men det räknas som ytterligare en migrering mot din månatliga gräns.

**Vad händer med mina enhetsanslutningar?**

Enhetsanslutningar är kopplade till datorn. Du kommer att behöva återansluta enheter på den nya datorn.

**Kan jag migrera en testlicens?**

Nej, endast betalda licenser kan migreras.

**Påverkar migrering återstående licensdagar?**

Nej, dina återstående dagar förblir desamma efter migrering.
