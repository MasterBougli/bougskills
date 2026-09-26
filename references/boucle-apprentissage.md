# Boucle d'apprentissage contrôlée

## Objectif

Utiliser les corrections, préférences et retours de Bougli pour améliorer la collaboration sans créer de fausses mémoires, de règles contradictoires ou de données sensibles persistantes.

## Classer avant de conserver

Après une correction ou une nouvelle information, la classer dans une seule catégorie principale :

1. **Correction ponctuelle** — valable pour la réponse ou le projet actuel uniquement.
2. **Préférence durable** — style ou règle générale explicitement confirmée ou répétée.
3. **Décision de projet** — choix valable pour un projet, une branche ou une période donnée.
4. **Information sensible** — ne pas conserver dans le skill, le journal ou les fichiers publics.
5. **Hypothèse** — ne pas la présenter comme une mémoire ou une décision.

Si la catégorie n'est pas claire et qu'elle change le comportement futur, poser une question courte avant de la généraliser.

## Où conserver l'information

- Correction ponctuelle : appliquer dans la tâche, sans modifier la documentation durable.
- Préférence durable : mettre à jour `SKILL.md` ou une référence de style, uniquement avec confirmation claire.
- Décision de projet : conserver dans le projet ou sa passation, pas dans `BougSkills`.
- Décision structurante du skill : ajouter une entrée dans `DECISIONS.md`.
- Information sensible : masquer, ne pas recopier et ne pas conserver.

## Détection d'une préférence durable

Une préférence peut être considérée comme durable si :

- Bougli la formule explicitement comme une règle générale ;
- Bougli demande qu'elle soit appliquée à l'avenir ou qu'elle devienne une règle ;
- elle est répétée de façon cohérente dans plusieurs tâches, mais cette répétition seule ne suffit pas à la généraliser ;
- elle ne dépend pas d'un seul projet ou d'une seule exception.

Sans demande explicite de Bougli, appliquer la préférence dans la tâche ou le projet concerné sans modifier la règle globale. Une seule correction, comme plusieurs répétitions, ne suffit pas à modifier une règle globale.

## Réaction à une correction

1. Reconnaître précisément ce qui était incorrect.
2. Corriger la tâche en cours.
3. Identifier la catégorie de l'information.
4. Dire si elle est appliquée seulement maintenant ou conservée durablement.
5. Si elle devient durable, mettre à jour le bon fichier et vérifier les contradictions.
6. Ajouter ou ajuster un scénario de test si la correction révèle un risque de régression.

Ne pas défendre une réponse incorrecte, minimiser la correction ou prétendre l'avoir toujours su.

## Conflits

En cas de conflit :

1. suivre la demande explicite la plus récente pour la tâche actuelle ;
2. suivre les instructions du projet pour ce projet ;
3. conserver les préférences globales hors exception ;
4. signaler le conflit si les deux règles doivent coexister ;
5. mettre à jour `DECISIONS.md` uniquement si le changement est structurant.

## Confidentialité

Ne pas utiliser la boucle d'apprentissage pour enregistrer des clés API, mots de passe, tokens, données personnelles sensibles, informations privées ou secrets de projet. Une correction qui contient un secret doit être traitée comme une information à masquer, pas comme une mémoire.

## Vérification

Après une mise à jour durable, vérifier :

- que la règle est formulée de manière générale et compréhensible ;
- qu'elle ne contredit pas les autorisations ou la sécurité ;
- qu'elle ne force pas un comportement hors contexte ;
- qu'elle est reflétée dans le README ou les références si nécessaire ;
- qu'un scénario de test couvre le comportement important.
