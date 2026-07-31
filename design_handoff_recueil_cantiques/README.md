# Handoff : Recueil de Cantiques (application mobile)

## Vue d'ensemble
Application mobile **hors ligne** de consultation d'un recueil de cantiques chrétiens :
130 cantiques + 74 chœurs embarqués dans l'application, recherche plein texte instantanée,
favoris persistants, accès direct par numéro (fonction prioritaire pendant le culte),
6 thèmes de couleur, mode sombre et 4 tailles de texte.

Cible : **React Native + Expo + TypeScript** (Android et iOS), aucun appel réseau.

## À propos des fichiers de ce dossier
Le fichier `prototype/Recueil de Cantiques.dc.html` est une **maquette de référence écrite en HTML**.
Ce n'est pas du code de production à copier : c'est la spécification visuelle et comportementale.
Le travail consiste à **recréer ces écrans dans un projet React Native Expo**, avec les
composants et conventions de cette plateforme (`View`, `Pressable`, `FlatList`, StyleSheet…).

Ouvrir le HTML dans un navigateur (double-clic) permet de manipuler le prototype complet :
c'est la référence à imiter au pixel.

## Fidélité
**Haute fidélité (hi-fi).** Couleurs, typographies, espacements, rayons, ombres, durées
d'animation et libellés sont définitifs. La reproduction doit être fidèle au pixel.
Les seules libertés attendues : adaptation aux conventions natives (safe areas, retour
système Android, défilement natif) et remplacement du lecteur audio simulé par un vrai lecteur.

---

## Système de design

### Typographies
| Usage | Police | Détail |
|---|---|---|
| Interface (libellés, boutons, listes) | **DM Sans** | 400 / 500 / 600 / 700 |
| Paroles, titres de cantiques, numéros | **Literata** | 400 / 600, italique pour les refrains |
| Icônes | **Material Symbols Rounded** | axe `FILL` 0→1 pour les états actifs |

Échelle de corps réellement utilisée (px) : 9.5, 10, 10.5, 11.5, 12, 12.5, 13, 13.5, 14, 14.5,
15, 15.5, 16.5, 17.5, 18, 19, 23, 25, 26, 30, 42, 46.
Libellés de section : 11.5px / 700 / `letter-spacing: 1.2px` / capitales / couleur `primary`.

### Couleurs
Le thème est généré à partir d'une échelle **oklch** (une teinte par thème), ce qui garantit
un contraste et une saturation homogènes entre les 6 thèmes. Comme React Native ne comprend
pas `oklch()`, toutes les valeurs sont **déjà résolues en hex** dans
`src/theme/tokens.ts` : `COLORS[themeId].light` et `COLORS[themeId].dark`.

Rôles (19 jetons par mode) :
- `primary`, `onPrimary` — actions principales
- `primaryContainer`, `onPrimaryContainer` — carte statistique, badges
- `primarySoft`, `primaryBorder` — **carte de refrain**, badges de numéro, aperçus
- `background`, `surface`, `surface2`, `surface3` — fonds, champs, pistes
- `onSurface`, `onSurface2`, `onSurface3` — texte principal / secondaire / tertiaire
- `outline` — bordures de cartes et séparateurs de liste
- `scrim` — voile derrière les dialogues
- `gold`, `goldSoft`, `goldBorder`, `onGold` — **uniquement** la carte du verset biblique
  et les accents du splash (repris du logo)

Teinte principale par thème (clair / sombre) : Bleu `#0b66d6` / `#8bbcff` · Vert `#11813c` /
`#92cb9d` · Violet `#7447c8` / `#c0abfe` · Orange `#d4771a` / `#e8ac7e` · Rouge `#c92f33` /
`#fd9c94` · Noir `#21242b` / `#e5e8ed`.

### Rayons, ombres, espacements
- Rayons : chip 17 · champ de recherche 24 · carte 22 · grande carte 26 · badge numéro 15 ·
  bouton principal 20 · dialogue 30 · pastille 100
- Bordure : 1px `outline` sur toutes les cartes ; le refrain ajoute `border-left: 4px primary`
- Ombre claire : `0 1px 2px rgba(16,24,40,.06), 0 4px 14px rgba(16,24,40,.07)`
- Ombre sombre : `0 1px 2px rgba(0,0,0,.3), 0 6px 18px rgba(0,0,0,.35)`
- Marge latérale d'écran : 20px · gouttière de grille : 12px · espace entre blocs de paroles : 26px
- Cible tactile minimale : 44×44 (boutons d'app bar), 46–60 pour le lecteur audio, 56 pour le clavier numérique

### Tailles de texte (réglage utilisateur)
| Réglage | Paroles | Interligne | Titre du cantique |
|---|---|---|---|
| Petit | 17px | 1.62 | 23px |
| Normal (défaut) | 19px | 1.66 | 26px |
| Grand | 22px | 1.68 | 29px |
| Très grand | 26px | 1.70 | 32px |

### Animations
| Nom | Durée | Courbe | Usage |
|---|---|---|---|
| entrée d'écran | 340ms | cubic-bezier(.2,.85,.25,1) | translation Y 12px + fondu |
| fondu | 220–300ms | ease | écran de lecture, états vides |
| dialogue | 260ms | cubic-bezier(.2,.9,.25,1) | échelle .93 → 1 + fondu |
| snackbar | 260ms | cubic-bezier(.2,.9,.25,1) | translation Y 28px |
| loader splash | 850ms | linear, en boucle | anneau 34px, bordure 3px |
| respiration du logo | 3.4s | ease-in-out, en boucle | échelle 1 → 1.04 |
| appui | 120ms | — | échelle 0.90 à 0.985 selon la taille de la cible |

Retour haptique (expo-haptics) : 6ms touche du clavier · 8ms navigation · 10ms action ·
12ms ouverture d'un cantique · 14ms ajout d'un favori.

---

## Écrans

### 1. Splash
Fond `surface`, deux cercles décoratifs (Ø230 `primarySoft` en haut à droite, Ø180
`goldSoft` en bas à gauche), logo 112px rayon 32 en respiration, titre Literata 25px/600,
sous-titre « 1ʳᵉ édition · 130 cantiques » 13px `onSurface3`, loader circulaire 34px,
mention « TCHINDEBBE Charles & GM DIGITAL » 11.5px en bas (34px du bord).
Transition automatique vers l'Accueil après **2400ms** (à remplacer par la fin du chargement réel).

### 2. Accueil
- **En-tête** : logo 42px rayon 12, titre « Recueil de Cantiques » 19px/700, sous-titre
  « 1ʳᵉ édition · Hors ligne » 12.5px `onSurface3`, bouton `tune` 44px cercle `surface2`.
- **Carte statistique** : fond `primaryContainer`, rayon 26, padding 20, cercle décoratif
  `primary` à 9% d'opacité. « 130 » Literata 46px/600 + « cantiques » ; séparateur vertical
  1×42px à 18% ; « 74 » Literata 30px + « chœurs ». Pastille blanche « Disponible sans
  connexion » avec icône `cloud_off`.
- **Action principale** : bouton plein `primary`, hauteur 60, rayon 20, icône `dialpad`,
  « Aller à un numéro » 16.5px/700 + « Le plus rapide pendant le culte » 12.5px.
- **Grille 2×2** : Cantiques (`menu_book`), Favoris (`favorite`, sous-titre = nombre
  enregistré), Recherche (`search`), Paramètres (`settings`). Cartes `surface`, rayon 22,
  icône 26px `primary`, titre 15.5px/600, sous-titre 12.5px.
- **Ligne « À propos du recueil »** rayon 18 + chevron.
- **Carte verset** : fond `goldSoft`, bordure `goldBorder`, icône `format_quote`,
  citation Literata 15.5px : « Chantez à l'Éternel un cantique nouveau, car il a fait des
  merveilles. » / « PSAUME 98.1 » 12px/600 `onGold`.

### 3. Liste
App bar 52px : retour, titre 18px/600 + compte 12px, chip « N° » (ouvre le clavier).
Champ de recherche factice 48px rayon 24 `surface2` → ouvre l'écran Recherche.
Chips 34px : « Cantiques » / « Chœurs » / « Favoris » (actif = fond `primary`).
**Lignes** : badge numéro 46×46 rayon 15 (fond `primarySoft`, bordure `primaryBorder`,
chiffre Literata 17px/600), titre 15.5px/500, méta 12px `onSurface3`
(« 5 couplets · refrain · audio », ou « 12 lignes » pour un cantique en texte continu),
cœur plein `primary` 20px si favori. Séparateur 1px `outline`.
**Rail d'index** à droite (32px, bordure gauche) : 1, 21, 41… défilement instantané —
c'est ce qui garantit la tenue à 250 / 500 cantiques sans changer l'interface.
État vide (filtre favoris) : icône `heart_broken` 44px + « Aucun favori pour l'instant ».

### 4. Lecture
App bar 52px : retour · « CANTIQUE 87 » 14px/600 `onSurface2` · cœur (bascule) ·
`share` · `format_size` (fait défiler les 4 tailles avec snackbar de confirmation).
Titre Literata `hymnTitle`px/600, interligne 1.22, `letter-spacing -.5px`, padding 24.
**Couplet** : rangée flex, gouttière 24px avec le numéro Literata 16px `primary`, texte
Literata `lyric`px, interligne `lineHeight`, une ligne du recueil = une ligne affichée.
**Refrain** : carte `primarySoft`, bordure `primaryBorder`, `border-left: 4px primary`,
rayon 20, étiquette « REFRAIN » 10.5px/700 `letter-spacing 1.4px` avec icône `repeat`,
texte **en italique**. Espace de 26px entre les blocs.
Fin : filet + icône `local_florist` + « Cantique 87 sur 130 ».
**Barre inférieure** (fixe, fond `surface`, bordure haute) : « N° 86 » (48px, rayon 24,
bordure `outline`) · bouton `dialpad` plein 56×48 · « N° 88 ». Navigation circulaire.

### 5. Lecteur audio (affiché seulement si un enregistrement existe)
Carte `surface` rayon 22, ombre. Ligne 1 : icône `graphic_eq` `primary` + « Enregistrement
audio » 14px/600 + « piano et voix » 11.5px `onSurface3`. Ligne 2 : piste 6px rayon 3
`surface3`, remplissage `primary`, curseur 14px (tap = déplacement). Ligne 3 : temps
écoulé / durée, 11.5px, chiffres tabulaires. Ligne 4 : `replay_10` 46px · lecture/pause
60px plein `primary` · `forward_10` 46px, espacés de 20px.
Dans la maquette, les cantiques 1, 3, 11, 26, 49, 72, 87, 99, 103, 122 ont un audio et la
lecture est simulée (0,3s par tick). **En production : `expo-av`, fichiers embarqués, et la
section entière disparaît si le cantique n'a pas de piste.**

### 6. Dialogue « Aller à un numéro » (fonction prioritaire)
Voile `scrim`, carte `surface` rayon 30, padding 22/20/20, animation d'apparition 260ms.
Titre + bouton fermer 36px. Sélecteur segmenté « Cantique » / « Chœur » (piste `surface2`
rayon 15, onglet actif `surface` + ombre + texte `primary`).
Zone d'aperçu `primarySoft` (hauteur min 104) : numéro saisi en Literata 42px `primary`,
puis **le titre correspondant en direct**, ou « Ce numéro n'existe pas dans le recueil » en
rouge `oklch(0.58 0.19 25)` ≈ `#d2453f`, ou « Entrez un numéro de 1 à 130 » si vide.
Clavier 3 colonnes, touches 56px rayon 18 Literata 23px, plus `backspace` et `close`
(fond `surface2`). Bouton « Ouvrir » 56px désactivé tant que le numéro n'existe pas.
Saisie limitée à 4 chiffres, zéros initiaux ignorés.

### 7. Favoris
Même liste que l'écran 3, mais **cantiques et chœurs réunis** (les chœurs portent la méta
« Chœur · 2 lignes »). En-tête « Favoris » + « 4 favoris · cantiques et chœurs ».
État vide identique à celui de la liste filtrée.

### 8. Recherche
App bar : retour + champ actif 50px `surface2` avec icône `search` et bouton d'effacement.
- **Au repos** : « RECHERCHES RÉCENTES » (chips) + carte « Trois façons de chercher »
  (numéro / mot du titre / phrase des paroles).
- **Résultats** : « 12 RÉSULTATS », lignes avec badge numéro 44px, titre 15px, type
  (« Cantique » / « Chœur »), puis **extrait des paroles** Literata 13px avec le terme
  surligné (`primaryContainer` / `onPrimaryContainer`, rayon 3).
- **Vide** : `search_off` + « Aucun résultat » + « Rien ne correspond à « xyz » » +
  bouton « Effacer la recherche ».

### 9. Paramètres
Trois sections (APPARENCE / LECTURE / MES DONNÉES), cartes `surface` rayon 22.
- **Couleur du thème** : 6 pastilles rondes en `flex: 1` (aspect 1:1), coche 19px sur la
  pastille active, anneau 2px `onSurface` + halo `0 0 0 3px primaryContainer`, libellé
  9.5px sous chaque pastille. Application **immédiate**.
- **Mode sombre** : interrupteur Material 3 — piste 52×32 rayon 16, pouce 16px (éteint,
  `onSurface3`) → 24px (allumé, `onPrimary` sur piste `primary`), transition 220ms.
- **Taille du texte** : segmenté de 4 « A » de corps croissant (13/15/17/19px) dans une
  piste `surface2` rayon 16, plus un **aperçu live** en Literata dans une carte `primarySoft`.
- **Mes données** : « Favoris enregistrés » + compte, et « Stockage local » avec l'explication
  hors ligne. Ligne « À propos » + « Version 1.0.0 ».

### 10. À propos
Logo 82px rayon 24, titre Literata 23px, pastilles « 1ʳᵉ ÉDITION » et « Version 1.0.0 ».
Carte de présentation (Literata 15px, 130 cantiques / 74 chœurs en gras).
Section AUTEURS : **TCHINDEBBE Charles** (Auteur du recueil) et **GM DIGITAL** (Conception et
développement), pastilles d'initiales 40px `primaryContainer`.
Section INFORMATIONS : Contenu · Édition (Première édition) · Contact (**e-mail à définir,
à remplacer**) · Fonctionnement (100 % hors ligne).
Pied : « © 2026 TCHINDEBBE Charles & GM DIGITAL — Tous droits réservés. »

### Snackbar
Fond `onSurface`, texte `background`, rayon 16, padding 14/18, 16px des bords, 34px du bas,
disparition après **2200ms**. Messages : « Ajouté aux favoris », « Retiré des favoris »,
« Cantique 87 copié · prêt à partager », « Taille du texte : Grand ».

---

## Comportement et état

### État global (à porter en contexte React / store)
```ts
screen: 'splash'|'accueil'|'liste'|'lecture'|'favoris'|'recherche'|'parametres'|'apropos'
section: 'cantiques' | 'choeurs'   // section courante
id: number        // cantique ouvert (défaut 1)
chid: number      // chœur ouvert (défaut 1)
q: string         // requête de recherche
favOnly: boolean  // filtre favoris dans la liste
favs: number[]        // numéros de cantiques favoris
favsCh: number[]      // numéros de chœurs favoris
theme: ThemeId; dark: boolean; ts: 0|1|2|3
dlg: boolean; dlgVal: string; dlgSec: Section   // clavier « Aller à un numéro »
playing: boolean; pos: number                   // lecteur audio
toast: string | null
```

### Persistance (AsyncStorage, clés du prototype)
`rdc.favs`, `rdc.favsCh`, `rdc.theme`, `rdc.dark`, `rdc.ts` — valeurs JSON.
Au premier lancement le prototype pré-remplit les favoris `[3, 12, 87]` et `[5]` pour la
démonstration : **ne pas reproduire en production** (partir de listes vides).

### Recherche (algorithme exact du prototype)
1. Normaliser : minuscules, suppression des diacritiques (`NFD` + retrait des marques),
   `’` → `'`, espaces compactés.
2. Si la requête est **entièrement numérique** → tous les cantiques puis chœurs dont le
   numéro **commence par** la saisie.
3. Sinon → recherche de sous-chaîne dans un index précalculé « titre + toutes les paroles »
   (un index par section, construit une seule fois au chargement).
4. Extrait : 34 caractères avant le terme, 40 après, préfixés/suffixés de « … », le terme
   exact étant surligné. Les lignes sont jointes par « · » pour l'extrait.
5. Maximum 50 résultats, cantiques d'abord, ordre de numérotation.
6. Résultats à chaque frappe (aucun bouton de validation).

### Navigation
- Retour depuis Lecture → Liste ; depuis les autres écrans → Accueil (mapper aussi sur le
  bouton retour Android).
- Précédent / suivant en lecture : **circulaire** dans la section courante.
- Le clavier « N° » est atteignable depuis l'Accueil, la Liste et la Lecture.
- Changement de cantique : le défilement revient en haut.

## Données
`src/data/recueil.json` — extrait du document Word fourni par l'auteur, déjà structuré et
nettoyé (les annotations flottantes « bis » / « ter » dessinées dans Word ont été retirées ;
les « (bis) » réellement écrits dans les lignes sont conservés).
- 130 cantiques, numéros 1 → 130, sans trou
- 74 chœurs, numéros 1 → 75 (**le 26 est absent du recueil source**)
- `parts[].t = 'r'` = refrain, `'v'` = couplet ; un `'v'` **sans `n`** est un bloc de
  texte continu (cantiques 30 et 38) : à afficher comme du corps de texte, sans numéro et
  sans carte de refrain
- Types TypeScript prêts à l'emploi dans `src/data/types.ts`

**Évolutivité** : aucune constante de comptage n'est codée en dur dans l'interface —
« 130 cantiques » et la borne du clavier viennent de `recueil.json` (`length` pour les
compteurs, `max(n)` pour la borne). Ajouter une édition à 250 ou 500 cantiques ne demande
que de remplacer le JSON.

## Ressources
- `prototype/logo.png` — logo du recueil (512×512, fond transparent), utilisé au splash,
  en en-tête d'accueil et dans À propos. Prévoir les déclinaisons d'icône Expo
  (`icon.png` 1024², `adaptive-icon`, `splash`).
- Polices : **DM Sans** et **Literata** (Google Fonts, licence OFL) → `expo-font`.
- Icônes : **Material Symbols Rounded**. En React Native, utiliser `@expo/vector-icons`
  (`MaterialIcons` / `MaterialCommunityIcons`) ou embarquer la police Material Symbols.
  Correspondance des glyphes utilisés : `tune, settings, menu_book, favorite, search, info,
  dialpad, chevron_right, cloud_off, format_quote, arrow_back, arrow_forward, share,
  format_size, repeat, local_florist, graphic_eq, play_arrow, pause, replay_10, forward_10,
  close, backspace, check, dark_mode, light_mode, heart_broken, search_off, title,
  library_books, calendar_month, mail, phonelink_lock, home, auto_stories, bolt, check_circle`.
- Aucun fichier audio n'est fourni : le lecteur est simulé dans la maquette.

## Fichiers de ce dossier
| Fichier | Rôle |
|---|---|
| `prototype/Recueil de Cantiques.dc.html` | Maquette interactive complète (ouvrir dans un navigateur) |
| `prototype/recueil-data.js` | Données telles que consommées par la maquette |
| `prototype/logo.png` | Logo source |
| `src/data/recueil.json` | Données prêtes pour l'application |
| `src/data/types.ts` | Types TypeScript du contenu |
| `src/theme/tokens.ts` | Les 6 thèmes × clair/sombre résolus en hex, tailles de texte, rayons, ombres, durées, haptique |
| `CLAUDE.md` | Règles de projet à laisser à la racine du dépôt |
| `DEMARRAGE-CLAUDE-CODE.md` | Marche à suivre pas à pas dans VS Code |
