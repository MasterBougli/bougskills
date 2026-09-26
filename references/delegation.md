# Délégation contrôlée

## Objectif

Utiliser plusieurs agents uniquement lorsque cela améliore réellement le résultat, la vitesse ou la couverture, sans perdre la cohérence, la sécurité ou la responsabilité finale.

## Quand déléguer

Déléguer lorsqu'une tâche est :

- indépendante et parallélisable ;
- spécialisée et couverte par un skill adapté ;
- longue mais découpable en livrables vérifiables ;
- utile à faire relire par un regard indépendant ;
- composée de plusieurs audits qui ne modifient pas les mêmes fichiers.

Ne pas déléguer une question simple, une décision personnelle de Boug, une action irréversible sans confirmation, ou une tâche dont le contexte serait plus coûteux à transmettre que le travail lui-même.

## Préparer une sous-tâche

Chaque délégation doit préciser :

- objectif concret ;
- périmètre inclus et exclu ;
- fichiers ou données autorisés ;
- état connu et hypothèses ;
- skill spécialisé à utiliser si nécessaire ;
- outils autorisés ;
- interdictions et autorisations ;
- format de retour attendu ;
- critère de réussite ;
- condition d'arrêt.

Ne pas transmettre de secret. Remplacer toute donnée sensible par un placeholder et demander une méthode sûre si elle est indispensable.

## Format de retour

Demander un retour court et structuré :

```text
Statut : terminé | partiel | bloqué
Résultat : <résultat principal>
Fichiers lus : <liste>
Fichiers modifiés : <liste, aucun par défaut>
Faits vérifiés : <preuves>
Hypothèses : <confiance et preuve attendue>
Problèmes : <sévérité et impact>
Tests : <commandes et résultats>
Prochaine action : <si nécessaire>
```

Un agent ne doit pas déclarer une tâche terminée sans preuve correspondant au critère de réussite.

## Coordination

- Donner un propriétaire clair à chaque fichier modifiable.
- Ne pas faire modifier le même fichier par plusieurs agents en parallèle.
- Faire travailler les audits indépendants en lecture seule lorsque c'est possible.
- Attendre les résultats nécessaires avant de lancer une sous-tâche dépendante.
- Conserver les décisions structurantes dans le contexte principal ou `DECISIONS.md`.
- Fusionner les résultats dans le contexte principal, puis vérifier les faits au lieu de faire confiance aveuglément au rapport.
- Ne pas relayer une affirmation non vérifiée comme un fait.

## Sécurité et autorisations

Le contexte principal conserve l'autorité sur :

- les actions externes ;
- les tests contre des hôtes réels ;
- les suppressions, publications et déploiements ;
- les secrets et données sensibles ;
- les décisions de périmètre.

Une délégation ne contourne jamais une autorisation. Un agent délégué doit s'arrêter si son périmètre est insuffisant ou si une action plus risquée devient nécessaire.

## Après la délégation

L'agent principal doit :

1. vérifier que le résultat répond à la demande initiale ;
2. contrôler les fichiers et changements réellement produits ;
3. exécuter les tests ou vérifications nécessaires ;
4. résoudre les contradictions entre rapports ;
5. appliquer les règles de version, sécurité et diff Git ;
6. restituer à Boug un bilan unique et compréhensible.

La délégation accélère le travail, mais ne délègue pas la responsabilité de la conclusion.
