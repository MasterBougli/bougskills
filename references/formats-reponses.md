# Formats de réponse de BougSkills

## Règle générale

Un format de sortie est un contrat de qualité, pas un modèle à remplir mécaniquement. Utiliser uniquement les sections utiles, rester concis et signaler ce qui n'a pas été vérifié.

Ne pas inventer de test, de fichier modifié, de source, de version ou de résultat. Si une section ne s'applique pas, l'omettre ou écrire `N/A` avec une raison lorsque cela est important.

## Réponse simple

```text
Réponse : <réponse directe>
```

Ajouter une précision ou une limite uniquement si elle peut changer la compréhension ou la décision.

## Explication pédagogique

```text
En bref : <idée principale>

Explication : <explication progressive>
Exemple : <exemple court si utile>
À retenir : <conséquence pratique>
```

## Exploration

```text
Objectif compris : <reformulation>
Options : <options et compromis>
Hypothèse de travail : <si nécessaire>
Question suivante : <une seule question>
```

## Conception

```text
Recommandation : <option retenue>
Pourquoi : <raisons principales>
Alternatives : <options écartées et compromis>
Risques : <risques importants>
Plan : <étapes vérifiables>
Décisions à confirmer : <si nécessaire>
```

## Création de projet

```text
Structure créée : <dossier et fichiers>
Décisions validées : <éléments confirmés>
À définir : <éléments encore inconnus>
Question suivante : <une seule question>
```

À la fin du parcours : inclure la structure finale, les documents remplis, les décisions reportées et la confirmation nécessaire avant l'implémentation.

## Modification

```text
Résultat : <ce qui a changé>
Fichiers : <liens ou chemins>
Tests : <commandes et résultats>
Diff Git : <vérifié / problème trouvé>
Version : <version modifiée ou aucune version existante>
Limites : <ce qui reste non vérifié>
```

Ne jamais dire « terminé » si le changement n'a pas été vérifié au niveau annoncé.

## Diagnostic

```text
Conclusion probable : <cause la plus probable>
Faits vérifiés : <preuves>
Hypothèses : <confiance et preuves attendues>
Causes alternatives : <si pertinentes>
Prochaine vérification : <test ou information>
```

Le mode diagnostic ne modifie pas les fichiers sans demande explicite de correction.

## Débogage

```text
Problème reproduit : <oui/non et conditions>
Cause identifiée : <cause et preuve>
Correction : <changement effectué ou recommandé>
Régression couverte : <test>
Résultat : <résultat après correction>
```

Si le bug n'est pas résolu, expliquer ce qui a été éliminé, ce qui reste probable et quand créer une passation.

## Sécurité

```text
Résumé : <état général>
Périmètre : <ce qui a été contrôlé>
Niveau appliqué : <A, B ou C>
Constats :
- [Critique/Élevé/Moyen/Faible] <titre> — <preuve> — <impact> — <correction>
Contrôles effectués : <liste>
Limites : <contrôles non réalisés>
Priorité : <prochaines corrections>
```

Ne jamais garantir la sécurité absolue d'un système.

## Revue finale

```text
Statut : <prêt / prêt sous conditions / non prêt>
Points validés : <liste courte>
Problèmes : <sévérité et fichiers concernés>
Vérifications : <tests, sécurité, versions, diff, documentation>
Actions restantes : <liste priorisée>
```

## Passation

Utiliser le format défini dans `references/passation-session.md`. La réponse doit fournir le chemin de `passation.md` ou un bloc copiable, puis le prompt court de reprise si une nouvelle session est nécessaire.

## Résumé

```text
Objectif : <objectif>
Décisions : <décisions>
État : <état actuel>
Fichiers : <fichiers importants>
Contraintes : <contraintes>
Prochaine étape : <action suivante>
```
