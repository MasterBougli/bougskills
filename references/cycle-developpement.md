# Cycle de développement BougSkills

Ce cycle s'applique aux fonctionnalités non triviales. Il reste proportionné : une correction locale peut regrouper plusieurs phases, mais ne doit pas ignorer une décision critique de sécurité, de données ou de compatibilité.

## Phase 0 — Sécurité et inconnues

- Appliquer le préflight des skills, dépendances et services externes.
- Identifier les données sensibles, frontières de confiance, permissions et risques d'abus.
- Classer les informations manquantes : faits connus, questions connues, standards tacites et inconnues non observées.
- Transformer chaque inconnue critique en question, recherche, prototype ou condition d'arrêt.

## Phase 1 — Besoin et contrat

- Reformuler le problème, les utilisateurs, le résultat attendu et les non-objectifs.
- Définir les entrées, sorties, règles métier, critères de réussite et définition de terminé.
- Décrire les parcours nominaux, les états vides, chargements, erreurs, annulations et reprises.

## Phase 2 — Reconnaissance du projet

- Lire les instructions locales et inspecter la structure, la stack, les versions, les conventions et l'état Git.
- Rechercher les implémentations, tests, contrats, dépendances et intégrations existants.
- Préserver les modifications hors périmètre et signaler les contradictions avant de choisir une direction.

## Phase 3 — Architecture et décisions

- Comparer les options selon complexité, sécurité, coût, performance, maintenance et réversibilité.
- Identifier les migrations, compatibilités, index, événements, tâches asynchrones, contrats et solutions de repli.
- Documenter les décisions, hypothèses, inconnues restantes et impacts sur les consommateurs.

## Phase 4 — Implémentation contrôlée

- Découper en tranches vérifiables, de préférence verticales, plutôt qu'en grand changement opaque.
- Valider les données à chaque couche traversée : interface, frontière, domaine, persistance et sortie.
- Respecter les conventions locales, limiter les abstractions et ne pas ajouter de dépendance sans justification.
- Expliquer brièvement le changement avant de modifier et s'arrêter si le périmètre dérive.

## Phase 5 — Tests et revue

- Tester le comportement utile, les cas limites, les erreurs, les permissions et les régressions.
- Évaluer la qualité des tests : assertions pertinentes, déterminisme, absence de sur-mockage et couverture des chemins critiques.
- Rechercher la cause racine d'un échec avant de modifier ; reproduire, tracer vers le déclencheur initial et utiliser un test discriminant.
- Effectuer une revue indépendante du diff lorsque le risque ou la taille le justifie.

## Phase 6 — Livraison et exploitation

- Vérifier dépendances, lockfile, scripts d'installation, secrets, CI/CD, logs, métriques, alertes et rollback.
- Prévoir feature flag ou activation progressive pour les changements risqués.
- Vérifier la documentation, le changelog, la version existante, le diff Git et les preuves de validation.
- Déclarer explicitement ce qui est validé, non validé, hors périmètre ou soumis à une condition.

## Phase 7 — Passation et apprentissage

- Mettre à jour la documentation et les décisions structurantes.
- Si le travail non terminé doit continuer ailleurs, appliquer `references/passation-session.md` : proposer une passation et attendre l'accord avant l'écriture, sauf demande directe de Bougli.
- Transformer une correction durable en règle seulement si elle est générale, utile et documentée ; ne pas généraliser un accident local.
