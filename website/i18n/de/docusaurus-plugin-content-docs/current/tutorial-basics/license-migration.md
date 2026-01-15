---
sidebar_position: 9
---

# Lizenzmigration

Übertragen Sie Ihre TikMatrix-Lizenz von einem Computer auf einen anderen. Dies ist nützlich bei Hardware-Upgrades oder Computerwechseln.

## Anforderungen

- Aktive Lizenz auf dem aktuellen Computer (Aktivierungscode oder Stripe-Abonnement)
- Zielcomputer ohne vorhandene TikMatrix-Lizenz
- Maximum 5 Migrationen pro Monat

## Migrationsschritte

### Schritt 1: Migrationsdialog öffnen

1. Starten Sie TikMatrix auf Ihrem aktuellen Computer
2. Klicken Sie auf das **Lizenzsymbol** im Fenstertitel
3. Klicken Sie auf die Schaltfläche **"Lizenz migrieren"**

![Schaltfläche Lizenz migrieren](../img/migrate-button.webp)

### Schritt 2: Zielmaschinen-ID abrufen

Auf Ihrem Zielcomputer:

1. Installieren und starten Sie TikMatrix
2. Klicken Sie auf das **Lizenzsymbol** im Fenstertitel
3. Kopieren Sie die **Maschinen-ID**
4. Senden Sie diese ID an Ihren aktuellen Computer

![Zielmaschinen-ID](../img/target-machine-id.webp)

### Schritt 3: Überprüfung und Migration

Zurück zum aktuellen Computer:

1. Fügen Sie die **Zielmaschinen-ID** in den Migrationsdialog ein
2. Klicken Sie auf **"Überprüfen"** zur Kompatibilitätsprüfung
3. Überprüfen Sie die angezeigten Lizenzdetails

![Erfolgreiche Überprüfung](../img/validation-success.webp)

1. Setzen Sie das Bestätigungshäkchen
2. Klicken Sie auf **"Lizenz migrieren"** und bestätigen Sie

![Migrationsbestätigung](../img/migration-confirm.webp)

### Schritt 4: Setup abschließen

1. Warten Sie auf den Abschluss der Migration
2. Starten Sie auf dem Zielcomputer TikMatrix neu
3. Ihre Lizenz ist jetzt auf dem neuen Computer aktiv

![Erfolgreiche Migration](../img/migration-success.webp)

## Wichtige Warnungen

⚠️ **Lizenzmigration kann nicht rückgängig gemacht werden**

- Die Lizenz wird vollständig vom Quellcomputer auf den Zielcomputer übertragen
- Ihr alter Computer verliert sofort den Zugriff
- Maximum 5 Migrationen pro Monat
- Beide Computer benötigen stabiles Internet

## Was wird migriert

### Für Aktivierungscodes

- Lizenzstatus und verbleibende Tage
- Informationen zum Lizenzcode

### Für Stripe-Abonnements

- Abonnementstatus und Zahlungsinformationen
- Verlängerungsdaten und Plandetails

## Fehlerbehebung

### Häufige Fehlermeldungen

#### "Zielmaschine hat bereits eine Lizenz"

Der Zielcomputer hat bereits eine aktive Lizenz. Migration funktioniert nur auf Computer ohne vorhandene Lizenzen.

#### "Monatliches Migrationslimit überschritten"

Sie können nur 5 Mal pro Monat migrieren. Warten Sie bis zum nächsten Monat oder wenden Sie sich an den Support.

#### "Ungültiges Maschinen-ID-Format"

Stellen Sie sicher, dass Sie die vollständige Maschinen-ID korrekt kopiert haben. Sie sollte mindestens 10 Zeichen lang sein.

#### "Migrationsvalidierung fehlgeschlagen"

Überprüfen Sie, dass:

- Ihre aktuelle Lizenz aktiv und nicht abgelaufen ist
- Die Zielmaschinen-ID korrekt ist
- Beide Computer Internetzugang haben

### Support erhalten

Wenden Sie sich an [Telegram-Support](https://t.me/tikmatrix_agent_bot) mit:

- Screenshots von Fehlermeldungen
- Ihren aktuellen und Ziel-Maschinen-IDs
- Beschreibung des Problems

## Häufig gestellte Fragen

**Kann ich zurück zum ursprünglichen Computer migrieren?**

Ja, aber dies zählt als weitere Migration in Ihrem monatlichen Limit.

**Was passiert mit Geräteverbindungen?**

Geräteverbindungen sind an den Computer gebunden. Sie müssen Geräte auf dem neuen Computer erneut verbinden.

**Kann ich eine Testlizenz migrieren?**

Nein, nur bezahlte Lizenzen können migriert werden.

**Beeinflusst Migration die verbleibenden Lizenztage?**

Nein, Ihre verbleibenden Tage bleiben nach der Migration gleich.
