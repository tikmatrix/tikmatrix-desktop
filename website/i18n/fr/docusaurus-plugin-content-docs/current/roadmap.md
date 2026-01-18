---
sidebar_position: 1
title: Positionnement et Feuille de Route de TikMatrix/IgMatrix
sidebar_label: Feuille de Route
description: Feuille de route officielle décrivant le positionnement de TikMatrix/IgMatrix dans l'écosystème d'automatisation des opérations, les limites de capacité et les recommandations de déploiement.
slug: roadmap
---

## Carte du Processus Complet

![Feuille de route TikMatrix/IgMatrix](/img/roadmap-zh.svg)

---

## Pour Qui Créons-Nous de la Valeur

- **Équipes PME/MCN/Marques/Équipes d'expérimentation progressive** : Besoin d'exécuter de manière stable des actions opérationnelles "quotidiennes répétitives mais nécessitant une humanisation" sur une échelle de 5 à 100 appareils.
- **Croissance et Opérations de Contenu** : Besoin d'une orchestration de comportements "en masse mais non mécanique" hautement contrôlable, équilibrant stratégie de sécurité et efficacité.

---

## Proposition de Valeur Fondamentale (Pourquoi Choisir TikMatrix/IgMatrix)

1. **Automatisation en Masse Orchestrable** : Construire des pipelines réutilisables avec le modèle "tâche → script → source de données", couvrant la chaîne complète d'actions : échauffement, publication, interaction, collecte.
2. **Humanisation et Stratégie de Contrôle des Risques** : Le moteur dispose de mécanismes de temporisation aléatoire, contrôle du rythme, simulation de gestes homme-machine, récupération après interruption anormale, etc., pour se rapprocher au maximum des caractéristiques de comportement humain réel.
3. **Évolutivité et Stabilité** : Support d'appareils physiques/cloud hybrides, connexion ADB USB/TCP, garantissant une expansion linéaire et un ordonnancement stable de 5 → 20 → 50 → 100 appareils.
4. **Observabilité des Données** : Journaux de tâches, diffusion d'écran d'appareil, statistiques de compte et export de données de résultats.

---

## Carte des Fonctionnalités (Limites de Capacité de l'Étape 4)

### 1) Orchestration et Ordonnancement des Tâches

- Stratégie de concurrence multi-comptes/multi-appareils, ordre d'exécution aléatoire
- Nouvelle tentative en cas d'échec, reprise depuis le point d'arrêt, gestion d'occupation des ressources (médias/comptes/proxies)

### 2) Centre de Scripts

- **Script de Super Marketing** : Intègre déjà les capacités de boost d'utilisateurs/publications, envoi de messages privés en masse, commentaires en masse, etc.
- Script d'échauffement de compte : Navigation quotidienne, temps de séjour, interactions légères
- Script de publication de contenu : Gestion vidéo/texte/tags/sujets, publication programmée
- Script de collecte de données : Extraire les informations de nom d'utilisateur, construire la liste cible du prochain cycle

### 3) Interaction Homme-Machine et Contrôle des Risques

- Randomisation des touchers/glissements/pauses/durées de visionnage
- Détection d'anomalies et limitation de taux, évitant les comportements à haute fréquence ponctuels

> **Déclaration de Limites** : TikMatrix/IgMatrix ne fournit pas les appareils, comptes ou proxies eux-mêmes ; nous nous concentrons sur **l'automatisation des actions opérationnelles**.

---

## Recommandations de Déploiement (De 0 à l'Échelle)

1. **Période de Validation (1-5 appareils)** : Connecter appareil → compte → proxy → boucle fermée minimale d'un seul script
2. **Période Pilote (10-20 appareils)** : Introduire script de super marketing + boucle fermée de collecte de données ; observer les seuils de contrôle des risques
3. **Période d'Extension (20-50 appareils)** : Limitation de vitesse par groupe, stratégie de randomisation, rotation de sources de données multiples
4. **Période d'Échelle (50-100 appareils)** : Ordonnancement par lots, exécution en heures creuses

---

## Avertissement sur les Risques et la Conformité

- L'utilisation d'outils d'automatisation peut violer les conditions de service de la plateforme ; veuillez **assumer vos propres risques** et contrôler raisonnablement la fréquence et les modèles de comportement
- L'environnement matériel du téléphone, les proxies, la qualité du compte et la stratégie opérationnelle affecteront considérablement la stabilité et les résultats

---

## Questions Fréquentes

**Q : TikMatrix fournit-il des comptes/proxies ?**  
R : Non. Nous nous concentrons sur le moteur d'automatisation et l'exécution de scripts.

**Q : Fournissez-vous des téléphones cloud ?**  
R : Non. Les utilisateurs doivent préparer leur propre environnement d'appareils.

**Q : Les téléphones cloud sont-ils pris en charge ?**  
R : Tant qu'ils peuvent être connectés de manière stable via ADB (USB/TCP), ils peuvent être intégrés dans l'ordonnancement.

---

## Appel à l'Action

- Essayez immédiatement le forfait Starter, construisez votre boucle fermée minimale viable "étape 4"
- Lisez la documentation des scripts, maîtrisez rapidement les opérations en masse
