import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { PARAMETRES } from '../../theme/tokens';
import { AppText } from './AppText';

const B = PARAMETRES.countBadge;

export interface CountBadgeProps {
  count: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compteur en pastille doree. Sert partout ou l'on affiche un nombre de favoris :
 * grille de l'Accueil et reglages. Le dore plein n'ayant pas le contraste requis
 * pour du texte, c'est `onGold` sur `goldSoft` qui porte le chiffre.
 */
export function CountBadge({ count, style }: CountBadgeProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          paddingVertical: B.paddingV,
          paddingHorizontal: B.paddingH,
          borderRadius: B.radius,
          backgroundColor: colors.goldSoft,
          borderWidth: 1,
          borderColor: colors.goldBorder,
        },
        style,
      ]}
    >
      <AppText size={B.fontSize} weight={700} color={colors.onGold}>
        {count}
      </AppText>
    </View>
  );
}
