# Définition de tâche terminée

## Principe

Une tâche est terminée lorsque son objectif est atteint, que les preuves attendues sont disponibles et que les limites restantes sont explicitement connues. « Le code existe » ou « la commande ne renvoie pas d'erreur » ne suffit pas.

## Critères communs

Avant de déclarer une tâche terminée, vérifier :

- l'objectif demandé est couvert ;
- le périmètre réel correspond au périmètre annoncé ;
- les décisions importantes sont confirmées ou documentées comme hypothèses ;
- les fichiers concernés sont identifiés ;
- les tests ou vérifications adaptés ont été exécutés ;
- les erreurs et cas limites importants sont traités ;
- la sécurité et les secrets ont été contrôlés lorsque pertinent ;
- les versions et changelogs existants sont cohérents ;
- la documentation nécessaire est à jour ;
- le diff Git ne contient pas de changement inattendu ;
- les limites et éléments non vérifiés sont écrits dans le bilan.

## Types de validation

Ne pas confondre les validations :

- **validation technique** : le code, les tests, la configuration et les vérifications annoncées produisent les résultats attendus ;
- **validation de Bougli** : Bougli confirme une préférence subjective, un parcours, un texte, un choix visuel, stratégique ou produit ;
- **validation professionnelle** : un juriste, expert sécurité, comptable, responsable métier ou autre personne compétente confirme un sujet qui dépasse une simple vérification technique.

Une tâche peut être techniquement terminée mais rester `terminée sous conditions`, `bloquée` ou `à vérifier avec toi ou un professionnel` tant que la validation adaptée manque. Ne pas exiger une validation humaine pour une correction purement mécanique déjà couverte par des preuves suffisantes.

## Critères par type de tâche

### Question ou explication

La réponse est terminée si elle répond à la question, distingue les incertitudes importantes et ne prétend pas avoir effectué une action non réalisée.

### Conception

La conception est terminée si l'objectif, les contraintes, l'option recommandée, les compromis, les risques et le plan vérifiable sont définis.

### Création de projet

Le cadrage est terminé si la structure demandée existe, les documents sont remplis ou marqués `À définir`, les décisions critiques sont connues, la validation technique applicable est faite et la prochaine étape d'implémentation est claire. Les choix subjectifs ou métier restent soumis à la validation de Bougli.

### Modification de code

La modification est terminée si le changement demandé est présent, les tests adaptés passent, le diff est vérifié et la version existante a été traitée selon les règles du projet.

Après ce bilan, proposer au maximum trois suites directement liées à la fonctionnalité, classées par priorité. Une proposition ne constitue ni une décision ni une autorisation d'implémentation.

### Diagnostic

Le diagnostic est terminé si les faits sont séparés des hypothèses, la cause la plus probable est justifiée et la prochaine vérification ou correction est claire. Un diagnostic ne doit pas modifier le projet sans demande explicite.

### Débogage

Le débogage est terminé si le problème est reproduit ou caractérisé, la cause est étayée, le correctif est vérifié et un test de non-régression existe lorsque c'est possible.

### Sécurité

La revue sécurité est terminée si le périmètre, le niveau, les contrôles effectués, les constats, les limites, les priorités de correction et les autorisations sont explicitement indiqués. Elle ne doit jamais promettre une sécurité absolue ; une conclusion juridique ou professionnelle reste à confirmer par la personne compétente.

### Revue ou mise en production

La revue est terminée si chaque point critique est validé, hors périmètre avec justification, ou bloqué avec une décision demandée. Le statut doit être `prêt`, `prêt sous conditions` ou `non prêt`.

## Statuts de fin

- **Terminé** : objectif atteint et preuves suffisantes.
- **Terminé sous conditions** : résultat utilisable mais une condition clairement listée reste à satisfaire.
- **Partiel** : une partie est faite, mais l'objectif complet n'est pas atteint.
- **Bloqué** : une information, autorisation ou décision externe manque.
- **Non terminé** : les vérifications ou corrections nécessaires n'ont pas abouti.

Ne pas utiliser `Terminé` lorsque seuls les fichiers ont été créés sans validation du comportement.

## Bilan final

Utiliser le format adapté au mode et inclure :

```text
Statut : <terminé | terminé sous conditions | partiel | bloqué | non terminé>
Objectif : <ce qui était demandé>
Preuves : <tests, fichiers, décisions ou vérifications>
Validation : <technique / Bougli / professionnel / N/A avec raison>
Limites : <ce qui n'est pas vérifié>
Prochaine action : <si nécessaire>
```
