# Analyse d'impact avant modification

## Quand l'utiliser

Faire une analyse d'impact avant une modification qui :

- touche plusieurs fichiers ou modules ;
- modifie une API, un schéma de données ou un contrat externe ;
- ajoute, supprime ou met à jour une dépendance ;
- change l'authentification, les permissions ou la sécurité ;
- modifie une configuration de production ou un pipeline ;
- change un comportement visible par l'utilisateur ;
- peut nécessiter une migration, une réindexation ou un déploiement coordonné.

Pour une correction locale et réversible, une analyse complète n'est pas nécessaire : signaler simplement les fichiers et risques concernés.

## Score d'impact proportionnel

Attribuer `0`, `1` ou `2` à chaque dimension :

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Impact utilisateur ou métier | local et faible | parcours ou groupe limité | fonction critique, revenus ou nombreux utilisateurs |
| Probabilité d'effet inattendu | faible et bien couvert | incertaine ou partiellement couverte | forte, changement nouveau ou peu testé |
| Retour arrière | immédiat et réversible | possible avec précaution | difficile, migration ou données déjà transformées |
| Données et sécurité | aucune donnée sensible | données internes ou permission limitée | secrets, données personnelles, paiement ou privilège |
| Consommateurs et contrats | aucun consommateur externe | quelques consommateurs connus | API publique, intégration ou contrat partagé |
| Exposition externe | local isolé | préproduction ou accès restreint | production, service externe ou action réelle |

Interpréter le total avec discernement :

- `0–3` : analyse légère ;
- `4–7` : analyse moyenne ;
- `8–12` : analyse complète et validation des décisions critiques.

Un seul facteur critique — migration destructive, secret, paiement, production, autorisation inconnue ou cible réelle — suffit à imposer l'analyse complète, même si le total est bas. Le score est une aide de proportionnalité, pas une autorisation.

## Questions à vérifier

Identifier :

1. **Périmètre** — quels fichiers, modules, services et environnements sont concernés ?
2. **Dépendances** — quels consommateurs, packages, APIs ou workflows dépendent du comportement actuel ?
3. **Données** — y a-t-il une migration, perte, transformation ou incompatibilité de données ?
4. **Contrats** — quelles interfaces publiques, types, endpoints, événements ou formats changent ?
5. **Sécurité** — quelles permissions, entrées, secrets ou frontières de confiance sont touchés ?
6. **Tests** — quels tests existants couvrent le comportement et lesquels doivent être ajoutés ?
7. **Documentation** — quels README, contrats, guides, changelogs ou fichiers d'agents doivent être mis à jour ?
8. **Déploiement** — quelles variables, étapes, migrations, compatibilités ou fenêtres de maintenance sont nécessaires ?
9. **Retour arrière** — comment revenir à l'état précédent si la validation échoue ?
10. **Version** — une version, un changelog ou une décision structurante doit-il être mis à jour ?

## Format court

```text
Changement : <objectif>
Score d'impact : <total et dimensions>
Profondeur choisie : <légère / moyenne / complète, avec justification>
Impact direct : <fichiers et modules>
Impact indirect : <consommateurs, données, APIs ou déploiement>
Risques : <risques principaux>
Tests à ajouter ou lancer : <liste>
Documentation à mettre à jour : <liste>
Retour arrière : <stratégie>
Décisions à confirmer : <si nécessaire>
```

## Conditions d'arrêt

S'arrêter avant modification si :

- une migration destructive n'a pas de sauvegarde ou de retour arrière ;
- un contrat public change sans stratégie de compatibilité ;
- un impact de sécurité important n'est pas compris ;
- des changements existants rendent la cible ambiguë ;
- le propriétaire d'une décision structurante n'est pas identifié ;
- le coût, la durée ou le périmètre dépassent clairement la demande.

Dans ces cas, présenter l'impact constaté et demander une décision ciblée.

## Après modification

Comparer le changement réalisé avec l'analyse prévue :

- vérifier les impacts annoncés et les impacts découverts ;
- lancer les tests directs et indirects ;
- vérifier le diff et les fichiers non attendus ;
- mettre à jour la documentation, la version et les décisions si nécessaire ;
- documenter les écarts dans le bilan ou `passation.md`.
