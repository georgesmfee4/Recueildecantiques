import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Section } from '../data/types';

/** Cles de persistance reprises telles quelles du prototype. */
const KEYS: Record<Section, string> = { cantiques: 'rdc.favs', choeurs: 'rdc.favsCh' };

const isNumberList = (v: unknown): v is number[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'number' && Number.isInteger(x));

interface FavoritesContextValue {
  favs: readonly number[];
  favsCh: readonly number[];
  /** Total des deux sections, pour le sous-titre de la tuile Favoris. */
  count: number;
  isFavorite: (section: Section, n: number) => boolean;
  toggle: (section: Section, n: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favs, setFavs] = useState<number[]>([]);
  const [favsCh, setFavsCh] = useState<number[]>([]);

  // Listes vides au premier lancement. La maquette pre-remplissait [3, 12, 87] et
  // [5] pour la demonstration : le README demande explicitement de ne pas le faire.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([KEYS.cantiques, KEYS.choeurs]);
        if (cancelled) return;
        for (const [key, raw] of entries) {
          if (raw === null) continue;
          try {
            const value: unknown = JSON.parse(raw);
            if (!isNumberList(value)) continue;
            if (key === KEYS.cantiques) setFavs(value);
            else setFavsCh(value);
          } catch {
            // valeur illisible : on repart d'une liste vide
          }
        }
      } catch {
        // stockage indisponible : les favoris restent en memoire
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback((section: Section, n: number) => {
    const apply = (current: number[]): number[] =>
      current.includes(n) ? current.filter((x) => x !== n) : [...current, n].sort((a, b) => a - b);

    const commit = (next: number[]) => {
      void AsyncStorage.setItem(KEYS[section], JSON.stringify(next)).catch(() => undefined);
      return next;
    };

    if (section === 'cantiques') setFavs((cur) => commit(apply(cur)));
    else setFavsCh((cur) => commit(apply(cur)));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favs,
      favsCh,
      count: favs.length + favsCh.length,
      isFavorite: (section, n) => (section === 'cantiques' ? favs : favsCh).includes(n),
      toggle,
    }),
    [favs, favsCh, toggle]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites doit etre utilise a l\'interieur de <FavoritesProvider>');
  return ctx;
}
