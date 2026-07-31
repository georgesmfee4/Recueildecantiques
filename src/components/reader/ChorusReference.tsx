import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { LECTURE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';

const R = LECTURE.chorusRef;

export interface ChorusReferenceProps {
  /** Aligne le rappel sur la colonne de texte, pas sur la gouttiere du numero. */
  gutter?: boolean;
}

/**
 * Rappel place apres un couplet, quand le cantique possede un refrain. Le texte
 * imprime ne porte le refrain qu'une fois ; il se chante pourtant apres chaque
 * couplet. Le rappel retablit cet usage sans repeter les paroles.
 */
export function ChorusReference({ gutter = true }: ChorusReferenceProps) {
  const { colors } = useTheme();

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel="Reprendre le refrain"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: R.gap,
        marginTop: R.marginTop,
        marginLeft: gutter ? LECTURE.verse.numberWidth + LECTURE.verse.gap : 0,
      }}
    >
      <Icon name="repeat" size={R.iconSize} color={colors.primary} />
      <AppText size={R.size} weight={700} letterSpacing={R.letterSpacing} color={colors.primary}>
        {R.label}
      </AppText>
    </View>
  );
}
