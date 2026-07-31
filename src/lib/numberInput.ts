/** Touches du pave numerique, dans l'ordre d'affichage du prototype. */
export const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'clear'] as const;

export type Key = (typeof KEYS)[number];

export const isActionKey = (key: Key): boolean => key === 'back' || key === 'clear';

/**
 * Applique une touche a la saisie courante.
 *
 * Deux regles, la premiere du prototype et la seconde renforcee :
 * - les zeros initiaux sont ignores, « 0 » puis « 8 » donne « 8 » ;
 * - la longueur est plafonnee a `maxDigits`, deduit du plus grand numero de la
 *   section. Le prototype figeait 4 chiffres, ce qui laissait saisir « 1234 »
 *   alors qu'aucun chant ne portera jamais ce numero.
 *
 * Le plafond est teste **apres** le retrait des zeros, sinon « 000 » consommerait
 * la place de chiffres significatifs.
 */
export function applyKey(value: string, key: Key, maxDigits: number): string {
  if (key === 'clear') return '';
  if (key === 'back') return value.slice(0, -1);
  const next = (value + key).replace(/^0+/, '');
  return next.length > maxDigits ? value : next;
}

/** Nombre de chiffres saisissables pour une borne donnee. */
export const digitsFor = (max: number): number => String(max).length;
