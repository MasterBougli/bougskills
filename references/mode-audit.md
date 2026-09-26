# Mode Audit transversal

## Objectif

Le mode Audit sert à examiner un produit dans son ensemble, pas uniquement son SEO ou sa technique. Il s'applique à un site web, une boutique, une API, une application mobile, une application desktop ou un service composé de plusieurs composants.

Il produit d'abord un plan, puis un rapport vérifiable. Il ne prétend jamais avoir contrôlé ce qui n'a pas pu être observé ou testé.

## Livrables

Créer, dans le projet audité, le dossier `Audit/` s'il n'existe pas :

- `Audit/plan-audit.md` avant l'exécution ;
- `Audit/rapport-audit.md` après l'exécution ;
- `Audit/preuves/` uniquement si des captures, exports ou journaux non sensibles sont réellement utiles.

Si l'audit est très volumineux, le rapport peut être séparé par domaine dans plusieurs fichiers `.md`. Chaque fichier doit alors reprendre la légende des classifications et son périmètre.

Utiliser les structures prêtes à remplir de [references/gabarits-audit.md](gabarits-audit.md) afin de garder des audits homogènes et comparables.

Appliquer aussi le [protocole universel des preuves](protocole-preuves.md), et charger [securite-avancee.md](securite-avancee.md) pour les contrôles de sécurité ou actifs. Pour une application, compléter avec [qualite-livraison.md](qualite-livraison.md).

## Questions, une par une

Demander uniquement les informations manquantes, dans cet ordre :

1. Quelle cible doit être auditée : dépôt local, URL, préproduction, application installée ou autre ?
2. S'agit-il d'un site, d'une boutique, d'une API, d'une application ou d'un ensemble de composants ?
3. Quel est le périmètre autorisé : lecture statique seulement, navigation, ou tests actifs limités ?
4. Quel est l'objectif prioritaire et existe-t-il une date ou une contrainte de mise en ligne ?
5. Quels accès de test peuvent être fournis sans transmettre de mot de passe ou de secret dans le chat ?

Ne pas demander une autorisation active si l'audit reste strictement local et statique. Toute requête vers un hôte réel, tout scan ou toute action pouvant modifier un état exige une autorisation explicite, la cible exacte, le périmètre, les limites et une procédure d'arrêt.

## Plan d'audit

Avant de tester, remplir `Audit/plan-audit.md` avec :

- objectif, cible, type de produit et périmètre ;
- environnement et date de l'observation ;
- domaines applicables et domaines explicitement hors périmètre ;
- méthode, outils envisagés et niveau d'accès ;
- règles d'autorisation, limites de charge et conditions d'arrêt ;
- données nécessaires et protections prévues ;
- livrables attendus et critères de fin ;
- inconnues et hypothèses ;
- état : `planifié`, `en cours`, `partiel`, `terminé sous conditions` ou `terminé`.

Le plan doit être adapté à la cible : ne pas appliquer une checklist e-commerce à une API qui n'en possède pas, mais signaler `non applicable` plutôt que d'oublier silencieusement un domaine.

## Parcours de contrôle web

Pour un site ou une boutique, examiner lorsque le périmètre le permet :

- design, identité et cohérence visuelle ;
- expérience utilisateur, navigation, recherche et compréhension des parcours ;
- affichage mobile, tablette et ordinateur ;
- accessibilité, clavier, focus, contraste, structure sémantique, formulaires et alternatives ;
- textes, fautes, clarté, ton de marque et cohérence éditoriale ;
- structure des pages, hiérarchie des contenus, titres et appels à l'action ;
- produits, catégories, filtres, tri et facettes ;
- conversion, confiance, réassurance et appels à l'action ;
- panier, compte, recherche, paiement et tunnel d'achat ;
- performance, poids des ressources, chargements, erreurs et stabilité ;
- SEO, indexation, canonical, métadonnées, sitemap, robots.txt et données structurées ;
- liens cassés, redirections, pages 404 et boucles de navigation ;
- cohérence des prix, stocks, variantes, taxes et informations produits ;
- réseaux sociaux, avis et preuves de confiance ;
- mentions légales, confidentialité, cookies, CGU, CGV, livraison, retours et informations obligatoires à vérifier ;
- compatibilité avec les moteurs de recherche et les assistants IA : contenu compréhensible, données structurées, informations fiables, accès contrôlé et absence de dépendance à un rendu impossible à interpréter.

Compléter, selon le besoin, avec les skills spécialisés de design, SEO, performance, accessibilité, code review et cybersécurité. BougSkills coordonne ces compétences sans recopier leurs instructions.

## Parcours de contrôle application ou API

Pour une application non web, examiner les éléments applicables :

- architecture, responsabilités, dépendances et contrats entre composants ;
- qualité, lisibilité, erreurs, dette technique et cohérence du code ;
- authentification, autorisation, isolation des tenants et gestion des sessions ;
- validation des entrées, secrets, chiffrement, données sensibles, logs et messages d'erreur ;
- dépendances, supply chain, configuration, permissions et surface d'exposition ;
- résilience, concurrence, reprise sur erreur, sauvegardes et migrations ;
- performance, consommation de ressources, réseau et fonctionnement hors ligne si prévu ;
- tests unitaires, intégration, contrat, système, sécurité et couverture des chemins critiques ;
- accessibilité et ergonomie si une interface existe ;
- compatibilité des plateformes, versions supportées et installation/mise à jour ;
- observabilité, alertes, support, journalisation et plan de retour arrière ;
- documentation, déploiement, conformité et compatibilité avec les moteurs ou assistants IA lorsqu'ils font partie du produit.

## Fiche de constat obligatoire

Chaque problème doit avoir sa propre section dans le rapport, avec cette structure :

```markdown
## [important] AUD-001 — Titre court

- Classification : important
- Domaine : sécurité
- Statut de vérification : confirmé | probable | à vérifier
- Localisation : fichier, écran, URL, composant ou parcours
- Preuve : observation, test, capture ou référence reproductible
- Impact : utilisateurs, données, activité, conformité ou maintenance
- Recommandation : correction proposée et priorité
- Validation attendue : test ou observation qui permettra de clôturer le constat
```

Les classifications autorisées sont exactement :

- `bloquant` : empêche une mise en ligne, un usage essentiel ou crée un risque critique ;
- `important` : risque ou défaut significatif à corriger rapidement ;
- `amélioration recommandée` : amélioration utile sans blocage immédiat ;
- `cosmétique` : détail visuel ou éditorial à faible impact ;
- `à vérifier avec toi ou un professionnel` : décision nécessitant une validation de Bougli, du propriétaire, d'un juriste, d'un expert sécurité ou d'un autre professionnel.

Ne pas confondre la classification avec le statut de vérification. Une obligation légale incertaine doit généralement être classée `à vérifier avec toi ou un professionnel`, avec la juridiction et la source indiquées, plutôt que présentée comme un avis juridique.

## Rapport final

`Audit/rapport-audit.md` doit contenir :

1. résumé exécutif et décision proposée ;
2. périmètre, date, environnement, accès et limites ;
3. points positifs et contrôles réussis ;
4. tableau de couverture : audité, partiel, non applicable ou non vérifiable ;
5. constats classés dans l'ordre `bloquant`, `important`, `amélioration recommandée`, `cosmétique`, `à vérifier avec toi ou un professionnel` ;
6. quick wins, plan priorisé et dépendances ;
7. conditions avant mise en ligne ou livraison ;
8. index des preuves et tests réalisés ;
9. éléments non vérifiés et question à poser à Bougli ou au professionnel concerné ;
10. statut de fin selon `references/definition-terminaison.md`.

Ne jamais inclure de clé, token, mot de passe, donnée personnelle inutile ou contenu confidentiel dans le plan, le rapport, les preuves ou les logs. Masquer les valeurs sensibles et conserver uniquement le fait vérifiable nécessaire.
