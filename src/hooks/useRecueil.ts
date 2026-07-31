import { useMemo } from 'react';

import {
  MAX_NUMBER,
  TOTALS,
  entriesFor,
  exists,
  getEntry,
  getReaderBlocks,
  getSection,
  neighbours,
  railTarget,
  type ListEntry,
  type ReaderBlock,
} from '../data/recueil';
import type { Section } from '../data/types';

export type { ListEntry, ReaderBlock };

/**
 * Le recueil est statique : tout est indexe une fois au chargement du module.
 * Ce hook n'est qu'un point d'acces uniforme pour les composants.
 */
export function useRecueil() {
  return {
    totals: TOTALS,
    maxNumber: MAX_NUMBER,
    getSection,
    getEntry,
    exists,
    neighbours,
    railTarget,
    getReaderBlocks,
    entriesFor,
  };
}

/** Lignes d'une section, memoisees par reference (le tableau ne change jamais). */
export function useSectionEntries(section: Section): ListEntry[] {
  return useMemo(() => getSection(section).entries, [section]);
}

/** Arrets du rail d'index lateral pour une section. */
export function useRailStops(section: Section): number[] {
  return useMemo(() => getSection(section).railStops, [section]);
}
