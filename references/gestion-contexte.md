# Gestion active du contexte

## Objectif

Préserver la qualité du raisonnement pendant les sessions longues en limitant le bruit, les répétitions et les informations périmées. La compression du contexte peut réduire le volume, mais elle ne répare pas automatiquement les mauvaises hypothèses ou les impasses.

## Règles de contexte

- Charger uniquement les fichiers, références et skills nécessaires à la tâche actuelle.
- Lire les références progressivement : d'abord le point d'entrée, puis uniquement les sections pertinentes.
- Préférer un résumé vérifiable à la copie d'un long historique ou d'une sortie complète.
- Demander une sortie ciblée : erreurs, lignes concernées, statut, résultat ou extrait utile.
- Ne pas recopier plusieurs fois la même décision, le même log ou le même code.
- Conserver les faits importants dans les fichiers du projet plutôt que dans une mémoire conversationnelle implicite.
- Vérifier les informations anciennes avant de les réutiliser après un changement de code, de dépendance ou d'environnement.
- Ne jamais utiliser une compression de contexte comme preuve que le raisonnement est sain.

## État de travail minimal

Pour une tâche non triviale, maintenir mentalement ou dans la passation un état court contenant :

- objectif actuel ;
- prochaine action ;
- faits vérifiés ;
- hypothèse principale et alternatives ;
- fichiers importants ;
- derniers tests et résultats ;
- décisions prises ;
- blocages et limites.

Si un élément n'aide pas la prochaine décision, il ne doit pas rester dans le contexte actif par défaut.

## Seuils de changement de stratégie

Proposer une réduction de contexte ou une passation dès qu'un signal concret apparaît :

- deux tentatives échouent sans nouvelle preuve ;
- l'agent revient à une hypothèse déjà infirmée ;
- les réponses deviennent répétitives ou contradictoires ;
- Bougli signale une baisse de qualité ou veut repartir proprement ;
- un travail non terminé va être transféré à une nouvelle session ou à un autre agent.

Ne pas se baser sur une durée supposée ni exiger plusieurs signaux quand un de ces critères est déjà atteint. Après deux tentatives infructueuses, ne pas continuer la même approche sans preuve nouvelle.

## Procédure de réduction

1. Arrêter les modifications non nécessaires.
2. Préparer une synthèse courte dans la réponse ou dans un état temporaire, puis proposer la passation à Bougli.
3. Après accord, ou immédiatement si Bougli a directement demandé une passation, écrire ou mettre à jour `passation.md` selon le protocole. Si Bougli demande seulement un résumé copiable, ne pas créer de fichier.
4. Retirer du contexte les logs, essais et références devenus inutiles.
5. Vérifier que la passation ne contient aucun secret.
6. Ouvrir une nouvelle session ou utiliser un nouvel agent.
7. Faire relire la passation et vérifier les fichiers réels avant de reprendre.

## Reprise ciblée

Une nouvelle session ne doit pas lire tout le dépôt sans objectif. Elle commence par :

1. `passation.md` ;
2. les fichiers explicitement listés ;
3. les instructions locales ;
4. les tests ou commandes mentionnés ;
5. les références spécialisées nécessaires à la prochaine action.

Elle élargit ensuite le contexte uniquement si une preuve l'exige.
