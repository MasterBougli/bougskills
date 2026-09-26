# Utilisation sûre des outils externes

## Objectif

Utiliser les outils, commandes, scripts, navigateurs, scanners et services externes de manière proportionnée, traçable et sûre.

## Avant utilisation

Vérifier :

- que l'outil est nécessaire à la prochaine décision ;
- qu'il est disponible et adapté à l'environnement ;
- ce qu'il lit, modifie, télécharge ou publie ;
- les permissions, le réseau, les coûts et les effets externes ;
- les données qui pourraient apparaître dans les arguments, logs ou sorties ;
- la commande de retour arrière si l'action modifie un état.

Avant une recherche, un navigateur ou un appel de service, anonymiser les requêtes et URL : supprimer paramètres, fragments, tokens, identifiants, chemins privés et données personnelles non indispensables. Utiliser le domaine public ou une requête générique lorsque cela suffit. Une donnée identifiante ne peut être transmise qu'après validation explicite de Bougli et justification de sa nécessité.

## Confirmation au moment de l'action

Demander l'autorisation de l'utilisateur juste avant chaque appel externe effectif, même si le même fournisseur ou le même périmètre a déjà été autorisé dans la session. Une autorisation précédente sert à préparer le préflight, mais ne vaut pas confirmation pour une nouvelle requête, un nouvel upload, une nouvelle installation ou une nouvelle modification distante.

La demande doit résumer : l'action exacte, les données transmises, la destination, le fournisseur, le périmètre, le coût ou l'effet attendu, et la possibilité de désactivation ou de retour arrière. Sans réponse positive claire, ne pas déclencher l'action.

Commencer par une inspection en lecture seule lorsque c'est possible. Ne pas installer un outil ou une dépendance uniquement par habitude.

## Règles d'exécution

- Utiliser le minimum de droits et le périmètre le plus étroit.
- Éviter les commandes destructives, globaux non contrôlés et chaînes opaques.
- Vérifier les chemins et cibles exacts avant une suppression, un déplacement ou un écrasement.
- Ne jamais placer de secret dans une commande, une URL, un argument, un log ou un fichier temporaire.
- Préférer les paramètres structurés et les fichiers de configuration sûrs aux chaînes construites dynamiquement.
- Limiter la durée, le volume et le nombre de tentatives d'une opération externe.
- Ne pas contourner une confirmation, une permission, un contrôle de sécurité ou une limitation de réseau.
- Pour un service externe, vérifier le compte, la cible, l'environnement et le coût avant l'envoi.
- Pour un navigateur, distinguer clairement lecture d'une page, authentification et action qui change un état.

## Résultat et traçabilité

Après utilisation, noter :

- outil et objectif ;
- périmètre et autorisation ;
- résultat utile ;
- fichiers ou états modifiés ;
- erreurs ou limites ;
- prochaine action.

Ne pas recopier une sortie volumineuse ou sensible dans le contexte. Conserver seulement les extraits nécessaires à la décision.

## Échec d'un outil

Si l'outil échoue :

1. distinguer erreur de commande, outil absent, permission, réseau et état du projet ;
2. ne pas conclure que le projet est défaillant sans preuve ;
3. essayer une alternative sûre si elle reste dans le périmètre ;
4. demander une autorisation ou une installation seulement si elle est nécessaire ;
5. signaler clairement ce qui n'a pas pu être vérifié.

Ne pas multiplier les tentatives identiques sans nouvelle information.

## Outils offensifs ou cibles réelles

Tout outil qui envoie des requêtes à une URL, une IP ou un hôte réel nécessite une autorisation explicite, un périmètre confirmé et des limites d'intensité. Les tests de déni de service, bourrage d'identifiants, exfiltration et cibles tierces sont refusés.
