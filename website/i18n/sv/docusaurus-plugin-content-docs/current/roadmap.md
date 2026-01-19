---
sidebar_position: 1
title: TikMatrix/IgMatrix Produktpositionering & Roadmap
sidebar_label: Roadmap
description: Officiell roadmap som beskriver TikMatrix/IgMatrix-positionering, kapacitetsgränser och implementeringsrekommendationer.
slug: roadmap
---

## Fullständig Processkarta

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Vem vi skapar värde för

- **SMB / MCN / varumärken / experimentteam**: behöver stabil utförning av dagliga men människoliknande operationella åtgärder i 5–100 enhetssskala.
- **Tillväxt- och innehållsoperationer**: behöver kontrollerbar batch (men inte mekanisk) orkestrering som balanserar säkerhet och effektivitet.

---

## Kärna värdeförslag (varför välja TikMatrix/IgMatrix)

1. **Komponerbar batch-automation**: bygg återanvändbara pipelines med modellen "uppgift → skript → datakälla", täckande uppvärmning, publicering, engagemang och insamling.
2. **Människoliknande beteende & riskkontroll**: motor stödjer slumpmässig timing, rytmkontroll, simulering av mänskliga gester och abnorm återhämtning för att likna verkligt användarbeteende.
3. **Skalbarhet & stabilitet**: stödjer verkliga enheter / molnenheter hybrid, USB/TCP ADB, möjliggör linjär skalning från 5→20→50→100 enheter med pålitlig schemaläggning.
4. **Observerbarhet**: uppgiftsloggar, enhetsspegeling, kontostatistik och exporterbara resultatdata.

---

## Kapacitetskarta (omfattning av steg 4)

### 1) Uppgiftsorkestrering & schemaläggning

- Multi-konto / multi-enhet samtidighetsstrategier, slumpmässig exekveringsordning
- Försök igen vid fel, återuppta från brytpunkt, resurshantering (tillgångar/konton/proxies)

### 2) Skriptcenter

- **Avancerade marknadsföringsskript**: inkluderar Boosta användare/inlägg, bulk-DM:er, batch-kommentarer
- Kontouppvärmningsskript: daglig surfning, uppehåll, lätta interaktioner
- Innehållspubliceringsskript: video/bildtext/taggar/ämneshantering, schemalagd publicering
- Datainsamlingsskript: skrapa användarinfo och bygg nästa mållistor

### 3) Mänsklig & riskkontroll

- Slumpmässighet av touch/svep/paus/visningstid
- Anomalidetektering och hastighetsgränser för att undvika plötsligt högfrekvent beteende

> **Gränsdeklaration**: TikMatrix/IgMatrix tillhandahåller INTE enheter, konton eller proxies; vi fokuserar på automation av operationella åtgärder.

---

## Implementeringsrekommendationer (från 0 till skala)

1. **Validering (1–5 enheter)**: anslut enheter → konton → proxies → minimal sluten loop av ett enda skript
2. **Pilot (10–20 enheter)**: introducera avancerade marknadsföringsskript + datainsamlingsloop; övervaka risktrösklar
3. **Expansion (20–50 enheter)**: grupphastighetsbegränsning, slumpmässiga strategier, rotation av flera datakällor
4. **Skala (50–100 enheter)**: batch-schemaläggning, fördelad exekvering

---

## Risker och compliance-medvetenhet

- Att använda automation kan bryta mot plattformsvillkor; använd på egen risk och kontrollera frekvens/beteendemönster
- Enhetshårdvara, proxies, kontokvalitet och operationsstrategi påverkar avsevärt stabilitet och resultat

---

## FAQ

**F: Tillhandahåller TikMatrix konton/proxies?**  
S: Nej. Vi fokuserar på automationsmotorn och skriptexekvering.

**F: Tillhandahåller ni molntelefoner?**  
S: Nej. Användare bör förbereda enhetsmiljöer själva.

**F: Stödjer ni molntelefoner?**  
S: Alla enheter som kan ansluten stabilt via ADB (USB/TCP) kan schemaläggas.

---

## Handlingsuppmaning

- Prova Starter-planen nu och bygg din minimala funktionella slutna loop av steg 4
- Läs skriptdokumentationen för att börja batch-operationer
