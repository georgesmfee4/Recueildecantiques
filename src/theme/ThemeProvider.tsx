import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  BOX_SHADOW,
  COLORS,
  ERROR_COLOR,
  TEXT_SIZES,
  type ColorScheme,
  type ThemeId,
} from './tokens';

export type TextSizeIndex = 0 | 1 | 2 | 3;
export type TextSize = (typeof TEXT_SIZES)[number];

/** Cles de persistance reprises telles quelles du prototype. */
const KEYS = { theme: 'rdc.theme', dark: 'rdc.dark', ts: 'rdc.ts' } as const;

const THEME_IDS: ThemeId[] = ['bleu', 'vert', 'violet', 'orange', 'rouge', 'noir'];

const isThemeId = (v: unknown): v is ThemeId =>
  typeof v === 'string' && (THEME_IDS as string[]).includes(v);

const isTextSizeIndex = (v: unknown): v is TextSizeIndex =>
  v === 0 || v === 1 || v === 2 || v === 3;

interface ThemeContextValue {
  colors: ColorScheme;
  textSize: TextSize;
  theme: ThemeId;
  dark: boolean;
  ts: TextSizeIndex;
  /** Chaine `boxShadow` : les deux couches d'ombre du prototype, telles quelles. */
  shadow: string;
  /** Rouge des messages d'erreur, adapte au mode. */
  error: string;
  /** true tant que les preferences n'ont pas ete relues depuis le stockage. */
  hydrating: boolean;
  setTheme: (t: ThemeId) => void;
  setDark: (d: boolean) => void;
  setTs: (i: TextSizeIndex) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('bleu');
  const [dark, setDarkState] = useState(false);
  const [ts, setTsState] = useState<TextSizeIndex>(1);
  const [hydrating, setHydrating] = useState(true);

  // Relecture au demarrage. Une valeur illisible est ignoree au profit du defaut :
  // une preference corrompue ne doit jamais empecher l'application de s'ouvrir.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([KEYS.theme, KEYS.dark, KEYS.ts]);
        if (cancelled) return;
        for (const [key, raw] of entries) {
          if (raw === null) continue;
          try {
            const value: unknown = JSON.parse(raw);
            if (key === KEYS.theme && isThemeId(value)) setThemeState(value);
            else if (key === KEYS.dark && typeof value === 'boolean') setDarkState(value);
            else if (key === KEYS.ts && isTextSizeIndex(value)) setTsState(value);
          } catch {
            // valeur non parsable : on garde le defaut
          }
        }
      } catch {
        // stockage indisponible : on tourne en memoire
      } finally {
        if (!cancelled) setHydrating(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // L'etat est pose immediatement puis persiste en arriere-plan : le changement de
  // theme doit etre instantane, jamais suspendu a une ecriture disque.
  const persist = useCallback((key: string, value: unknown) => {
    void AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => undefined);
  }, []);

  const setTheme = useCallback(
    (t: ThemeId) => {
      setThemeState(t);
      persist(KEYS.theme, t);
    },
    [persist]
  );

  const setDark = useCallback(
    (d: boolean) => {
      setDarkState(d);
      persist(KEYS.dark, d);
    },
    [persist]
  );

  const setTs = useCallback(
    (i: TextSizeIndex) => {
      setTsState(i);
      persist(KEYS.ts, i);
    },
    [persist]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: COLORS[theme][dark ? 'dark' : 'light'],
      textSize: TEXT_SIZES[ts],
      theme,
      dark,
      ts,
      shadow: dark ? BOX_SHADOW.dark : BOX_SHADOW.light,
      error: dark ? ERROR_COLOR.dark : ERROR_COLOR.light,
      hydrating,
      setTheme,
      setDark,
      setTs,
    }),
    [theme, dark, ts, hydrating, setTheme, setDark, setTs]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit etre utilise a l\'interieur de <ThemeProvider>');
  return ctx;
}
