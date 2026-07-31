import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { PARAMETRES } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { IconChip } from '../base/IconChip';
import type { IconName } from '../base/iconNames';

const P = PARAMETRES;

export interface SettingsRowProps {
  icon: IconName;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  iconBackground?: string;
  iconColor?: string;
  iconFilled?: boolean;
  /** Aligne l'icone en haut, pour les sous-titres de plusieurs lignes. */
  alignTop?: boolean;
}

export function SettingsRow({
  icon,
  title,
  subtitle,
  right,
  iconBackground,
  iconColor,
  iconFilled = false,
  alignTop = false,
}: SettingsRowProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: alignTop ? 'flex-start' : 'center',
        gap: P.row.gap,
        paddingVertical: P.row.paddingV,
        paddingHorizontal: P.contentInset,
      }}
    >
      <IconChip
        icon={icon}
        background={iconBackground}
        color={iconColor}
        filled={iconFilled}
      />
      <View style={{ flex: 1, minWidth: 0 }}>
        <AppText size={P.row.titleSize} weight={600}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText
            size={P.row.subtitleSize}
            color={colors.onSurface3}
            lineHeight={1.5}
            style={{ marginTop: 3 }}
          >
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {right}
    </View>
  );
}
