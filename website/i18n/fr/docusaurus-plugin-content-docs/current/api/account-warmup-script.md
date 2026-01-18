---
sidebar_position: 6
title: Configuration du Script de Préchauffage de Compte
description: Référence complète de configuration du script de préchauffage de compte
---

Cette page documente les paramètres de configuration du script `account_warmup` utilisé pour la création de tâches.

## Aperçu

Le script `account_warmup` est utilisé pour préchauffer des comptes TikTok ou Instagram en simulant le comportement naturel des utilisateurs. Il regarde des vidéos et effectue de manière aléatoire des actions comme aimer, suivre, enregistrer et commenter en fonction des probabilités configurées. Cela aide les nouveaux comptes à établir un historique d'interaction et à éviter d'être détectés comme des robots.

## Configuration du Script (`script_config`)

L'objet `script_config` contient les paramètres du script de préchauffage de compte. Voici les paramètres disponibles :

### Paramètres

| Paramètre | Type | Obligatoire | Valeur par défaut | Description |
|-----|------|------|-------|------|
| task_duration | number | Non | 600 | Durée totale de la tâche de préchauffage (secondes) |
| topic | string | Non | "" | Mots-clés de sujet de recherche (un par ligne, sélection aléatoire) |
| min_duration | number | Non | 15 | Durée minimale de visionnage de la vidéo (secondes) |
| max_duration | number | Non | 30 | Durée maximale de visionnage de la vidéo (secondes) |
| like_probable | number | Non | 0 | Probabilité d'aimer la vidéo (0-100) |
| floow_probable | number | Non | 0 | Probabilité de suivre le créateur de la vidéo (0-100) |
| collect_probable | number | Non | 0 | Probabilité d'enregistrer/de marquer la vidéo (0-100) |
| comment_probable | number | Non | 0 | Probabilité de commenter la vidéo (0-100) |
| comment | string | Non | "" | Modèles de commentaires (un par ligne, sélection aléatoire) |
| insert_emoji | boolean | Non | false | Insérer ou non des émojis aléatoires dans les commentaires |
| comment_order | string | Non | "random" | Ordre de sélection des commentaires : `random` (aléatoire) ou `sequential` (séquentiel) |
| generate_by_chatgpt | boolean | Non | false | Utiliser ou non ChatGPT pour générer des commentaires |
| chatgpt_settings | object | Non | {} | Paramètres de configuration ChatGPT (voir ci-dessous) |

### Structure des Paramètres ChatGPT

Lorsque `generate_by_chatgpt` est défini sur `true`, vous pouvez utiliser l'objet `chatgpt_settings` pour configurer la génération de commentaires par ChatGPT :

| Paramètre | Type | Obligatoire | Description |
|-----|------|------|------|
| api_key | string | Oui | Votre clé API OpenAI |
| model | string | Non | Modèle à utiliser (par défaut : "gpt-3.5-turbo"). Options : "gpt-3.5-turbo", "gpt-4", "gpt-4-turbo" |
| prompt | string | Non | Prompt personnalisé pour générer les commentaires. Par défaut, génère des commentaires amicaux et pertinents |
| max_tokens | number | Non | Nombre maximum de tokens pour la réponse (par défaut : 100) |
| temperature | number | Non | Niveau de créativité 0-2 (par défaut : 0.7). Valeur plus élevée = plus créatif |
| base_url | string | Non | URL de point de terminaison API personnalisée (pour Azure OpenAI ou API compatible) |

Exemple d'objet `chatgpt_settings` :

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "Générez un commentaire court et amical en français pour cette vidéo",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip Recommandation
Pour les nouveaux comptes, il est recommandé de commencer avec de faibles probabilités d'interaction (5-15 %) puis d'augmenter progressivement au fil du temps. Cela simule le comportement naturel des utilisateurs.
:::

## Exemples

### Préchauffage de Compte Basique

Préchauffage simple avec visionnage de vidéos uniquement :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 10,
      "max_duration": 30
    }
  }'
```

### Préchauffage avec Recherche par Sujet

Préchauffer le compte en recherchant des sujets spécifiques :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "chats drôles\nvidéos de chiens\ncollection animaux",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### Préchauffage avec Interactions

Préchauffage complet incluant likes, suivis et commentaires :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "cuisine\nrecettes\ngastronomie",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "Génial ! 🔥\nJ'adore ce contenu !\nParfait ! 👏\nWow, impressionnant !",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### Préchauffage avec Commentaires ChatGPT

Utilisez ChatGPT pour générer des commentaires intelligents :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "test technologique\nproduits numériques",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "Générez un commentaire court et amical pour cette vidéo"
      }
    }
  }'
```

### Préchauffage en Masse sur Plusieurs Appareils

Exécutez le préchauffage simultanément sur plusieurs appareils :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20
    },
    "enable_multi_account": true
  }'
```

### Tâche de Préchauffage Planifiée

Planifiez l'exécution du préchauffage à une heure spécifique :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "musique\ndanse\ntendance",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### Préchauffage par Liste de Noms d'Utilisateur

Créez des tâches de préchauffage pour des comptes spécifiques :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20,
      "floow_probable": 5
    }
  }'
```

## Réponse

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## Bonnes Pratiques

1. **Commencez avec de Faibles Probabilités** : Pour les nouveaux comptes, utilisez de faibles probabilités d'interaction (5-15 %), puis augmentez progressivement sur plusieurs jours/semaines.

2. **Utilisez des Sujets Pertinents** : Choisissez des sujets liés au positionnement de votre compte pour établir un historique d'interaction pertinent.

3. **Variez la Durée de Visionnage** : Définissez une plage entre min_duration et max_duration pour simuler des schémas de visionnage naturels.

4. **Durée de Tâche Modérée** : Exécutez 2-3 sessions de préchauffage par jour, chacune de 10-30 minutes, plutôt que des sessions prolongées continues.

5. **Utilisez des Commentaires Variés** : Fournissez plusieurs modèles de commentaires pour éviter les schémas répétitifs qui pourraient déclencher la détection de spam.

6. **Planifiez Judicieusement** : Utilisez `start_time` pour exécuter les tâches de préchauffage pendant les heures d'activité dans le fuseau horaire de votre public cible.

## Voir Également

- [API de Gestion des Tâches](./task-management.md) - Créer, lister et gérer les tâches
- [Configuration du Script de Publication](./post-script.md) - Configurer les paramètres du script de publication
- [Configuration du Script de Suivi](./follow-script.md) - Configurer les paramètres du script de suivi
- [Configuration du Script de Désabonnement](./unfollow-script.md) - Configurer les paramètres du script de désabonnement
