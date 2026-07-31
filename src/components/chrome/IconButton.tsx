import type { StyleProp, ViewStyle } from 'react-native';

import type { HapticKind } from '../../hooks/useHaptic';
import { useTheme } from '../../theme/ThemeProvider';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

export interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  /** Obligatoire : un bouton d'icone n'a aucun texte a annoncer. */
  accessibilityLabel: string;
  /** Cible tactile. Jamais sous 44 px. */
  size?: number;
  iconSize?: number;
  /** Defaut `colors.surface2`. `null` pour un bouton sans fond. */
  background?: string | null;
  /** Defaut `colors.onSurface2`. */
  color?: string;
  filled?: boolean;
  disabled?: boolean;
  haptic?: HapticKind | null;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  size = 44,
  iconSize = 22,
  background,
  color,
  filled = false,
  disabled = false,
  haptic = 'nav',
  style,
}: IconButtonProps) {
  const { colors } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      haptic={haptic}
      scaleTo={PRESS_SCALE.icon}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          ...(background === null ? null : { backgroundColor: background ?? colors.surface2 }),
        },
        style,
      ]}
    >
      <Icon name={icon} size={iconSize} color={color ?? colors.onSurface2} filled={filled} />
    </PressableScale>
  );
}
