# Démarrer le vrai développement dans VS Code avec Claude Code

## 1. Préparer la machine
```bash
# Node 20+ recommandé
node -v
npm i -g @anthropic-ai/claude-code   # Claude Code
```
Installer aussi VS Code et l'extension **Expo Tools**.
Sur Android : l'application **Expo Go** (Play Store) sur le téléphone, ou Android Studio.

## 2. Créer le projet Expo
```bash
npx create-expo-app@latest recueil-cantiques --template blank-typescript
cd recueil-cantiques
code .
```

## 3. Déposer le dossier de handoff dans le projet
Décompresser `design_handoff_recueil_cantiques` **à la racine** du projet, puis :
```bash
cp design_handoff_recueil_cantiques/CLAUDE.md ./CLAUDE.md
mkdir -p src/data src/theme assets
cp design_handoff_recueil_cantiques/src/data/recueil.json src/data/
cp design_handoff_recueil_cantiques/src/data/types.ts src/data/
cp design_handoff_recueil_cantiques/src/theme/tokens.ts src/theme/
cp design_handoff_recueil_cantiques/prototype/logo.png assets/logo.png
```

## 4. Installer les dépendances
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens \
  expo-font expo-haptics expo-av expo-splash-screen \
  @react-native-async-storage/async-storage react-native-reanimated \
  @expo/vector-icons @shopify/flash-list
npx expo install @expo-google-fonts/dm-sans @expo-google-fonts/literata
```

## 5. Lancer Claude Code
```bash
claude
```
Puis, **une étape à la fois** (ne pas tout demander d'un coup) :

### Prompt 1 — cadrage
> Lis `CLAUDE.md` et `design_handoff_recueil_cantiques/README.md` en entier.
> Ne code encore rien : propose-moi l'arborescence de fichiers et la liste des composants
> réutilisables que tu vas créer, avec pour chacun ses props. Attends ma validation.

### Prompt 2 — thème
> Implémente le thème : `src/theme/ThemeProvider.tsx` avec `useTheme()`, chargement des
> polices DM Sans et Literata, persistance de `theme` / `dark` / `textSize` via AsyncStorage
> aux clés `rdc.theme`, `rdc.dark`, `rdc.ts`. Les couleurs viennent uniquement de
> `src/theme/tokens.ts`. Vérifie que le changement de thème est instantané.

### Prompt 3 — données
> Crée `src/data/useRecueil.ts` : chargement de `recueil.json`, index de recherche normalisé
> (README § Recherche), sélecteurs `getCantique(n)`, `getChoeur(n)`, `next`/`prev` circulaires,
> `maxNumero(section)`. Aucun total codé en dur.

### Prompt 4 — écran Liste
> Implémente l'écran Liste conforme au README § 3, avec FlashList, le badge de numéro,
> les chips, le rail d'index à droite et l'état vide. Reproduis les mesures exactes.

### Prompt 5 — écran Lecture
> Implémente l'écran Lecture (README § 4) : couplets avec gouttière numérotée, carte de
> refrain en italique avec bordure gauche, blocs `t:'v'` sans `n` en texte continu,
> barre inférieure précédent / N° / suivant.

### Prompt 6 — clavier « Aller à un numéro »
> Implémente le dialogue prioritaire (README § 6) : segmenté Cantique/Chœur, aperçu du titre
> en direct, message d'erreur si le numéro n'existe pas, bouton Ouvrir désactivé sinon,
> touches de 56px, haptique 6ms.

Puis Recherche (§ 8), Favoris (§ 7), Paramètres (§ 9), À propos (§ 10), Splash (§ 1),
Audio (§ 5) et enfin les animations.

## 6. Vérifier au fur et à mesure
```bash
npx expo start        # QR code → Expo Go
```
Garder le prototype HTML ouvert à côté et comparer écran par écran.

## 7. Build de production
```bash
npm i -g eas-cli && eas login
eas build:configure
eas build -p android --profile production   # AAB pour le Play Store
eas build -p ios --profile production
```

## À faire remplir par toi
- e-mail et téléphone de contact (écran À propos)
- fichiers audio des cantiques concernés
- icône d'application et écran de démarrage Expo (à partir de `logo.png`)
- vérifier le chœur 18 (« Emma (ter) ») et l'absence du chœur 26 dans le document source
