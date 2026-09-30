# Passation vers une session fraîche

## Pourquoi l'utiliser

Une longue session peut conserver les impasses, fausses hypothèses, essais inutiles et décisions contradictoires accumulés pendant le travail. Une compression du contexte réduit la taille de l'historique, mais ne garantit pas une remise à zéro du raisonnement.

La passation sert à transmettre l'état utile et vérifiable à une nouvelle session, sans lui transmettre tout le bruit de la conversation.

## Déclencheurs

Proposer une passation dès qu'un seul de ces signaux de dérive apparaît :

- au moins deux tentatives échouent sans nouvelle preuve ou l'agent revient à une hypothèse déjà infirmée ;
- les réponses deviennent répétitives ou contradictoires, ou Bougli signale une baisse de qualité ;
- le travail n'est pas terminé et Bougli indique qu'il ferme la session, veut reprendre plus tard, ou transfère le travail à un autre agent ;

Une demande explicite n'est pas une simple proposition : appliquer directement les règles d'autorisation ci-dessous. Une demande de résumé copiable reste une réponse dans la conversation, sauf demande explicite de fichier.

Ne pas se fonder uniquement sur une durée supposée : l'agent ne connaît pas toujours le temps réel écoulé. Ne pas proposer de fichier pour une demande simple déjà terminée ou lorsque le travail se poursuit normalement dans la même session.

## Autorisation et création

- Une demande directe comme « prépare une passation » ou « je ferme, prépare la reprise » autorise la création ou la mise à jour de `passation.md`. Ne pas demander une confirmation redondante.
- Si Bougli demande uniquement un prompt court ou un résumé copiable, le fournir dans la réponse ; ne pas créer de fichier sauf demande explicite de fichier.
- Si Bougli ne fait qu'indiquer un signal de dérive sans demander de passation, expliquer le signal en une phrase et poser une seule question de confirmation avant toute écriture. Continuer autrement selon sa réponse.
- Après accord, créer ou mettre à jour le fichier et annoncer son chemin ainsi que le prompt court pour reprendre. Si Bougli refuse, ne rien écrire et fournir au besoin un résumé bref dans la conversation.

## Détection à la reprise

Quand Bougli demande de continuer, reprendre ou poursuivre un travail dans un projet, avant toute modification :

1. vérifier à la racine du projet courant la présence de `passation.md` ;
2. s'il existe, le lire, puis vérifier les instructions locales, les fichiers cités et l'état Git ;
3. signaler toute contradiction ou information périmée avant d'agir ;
4. reprendre à la prochaine action vérifiable, sans répéter les échecs documentés ;
5. si aucun fichier n'existe et que le contexte de reprise manque, demander à Bougli où se trouve la passation ou quel état reprendre.

Ne pas chercher récursivement sur tout le disque ni supposer qu'un fichier trouvé dans un autre projet concerne la tâche actuelle.

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
