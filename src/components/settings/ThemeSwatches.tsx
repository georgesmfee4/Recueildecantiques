import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { COLORS, PARAMETRES, THEME_LABELS, type ThemeId } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

const S = PARAMETRES.swatch;
const THEME_IDS = Object.keys(THEME_LABELS) as ThemeId[];

/**
 * Les six teintes. Chaque pastille montre le `primary` du theme **dans le mode
 * courant** : en sombre, les primaires sont clairs, la pastille l'est aussi —
 * elle annonce donc reellement ce que l'on obtiendra.
 */
export function ThemeSwatches({
  value,
  onChange,
}: {
  value: ThemeId;
  onChange: (theme: ThemeId) => void;
}) {
  const { colors, dark } = useTheme();
  const mode = dark ? 'dark' : 'light';

  return (
    <View style={{ flexDirection: 'row', gap: S.gap }}>
      {THEME_IDS.map((id) => {
        const active = id === value;
        const swatch = COLORS[id][mode].primary;
        const onSwatch = COLORS[id][mode].onPrimary;

        return (
          <View key={id} style={{ flex: 1 }}>
            <PressableScale
              onPress={() => onChange(id)}
              haptic="action"
              scaleTo={PRESS_SCALE.icon}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Thème ${THEME_LABELS[id]}`}
              style={{
                width: '100%',
                aspectRatio: 1,
                borderRadius: 999,
                backgroundColor: swatch,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: S.ringWidth,
                borderColor: active ? colors.onSurface : 'transparent',
                // Halo de selection : `primaryContainer` autour de l'anneau.
                ...(active
                  ? { boxShadow: `0px 0px 0px ${S.haloWidth}px ${colors.primaryContainer}` }
                  : null),
              }}
            >
              {active ? <Icon name="check" size={S.checkSize} color={onSwatch} filled /> : null}
            </PressableScale>
            <AppText
              size={S.labelSize}
              weight={600}
              letterSpacing={-0.1}
              align="center"
              color={active ? colors.onSurface : colors.onSurface3}
              style={{ marginTop: S.labelMarginTop }}
            >
              {THEME_LABELS[id]}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}
