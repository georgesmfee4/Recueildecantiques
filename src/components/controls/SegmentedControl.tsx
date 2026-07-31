import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../base/AppText';
import { PressableScale } from '../base/PressableScale';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Permet une echelle de corps croissante (les quatre « A » des Paramètres). */
  labelSize?: number;
  /** Annonce vocale, quand le libelle seul ne suffit pas. */
  accessibilityLabel?: string;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  height?: number;
  trackRadius?: number;
  trackPadding?: number;
  itemRadius?: number;
  gap?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Piste `surface2`, onglet actif en `surface` avec ombre et texte `primary` :
 * l'onglet selectionne se souleve, les autres restent transparents.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  height = 38,
  trackRadius = 15,
  trackPadding = 4,
  itemRadius = 11,
  gap = 6,
  fontSize = 13,
  style,
}: SegmentedControlProps<T>) {
  const { colors, shadow } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap,
          padding: trackPadding,
          borderRadius: trackRadius,
          backgroundColor: colors.surface2,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <PressableScale
            key={option.value}
            onPress={() => onChange(option.value)}
            haptic="nav"
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.accessibilityLabel ?? option.label}
            style={{
              flex: 1,
              height,
              borderRadius: itemRadius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? colors.surface : 'transparent',
              ...(active ? { boxShadow: shadow } : null),
            }}
          >
            <AppText
              size={option.labelSize ?? fontSize}
              weight={600}
              color={active ? colors.primary : colors.onSurface3}
            >
              {option.label}
            </AppText>
          </PressableScale>
        );
      })}
    </View>
  );
}
