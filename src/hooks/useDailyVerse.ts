import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { VERSETS, type Verset } from '../data/versets';

const MS_PER_DAY = 86_400_000;

/**
 * Numéro du jour, calculé sur la date **locale**.
 *
 * `Date.now() / 86400000` compterait les jours en temps universel : le verset
 * changerait à minuit UTC, soit en pleine journée dans une bonne partie du monde.
 * En reconstruisant la date à partir de l'année, du mois et du jour locaux, la
 * bascule tombe bien à minuit chez l'utilisateur.
 */
export function localDayNumber(now: Date = new Date()): number {
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / MS_PER_DAY);
}

/** Verset correspondant à un jour donné. Exposé pour pouvoir être testé. */
export function verseForDay(day: number, verses: readonly Verset[] = VERSETS): Verset {
  // Double modulo : `%` garde le signe en JavaScript, et une date anterieure a
  // 1970 donnerait un index negatif.
  const size = verses.length;
  return verses[((day % size) + size) % size];
}

/**
 * Verset du jour. Déterministe : à date égale, tous les appareils d'un même
 * fuseau affichent le même verset — l'assemblée partage le même texte.
 *
 * Le verset est recalculé au retour au premier plan, pour qu'une application
 * laissée ouverte toute la nuit ne reste pas sur celui de la veille.
 */
export function useDailyVerse(): Verset {
  const [day, setDay] = useState(() => localDayNumber());

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setDay(localDayNumber());
    });
    return () => sub.remove();
  }, []);

  return verseForDay(day);
}
