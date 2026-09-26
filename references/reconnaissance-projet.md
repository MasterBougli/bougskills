# Reconnaissance initiale d'un projet

## Objectif

Comprendre suffisamment un projet existant avant de proposer une architecture, modifier un fichier ou lancer des outils. La reconnaissance doit être ciblée : elle ne consiste pas à charger tout le dépôt.

## Ordre recommandé

1. **Instructions** — rechercher `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, README et les règles locales pertinentes.
2. **État Git** — branche, changements non commités, fichiers suivis et état de synchronisation ; ne pas écraser les modifications existantes.
3. **Structure** — repérer les dossiers principaux, points d'entrée, tests, configuration et documentation.
4. **Stack** — identifier les manifestes et outils réellement utilisés : `package.json`, `pyproject.toml`, `Cargo.toml`, `composer.json`, fichiers projet et équivalents.
5. **Versions** — rechercher les déclarations de version et les changelogs sans inventer de système si aucun n'existe.
6. **Tests** — repérer les commandes, frameworks, suites et contrôles déjà présents.
7. **Dépendances** — vérifier les fichiers de verrouillage, scripts et dépendances directement concernés.
8. **Configuration sensible** — repérer les noms de fichiers de configuration sans afficher le contenu des secrets ; ne pas lire ou recopier les valeurs sensibles sans nécessité.
9. **Périmètre** — relier l'objectif de Bougli aux fichiers réellement concernés et noter ce qui est explicitement hors périmètre.

## Résumé de reconnaissance

Pour une tâche non triviale, produire un résumé court :

```text
Projet : <type et objectif déduit>
Instructions : <fichiers lus>
État Git : <branche et changements existants>
Stack : <outils confirmés>
Versions : <version trouvée ou aucune>
Tests : <commandes ou suites trouvées>
Fichiers concernés : <liste>
Inconnues : <éléments manquants>
Risques : <risques immédiats>
```

## Règles de prudence

- Ne pas considérer un nom de fichier comme une preuve de son contenu.
- Ne pas lire les secrets uniquement pour « comprendre le projet ».
- Ne pas lancer une commande d'installation, de migration ou de déploiement pendant la reconnaissance.
- Ne pas modifier le projet pendant la reconnaissance, sauf création explicitement demandée d'une structure de projet vierge.
- Si les instructions locales contredisent une préférence générale, appliquer les instructions spécifiques au projet et signaler le conflit si nécessaire.
- Si l'état Git contient des changements non liés, les préserver et les signaler.

## Fin de reconnaissance

Arrêter l'inspection quand les informations suffisent pour choisir la prochaine action et vérifier son résultat. Si une information manque mais ne change pas le risque, avancer avec une hypothèse explicite. Si elle change le résultat ou la sécurité, poser une question avant de modifier.
