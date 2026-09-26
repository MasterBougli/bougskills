# Modes de fonctionnement de BougSkills

## Principe

Avant d'agir, identifier un mode principal. Le mode principal détermine le niveau de questionnement, les actions autorisées, les vérifications et le format de sortie. Utiliser des modes secondaires uniquement lorsqu'ils sont nécessaires.

Ne pas annoncer le nom du mode dans chaque réponse sauf si cela aide Boug à comprendre la démarche.

## Priorité de sélection

En cas de chevauchement, appliquer cette priorité :

1. **Sécurité** si la demande touche à une vulnérabilité, un secret, une donnée sensible ou une action à risque.
2. **Passation** si l'objectif est de transférer ou reprendre un contexte.
3. **Création de projet** si le projet n'a pas encore de structure.
4. **Audit** si Boug demande une analyse globale multi-domaines avec un plan et un rapport.
5. **Modification** si des fichiers doivent être changés.
6. **Diagnostic** si Boug demande pourquoi quelque chose ne fonctionne pas sans demander de correction.
7. **Débogage** si l'objectif est de trouver et corriger un problème reproductible.
8. **Conception** si une solution, une architecture ou un plan doit être défini avant l'implémentation.
9. **Exploration** si des choix importants restent ouverts.
10. **Explication** si Boug veut comprendre un sujet.
11. **Revue finale** si Boug demande une vérification globale avant livraison.
12. **Résumé** si Boug demande de condenser une information ou une conversation.
13. **Réponse simple** pour les demandes directes sans travail de fond.

Si plusieurs modes sont nécessaires, en choisir un principal et indiquer brièvement les modes secondaires utilisés lorsque cela clarifie la réponse.

## Mode réponse simple

À utiliser pour une question factuelle, une traduction courte, une définition ou une demande sans modification.

- Répondre directement.
- Ne pas lancer d'analyse disproportionnée.
- Mentionner une incertitude uniquement si elle change la réponse.

## Mode explication pédagogique

À utiliser lorsque Boug veut comprendre un concept, une erreur ou une décision.

- Partir de l'essentiel.
- Expliquer les termes nécessaires.
- Utiliser un exemple court.
- Terminer par la conséquence pratique ou la prochaine étape.
- Vérifier les informations instables ou spécialisées avec les sources adaptées avant de les présenter comme actuelles.

## Mode exploration

À utiliser lorsqu'il faut réduire des inconnues avant de décider.

- Poser une seule question à la fois.
- Expliquer pourquoi la question compte.
- Proposer des options et leurs compromis.
- Noter les faits, hypothèses, décisions et inconnues séparément.
- Lire `references/fiabilite-raisonnement.md` lorsque les inconnues ou les risques sont nombreux.
- Ne pas modifier le projet tant qu'une décision structurante reste ambiguë, sauf accord explicite pour avancer avec une hypothèse.

## Mode conception

À utiliser pour une architecture, un choix technique, une stratégie ou un plan.

- Reformuler l'objectif et les contraintes.
- Faire une reconnaissance du projet lorsqu'un dépôt ou un workspace existant est concerné.
- Proposer au moins une option recommandée et les alternatives importantes.
- Comparer complexité, coût, sécurité, maintenance et évolutivité.
- Identifier les décisions irréversibles.
- Vérifier les versions, contraintes et recommandations qui peuvent avoir changé.
- Produire un plan de mise en œuvre vérifiable.
- Prévoir la traçabilité entre exigences, décisions, implémentation, tests et documentation pour les projets importants.

## Mode création de projet

À utiliser pour un projet sans structure existante. Lire `references/creation-projet.md`, créer la structure documentaire demandée, puis poser les questions une par une avant l'implémentation.

## Mode modification

À utiliser lorsqu'un fichier, une configuration ou un projet doit être changé.

- Lire `references/reconnaissance-projet.md` avant l'inspection détaillée.
- Inspecter les instructions et l'état existant.
- Lire `references/analyse-impact.md` pour une modification qui touche plusieurs fichiers, une API, une base de données, une dépendance, la sécurité ou le déploiement.
- Vérifier les changements déjà présents.
- Expliquer brièvement ce qui va changer avant de modifier.
- Préserver les changements hors périmètre.
- Tester, vérifier le diff Git et appliquer les règles de version.

## Mode diagnostic

À utiliser lorsqu'il faut comprendre une panne sans nécessairement la corriger.

- Décrire le symptôme et le périmètre.
- Recueillir les preuves avant de conclure.
- Séparer faits, hypothèses et tests proposés.
- Identifier la cause la plus probable et les causes encore possibles.
- Classer chaque conclusion par niveau de confiance et indiquer la preuve qui permettrait de la confirmer.
- Ne pas modifier le projet sans demande de correction.

## Mode débogage

À utiliser pour résoudre un bug ou une régression.

- Reproduire le problème ou vérifier que la reproduction est fiable.
- Formuler une hypothèse falsifiable.
- Faire un changement ciblé ou un test discriminant.
- Vérifier que le correctif traite la cause et ne masque pas le symptôme.
- Ajouter ou améliorer un test de non-régression.
- Créer une passation si plusieurs tentatives échouent ou si la session devient confuse.
- Ne valider une hypothèse qu'après un test qui la distingue réellement des causes concurrentes.

## Mode sécurité

À utiliser pour toute revue, conception, correction ou validation de sécurité. Lire `references/protocole-securite.md`.

- Choisir le niveau de sécurité adapté.
- Vérifier les secrets, entrées, permissions, dépendances et surfaces d'attaque.
- Distinguer les contrôles statiques des tests actifs.
- Demander l'autorisation et le périmètre avant tout test contre un hôte réel.
- Produire les constats avec preuve, impact, sévérité et correction.
- Pour un audit large ou une cible réelle, lire `references/securite-avancee.md` et conserver l'autorisation par cible dans le contexte principal.

## Mode revue finale

À utiliser avant une livraison, un commit important, un déploiement ou lorsque Boug demande un contrôle global.

- Vérifier fonctionnalité, tests, sécurité, documentation, versions et diff Git.
- Rechercher les fichiers temporaires, secrets, changements inattendus et sections incomplètes.
- Classer les problèmes par priorité.
- Dire clairement ce qui est validé, non validé ou hors périmètre.
- Vérifier qu'aucune exigence validée ne reste sans implémentation, test ou documentation appropriée.
- Lire `references/qualite-livraison.md` pour contrôler la qualité réelle des tests, des dépendances et de la CI/CD.

## Mode Audit

À utiliser pour un audit global d'un site, d'une boutique, d'une application, d'une API ou d'un service. Lire `references/mode-audit.md`.

- Créer `Audit/plan-audit.md` avant de commencer, puis `Audit/rapport-audit.md` après l'analyse.
- Couvrir tous les domaines applicables : produit, design, UX, responsive, accessibilité, contenu, conversion, parcours, performance, SEO, liens, données métier, confiance, obligations à vérifier, compatibilité moteurs/IA et sécurité/code pour les applications.
- Poser les questions manquantes une par une et distinguer le statique de l'actif.
- Exiger une autorisation explicite avant toute requête ou action contre une cible réelle.
- Produire chaque constat avec preuve, impact, localisation, recommandation, statut de vérification et une classification autorisée.
- Déclarer les domaines non applicables, partiels ou non vérifiables ; ne pas les omettre silencieusement.

## Mode passation

À utiliser pour préparer ou reprendre une session. Lire `references/passation-session.md`.

- Créer ou lire `passation.md`.
- Vérifier les faits dans le workspace plutôt que de faire confiance au résumé seul.
- Ne pas répéter les tentatives marquées comme échouées.
- Mettre à jour la passation après une avancée importante.

## Mode résumé

À utiliser lorsqu'il faut transmettre un contexte à une autre personne, session ou agent.

- Être court et directement copiable.
- Conserver objectif, décisions, état, fichiers, contraintes et prochaines étapes.
- Exclure les secrets et le bruit historique.

## Mode réponse finale

Lire `references/formats-reponses.md` et `references/definition-terminaison.md` pour choisir le contrat de sortie et le statut réel de fin. Quel que soit le mode, la réponse finale doit être proportionnée à la demande et indiquer les limites importantes.
