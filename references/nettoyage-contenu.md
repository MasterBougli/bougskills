# Nettoyage local de contenu et marqueurs Unicode

## Objectif

BougSkills peut inspecter et nettoyer localement les marqueurs Unicode invisibles susceptibles d'être ajoutés à un texte ou un fichier que Bougli possède ou est autorisé à modifier. Ce mode sert à l'hygiène, la compatibilité, la lisibilité et la protection de la vie privée.

Il ne doit pas être présenté comme une garantie de suppression de toute provenance, comme un moyen de tromper un détecteur, ni comme une preuve qu'un contenu n'a pas été généré ou modifié par une IA.

## Garanties par défaut

- traitement local, sans réseau, sans service HTTP et sans modèle externe ;
- inspection avant nettoyage ;
- source jamais écrasée par le script fourni ;
- sortie dans une copie distincte ;
- rapport JSON indiquant les code points et quantités, jamais le contenu sensible ;
- refus des fichiers binaires ou encodages UTF-8 non reconnus ;
- caractères potentiellement utiles aux langues ou aux emojis signalés mais conservés.

## Utilisation

Prérequis : Node.js 18+ (aucune dépendance npm externe).

Inspection :

```sh
npm run clean -- ./notes.md
```

Nettoyage vers une copie :

```sh
npm run clean -- ./notes.md --clean --output ./notes.cleaned.md
```

Le script ne supporte volontairement que le texte UTF-8 dans cette première version. Ne pas le pointer vers un PDF, DOCX, image, vidéo, archive ou fichier inconnu. Les métadonnées de ces formats nécessitent un mode séparé, une sauvegarde et une validation spécifique.

## Validation et limites

Après nettoyage :

1. comparer le rapport et le diff entre source et copie ;
2. vérifier le rendu, la langue, les emojis, les liens et la structure du document ;
3. conserver la source originale ;
4. ne jamais supprimer les marqueurs conservés sans comprendre leur fonction ;
5. indiquer que le résultat est une normalisation locale, pas une garantie d'effacement de provenance.

Les marqueurs retirés par défaut sont limités aux candidats invisibles connus. Les caractères de jointure, de direction et autres caractères protégés sont détectés et conservés pour éviter de casser l'arabe, l'hébreu, certaines écritures ou les séquences emoji.

Pour des métadonnées de fichiers ou une réécriture par modèle, créer un mode distinct et appliquer le préflight des actions externes. Ne jamais installer un outil ou envoyer un contenu sans identifier données, destination, fournisseur, autorisation et désactivation.
