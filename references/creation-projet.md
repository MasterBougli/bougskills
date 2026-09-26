# Création guidée d'un projet depuis zéro

Ce parcours s'applique lorsqu'un utilisateur demande de créer un projet entièrement nouveau ou de l'initialiser sans structure existante.

Lire aussi [creation-verrouillee.md](creation-verrouillee.md). Le raccourci conversationnel `/nouveau-projet` active ce même parcours ; il ne s'agit pas d'une commande native de l'interface.

## Structure initiale obligatoire

Créer le dossier racine du projet et cette structure :

```text
<projet>/
├── README.md
├── LICENCE.md
├── CONTRIBUTING.md
├── AGENTS.md
└── docs/
    ├── PRD.md
    ├── design-style.md
    ├── Architecture.md
    ├── Agent.md
    ├── Security.md
    ├── Code-Style.md
    └── testing.md
```

Ajouter également `docs/.bougskills/progression.md` pour suivre la question actuelle, les réponses confirmées et la prochaine action autorisée. Ce fichier ne contient ni secret ni mémoire personnelle.

Créer aussi `CHANGELOG.md` lorsque le projet est publié, maintenu par plusieurs personnes, versionné, distribué, ou lorsque l'utilisateur le demande. Ne pas le créer par défaut pour un prototype temporaire si cela ajoute uniquement du bruit.

Respecter les conventions de casse et de nommage demandées. En l'absence de convention, utiliser exactement les noms ci-dessus.

## Règle de dialogue

Poser une seule question à la fois et attendre la réponse avant de poser la suivante. Expliquer brièvement pourquoi l'information est nécessaire et proposer une valeur par défaut lorsqu'elle est raisonnable. Après chaque réponse, mettre à jour les documents et `docs/.bougskills/progression.md` avant de continuer.

Ne pas demander une information déjà connue. Si une déduction est faite, l'annoncer et permettre sa correction. Ne jamais remplir silencieusement une décision structurante à la place de l'utilisateur.

Avant la réponse à la question actuelle, ne pas coder et ne pas choisir une licence, une stack ou une architecture. Utiliser `À définir` lorsque la décision manque.

## Ordre recommandé des questions

Adapter ou sauter une question si la réponse est déjà connue. Après chaque réponse, mettre à jour le document concerné avant de passer à la question suivante.

1. Quel est le nom du projet et dans quel dossier doit-il être créé ? Mettre à jour le dossier, `README.md` et `docs/PRD.md`.
2. Quel problème le projet résout-il, pour qui, et quelle est sa proposition de valeur ? Mettre à jour `README.md` et `docs/PRD.md`.
3. Quelles sont les fonctionnalités indispensables de la première version ? Mettre à jour `docs/PRD.md`.
4. Quelles fonctionnalités sont explicitement hors périmètre ? Mettre à jour `docs/PRD.md`.
5. Quelle licence faut-il utiliser ? Demander confirmation, puis remplir `LICENCE.md` avec le texte approprié.
6. Qui maintient le projet et quelles règles de contribution faut-il suivre ? Remplir `CONTRIBUTING.md`.
7. Quelle stack, quelle plateforme et quelles contraintes techniques sont prévues ? Remplir `docs/Architecture.md`.
8. Quel style visuel, ton, palette, typographie et principes d'interface sont souhaités ? Remplir `docs/design-style.md` si le projet possède une interface.
9. Quel rôle les agents ou assistants doivent-ils jouer dans le projet ? Remplir `docs/Agent.md`.
10. Quelles données sont sensibles et quelles protections sont nécessaires ? Remplir `docs/Security.md`.
11. Quelles conventions de code, de nommage, de structure et de formatage faut-il suivre ? Remplir `docs/Code-Style.md`.
12. Comment le projet doit-il être testé et validé ? Remplir `docs/testing.md`.
13. Le projet doit-il avoir un changelog ? Si oui, créer et initialiser `CHANGELOG.md`.
14. Le projet est-il important, public, sensible ou maintenu dans le temps au point de nécessiter un dossier `docs/preuves-livraison/` ? Si oui, le créer avec son index et le gabarit adapté.

## Contenu minimal des documents

Chaque document doit contenir un titre, un statut (`À définir`, `Brouillon` ou `Validé`), la date de dernière mise à jour et uniquement les décisions connues. Utiliser `À définir` pour les sections nécessaires mais non décidées ; ne pas inventer de contenu.

- `AGENTS.md` : règles propres au projet, commandes autorisées, conventions locales, tests obligatoires, limites de sécurité et règles de livraison. Ne jamais y copier la mémoire personnelle de Bougli, ses credentials, ses règles globales ou des données sensibles.
- `README.md` : objectif, public, fonctionnalités, installation prévue, utilisation et liens vers `docs/`.
- `LICENCE.md` : licence choisie et texte légal complet si disponible.
- `CONTRIBUTING.md` : prérequis, installation locale, workflow, qualité, tests et revue.
- `docs/PRD.md` : problème, utilisateurs, objectifs, périmètre, exigences et critères d'acceptation.
- `docs/design-style.md` : direction visuelle, couleurs, typographie, composants, ton et accessibilité.
- `docs/Architecture.md` : composants, flux, données, intégrations, décisions et compromis.
- `docs/Agent.md` : rôle des agents, limites, outils autorisés et format des comptes rendus.
- `docs/Security.md` : menaces, secrets, données sensibles, authentification, autorisation et journalisation.
- `docs/Code-Style.md` : langage, formatage, nommage, structure et règles de revue.
- `docs/testing.md` : niveaux de tests, outils, cas critiques, commandes et critères de réussite.
- `CHANGELOG.md` : format des versions et première entrée si le projet est versionné.

## Fin du parcours

Après la dernière réponse :

1. relire tous les documents pour détecter contradictions, sections vides et hypothèses non signalées ;
2. proposer les décisions encore manquantes sans bloquer l'implémentation si elles ne sont pas critiques ;
3. vérifier le diff complet ;
4. rechercher les secrets accidentels et les indices de version ;
5. résumer les décisions et demander confirmation avant de commencer l'implémentation si le périmètre reste important.

Le parcours peut être interrompu si l'utilisateur demande de commencer le code. Dans ce cas, conserver les sections inconnues marquées `À définir` et signaler les risques liés aux décisions reportées.
