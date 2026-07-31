import { useTheme } from '../../theme/ThemeProvider';
import { LISTE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

export interface ChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
  icon?: IconName;
  iconFilled?: boolean;
}

/** Filtre de liste. Actif : fond `primary`. Inactif : fond `surface`. */
export function Chip({ label, active = false, onPress, icon, iconFilled = false }: ChipProps) {
  const { colors } = useTheme();
  const fg = active ? colors.onPrimary : colors.onSurface2;

  return (
    <PressableScale
      onPress={onPress}
      scaleTo={PRESS_SCALE.icon}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      style={{
        height: LISTE.chip.height,
        borderRadius: LISTE.chip.radius,
        borderWidth: 1,
        borderColor: colors.outline,
        backgroundColor: active ? colors.primary : colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // Le chip a icone est legerement moins large a gauche, comme dans la maquette.
        paddingLeft: icon ? 10 : LISTE.chip.paddingH,
        paddingRight: icon ? 13 : LISTE.chip.paddingH,
      }}
    >
      {icon ? <Icon name={icon} size={LISTE.chip.iconSize} color={fg} filled={iconFilled} /> : null}
      <AppText size={LISTE.chip.fontSize} weight={600} color={fg}>
        {label}
      </AppText>
    </PressableScale>
  );
}
