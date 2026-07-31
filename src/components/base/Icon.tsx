import { Text, type StyleProp, type TextStyle } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { iconFontFamily } from '../../theme/fonts';
import { GLYPHS, type IconName } from './iconNames';

export interface IconProps {
  name: IconName;
  size?: number;
  /** Par defaut `colors.onSurface`. */
  color?: string;
  /** Equivalent de l'axe `FILL 1` du prototype : bascule sur la fonte pleine. */
  filled?: boolean;
  style?: StyleProp<TextStyle>;
}

/**
 * Rendu par point de code plutot que par ligature : les ligatures Material Symbols
 * sont irregulieres sur Android en React Native, le codepoint est deterministe.
 */
export function Icon({ name, size = 24, color, filled = false, style }: IconProps) {
  const { colors } = useTheme();
  return (
    <Text
      accessible={false}
      allowFontScaling={false}
      style={[
        {
          fontFamily: iconFontFamily(filled),
          fontSize: size,
          lineHeight: size,
          width: size,
          height: size,
          textAlign: 'center',
          color: color ?? colors.onSurface,
        },
        style,
      ]}
    >
      {String.fromCodePoint(GLYPHS[name])}
    </Text>
  );
}
