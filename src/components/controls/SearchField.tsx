import { TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { fontFamily } from '../../theme/fonts';
import { LISTE, RADIUS } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

export interface SearchFieldProps {
  placeholder: string;
  /** Champ factice : aucune saisie, l'appui ouvre l'ecran Recherche. */
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Deux emplois : factice sur la Liste (`onPress` seul), actif sur l'ecran
 * Recherche (`value` + `onChangeText`).
 */
export function SearchField({
  placeholder,
  onPress,
  value,
  onChangeText,
  onClear,
  autoFocus = false,
  height = LISTE.searchField.height,
  style,
}: SearchFieldProps) {
  const { colors } = useTheme();
  const editable = onChangeText !== undefined;

  const inner = (
    <>
      <Icon name="search" size={LISTE.searchField.iconSize} color={colors.onSurface3} />
      {editable ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurface3}
          autoFocus={autoFocus}
          autoCorrect={false}
          returnKeyType="search"
          style={{
            flex: 1,
            padding: 0,
            fontFamily: fontFamily('ui', 400),
            fontSize: LISTE.searchField.fontSize,
            color: colors.onSurface,
          }}
        />
      ) : (
        <AppText size={LISTE.searchField.fontSize} color={colors.onSurface3} style={{ flex: 1 }}>
          {placeholder}
        </AppText>
      )}
      {editable && value ? (
        <PressableScale
          onPress={onClear}
          haptic="nav"
          scaleTo={PRESS_SCALE.icon}
          accessibilityRole="button"
          accessibilityLabel="Effacer la recherche"
          hitSlop={10}
        >
          <Icon name="close" size={20} color={colors.onSurface2} />
        </PressableScale>
      ) : null}
    </>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LISTE.searchField.gap,
      height,
      paddingHorizontal: LISTE.searchField.paddingH,
      borderRadius: RADIUS.field,
      backgroundColor: colors.surface2,
    },
    style,
  ];

  if (editable) return <View style={containerStyle}>{inner}</View>;

  return (
    <PressableScale
      onPress={onPress}
      scaleTo={PRESS_SCALE.row}
      accessibilityRole="search"
      accessibilityLabel={placeholder}
      style={containerStyle}
    >
      {inner}
    </PressableScale>
  );
}
