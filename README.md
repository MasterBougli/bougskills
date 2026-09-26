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

## Création de projet

Le workflow de création guidée se trouve dans [`references/creation-projet.md`](references/creation-projet.md). Il pose une question à la fois et documente progressivement le projet.

## Licence

Ce projet est distribué sous licence MIT. Voir [`LICENCE.md`](LICENCE.md).
