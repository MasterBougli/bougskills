# Traçabilité des exigences

## Objectif

Relier les besoins du projet aux décisions, aux fichiers modifiés, aux tests et à la documentation. La traçabilité doit rester légère pour les petites tâches et devenir explicite pour les projets importants, réglementés ou risqués.

## Quand l'utiliser

Créer une traçabilité lorsque le projet possède :

- plusieurs fonctionnalités ou parties prenantes ;
- un PRD ou des critères d'acceptation ;
- des exigences de sécurité, conformité ou disponibilité ;
- plusieurs agents ou développeurs ;
- des tests de non-régression importants ;
- une livraison ou un déploiement à préparer.

Pour une correction locale, une ligne dans le bilan ou le commit peut suffire.

## Matrice recommandée

Créer `docs/traceability.md` si le projet le justifie :

```markdown
# Traçabilité du projet

| ID | Exigence | Source | Décision | Implémentation | Test | Documentation | Statut |
|----|----------|--------|----------|----------------|------|---------------|--------|
| REQ-001 | ... | PRD §... | ADR-... | src/... | test/... | docs/... | À faire |
```

Utiliser des identifiants stables comme `REQ-001`, `SEC-001` ou `NFR-001`. Ne pas créer une matrice artificielle pour un projet qui ne possède qu'une ou deux exigences simples.

## Statuts

- `À définir` : besoin ou critère incomplet.
- `À faire` : exigence acceptée mais non implémentée.
- `En cours` : implémentation commencée.
- `Implémentée` : code ou configuration présent.
- `Testée` : vérification réussie avec preuve.
- `Validée` : Bougli ou le responsable a confirmé le résultat.
- `Bloquée` : dépend d'une décision, d'un accès ou d'une correction.
- `Hors périmètre` : explicitement exclue et justifiée.

Ne pas marquer une exigence `Validée` uniquement parce que le code existe.

## Règles de mise à jour

- Ajouter ou modifier une ligne lorsqu'une exigence change.
- Relier les décisions structurantes à `DECISIONS.md` ou au journal du projet.
- Relier les tests aux critères qu'ils vérifient réellement.
- Signaler les exigences sans test, les tests sans exigence et les fichiers modifiés sans justification.
- Ne pas confondre une checklist technique avec une preuve de validation.
- Mettre à jour la matrice dans le même changement que l'implémentation lorsque cela est possible.

## Revue de traçabilité

Avant une livraison :

1. comparer le PRD aux exigences recensées ;
2. vérifier les exigences ajoutées ou oubliées ;
3. vérifier les décisions et compromis ;
4. vérifier les fichiers et modules réellement modifiés ;
5. vérifier les tests réussis et leurs preuves ;
6. vérifier les documents utilisateur, sécurité et déploiement ;
7. classer les éléments restants par priorité ;
8. refuser le statut « prêt » si une exigence critique est sans preuve ou sans décision assumée.

## Résultat

Inclure dans le bilan :

- exigences validées ;
- exigences implémentées mais non validées ;
- exigences bloquées ou hors périmètre ;
- tests manquants ;
- documentation manquante ;
- prochaine action prioritaire.
