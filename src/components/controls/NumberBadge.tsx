import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LISTE } from '../../theme/tokens';
import { AppText } from '../base/AppText';

export interface NumberBadgeProps {
  n: number;
  size?: number;
  radius?: number;
  fontSize?: number;
}

/** Pastille de numero : 46x46 en liste, 44 en recherche, 34 en aperçu. */
export function NumberBadge({
  n,
  size = LISTE.badge.size,
  radius = LISTE.badge.radius,
  fontSize = LISTE.badge.fontSize,
}: NumberBadgeProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: colors.primarySoft,
        borderWidth: 1,
        borderColor: colors.primaryBorder,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <AppText variant="lyric" size={fontSize} weight={600} color={colors.onPrimaryContainer}>
        {n}
      </AppText>
    </View>
  );
}
