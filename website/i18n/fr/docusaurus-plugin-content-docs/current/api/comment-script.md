---
sidebar_position: 5
title: Configuration du Script de Commentaire
description: Référence complète de configuration du script de commentaire
---

Cette page documente les paramètres de configuration du script `comment` utilisé lors de la création de tâches.

## Vue d'ensemble

Le script `comment` permet de publier automatiquement des commentaires sur des publications TikTok ou Instagram. Lorsque vous fournissez plusieurs URL de publications cibles via l'API, **une tâche est créée pour chaque URL de publication cible**. Vous pouvez contrôler le moment d'exécution de chaque tâche en utilisant le paramètre `start_time`.

## Configuration du Script (`script_config`)

L'objet `script_config` contient les paramètres du script de commentaire. Voici les paramètres disponibles :

### Paramètres

| Paramètre | Type | Requis | Valeur par défaut | Description |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Oui* | [] | Tableau d'URL de publications cibles à commenter (une tâche par URL) |
| target_post_url | string | Oui* | "" | URL d'une seule publication cible ou plusieurs URL séparées par des retours à la ligne/virgules |
| comment_content | string | Oui | "" | Contenu texte du commentaire. Peut contenir plusieurs commentaires séparés par des retours à la ligne |
| comment_order | string | Non | "random" | Mode de sélection des commentaires : `random` (aléatoire) ou `sequential` (séquentiel) |
| insert_emoji | boolean | Non | false | Insérer ou non des emojis aléatoires dans le commentaire |
| comment_image_path | string | Non | "" | Chemin du fichier image pour un commentaire avec image (TikTok uniquement). Supporte les chemins absolus ou relatifs par rapport à work_dir/upload/ |

:::note
Vous devez fournir soit le tableau `target_post_urls`, soit la chaîne `target_post_url`. Si les deux sont fournis, `target_post_urls` a la priorité.
:::

:::tip Commentaires avec Image (TikTok uniquement)
Le paramètre `comment_image_path` vous permet de joindre une image à votre commentaire. Cette fonctionnalité est **uniquement supportée sur TikTok** - les commentaires Instagram ne supportent pas les pièces jointes d'images. L'image sera envoyée à l'appareil et sélectionnée comme première image de la galerie.
:::

:::info Création de Tâches
Lorsque plusieurs URL de publications cibles sont fournies, l'API **crée une tâche pour chaque URL de publication cible**. Par exemple, si vous spécifiez 3 URL de publications et 2 appareils, 6 tâches seront créées. Utilisez le paramètre `start_time` pour contrôler le moment où les tâches commencent à s'exécuter.
:::

## Exemples

### Commenter une Seule Publication

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Contenu excellent ! 🔥"
    }
  }'
```

### Utiliser Plusieurs Options de Commentaires

Fournissez plusieurs commentaires séparés par des retours à la ligne. Le système sélectionnera l'un d'eux selon `comment_order` :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Vidéo fantastique !\nJ'adore ce contenu !\nContinuez comme ça ! 👏\nVraiment excellent !",
      "comment_order": "random"
    }
  }'
```

### Commenter Plusieurs Publications

Lors de commentaires sur plusieurs publications, une tâche est créée pour chaque publication :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "Belle vidéo !\nSuper !\nJ'aime !",
      "comment_order": "sequential"
    }
  }'
```

Cela créera 3 tâches indépendantes qui s'exécuteront immédiatement.

### Commentaires Programmés

Utilisez `start_time` pour planifier le moment de début d'exécution de la tâche :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Commentaire programmé !"
    },
    "start_time": "14:30"
  }'
```

### Commentaires avec Insertion d'Emojis

Activez l'insertion automatique d'emojis pour rendre les commentaires plus engageants :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "C'est fantastique",
      "insert_emoji": true
    }
  }'
```

### Commenter par Mode Liste de Noms d'Utilisateur

Créez directement des tâches de commentaire pour des comptes spécifiques :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Belle vidéo !"
    }
  }'
```

### Commentaires en Masse sur Plusieurs Appareils

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Contenu génial !\nTravail excellent !\nJ'adore tellement !",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Exemple de Commentaire Instagram

La même API s'applique aux publications Instagram :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Belle photo ! 📸",
      "insert_emoji": true
    }
  }'
```

### Exemple de Commentaire avec Image TikTok

Joignez une image à votre commentaire TikTok (non supporté sur Instagram) :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Regardez cette image !",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Chemins d'Images
`comment_image_path` peut être :

- **Chemin absolu** : `C:/images/my_image.jpg` ou `/home/user/images/my_image.jpg`
- **Chemin relatif** : `my_image.jpg` (relatif à `work_dir/upload/`)

:::

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

## Ordre des Commentaires

### Ordre Aléatoire (`random`)

- Sélectionne aléatoirement un commentaire dans la liste fournie
- Adapté pour rendre les commentaires plus naturels
- Comportement par défaut

### Séquentiel (`sequential`)

- Sélectionne les commentaires dans l'ordre selon `job_count`
- La première tâche utilise le premier commentaire, la deuxième tâche utilise le deuxième commentaire, etc.
- Revient au début lorsque la fin de la liste est atteinte
- Adapté pour distribuer différents commentaires entre plusieurs tâches

## Formats d'URL de Publications

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## Meilleures Pratiques

1. **Variez vos commentaires** : Fournissez plusieurs options de commentaires pour éviter d'avoir l'air de spam.

2. **Utilisez le mode séquentiel pour la diversité** : Lorsque vous commentez plusieurs publications avec le même appareil, utilisez l'ordre `sequential` pour distribuer différents commentaires.

3. **Activez l'insertion d'emojis** : Définissez `insert_emoji: true` pour rendre les commentaires plus naturels et engageants.

4. **Planifiez les tâches** : Utilisez le paramètre `start_time` pour espacer les commentaires dans le temps, réduisant les chances de déclencher des limites de fréquence.

5. **Respectez les limites de la plateforme** : Ne créez pas trop de tâches de commentaires à la fois. La plupart des plateformes ont des limites de fréquence pour les commentaires.

## Codes d'Erreur

| Code | Description |
|------|-------------|
| 40001 | URL de publication cible manquante ou contenu de commentaire manquant |
| 40003 | Ce script n'est pas supporté par l'API |
| 40301 | L'accès à l'API nécessite un plan Pro+ |

## Voir Aussi

- [API de Gestion des Tâches](./task-management.md) - Créer, lister et gérer les tâches
- [Configuration du Script de Publication](./post-script.md) - Configurer les paramètres du script de publication
- [Configuration du Script de Suivi](./follow-script.md) - Configurer les paramètres du script de suivi
- [Vue d'ensemble de l'API Locale](./local-api.md) - Vue d'ensemble de l'API et démarrage rapide
