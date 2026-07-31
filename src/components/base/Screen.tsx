import { useEffect } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSplashVisible } from '../../providers/SplashGate';
import { useTheme } from '../../theme/ThemeProvider';
import { EASING, MOTION, SCREEN_IN_OFFSET } from '../../theme/tokens';

export interface ScreenProps {
  children: React.ReactNode;
  /** Rend le contenu dans une `ScrollView`. */
  scroll?: boolean;
  /**
   * `slide` : translation Y 12 px + fondu, 340 ms (Accueil, Liste, Recherche…).
   * `fade` : fondu seul (ecran de lecture). `none` : aucune animation.
   */
  enter?: 'slide' | 'fade' | 'none';
  /** Defaut `colors.background`. */
  background?: string;
  /** Reserve la zone sure haute. */
  topInset?: boolean;
  /** Reserve la zone sure basse. */
  bottomInset?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = false,
  enter = 'slide',
  background,
  topInset = true,
  bottomInset = true,
  contentContainerStyle,
  style,
}: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const splashVisible = useSplashVisible();

  const slides = enter === 'slide';
  const progress = useSharedValue(enter === 'none' ? 1 : 0);

  useEffect(() => {
    if (enter === 'none' || splashVisible) return;
    progress.value = withTiming(1, {
      duration: slides ? MOTION.screenIn.duration : MOTION.fade.duration,
      easing: slides ? Easing.bezier(...EASING.screenIn) : Easing.ease,
    });
  }, [enter, slides, splashVisible, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: slides ? (1 - progress.value) * SCREEN_IN_OFFSET : 0 }],
  }));

  const padding: ViewStyle = {
    paddingTop: topInset ? insets.top : 0,
    paddingBottom: bottomInset ? insets.bottom : 0,
  };

  const body = scroll ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[padding, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, padding, contentContainerStyle]}>{children}</View>
  );

  return (
    <Animated.View
      style={[
        { flex: 1, backgroundColor: background ?? colors.background },
        animatedStyle,
        style,
      ]}
    >
      {body}
    </Animated.View>
  );
}
