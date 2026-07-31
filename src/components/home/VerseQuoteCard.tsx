import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { ACCUEIL } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';

export interface VerseQuoteCardProps {
  quote: string;
  /** Casse naturelle : la carte la met en capitales. */
  reference: string;
  /** Intitulé posé près de l'icône. Sans lui, rien ne dit que le verset tourne. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Carte du verset biblique. Seul emploi des jetons `gold*` avec le splash :
 * ils ne doivent apparaitre nulle part ailleurs.
 */
export function VerseQuoteCard({ quote, reference, label, style }: VerseQuoteCardProps) {
  const { colors } = useTheme();
  const { verse } = ACCUEIL;

  return (
    <View
      style={[
        {
          borderRadius: verse.radius,
          backgroundColor: colors.goldSoft,
          borderWidth: 1,
          borderColor: colors.goldBorder,
          paddingTop: 18,
          paddingHorizontal: 18,
          paddingBottom: 16,
        },
        style,
      ]}
    >
      {/* L'intitule prend la place laissee libre a droite de l'icone : la carte
          ne gagne pas un pixel de hauteur. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <Icon name="format_quote" size={verse.quoteIconSize} color={colors.gold} filled />
        {label ? (
          <AppText size={10.5} weight={700} letterSpacing={1.2} color={colors.onGold}>
            {label.toUpperCase()}
          </AppText>
        ) : null}
      </View>
      <AppText
        variant="lyric"
        size={verse.textSize}
        lineHeight={verse.lineHeight}
        style={{ marginTop: 6 }}
      >
        {quote}
      </AppText>
      <AppText
        size={12}
        weight={600}
        letterSpacing={0.4}
        color={colors.onGold}
        style={{ marginTop: 10 }}
      >
        {reference.toUpperCase()}
      </AppText>
    </View>
  );
}
