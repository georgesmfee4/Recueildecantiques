import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { fontFamily, type FontVariant, type FontWeight } from '../../theme/fonts';

export interface AppTextProps extends Omit<TextProps, 'style'> {
  /** `ui` = DM Sans (interface), `lyric` = Literata (paroles, titres, numeros). */
  variant?: FontVariant;
  size?: number;
  weight?: FontWeight;
  italic?: boolean;
  /** Par defaut `colors.onSurface`. */
  color?: string;
  letterSpacing?: number;
  /** Multiplicateur, comme dans la maquette : converti en pixels pour React Native. */
  lineHeight?: number;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

/**
 * Unique point d'entree typographique. React Native n'applique pas `fontWeight`
 * aux polices chargees par fichier : le poids doit passer par le nom de famille,
 * d'ou ce composant plutot que des styles ecrits a la main.
 */
export function AppText({
  variant = 'ui',
  size = 14,
  weight = 400,
  italic = false,
  color,
  letterSpacing,
  lineHeight,
  align,
  style,
  ...rest
}: AppTextProps) {
  const { colors } = useTheme();
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamily(variant, weight, italic),
          fontSize: size,
          color: color ?? colors.onSurface,
          ...(letterSpacing !== undefined ? { letterSpacing } : null),
          ...(lineHeight !== undefined ? { lineHeight: size * lineHeight } : null),
          ...(align !== undefined ? { textAlign: align } : null),
        },
        style,
      ]}
    />
  );
}
