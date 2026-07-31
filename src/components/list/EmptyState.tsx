import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LISTE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingVertical: LISTE.empty.paddingV,
        paddingHorizontal: LISTE.empty.paddingH,
        alignItems: 'center',
      }}
    >
      {/* `surface3` et non `onSurface3` : l'icone est un aplat discret. */}
      <Icon name={icon} size={LISTE.empty.iconSize} color={colors.surface3} />
      <AppText size={16} weight={600} align="center" style={{ marginTop: 14 }}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText
          size={13.5}
          color={colors.onSurface3}
          lineHeight={1.55}
          align="center"
          style={{ marginTop: 6 }}
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}
