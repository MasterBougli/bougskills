# Gabarits du mode Audit

Ces gabarits sont copiés dans le projet audité puis complétés progressivement. Ne pas les remplir avec des suppositions : utiliser `À définir`, `À vérifier` ou `Non applicable` lorsque l'information manque.

## `Audit/plan-audit.md`

```markdown
# Plan d'audit

## Identification

- Date de début :
- Responsable : BougSkills avec Bougli
- Cible :
- Type : site | boutique | API | application | service
- Environnement : local | préproduction | production | autre
- Objectif :
- Échéance :

## Périmètre

- Inclus :
- Exclu :
- Autorisation active : oui | non | à confirmer
- Limites de charge et d'accès :
- Conditions d'arrêt :

## Domaines à couvrir

| Domaine | Applicabilité | Méthode | Statut |
|---|---|---|---|
| Design et cohérence visuelle | À définir | inspection | non commencé |
| UX et navigation | À définir | parcours | non commencé |
| Mobile, tablette, ordinateur | À définir | tests d'affichage | non commencé |
| Accessibilité | À définir | inspection et tests | non commencé |
| Contenu et ton | À définir | lecture | non commencé |
| Structure et hiérarchie | À définir | inspection | non commencé |
| Produits, catégories, filtres | À définir | parcours métier | non commencé |
| Conversion, confiance, CTA | À définir | parcours | non commencé |
| Panier, compte, recherche, achat | À définir | parcours | non commencé |
| Performance | À définir | mesures | non commencé |
| SEO, indexation, données structurées | À définir | inspection | non commencé |
| Liens, redirections, 404 | À définir | vérification | non commencé |
| Prix, stocks, variantes, données produit | À définir | cohérence | non commencé |
| Avis, réseaux sociaux, preuves | À définir | inspection | non commencé |
| Mentions et obligations à vérifier | À définir | sources | non commencé |
| Moteurs de recherche et assistants IA | À définir | inspection | non commencé |
| Code, architecture, sécurité, tests | À définir | revue statique | non commencé |

## Méthode et preuves

- Outils autorisés :
- Fichiers ou écrans observés :
- Captures ou journaux prévus :
- Données sensibles exclues des preuves : oui
- Sources externes nécessaires :

## Questions ouvertes

1. 

## Critères de fin

- [ ] Chaque domaine applicable est audité ou marqué partiel/non vérifiable.
- [ ] Chaque constat possède une preuve et une classification autorisée.
- [ ] Les risques actifs ont été autorisés et limités.
- [ ] Le rapport indique les limites et les vérifications restantes.

## État

`planifié`
```

## `Audit/rapport-audit.md`

```markdown
# Rapport d'audit

## Résumé exécutif

- Décision proposée : prêt | prêt sous conditions | non prêt | non déterminable
- Nombre de constats bloquants : 0
- Nombre de constats importants : 0
- Risque principal :
- Action immédiate recommandée :

## Périmètre et limites

- Cible :
- Date et environnement :
- Accès utilisé :
- Contrôles non réalisés :
- Limites et hypothèses :

## Points positifs

- 

## Couverture

| Domaine | Statut | Preuve ou limite |
|---|---|---|
| À compléter | audité | |

## Constats

<!-- Copier la fiche ci-dessous pour chaque problème. -->

## [important] AUD-001 — Titre court

- Classification : `important`
- Domaine :
- Statut de vérification : confirmé | probable | à vérifier
- Localisation :
- Preuve :
- Impact :
- Recommandation :
- Validation attendue :
- Dépendances :

## Plan priorisé

### Avant mise en ligne ou livraison

- [ ] AUD- :

### Ensuite

- [ ] AUD- :

## Éléments à vérifier avec Bougli ou un professionnel

- 

## Index des preuves

| Référence | Type | Emplacement | Sensibilité |
|---|---|---|---|
| | | | aucune donnée sensible |

## Statut final

`À déterminer selon les preuves disponibles.`
```

## Règle de mise à jour

Mettre à jour le plan au début de chaque grande phase, puis le rapport après chaque constat confirmé. Ne pas attendre la fin pour noter une preuve ou une limite. Si une conclusion change, conserver la raison du changement dans le constat ou dans la section des hypothèses.
