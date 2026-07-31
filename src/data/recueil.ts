import { cantiqueMeta, choeurMeta, choeurTitle } from '../lib/meta';
import rawRecueil from './recueil.json';
import type { Cantique, Choeur, Recueil, Section } from './types';

const data = rawRecueil as Recueil;

export const SECTIONS: readonly Section[] = ['cantiques', 'choeurs'];

/** Une ligne de liste, prete a afficher : plus aucun calcul au moment du rendu. */
export interface ListEntry {
  section: Section;
  n: number;
  title: string;
  meta: string;
}

/** Bloc normalise pour l'ecran Lecture, cantiques et choeurs confondus. */
export type ReaderBlock =
  | { kind: 'verse'; n?: number; lines: string[] }
  | { kind: 'chorus'; lines: string[] };

interface SectionData {
  entries: ListEntry[];
  byNumber: Map<number, ListEntry>;
  /** Position dans `entries` : la navigation circule par rang, pas par numero. */
  positionOf: Map<number, number>;
  total: number;
  maxNumber: number;
  railStops: number[];
}

/** Pas du rail d'index lateral : 1, 21, 41… comme dans le prototype. */
const RAIL_STEP = 20;

function buildSection(entries: ListEntry[]): SectionData {
  const byNumber = new Map<number, ListEntry>();
  const positionOf = new Map<number, number>();
  entries.forEach((entry, i) => {
    byNumber.set(entry.n, entry);
    positionOf.set(entry.n, i);
  });

  // Borne calculee sur le dernier numero, pas sur le nombre d'elements : les
  // choeurs vont jusqu'a 75 alors qu'ils ne sont que 74 (le 26 manque).
  const last = entries.length ? entries[entries.length - 1].n : 1;
  const railStops: number[] = [];
  for (let k = 1; k <= last; k += RAIL_STEP) railStops.push(k);

  return {
    entries,
    byNumber,
    positionOf,
    total: entries.length,
    maxNumber: entries.reduce((max, e) => (e.n > max ? e.n : max), 0),
    railStops,
  };
}

// Index construits une seule fois au chargement du module.
const cantiqueByNumber = new Map<number, Cantique>(data.cantiques.map((c) => [c.n, c]));
const choeurByNumber = new Map<number, Choeur>(data.choeurs.map((c) => [c.n, c]));

const sections: Record<Section, SectionData> = {
  cantiques: buildSection(
    data.cantiques.map((c) => ({
      section: 'cantiques' as const,
      n: c.n,
      title: c.title,
      meta: cantiqueMeta(c),
    }))
  ),
  choeurs: buildSection(
    data.choeurs.map((c) => ({
      section: 'choeurs' as const,
      n: c.n,
      title: choeurTitle(c),
      meta: choeurMeta(c),
    }))
  ),
};

export const getSection = (section: Section): SectionData => sections[section];

export const getEntry = (section: Section, n: number): ListEntry | undefined =>
  sections[section].byNumber.get(n);

export const exists = (section: Section, n: number): boolean =>
  sections[section].byNumber.has(n);

/** Nombres affiches par la carte statistique. Jamais ecrits en dur. */
export const TOTALS: Record<Section, number> = {
  cantiques: sections.cantiques.total,
  choeurs: sections.choeurs.total,
};

/** Borne du clavier « Aller à un numéro », par section. */
export const MAX_NUMBER: Record<Section, number> = {
  cantiques: sections.cantiques.maxNumber,
  choeurs: sections.choeurs.maxNumber,
};

/**
 * Voisins circulaires dans la section. On avance d'un rang dans la liste et non
 * de 1 en numero, sinon le trou des choeurs (26) casserait l'enchainement.
 */
export function neighbours(section: Section, n: number): { prev: number; next: number } {
  const { entries, positionOf } = sections[section];
  if (!entries.length) return { prev: n, next: n };
  const i = positionOf.get(n);
  if (i === undefined) return { prev: entries[0].n, next: entries[0].n };
  const len = entries.length;
  return {
    prev: entries[(i - 1 + len) % len].n,
    next: entries[(i + 1) % len].n,
  };
}

/**
 * Rang de la ligne vers laquelle defiler pour un arret du rail. Un arret peut ne
 * correspondre a aucun numero existant : on vise alors la premiere ligne au-dela.
 */
export function railTarget(section: Section, stop: number): number {
  const { entries, positionOf } = sections[section];
  const exact = positionOf.get(stop);
  if (exact !== undefined) return exact;
  const i = entries.findIndex((e) => e.n >= stop);
  return i === -1 ? Math.max(0, entries.length - 1) : i;
}

/**
 * Contenu a afficher en lecture.
 *
 * Un choeur se rend comme un chant entier : un simple bloc de paroles. Le
 * prototype l'affichait en carte de refrain avec l'etiquette « REFRAIN », ce qui
 * etait trompeur — un choeur n'est pas le refrain de quelque chose, c'est le
 * chant complet.
 */
export function getReaderBlocks(section: Section, n: number): ReaderBlock[] {
  if (section === 'choeurs') {
    const choeur = choeurByNumber.get(n);
    return choeur ? [{ kind: 'verse', lines: choeur.l }] : [];
  }
  const cantique = cantiqueByNumber.get(n);
  if (!cantique) return [];
  return cantique.parts.map((p) =>
    p.t === 'r'
      ? { kind: 'chorus', lines: p.l }
      : // Un couplet sans numero est un bloc de texte continu (cantiques 30 et 38).
        { kind: 'verse', n: p.n, lines: p.l }
  );
}

export const getCantique = (n: number): Cantique | undefined => cantiqueByNumber.get(n);
export const getChoeur = (n: number): Choeur | undefined => choeurByNumber.get(n);

/** Cantiques puis choeurs, pour l'ecran Favoris qui reunit les deux sections. */
export function entriesFor(favs: readonly number[], favsCh: readonly number[]): ListEntry[] {
  const pick = (section: Section, numbers: readonly number[]) =>
    numbers
      .map((n) => sections[section].byNumber.get(n))
      .filter((e): e is ListEntry => e !== undefined);
  return [...pick('cantiques', favs), ...pick('choeurs', favsCh)];
}
