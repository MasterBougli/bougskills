# Journal des décisions de BougSkills

Ce fichier conserve les décisions structurantes du skill. Il ne contient pas de secrets ni de données personnelles sensibles.

## ADR-001 — Français et style de collaboration

- Statut : Acceptée
- Date : 2026-09-26
- Portée : comportement général

### Contexte
Boug souhaite un assistant en français, à la fois pédagogue, professionnel, rapide, concis et capable d'expliquer en profondeur lorsque nécessaire.

### Décision
Répondre en français par défaut avec un ton direct, humain et patient. Adapter la profondeur à la demande et challenger les risques ou incohérences de manière pédagogique.

### Alternatives
- Réponses uniquement très courtes — rejetées car elles peuvent manquer d'explication.
- Réponses toujours longues — rejetées car elles ralentissent les demandes simples.

### Conséquences
- Positives : communication cohérente et adaptée à Boug.
- Négatives : le niveau de détail doit être calibré à chaque demande.

### Références
- `SKILL.md`
- `references/formats-reponses.md`

## ADR-006 — Audit transversal avec livrables séparés

- Statut : Acceptée
- Date : 2026-09-26
- Portée : audit de sites, boutiques, applications, API et services

### Contexte

Un audit utile doit couvrir l'expérience réelle du produit, son contenu, sa conversion, sa sécurité et sa qualité technique, pas uniquement le SEO.

### Décision

Ajouter un mode Audit qui crée d'abord `Audit/plan-audit.md`, puis `Audit/rapport-audit.md`. Chaque constat doit comporter une preuve et l'une des cinq classifications définies par Boug. Les domaines non applicables, partiels ou non vérifiables doivent être déclarés.

### Alternatives

- Utiliser uniquement la revue finale — rejeté car elle ne fournit pas un parcours d'audit assez détaillé.
- Produire uniquement une checklist SEO/technique — rejeté car trop étroit pour un produit réel.

### Conséquences

- Positives : audits reproductibles, lisibles et adaptés aux sites comme aux applications.
- Négatives : un audit complet demande davantage de cadrage et de preuves.

### Références

- `references/mode-audit.md`
- `references/modes.md`

## ADR-002 — Création guidée de projet

- Statut : Acceptée
- Date : 2026-09-26
- Portée : création de projet

### Contexte
Un nouveau projet doit commencer avec une structure documentaire claire et des décisions explicites.

### Décision
Créer la structure de base du projet et poser une seule question à la fois pour remplir les documents avant l'implémentation.

### Alternatives
- Poser toutes les questions d'un coup — rejetées pour réduire la charge cognitive.
- Commencer directement le code — rejeté car les décisions structurantes seraient implicites.

### Conséquences
- Positives : meilleur cadrage et documentation exploitable.
- Négatives : le démarrage peut demander plusieurs échanges.

### Références
- `references/creation-projet.md`

## ADR-003 — Sécurité par défaut

- Statut : Acceptée
- Date : 2026-09-26
- Portée : développement, audit et mise en ligne

### Contexte
Le code produit doit réduire les risques de sécurité sans appliquer des contrôles inutiles au projet.

### Décision
Adapter le protocole sécurité au niveau du projet, protéger les secrets, vérifier les entrées, permissions, dépendances et déploiements, et exiger une autorisation avant tout test actif contre une cible réelle.

### Alternatives
- Appliquer uniquement une checklist web — rejetée car trop étroite.
- Autoriser les tests actifs sans confirmation — rejeté pour des raisons de sécurité et d'autorisation.

### Conséquences
- Positives : défense en profondeur et limites d'autorisation explicites.
- Négatives : certaines validations demandent davantage de temps.

### Références
- `references/protocole-securite.md`

## ADR-004 — Passation vers une session fraîche

- Statut : Acceptée
- Date : 2026-09-26
- Portée : sessions longues, debug et collaboration entre agents

### Contexte
La compression du contexte ne supprime pas toujours les impasses ou hypothèses erronées accumulées.

### Décision
Créer `passation.md` avec l'état vérifiable du travail, puis reprendre dans une nouvelle session qui vérifie les fichiers et Git avant d'agir.

### Alternatives
- Continuer uniquement dans la même session — rejeté lorsque le raisonnement tourne en boucle.
- Résumer uniquement dans le chat — moins durable et moins vérifiable.

### Conséquences
- Positives : réduction du bruit historique et meilleure reprise.
- Négatives : une étape supplémentaire est nécessaire pour documenter la passation.

### Références
- `references/passation-session.md`

## ADR-005 — Modes et contrats de sortie

- Statut : Acceptée
- Date : 2026-09-26
- Portée : comportement et qualité des réponses

### Contexte
Une question simple, un diagnostic, une modification et un audit sécurité ne doivent pas suivre le même processus.

### Décision
Sélectionner un mode principal et utiliser un format de sortie adapté, avec des priorités explicites en cas de chevauchement.

### Alternatives
- Un processus unique pour toutes les demandes — rejeté car trop lourd ou insuffisant selon le cas.

### Conséquences
- Positives : réponses plus proportionnées et vérifications adaptées.
- Négatives : le routage doit rester correctement maintenu.

### Références
- `references/modes.md`
- `references/formats-reponses.md`

## ADR-007 — Preuves, autorisation par cible et qualité de livraison

- Statut : Acceptée
- Date : 2026-09-26
- Portée : audits, sécurité et livraisons

### Contexte

Les audits peuvent produire des conclusions trop fortes, des actions actives mal cadrées ou des validations fondées uniquement sur un pourcentage de couverture.

### Décision

Imposer un protocole commun de preuves et de confiance, conserver l'autorisation active par cible dans le contexte principal, documenter les exceptions de sécurité avec une échéance, et évaluer la qualité réelle des tests, dépendances et workflows CI/CD avant une livraison.

### Alternatives

- Faire confiance au rapport du skill spécialisé — rejeté car BougSkills doit vérifier la cohérence finale.
- Utiliser uniquement la couverture de tests — rejeté car elle ne mesure pas la pertinence des assertions.

### Conséquences

- Positives : conclusions plus fiables, actions externes mieux limitées et livraisons plus vérifiables.
- Négatives : les audits et revues finales demandent davantage de preuves et de documentation.

### Références

- `references/protocole-preuves.md`
- `references/securite-avancee.md`
- `references/qualite-livraison.md`

## ADR-008 — Audit de confiance des skills et préflight des actions externes

- Statut : Acceptée
- Date : 2026-09-26
- Portée : premier usage, composition de skills et outils externes

### Contexte

Un skill tiers peut lire des credentials, installer des dépendances, envoyer des données ou contacter un fournisseur sans que la demande initiale l'ait rendu évident.

### Décision

Au premier usage, BougSkills effectue un audit statique en lecture seule de l'inventaire disponible et avertit Boug des risques et limites. Avant toute action externe ou sensible, il identifie les données, la destination, le fournisseur, l'autorisation et la désactivation possible.

### Conséquences

- Positives : moins de confiance implicite, meilleure visibilité sur les fuites et les fournisseurs.
- Négatives : un contrôle initial ajoute du temps et peut rester limité par l'accès aux sources.

### Références

- `references/audit-skills-installes.md`
- `references/outils-externes.md`

## ADR-009 — Entretien adaptatif avant une fonctionnalité non triviale

- Statut : Acceptée
- Date : 2026-09-26
- Portée : conception et développement

### Contexte

Une demande de code peut laisser de côté des états d'interface, règles métier, contraintes de sécurité, impacts opérationnels ou critères de réussite.

### Décision

Avant une fonctionnalité non triviale, poser des questions une par une, proposer les compromis et couvrir le besoin de bout en bout avant l'implémentation. Le niveau de détail reste proportionné au risque et les hypothèses sont explicites et réversibles.

### Conséquences

- Positives : moins d'oublis, décisions plus traçables et code mieux aligné avec le besoin réel.
- Négatives : le démarrage d'une feature peut être plus lent, surtout lorsque le périmètre est encore flou.

### Références

- `references/entretien-developpement.md`
- `references/analyse-impact.md`
