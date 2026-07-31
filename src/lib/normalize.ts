/** Separateur visible entre deux lignes dans un extrait de resultat. */
export const LINE_SEPARATOR = ' · ';

/**
 * Ligatures que la decomposition Unicode ne defait pas. Sans elles, « choeur »
 * ne trouverait jamais « chœur » — ce qui, dans ce recueil, est redhibitoire.
 */
const LIGATURES: Record<string, string> = {
  œ: 'oe',
  æ: 'ae',
};

/** Bloc Unicode « Combining Diacritical Marks ». */
const MARK_FIRST = 0x0300;
const MARK_LAST = 0x036f;

/**
 * Retire les accents d'une chaine deja decomposee. Filtrage par point de code
 * plutot que par expression reguliere : la classe de caracteres equivalente
 * s'ecrit avec des combinants litteraux, invisibles a la relecture.
 */
function stripMarks(decomposed: string): string {
  let out = '';
  for (const ch of decomposed) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= MARK_FIRST && cp <= MARK_LAST) continue;
    out += ch;
  }
  return out;
}

/**
 * Espaces, point median separant les lignes, et apostrophes : tous reduits a une
 * espace.
 *
 * Le prototype conservait l'apostrophe, de sorte que « clin d oeil » ne trouvait
 * pas « clin d’œil ». La traiter comme un separateur rend les deux graphies
 * equivalentes, ainsi que les deux formes d'apostrophe — c'est l'usage courant
 * pour une recherche en francais, et cela n'enleve aucun resultat.
 */
const isSeparator = (ch: string): boolean =>
  ch === '·' || ch === '’' || ch === "'" || /\s/.test(ch);

/** Normalise un caractere deja en minuscule. Peut rendre zero, une ou deux lettres. */
function foldChar(lower: string): string {
  const ligature = LIGATURES[lower];
  if (ligature !== undefined) return ligature;
  return stripMarks(lower.normalize('NFD'));
}

/**
 * Minuscules, diacritiques retires, ligatures defaites, apostrophes unifiees,
 * espaces compactes. Utilisee pour la requete.
 */
export function normalize(input: string): string {
  let out = '';
  for (const ch of input.toLowerCase()) {
    if (isSeparator(ch)) {
      if (out.length && !out.endsWith(' ')) out += ' ';
      continue;
    }
    out += foldChar(ch);
  }
  return out.trimEnd();
}

export interface IndexedText {
  /** Texte normalise, sur lequel se fait la recherche. */
  text: string;
  /**
   * `offsets[i]` donne la position, dans la chaine d'origine, du caractere qui a
   * produit `text[i]`. Sans cette table, un extrait decoupe a la position trouvee
   * dans le texte normalise se decale des que la normalisation a change le nombre
   * de caracteres — ce que fait le prototype, dont les extraits derapent sur les
   * textes contenant « œ » ou des espaces multiples.
   */
  offsets: number[];
  /** Longueur d'origine, pour borner la fin d'un extrait. */
  sourceLength: number;
}

/** Normalise en conservant la correspondance avec les positions d'origine. */
export function normalizeIndexed(source: string): IndexedText {
  let text = '';
  const offsets: number[] = [];
  let i = 0;

  for (const ch of source) {
    const lower = ch.toLowerCase();
    if (isSeparator(lower)) {
      if (text.length && !text.endsWith(' ')) {
        text += ' ';
        offsets.push(i);
      }
    } else {
      const folded = foldChar(lower);
      for (const f of folded) {
        text += f;
        offsets.push(i);
      }
    }
    // `ch` peut valoir deux unites de code (paires de substitution).
    i += ch.length;
  }

  while (text.endsWith(' ')) {
    text = text.slice(0, -1);
    offsets.pop();
  }

  return { text, offsets, sourceLength: source.length };
}
