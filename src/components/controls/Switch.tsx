import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme/ThemeProvider';
import { PARAMETRES } from '../../theme/tokens';

const S = PARAMETRES.switch;

/** Position du pouce, ramenee a une translation depuis le bord gauche. */
const OFFSET_OFF = S.centerOff - S.thumbOn / 2;
const OFFSET_ON = S.centerOn - S.thumbOn / 2;

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  accessibilityLabel: string;
}

/**
 * Interrupteur Material 3. Le pouce garde une taille fixe et change d'echelle :
 * animer `width` et `height` declencherait une mise en page a chaque image, la
 * transformation reste sur le thread UI.
 */
export function Switch({ value, onChange, accessibilityLabel }: SwitchProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {
      duration: S.duration,
      easing: Easing.bezier(0.2, 0.9, 0.2, 1),
    });
  }, [value, progress]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: OFFSET_OFF + (OFFSET_ON - OFFSET_OFF) * progress.value },
      { scale: (S.thumbOff + (S.thumbOn - S.thumbOff) * progress.value) / S.thumbOn },
    ],
  }));

  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={{
        width: S.trackWidth,
        height: S.trackHeight,
        borderRadius: S.radius,
        borderWidth: S.borderWidth,
        borderColor: value ? colors.primary : colors.onSurface3,
        backgroundColor: value ? colors.primary : colors.surface3,
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: S.thumbOn,
            height: S.thumbOn,
            borderRadius: S.thumbOn / 2,
            backgroundColor: value ? colors.onPrimary : colors.onSurface3,
            // Le bord de la piste decale le repere : on compense.
            left: -S.borderWidth,
          },
          thumbStyle,
        ]}
      />
    </Pressable>
  );
}
