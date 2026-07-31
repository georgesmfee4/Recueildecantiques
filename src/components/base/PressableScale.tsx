import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useHaptic, type HapticKind } from '../../hooks/useHaptic';
import { MOTION, PRESS_SCALE } from '../../theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  /** Echelle a l'appui. Defaut : la valeur generique des tokens. */
  scaleTo?: number;
  /** Retour haptique declenche a l'appui. `null` pour aucun. */
  haptic?: HapticKind | null;
  style?: StyleProp<ViewStyle>;
}

/**
 * Enfoncement de 120 ms commun a toutes les cibles tactiles du prototype.
 * L'echelle depend de la taille de la cible : voir `PRESS_SCALE`.
 */
export function PressableScale({
  scaleTo = MOTION.press.scale,
  haptic = 'nav',
  onPress,
  disabled,
  style,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);
  const buzz = useHaptic();

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: MOTION.press.duration });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: MOTION.press.duration });
      }}
      onPress={(e) => {
        if (haptic) buzz(haptic);
        onPress?.(e);
      }}
      style={[style, animatedStyle, disabled ? { opacity: 0.5 } : null]}
    />
  );
}

export { PRESS_SCALE };
