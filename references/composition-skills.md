# Composition avec les skills spécialisés

## Rôle de BougSkills

BougSkills est la couche de coordination personnelle : il applique le style de Bougli, les règles de communication, les autorisations, la gestion des versions, les tests, le diff Git, la confidentialité et les formats de sortie.

Il ne doit pas remplacer un skill spécialisé lorsqu'un tel skill est disponible et pertinent.

## Méthode de sélection

1. Identifier le domaine réel de la demande.
2. Rechercher un skill spécialisé déjà installé et réellement adapté.
3. Vérifier que le skill est audité dans l'inventaire courant et que sa version, son empreinte, son fournisseur et son périmètre correspondent à l'autorisation ; sinon appliquer `references/audit-skills-installes.md` avant tout chargement ou toute exécution.
4. Présenter le résumé statique, les limites, le préflight et la décision attendue. Tant que Bougli n'a pas autorisé explicitement ce skill précis, dans cet état et pour cette utilisation, le considérer comme bloqué.
5. Charger le minimum de skills nécessaires après autorisation ; une autorisation pour un autre skill, une autre session ou un autre périmètre ne se réutilise pas automatiquement.
6. Utiliser le skill spécialisé pour sa méthode métier ou technique.
7. Utiliser BougSkills pour coordonner, poser les questions, préserver le contexte, protéger les secrets et restituer le résultat.
8. En cas de contradiction, suivre l'instruction la plus spécifique au domaine, sauf si elle entre en conflit avec une règle de sécurité, d'autorisation ou avec la demande explicite de Bougli.
9. Ne pas charger une longue liste de skills « au cas où ».

## Routage indicatif

Ces exemples orientent la recherche ; ils ne constituent pas une liste exhaustive :

| Besoin | Skills spécialisés à considérer |
|---|---|
| Création ou modification de skill | `skill-creator` |
| Sécurité applicative | `cybersecurity`, `api-security-hardening`, `xss-prevention`, `csrf-protection`, `vulnerability-scanning` |
| API REST ou GraphQL | `rest-api-design`, `api-design-principles`, `api-testing`, `graphql-implementation` |
| Débogage systématique | `systematic-debugging`, `root-cause-tracing`, `defense-in-depth-validation` |
| Tests JavaScript/TypeScript | `vitest-testing`, `jest-generator`, `test-quality-analysis`, `mutation-testing` |
| Frontend et interface | `frontend-design`, `responsive-web-design`, `interaction-design`, `design-review` |
| React, Vue, Nuxt ou Next | le skill du framework concerné et les skills de bonnes pratiques associés |
| SEO et contenu | `seo-audit`, `seo-optimizer`, `keyword-research`, `seo-report`, `local-seo` |
| Documents, PDF, présentations ou tableurs | le skill spécialisé du type de fichier concerné |
| Cloudflare ou déploiement | le skill du produit ou du framework concerné, puis les skills de sécurité et de déploiement utiles |

## Règles de composition

- Le skill spécialisé ne doit pas faire oublier les règles de BougSkills.
- Une réponse doit distinguer les recommandations venant du domaine et les décisions spécifiques au projet.
- Ne pas appliquer une règle spécialisée hors de son domaine : par exemple, ne pas imposer des contrôles web à un script local.
- Si plusieurs skills proposent des approches différentes, présenter le compromis et demander une décision si elle est structurante.
- Pour une modification, vérifier le résultat avec le protocole projet de BougSkills même si le skill spécialisé fournit déjà sa propre checklist.
- Pour la sécurité, le protocole de sécurité de BougSkills reste obligatoire et complète les skills spécialisés.
- Pour une nouvelle dépendance ou un nouvel outil, expliquer le besoin, la provenance, le coût et le risque avant installation.
- Un skill non audité ne doit pas être utilisé automatiquement. L'audit statique doit précéder toute lecture opérationnelle, installation, exécution ou appel externe lié à ce skill. Le signaler, présenter les risques et attendre l'autorisation explicite de Bougli ; bloquer si l'autorisation ou le préflight requis manque.

## Quand aucun skill ne correspond

Ne pas inventer un nom de skill ni prétendre qu'un skill spécialisé a été utilisé. Continuer avec les capacités générales de BougSkills, signaler la limite et proposer une méthode prudente.
