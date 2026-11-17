@AGENTS.md

# Recueil de Chants — règles de projet

> **Nom de l'application : « Recueil de Chants ».** Le dossier de handoff, son `README.md`
> et le slug npm `recueil-cantiques` écrivent partout « Recueil de Cantiques » : **c'est une
> erreur de la spec**, confirmée par le document source de l'auteur
> (`RECUEIL DE CHANTS 1ère Edition.docx`). Ne jamais afficher « Recueil de Cantiques » dans
> l'interface. Les libellés de *contenu* ne changent pas : « 130 cantiques », « CANTIQUE 87 »
> restent tels quels.

Application React Native (Expo, TypeScript) de consultation d'un recueil de cantiques,
**100 % hors ligne**. La référence visuelle est `design_handoff_recueil_cantiques/` :
lire `README.md` avant toute implémentation d'écran, et ouvrir
`prototype/Recueil de Cantiques.dc.html` dans un navigateur pour voir le comportement attendu.

## Règles
- **Fidélité au prototype** : couleurs, corps de texte, rayons, espacements et durées viennent
  de `src/theme/tokens.ts`. Ne jamais écrire une couleur ou un rayon en dur dans un composant.
- **Aucun réseau.** Pas de fetch, pas d'API, pas de CDN. Données, audio, préférences : local.
- **Aucun comptage en dur.** Les totaux et la borne du clavier numérique se déduisent de
  `recueil.json` (`length` et `max(n)`). Le recueil passera à 250 puis 500 cantiques.
- **Thème** : un `ThemeProvider` expose `{ colors, textSize, theme, dark }` ; tout composant
  lit ses couleurs via `useTheme()`. Changement de thème et de mode **immédiat**.
- **Accessibilité** : cibles tactiles ≥ 44px, contraste conservé dans les 6 thèmes,
  taille de texte des paroles pilotée par le réglage utilisateur (jamais figée).
- **Listes** : `FlatList` (ou `@shopify/flash-list`) avec `getItemLayout`, pensées pour
  500+ éléments. Pas de `map()` sur le recueil complet dans une `ScrollView`.
- **Recherche** : index normalisé construit une fois au démarrage (voir README § Recherche).
  Résultats à chaque frappe, 50 max.
- **Haptique** : `expo-haptics` sur les actions principales (voir `HAPTICS` dans tokens.ts).
- **Français uniquement** dans l'interface. Libellés exacts repris du prototype.
- TypeScript strict, pas de `any`.

## Écarts décidés par le client — à ne pas « recorriger »

Ces choix contredisent le prototype ou son `README.md`. Ils sont volontaires.

- **Favoris = marque-page doré.** Icône `bookmark` (et non `favorite`), colorée avec les
  jetons `gold`, reprise du logo. Cela lève la restriction du README qui réservait `gold` à
  la carte du verset et au splash. Sur le chip « Favoris » actif, l'icône garde la couleur du
  chip (`onPrimary`) : le doré sur fond `primary` tombe sous le seuil de contraste dans
  plusieurs thèmes, l'orange en particulier.
- **Pas de pied de page en fin de chant.** Le filet, l'icône `local_florist` et la mention
  « Cantique 87 sur 130 » sont supprimés — ils chargeaient le visuel.
- **Accès direct par numéro : Accueil et Lecture uniquement.** La pastille « N° » de l'écran
  Liste est retirée.
- **Chœurs supprimés.** L'application ne contient plus que les cantiques : plus de section
  « Chœurs », plus de chip, plus de sélecteur Cantique / Chœur dans le clavier, et la carte
  de l'Accueil n'affiche qu'un seul nombre (les cantiques). Le type `Section` ne vaut plus
  que `'cantiques'`. Voir `docs/SUPPRESSION-DES-CHOEURS.md`. Ne pas les réintroduire.
- **Recherche** : ligatures (`œ`, `æ`) dépliées et apostrophe traitée comme séparateur, sans
  quoi « choeur » et « clin d oeil » ne trouvaient rien. Extraits découpés via une table de
  correspondance de positions, le prototype pouvant décaler le surlignage.
- **Recherches récentes réelles**, persistées sous `rdc.recents` ; la liste figée du
  prototype était une démonstration. Section masquée tant qu'elle est vide.
- **Partage natif** (`Share` de React Native) au lieu du faux message « copié ».
- **Refrain** : barre d'accent en retrait aux extrémités arrondies (React Native déforme un
  `border-left` épais dans les angles arrondis), ombre de carte standard, étiquette
  « REFRAIN » dans une pastille `primaryContainer`.
- **Singulier corrigé** : « 1 couplet » et non « 1 couplets » (cantiques 21, 54, 65, 89).

## Ordre d'implémentation
1. Thème + tokens + polices  2. Données + types + hook de recueil  3. Liste  4. Lecture
5. Clavier « Aller à un numéro »  6. Recherche  7. Favoris + persistance  8. Paramètres
9. À propos  10. Splash  11. Audio  12. Animations et haptique
