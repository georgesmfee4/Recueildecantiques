import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { HapticKind } from '../../hooks/useHaptic';
import { useTheme } from '../../theme/ThemeProvider';
import { RADIUS } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

export interface PrimaryButtonProps {
  label: string;
  /** Seconde ligne, plus discrete. */
  sublabel?: string;
  icon?: IconName;
  /** Chevron de fin, comme sur « Aller à un numéro ». */
  trailingIcon?: IconName;
  onPress: () => void;
  disabled?: boolean;
  height?: number;
  haptic?: HapticKind | null;
  style?: StyleProp<ViewStyle>;
}

/** Bouton plein `primary` : l'action principale d'un ecran. */
export function PrimaryButton({
  label,
  sublabel,
  icon,
  trailingIcon,
  onPress,
  disabled = false,
  height = 60,
  haptic = 'action',
  style,
}: PrimaryButtonProps) {
  const { colors, shadow } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      haptic={haptic}
      scaleTo={PRESS_SCALE.button}
      accessibilityRole="button"
      accessibilityLabel={sublabel ? `${label}. ${sublabel}` : label}
      style={[
        {
          height,
          borderRadius: RADIUS.button,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingHorizontal: 18,
          boxShadow: shadow,
        },
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={26} color={colors.onPrimary} filled /> : null}
      <View style={{ flex: 1 }}>
        <AppText size={16.5} weight={700} letterSpacing={-0.2} color={colors.onPrimary}>
          {label}
        </AppText>
        {sublabel ? (
          // L'opacite reproduit le `opacity:.8` du prototype tout en restant
          // lisible dans les six themes.
          <AppText
            size={12.5}
            color={colors.onPrimary}
            style={{ opacity: 0.8, marginTop: 1 }}
          >
            {sublabel}
          </AppText>
        ) : null}
      </View>
      {trailingIcon ? (
        <Icon name={trailingIcon} size={22} color={colors.onPrimary} style={{ opacity: 0.75 }} />
      ) : null}
    </PressableScale>
  );
}
