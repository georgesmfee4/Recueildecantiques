# Suppression des chœurs

Avant, l'application avait deux parties : les **cantiques** (130) et les **chœurs** (74).
Maintenant, il n'y a plus que les **cantiques**. L'Accueil n'affiche plus qu'un seul
nombre : celui des cantiques.

## Ce qui a changé pour l'utilisateur

| Écran | Avant | Après |
|---|---|---|
| Accueil | « 130 cantiques \| 74 chœurs » | « 130 cantiques » seulement |
| Liste | Chips « Cantiques », « Chœurs », « Favoris » | Chips « Cantiques » et « Favoris » |
| Clavier « Aller à un numéro » | Choix Cantique / Chœur | Ouvre toujours un cantique |
| Recherche | Résultats cantiques + chœurs | Résultats cantiques seulement |
| Favoris | Cantiques + chœurs | Cantiques seulement |
| À propos | « 130 cantiques et 74 chœurs » | « 130 cantiques » |

## Comment refaire la même chose, étape par étape

Chaque étape correspond à un ou plusieurs fichiers. Après chaque étape, on peut lancer
`npx tsc --noEmit` : TypeScript montre tout de suite les endroits qui utilisent encore
les chœurs.

### 1. Enlever les chœurs des données
**Fichier :** `src/data/recueil.json`

Le fichier contenait `{ "cantiques": [...], "choeurs": [...] }`.
On supprime la clé `"choeurs"`. Il reste `{ "cantiques": [...] }`.

### 2. Enlever les chœurs des types
**Fichier :** `src/data/types.ts`

- On supprime l'interface `Choeur`.
- On supprime `choeurs: Choeur[]` dans `Recueil`.
- `Section` passe de `'cantiques' | 'choeurs'` à `'cantiques'`.

C'est l'étape clé : après elle, **TypeScript signale chaque ligne qui parle encore des
chœurs**. Il suffit de corriger ces erreurs une par une (étapes 3 à 8).

### 3. Le module de données
**Fichier :** `src/data/recueil.ts`

- On supprime la section `choeurs` (liste, totaux, numéro max).
- On supprime `getChoeur` et le cas « chœur » dans `getReaderBlocks`.
- `entriesFor` (écran Favoris) ne reçoit plus qu'une liste : `entriesFor(favs)`.

**Fichier :** `src/lib/meta.ts` — on supprime `choeurTitle` et `choeurMeta`.

### 4. La recherche
**Fichier :** `src/lib/searchIndex.ts`

L'index ne contient plus que les cantiques. Le libellé du résultat vaut toujours
« Cantique ».

### 5. Les favoris
**Fichier :** `src/providers/FavoritesProvider.tsx`

- On garde une seule liste, `favs` (clé `rdc.favs`).
- On supprime `favsCh`.
- Au démarrage, l'ancienne clé `rdc.favsCh` (chœurs favoris) est effacée du téléphone,
  pour ne pas laisser de données inutiles.

### 6. Les écrans
- `src/screens/HymnListScreen.tsx` : on retire le chip « Chœurs ». Le titre est
  « Cantiques » ou « Favoris ».
- `src/components/overlay/NumberPadDialog.tsx` : on retire le sélecteur
  Cantique / Chœur (`SegmentedControl`).
- `src/screens/ReaderScreen.tsx` : on retire la variable `isChoeur`. L'en-tête affiche
  toujours « CANTIQUE n ».
- `src/screens/AboutScreen.tsx` : on retire « et 74 chœurs ».

### 7. Un seul nombre sur l'Accueil
- `app/index.tsx` : on ne passe plus `secondaryValue` ni `secondaryLabel` à `StatCard`.
- `src/components/home/StatCard.tsx` : on supprime ces deux propriétés, le trait de
  séparation et le second nombre.
- `src/theme/tokens.ts` : on supprime les réglages devenus inutiles
  (`choeursSize`, `choeursLetterSpacing`, `separator`).

### 8. Les routes
`app/liste.tsx`, `app/favoris.tsx`, `app/lecture/[section]/[n].tsx` : la section vaut
toujours `'cantiques'`. Les adresses ne changent pas (`/lecture/cantiques/12`).

## Vérifier

```bash
npx tsc --noEmit        # doit finir sans erreur
grep -rn "choeurs" src app   # ne doit plus rien trouver dans le code
npx expo start          # ouvrir l'app et parcourir les écrans
```

## À savoir
- Les **refrains** des cantiques sont toujours là : un refrain fait partie d'un
  cantique, ce n'est pas un chœur.
- Le nombre de cantiques n'est jamais écrit en dur : il vient de `recueil.json`.
  Ajouter des cantiques dans ce fichier suffit.
