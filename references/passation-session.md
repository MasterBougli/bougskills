# Passation vers une session fraîche

## Pourquoi l'utiliser

Une longue session peut conserver les impasses, fausses hypothèses, essais inutiles et décisions contradictoires accumulés pendant le travail. Une compression du contexte réduit la taille de l'historique, mais ne garantit pas une remise à zéro du raisonnement.

La passation sert à transmettre l'état utile et vérifiable à une nouvelle session, sans lui transmettre tout le bruit de la conversation.

## Quand déclencher une passation

Proposer une passation lorsque l'un de ces cas apparaît :

- la session devient longue ou difficile à suivre ;
- le même bug résiste après plusieurs tentatives ;
- plusieurs hypothèses ont été invalidées ;
- l'agent se répète ou revient vers une solution déjà rejetée ;
- le contexte contient trop de détails historiques inutiles ;
- le projet change de session, d'agent ou de modèle ;
- l'utilisateur demande explicitement un résumé de reprise.

Ne pas créer une passation pour une demande simple ou une tâche courte déjà terminée.

## Fichier de passation

Pour un projet, créer ou mettre à jour `passation.md` à la racine du projet. Pour une tâche sans dépôt, créer le fichier dans le dossier de travail disponible ou fournir le contenu sous forme de prompt copiable.

Le fichier doit contenir :

```markdown
# Passation — <nom du projet>

Date : <date>
Statut : <en cours | bloqué | prêt à reprendre | terminé>

## 1. Objectif
<résultat attendu, formulé concrètement>

## 2. Problématique actuelle
<problème précis à résoudre et comportement observé>

## 3. Périmètre et fichiers importants
- <fichier ou dossier> — <rôle et raison de son importance>

## 4. Faits vérifiés
- <fait confirmé par un fichier, un test, une commande ou un résultat>

## 5. Hypothèses actuelles
- <hypothèse> — <confiance faible/moyenne/forte> — <preuve attendue>

## 6. Tentatives effectuées
### Échec
- <tentative> — <résultat> — <raison connue ou inconnue>

### Réussite partielle
- <tentative> — <ce qui fonctionne> — <ce qui reste à résoudre>

## 7. État technique
- Tests : <résultat et commande>
- Git : <branche, changements locaux, dernier commit utile>
- Dépendances ou environnement : <éléments importants>
- Version : <version ou aucune version trouvée>

## 8. Prochaine action recommandée
<prochaine étape concrète, vérifiable et prioritaire>

## 9. Contraintes et pièges à éviter
- <contrainte>
- <approche déjà invalidée à ne pas répéter>
```

## Règles de qualité

- Écrire les faits et les hypothèses dans des sections différentes.
- Conserver les erreurs utiles, mais supprimer le bruit et les essais sans valeur diagnostique.
- Mentionner les tentatives échouées pour empêcher leur répétition.
- Inclure les chemins de fichiers, commandes, tests et résultats utiles.
- Ne jamais inclure de clé API, token, mot de passe, cookie, contenu privé ou secret ; utiliser `<SECRET_NON_INCLUS>` si nécessaire.
- Ne pas déclarer un problème résolu uniquement parce qu'une commande s'est terminée sans erreur : indiquer la preuve attendue.
- Mettre à jour la passation après une découverte importante, une correction validée ou un changement de direction.

## Reprise dans une nouvelle session

Le prompt de reprise doit rester court :

```text
Lis passation.md, vérifie l'état réel des fichiers et de Git, puis reprends exactement à partir de la prochaine action recommandée. Ne répète pas les tentatives marquées comme échouées. Signale toute contradiction entre passation.md et l'état réel avant de modifier quoi que ce soit.
```

La nouvelle session doit :

1. lire entièrement `passation.md` ;
2. vérifier les fichiers et l'état Git mentionnés ;
3. comparer les faits du fichier avec l'état réel ;
4. signaler les contradictions ou informations périmées ;
5. reprendre à la prochaine action vérifiable ;
6. mettre à jour `passation.md` après une avancée significative.

Si aucun fichier ne peut être créé, produire le même contenu sous forme de bloc copiable, sans inclure de secrets.
