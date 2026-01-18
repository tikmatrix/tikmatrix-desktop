---
sidebar_position: 9
---

# Migration de licence

Transférez votre licence TikMatrix d'un ordinateur à un autre. Ceci est utile lors de la mise à niveau du matériel ou du changement d'ordinateur.

## Exigences

- Une licence valide sur l'ordinateur actuel (code d'activation ou abonnement Stripe)
- L'ordinateur cible ne doit pas avoir de licence TikMatrix existante
- Maximum de 5 migrations autorisées par mois

## Étapes de migration

### Étape 1 : Ouvrir la boîte de dialogue de migration

1. Lancez TikMatrix sur votre ordinateur actuel
2. Cliquez sur l'**icône de licence** dans la barre de titre
3. Cliquez sur le bouton **"Migrer la licence"**

![Bouton de migration de licence](../img/migrate-button.webp)

### Étape 2 : Obtenir l'ID de la machine cible

Sur l'ordinateur cible :

1. Installez et lancez TikMatrix
2. Cliquez sur l'**icône de licence** dans la barre de titre
3. Copiez l'**ID de machine**
4. Envoyez cet ID à l'ordinateur actuel

![ID de la machine cible](../img/target-machine-id.webp)

### Étape 3 : Valider et migrer

Retour sur l'ordinateur actuel :

1. Collez l'**ID de la machine cible** dans la boîte de dialogue de migration
2. Cliquez sur **"Valider"** pour vérifier la compatibilité
3. Examinez les détails de la licence affichés

![Validation réussie](../img/validation-success.webp)

1. Cochez la case de confirmation
2. Cliquez sur **"Migrer la licence"** et confirmez

![Confirmation de migration](../img/migration-confirm.webp)

### Étape 4 : Finaliser la configuration

1. Attendez la fin de la migration
2. Redémarrez TikMatrix sur l'ordinateur cible
3. Votre licence est maintenant active sur le nouvel ordinateur

![Migration réussie](../img/migration-success.webp)

## Avertissements importants

⚠️ **La migration de licence est irréversible**

- La licence est complètement transférée de l'ordinateur source vers l'ordinateur cible
- Votre ancien ordinateur perd immédiatement l'accès
- Maximum de 5 migrations par mois
- Les deux ordinateurs nécessitent une connexion réseau stable

## Contenu de la migration

### Utilisateurs avec code d'activation

- Statut de la licence et jours restants
- Informations du code de licence

### Utilisateurs avec abonnement Stripe

- Statut de l'abonnement et informations de facturation
- Date de renouvellement et détails du plan

## Dépannage

### Messages d'erreur courants

#### "La machine cible a déjà une licence"

L'ordinateur cible possède déjà une licence active. La migration ne peut être effectuée que vers un ordinateur sans licence existante.

#### "Limite de migration mensuelle dépassée"

Vous ne pouvez effectuer que 5 migrations par mois. Veuillez attendre le mois suivant ou contacter le service client.

#### "Format d'ID de machine invalide"

Assurez-vous d'avoir correctement copié l'ID de machine complet. Il doit contenir au moins 10 caractères.

#### "Échec de la validation de migration"

Vérifiez les points suivants :

- Votre licence actuelle est active et non expirée
- L'ID de la machine cible est correct
- Les deux ordinateurs ont une connexion réseau

### Obtenir de l'aide

Contactez le [support Telegram](https://t.me/tikmatrix_agent_bot) en fournissant :

- Des captures d'écran des messages d'erreur
- Vos ID de machine actuel et cible
- Une description du problème

## Questions fréquentes

**Puis-je migrer vers mon ordinateur d'origine ?**

Oui, mais cela sera compté dans votre limite de migration mensuelle.

**Qu'advient-il de mes connexions d'appareils après la migration ?**

Les connexions d'appareils sont liées à l'ordinateur. Vous devrez reconnecter vos appareils sur le nouvel ordinateur.

**Puis-je migrer une licence d'essai ?**

Non, seules les licences payantes peuvent être migrées.

**La migration affecte-t-elle les jours de licence restants ?**

Non, vos jours restants sont préservés après la migration.
