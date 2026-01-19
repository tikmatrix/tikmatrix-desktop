---
sidebar_position: 1
title: TikMatrix/IgMatrix Productpositionering & Roadmap
sidebar_label: Roadmap
description: Officiële roadmap met beschrijving van TikMatrix/IgMatrix positionering, functionaliteitsgrenzen en implementatieaanbevelingen.
slug: roadmap
---

## Volledig Procesoverzicht

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Voor wie we waarde creëren

- **MKB / MCN's / merken / experimentteams**: hebben stabiele uitvoering nodig van dagelijkse maar menselijk ogende operationele acties op 5–100 apparaten.
- **Groei- & contentoperaties**: hebben controleerbare batch- (maar niet-mechanische) orkestratie nodig die veiligheid en efficiëntie in balans brengt.

---

## Kernwaardepropositie (waarom kiezen voor TikMatrix/IgMatrix)

1. **Samenstellbare batch-automatisering**: bouw herbruikbare pijplijnen met het model "taak → script → gegevensbron", die warming, publiceren, engagement en verzameling dekken.
2. **Menselijk gedrag & risicobeheer**: engine ondersteunt gerandomiseerde timing, ritmecontrole, menselijke gestuurde simulatie en abnormaal herstel om echt gebruikersgedrag na te bootsen.
3. **Schaalbaarheid & stabiliteit**: ondersteunt hybride echte apparaten / cloudapparaten, USB/TCP ADB, waardoor lineaire schaling van 5→20→50→100 apparaten mogelijk is met betrouwbare scheduling.
4. **Observeerbaarheid**: taaklogboeken, apparaatspiegeling, accountstatistieken en exporteerbare resultaatgegevens.

---

## Functieoverzicht (bereik van stap 4)

### 1) Taakorkestratie & scheduling

- Multi-account / multi-apparaat gelijktijdigheidsstrategieën, gerandomiseerde uitvoeringsvolgorde
- Opnieuw proberen bij falen, hervatten vanaf breekpunt, resourcebeheer (assets/accounts/proxies)

### 2) Scriptcentrum

- **Geavanceerde marketingscripts**: omvat Boost gebruikers/posts, bulk DM's, batch reacties
- Account warming scripts: dagelijks browsen, verblijftijd, lichte interacties
- Contentpublicatiescripts: video/bijschrift/tags/onderwerpen beheer, geplande publicatie
- Gegevensverzamelingsscripts: scrape gebruikersinfo en bouw volgende doellijsten

### 3) Menselijk & risicobeheer

- Randomisatie van aanraking/swipe/pauze/weergavetijd
- Anomaliedetectie en frequentielimieten om plotseling hoogfrequent gedrag te voorkomen

> **Afbakening**: TikMatrix/IgMatrix levert GEEN apparaten, accounts of proxies; we focussen op automatisering van operationele acties.

---

## Implementatieaanbevelingen (van 0 tot schaal)

1. **Validatie (1–5 apparaten)**: verbind apparaten → accounts → proxies → enkel script minimale gesloten lus
2. **Pilot (10–20 apparaten)**: introduceer geavanceerde marketingscripts + gegevensverzamelingslus; bewaak risicodrempels
3. **Uitbreiding (20–50 apparaten)**: groep frequentielimiet, gerandomiseerde strategieën, multi-gegevensbron rotatie
4. **Schaal (50–100 apparaten)**: batch scheduling, gespreide uitvoering

---

## Risico's & compliance-opmerkingen

- Het gebruik van automatisering kan platformvoorwaarden schenden; gebruik op eigen risico en beheer frequentie/gedragspatronen
- Apparaathardware, proxies, accountkwaliteit en operationele strategie beïnvloeden stabiliteit en resultaten aanzienlijk

---

## Veelgestelde Vragen

**V: Levert TikMatrix accounts/proxies?**  
A: Nee. We focussen op de automatiseringsengine en scriptuitvoering.

**V: Leveren jullie cloud phones?**  
A: Nee. Gebruikers moeten zelf apparaatomgevingen voorbereiden.

**V: Ondersteunen jullie cloud phones?**  
A: Elk apparaat dat stabiel via ADB (USB/TCP) kan worden verbonden, kan worden gescheduled.

---

## Oproep tot actie

- Probeer nu het Starter-plan en bouw uw minimaal levensvatbare stap-4 gesloten lus
- Lees de scriptdocumentatie om te starten met batch-operaties
