---
sidebar_position: 2
title: Task Management API
description: Volledige API referentie voor takenbeheer endpoints
---

Deze pagina documenteert alle beschikbare API endpoints voor het beheren van taken in TikMatrix.

## Maak Taak

Maak een nieuwe taak voor één of meerdere apparaten of gebruikersnamen.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Request Parameters

De API ondersteunt twee modi voor het maken van taken:

**Modus 1: Apparaat-gebaseerd** - Gebruik `serials` om taken te maken voor apparaten
**Modus 2: Gebruikersnaam-gebaseerd** - Gebruik `usernames` om taken direct te maken voor specifieke accounts

| Parameter | Type | Verplicht | Beschrijving |
|-----------|------|----------|-------------|
| serials | string[] | Voorwaardelijk | Array van apparaat serienummers (verplicht als `usernames` niet is opgegeven) |
| usernames | string[] | Voorwaardelijk | Array van gebruikersnamen waarvoor taken moeten worden gemaakt (verplicht als `serials` niet is opgegeven). Wanneer opgegeven, worden taken direct gemaakt voor deze accounts. |
| script_name | string | Ja | Naam van het uit te voeren script |
| script_config | object | Ja | Configuratieparameters voor het script (zie script-specifieke documentatie) |
| enable_multi_account | boolean | Nee | Multi-account modus inschakelen (standaard: false). Alleen van toepassing in apparaat-gebaseerde modus. |
| start_time | string | Nee | Geplande starttijd in "HH:MM" formaat |

### Ondersteunde Scripts

| Script Naam | Beschrijving | Documentatie |
|-------------|-------------|---------------|
| post | Publiceer video's of afbeeldingen naar TikTok/Instagram | [Post Script Configuratie](./post-script.md) |
| follow | Volg of ontvolg gebruikers | [Follow Script Configuratie](./follow-script.md) |

### Voorbeeld

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Check out my new video! #viral #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Voor gedetailleerde `script_config` parameters en meer voorbeelden, zie [Post Script Configuratie](./post-script.md) en [Follow Script Configuratie](./follow-script.md).

### Response

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## Lijst Taken

Vraag taken op met optionele filters.

- **Endpoint:** `GET /api/v1/task`

| Parameter | Type | Verplicht | Beschrijving |
|-----------|------|----------|-------------|
| status | integer | Nee | Filter op status (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | Nee | Filter op apparaat serienummer |
| script_name | string | Nee | Filter op script naam |
| source | string | Nee | Filter op bron ("ui" of "api") |
| page | integer | Nee | Paginanummer (standaard: 1) |
| page_size | integer | Nee | Items per pagina (standaard: 20, max: 100) |

## Haal Taak Details Op

Haal gedetailleerde informatie op over een specifieke taak.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Verwijder Taak

Verwijder een taak. Als de taak wordt uitgevoerd, wordt deze eerst gestopt.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Batch Verwijder Taken

Verwijder meerdere taken tegelijk. Lopende taken worden eerst gestopt.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Body:** `{ "task_ids": [1, 2, 3] }`

## Stop Taak

Stop een lopende taak.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Probeer Mislukte Taak Opnieuw

Probeer een mislukte taak opnieuw.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Probeer Alle Mislukte Taken Opnieuw

Probeer alle mislukte taken tegelijk opnieuw.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Haal Taak Statistieken Op

Haal statistieken op over alle taken.

- **Endpoint:** `GET /api/v1/task/stats`
- **Response:** Retourneert totaal, pending, running, completed en failed aantallen.

## Controleer API Licentie

Controleer of uw licentie API toegang ondersteunt.

- **Endpoint:** `GET /api/v1/license/check`
- **Opmerking:** Starter plan retourneert foutcode 40301. Pro, Team en Business plannen hebben API toegang.
