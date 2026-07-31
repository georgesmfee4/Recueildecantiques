import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '../components/base/AppText';
import { TOTALS } from '../data/recueil';
import { useTheme } from '../theme/ThemeProvider';
import { SPLASH } from '../theme/tokens';

const logo = require('../../assets/logo.png');

/**
 * Ecran de demarrage. Il n'est volontairement pas une route : le rendre en
 * surimpression evite qu'un retour depuis l'Accueil y ramene l'utilisateur.
 *
 * Le splash natif est deja masque quand ce composant apparait : polices et
 * preferences sont chargees. Le maintien de `SPLASH.hold` ne sert donc plus a
 * patienter, seulement a laisser voir l'identite du recueil.
 */
export function SplashScreen({ onDone }: { onDone: () => void }) {
  const { colors } = useTheme();

  const opacity = useSharedValue(0);
  const breathe = useSharedValue(1);
  const spin = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: SPLASH.fadeIn, easing: Easing.ease });

    const half = SPLASH.breathe.duration / 2;
    breathe.value = withRepeat(
      withSequence(
        withTiming(SPLASH.breathe.scale, { duration: half, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: half, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    spin.value = withRepeat(
      withTiming(360, { duration: SPLASH.spinner.duration, easing: Easing.linear }),
      -1,
      false
    );

    const timer = setTimeout(onDone, SPLASH.hold);
    return () => clearTimeout(timer);
  }, [onDone, opacity, breathe, spin]);

  const rootStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: breathe.value }] }));
  const spinnerStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.root, { backgroundColor: colors.surface }, rootStyle]}
    >
      {/* Cercles decoratifs, deliberement debordants. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: SPLASH.circleTopRight.top,
          right: SPLASH.circleTopRight.right,
          width: SPLASH.circleTopRight.size,
          height: SPLASH.circleTopRight.size,
          borderRadius: SPLASH.circleTopRight.size / 2,
          backgroundColor: colors.primarySoft,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: SPLASH.circleBottomLeft.bottom,
          left: SPLASH.circleBottomLeft.left,
          width: SPLASH.circleBottomLeft.size,
          height: SPLASH.circleBottomLeft.size,
          borderRadius: SPLASH.circleBottomLeft.size / 2,
          backgroundColor: colors.goldSoft,
        }}
      />

      {/* Plus d'ombre portee : le logo est desormais un livre detoure sur fond
          transparent. Une ombre suivrait le carre de l'image, pas la silhouette
          du livre — elle flotterait a cote de lui. */}
      <Animated.View style={logoStyle}>
        <Image
          source={logo}
          accessibilityIgnoresInvertColors
          style={{ width: SPLASH.logo.size, height: SPLASH.logo.size }}
        />
      </Animated.View>

      <AppText
        variant="lyric"
        size={SPLASH.title.size}
        weight={600}
        letterSpacing={SPLASH.title.letterSpacing}
        style={{ marginTop: SPLASH.title.marginTop }}
      >
        Recueil de Chants
      </AppText>

      

      <Animated.View
        style={[
          {
            width: SPLASH.spinner.size,
            height: SPLASH.spinner.size,
            borderRadius: SPLASH.spinner.size / 2,
            borderWidth: SPLASH.spinner.border,
            borderColor: colors.primaryContainer,
            borderTopColor: colors.primary,
            marginTop: SPLASH.loaderMarginTop,
          },
          spinnerStyle,
        ]}
      />

      <AppText
        size={SPLASH.footer.size}
        color={colors.onSurface3}
        letterSpacing={SPLASH.footer.letterSpacing}
        align="center"
        style={{ position: 'absolute', bottom: SPLASH.footer.bottom, left: 0, right: 0 }}
      >
        Destiné aux cultes, aux réunions de prière et à la méditation personnelle.
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
});
