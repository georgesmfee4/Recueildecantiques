import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { RADIUS } from '../../theme/tokens';

export interface CardProps extends Omit<ViewProps, 'style'> {
  radius?: number;
  /** `true` applique le padding de carte des tokens ; un nombre le remplace. */
  padded?: boolean | number;
  /** Defaut `colors.surface`. */
  background?: string;
  /** Defaut `colors.outline`. `null` retire la bordure. */
  borderColor?: string | null;
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Carte generique : bordure 1px `outline` sur toutes les cartes du prototype. */
export function Card({
  radius = RADIUS.card,
  padded = false,
  background,
  borderColor,
  shadow = false,
  style,
  ...rest
}: CardProps) {
  const { colors, shadow: boxShadow } = useTheme();
  const border = borderColor === null ? null : (borderColor ?? colors.outline);

  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius,
          backgroundColor: background ?? colors.surface,
          ...(border ? { borderWidth: 1, borderColor: border } : null),
          ...(padded ? { padding: padded === true ? 18 : padded } : null),
          ...(shadow ? { boxShadow } : null),
        },
        style,
      ]}
    />
  );
}
