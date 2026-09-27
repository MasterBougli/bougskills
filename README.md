# BougSkills

Skill Codex personnel de Bougli, conçu pour travailler en français avec un mélange de pédagogie patiente et d'exécution professionnelle rapide.

## Fonctionnalités

- réponses concises mais approfondies ;
- questions et hypothèses explicites ;
- protection des informations sensibles ;
- processus de sécurité par niveaux, de la modélisation des menaces à la validation finale ;
- passation structurée vers une session fraîche pour éviter les boucles de raisonnement ;
- sélection automatique d'un mode adapté à chaque type de demande ;
- séparation entre faits, hypothèses, inconnues et décisions pour fiabiliser le raisonnement ;
- formats de sortie adaptés à chaque mode de travail ;
- scénarios de tests comportementaux pour vérifier le skill et prévenir les régressions ;
- journal des décisions structurantes dans [`DECISIONS.md`](DECISIONS.md) ;
- composition avec les skills spécialisés installés, sans charger de contexte inutile ;
- gestion active du contexte pour limiter les répétitions et les dérives des sessions longues ;
- boucle d'apprentissage contrôlée pour intégrer les corrections sans créer de fausses mémoires ;
- garde-fous d'exécution pour maîtriser le périmètre, les autorisations et les arrêts ;
- délégation contrôlée pour paralléliser les tâches sans perdre la cohérence ni la responsabilité finale ;
- analyse d'impact avant les changements importants ou transversaux ;
- reconnaissance ciblée des projets existants avant conception ou modification ;
- traçabilité des exigences vers les décisions, fichiers, tests et documentation ;
- définition explicite des critères qui permettent de déclarer une tâche terminée ;
- vérification des informations évolutives avec des sources adaptées et datées ;
- utilisation encadrée des commandes, scripts, navigateurs et services externes ;
- mode Audit transversal pour les sites, boutiques, applications, API et services ;
- protocole universel de preuves, confiance, dates, limites et relecture contradictoire ;
- sécurité avancée avec autorisation par cible, exceptions datées et contrôle des applications IA ;
- qualité de livraison couvrant tests utiles, dépendances, secrets, CI/CD et retour arrière ;
- audit statique des skills installés au premier usage, avec avertissement sur les credentials, uploads, télémétries et appels externes ;
- pré-vérification obligatoire des données, destinations, fournisseurs, autorisations et options de désactivation avant une action externe ;
- nettoyage local et conservateur des marqueurs Unicode invisibles, avec copie de sortie et rapport ;
- entretien adaptatif avant une fonctionnalité non triviale, couvrant la feature de A à Z ;
- vérification des versions, tests et différences Git ;
- version propre dans `VERSION` et mise à jour distante contrôlée, jamais silencieuse ;
- création guidée de projets depuis zéro ;
- mode verrouillé avec progression et raccourci conversationnel `/nouveau-projet` ;
- génération progressive de la documentation projet.

## Installation

Référentiel officiel : [github.com/MasterBougli/bougskills](https://github.com/MasterBougli/bougskills).

Installer le dépôt depuis sa racine avec le gestionnaire de skills Codex, ou copier le dossier complet `bougskills` dans le répertoire de skills Codex. Si l'outil demande un chemin dans le dépôt GitHub, utiliser la racine contenant `SKILL.md`, et non un sous-dossier `references/` ou `scripts/`.

Après l'installation ou la mise à jour, utiliser BougSkills au tour ou dans la session suivante. Avant de lui faire confiance, vérifier que le dossier installé contient `SKILL.md`, `agents/openai.yaml`, `references/` et `scripts/`, et que le frontmatter indique `name: bougskills`.

Il n'y a pas de commande obligatoire propre à ce skill. BougSkills fonctionne à partir de la demande formulée et charge les références adaptées au besoin.

Les outils de maintenance utilisent Node.js 18+ et ses modules intégrés, sans paquet npm externe. Aucune installation de dépendances n'est nécessaire. `clean-content` est également fourni en Node.js pour éviter un second runtime. L'application d'une mise à jour utilise la commande système `tar`, présente sur les environnements récents de Windows, macOS et Linux. Avant extraction, l'outil refuse les liens et types tar spéciaux, limite l'archive à 30 Mio, son contenu décompressé à 128 Mio et le nombre d'entrées à 20 000.

### Vérifier ou mettre à jour BougSkills

La version locale est conservée dans [`VERSION`](VERSION). Pour vérifier la version publique sans modifier le dossier :

```sh
npm run update
```

Pour ne pas contacter GitHub :

```sh
npm run update -- --skip-remote
```

Une mise à jour n'est jamais silencieuse. Après vérification et autorisation explicite, utiliser `npm run update -- --apply` ; le script télécharge l'archive officielle, vérifie sa structure, crée une sauvegarde datée et restaure la copie en cas d'échec. Voir [`references/gestion-version-skill.md`](references/gestion-version-skill.md).

## Utilisation

Mentionner explicitement `BougSkills` ou demander directement l'action souhaitée. Le skill sélectionne automatiquement un mode de travail :

Pour démarrer explicitement une création guidée, écrire `/nouveau-projet` suivi de la demande. Cela active un raccourci conversationnel ; les skills ne peuvent pas créer de commandes natives dans l'interface Codex.

- réponse simple ou explication pédagogique ;
- exploration et questions une par une ;
- conception et choix d'architecture ;
- cadrage de développement avec questions une par une avant une feature non triviale ;
- création guidée de projet ;
- modification, diagnostic ou débogage ;
- revue de sécurité ou revue finale ;
- audit global avec plan, rapport, preuves et classifications de gravité ;
- passation vers une nouvelle session ;
- résumé copiable du contexte.

## Fonctionnement important

### Création d'un projet depuis zéro

Lorsqu'un nouveau projet est demandé, BougSkills crée la structure documentaire, puis pose une seule question à la fois pour remplir les fichiers :

Le mode verrouillé crée aussi `docs/.bougskills/progression.md`. Il bloque l'implémentation et les décisions structurantes tant que la question actuelle n'a pas reçu de réponse. Après chaque réponse, les documents concernés et la progression sont mis à jour avant de poser la question suivante.

- `README.md` ;
- `LICENCE.md` ;
- `CONTRIBUTING.md` ;
- `AGENTS.md` avec les instructions propres au projet, sans mémoire personnelle ni secrets ;
- `docs/PRD.md` ;
- `docs/design-style.md` ;
- `docs/Architecture.md` ;
- `docs/Agent.md` ;
- `docs/Security.md` ;
- `docs/Code-Style.md` ;
- `docs/testing.md` ;
- `CHANGELOG.md` si le projet le justifie.

### Sécurité

Le protocole sécurité adapte le niveau de contrôle au projet. Il couvre la modélisation des menaces, les secrets, les permissions, les entrées, les dépendances, les tests, les headers, les sauvegardes, le monitoring et la checklist avant mise en ligne.

Un test actif contre un hôte réel nécessite toujours une autorisation explicite et un périmètre confirmé.

Avant le premier usage de BougSkills, les skills installés sont inspectés statiquement lorsque l'inventaire est accessible. Bougli est averti des lectures de credentials, installations, télémétries, uploads, fournisseurs externes et limites de l'analyse. Rien n'est exécuté ou envoyé par cet audit.

Avant d'utiliser un skill qui peut envoyer des données, lire des credentials, installer une dépendance ou contacter un service externe, BougSkills identifie précisément les données transmises ou lues, la destination, le fournisseur, l'autorisation et la possibilité de désactivation.

Le résumé d'audit et le préflight suivent un format stable avec une décision `autorisé`, `question nécessaire` ou `bloqué`. Voir [`references/audit-skills-installes.md`](references/audit-skills-installes.md).

### Développement d'une fonctionnalité

Pour une fonctionnalité non triviale, BougSkills commence par un entretien adaptatif et pose une question à la fois. Il vérifie le besoin, les utilisateurs, les parcours et états d'erreur, les données et règles métier, l'architecture, les conventions de code, la sécurité, la performance, les tests, l'observabilité, le déploiement et le rollback. Il présente ensuite un cadrage court avant de modifier le projet. Une correction triviale reste proportionnée.

Pour une fonctionnalité importante, le cadrage peut être conservé dans `docs/` à partir du [gabarit de cadrage](references/gabarit-cadrage-developpement.md), sans remplacer la documentation déjà utilisée par le projet.

Pour un projet important, public, sensible ou durable, BougSkills propose un dossier `docs/preuves-livraison/` contenant les tests, scans, dépendances, décisions, diff, version, déploiement et limites réellement vérifiés. Pour un petit projet, le bilan reste directement dans la réponse.

### Nettoyage de contenu

BougSkills peut inspecter et nettoyer localement certains marqueurs Unicode invisibles dans un fichier texte UTF-8. Le fichier source n'est jamais écrasé, aucun service externe n'est contacté et les caractères potentiellement utiles aux langues ou emojis sont conservés. Voir [`references/nettoyage-contenu.md`](references/nettoyage-contenu.md).

### Audit transversal

Pour demander un audit complet, préciser la cible et le périmètre. BougSkills crée d'abord `Audit/plan-audit.md`, pose les questions nécessaires une par une, puis produit `Audit/rapport-audit.md`. L'audit couvre les aspects pertinents du produit, pas seulement le SEO et la technique : design, UX, responsive, accessibilité, contenu, conversion, parcours, performance, SEO, liens, données produit, confiance, obligations à vérifier, compatibilité moteurs/assistants IA et, pour une application, code, architecture, tests et sécurité.

Chaque constat est classé `bloquant`, `important`, `amélioration recommandée`, `cosmétique` ou `à vérifier avec toi ou un professionnel`, avec une preuve, un impact, une recommandation et un statut de vérification. Voir [`references/mode-audit.md`](references/mode-audit.md).

Des gabarits prêts à copier pour le plan et le rapport sont disponibles dans [`references/gabarits-audit.md`](references/gabarits-audit.md).

Les preuves et niveaux de confiance suivent [`references/protocole-preuves.md`](references/protocole-preuves.md). Les audits sécurité avancés suivent [`references/securite-avancee.md`](references/securite-avancee.md), et les contrôles avant livraison suivent [`references/qualite-livraison.md`](references/qualite-livraison.md).

### Passation entre sessions

Lorsqu'une session devient longue, confuse ou bloquée, demander une passation. BougSkills crée ou met à jour `passation.md` avec l'objectif, le problème, les fichiers, les faits, les hypothèses, les tentatives échouées, l'état Git et la prochaine action.

Dans une nouvelle session, utiliser :

```text
Lis passation.md, vérifie l'état réel des fichiers et de Git, puis reprends exactement à partir de la prochaine action recommandée. Ne répète pas les tentatives marquées comme échouées. Signale toute contradiction entre passation.md et l'état réel avant de modifier quoi que ce soit.
```

### Tests du skill

Les scénarios d'évaluation se trouvent dans [`tests/scenarios.md`](tests/scenarios.md). Ils couvrent les demandes simples, la création de projet, les modifications, le diagnostic, la sécurité, les secrets, la passation et la mise en ligne.

La notation, les seuils de qualité et le journal de régression sont définis dans [`tests/grille-evaluation.md`](tests/grille-evaluation.md).

Pour calculer un score normalisé, fournir les 11 notes dans l'ordre des critères ; chaque critère N/A demande une justification :

```sh
npm run score -- --scores '2,2,2,2,2,N/A,2,2,2,2,2' --na-reasons '6=La demande est une explication sans enjeu de sécurité applicative'
```

Plusieurs justifications se séparent avec `|`, par exemple `6=hors sujet|7=aucun fichier à préserver`. Pour signaler un échec critique, ajouter `--critical-failure` ; il prévaut sur le score calculé.

Les cas limites sont couverts par `npm test` et exécutés aussi par GitHub Actions sur Windows, macOS et Linux.

Les choix durables du skill et leurs conséquences sont conservés dans [`DECISIONS.md`](DECISIONS.md). Une décision importante doit être mise à jour avec la documentation concernée.

Pour les tâches techniques spécialisées, BougSkills coordonne les skills adaptés au domaine au lieu de dupliquer leurs instructions. Les règles personnelles, de sécurité, de version, de test et de communication restent applicables.

Pour les sessions longues, BougSkills conserve uniquement le contexte utile et déclenche une passation structurée lorsque les réponses deviennent répétitives, contradictoires ou bloquées.

Les corrections et préférences sont classées avant d'être conservées. Une correction ponctuelle ne devient pas automatiquement une règle permanente ; les décisions structurantes sont documentées dans `DECISIONS.md`.

Les tâches à risque disposent de conditions d'arrêt explicites : BougSkills s'arrête pour demander une décision lorsqu'une autorisation, une information ou un choix structurant manque.

Les modifications importantes sont précédées d'une analyse d'impact couvrant les dépendances, données, contrats, sécurité, tests, documentation, déploiement et retour arrière.

Avant d'agir dans un projet existant, BougSkills inspecte les instructions locales, l'état Git, la structure, la stack, les versions et les tests, sans afficher les secrets.

Pour les projets importants, il peut maintenir une matrice `docs/traceability.md` reliant chaque exigence à son implémentation, ses tests et sa documentation.

Une tâche n'est déclarée terminée que lorsque son objectif et ses preuves sont vérifiés ; sinon le statut est `partiel`, `bloqué` ou `terminé sous conditions`.

Les informations susceptibles d'évoluer — versions, lois, prix, recommandations ou services — sont vérifiées avec des sources primaires et datées lorsque c'est nécessaire.

Les outils externes sont utilisés avec un périmètre minimal, en lecture seule lorsque possible, sans secrets dans les commandes ou les logs.

Les tâches parallélisables peuvent être déléguées avec un périmètre et un format de retour explicites, mais la vérification finale reste toujours dans le contexte principal.

Pour vérifier automatiquement la structure du skill, ses références, ses liens internes, son frontmatter et quelques motifs de secrets :

```sh
npm run validate
```

Le script ne remplace pas les tests comportementaux : il vérifie l'intégrité du dépôt, tandis que les scénarios vérifient les décisions du skill.

La même validation est exécutée automatiquement par GitHub Actions à chaque push sur `main` et chaque pull request.

## Création de projet

Le workflow de création guidée se trouve dans [`references/creation-projet.md`](references/creation-projet.md). Il pose une question à la fois et documente progressivement le projet.

## Licence

Ce projet est distribué sous licence MIT. Voir [`LICENCE.md`](LICENCE.md).
