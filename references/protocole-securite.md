# Protocole de sécurité de BougSkills

Ce protocole s'applique à tout projet qui manipule du code, des données, des utilisateurs, des identités, des paiements, des fichiers, des intégrations externes, une interface web, une API ou un agent.

## Niveau de sécurité à choisir

Choisir le niveau le plus élevé qui correspond au projet :

- **Niveau A — standard** : projet local, prototype sans données sensibles ni exposition réseau importante.
- **Niveau B — applicatif** : application web, API, authentification, données utilisateur ou déploiement public.
- **Niveau C — élevé** : paiement, santé, données personnelles importantes, privilèges administrateur, secrets critiques, multi-tenant ou infrastructure sensible.

Ne pas appliquer mécaniquement des contrôles web à un script local. Expliquer les contrôles non pertinents et conserver les contrôles réellement nécessaires.

## Étape 1 — Comprendre la surface d'attaque

Avant de coder ou de corriger, identifier :

- les utilisateurs et leurs niveaux de privilège ;
- les données sensibles et leur cycle de vie ;
- les entrées contrôlées par un utilisateur ou un système externe ;
- les composants, services, dépendances et frontières de confiance ;
- les secrets, clés, tokens, cookies et fichiers de configuration ;
- les interfaces exposées : web, API, CLI, fichiers, webhooks, workers ou agents ;
- les conséquences d'une compromission : confidentialité, intégrité, disponibilité et traçabilité.

Pour un projet de niveau B ou C, produire dans `docs/Security.md` un modèle de menaces simple, avec les risques, contrôles, responsables et décisions reportées. Utiliser STRIDE ou une analyse équivalente lorsque cela clarifie réellement le système.

## Étape 2 — Contrôles de conception

Vérifier avant implémentation :

- authentification robuste et adaptée au risque ;
- autorisation vérifiée côté serveur sur chaque ressource sensible ;
- séparation des privilèges et principe du moindre privilège ;
- validation côté serveur avec listes d'autorisation et limites de taille ;
- protection contre la divulgation excessive d'informations ;
- gestion explicite des erreurs sans stack trace ni secret en production ;
- opérations sensibles idempotentes et protégées contre les relectures ou courses ;
- limites de débit et protection contre l'abus lorsque l'interface est exposée ;
- journalisation utile sans données sensibles ni tokens ;
- stratégie de sauvegarde, récupération et réponse aux incidents si les données sont importantes.

## Étape 3 — Contrôles d'implémentation

Appliquer selon la technologie :

- ne jamais stocker de secret dans le code, les logs, le dépôt ou les exemples ;
- utiliser HTTPS et des cookies `HttpOnly`, `Secure` et `SameSite` lorsque des sessions web sont utilisées ;
- protéger les requêtes qui modifient l'état contre CSRF si le navigateur envoie automatiquement les credentials ;
- encoder les sorties selon leur contexte : HTML, attribut, URL, JavaScript ou CSS ;
- éviter `eval`, `innerHTML`, `document.write`, les handlers inline et toute exécution de code depuis une entrée utilisateur ;
- assainir le HTML riche avec une liste d'autorisation stricte ;
- valider les URLs, redirections, uploads, chemins de fichiers et webhooks ;
- utiliser des requêtes paramétrées et éviter la concaténation SQL, shell ou template ;
- configurer CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` et la protection anti-frame lorsqu'ils s'appliquent ;
- restreindre CORS aux origines réellement nécessaires ;
- ne pas désactiver une protection uniquement pour faire disparaître une erreur.

## Étape 4 — Dépendances et chaîne d'approvisionnement

Avant d'ajouter une dépendance : vérifier son rôle, sa maintenance, sa licence, sa provenance et ses alternatives déjà présentes. Préférer une dépendance maintenue et minimale.

Avant une livraison : analyser les dépendances, fichiers et conteneurs avec les outils disponibles dans le projet. Utiliser par exemple `npm audit`, `yarn audit`, `pip-audit`, `safety`, `osv-scanner`, `trivy`, `grype` ou `bandit` selon la stack. Ne pas installer un outil ou télécharger une base sans expliquer l'action et vérifier les contraintes de l'environnement.

Documenter les vulnérabilités acceptées, les faux positifs et les mises à jour reportées. Une absence d'outil n'est pas une preuve d'absence de vulnérabilité.

## Étape 5 — Tests et revue sécurité

Créer ou vérifier des tests pour :

- refus d'accès sans authentification ;
- refus d'accès à une ressource d'un autre utilisateur ou tenant ;
- validation des entrées invalides, trop longues et inattendues ;
- contrôle des uploads, URLs, redirections et fichiers ;
- protection CSRF si applicable ;
- encodage et rendu du contenu utilisateur ;
- erreurs, limites de débit et réponses de production ;
- rotation, expiration et révocation des sessions ou tokens ;
- absence de secrets dans les logs et réponses.

Pour un test actif contre une URL, une IP ou un hôte réel : demander explicitement l'autorisation, confirmer le périmètre et les limites, puis refuser les tests de déni de service, de bourrage d'identifiants, d'exfiltration ou contre des cibles tierces. Proposer sinon une revue statique ou un environnement local.

## Étape 6 — Validation finale

Avant de déclarer le projet sûr :

1. relire les changements avec le diff Git ;
2. rechercher les secrets et données personnelles accidentels ;
3. lancer les tests et scanners disponibles ;
4. vérifier les dépendances et fichiers de lock ;
5. vérifier la configuration de production et les messages d'erreur ;
6. vérifier les versions et changelogs ;
7. classer les problèmes par sévérité, preuve, impact et correction ;
8. signaler ce qui n'a pas pu être vérifié.

Ne jamais garantir qu'un projet est « sécurisé » au sens absolu. Dire précisément ce qui a été contrôlé, dans quel périmètre et avec quelles limites.

## Format d'un résultat sécurité

Utiliser ce format pour une revue ou un audit :

```text
Résumé :
Périmètre :
Niveau appliqué :

Constats :
- [Critique/Élevé/Moyen/Faible] titre — preuve — impact — correction proposée

Contrôles effectués :
Limites et éléments non vérifiés :
Priorité de correction :
```
