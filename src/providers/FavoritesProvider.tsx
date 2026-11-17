import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import type { Section } from '../data/types';

/** Cle de persistance reprise telle quelle du prototype. */
const KEY = 'rdc.favs';
/** Ancienne cle des choeurs favoris, effacee au demarrage depuis leur suppression. */
const LEGACY_CHOEURS_KEY = 'rdc.favsCh';

const isNumberList = (v: unknown): v is number[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'number' && Number.isInteger(x));

interface FavoritesContextValue {
  favs: readonly number[];
  /** Nombre de favoris, pour le sous-titre de la tuile Favoris. */
  count: number;
  isFavorite: (section: Section, n: number) => boolean;
  toggle: (section: Section, n: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favs, setFavs] = useState<number[]>([]);

  // Liste vide au premier lancement. La maquette pre-remplissait [3, 12, 87] pour
  // la demonstration : le README demande explicitement de ne pas le faire.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        void AsyncStorage.removeItem(LEGACY_CHOEURS_KEY).catch(() => undefined);
        const raw = await AsyncStorage.getItem(KEY);
        if (cancelled || raw === null) return;
        try {
          const value: unknown = JSON.parse(raw);
          if (isNumberList(value)) setFavs(value);
        } catch {
          // valeur illisible : on repart d'une liste vide
        }
      } catch {
        // stockage indisponible : les favoris restent en memoire
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback((_section: Section, n: number) => {
    const apply = (current: number[]): number[] =>
      current.includes(n) ? current.filter((x) => x !== n) : [...current, n].sort((a, b) => a - b);

    const commit = (next: number[]) => {
      void AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    };

    setFavs((cur) => commit(apply(cur)));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favs,
      count: favs.length,
      isFavorite: (_section, n) => favs.includes(n),
      toggle,
    }),
    [favs, toggle]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites doit etre utilise a l\'interieur de <FavoritesProvider>');
  return ctx;
}
