---
sidebar_position: 2
---

# Bekannte Probleme

## Port-Konflikt-Fehler

Wenn Sie folgenden Fehler in den Logs sehen:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)
```

Dies weist auf einen Port-Konflikt hin. Um das Problem zu lösen:

1. Starten Sie die TikMatrix/IgMatrix-Anwendung vollständig neu und versuchen Sie es erneut.
2. Führen Sie keine andere Geräteverwaltungssoftware gleichzeitig mit TikMatrix/IgMatrix aus, da dies Port-Konflikte verursachen kann.
3. Stellen Sie sicher, dass keine andere Anwendung denselben Kommunikationsport verwendet.

Dieser Fehler tritt normalerweise auf, wenn mehrere Geräteverwaltungsanwendungen gleichzeitig laufen und Port-Konflikte verursachen.

## Skript-Fehler bei Cloud-Telefonen

Stellen Sie ausreichende und stabile Netzwerkbandbreite zwischen Ihrem PC und dem Cloud-Telefon-Rechenzentrum sicher. Für beste Ergebnisse platzieren Sie PC und Cloud-Telefon-Rechenzentrum im selben Land oder Region, um Latenz und Paketverlust zu reduzieren – dies hilft automatischen Aufgaben, zuverlässiger zu laufen.

## Instabile Skriptausführung, zufällige Fehler, inkonsistente Ergebnisse

Dies hängt oft mit der ADB-Verbindungsqualität zusammen. Wenn Sie USB-Verbindung verwenden, versuchen Sie ein anderes Kabel oder einen anderen USB-Port. Wenn Sie kabelloses ADB verwenden, stellen Sie stabile Netzwerkverbindung und guten Signalpegel zwischen PC und Gerät sicher.

## Durch TikTok/Instagram-App-Updates unterbrochene Skripte

TikTok und Instagram werden häufig aktualisiert, was zu Fehlern in automatischen Skripten führen kann. Bitte reichen Sie ein Support-Ticket ein, und wir werden die Skripte so schnell wie möglich für Kompatibilität mit den neuesten App-Versionen aktualisieren.
