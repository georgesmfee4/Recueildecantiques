import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import type { ListEntry } from '../../data/recueil';
import { useHaptic } from '../../hooks/useHaptic';
import { useTheme } from '../../theme/ThemeProvider';
import { LISTE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { NumberBadge } from '../controls/NumberBadge';

export interface HymnRowProps {
  entry: ListEntry;
  favorite: boolean;
  /** Doit etre stable : la ligne est memoisee. */
  onOpen: (entry: ListEntry) => void;
  /** Rang dans la liste, pour le decalage de l'ouverture en cascade. */
  index: number;
  /** Progression de l'ouverture, en millisecondes. Reference stable. */
  reveal: SharedValue<number>;
}

const { row, reveal: R } = LISTE;

function HymnRowBase({ entry, favorite, onOpen, index, reveal }: HymnRowProps) {
  const { colors } = useTheme();
  const buzz = useHaptic();

  // Fenetre d'animation propre a cette ligne. Au-dela des premieres lignes, le
  // decalage est plafonne : `reveal` valant deja son maximum quand une ligne
  // recyclee apparait, elle s'affiche instantanement et sans clignotement.
  const animatedStyle = useAnimatedStyle(() => {
    const start = Math.min(index, R.staggeredRows) * R.step;
    const raw = (reveal.value - start) / R.duration;
    const t = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    const eased = 1 - (1 - t) ** 3;
    return { opacity: eased, transform: [{ translateY: (1 - eased) * R.offset }] };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => {
          buzz('open');
          onOpen(entry);
        }}
        accessibilityRole="button"
        accessibilityLabel={`${entry.n}. ${entry.title}. ${entry.meta}${favorite ? '. Favori' : ''}`}
        // Le prototype eclaire le fond de la ligne, sans enfoncement.
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: row.gap,
          paddingVertical: row.paddingV,
          paddingLeft: row.paddingLeft,
          paddingRight: row.paddingRight,
          borderBottomWidth: 1,
          borderBottomColor: colors.outline,
          backgroundColor: pressed ? colors.surface2 : 'transparent',
        })}
      >
        <NumberBadge n={entry.n} />

        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText
            size={row.titleSize}
            weight={500}
            lineHeight={row.titleLineHeight}
            letterSpacing={row.titleLetterSpacing}
          >
            {entry.title}
          </AppText>
          <AppText size={row.metaSize} color={colors.onSurface3} style={{ marginTop: 3 }}>
            {entry.meta}
          </AppText>
        </View>

        {/* Largeur reservee meme sans marque-page, pour aligner les titres. */}
        <View style={{ width: row.bookmarkSize, flexShrink: 0 }}>
          {favorite ? (
            <Icon name="bookmark" size={row.bookmarkSize} color={colors.gold} filled />
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export const HymnRow = memo(HymnRowBase);
