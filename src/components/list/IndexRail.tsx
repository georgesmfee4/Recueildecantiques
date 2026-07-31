import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LISTE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { PressableScale } from '../base/PressableScale';

export interface IndexRailProps {
  /** Numeros d'arret : 1, 21, 41… */
  stops: readonly number[];
  onJump: (stop: number) => void;
  /** Zone sure basse : le rail descend jusqu'au bord de l'ecran. */
  extraBottomPadding?: number;
}

/**
 * Rail lateral. C'est lui qui permet de tenir 250 ou 500 cantiques sans changer
 * l'interface : l'acces reste a un seul geste quelle que soit la taille du recueil.
 */
export function IndexRail({ stops, onJump, extraBottomPadding = 0 }: IndexRailProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: LISTE.rail.width,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 2,
        paddingTop: LISTE.rail.paddingV,
        paddingBottom: LISTE.rail.paddingV + extraBottomPadding,
        backgroundColor: colors.background,
        borderLeftWidth: 1,
        borderLeftColor: colors.outline,
      }}
    >
      {stops.map((stop) => (
        <PressableScale
          key={stop}
          onPress={() => onJump(stop)}
          haptic="nav"
          accessibilityRole="button"
          accessibilityLabel={`Aller au numéro ${stop}`}
          hitSlop={6}
          style={{
            width: LISTE.rail.itemWidth,
            height: LISTE.rail.itemHeight,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppText
            size={LISTE.rail.fontSize}
            weight={700}
            letterSpacing={0.2}
            color={colors.onSurface3}
          >
            {stop}
          </AppText>
        </PressableScale>
      ))}
    </View>
  );
}
