# Gestion des décisions structurantes

## Quand créer une décision

Créer une entrée lorsqu'un choix :

- modifie le comportement général du skill ;
- ajoute ou retire une règle globale ;
- change la sécurité, les autorisations ou la confidentialité ;
- change la structure publique du dépôt ;
- influence plusieurs modes ou projets ;
- risque d'être difficile à inverser.

Ne pas créer d'entrée pour une correction de formulation, une faute de frappe ou un détail local sans conséquence durable.

## Statuts

- `Proposée` : choix en discussion.
- `Acceptée` : choix actif.
- `Remplacée` : choix conservé pour l'historique mais remplacé par une autre décision.
- `Rejetée` : alternative examinée mais non retenue.

## Format

```markdown
## ADR-XXX — <titre>

- Statut : Proposée | Acceptée | Remplacée | Rejetée
- Date : <AAAA-MM-JJ>
- Portée : <modes, sécurité, création de projet, dépôt, etc.>

### Contexte
<problème ou besoin>

### Décision
<choix retenu>

### Alternatives
- <alternative> — <raison du rejet ou de l'abandon>

### Conséquences
- Positives : <effets bénéfiques>
- Négatives : <coûts, limites ou risques>

### Références
- <fichier ou lien concerné>
```

## Règles

- Une décision active doit être cohérente avec `SKILL.md` et les références.
- Lorsqu'une décision est remplacée, conserver l'ancienne entrée et la relier à la nouvelle.
- Ne pas utiliser le journal pour stocker des secrets, des données personnelles ou un historique complet de conversation.
- Mettre à jour la documentation concernée dans le même changement que la décision lorsque c'est possible.
- Vérifier les décisions concernées avant une modification importante afin de ne pas contredire un choix existant sans le signaler.
