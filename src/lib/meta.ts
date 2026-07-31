import type { Cantique, Choeur } from '../data/types';
import { hasAudio } from './audio';

const TRAILING_PUNCTUATION = /[.,;:!?]+$/;

/**
 * Un choeur n'a pas de titre imprime dans le recueil : le prototype affiche sa
 * premiere ligne, debarrassee de sa ponctuation finale.
 */
export function choeurTitle(c: Choeur): string {
  return (c.l[0] ?? '').replace(TRAILING_PUNCTUATION, '');
}

const plural = (n: number, singular: string, pluriel: string): string =>
  `${n} ${n > 1 ? pluriel : singular}`;

/**
 * « 5 couplets · refrain · audio », ou « 12 lignes » pour un cantique ecrit en
 * texte continu (cantiques 30 et 38, dont les blocs n'ont pas de numero).
 *
 * Ecart assume vis-a-vis du prototype : il ecrit « 1 couplets » pour les
 * cantiques 21, 54, 65 et 89, qui n'ont qu'un couplet. Le singulier est retabli
 * ici — la maquette le gere d'ailleurs correctement pour les lignes de choeur.
 */
export function cantiqueMeta(c: Cantique): string {
  const verses = c.parts.filter((p) => p.t === 'v' && p.n !== undefined).length;
  const head = verses
    ? plural(verses, 'couplet', 'couplets')
    : plural(
        c.parts.reduce((total, p) => total + p.l.length, 0),
        'ligne',
        'lignes'
      );
  return (
    head +
    (c.parts.some((p) => p.t === 'r') ? ' · refrain' : '') +
    (hasAudio('cantiques', c.n) ? ' · audio' : '')
  );
}

/** « Chœur · 2 lignes ». Neuf choeurs n'ont qu'une ligne, d'ou le singulier. */
export function choeurMeta(c: Choeur): string {
  return `Chœur · ${plural(c.l.length, 'ligne', 'lignes')}`;
}
