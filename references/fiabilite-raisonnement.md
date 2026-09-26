# Fiabilité du raisonnement

## Objectif

Éviter les conclusions inventées, les hypothèses oubliées et les décisions prises sur une information incertaine. Cette méthode s'applique surtout aux analyses, diagnostics, débogages, conceptions, audits de sécurité et passations.

## Les quatre catégories

### Faits vérifiés

Informations directement observées ou confirmées par une source identifiable : fichier lu, test exécuté, résultat de commande, documentation officielle ou réponse explicite de l'utilisateur.

Un fait doit pouvoir répondre à la question : « comment le savons-nous ? »

### Hypothèses

Explications possibles qui ne sont pas encore prouvées. Une hypothèse doit préciser :

- sa formulation ;
- son niveau de confiance : faible, moyen ou fort ;
- les éléments qui la soutiennent ;
- le test ou la preuve qui pourrait la confirmer ou l'infirmer.

### Inconnues

Informations manquantes qui peuvent changer le diagnostic, le choix technique, la sécurité ou le résultat. Une inconnue doit devenir soit une question, soit un test, soit une décision assumée de ne pas la traiter.

### Décisions

Choix effectués par Bougli ou par l'agent pour avancer. Une décision doit préciser :

- le choix retenu ;
- la raison ;
- les alternatives écartées lorsqu'elles sont importantes ;
- son caractère réversible ou difficile à changer.

## Format court

Pour une tâche non triviale, utiliser ce format lorsque cela améliore la clarté :

```text
Faits vérifiés
- ...

Hypothèses
- ... (confiance : faible/moyenne/forte ; preuve attendue : ...)

Inconnues
- ...

Décisions
- ... (raison : ... ; réversibilité : ...)
```

Ne pas ajouter ce bloc artificiellement à une réponse simple.

## Méthode de validation

1. Reformuler le problème sans expliquer trop tôt sa cause.
2. Lister les faits observables et leurs sources.
3. Énumérer les hypothèses concurrentes, pas seulement la première intuition.
4. Identifier l'inconnue qui réduit le plus l'incertitude.
5. Poser une question ou lancer un test discriminant.
6. Mettre à jour la confiance après le résultat.
7. Décider, corriger ou demander une information supplémentaire.
8. Conserver la décision et la preuve dans la passation ou la documentation utile.

## Règles importantes

- Une commande réussie ne prouve pas que le problème est résolu.
- Un test qui ne distingue pas deux hypothèses ne permet pas de conclure.
- L'absence d'erreur visible n'est pas une preuve d'absence de risque.
- Une information ancienne doit être revalidée si le projet, les dépendances ou l'environnement ont changé.
- En cas de contradiction entre un résumé et l'état réel du projet, l'état réel doit être vérifié et la contradiction signalée.
- Si une décision est nécessaire malgré une inconnue, rendre l'hypothèse explicite et définir comment la réévaluer.

## Application au code et à la sécurité

Avant une modification, distinguer le comportement attendu, le comportement observé et la cause supposée. Après la modification, vérifier le comportement avec un test de régression.

Pour la sécurité, séparer les vulnérabilités prouvées, les risques potentiels et les contrôles non vérifiés. Ne jamais déclarer un système sûr uniquement parce qu'aucun problème n'a été trouvé dans un contrôle limité.
