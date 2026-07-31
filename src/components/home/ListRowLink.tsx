import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { ACCUEIL } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { IconChip } from '../base/IconChip';
import type { IconName } from '../base/iconNames';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

export interface ListRowLinkProps {
  title: string;
  /** Valeur affichee a droite, avant le chevron. */
  subtitle?: string;
  icon?: IconName;
  /** `'chevron'` affiche le chevron de navigation ; un noeud le remplace. */
  right?: ReactNode | 'chevron';
  onPress?: () => void;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Ligne cliquable pleine largeur. Meme traitement que les tuiles de l'Accueil :
 * pastille d'icone, pas de bordure, l'ombre douce pour tout relief.
 */
export function ListRowLink({
  title,
  subtitle,
  icon,
  right = 'chevron',
  onPress,
  radius = ACCUEIL.aboutRow.radius,
  style,
}: ListRowLinkProps) {
  const { colors, shadow } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      disabled={!onPress}
      scaleTo={PRESS_SCALE.row}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 12,
          paddingHorizontal: 14,
          boxShadow: shadow,
        },
        style,
      ]}
    >
      {icon ? <IconChip icon={icon} size={38} radius={13} iconSize={20} /> : null}
      <AppText size={14.5} weight={500} style={{ flex: 1 }}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText size={12.5} color={colors.onSurface3}>
          {subtitle}
        </AppText>
      ) : null}
      {right === 'chevron' ? (
        <Icon name="chevron_right" size={20} color={colors.onSurface3} />
      ) : (
        right
      )}
    </PressableScale>
  );
}
