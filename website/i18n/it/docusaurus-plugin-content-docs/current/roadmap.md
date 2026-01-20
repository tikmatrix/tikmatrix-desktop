---
sidebar_position: 1
title: Posizionamento Software e Roadmap TikMatrix/IgMatrix
sidebar_label: Roadmap
description: Roadmap versione ufficiale, panoramica del posizionamento di TikMatrix/IgMatrix nell'ecosistema operativo automatizzato, limiti delle capacità e raccomandazioni per il lancio.
slug: roadmap
---

## Mappa del Processo Completo

![Roadmap TikMatrix/IgMatrix](/img/roadmap-zh.svg)

---

## Per Chi Creiamo Valore

- **Team Piccoli-Medi/MCN/Brand/Team di Test Graduali**: Necessitano di eseguire stabilmente "azioni operative ripetitive quotidiane che richiedono simulazione umana" su scala di 5～100 dispositivi.
- **Crescita e Operazioni Contenuto**: Necessitano di orchestrazione comportamentale "in massa ma non meccanica" altamente controllabile, bilanciando strategia di sicurezza ed efficienza.

---

## Proposizione di Valore Principale (Perché Scegliere TikMatrix/IgMatrix)

1. **Automazione in Massa Orchestrabile**: Costruisce pipeline riutilizzabili con il modello "attività → script → sorgente dati", coprendo l'intera catena di azioni: warm-up, pubblicazione, interazione e raccolta.
2. **Simulazione Umana e Strategia di Controllo Rischi**: Il motore è dotato di meccanismi di randomizzazione temporale, controllo del ritmo, simulazione gesti umano-macchina, recupero da interruzioni anomale, ecc., per avvicinarsi il più possibile alle caratteristiche comportamentali umane reali.
3. **Scalabilità e Stabilità**: Supporta mix di dispositivi fisici/cloud, connessione USB/TCP ADB, garantendo scalabilità lineare e pianificazione stabile da 5→20→50→100 dispositivi.
4. **Osservabilità Dati**: Log attività, screen mirroring dispositivi, statistiche account ed esportazione dati risultati.

---

## Mappa Funzionalità (Limiti Capacità Passo 4)

### 1) Orchestrazione e Pianificazione Attività

- Strategia concorrenza multi-account/multi-dispositivo, randomizzazione ordine di esecuzione
- Retry fallimenti, ripresa da checkpoint, gestione occupazione risorse (materiali/account/proxy)

### 2) Centro Script

- **Script Super Marketing**: Ha integrato capacità Boost utenti/post, invio DM in massa, commenti in massa, ecc.
- Script warm-up account: navigazione quotidiana, permanenza, interazioni leggere
- Script pubblicazione contenuti: gestione video/testo/tag/hashtag, pubblicazione programmata
- Script raccolta dati: scraping informazioni nome utente, costruzione lista target prossimo turno

### 3) Simulazione Umana e Controllo Rischi

- Randomizzazione tocco/scorrimento/pausa/durata visualizzazione
- Rilevamento anomalie e limitazione velocità, evitando comportamenti ad alta frequenza una tantum

> **Dichiarazione Limiti**: TikMatrix/IgMatrix non fornisce dispositivi, account o proxy; ci concentriamo sull'**automazione delle azioni operative**.

---

## Raccomandazioni per il Lancio (Da 0 alla Scala)

1. **Periodo di Validazione (1–5 dispositivi)**: Collegare dispositivo→account→proxy→script singolo nel loop chiuso minimo
2. **Periodo Pilota (10–20 dispositivi)**: Introdurre script Super Marketing + loop raccolta dati; osservare soglia controllo rischi
3. **Periodo di Espansione (20–50 dispositivi)**: Limitazione velocità per gruppo, strategia randomizzazione, rotazione multi-sorgente dati
4. **Periodo di Scala (50-100 dispositivi)**: Pianificazione batch, esecuzione sfalsata

---

## Avviso Rischi e Conformità

- L'utilizzo di strumenti di automazione potrebbe violare i termini di servizio della piattaforma; si prega di **assumersi i rischi** e controllare ragionevolmente frequenza e modelli comportamentali
- L'ambiente hardware del telefono, proxy, qualità account e strategia operativa influenzeranno significativamente stabilità e risultati

---

## Domande Frequenti

**Q: TikMatrix fornisce account/proxy?**  
A: No. Ci concentriamo sul motore di automazione e l'esecuzione degli script.

**Q: Fornite cloud phone?**  
A: No. Gli utenti devono preparare autonomamente l'ambiente dei dispositivi.

**Q: Supportate i cloud phone?**  
A: Purché possano connettersi stabilmente tramite ADB (USB/TCP), possono essere inclusi nella pianificazione.

---

## Invito all'Azione

- Prova subito il piano Starter, costruisci il tuo loop chiuso "passo 4" minimo vitale
- Leggi la documentazione degli script, padroneggia rapidamente le operazioni in massa
