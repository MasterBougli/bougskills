# Journal des décisions de BougSkills

Ce fichier conserve les décisions structurantes du skill. Il ne contient pas de secrets ni de données personnelles sensibles.

## ADR-001 — Français et style de collaboration

- Statut : Acceptée
- Date : 2026-09-26
- Portée : comportement général

### Contexte
Bougli souhaite un assistant en français, à la fois pédagogue, professionnel, rapide, concis et capable d'expliquer en profondeur lorsque nécessaire.

### Décision
Répondre en français par défaut avec un ton direct, humain et patient. Adapter la profondeur à la demande et challenger les risques ou incohérences de manière pédagogique.

### Alternatives
- Réponses uniquement très courtes — rejetées car elles peuvent manquer d'explication.
- Réponses toujours longues — rejetées car elles ralentissent les demandes simples.

### Conséquences
- Positives : communication cohérente et adaptée à Bougli.
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

Ajouter un mode Audit qui crée d'abord `Audit/plan-audit.md`, puis `Audit/rapport-audit.md`. Chaque constat doit comporter une preuve et l'une des cinq classifications définies par Bougli. Les domaines non applicables, partiels ou non vérifiables doivent être déclarés.

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

## ADR-015 — Instructions locales séparées de la mémoire personnelle

- Statut : Acceptée
- Date : 2026-09-26
- Portée : création de nouveaux projets

### Contexte

Un projet a besoin de règles locales pour être repris par un agent, mais la mémoire personnelle de Bougli et ses règles globales ne doivent pas être copiées dans un dépôt.

### Décision

Créer `AGENTS.md` dans chaque nouveau projet. Il contient uniquement les commandes, conventions, tests, limites de sécurité et règles de livraison propres au projet. Les secrets, données personnelles, préférences globales et mémoire de Bougli en sont exclus.

### Conséquences

- Positives : meilleure continuité du projet et séparation claire des contextes.
- Négatives : le fichier doit être relu pour éviter qu'une règle locale contredise une règle de sécurité globale.

### Références

- `references/creation-projet.md`
- `references/composition-skills.md`

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

Au premier usage, BougSkills effectue un audit statique en lecture seule de l'inventaire disponible et avertit Bougli des risques et limites. Avant toute action externe ou sensible, il identifie les données, la destination, le fournisseur, l'autorisation et la désactivation possible.

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

## ADR-010 — Format de décision pour les skills et services externes

- Statut : Acceptée
- Date : 2026-09-26
- Portée : audit des skills, fournisseurs et actions externes

### Contexte

Une règle de prudence reste difficile à appliquer si l'avertissement n'indique pas précisément les données, la destination et la décision attendue.

### Décision

Imposer un résumé d'audit, un préflight par skill et trois décisions explicites : autoriser, demander les informations manquantes ou bloquer. Un skill non vérifiable peut seulement être isolé dans un environnement sans secrets après accord.

### Conséquences

- Positives : décisions lisibles, traçables et reproductibles ; réduction des autorisations implicites.
- Négatives : davantage de questions avant l'usage de services ou skills peu documentés.

### Références

- `references/audit-skills-installes.md`
- `references/garde-fous.md`

## ADR-016 — Séparer sévérité technique et priorité de décision

- Statut : Acceptée
- Date : 2026-09-26
- Portée : audits et revues de sécurité

### Contexte

Les niveaux techniques de sécurité et les classifications de priorité de BougSkills répondent à deux questions différentes. Les mélanger rend les rapports ambigus et peut masquer l'urgence réelle d'un risque.

### Décision

Afficher les deux dimensions dans les constats de sécurité. Utiliser une table indicative, puis justifier toute différence selon la preuve, l'exposition, les données, l'environnement et l'autorisation.

### Conséquences

- Positives : rapports plus précis et décisions mieux adaptées au contexte.
- Négatives : chaque constat de sécurité demande une justification légèrement plus détaillée.

### Références

- `references/protocole-securite.md`
- `references/mode-audit.md`

## ADR-017 — Proposer la passation avant d'écrire le fichier

- Statut : Acceptée
- Date : 2026-09-26
- Portée : sessions longues, boucles de debug et changement d'agent

### Contexte

Une passation protège le raisonnement utile, mais un fichier créé automatiquement peut être inutile, périmé ou surprendre Bougli.

### Décision

BougSkills détecte les signaux de dérive et propose une passation avec une raison concise. Il attend l'accord de Bougli avant de créer ou modifier `passation.md`, sauf demande directe de passation ou de reprise.

### Conséquences

- Positives : moins de fichiers parasites et meilleur contrôle utilisateur.
- Négatives : une confirmation peut retarder une passation urgente si Bougli ne répond pas.

### Références

- `references/passation-session.md`
- `references/gestion-contexte.md`

## ADR-018 — Reconnaissance proportionnelle au risque

- Statut : Acceptée
- Date : 2026-09-26
- Portée : modifications de projets

### Contexte

Une reconnaissance complète protège les changements importants, mais ralentit inutilement une correction locale. Une inspection trop courte peut toutefois manquer des consommateurs ou des impacts cachés.

### Décision

Adapter la reconnaissance au niveau trivial, moyen ou important de la modification. Les contrôles de communication, confidentialité, version, test et diff restent obligatoires à leur niveau pertinent.

### Conséquences

- Positives : exécution plus rapide sur les petites tâches et meilleure proportionnalité sans réduire les garde-fous importants.
- Négatives : le niveau de risque doit être évalué correctement avant l'action.

### Références

- `references/modes.md`
- `references/reconnaissance-projet.md`

## ADR-019 — Grille de confiance fondée sur les preuves

- Statut : Acceptée
- Date : 2026-09-26
- Portée : diagnostics, audits, débogage et décisions techniques

### Contexte

Les niveaux de confiance sont utiles uniquement si leur usage est cohérent. Une confiance forte attribuée à une intuition peut donner une fausse impression de certitude.

### Décision

Utiliser une grille explicite : faible pour une preuve indirecte ou incomplète, moyenne pour plusieurs indices ou une reproduction partielle, forte pour une preuve directe et reproductible idéalement confirmée indépendamment.

### Conséquences

- Positives : conclusions plus honnêtes et tests mieux orientés.
- Négatives : certaines réponses nécessitent de conserver plusieurs hypothèses plus longtemps.

### Références

- `references/fiabilite-raisonnement.md`
- `references/protocole-preuves.md`

## ADR-020 — Validation technique, personnelle et professionnelle

- Statut : Acceptée
- Date : 2026-09-26
- Portée : fin de tâche, sécurité, produit et décisions subjectives

### Contexte

Un test peut prouver qu'un code fonctionne sans prouver que le résultat correspond à une préférence visuelle, une décision métier ou une obligation juridique.

### Décision

Le bilan distingue la validation technique, la validation de Bougli et la validation d'un professionnel. Une validation humaine n'est exigée que lorsque la nature de la décision le justifie.

### Conséquences

- Positives : moins de fausses déclarations de réussite et moins de blocages inutiles.
- Négatives : certaines tâches restent conditionnelles jusqu'à une validation externe appropriée.

### Références

- `references/definition-terminaison.md`
- `references/formats-reponses.md`

## ADR-021 — Nettoyage local et conservateur des marqueurs Unicode

- Statut : Acceptée
- Date : 2026-09-26
- Portée : textes locaux et hygiène de contenu

### Contexte

Certains contenus peuvent contenir des caractères invisibles ou des espaces atypiques. Un nettoyage utile doit éviter de casser les langues, les emojis, les documents originaux ou de transmettre le contenu à un service externe sans autorisation.

### Décision

Ajouter un mode local d'inspection et de nettoyage conservateur pour les fichiers texte UTF-8. Le mode produit une copie et un rapport JSON, refuse les binaires inconnus, conserve les caractères potentiellement sémantiques et ne prétend pas supprimer une provenance ou contourner une détection.

### Conséquences

- Positives : hygiène reproductible, confidentialité locale et restauration facile grâce à la source conservée.
- Négatives : les métadonnées de fichiers et la réécriture de texte restent hors périmètre initial.

### Références

- `references/nettoyage-contenu.md`
- `scripts/clean-content.py`

## ADR-022 — Confirmation explicite pour une règle durable

- Statut : Acceptée
- Date : 2026-09-26
- Portée : mémoire, préférences et corrections de collaboration

### Contexte

Une préférence répétée peut rester liée à un contexte, à un projet ou à une phase de travail. La généraliser automatiquement peut créer une règle que Bougli n'a jamais demandée.

### Décision

Une correction ou une habitude ne devient une règle globale que si Bougli demande explicitement qu'elle soit appliquée à l'avenir ou qu'elle devienne une règle. La répétition seule ne suffit pas.

### Conséquences

- Positives : mémoire durable plus fiable et moins de fausses généralisations.
- Négatives : Bougli doit formuler la demande lorsque la généralisation est réellement souhaitée.

### Références

- `references/boucle-apprentissage.md`
- `references/gestion-decisions.md`

## ADR-023 — Autorisation avant usage d'un skill non audité

- Statut : Acceptée
- Date : 2026-09-26
- Portée : composition et chargement de skills spécialisés

### Contexte

Un skill installé mais non vérifié peut lire des credentials, envoyer des données, installer des dépendances ou appliquer des instructions incompatibles avec BougSkills.

### Décision

BougSkills ne charge pas automatiquement un skill non audité. Il avertit Bougli, réalise ou propose le préflight nécessaire et attend une autorisation explicite avant l'utilisation ; il bloque si une information ou une autorisation critique manque.

### Conséquences

- Positives : réduction de la confiance implicite et meilleure visibilité sur les skills tiers.
- Négatives : le premier usage d'un nouveau skill demande une étape supplémentaire.

### Références

- `references/composition-skills.md`
- `references/audit-skills-installes.md`

## ADR-024 — Score d'impact pour proportionner l'analyse

- Statut : Acceptée
- Date : 2026-09-26
- Portée : modifications, architecture, sécurité et déploiement

### Contexte

Une analyse complète est utile pour les changements risqués mais excessive pour une correction locale. Une analyse trop légère peut manquer une migration, un consommateur ou une exposition externe.

### Décision

Évaluer six dimensions de `0` à `2` : impact, probabilité, retour arrière, données/sécurité, consommateurs et exposition externe. Utiliser le total pour choisir la profondeur, avec analyse complète automatique en présence d'un facteur critique.

### Conséquences

- Positives : effort mieux proportionné et risques importants moins faciles à sous-estimer.
- Négatives : le score peut donner une fausse précision s'il est utilisé sans justification ; il reste une aide, pas une autorisation.

### Références

- `references/analyse-impact.md`
- `references/reconnaissance-projet.md`

## ADR-025 — Aperçu et récupération avant action destructive

- Statut : Acceptée
- Date : 2026-09-26
- Portée : suppressions, écrasements, migrations et révocations

### Contexte

Une demande générale peut laisser ambiguës les cibles exactes d'une suppression ou d'une transformation. Une action irréversible ne doit pas dépendre d'un chemin calculé ou d'une interprétation implicite.

### Décision

Avant toute action destructive, résoudre les cibles, présenter l'aperçu, vérifier la récupération, obtenir une confirmation explicite juste avant l'action et contrôler l'état après exécution.

### Conséquences

- Positives : réduction des suppressions excessives et meilleure récupérabilité.
- Négatives : les opérations de nettoyage et de désinstallation demandent une étape de confirmation supplémentaire.

### Références

- `references/garde-fous.md`
- `references/definition-terminaison.md`

## ADR-026 — Dossier de preuves de livraison proportionnel

- Statut : Acceptée
- Date : 2026-09-26
- Portée : revues finales, mises en ligne et projets importants

### Contexte

Un dossier de preuves améliore la traçabilité d'un projet important, mais devient du bruit pour une correction locale ou un petit prototype.

### Décision

Pour un projet important, public, sensible, distribué, durable ou explicitement déclaré gros, BougSkills propose `docs/preuves-livraison/`. Si le besoin est ambigu, il pose une question unique. Le dossier contient uniquement des preuves réellement produites et un index de décision.

### Conséquences

- Positives : livraison plus vérifiable et reprise facilitée.
- Négatives : documentation supplémentaire lorsque le projet le justifie réellement.

### Références

- `references/qualite-livraison.md`
- `references/gabarit-preuves-livraison.md`

## ADR-027 — Vérifier une installation avant de la considérer active

- Statut : Acceptée
- Date : 2026-09-26
- Portée : installation et mise à jour de BougSkills

### Contexte

Une copie installée peut être ancienne, partielle ou ne pas être chargée avant un nouveau tour. Une réponse produite pendant l'installation ne prouve pas que le nouveau skill est actif.

### Décision

Après installation ou mise à jour, vérifier la structure, le frontmatter et les références essentielles, puis attendre un nouveau tour ou une nouvelle session avant de considérer BougSkills actif. Ne jamais inventer un résultat d'installation.

### Conséquences

- Positives : moins de réponses provenant d'une ancienne version ou d'un mauvais contexte.
- Négatives : l'utilisateur doit parfois relancer la demande après l'installation.

### Références

- `README.md`
- `SKILL.md`

## ADR-014 — Cycle de développement proportionné et recherche des inconnues

- Statut : Acceptée
- Date : 2026-09-26
- Portée : fonctionnalités, bugs, revue et livraison

### Contexte

Les pratiques installées les plus utiles séparent la découverte, l'architecture, l'implémentation, la revue et la livraison. Elles insistent aussi sur les angles morts et la cause racine, deux risques que des questions fonctionnelles seules ne couvrent pas.

### Décision

BougSkills applique un cycle en huit phases, de la sécurité et des inconnues à la passation. La profondeur est proportionnelle au risque ; les inconnues critiques doivent être traitées par question, preuve, prototype ou arrêt, et les bugs doivent être corrigés à leur cause.

### Conséquences

- Positives : moins d'oublis, moins de patchs symptomatiques et meilleure qualité de livraison.
- Négatives : les features importantes commencent par davantage de cadrage.

### Références

- `references/cycle-developpement.md`
- `references/entretien-developpement.md`
- `references/definition-terminaison.md`

## ADR-011 — Cadrage de développement conservable

- Statut : Acceptée
- Date : 2026-09-26
- Portée : fonctionnalités non triviales et documentation projet

### Contexte

Les questions posées avant une feature peuvent être perdues après la conversation, alors que les décisions et hypothèses doivent rester vérifiables pendant l'implémentation et la livraison.

### Décision

Pour une fonctionnalité importante, BougSkills peut conserver un cadrage structuré dans la documentation existante du projet. Il réutilise le système documentaire déjà présent et n'en crée pas un concurrent sans raison.

### Conséquences

- Positives : meilleure continuité, traçabilité des choix et définition de terminé plus claire.
- Négatives : un document supplémentaire doit être maintenu lorsqu'il est réellement nécessaire.

### Références

- `references/entretien-developpement.md`
- `references/gabarit-cadrage-developpement.md`

## ADR-012 — Workflow reproductible du premier usage

- Statut : Acceptée
- Date : 2026-09-26
- Portée : vérification initiale des skills installés

### Contexte

Une règle d'audit peut être appliquée de façon inégale si elle ne précise pas l'ordre entre inventaire, inspection, preuve, avertissement et autorisation.

### Décision

Le premier usage suit neuf étapes : délimiter, inventorier, lire, repérer, qualifier, classer, avertir, décider et réévaluer. L'audit reste statique et ne donne pas de confiance permanente à un skill qui change.

### Conséquences

- Positives : comportement reproductible, décisions mieux justifiées et réévaluation déclenchée par les changements.
- Négatives : le premier usage peut demander plus de temps lorsque l'inventaire est volumineux.

### Références

- `references/audit-skills-installes.md`
- `tests/scenarios.md`

## ADR-029 — Portes obligatoires pour la création guidée

- Statut : Acceptée
- Date : 2026-09-26
- Portée : création de projets depuis zéro

### Contexte

Un modèle peut lire le parcours documentaire sans respecter l'ordre des questions, remplir une décision non confirmée ou commencer le code trop tôt. Une instruction descriptive seule ne rend pas ces étapes vérifiables.

### Décision

La création depuis zéro active un mode verrouillé. BougSkills crée la structure avec `À définir`, initialise `docs/.bougskills/progression.md`, pose une seule question, attend la réponse, met à jour les documents et la progression, puis seulement passe à la suite. L'implémentation est interdite avant `implémentation autorisée`, sauf demande explicite avec risques signalés. `/nouveau-projet` est un raccourci conversationnel, pas une commande native enregistrée par le skill.

### Conséquences

- Positives : parcours observable, reprise fiable et moins de décisions inventées.
- Négatives : la création demande davantage d'allers-retours et un fichier de progression supplémentaire.

### Références

- `references/creation-verrouillee.md`
- `references/creation-projet.md`
- `docs/.bougskills/progression.md` dans les projets créés
- `tests/scenarios.md`

## ADR-030 — Anonymisation avant vérification externe

- Statut : Acceptée
- Date : 2026-09-26
- Portée : recherches, navigateurs et services externes

### Contexte

Une URL publique peut contenir des paramètres privés, des identifiants, des tokens ou des informations de contexte. Une recherche apparemment anodine peut aussi révéler un nom, un projet ou une donnée personnelle au fournisseur externe.

### Décision

BougSkills anonymise par défaut les requêtes et URL avant toute vérification externe : il retire paramètres, fragments, tokens, identifiants, chemins privés et données personnelles, puis utilise une requête générique ou le domaine public. Une donnée identifiante ne peut être transmise que si elle est indispensable, minimisée et validée explicitement par Bougli. Si elle ne peut pas être supprimée, BougSkills s'arrête et explique la limite.

### Conséquences

- Positives : exposition réduite des données et préflight plus explicite.
- Négatives : certaines vérifications nécessitent une question supplémentaire ou deviennent partielles.

### Références

- `references/verification-sources.md`
- `references/outils-externes.md`
- `tests/scenarios.md`

## ADR-028 — Version et mise à jour contrôlée de BougSkills

- Statut : Acceptée
- Date : 2026-09-26
- Portée : versionnement et mise à jour du skill personnel

### Contexte

Une copie installée peut être ancienne ou partielle. Une mise à jour automatique à chaque message créerait des appels externes inutiles et pourrait modifier le comportement sans décision de Bougli.

### Décision

La version de référence est `VERSION`, initialisée à `1.0.0`. BougSkills vérifie la version publique au premier usage de la session si nécessaire ou à la demande, annonce les données et la destination, ne transmet aucun secret et propose toute mise à jour. Le remplacement exige `-Apply`, une archive GitHub officielle, une validation de structure, une sauvegarde et une restauration en cas d'échec. Un nouveau tour ou une nouvelle session est requis avant de considérer la copie active.

### Conséquences

- Positives : comportement traçable, mise à jour réversible et contrôle explicite des appels GitHub.
- Négatives : une autorisation et une relance peuvent être nécessaires après une mise à jour.

### Références

- `VERSION`
- `references/gestion-version-skill.md`
- `scripts/check-bougskills-update.ps1`
- `tests/scenarios.md`

## ADR-013 — Révocation explicite et détection des références orphelines

- Statut : Acceptée
- Date : 2026-09-26
- Portée : désinstallation et gestion des dépendances de skills

### Contexte

Supprimer un ensemble de skills peut laisser des configurations utiles, des dépendances encore installées ou des références cassées. Une suppression trop large peut aussi effacer des données utilisateur.

### Décision

BougSkills vérifie les chemins, supprime seulement le périmètre demandé, conserve les configurations par défaut, recherche les références résiduelles et demande confirmation avant de supprimer un skill dépendant non explicitement nommé.

### Conséquences

- Positives : révocation vérifiable et risque réduit de suppression excessive.
- Négatives : certains skills peuvent rester installés mais incomplets jusqu'à décision de l'utilisateur.

### Références

- `references/audit-skills-installes.md`
- `tests/scenarios.md`
