---
sidebar_position: 5
title: Configuration du Script de Désabonnement
description: Référence complète de configuration du script de désabonnement
---

Cette page documente les paramètres de configuration du script `unfollow` utilisé lors de la création de tâches.

## Vue d'ensemble

Le script `unfollow` permet de se désabonner automatiquement d'utilisateurs sur TikTok ou Instagram. Lorsque vous fournissez plusieurs utilisateurs cibles via l'API, **le système crée une tâche pour chaque utilisateur cible**. Vous pouvez utiliser le paramètre `start_time` pour contrôler le moment d'exécution des tâches.

## Configuration du Script (`script_config`)

L'objet `script_config` contient les paramètres de configuration du script de désabonnement. Voici les paramètres disponibles :

### Paramètres

| Paramètre | Type | Requis | Valeur par défaut | Description |
|------|------|------|--------|------|
| target_users | string[] | Oui* | [] | Tableau de noms d'utilisateur cibles dont se désabonner (une tâche par utilisateur) |
| target_user | string | Oui* | "" | Nom d'utilisateur cible unique, ou plusieurs noms d'utilisateur séparés par des retours à la ligne/virgules |
| access_method | string | Non | "direct" | Méthode de navigation vers le profil utilisateur : `direct` (via URL) ou `search` |

:::note
Vous devez fournir soit le tableau `target_users`, soit la chaîne `target_user`. Si les deux sont fournis, `target_users` a la priorité.
:::

:::info Création de Tâches
Lorsque plusieurs utilisateurs cibles sont fournis, l'API **crée une tâche pour chaque utilisateur cible**. Par exemple, si vous spécifiez 3 utilisateurs cibles et 2 appareils, 6 tâches seront créées. Utilisez le paramètre `start_time` pour contrôler le moment d'exécution des tâches.
:::

## Exemples

### Se Désabonner d'un Seul Utilisateur

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### Se Désabonner de Plusieurs Utilisateurs

Lors du désabonnement de plusieurs utilisateurs, une tâche est créée pour chaque utilisateur :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

Cela créera 3 tâches indépendantes qui s'exécuteront immédiatement.

### Planifier des Tâches avec start_time

Utilisez `start_time` pour planifier l'heure de début des tâches :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### Se Désabonner d'Utilisateurs via la Méthode de Recherche

Utilisez la méthode de recherche lorsque l'accès direct par URL ne fonctionne pas :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### Désabonnement en Masse sur Plusieurs Appareils

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## Réponse

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## Méthodes d'Accès

### Accès Direct (`direct`)

- Ouvre le profil utilisateur via URL : `tiktok.com/@username` ou `instagram.com/username`
- Plus rapide et plus fiable
- Recommandé dans la plupart des cas

### Accès par Recherche (`search`)

- Navigue vers la recherche, saisit le nom d'utilisateur, clique sur le résultat
- Plus lent mais fonctionne lorsque l'accès direct par URL est bloqué
- Peut être moins précis s'il existe plusieurs noms d'utilisateur similaires

## Meilleures Pratiques

1. **Planification avec start_time** : Utilisez le paramètre `start_time` pour planifier le moment d'exécution des tâches (format : "HH:MM").

2. **Privilégier l'accès direct** : La méthode d'accès `direct` est plus rapide et plus fiable que `search`.

3. **Traitement par lots raisonnable** : Ne vous désabonnez pas de trop d'utilisateurs à la fois. Le système crée une tâche pour chaque utilisateur cible, donc de grandes listes génèrent de nombreuses tâches.

## Voir Aussi

- [API de Gestion des Tâches](./task-management.md) - Créer, consulter et gérer les tâches
- [Configuration du Script de Publication](./post-script.md) - Configurer les paramètres du script de publication
- [Configuration du Script de Suivi](./follow-script.md) - Configurer les paramètres du script de suivi
