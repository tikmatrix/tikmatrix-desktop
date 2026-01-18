# Configuration du profil professionnel

TikMatrix prend en charge la configuration d'un utilisateur de profil professionnel distinct pour chaque appareil, ce qui est très utile pour utiliser des appareils d'entreprise ou des applications dupliquées.

## Qu'est-ce qu'un profil professionnel

Le profil professionnel (Work Profile) est une fonctionnalité Android qui permet de créer un environnement de travail indépendant sur le même appareil. En configurant différents ID utilisateur, vous pouvez :

- Utiliser normalement TikMatrix sur des appareils gérés par l'entreprise
- Définir différentes configurations utilisateur pour différents environnements d'application
- Réaliser une gestion des appareils et un contrôle des permissions plus précis

## Utiliser l'outil Shelter pour cloner des applications

Avant de configurer le profil professionnel, vous devez utiliser l'outil Shelter pour cloner les applications TikTok et TikMatrix :

### Qu'est-ce que Shelter

Shelter est une application open source qui peut créer et gérer des profils professionnels sur les appareils Android. Elle vous permet d'exécuter des applications en double dans un environnement de travail isolé.

### Installation de Shelter

1. Téléchargez Shelter depuis [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) ou le [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Installez et ouvrez Shelter sur l'appareil
3. Suivez l'assistant de configuration pour créer un profil professionnel

### Cloner les applications requises

Après avoir configuré Shelter, vous devez cloner les applications TikTok et TikMatrix :

1. **Cloner l'application TikTok** :
   - Ouvrez Shelter et accédez à l'onglet "Interface principale"
   - Trouvez TikTok dans la liste des applications
   - Cliquez sur le bouton "Cloner vers le profil professionnel"
   - Attendez la fin du processus de clonage

2. **Cloner l'application TikMatrix** :
   - Dans Shelter, trouvez TikMatrix dans la liste des applications
   - Cliquez sur le bouton "Cloner vers le profil professionnel"
   - Confirmez l'opération de clonage

### Vérifier le succès du clonage

Après un clonage réussi :

- Vous verrez TikTok et TikMatrix avec une icône de porte-documents dans le tiroir d'applications
- Ce sont les versions du profil professionnel des applications
- Les applications originales dans le profil principal restent inchangées

## Comment configurer le profil professionnel

### 1. Ouvrir la barre d'outils de l'appareil

Lorsque votre appareil est connecté et affiché dans l'interface principale de TikMatrix :

1. Double-cliquez sur la carte de l'appareil pour entrer en mode grand écran
2. Une barre d'outils apparaîtra sur le côté droit de l'écran de l'appareil
3. La barre d'outils est réduite par défaut et s'agrandit automatiquement au survol de la souris

### 2. Trouver le bouton du profil professionnel

En bas de la barre d'outils, vous verrez un bouton avec une icône de porte-documents, c'est le bouton de configuration du profil professionnel.

### 3. Définir l'ID utilisateur

1. Cliquez sur le bouton avec l'icône de porte-documents
2. Dans la boîte de dialogue qui apparaît, entrez l'ID utilisateur (par exemple : 10)
3. Cliquez sur le bouton "Enregistrer"

### 4. Confirmer la configuration

Après une configuration réussie, le système affichera le message "Paramètres de l'utilisateur du profil professionnel enregistrés".

## Explication des ID utilisateur

### ID utilisateur courants

- **0** : Utilisateur principal (utilisateur par défaut)
- **10** : Premier utilisateur du profil professionnel
- **11** : Deuxième utilisateur du profil professionnel
- Les ID utilisateur supplémentaires suivent cette logique

### Comment trouver l'ID utilisateur

Si vous n'êtes pas sûr de l'ID utilisateur sur l'appareil, vous pouvez le trouver de la manière suivante :

```bash
adb shell pm list users
```

Ou exécuter dans les outils de débogage de TikMatrix :

```bash
pm list users
```

Exemple de sortie :

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Stockage de la configuration

La configuration du profil professionnel est automatiquement enregistrée dans le fichier `data/work_profile_user.json`, au format suivant :

```json
{
  "Numéro de série de l'appareil 1": "10",
  "Numéro de série de l'appareil 2": "0",
  "Numéro de série de l'appareil 3": "11"
}
```

## Gestion de la configuration des appareils

### Afficher la configuration actuelle

La configuration du profil professionnel de chaque appareil est indépendante, vous pouvez :

1. Définir différents ID utilisateur pour chaque appareil
2. Modifier la configuration utilisateur d'un appareil existant à tout moment
3. Effacer la configuration (entrez une valeur vide et enregistrez pour supprimer la configuration)

### Gestion par lot

Si vous devez gérer un grand nombre d'appareils, vous pouvez modifier directement le fichier `data/work_profile_user.json` :

1. Fermez l'application TikMatrix
2. Ouvrez le fichier de configuration
3. Ajoutez ou modifiez les configurations d'appareils au format JSON
4. Redémarrez TikMatrix

## Dépannage

### Problèmes courants

#### Q : L'exécution de la commande échoue après la configuration du profil professionnel

R : Veuillez vérifier :

- Si l'ID utilisateur est correct
- Si l'utilisateur correspondant existe sur l'appareil
- Si vous avez les permissions suffisantes pour accéder à cet utilisateur

#### Q : Comment annuler la configuration du profil professionnel

R : Dans la boîte de dialogue de configuration, videz le champ d'entrée de l'ID utilisateur, puis cliquez sur Enregistrer.

#### Q : Que faire si la configuration est perdue

R : La configuration est stockée dans un fichier JSON local. Si elle est perdue, vous pouvez la reconfigurer ou restaurer le fichier `data/work_profile_user.json` depuis une sauvegarde.

#### Q : Problèmes liés à Shelter

R : Si vous rencontrez des problèmes liés à Shelter :

- **Échec du clonage** : Assurez-vous d'avoir les permissions administrateur et suffisamment d'espace de stockage
- **Application clonée invisible** : Vérifiez que le profil professionnel dans Shelter est correctement activé
- **Plantage de l'application dans le profil professionnel** : Essayez de recloner l'application ou de mettre à jour Shelter
- **Impossible de trouver l'application clonée** : Recherchez les applications avec une icône de porte-documents dans le tiroir d'applications

## Meilleures pratiques

### Utilisation en environnement d'entreprise

1. **Gestion unifiée** : Définir le même ID utilisateur pour tous les appareils d'entreprise
2. **Séparation des permissions** : Utiliser différents ID utilisateur pour distinguer différents niveaux de permissions
3. **Sauvegarde de la configuration** : Sauvegarder régulièrement le fichier `work_profile_user.json`

### Utilisation personnelle

1. **Isolation des applications** : Définir différents environnements utilisateur pour des applications à usage différent
2. **Environnement de test** : Utiliser un ID utilisateur indépendant pour tester les applications
3. **Protection de la vie privée** : Améliorer la sécurité de la vie privée grâce à la séparation des utilisateurs

### Gestion de l'outil Shelter

1. **Mises à jour régulières** : Maintenir l'application Shelter à jour pour assurer la compatibilité
2. **Synchronisation des applications** : Assurez-vous d'avoir cloné TikTok et TikMatrix avant de configurer le profil professionnel
3. **Sauvegarde des paramètres Shelter** : Exportez et sauvegardez la configuration Shelter pour une récupération facile
4. **Surveillance des mises à jour d'applications** : Lorsque TikTok ou TikMatrix sont mis à jour, vous devrez peut-être mettre à jour les versions clonées

## Notes techniques

La fonctionnalité de profil professionnel est implémentée en ajoutant le paramètre `--user` aux commandes ADB :

```bash
# Sans utiliser le profil professionnel
adb shell input tap 100 200

# Avec le profil professionnel (ID utilisateur : 10)
adb shell --user 10 input tap 100 200
```

Cela garantit que les commandes s'exécutent dans le bon environnement utilisateur, évitant les problèmes de permissions et les conflits d'environnement.

---

En configurant correctement le profil professionnel, vous pouvez utiliser TikMatrix en douceur dans divers environnements d'appareils complexes, améliorant l'efficacité du travail et la commodité de gestion.
