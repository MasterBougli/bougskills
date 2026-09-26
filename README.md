# BougSkills

Skill Codex personnel de Boug, conçu pour travailler en français avec un mélange de pédagogie patiente et d'exécution professionnelle rapide.

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
- vérification des versions, tests et différences Git ;
- création guidée de projets depuis zéro ;
- génération progressive de la documentation projet.

## Installation

Copier le dossier `bougskills` dans le répertoire de skills Codex, puis utiliser le skill `bougskills`.

Il n'y a pas de commande obligatoire propre à ce skill. BougSkills fonctionne à partir de la demande formulée et charge les références adaptées au besoin.

## Utilisation

Mentionner explicitement `BougSkills` ou demander directement l'action souhaitée. Le skill sélectionne automatiquement un mode de travail :

- réponse simple ou explication pédagogique ;
- exploration et questions une par une ;
- conception et choix d'architecture ;
- création guidée de projet ;
- modification, diagnostic ou débogage ;
- revue de sécurité ou revue finale ;
- passation vers une nouvelle session ;
- résumé copiable du contexte.

## Fonctionnement important

### Création d'un projet depuis zéro

Lorsqu'un nouveau projet est demandé, BougSkills crée la structure documentaire, puis pose une seule question à la fois pour remplir les fichiers :

- `README.md` ;
- `LICENCE.md` ;
- `CONTRIBUTING.md` ;
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

### Passation entre sessions

Lorsqu'une session devient longue, confuse ou bloquée, demander une passation. BougSkills crée ou met à jour `passation.md` avec l'objectif, le problème, les fichiers, les faits, les hypothèses, les tentatives échouées, l'état Git et la prochaine action.

Dans une nouvelle session, utiliser :

```text
Lis passation.md, vérifie l'état réel des fichiers et de Git, puis reprends exactement à partir de la prochaine action recommandée. Ne répète pas les tentatives marquées comme échouées. Signale toute contradiction entre passation.md et l'état réel avant de modifier quoi que ce soit.
```

### Tests du skill

Les scénarios d'évaluation se trouvent dans [`tests/scenarios.md`](tests/scenarios.md). Ils couvrent les demandes simples, la création de projet, les modifications, le diagnostic, la sécurité, les secrets, la passation et la mise en ligne.

La notation, les seuils de qualité et le journal de régression sont définis dans [`tests/grille-evaluation.md`](tests/grille-evaluation.md).

Les choix durables du skill et leurs conséquences sont conservés dans [`DECISIONS.md`](DECISIONS.md). Une décision importante doit être mise à jour avec la documentation concernée.

Pour les tâches techniques spécialisées, BougSkills coordonne les skills adaptés au domaine au lieu de dupliquer leurs instructions. Les règles personnelles, de sécurité, de version, de test et de communication restent applicables.

Pour les sessions longues, BougSkills conserve uniquement le contexte utile et déclenche une passation structurée lorsque les réponses deviennent répétitives, contradictoires ou bloquées.

Les corrections et préférences sont classées avant d'être conservées. Une correction ponctuelle ne devient pas automatiquement une règle permanente ; les décisions structurantes sont documentées dans `DECISIONS.md`.

Les tâches à risque disposent de conditions d'arrêt explicites : BougSkills s'arrête pour demander une décision lorsqu'une autorisation, une information ou un choix structurant manque.

Les modifications importantes sont précédées d'une analyse d'impact couvrant les dépendances, données, contrats, sécurité, tests, documentation, déploiement et retour arrière.

Les tâches parallélisables peuvent être déléguées avec un périmètre et un format de retour explicites, mais la vérification finale reste toujours dans le contexte principal.

Pour vérifier automatiquement la structure du skill, ses références, ses liens internes, son frontmatter et quelques motifs de secrets :

```powershell
.\scripts\verify-bougskills.ps1
```

Le script ne remplace pas les tests comportementaux : il vérifie l'intégrité du dépôt, tandis que les scénarios vérifient les décisions du skill.

La même validation est exécutée automatiquement par GitHub Actions à chaque push sur `main` et chaque pull request.

## Création de projet

Le workflow de création guidée se trouve dans [`references/creation-projet.md`](references/creation-projet.md). Il pose une question à la fois et documente progressivement le projet.

## Licence

Ce projet est distribué sous licence MIT. Voir [`LICENCE.md`](LICENCE.md).
