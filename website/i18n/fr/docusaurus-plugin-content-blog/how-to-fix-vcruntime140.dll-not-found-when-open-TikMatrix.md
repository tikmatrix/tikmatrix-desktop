---
slug: How-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: Comment Résoudre l'Erreur "vcruntime140.dll Introuvable"
authors: tikMatrix
tags: [vcruntime140.ddl introuvable, correction, tikmatrix]
---
L'erreur "vcruntime140.dll introuvable" se produit généralement parce que le package redistribuable Microsoft Visual C++ n'est pas installé ou est corrompu. Voici les étapes pour corriger ce problème :
<!--truncate-->
---

1. **Télécharger le Package Redistribuable Microsoft Visual C++** :
   - Rendez-vous sur la [page de téléchargement de Microsoft Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
   - Téléchargez la version appropriée pour votre système (généralement la version 64 bits, mais si votre application nécessite la version 32 bits, téléchargez la version correspondante).

2. **Installer le Package Redistribuable** :
   - Exécutez le programme d'installation téléchargé et suivez les instructions à l'écran pour l'installation.
   - Si vous avez déjà installé ce package, vous pouvez sélectionner l'option "Réparer" pendant le processus d'installation pour réparer l'installation.

3. **Redémarrer l'Ordinateur** :
   - Après avoir installé ou réparé le package, redémarrez votre ordinateur pour vous assurer que toutes les modifications prennent effet.

4. **Vérifier les Mises à Jour** :
   - Assurez-vous que votre Windows est à jour. Allez dans `Paramètres > Mise à jour et sécurité > Windows Update` et vérifiez les mises à jour.

5. **Réinstaller TikMatrix** :
   - Si les étapes ci-dessus ne fonctionnent pas, essayez de désinstaller et de réinstaller TikMatrix. Assurez-vous de télécharger la dernière version depuis le site officiel.

Si l'erreur persiste après avoir essayé ces étapes, vous devrez peut-être vérifier s'il existe d'autres problèmes, tels que des fichiers système corrompus, en exécutant l'outil de vérification des fichiers système :

1. **Exécuter l'Outil de Vérification des Fichiers Système (SFC)** :
   - Ouvrez l'invite de commande en tant qu'administrateur (cliquez avec le bouton droit sur le bouton "Démarrer" et sélectionnez "Invite de commandes (Admin)" ou "Windows PowerShell (Admin)").
   - Tapez `sfc /scannow` et appuyez sur Entrée.
   - Attendez que le processus se termine. Si SFC trouve des problèmes, il tentera de les réparer.

Ces étapes devraient vous aider à résoudre l'erreur "vcruntime140.dll introuvable" et faire fonctionner TikMatrix normalement.
