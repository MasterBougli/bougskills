# Qualité de livraison

Utiliser cette référence lors d'une revue finale, d'un audit applicatif ou avant une mise en ligne.

## Tests : qualité avant pourcentage

Vérifier que les tests :

- testent le comportement attendu plutôt que l'implémentation interne ;
- couvrent les chemins critiques, erreurs, limites et permissions ;
- contiennent des assertions qui échoueraient réellement en cas de régression ;
- ne dépendent pas de l'ordre, du temps réel, d'un réseau instable ou de données partagées ;
- n'abusent pas des mocks au point de ne plus tester l'intégration utile ;
- sont reproductibles et identifient clairement leur contexte d'échec.

La couverture chiffrée est un indicateur, pas une preuve suffisante. Signaler séparément la couverture apparente et la couverture utile des risques importants.

## Dépendances et supply chain

Contrôler lorsque pertinent :

- dépendances directes et transitives ;
- vulnérabilités connues et niveaux de gravité ;
- versions abandonnées ou non maintenues ;
- licences et compatibilité avec le projet ;
- images de conteneur et artefacts générés ;
- secrets dans les fichiers, logs, historiques ou artefacts ;
- verrouillage des versions et reproductibilité de l'installation ;
- exceptions acceptées avec justification et date de révision.

## CI/CD et dépôt

Vérifier :

- tests, lint, build et contrôles sécurité exécutés avant fusion ;
- permissions minimales des workflows ;
- actions GitHub épinglées sur une version vérifiable, jamais `latest` sans justification ;
- CodeQL, Dependabot ou équivalent lorsque adaptés ;
- secrets injectés par le gestionnaire prévu, jamais en clair ;
- protection des branches et revue humaine des changements sensibles ;
- procédure de retour arrière et preuve du déploiement réalisé.

## Décision de livraison

Classer la livraison comme `prête`, `prête sous conditions`, `non prête` ou `non déterminable`. Une condition doit nommer son propriétaire, sa preuve attendue et son échéance. Ne pas déclarer prêt un projet dont les contrôles critiques n'ont pas pu être exécutés sans le signaler explicitement.
