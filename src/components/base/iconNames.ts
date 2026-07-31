// Genere depuis les codepoints officiels Material Symbols Rounded.
// Ne pas editer a la main : relancer la generation si un glyphe est ajoute
// (il faut alors aussi regenerer les deux .ttf sous-ensembles de assets/fonts/).

/** Les 35 glyphes utilises par l'application, par point de code. */
export const GLYPHS = {
  arrow_back: 0xe5c4,
  arrow_forward: 0xe5c8,
  auto_stories: 0xe666,
  backspace: 0xe14a,
  bolt: 0xea0b,
  bookmark: 0xe8e7,
  calendar_month: 0xebcc,
  check: 0xe668,
  check_circle: 0xf0be,
  chevron_right: 0xe5cc,
  close: 0xe5cd,
  cloud_off: 0xe2c1,
  dark_mode: 0xe51c,
  dialpad: 0xe0bc,
  format_quote: 0xe244,
  format_size: 0xe245,
  forward_10: 0xe056,
  graphic_eq: 0xe1b8,
  home: 0xe9b2,
  info: 0xe88e,
  library_books: 0xe02f,
  light_mode: 0xe518,
  mail: 0xe159,
  menu_book: 0xea19,
  pause: 0xe034,
  phonelink_lock: 0xf2be,
  play_arrow: 0xe037,
  repeat: 0xe040,
  replay_10: 0xe059,
  search: 0xef7a,
  search_off: 0xea76,
  settings: 0xe8b8,
  share: 0xe80d,
  title: 0xe264,
  tune: 0xe429,
} as const;

export type IconName = keyof typeof GLYPHS;

export const ICON_NAMES = Object.keys(GLYPHS) as IconName[];
