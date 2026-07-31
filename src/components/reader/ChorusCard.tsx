import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LECTURE } from '../../theme/tokens';
import { AppText } from '../base/AppText';

export interface ChorusCardProps {
  lines: string[];
}

const { chorus } = LECTURE;

/**
 * Bloc de refrain, reproduit d'apres la reference fournie : rectangle sans
 * arrondi, barre d'accent pleine hauteur collee au bord gauche, texte justifie,
 * ni etiquette ni ombre. Police et couleurs restent celles de l'application.
 *
 * La barre est un enfant en position absolue plutot qu'un `borderLeftWidth` :
 * une bordure epaisse se biseaute a la rencontre des bords haut et bas, la barre
 * reste franche.
 */
export function ChorusCard({ lines }: ChorusCardProps) {
  const { colors, textSize } = useTheme();

  return (
    <View
      style={{
        borderRadius: chorus.radius,
        backgroundColor: colors.primarySoft,
        paddingVertical: chorus.paddingV,
        paddingLeft: chorus.accentWidth + chorus.paddingLeft,
        paddingRight: chorus.paddingRight,
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: chorus.accentWidth,
          backgroundColor: colors.primary,
        }}
      />
      <AppText
        variant="lyric"
        size={textSize.lyric}
        lineHeight={textSize.lineHeight}
        italic
        align="justify"
      >
        {lines.join('\n')}
      </AppText>
    </View>
  );
}
