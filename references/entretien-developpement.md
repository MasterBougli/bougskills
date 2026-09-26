# Entretien adaptatif avant développement

## But

Avant de développer une fonctionnalité non triviale, vérifier la feature de bout en bout : besoin, utilisateurs, expérience, données, architecture, code, sécurité, performance, tests, exploitation et livraison. L'objectif est de faire émerger les décisions que Boug n'aurait pas forcément formulées, sans transformer chaque petite correction en questionnaire interminable.

## Règles de conduite

- Poser une seule question à la fois.
- Expliquer brièvement pourquoi la question compte.
- Proposer des options et leurs compromis quand un choix est possible.
- Réutiliser les réponses déjà connues et ne pas demander deux fois la même chose.
- Distinguer fait, décision, inconnue et hypothèse réversible.
- Si une inconnue est critique pour la sécurité, les données, le coût ou une migration, s'arrêter avant de coder.
- Pour une correction triviale, réduire l'entretien aux questions qui changent réellement le résultat.

## Domaines à couvrir selon le risque

1. **Produit** : problème résolu, utilisateurs, objectif mesurable, non-objectifs et critères de réussite.
2. **Parcours** : scénario principal, états chargement/vide/erreur/annulation/reprise, mobile, accessibilité et internationalisation.
3. **Données et règles métier** : entrées, sorties, source de vérité, invariants, doublons, conflits, historique, suppression, rétention, migration et index.
4. **Architecture et intégrations** : modules, API, événements, tâches asynchrones, contrats, compatibilité, dépendances et solution de repli.
5. **Code** : conventions locales, typage, validation, gestion d'erreur, nommage, séparation des responsabilités, réutilisation et documentation.
6. **Sécurité et confidentialité** : frontières de confiance, authentification, autorisation, données personnelles, secrets, paiements, injections, XSS, CSRF, SSRF et abus métier.
7. **Performance et fiabilité** : volume, latence, concurrence, quotas, coûts, timeouts, retry, idempotence, cache, panne partielle et rollback.
8. **Tests** : unitaires, intégration, contrat, E2E, sécurité, cas limites, régression, données de test, mocks utiles et risques de tests fragiles.
9. **Observabilité** : logs sans secret, métriques, traces, alertes, corrélation, seuils, diagnostic et possibilité de désactivation.
10. **Livraison** : feature flag, migration compatible, déploiement progressif, cache/queue, changelog, documentation, monitoring et retour arrière.

## Cadrage avant implémentation

Après l'entretien, produire un cadrage court contenant : objectif, utilisateurs, périmètre, non-objectifs, parcours et états, décisions prises, hypothèses, impacts, risques, tests prévus, observabilité, déploiement, rollback, questions restantes et définition de « terminé ».

Ne commencer l'implémentation qu'après validation de ce cadrage, ou après accord explicite pour avancer avec les hypothèses listées. Les questions et décisions importantes doivent rester traçables dans la documentation du projet adaptée.

## Coordination avec les autres skills

Charger uniquement les skills spécialisés nécessaires après le cadrage. Appliquer avant eux le préflight de [l'audit des skills installés](audit-skills-installes.md) lorsqu'ils peuvent envoyer des données, lire des credentials, installer une dépendance ou contacter un service externe. Utiliser les références de reconnaissance, d'analyse d'impact, de sécurité, de tests et de qualité de livraison selon les domaines réellement concernés.
