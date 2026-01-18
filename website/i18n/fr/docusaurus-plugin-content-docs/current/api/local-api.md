---
sidebar_position: 1
title: Aperçu de l'API Locale
description: API locale TikMatrix pour gérer les tâches par programmation
---

TikMatrix fournit une API RESTful locale qui vous permet de gérer les tâches par programmation. Cela est particulièrement utile pour intégrer TikMatrix dans vos propres systèmes d'automatisation, créer des flux de travail personnalisés ou effectuer des opérations en masse.

## Exigences

:::warning Exigences de licence
**L'API locale est disponible uniquement pour les utilisateurs des forfaits Pro, Team et Business.** Le forfait Starter ne fournit pas d'accès à l'API.
:::

## URL de Base

L'API fonctionne localement à l'adresse :

```text
http://localhost:50809/api/v1/
```

:::note
Le port `50809` est le port par défaut. Veuillez vous assurer que TikMatrix est en cours d'exécution avant d'envoyer des requêtes.
:::

## Format de Réponse

Toutes les réponses de l'API suivent le format suivant :

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### Description des Codes de Réponse

| Code | Description |
|------|------|
| 0 | Succès |
| 40001 | Erreur de paramètre - Paramètres de requête invalides |
| 40002 | Erreur de paramètre - script_name manquant |
| 40003 | Erreur de paramètre - Le script ne prend pas encore en charge les appels API |
| 40301 | Interdit - L'accès à l'API nécessite un forfait Pro+ |
| 40401 | Non trouvé - La ressource n'existe pas |
| 50001 | Erreur interne du serveur |

## Démarrage Rapide

### 1. Vérifier l'Accès à l'API

Tout d'abord, confirmez que votre licence prend en charge l'API :

```bash
curl http://localhost:50809/api/v1/license/check
```

Exemple de réponse :

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

### 2. Créer une Tâche

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "Regardez ma nouvelle vidéo ! #tendance"
    },
    "enable_multi_account": false
  }'
```

### 3. Interroger la Liste des Tâches

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## Scripts Disponibles

:::info Support Actuel
Actuellement, l'API locale prend en charge les scripts `post`, `follow`, `unfollow`, `account_warmup` et `comment`. D'autres scripts seront ajoutés progressivement dans les versions futures.
:::

Le paramètre `script_name` accepte les valeurs suivantes :

| Nom du Script | Description | Support API |
|--------|------|----------|
| `post` | Publier du contenu | ✅ Pris en charge |
| `follow` | Suivre des utilisateurs | ✅ Pris en charge |
| `unfollow` | Se désabonner | ✅ Pris en charge |
| `account_warmup` | Préchauffage de compte | ✅ Pris en charge |
| `comment` | Commenter | ✅ Pris en charge |
| `like` | Aimer | 🔜 Prochainement |
| `message` | Message privé | 🔜 Prochainement |
| `super_marketing` | Campagne de super marketing | 🔜 Prochainement |
| `profile` | Mettre à jour le profil | 🔜 Prochainement |
| `scrape_user` | Extraire les données utilisateur | 🔜 Prochainement |

## États des Tâches

| Code d'État | Texte d'État | Description |
|--------|----------|------|
| 0 | pending | La tâche est en attente d'exécution |
| 1 | running | La tâche est en cours d'exécution |
| 2 | completed | La tâche a été exécutée avec succès |
| 3 | failed | L'exécution de la tâche a échoué |

## Suite

- [API de Gestion des Tâches](./task-management) - Créer, interroger et gérer les tâches
- [Configuration du Script de Publication](./post-script) - Configurer les paramètres du script de publication
- [Configuration du Script de Suivi](./follow-script) - Configurer les paramètres du script de suivi
- [Configuration du Script de Désabonnement](./unfollow-script) - Configurer les paramètres du script de désabonnement
- [Configuration du Script de Préchauffage de Compte](./account-warmup-script) - Configurer les paramètres du script de préchauffage de compte
- [Configuration du Script de Commentaire](./comment-script) - Configurer les paramètres du script de commentaire
- [Exemples d'API](./examples) - Exemples de code dans différents langages
