---
sidebar_position: 9
---

# Configuration de la marque blanche

:::info Abonnement annuel requis
La fonction de marque blanche est réservée aux utilisateurs **avec abonnement annuel**. Après l'achat d'un plan annuel, veuillez contacter le service client via [Telegram](https://t.me/tikmatrix_agent_bot) pour obtenir le code de déverrouillage.
:::

La fonction de marque blanche vous permet de personnaliser l'identité de marque de TikMatrix pour correspondre à l'image de votre entreprise. Vous pouvez modifier le nom de l'application, le logo et les informations de marque pour créer une version personnalisée de TikMatrix.

## Fonctionnalités

### Paramètres de base

- **Nom de l'application** : Personnalisez le nom d'affichage de l'application
- **Téléchargement du logo** : Téléchargez votre logo principal personnalisé (128x128px recommandé)
- **Icône du site web** : Définissez une icône personnalisée pour l'application

### Paramètres de marque

- **Email de support** : Adresse email du support client
- **Lien tutoriel** : Lien personnalisé vers des tutoriels/documentation
- **Lien Telegram** : Définissez le lien vers votre groupe ou canal Telegram

### Commutateurs de fonctionnalités

- **Afficher le lien tutoriel** : Contrôlez l'affichage du lien tutoriel
- **Afficher les informations de marque** : Contrôlez l'affichage des informations de marque

## Méthodes de configuration

### Méthode 1 : Configuration via l'interface

1. Lancez l'application TikMatrix
2. Cliquez sur l'icône de palette 🎨 dans la barre de titre
3. Configurez les paramètres dans la boîte de dialogue des paramètres de marque blanche :
   - **Nom de l'application** : Entrez le nom personnalisé de votre application
   - **Logo principal** : Téléchargez votre fichier logo (PNG/JPG, 128x128px recommandé)
   - **Email de support** : Entrez votre adresse email de support
   - **Lien tutoriel** : Entrez votre lien tutoriel personnalisé
   - **Lien Telegram** : Entrez le lien de votre groupe/canal Telegram
   - **Commutateurs de fonctionnalités** : Activez/désactivez l'affichage du lien tutoriel et des informations de marque
4. Cliquez sur "Enregistrer" pour appliquer les paramètres

### Méthode 2 : Fichier de configuration

1. Copiez le fichier de configuration exemple :

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Modifiez le fichier de configuration :

   ```json
   {
     "appName": "Nom de votre application",
     "logo": {
       "main": "/chemin/vers/votre/logo.webp",
       "favicon": "/chemin/vers/votre/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@votreentreprise.com",
       "tutorialUrl": "https://votreentreprise.com/docs",
       "telegramUrl": "https://t.me/votregroupe"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Enregistrez le fichier et redémarrez l'application

### Méthode 3 : Outil en ligne de commande

1. Accédez au répertoire du projet :

   ```bash
   cd tikmatrix-desktop
   ```

2. Exécutez l'outil de configuration :

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Suivez les instructions pour configurer progressivement chaque paramètre

## Construire une version personnalisée

### 1. Préparer les fichiers de ressources

```bash
# Placez vos fichiers logo aux emplacements corrects
src/assets/your-logo.webp       # Logo principal
public/your-favicon.ico        # Icône web
src-tauri/icons/               # Icônes d'application (diverses tailles)
```

### 2. Configurer les paramètres de construction

Utilisez l'outil en ligne de commande ou modifiez manuellement la configuration :

```bash
# Utiliser l'outil en ligne de commande
node scripts/whitelabel-config.js

# Ou modifier manuellement
src/config/whitelabel-build.json
```

### 3. Construire l'application

```bash
# Mode développement
npm run dev

# Construction de production
npm run build

# Construire l'application Tauri
npm run tauri build
```

## Priorité de configuration

Le système utilise les configurations dans l'ordre de priorité suivant :

1. **Configuration d'exécution** : `whitelabel_config` dans le LocalStorage du navigateur
2. **Configuration de construction** : `src/config/whitelabel-build.json` (utilisé lors de la construction)
3. **Configuration exemple** : `examples/whitelabel-config.json`
4. **Configuration par défaut** : Valeurs par défaut intégrées

## Exigences du logo

### Logo principal

- **Format** : PNG, JPG ou SVG
- **Taille** : 128x128px (recommandé)
- **Arrière-plan** : Arrière-plan transparent (format PNG)
- **Usage** : Barre de titre, écran de démarrage, boîte de dialogue À propos

### Icône du site web

- **Format** : ICO ou PNG
- **Taille** : 32x32px ou 16x16px
- **Usage** : Onglet du navigateur, icône de fenêtre

### Icône d'application (pour la construction)

- **Format** : PNG, ICO, ICNS
- **Taille** : 32x32, 128x128, 256x256, 512x512
- **Emplacement** : Répertoire `src-tauri/icons/`

## Intégration API

### API JavaScript

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Obtenir la configuration actuelle
const config = getWhiteLabelConfig();

// Enregistrer une nouvelle configuration
saveWhiteLabelConfig(newConfig);

// Réinitialiser aux valeurs par défaut
resetWhiteLabelConfig();

// Valider la configuration
validateWhiteLabelConfig(config);
```

### Fonctions utilitaires

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Initialiser la marque blanche au démarrage de l'application
initWhiteLabel();

// Mettre à jour le titre du document
updateDocumentTitle('Nom de votre application');

// Mettre à jour l'icône
updateFavicon('/chemin/vers/favicon.ico');
```

## Meilleures pratiques

### Conception du logo

- Utilisez des images haute résolution pour un affichage net
- Maintenez une image de marque cohérente sur toutes les tailles de logo
- Testez le logo sur des fonds clairs et sombres
- Assurez-vous que le logo reste lisible en petite taille

### Cohérence de la marque

- Utilisez des couleurs et polices cohérentes dans toute l'interface
- Alignez-vous avec vos directives de marque existantes
- Testez l'interface personnalisée sur différentes tailles d'écran
- Maintenez une apparence professionnelle

### Configuration des liens

- Utilisez HTTPS pour tous les liens externes
- Testez tous les liens avant le déploiement
- Assurez-vous que les canaux de support sont correctement surveillés
- Maintenez les liens de documentation à jour

## Dépannage

### Problèmes courants

**Le logo ne s'affiche pas :**

- Vérifiez les chemins de fichiers et les permissions
- Validez que le format d'image est pris en charge
- Assurez-vous que la taille de l'image est appropriée
- Videz le cache du navigateur et redémarrez l'application

**La configuration n'est pas enregistrée :**

- Vérifiez les permissions du système de fichiers
- Validez que la syntaxe JSON est correcte
- Assurez-vous que le répertoire de configuration existe
- Essayez d'exécuter en tant qu'administrateur (si nécessaire)

**Échec de la construction :**

- Validez que tous les fichiers de ressources existent
- Vérifiez la syntaxe du fichier de configuration
- Assurez-vous que les formats de fichiers d'icônes sont corrects
- Consultez les journaux de construction pour les erreurs spécifiques

### Obtenir de l'aide

Si vous rencontrez des problèmes lors de la configuration de la marque blanche :

1. Consultez la section de dépannage ci-dessus
2. Vérifiez la syntaxe du fichier de configuration
3. Contactez le support technique via [Telegram](https://t.me/tikmatrix_agent_bot)
4. Incluez votre fichier de configuration et les messages d'erreur lors du signalement de problèmes

## Licence et utilisation

- La fonction de marque blanche est réservée aux utilisateurs avec abonnement annuel
- Les droits de personnalisation de la marque sont inclus dans votre abonnement
- La distribution de versions personnalisées peut nécessiter une licence supplémentaire
- Contactez le service client pour les options de licence d'entreprise

---

**Besoin d'un code de déverrouillage ?** Veuillez contacter l'équipe de support via [Telegram](https://t.me/tikmatrix_agent_bot) avec les détails de votre abonnement annuel.
