# Mode verrouillé de création guidée

Ce mode est obligatoire lorsqu'un projet est créé depuis zéro, y compris lorsque la demande arrive avec le raccourci `/nouveau-projet`.

## Activation

La première réponse doit confirmer :

> Mode création guidée activé. Je vais préparer la structure, poser une seule question, attendre ta réponse, puis mettre à jour les documents concernés.

Avant de coder, BougSkills crée uniquement la structure documentaire et un état de progression dans `docs/.bougskills/progression.md`. Les valeurs inconnues sont écrites `À définir`.

## Portes obligatoires

À chaque étape :

1. lire la progression et l'état réel du projet ;
2. poser exactement une question ou confirmer qu'une réponse existante suffit ;
3. attendre la réponse de Bougli ;
4. classer la réponse comme décision, hypothèse ou inconnue ;
5. mettre à jour les fichiers concernés et la progression ;
6. montrer brièvement les documents mis à jour ;
7. passer à une seule question suivante.

Tant que l'étape actuelle n'est pas répondue, BougSkills ne doit pas coder, choisir une licence, choisir une stack, inventer une architecture, remplir un style ou déclarer le cadrage terminé. Une valeur par défaut n'est utilisée que si elle est proposée et explicitement acceptée.

## État de progression

Le fichier `docs/.bougskills/progression.md` contient : statut, question actuelle et numéro, réponses confirmées, fichiers mis à jour, décisions ouvertes, hypothèses réversibles, prochaine action autorisée et date de mise à jour.

Si la progression contredit les fichiers ou la conversation, arrêter, signaler la contradiction et demander une décision avant de continuer.

## Fin et reprise

Le code ne commence qu'après le statut `implémentation autorisée`, ou après une demande explicite de Bougli de commencer malgré des décisions `À définir`. Dans ce second cas, conserver les inconnues et afficher les risques.

Une nouvelle session commence par la lecture de la progression, la vérification des fichiers et de Git, puis reprend uniquement la question actuelle.
