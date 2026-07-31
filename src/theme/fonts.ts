// Imports profonds volontaires : la racine de ces paquets est un baril qui
// reexporte les 18 graisses, ce qui embarquerait ~8 Mo de polices inutilisees
// dans le bundle. Chaque sous-dossier n'expose que son propre fichier.
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_400Regular_Italic } from '@expo-google-fonts/dm-sans/400Regular_Italic';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans/500Medium';
import { DMSans_600SemiBold } from '@expo-google-fonts/dm-sans/600SemiBold';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';
import { Literata_400Regular } from '@expo-google-fonts/literata/400Regular';
import { Literata_400Regular_Italic } from '@expo-google-fonts/literata/400Regular_Italic';
import { Literata_500Medium } from '@expo-google-fonts/literata/500Medium';
import { Literata_600SemiBold } from '@expo-google-fonts/literata/600SemiBold';

import { FONTS } from './tokens';

/** Poids reellement employes par le prototype (releve dans la maquette HTML). */
export type FontWeight = 400 | 500 | 600 | 700;
export type FontVariant = 'ui' | 'lyric';

const WEIGHT_SUFFIX: Record<FontWeight, string> = {
  400: '400Regular',
  500: '500Medium',
  600: '600SemiBold',
  700: '700Bold',
};

/**
 * Familles a passer a `useFonts`. Les cles sont les noms de famille utilises
 * ensuite dans les styles, d'ou la correspondance stricte avec `fontFamily()`.
 */
export const FONT_ASSETS = {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  Literata_400Regular,
  Literata_400Regular_Italic,
  Literata_500Medium,
  Literata_600SemiBold,
  // Deux instances statiques de Material Symbols Rounded : React Native ne sait pas
  // piloter l'axe variable FILL, on charge donc l'etat vide et l'etat plein.
  MaterialSymbolsRounded_FILL0: require('../../assets/fonts/MaterialSymbolsRounded_FILL0.ttf'),
  MaterialSymbolsRounded_FILL1: require('../../assets/fonts/MaterialSymbolsRounded_FILL1.ttf'),
};

/**
 * Literata n'est charge qu'en 400/500/600 et en italique 400 : ce sont les seules
 * combinaisons que le prototype demande. Un 700 en Literata retombe sur le 600.
 */
export function fontFamily(variant: FontVariant, weight: FontWeight = 400, italic = false): string {
  const base = variant === 'lyric' ? FONTS.lyric : FONTS.ui;
  if (italic) return `${base}_400Regular_Italic`;
  const w: FontWeight = variant === 'lyric' && weight === 700 ? 600 : weight;
  return `${base}_${WEIGHT_SUFFIX[w]}`;
}

export const iconFontFamily = (filled: boolean): string =>
  `${FONTS.icon}_FILL${filled ? 1 : 0}`;
