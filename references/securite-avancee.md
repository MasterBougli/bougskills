# Sécurité avancée pour les audits

Cette référence complète `references/protocole-securite.md` pour les audits larges, les applications exposées et les produits intégrant de l'IA.

## Autorisation par cible

Avant une action active, conserver explicitement :

- cible exacte : domaine, URL, IP, application ou environnement ;
- propriétaire ou responsable ayant autorisé l'action ;
- actions autorisées et actions exclues ;
- fenêtre de test, limite de charge et comptes de test ;
- conditions d'arrêt et procédure de signalement.

L'autorisation est limitée à la cible et au périmètre confirmés dans la session. Un accord pour une préproduction ne vaut pas accord pour la production. Ne jamais déléguer cette décision à un agent secondaire.

## Audit statique et actif

### Statique, sans autorisation active

- revue de code et de configuration ;
- modélisation des menaces ;
- analyse des dépendances, secrets, conteneurs et permissions ;
- revue des workflows CI/CD ;
- conception de règles de détection ;
- vérification documentaire et préparation du plan.

### Actif, avec autorisation explicite

- requêtes vers un hôte réel ;
- navigation authentifiée ou tests de parcours ;
- fuzzing, scan de vulnérabilités ou tests de validation ;
- tests de logique métier ou de contrôle d'accès ;
- toute action pouvant modifier des données ou déclencher un effet externe.

Refuser les demandes de déni de service, credential stuffing, exfiltration de données réelles, contournement d'accès non autorisé ou ciblage d'infrastructures critiques. Proposer une alternative statique ou un environnement de test contrôlé.

## Couverture à adapter

Selon la cible, compléter le contrôle avec :

- OWASP Top 10, authentification, autorisation et sessions ;
- XSS, CSRF, SSRF, injections, redirections et accès forcés ;
- logique métier : prix, privilèges, concurrence, workflow et isolation des tenants ;
- dépendances, CVE, SBOM, conteneurs, secrets et supply chain ;
- logs, données personnelles, alertes, sauvegardes et réponse à incident ;
- applications IA : prompt injection, fuite de données, outils dangereux, permissions excessives et sorties non fiables.

## Exceptions de sécurité

Toute exception doit contenir :

- risque accepté et raison ;
- périmètre concerné ;
- mesure compensatoire ;
- propriétaire de la décision ;
- date d'expiration ;
- condition de réexamen.

Une exception sans propriétaire ou sans date de réexamen reste un risque ouvert et ne doit pas être présentée comme corrigée.
