import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { ACCUEIL, RADIUS } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';

export interface StatCardProps {
  primaryValue: number;
  primaryLabel: string;
  pillLabel: string;
  pillIcon: IconName;
}

/**
 * Carte statistique de l'Accueil : un seul nombre, celui des cantiques. Il vient
 * toujours du recueil :
 * aucun comptage n'est ecrit en dur, le passage a 250 ou 500 cantiques se fait
 * sans toucher a ce composant.
 */
export function StatCard({
  primaryValue,
  primaryLabel,
  pillLabel,
  pillIcon,
}: StatCardProps) {
  const { colors } = useTheme();
  const { stat } = ACCUEIL;

  return (
    <View
      style={{
        padding: stat.padding,
        borderRadius: stat.radius,
        backgroundColor: colors.primaryContainer,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cercle decoratif, rogne par la carte. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: stat.circle.top,
          right: stat.circle.right,
          width: stat.circle.size,
          height: stat.circle.size,
          borderRadius: stat.circle.size / 2,
          backgroundColor: colors.primary,
          opacity: stat.circle.opacity,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 18 }}>
        <View>
          <AppText
            variant="lyric"
            size={stat.cantiquesSize}
            weight={600}
            lineHeight={1}
            letterSpacing={stat.cantiquesLetterSpacing}
            color={colors.onPrimaryContainer}
          >
            {primaryValue}
          </AppText>
          <AppText
            size={13}
            weight={500}
            color={colors.onPrimaryContainer}
            style={{ marginTop: 5, opacity: stat.labelOpacity }}
          >
            {primaryLabel}
          </AppText>
        </View>
      </View>

      {/* `alignSelf: flex-start` reproduit le `display:inline-flex` du prototype :
          la pastille ne s'etire pas sur toute la largeur. */}
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          marginTop: 16,
          paddingVertical: 7,
          paddingLeft: 10,
          paddingRight: 12,
          borderRadius: RADIUS.pill,
          backgroundColor: colors.surface,
        }}
      >
        <Icon name={pillIcon} size={16} color={colors.primary} />
        <AppText size={12} weight={500} color={colors.onSurface2}>
          {pillLabel}
        </AppText>
      </View>
    </View>
  );
}
