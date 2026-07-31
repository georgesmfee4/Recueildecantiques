import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

import { HAPTICS } from '../theme/tokens';

export type HapticKind = keyof typeof HAPTICS;

/**
 * Le prototype exprime le retour haptique en millisecondes de vibration (API web).
 * expo-haptics ne travaille pas en durees mais en intensites nommees : la
 * correspondance ci-dessous conserve la hierarchie voulue par la maquette
 * (touche la plus discrete, ajout de favori la plus marquee).
 */
function trigger(kind: HapticKind): Promise<void> {
  const ms = HAPTICS[kind];
  // 6 ms : la touche du clavier numerique. `selectionAsync` est le retour le plus
  // sec disponible, concu exactement pour ce genre de saisie repetee.
  if (ms <= HAPTICS.key) return Haptics.selectionAsync();
  if (ms <= HAPTICS.action) return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/**
 * Le retour haptique ne doit jamais faire echouer une interaction : sur un
 * appareil sans moteur de vibration, l'appel rejette et on l'ignore.
 */
export function useHaptic() {
  return useCallback((kind: HapticKind) => {
    void trigger(kind).catch(() => undefined);
  }, []);
}
