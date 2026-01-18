---
sidebar_position: 2
title: API de Gestion des Tâches
description: Référence complète des points de terminaison de gestion des tâches
---

Cette page documente tous les points de terminaison API disponibles pour gérer les tâches TikMatrix.

## Créer une Tâche

Créez une nouvelle tâche pour un ou plusieurs appareils ou noms d'utilisateur.

- **Point de terminaison :** `POST /api/v1/task`
- **Content-Type :** `application/json`

### Paramètres de Requête

L'API prend en charge deux modes pour créer des tâches :

**Mode 1 : Mode Appareil** - Utilisez `serials` pour créer des tâches pour les appareils
**Mode 2 : Mode Nom d'Utilisateur** - Utilisez `usernames` pour créer directement des tâches pour des comptes spécifiques

| Paramètre | Type | Requis | Description |
|------|------|------|------|
| serials | string[] | Conditionnel | Tableau des numéros de série des appareils (requis si `usernames` n'est pas fourni) |
| usernames | string[] | Conditionnel | Tableau des noms d'utilisateur (requis si `serials` n'est pas fourni). Lorsque ce paramètre est fourni, créez directement des tâches pour ces comptes. |
| script_name | string | Oui | Nom du script à exécuter |
| script_config | object | Oui | Paramètres de configuration du script (voir la documentation du script correspondant) |
| enable_multi_account | boolean | Non | Activer ou non le mode multi-compte (par défaut : false). Efficace uniquement en mode appareil. |
| start_time | string | Non | Heure d'exécution planifiée, au format "HH:MM" |

### Scripts Pris en Charge

| Nom du Script | Description | Documentation |
|----------|------|------|
| post | Publier des vidéos ou des images sur TikTok/Instagram | [Configuration du Script de Publication](./post-script.md) |

### Exemple

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Regardez ma nouvelle vidéo ! #tendance #recommandé",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

Pour les paramètres détaillés de `script_config` et plus d'exemples, veuillez consulter [Configuration du Script de Publication](./post-script.md).

### Réponse

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

## Lister les Tâches

Interrogez les tâches avec des conditions de filtrage optionnelles.

- **Point de terminaison :** `GET /api/v1/task`

| Paramètre | Type | Requis | Description |
|------|------|------|------|
| status | integer | Non | Filtrer par état (0=pending, 1=running, 2=completed, 3=failed) |
| serial | string | Non | Filtrer par numéro de série de l'appareil |
| script_name | string | Non | Filtrer par nom de script |
| source | string | Non | Filtrer par source ("ui" ou "api") |
| page | integer | Non | Numéro de page (par défaut : 1) |
| page_size | integer | Non | Nombre d'entrées par page (par défaut : 20, maximum : 100) |

## Obtenir les Détails d'une Tâche

Obtenez les informations détaillées sur une tâche spécifique.

- **Point de terminaison :** `GET /api/v1/task/{task_id}`

## Supprimer une Tâche

Supprimez une tâche. Si la tâche est en cours d'exécution, elle sera d'abord arrêtée.

- **Point de terminaison :** `DELETE /api/v1/task/{task_id}`

## Supprimer Plusieurs Tâches

Supprimez plusieurs tâches à la fois, les tâches en cours d'exécution seront d'abord arrêtées.

- **Point de terminaison :** `DELETE /api/v1/task/batch`
- **Corps de la requête :** `{ "task_ids": [1, 2, 3] }`

## Arrêter une Tâche

Arrêtez une tâche en cours d'exécution.

- **Point de terminaison :** `POST /api/v1/task/{task_id}/stop`

## Réessayer une Tâche Échouée

Réessayez une seule tâche échouée.

- **Point de terminaison :** `POST /api/v1/task/{task_id}/retry`

## Réessayer Toutes les Tâches Échouées

Réessayez toutes les tâches échouées en une seule fois.

- **Point de terminaison :** `POST /api/v1/task/retry-all`

## Obtenir les Statistiques des Tâches

Obtenez les statistiques globales des tâches.

- **Point de terminaison :** `GET /api/v1/task/stats`
- **Réponse :** Renvoie le nombre de total, pending, running, completed, failed.

## Vérifier la Licence API

Vérifiez si votre licence prend en charge l'accès à l'API.

- **Point de terminaison :** `GET /api/v1/license/check`
- **Note :** Le forfait Starter renverra le code d'erreur 40301 ; les forfaits Pro/Team/Business peuvent accéder à l'API.
