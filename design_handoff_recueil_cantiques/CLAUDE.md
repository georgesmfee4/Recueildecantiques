# Recueil de Cantiques — règles de projet

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

## Ordre d'implémentation
1. Thème + tokens + polices  2. Données + types + hook de recueil  3. Liste  4. Lecture
5. Clavier « Aller à un numéro »  6. Recherche  7. Favoris + persistance  8. Paramètres
9. À propos  10. Splash  11. Audio  12. Animations et haptique
