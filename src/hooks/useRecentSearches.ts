import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Meme convention de nommage que les autres cles du recueil. */
const KEY = 'rdc.recents';
const MAX = 8;

const isStringList = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string');

/**
 * Recherches recentes, reellement enregistrees.
 *
 * La maquette affichait une liste figee (« 87 », « enlevés », « grâce »…) : c'etait
 * une demonstration, au meme titre que les favoris pre-remplis. Ici la liste part
 * vide et se remplit des recherches qui ont mene a l'ouverture d'un chant — le
 * seul signal qui indique qu'une requete a servi a quelque chose.
 */
export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (cancelled || raw === null) return;
        const value: unknown = JSON.parse(raw);
        if (isStringList(value)) setRecents(value.slice(0, MAX));
      } catch {
        // valeur illisible ou stockage indisponible : on repart d'une liste vide
      } finally {
        loaded.current = true;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const remember = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecents((current) => {
      // Une requete deja presente remonte en tete plutot que d'etre dupliquee.
      const next = [trimmed, ...current.filter((r) => r !== trimmed)].slice(0, MAX);
      void AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  return { recents, remember };
}
