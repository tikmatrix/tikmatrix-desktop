---
sidebar_position: 3
title: Configuration du Script de Publication
description: Référence complète de configuration du script de publication
---

Cette page documente les paramètres de configuration du script `post` utilisé lors de la création de tâches.

## Vue d'ensemble

Le script `post` permet de publier automatiquement du contenu (vidéos ou images) sur TikTok ou Instagram. Il supporte plusieurs méthodes de publication, sources de matériel et options audio.

## Configuration du Script (`script_config`)

L'objet `script_config` contient les paramètres du script de publication. Voici les paramètres disponibles :

### Paramètres Communs (TikTok et Instagram)

| Paramètre | Type | Requis | Valeur par défaut | Description |
|------|------|------|--------|------|
| content_type | integer | Non | 0 | Type de contenu : `0` = vidéo, `1` = image |
| image_count | integer | Non | 1 | Nombre d'images à sélectionner (lorsque content_type = 1) |
| captions | string | Non | "" | Texte de légende de la publication. Supporte le format spintax : `{option1\|option2\|option3}` |
| post_way | string | Non | "share" | Méthode de publication : `share`, `addButton` ou `useSound` |
| material_source | string | Non | "materialLibrary" | Source du matériel : `materialLibrary` (bibliothèque de matériel) ou `localFolder` (dossier local), ignoré si material_list est fourni |
| material_path | string | Conditionnel | "" | Chemin du dossier local (requis lorsque material_source = "localFolder") |
| material_list | string[] | Non | [] | **Tableau direct de chemins de fichiers de matériel.** Lorsque ce paramètre est fourni, la logique de material_source et material_path est ignorée. Recommandé pour les scénarios d'automatisation API. |
| materials_tags | string | Non | "" | Tags de matériel séparés par des virgules, pour filtrer depuis la bibliothèque de matériel |
| upload_wait_time | integer | Non | 30 | Secondes d'attente pour la fin du téléchargement |
| sound_wait_time | integer | Non | 10 | Secondes d'attente pour le chargement de l'audio |
| add_sound | string/integer | Non | "-1" | Options audio : `-1` = par défaut, `0` = désactivé, `1` = activé, `custom` = utiliser audio personnalisé |
| sound_name | string | Conditionnel | "" | Nom/URL de l'audio (requis lorsque post_way = "useSound") |
| custom_sound_keyword | string | Conditionnel | "" | Mot-clé pour rechercher l'audio personnalisé (requis lorsque add_sound = "custom") |
| origin_sound_volume | integer | Non | 50 | Volume audio d'origine (0-100) |
| add_sound_volume | integer | Non | 50 | Volume audio ajouté (0-100) |

### Paramètres Spécifiques TikTok

| Paramètre | Type | Requis | Valeur par défaut | Description |
|------|------|------|--------|------|
| add_product_link | integer | Non | 0 | Ajouter un lien produit : `0` = non, `1` = oui |

### Paramètres Spécifiques Instagram

| Paramètre | Type | Requis | Valeur par défaut | Description |
|------|------|------|--------|------|
| placement | string | Non | "reel" | Emplacement de publication : `reel` (reel) ou `story` (story) |

## Exemples

### Tâche de Publication Basique - Passage Direct de Chemins de Matériel

C'est la méthode recommandée pour l'automatisation API - passage direct de chemins de fichiers de matériel, sans dépendre de la bibliothèque de matériel ou du scan de dossier :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Regardez ma nouvelle vidéo ! #tendance #recommandé",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Publication avec Bibliothèque de Matériel (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Regardez ma nouvelle vidéo ! #tendance #recommandé",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "tendance, danse",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### Créer une Tâche de Publication par Liste de Noms d'Utilisateur

Ce mode vous permet de créer directement des tâches pour des comptes spécifiques, sans connaître leurs numéros de série d'appareil :

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Regardez ma nouvelle vidéo ! #tendance #recommandé",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### Publication avec Dossier Local (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Contenu incroyable ! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### Publication avec Audio Personnalisé

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "Dansez sur cette musique tendance !",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "musique danse tendance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### Publication avec URL Audio Spécifique

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "Utilisez cette super musique !",
      "material_source": "materialLibrary"
    }
  }'
```

### Publication d'Images (Carrousel)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "Regardez ces photos ! #galerie",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## Réponse

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

## Documentation Associée

- [API de Gestion des Tâches](./task-management.md) - Créer, lister et gérer les tâches
