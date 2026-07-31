import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { PARAMETRES } from '../../theme/tokens';
import { Icon } from './Icon';
import type { IconName } from './iconNames';

export interface IconChipProps {
  icon: IconName;
  size?: number;
  radius?: number;
  iconSize?: number;
  /** Defaut `colors.primarySoft`. */
  background?: string;
  /** Defaut `colors.onPrimaryContainer`. */
  color?: string;
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Icone posee dans un conteneur teinte. Motif commun aux reglages, aux conseils
 * de recherche et a l'en-tete du clavier numerique : c'est ce qui donne aux
 * rangees une tenue composee plutot qu'une suite d'icones flottantes.
 */
export function IconChip({
  icon,
  size = PARAMETRES.iconChip.size,
  radius = PARAMETRES.iconChip.radius,
  iconSize = PARAMETRES.iconChip.iconSize,
  background,
  color,
  filled = false,
  style,
}: IconChipProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius: radius,
          backgroundColor: background ?? colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Icon
        name={icon}
        size={iconSize}
        color={color ?? colors.onPrimaryContainer}
        filled={filled}
      />
    </View>
  );
}
