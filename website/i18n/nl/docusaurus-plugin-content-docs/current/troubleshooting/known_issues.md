---
sidebar_position: 2
---

# Bekende Problemen

## Poortconflictfout

Als u de volgende fout in de logs ziet:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)
```

Dit duidt op een poortconflict. Om dit probleem op te lossen:

1. Start de TikMatrix/IgMatrix-applicatie volledig opnieuw op en probeer het opnieuw.
2. Vermijd het gelijktijdig uitvoeren van andere apparaatbesturingssoftware met TikMatrix/IgMatrix, omdat deze poortconflicten kunnen veroorzaken.
3. Zorg ervoor dat geen andere applicatie dezelfde communicatiepoort gebruikt.

Deze fout treedt meestal op wanneer meerdere apparaatbesturingsapplicaties tegelijkertijd worden uitgevoerd en conflicteren over de communicatiepoort.

## Cloud Telefoon Scriptfouten

Zorg voor voldoende en stabiele netwerkbandbreedte tussen uw PC en het cloud telefoon datacenter. Voor de beste resultaten, plaats de PC en het cloud telefoon datacenter in hetzelfde land of dezelfde regio om latentie en pakketverlies te verminderen, wat automatiseringstaken betrouwbaar helpt uitvoeren.

## Instabiele Scriptuitvoering, Willekeurige Fouten, Inconsistente Resultaten

Dit hangt vaak samen met de kwaliteit van de ADB-verbinding. Als u een USB-verbinding gebruikt, probeer dan een andere kabel of USB-poort. Als u draadloze ADB gebruikt, zorg dan voor een stabiele netwerkverbinding en een goed signaalbereik tussen de PC en het apparaat.

## Scripts Kapot door TikTok/Instagram App Updates

TikTok en Instagram updaten regelmatig en kunnen automatiseringsscripts laten falen. Dien alstublieft een supportticket in en we zullen de scripts zo snel mogelijk updaten om aan te passen aan de nieuwste app-versies.
