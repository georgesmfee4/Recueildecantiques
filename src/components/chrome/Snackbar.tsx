import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeProvider';
import { EASING, MOTION, SNACKBAR } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import type { IconName } from '../base/iconNames';

export interface SnackbarProps {
  message: string;
  icon: IconName;
}

/** Fond `onSurface` sur texte `background` : le contraste s'inverse volontairement. */
export function Snackbar({ message, icon }: SnackbarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: MOTION.snackbarIn.duration,
      easing: Easing.bezier(...EASING.snackbarIn),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * SNACKBAR.riseOffset }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={[
        {
          position: 'absolute',
          left: SNACKBAR.inset,
          right: SNACKBAR.inset,
          bottom: SNACKBAR.bottom + insets.bottom,
          zIndex: 40,
          flexDirection: 'row',
          alignItems: 'center',
          gap: SNACKBAR.gap,
          paddingVertical: SNACKBAR.paddingV,
          paddingHorizontal: SNACKBAR.paddingH,
          borderRadius: SNACKBAR.radius,
          backgroundColor: colors.onSurface,
          boxShadow: SNACKBAR.shadow,
        },
        animatedStyle,
      ]}
    >
      <Icon name={icon} size={SNACKBAR.iconSize} color={colors.background} filled />
      <AppText
        size={SNACKBAR.fontSize}
        weight={500}
        color={colors.background}
        style={{ flex: 1 }}
      >
        {message}
      </AppText>
    </Animated.View>
  );
}
