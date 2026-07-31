import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LECTURE, PARAMETRES } from '../../theme/tokens';
import { AppText } from '../base/AppText';

const P = PARAMETRES.preview;

/**
 * Apercu de la lecture.
 *
 * Il ne previsualise qu'une chose : l'echelle typographique. L'etiquette
 * « APERÇU », le numero du cantique, la gouttiere et la barre de refrain ont donc
 * ete retires — c'etait de la structure, pas de la typographie, et elle encombrait
 * un bloc qui doit se lire d'un coup d'oeil. Restent le titre, le corps du texte
 * et une ligne en italique : les trois choses que le reglage fait varier.
 */
export function ReadingPreview() {
  const { colors, textSize, ts } = useTheme();

  return (
    <View
      style={{
        borderRadius: P.radius,
        backgroundColor: colors.primarySoft,
        paddingVertical: P.paddingV,
        paddingHorizontal: P.paddingH,
      }}
    >
      <AppText
        variant="lyric"
        size={LECTURE.appBar.titleSizes[ts]}
        weight={600}
        lineHeight={LECTURE.appBar.titleLineHeight}
        letterSpacing={LECTURE.appBar.titleLetterSpacing}
      >
        Cantique nouveau
      </AppText>

      <AppText
        variant="lyric"
        size={textSize.lyric}
        lineHeight={textSize.lineHeight}
        style={{ marginTop: P.lineGap }}
      >
        {'Chantez, chantez au Seigneur\nun cantique nouveau.'}
      </AppText>

      <AppText
        variant="lyric"
        size={textSize.lyric}
        lineHeight={textSize.lineHeight}
        italic
        color={colors.onSurface2}
        style={{ marginTop: P.lineGap }}
      >
        Gloire à son nom !
      </AppText>
    </View>
  );
}
