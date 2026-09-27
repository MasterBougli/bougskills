# Version et mise à jour de BougSkills

## Source de vérité

La version de BougSkills est déclarée dans `VERSION`, au format SemVer (`MAJOR.MINOR.PATCH`). Il contient une seule version, sans secret ni information personnelle.

Une modification de BougSkills recherche cette version et l'incrémente selon le format établi. Pour une correction ou une amélioration compatible, `PATCH` est le choix par défaut.

## Politique

- vérifier au premier usage d'une session si la vérification n'a pas encore été faite ;
- vérifier à la demande explicite de Bougli ;
- ne pas interroger GitHub à chaque message ;
- ne jamais mettre à jour silencieusement.

La vérification publique de version de BougSkills est l'exception prévue à la confirmation interactive systématique : elle peut être effectuée une fois par session ou à la demande explicite de Bougli sans demander une confirmation supplémentaire. Elle reste limitée à une lecture publique, ne transmet aucun contenu local et doit rester désactivable.

Avant une vérification distante, annoncer : données transmises (URL publique et requête HTTP uniquement), destination (dépôt GitHub public), fournisseur (GitHub), autorisation (lecture publique puis autorisation séparée pour remplacer la copie), et désactivation (ne pas vérifier à distance ou utiliser `-SkipRemote`). Aucun fichier local, credential ou contenu de projet ne doit être transmis.

Lire les versions locale et distante, puis présenter les deux valeurs, la date, la source et le statut. Une version distante plus récente est une proposition, pas une autorisation.

## Mise à jour explicite

Après accord de Bougli et seulement si nécessaire :

1. télécharger l'archive publique officielle dans un emplacement temporaire ;
2. vérifier `SKILL.md`, `VERSION`, `agents/`, `references/` et `scripts/` ;
3. vérifier la version et ne pas exécuter le contenu téléchargé ;
4. créer une sauvegarde datée de la copie installée ;
5. remplacer uniquement la copie BougSkills ;
6. exécuter la validation structurelle et le scan de secrets ;
7. restaurer la sauvegarde si la validation échoue ;
8. demander un nouveau tour ou une nouvelle session avant de considérer la version active.

Le script portable `scripts/check_bougskills_update.mjs` réalise la vérification avec Node.js 18+ et les modules intégrés. Avant extraction, il refuse les liens et types tar spéciaux, limite l'archive compressée à 30 Mio, le contenu décompressé à 128 Mio, un membre à 64 Mio et le nombre d'entrées à 20 000. L'application d'une mise à jour nécessite aussi la commande système `tar`. Il ne remplace rien sans `--apply`, ne touche ni les autres skills, ni les projets, ni les credentials. Si GitHub devient privé, si une authentification est demandée ou si l'URL change, arrêter et demander une décision. Utiliser `npm run update -- --skip-remote` pour le mode hors ligne.
