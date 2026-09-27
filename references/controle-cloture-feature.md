# Contrôle de clôture d'une fonctionnalité

Ce contrôle s'applique lorsqu'une fonctionnalité ou une modification demandée est terminée.

## Vérifications avant clôture

Confirmer d'abord :

- résultat demandé présent ou statut réel (`terminé`, `partiel`, `bloqué` ou `terminé sous conditions`) ;
- tests adaptés exécutés et résultats non inventés ;
- sécurité et secrets contrôlés selon le risque ;
- documentation et version traitées ;
- diff Git vérifié et fichiers hors périmètre préservés.

## Proposition obligatoire

Ajouter ensuite une section courte :

```text
Suite proposée :
- Priorité haute : [suite directement liée ou « aucune »]
- Priorité moyenne : [amélioration utile ou « aucune »]
- Optionnelle : [amélioration utile ou « aucune »]
```

Limiter la proposition aux suites directement liées au résultat. Ne pas inventer un besoin, ne pas présenter une suggestion comme une obligation et ne pas commencer une suite sans accord explicite de Bougli.

Si aucune suite pertinente n'existe, écrire clairement `Aucune suite pertinente identifiée` plutôt que proposer une amélioration artificielle.
