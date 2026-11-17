import type { Cantique } from '../data/types';
import { hasAudio } from './audio';

const plural = (n: number, singular: string, pluriel: string): string =>
  `${n} ${n > 1 ? pluriel : singular}`;

/**
 * « 5 couplets · refrain · audio », ou « 12 lignes » pour un cantique ecrit en
 * texte continu (cantiques 30 et 38, dont les blocs n'ont pas de numero).
 *
 * Ecart assume vis-a-vis du prototype : il ecrit « 1 couplets » pour les
 * cantiques 21, 54, 65 et 89, qui n'ont qu'un couplet. Le singulier est retabli
 * ici.
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
