// Généré depuis le prototype « Recueil de Cantiques » (maquette HTML).
// Les couleurs viennent d'une échelle oklch ; elles sont ici résolues en hex sRGB
// car React Native ne supporte pas oklch().

export type ThemeId = 'bleu' | 'vert' | 'violet' | 'orange' | 'rouge' | 'noir';
export type ColorScheme = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  primarySoft: string;
  primaryBorder: string;
  background: string;
  surface: string;
  surface2: string;
  surface3: string;
  onSurface: string;
  onSurface2: string;
  onSurface3: string;
  outline: string;
  scrim: string;
  gold: string;
  goldSoft: string;
  goldBorder: string;
  onGold: string;
};

export const THEME_LABELS: Record<ThemeId, string> = {
  bleu: 'Bleu',
  vert: 'Vert',
  violet: 'Violet',
  orange: 'Orange',
  rouge: 'Rouge',
  noir: 'Noir',
};

export const COLORS: Record<ThemeId, { light: ColorScheme; dark: ColorScheme }> = {
  bleu: {
    light: {
      primary: '#0b66d6',
      onPrimary: '#ffffff',
      primaryContainer: '#d4eaff',
      onPrimaryContainer: '#183e76',
      primarySoft: '#ebf5ff',
      primaryBorder: '#c1d8fa',
      background: '#f6f9fe',
      surface: '#ffffff',
      surface2: '#edf1f8',
      surface3: '#e1e8f2',
      onSurface: '#15191e',
      onSurface2: '#585b60',
      onSurface3: '#86898e',
      outline: '#dadee4',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#8bbcff',
      onPrimary: '#001f4e',
      primaryContainer: '#234069',
      onPrimaryContainer: '#cddffa',
      primarySoft: '#172335',
      primaryBorder: '#364864',
      background: '#0b0d0f',
      surface: '#15171a',
      surface2: '#1f2125',
      surface3: '#2b2e33',
      onSurface: '#eef0f3',
      onSurface2: '#adb0b3',
      onSurface3: '#7e8084',
      outline: '#323437',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
  vert: {
    light: {
      primary: '#11813c',
      onPrimary: '#ffffff',
      primaryContainer: '#d8efdb',
      onPrimaryContainer: '#1c4b29',
      primarySoft: '#edf8ef',
      primaryBorder: '#c4dec9',
      background: '#f7faf7',
      surface: '#ffffff',
      surface2: '#eef3ee',
      surface3: '#e2e9e3',
      onSurface: '#161916',
      onSurface2: '#585c59',
      onSurface3: '#878a87',
      outline: '#dbdfdb',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#92cb9d',
      onPrimary: '#002a0e',
      primaryContainer: '#27482f',
      onPrimaryContainer: '#d0e4d3',
      primarySoft: '#19271c',
      primaryBorder: '#394e3d',
      background: '#0c0d0c',
      surface: '#161816',
      surface2: '#1f2220',
      surface3: '#2b2f2c',
      onSurface: '#eff1ef',
      onSurface2: '#aeb0ae',
      onSurface3: '#7e817f',
      outline: '#333533',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
  violet: {
    light: {
      primary: '#7447c8',
      onPrimary: '#ffffff',
      primaryContainer: '#eae2ff',
      onPrimaryContainer: '#453170',
      primarySoft: '#f5f2ff',
      primaryBorder: '#d8d0f6',
      background: '#f9f8fe',
      surface: '#ffffff',
      surface2: '#f1f0f8',
      surface3: '#e8e5f1',
      onSurface: '#19171d',
      onSurface2: '#5b5a60',
      onSurface3: '#89888e',
      outline: '#dedde4',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#c0abfe',
      onPrimary: '#261349',
      primaryContainer: '#433665',
      onPrimaryContainer: '#dfd9f8',
      primarySoft: '#241f33',
      primaryBorder: '#4a4262',
      background: '#0d0c0f',
      surface: '#17171a',
      surface2: '#212025',
      surface3: '#2e2d33',
      onSurface: '#f0f0f2',
      onSurface2: '#afafb3',
      onSurface3: '#807f83',
      outline: '#343437',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
  orange: {
    light: {
      primary: '#d4771a',
      onPrimary: '#381300',
      primaryContainer: '#fde2cf',
      onPrimaryContainer: '#5f3308',
      primarySoft: '#fef2e9',
      primaryBorder: '#ecd0bb',
      background: '#fcf8f5',
      surface: '#ffffff',
      surface2: '#f6f0ec',
      surface3: '#eee5e0',
      onSurface: '#1c1714',
      onSurface2: '#5e5a57',
      onSurface3: '#8c8885',
      outline: '#e2ddd9',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#e8ac7e',
      onPrimary: '#3b1500',
      primaryContainer: '#58371b',
      onPrimaryContainer: '#f0d9c9',
      primarySoft: '#2e1f14',
      primaryBorder: '#594231',
      background: '#0e0c0b',
      surface: '#191715',
      surface2: '#24201e',
      surface3: '#312d2a',
      onSurface: '#f2f0ee',
      onSurface2: '#b2afad',
      onSurface3: '#82807e',
      outline: '#363432',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
  rouge: {
    light: {
      primary: '#c92f33',
      onPrimary: '#ffffff',
      primaryContainer: '#ffdcd7',
      onPrimaryContainer: '#6d2422',
      primarySoft: '#ffefed',
      primaryBorder: '#f7c9c4',
      background: '#fef7f6',
      surface: '#ffffff',
      surface2: '#f8efee',
      surface3: '#f1e4e2',
      onSurface: '#1d1616',
      onSurface2: '#605958',
      onSurface3: '#8e8786',
      outline: '#e4dcdb',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#fd9c94',
      onPrimary: '#450407',
      primaryContainer: '#632d2a',
      onPrimaryContainer: '#f9d4d0',
      primarySoft: '#331b19',
      primaryBorder: '#613c39',
      background: '#0f0c0c',
      surface: '#1a1616',
      surface2: '#25201f',
      surface3: '#332c2b',
      onSurface: '#f3efef',
      onSurface2: '#b3aeae',
      onSurface3: '#847f7e',
      outline: '#373333',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
  noir: {
    light: {
      primary: '#21242b',
      onPrimary: '#ffffff',
      primaryContainer: '#e7e8ea',
      onPrimaryContainer: '#3e4044',
      primarySoft: '#f4f4f5',
      primaryBorder: '#d4d6d8',
      background: '#f9f9f9',
      surface: '#ffffff',
      surface2: '#f1f1f2',
      surface3: '#e7e7e8',
      onSurface: '#181819',
      onSurface2: '#5a5b5b',
      onSurface3: '#898989',
      outline: '#dedede',
      scrim: 'rgba(12,16,22,0.42)',
      gold: '#d8953d',
      goldSoft: '#fff3d8',
      goldBorder: '#f1d5a9',
      onGold: '#6c4302',
    },
    dark: {
      primary: '#e5e8ed',
      onPrimary: '#181b1f',
      primaryContainer: '#3e4043',
      onPrimaryContainer: '#dbdee5',
      primarySoft: '#222324',
      primaryBorder: '#47484a',
      background: '#0d0d0d',
      surface: '#171717',
      surface2: '#212121',
      surface3: '#2e2e2e',
      onSurface: '#f0f0f0',
      onSurface2: '#afafb0',
      onSurface3: '#808080',
      outline: '#343434',
      scrim: 'rgba(0,0,0,0.6)',
      gold: '#f9c46e',
      goldSoft: '#352206',
      goldBorder: '#63471c',
      onGold: '#f4ca84',
    },
  },
};

export const TEXT_SIZES = [
  { id: 'petit', label: 'Petit', lyric: 17, lineHeight: 1.62, hymnTitle: 23 },
  { id: 'normal', label: 'Normal', lyric: 19, lineHeight: 1.66, hymnTitle: 26 },
  { id: 'grand', label: 'Grand', lyric: 22, lineHeight: 1.68, hymnTitle: 29 },
  { id: 'tresGrand', label: 'Très grand', lyric: 26, lineHeight: 1.7, hymnTitle: 32 },
] as const;

export const RADIUS = { chip: 17, field: 24, card: 22, cardLarge: 26, badge: 15, dialog: 30, button: 20, pill: 100 };
export const SPACING = { screenX: 20, cardPad: 18, gap: 12, sectionGap: 26 };
export const FONTS = { ui: 'DMSans', lyric: 'Literata', icon: 'MaterialSymbolsRounded' };
export const SHADOW_LIGHT = { shadowColor: '#101828', shadowOpacity: 0.07, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 2 };
export const SHADOW_DARK = { shadowColor: '#000000', shadowOpacity: 0.35, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 3 };
export const MOTION = {
  screenIn: { duration: 340, easing: 'cubic-bezier(0.2,0.85,0.25,1)' },
  fade: { duration: 260, easing: 'ease' },
  dialogIn: { duration: 260, easing: 'cubic-bezier(0.2,0.9,0.25,1)' },
  snackbarIn: { duration: 260, easing: 'cubic-bezier(0.2,0.9,0.25,1)' },
  press: { duration: 120, scale: 0.96 },
};
export const HAPTICS = { key: 6, nav: 8, action: 10, open: 12, favorite: 14 };

// ---------------------------------------------------------------------------
// Ajouts post-handoff : valeurs relevees directement dans la maquette HTML mais
// absentes du fichier genere. Regroupees ici pour qu'aucun ecran n'ecrive de
// dimension ni de duree en dur.
// ---------------------------------------------------------------------------

/**
 * Memes courbes que `MOTION`, mais en points de controle exploitables par
 * `Easing.bezier()` : les chaines CSS ci-dessus ne sont pas interpretables.
 */
export const EASING = {
  screenIn: [0.2, 0.85, 0.25, 1],
  dialogIn: [0.2, 0.9, 0.25, 1],
  snackbarIn: [0.2, 0.9, 0.25, 1],
} as const;

/** Translation verticale de l'animation d'entree d'ecran, en pixels. */
export const SCREEN_IN_OFFSET = 12;

/**
 * Ombres exactes du prototype, en deux couches. `SHADOW_LIGHT`/`SHADOW_DARK`
 * ci-dessus n'en approximaient qu'une seule, faute d'API ; `boxShadow` (nouvelle
 * architecture) permet de reproduire les deux.
 */
export const BOX_SHADOW = {
  light: '0px 1px 2px rgba(16,24,40,0.06), 0px 4px 14px rgba(16,24,40,0.07)',
  dark: '0px 1px 2px rgba(0,0,0,0.3), 0px 6px 18px rgba(0,0,0,0.35)',
} as const;

/**
 * Echelles d'appui relevees cible par cible dans la maquette : plus la cible est
 * petite, plus l'enfoncement est marque.
 */
export const PRESS_SCALE = {
  /** Boutons ronds d'app bar (44px). */
  icon: 0.9,
  /** Cartes de la grille 2x2. */
  tile: 0.97,
  /** Bouton principal pleine largeur. */
  button: 0.975,
  /** Lignes pleine largeur. */
  row: 0.985,
} as const;

/** Ecran d'accueil. */
export const ACCUEIL = {
  header: { logoSize: 42, logoRadius: 12, paddingTop: 6, paddingBottom: 18 },
  stat: {
    radius: RADIUS.cardLarge,
    padding: 20,
    /** Cercle decoratif : `primary` a 9 % d'opacite. */
    circle: { size: 120, top: -26, right: -28, opacity: 0.09 },
    cantiquesSize: 46,
    cantiquesLetterSpacing: -1.5,
    labelOpacity: 0.85,
  },
  mainButton: { height: 60, radius: RADIUS.button },
  /**
   * Tuiles de la grille. La bordure de 1 px du prototype est remplacee par
   * l'ombre douce de l'application : c'est elle qui detache desormais la tuile
   * du fond, sans trait dur. Le fond reste `surface` — mesure faite, une pastille
   * `primarySoft` ou `goldSoft` y garde un ecart net dans les six themes
   * (au pire 1,09), alors qu'elle se confondrait avec un fond `surface2`.
   */
  tile: {
    radius: 24,
    padding: 16,
    chip: { size: 38, radius: 13, iconSize: 20 },
    titleMarginTop: 12,
    /**
     * Gouttiere resserree : chaque tuile gagne la moitie de ce qui est repris.
     * Avec la disparition des sous-titres, la tuile passe d'un format debout
     * (155 x 131) a un format couche (155 x 100) — c'est ce rapport, plus que
     * quelques pixels de largeur, qui fait paraitre l'ecran large.
     */
    gridGap: 10,
  },
  aboutRow: { radius: 18 },
  verse: { radius: RADIUS.card, quoteIconSize: 22, textSize: 15.5, lineHeight: 1.6 },
} as const;

/** Ecran de liste, partage par « Cantiques » et « Favoris ». */
export const LISTE = {
  header: { paddingH: 12, paddingBottom: 10, appBarHeight: 52, gap: 4 },
  /** Champ factice : il ouvre l'ecran Recherche au lieu de saisir. */
  searchField: { height: 48, radius: RADIUS.field, paddingH: 16, iconSize: 21, fontSize: 14.5, gap: 10 },
  chip: { height: 34, radius: RADIUS.chip, paddingH: 14, fontSize: 13, gap: 8, iconSize: 17 },
  row: {
    paddingV: 9,
    paddingLeft: 14,
    paddingRight: 16,
    gap: 14,
    titleSize: 15.5,
    titleLineHeight: 1.3,
    titleLetterSpacing: -0.1,
    metaSize: 12,
    bookmarkSize: 20,
  },
  badge: { size: 46, radius: RADIUS.badge, fontSize: 17 },
  rail: { width: 32, itemWidth: 26, itemHeight: 24, fontSize: 10.5, paddingV: 14 },
  empty: { iconSize: 44, paddingV: 56, paddingH: 34 },
  /**
   * Ouverture en cascade. Seules les premieres lignes sont decalees : au-dela,
   * l'utilisateur a deja fait defiler et le decalage ne se verrait pas — il
   * ralentirait seulement l'affichage.
   */
  reveal: { step: 22, duration: 240, staggeredRows: 10, offset: 10 },
} as const;

/** Ecran de lecture d'un cantique. */
export const LECTURE = {
  /**
   * En-tete fixe sur deux registres : rangee d'actions, puis numero et titre.
   *
   * Les retraits lateraux sont optiques, pas geometriques. Le bouton retour fait
   * 44 px pour une icone de 24 : celle-ci commence donc 10 px apres le bord du
   * bouton, et un retrait de 14 place son trait a 24 px — exactement l'aplomb du
   * titre et des couplets. Meme calcul a droite, ou l'icone de 22 px impose 13.
   */
  appBar: {
    height: 52,
    paddingLeft: 14,
    paddingRight: 13,
    gap: 2,
    contentInset: 24,
    paddingBottom: 16,
    kickerSize: 11.5,
    kickerLetterSpacing: 1.2,
    /**
     * Corps du titre dans l'en-tete, par indice de taille de texte.
     *
     * Remplace `TEXT_SIZES[].hymnTitle` (23 a 32 px), taille pensee pour un titre
     * pose dans le corps du texte. Depuis que le titre vit dans un en-tete fixe,
     * ces valeurs immobiliseraient jusqu'a 78 px de haut sur deux lignes. Cette
     * echelle suit toujours le reglage de l'utilisateur, en registre d'en-tete.
     */
    titleSizes: [18.5, 20, 21.5, 23],
    titleMarginTop: 4,
    titleLineHeight: 1.25,
    titleLetterSpacing: -0.3,
    /** 202 titres sur 204 tiennent en deux lignes a ces corps. */
    titleLines: 2,
  },
  body: { paddingH: 24, paddingTop: 20, blockGap: SPACING.sectionGap },
  verse: { numberWidth: 24, gap: 14, numberSize: 16, numberPaddingTop: 2 },
  /**
   * Bloc de refrain. Geometrie reprise telle quelle de la reference fournie :
   * rectangle sans arrondi, barre d'accent pleine hauteur a ras du bord gauche,
   * texte justifie, sans etiquette ni ombre. Seules la police et les couleurs
   * restent celles de l'application.
   */
  chorus: {
    radius: 0,
    paddingV: 16,
    paddingLeft: 16,
    paddingRight: 16,
    accentWidth: 5,
  },
  /**
   * Rappel « AU REFRAIN » place apres un couplet. Un cantique ne porte son
   * refrain qu'une fois dans le texte, alors qu'il se chante apres chaque
   * couplet : ce rappel retablit l'usage sans dupliquer les paroles.
   */
  chorusRef: {
    marginTop: 10,
    gap: 6,
    iconSize: 14,
    size: 11,
    letterSpacing: 1.2,
    label: 'AU REFRAIN',
  },
  // Le filet de fin, l'icone `local_florist` et la mention « Cantique 87 sur 130 »
  // ont ete retires : ils chargeaient le bas de l'ecran sans rien apporter.
  bottomBar: {
    gap: 8,
    paddingTop: 8,
    paddingH: 12,
    paddingBottom: 10,
    buttonHeight: 48,
    buttonRadius: 24,
    dialpadWidth: 56,
    iconSize: 20,
    fontSize: 14,
  },
} as const;

/**
 * Couleur d'erreur, absente des 19 jetons de theme. Le prototype ecrit
 * `oklch(0.58 0.19 25)` en dur, la meme valeur dans les deux modes — trop sombre
 * sur les fonds sombres. La variante sombre reprend le `primary` sombre du theme
 * rouge, deja dans la palette, plutot qu'un rouge invente.
 */
export const ERROR_COLOR = { light: '#d2453f', dark: '#fd9c94' } as const;

/** Dialogue « Aller à un numéro ». */
export const DIALOG = {
  overlayPadding: 22,
  overlayFade: 180,
  radius: RADIUS.dialog,
  paddingTop: 22,
  paddingH: 20,
  paddingBottom: 20,
  shadow: '0px 24px 60px -12px rgba(8,12,20,0.5)',
  /** Apparition : echelle 0.93 et translation Y 8 px, plus fondu. */
  pop: { scale: 0.93, offset: 8 },
  header: {
    gap: 10,
    iconSize: 24,
    titleSize: 17.5,
    titleLetterSpacing: -0.2,
    closeSize: 36,
    closeRadius: 18,
    closeIconSize: 19,
  },
  segmented: {
    marginTop: 16,
    trackRadius: 15,
    trackPadding: 4,
    gap: 6,
    height: 38,
    itemRadius: 11,
    fontSize: 13,
  },
  preview: {
    marginTop: 16,
    paddingV: 16,
    paddingH: 18,
    radius: 20,
    minHeight: 104,
    displaySize: 42,
    displayLetterSpacing: -1,
    displayMinHeight: 42,
    /** Affiche quand rien n'est saisi. */
    placeholder: '—',
    hintSize: 13,
    hintMarginTop: 10,
    hintLineHeight: 1.35,
    hintMinHeight: 18,
    /** Titre resolu : en Literata, comme tous les titres de l'application. */
    titleSize: 15,
    metaSize: 12,
    metaOpacity: 0.72,
  },
  keypad: {
    marginTop: 16,
    gap: 8,
    columns: 3,
    keyHeight: 56,
    keyRadius: 18,
    digitSize: 23,
    actionIconSize: 22,
    pressScale: 0.94,
  },
  submit: { marginTop: 12, height: 56, radius: RADIUS.button, fontSize: 16, iconSize: 22, gap: 8 },
} as const;

/** Ecran de recherche. */
export const RECHERCHE = {
  header: { paddingTop: 6, paddingH: 12, paddingBottom: 12, gap: 8 },
  field: { height: 50, radius: 25, paddingLeft: 16, paddingRight: 8, gap: 10, fontSize: 15, iconSize: 21 },
  clearButton: { size: 34, iconSize: 18 },
  /** Chips de « RECHERCHES RÉCENTES ». */
  recent: { height: 36, radius: 18, paddingH: 14, fontSize: 13.5, gap: 8 },
  /** Carte « Trois façons de chercher ». */
  hints: { radius: 20, padding: 18, titleSize: 14, rowGap: 12, labelSize: 13.5, badge: 34, badgeRadius: 11, iconSize: 19 },
  result: {
    paddingV: 12,
    paddingH: 16,
    gap: 14,
    badgeSize: 44,
    badgeRadius: 14,
    titleSize: 15,
    kindSize: 12.5,
    snippetSize: 13,
  },
  empty: { iconSize: 46, titleSize: 16.5, textSize: 13.5, buttonHeight: 44, buttonRadius: 22, paddingH: 40 },
} as const;

/** Ecran des paramètres. */
export const PARAMETRES = {
  appBar: { height: 52, paddingH: 8, gap: 4, titleSize: 19 },
  /**
   * Aplomb unique de l'ecran. Le prototype empilait trois retraits differents —
   * libelle a 24, carte a 20, texte de rangee a 38 — ce qui donnait un ecran
   * etroit et desaligne. Tout part desormais du meme bord.
   */
  contentInset: SPACING.screenX,
  sectionLabel: { size: 11.5, letterSpacing: 1.2, paddingTop: 26, paddingBottom: 10 },
  /** Blocs qui ne sont pas des rangees : teintes, taille de texte. */
  block: { paddingTop: 4, paddingBottom: 20 },
  row: { paddingV: 15, gap: 14, titleSize: 14.5, subtitleSize: 12.5 },
  /**
   * Pastille d'icone. Le prototype pose des icones nues dans les rangees ; les
   * enfermer dans un conteneur teinte reprend le motif deja utilise par la carte
   * « Trois façons de chercher » et donne aux reglages une allure composee.
   */
  iconChip: { size: 36, radius: 12, iconSize: 21 },
  swatch: { gap: 10, checkSize: 19, ringWidth: 2, haloWidth: 3, labelSize: 9.5, labelMarginTop: 8 },
  /** Interrupteur Material 3 : piste 52x32, pouce 16 -> 24 px. */
  switch: {
    trackWidth: 52,
    trackHeight: 32,
    radius: 16,
    borderWidth: 2,
    thumbOff: 16,
    thumbOn: 24,
    centerOff: 15,
    centerOn: 34,
    duration: 220,
  },
  textSize: {
    trackRadius: 16,
    trackPadding: 4,
    itemRadius: 12,
    height: 40,
    gap: 6,
    labelSize: 10,
    labelMarginTop: 6,
    /** Corps des quatre « A », croissant. */
    scale: [13, 15, 17, 19],
  },
  /**
   * Apercu de lecture, allege. On y a retire l'etiquette « APERÇU », le numero du
   * cantique, la gouttiere et la barre de refrain : ce bloc previsualise une
   * echelle typographique, pas une structure. Restent le titre, le corps et une
   * ligne en italique. Sans bordure et plus arrondi, il se pose au lieu de
   * s'encadrer.
   */
  preview: { radius: 20, paddingV: 18, paddingH: 18, lineGap: 12 },
  /** Compteur de favoris, en pastille doree plutot qu'en texte colore. */
  countBadge: { paddingV: 3, paddingH: 10, radius: RADIUS.pill, fontSize: 13 },
  aboutRow: { radius: 18, marginTop: 26, marginBottom: 30 },
} as const;

/** Ecran À propos. */
export const APROPOS = {
  hero: {
    paddingTop: 14,
    paddingH: 30,
    logoSize: 82,
    logoRadius: 24,
    nameSize: 23,
    nameLetterSpacing: -0.4,
    nameMarginTop: 16,
    pillGap: 8,
    pillMarginTop: 12,
    pill: { paddingV: 5, paddingH: 11, radius: RADIUS.pill, fontSize: 11.5 },
  },
  /** Paragraphe de presentation : bloc teinte, sans bordure. */
  intro: { marginTop: 26, radius: 22, padding: 20, size: 15, lineHeight: 1.62 },
  author: { avatar: 40, avatarFontSize: 14, nameSize: 14.5, roleSize: 12.5, gap: 14, paddingV: 15 },
  copyright: { paddingTop: 30, paddingH: 34, paddingBottom: 32, size: 12, lineHeight: 1.6 },
} as const;

/** Snackbar, commun a tous les ecrans. */
export const SNACKBAR = {
  inset: 16,
  bottom: 34,
  radius: 16,
  paddingV: 14,
  paddingH: 18,
  gap: 12,
  iconSize: 20,
  fontSize: 14,
  duration: 2200,
  riseOffset: 28,
  shadow: '0px 12px 30px -8px rgba(8,12,20,0.5)',
} as const;

/** Ecran de demarrage. Geometrie et animations reprises du prototype. */
export const SPLASH = {
  /** Duree d'affichage avant l'Accueil, une fois le chargement reel termine. */
  hold: 2400,
  fadeIn: 300,
  logo: {
    size: 112,
    radius: 32,
    /** Spread negatif : necessite `boxShadow` (nouvelle architecture). */
    shadow: '0px 18px 44px -12px rgba(16,24,40,0.4)',
  },
  /** Respiration du logo : echelle 1 -> 1.04 -> 1. */
  breathe: { duration: 3400, scale: 1.04 },
  spinner: { size: 34, border: 3, duration: 850 },
  title: { size: 25, letterSpacing: -0.5, marginTop: 26 },
  subtitle: { size: 13, letterSpacing: 0.3, marginTop: 8 },
  footer: { size: 11.5, letterSpacing: 0.3, bottom: 34 },
  loaderMarginTop: 44,
  /** Cercles decoratifs, debordant volontairement hors de l'ecran. */
  circleTopRight: { size: 230, top: -60, right: -70 },
  circleBottomLeft: { size: 180, bottom: -40, left: -60 },
} as const;
