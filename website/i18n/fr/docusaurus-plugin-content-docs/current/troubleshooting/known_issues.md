---
sidebar_position: 2
---

# Problèmes connus

## Erreur de conflit de port

Si le message d'erreur suivant apparaît dans les journaux :

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)"
```

Cela indique un problème de conflit de port. Pour résoudre ce problème :

1. **Redémarrez complètement le logiciel TikMatrix/IgMatrix** puis réessayez
2. **Évitez d'utiliser d'autres logiciels de contrôle en même temps que TikMatrix/IgMatrix**, car ils peuvent provoquer des conflits de port
3. Assurez-vous qu'aucune autre application n'utilise le même port de communication

Cette erreur se produit généralement lorsque plusieurs applications de contrôle d'appareil s'exécutent simultanément, entraînant des conflits de port de communication.

## Échec de script sur téléphone cloud

Veuillez vous assurer autant que possible que la bande passante réseau entre votre ordinateur et le centre de données du téléphone cloud est suffisante et stable. Pour obtenir les meilleurs résultats, il est recommandé de placer l'ordinateur et le centre de données du téléphone cloud dans le même pays ou la même région afin de réduire la latence et la perte de paquets, garantissant ainsi un fonctionnement stable et fiable des tâches d'automatisation.

## Instabilité de l'exécution du script, erreurs aléatoires, résultats incohérents à chaque exécution

Généralement lié à la qualité de la connexion ADB. Si vous utilisez une connexion USB, essayez de changer de câble de données ou de port USB ; si vous utilisez une connexion ADB sans fil, assurez-vous que la connexion réseau entre l'ordinateur et l'appareil est stable et que la force du signal est bonne.

## Échec de script dû à la mise à jour de l'application TikTok/Instagram

Les applications TikTok et Instagram sont mises à jour régulièrement, ce qui peut parfois empêcher les scripts d'automatisation de fonctionner correctement. Veuillez soumettre un ticket, nous mettrons à jour les scripts dès que possible pour nous adapter aux dernières versions des applications.
