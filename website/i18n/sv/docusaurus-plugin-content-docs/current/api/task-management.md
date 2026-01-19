---
sidebar_position: 2
title: API för uppgiftshantering
description: Komplett API-referens för endpoints för uppgiftshantering
---

Den här sidan dokumenterar alla tillgängliga API-endpoints för hantering av uppgifter i TikMatrix.

## Skapa uppgift

Skapa en ny uppgift för en eller flera enheter eller användarnamn.

- **Endpoint:** `POST /api/v1/task`
- **Content-Type:** `application/json`

### Parametrar för begäran

API:et stöder två lägen för att skapa uppgifter:

**Läge 1: Enhetsbaserat** - Använd `serials` för att skapa uppgifter för enheter
**Läge 2: Användarnamnbaserat** - Använd `usernames` för att skapa uppgifter direkt för specifika konton

| Parameter | Typ | Krävs | Beskrivning |
|-----------|------|----------|-------------|
| serials | string[] | Villkorligt | Array av enhetens serienummer (krävs om `usernames` inte anges) |
| usernames | string[] | Villkorligt | Array av användarnamn för att skapa uppgifter för (krävs om `serials` inte anges). När detta anges skapas uppgifter direkt för dessa konton. |
| script_name | string | Ja | Namnet på scriptet som ska köras |
| script_config | object | Ja | Konfigurationsparametrar för scriptet (se script-specifik dokumentation) |
| enable_multi_account | boolean | Nej | Aktivera multi-konto-läge (standard: false). Endast tillämpligt i enhetsbaserat läge. |
| start_time | string | Nej | Schemalagd starttid i "HH:MM"-format |

### Stödda scripts

| Script-namn | Beskrivning | Dokumentation |
|-------------|-------------|---------------|
| post | Publicera videos eller bilder till TikTok/Instagram | [Konfiguration av post-script](./post-script.md) |
| follow | Följ eller sluta följa användare | [Konfiguration av follow-script](./follow-script.md) |

### Exempel

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

För detaljerade `script_config`-parametrar och fler exempel, se [Konfiguration av post-script](./post-script.md) och [Konfiguration av follow-script](./follow-script.md).

### Svar

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

## Lista uppgifter

Fråga uppgifter med valfria filter.

- **Endpoint:** `GET /api/v1/task`

| Parameter | Typ | Krävs | Beskrivning |
|-----------|------|----------|-------------|
| status | integer | Nej | Filtrera efter status (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | Nej | Filtrera efter enhetens serienummer |
| script_name | string | Nej | Filtrera efter scriptnamn |
| source | string | Nej | Filtrera efter källa ("ui" eller "api") |
| page | integer | Nej | Sidnummer (standard: 1) |
| page_size | integer | Nej | Objekt per sida (standard: 20, max: 100) |

## Hämta uppgiftsdetaljer

Hämta detaljerad information om en specifik uppgift.

- **Endpoint:** `GET /api/v1/task/{task_id}`

## Ta bort uppgift

Ta bort en uppgift. Om uppgiften körs kommer den att stoppas först.

- **Endpoint:** `DELETE /api/v1/task/{task_id}`

## Batch-borttagning av uppgifter

Ta bort flera uppgifter samtidigt. Körande uppgifter kommer att stoppas först.

- **Endpoint:** `DELETE /api/v1/task/batch`
- **Body:** `{ "task_ids": [1, 2, 3] }`

## Stoppa uppgift

Stoppa en körande uppgift.

- **Endpoint:** `POST /api/v1/task/{task_id}/stop`

## Försök igen med misslyckad uppgift

Försök igen med en misslyckad uppgift.

- **Endpoint:** `POST /api/v1/task/{task_id}/retry`

## Försök igen med alla misslyckade uppgifter

Försök igen med alla misslyckade uppgifter samtidigt.

- **Endpoint:** `POST /api/v1/task/retry-all`

## Hämta uppgiftsstatistik

Hämta statistik om alla uppgifter.

- **Endpoint:** `GET /api/v1/task/stats`
- **Svar:** Returnerar totalt, pending, running, completed och failed antal.

## Kontrollera API-licens

Kontrollera om din licens stöder API-åtkomst.

- **Endpoint:** `GET /api/v1/license/check`
- **Obs:** Starter-planen returnerar felkod 40301. Pro, Team och Business-planer har API-åtkomst.
