---
sidebar_position: 1
title: TikMatrix/IgMatrix Produktpositionierung und Roadmap
sidebar_label: Roadmap
description: Offizielle Roadmap, die die Positionierung von TikMatrix/IgMatrix, Funktionsgrenzen und Empfehlungen für den Einsatz beschreibt.
slug: roadmap
---

## Vollständiger Prozess

![TikMatrix/IgMatrix Roadmap](/img/roadmap-ru.svg)

---

## Für wen wir Mehrwert schaffen

- **Kleine und mittlere Teams / MCN / Marken / Experimentelle Teams**: Benötigen stabile Ausführung täglicher, aber menschenähnlicher Operationen auf 5–100 Geräten.
- **Wachstums- und Content-Operations-Teams**: Benötigen verwaltbare Batch-Orchestrierung (aber nicht mechanisch) mit Balance zwischen Sicherheit und Effizienz.

---

## Hauptvorteile (warum TikMatrix/IgMatrix wählen)

1. **Komponentenbasierte Batch-Automatisierung**: Wir bauen wiederverwendbare Pipelines nach dem Modell „Aufgabe → Skript → Datenquelle" auf und decken Aufwärmen, Veröffentlichung, Interaktion und Datensammlung ab.
2. **Menschenähnliches Verhalten und Risikokontrolle**: Die Engine unterstützt Timing-Randomisierung, Rhythmuskontrolle, Gestenimitation und Fehlerwiederherstellung.
3. **Skalierbarkeit und Stabilität**: Unterstützung für echte und Cloud-Geräte, USB/TCP ADB, lineare Skalierung 5→20→50→100 mit zuverlässigem Scheduler.
4. **Beobachtbarkeit**: Aufgabenprotokolle, Geräte-Broadcast, Kontostatistiken und Ergebnis-Datenexport.

---

## Funktionskarte (Schritt-4-Grenzen)

### 1) Aufgabenorchestrierung und Planung

- Multi-Account/Multi-Gerät-Strategien für parallele Ausführung, Randomisierung der Ausführungsreihenfolge
- Wiederholungsversuche bei Fehlern, Fortsetzung vom Checkpoint, Ressourcenverwaltung (Materialien/Konten/Proxys)

### 2) Skript-Center

- **Marketing-Skripte**: Integriert Boost von Benutzern/Posts, Massennachrichten, Batch-Kommentare
- Account-Warming-Skripte: Tägliches Ansehen, Verzögerungen, leichte Interaktionen
- Content-Publishing-Skripte: Video/Text/Tags/Themen, geplante Veröffentlichung
- Datensammlungs-Skripte: Sammlung von Benutzerinformationen für die nächste Zielliste

### 3) Menschenähnlichkeit und Risikokontrolle

- Randomisierung von Berührungen/Scrollen/Pausen/Anzeigezeit
- Anomalieerkennung und Rate-Limiting, um plötzliche Aktivitätsspitzen zu vermeiden

> **Grenzenerklärung**: TikMatrix/IgMatrix stellt KEINE Geräte, Konten oder Proxys bereit; wir konzentrieren uns auf die Automatisierung operativer Aktionen.

---

## Empfehlungen für den Einsatz (von 0 bis zur Skalierung)

1. **Validierungsphase (1–5 Geräte)**: Geräte verbinden → Konten → Proxys → minimale geschlossene Schleife aus einem Skript
2. **Pilot (10–20 Geräte)**: Einführung von Marketing-Skripten + Datensammlung; Überwachung der Risikoschwellen
3. **Erweiterung (20–50 Geräte)**: Gruppenlimits, Randomisierung, Rotation der Datenquellen
4. **Skalierung (50–100 Geräte)**: Batch-Planung, stufenweise Ausführung

---

## Risiken und Compliance-Hinweise

- Die Verwendung von Automatisierung kann gegen Plattformregeln verstoßen; verwenden Sie auf eigenes Risiko und kontrollieren Sie Häufigkeit/Verhalten
- Hardware-Eigenschaften des Telefons, Proxys, Kontoqualität und Betriebsstrategie beeinflussen Stabilität und Ergebnisse erheblich

---

## Häufig gestellte Fragen

**F: Stellt TikMatrix Konten/Proxys bereit?**  
A: Nein. Wir konzentrieren uns auf die Automatisierungs-Engine und Skriptausführung.

**F: Bieten Sie Cloud-Telefone an?**  
A: Nein. Benutzer müssen die Geräteumgebung selbst vorbereiten.

**F: Werden Cloud-Telefone unterstützt?**  
A: Jedes Gerät, das stabil über ADB (USB/TCP) verbunden ist, kann in die Planung einbezogen werden.

---

## Aufruf zum Handeln

- Probieren Sie den Starter-Plan aus und bauen Sie eine minimale geschlossene Schleife für Schritt 4
- Lesen Sie die Skript-Dokumentation, um schnell mit Batch-Operationen zu beginnen

