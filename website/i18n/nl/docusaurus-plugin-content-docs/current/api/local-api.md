---
sidebar_position: 1
title: Local API Overzicht
description: TikMatrix Local API voor programmatisch takenbeheer
---

TikMatrix biedt een lokale RESTful API waarmee u taken programmatisch kunt beheren. Dit is handig voor het integreren van TikMatrix met uw eigen automatiseringssystemen, het bouwen van aangepaste workflows of het maken van batchbewerkingen.

## Vereisten

:::warning Licentie Vereiste
**De Local API is alleen beschikbaar voor Pro, Team en Business plan abonnees.** Het Starter plan heeft geen toegang tot de API.
:::

## Basis URL

De API draait op uw lokale machine op:

```text
http://localhost:50809/api/v1/
```

:::note
De poort `50809` is de standaard poort. Zorg ervoor dat TikMatrix draait voordat u API verzoeken doet.
:::

## Response Formaat

Alle API responses volgen dit formaat:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Response Codes

| Code | Beschrijving |
|------|-------------|
| 0 | Succes |
| 40001 | Bad Request - Ongeldige parameters |
| 40002 | Bad Request - Ontbrekende script_name |
| 40003 | Bad Request - Script niet ondersteund via API |
| 40301 | Forbidden - API toegang vereist Pro+ plan |
| 40401 | Not Found - Resource niet gevonden |
| 50001 | Internal Server Error |

## Snelstart

### 1. Controleer API Toegang

Controleer eerst of uw licentie API toegang ondersteunt:

```bash
curl http://localhost:50809/api/v1/license/check
```

Response:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "plan_name": "Pro",
    "api_enabled": true,
    "device_limit": 20,
    "message": "API access enabled"
  }
}
```

### 2. Maak een Taak

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Check out my new video! #viral"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. Lijst Taken

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Beschikbare Scripts

De `script_name` parameter accepteert de volgende waarden:

| Script Naam | Beschrijving | API Ondersteuning |
|-------------|-------------|-------------|
| `post` | Publiceer inhoud | ✅ Ondersteund |
| `follow` | Volg gebruikers | ✅ Ondersteund |
| `unfollow` | Ontvolg gebruikers | ✅ Ondersteund |
| `account_warmup` | Warm accounts op | ✅ Ondersteund |
| `comment` | Reageer op posts | ✅ Ondersteund |
| `like` | Like posts | 🔜 Binnenkort |
| `message` | Stuur directe berichten | 🔜 Binnenkort |
| `super_marketing` | Super marketing campagne | 🔜 Binnenkort |
| `profile` | Update profiel | 🔜 Binnenkort |
| `scrape_user` | Scrape gebruikersgegevens | 🔜 Binnenkort |

## Taak Status

| Status Code | Status Tekst | Beschrijving |
|-------------|-------------|-------------|
| 0 | pending | Taak wacht om uitgevoerd te worden |
| 1 | running | Taak wordt momenteel uitgevoerd |
| 2 | completed | Taak succesvol voltooid |
| 3 | failed | Taak mislukt |

## Volgende Stappen

- [Task Management API](./task-management) - Taken maken, opvragen en beheren
- [Post Script Configuratie](./post-script) - Post script parameters configureren
- [Follow Script Configuratie](./follow-script) - Follow script parameters configureren
- [Unfollow Script Configuratie](./unfollow-script) - Unfollow script parameters configureren
- [Account Warmup Script Configuratie](./account-warmup-script) - Account warmup script parameters configureren
- [Comment Script Configuratie](./comment-script) - Comment script parameters configureren
- [API Voorbeelden](./examples) - Codevoorbeelden in verschillende talen
