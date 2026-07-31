import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LECTURE } from '../../theme/tokens';
import { AppText } from '../base/AppText';

export interface VerseBlockProps {
  /** Absent : bloc de texte continu (cantiques 30 et 38, choeurs). */
  n?: number;
  lines: string[];
  /**
   * Reserve la colonne des numeros. A couper quand le chant n'en compte aucun :
   * une gouttiere vide ne ferait alors qu'indenter le texte sans raison.
   */
  gutter?: boolean;
}

/**
 * Couplet. Une ligne du recueil = une ligne affichee : les lignes sont jointes
 * par un retour, jamais reflowees.
 *
 * La gouttiere du numero est conservee meme sans numero, pour que les blocs de
 * texte continu restent alignes sur les couplets numerotes du meme cantique.
 */
export function VerseBlock({ n, lines, gutter = true }: VerseBlockProps) {
  const { colors, textSize } = useTheme();

  return (
    <View style={{ flexDirection: 'row', gap: gutter ? LECTURE.verse.gap : 0 }}>
      {gutter ? (
        <View style={{ width: LECTURE.verse.numberWidth, flexShrink: 0 }}>
          {n === undefined ? null : (
            <AppText
              variant="lyric"
              size={LECTURE.verse.numberSize}
              weight={600}
              color={colors.primary}
              style={{ paddingTop: LECTURE.verse.numberPaddingTop }}
            >
              {n}
            </AppText>
          )}
        </View>
      ) : null}
      <AppText
        variant="lyric"
        size={textSize.lyric}
        lineHeight={textSize.lineHeight}
        style={{ flex: 1, minWidth: 0 }}
      >
        {lines.join('\n')}
      </AppText>
    </View>
  );
}
