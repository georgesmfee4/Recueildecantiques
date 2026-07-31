import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useHaptic } from '../../hooks/useHaptic';
import type { SearchResult } from '../../lib/searchIndex';
import { useTheme } from '../../theme/ThemeProvider';
import { RECHERCHE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { NumberBadge } from '../controls/NumberBadge';

const { result } = RECHERCHE;

export interface SearchResultRowProps {
  item: SearchResult;
  /** Doit etre stable : la ligne est memoisee. */
  onOpen: (item: SearchResult) => void;
}

function SearchResultRowBase({ item, onOpen }: SearchResultRowProps) {
  const { colors } = useTheme();
  const buzz = useHaptic();
  const { snippet } = item;

  return (
    <Pressable
      onPress={() => {
        buzz('open');
        onOpen(item);
      }}
      accessibilityRole="button"
      accessibilityLabel={`${item.kind} ${item.n}. ${item.title}`}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: result.gap,
        paddingVertical: result.paddingV,
        paddingHorizontal: result.paddingH,
        borderBottomWidth: 1,
        borderBottomColor: colors.outline,
        backgroundColor: pressed ? colors.surface2 : 'transparent',
      })}
    >
      <NumberBadge n={item.n} size={result.badgeSize} radius={result.badgeRadius} fontSize={16} />

      <View style={{ flex: 1, minWidth: 0 }}>
        <AppText size={result.titleSize} weight={500} lineHeight={1.3}>
          {item.title}
        </AppText>
        <AppText
          size={result.kindSize}
          color={colors.onSurface3}
          lineHeight={1.4}
          style={{ marginTop: 3 }}
        >
          {item.kind}
        </AppText>

        {snippet ? (
          // Le surlignage est un fragment de texte imbrique : il suit le retour a
          // la ligne de l'extrait au lieu de le couper, ce qu'une vue ferait.
          <AppText
            variant="lyric"
            size={result.snippetSize}
            color={colors.onSurface2}
            lineHeight={1.45}
            style={{ marginTop: 5 }}
          >
            {snippet.before}
            <AppText
              variant="lyric"
              size={result.snippetSize}
              color={colors.onPrimaryContainer}
              style={{ backgroundColor: colors.primaryContainer }}
            >
              {snippet.match}
            </AppText>
            {snippet.after}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

export const SearchResultRow = memo(SearchResultRowBase);
