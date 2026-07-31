import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import { warmSearchIndex } from '../src/lib/searchIndex';
import { AppProviders } from '../src/providers/AppProviders';
import { SplashGateProvider } from '../src/providers/SplashGate';
import { SplashScreen as AnimatedSplash } from '../src/screens/SplashScreen';
import { useTheme } from '../src/theme/ThemeProvider';
import { FONT_ASSETS } from '../src/theme/fonts';

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { colors, dark, hydrating } = useTheme();
  const [fontsLoaded, fontError] = useFonts(FONT_ASSETS);
  const [splashDone, setSplashDone] = useState(false);
  const dismissSplash = useCallback(() => setSplashDone(true), []);

  // On masque le splash natif des que polices et preferences sont pretes.
  // `fontError` compte comme "pret" : mieux vaut une police de repli qu'un
  // ecran de demarrage qui ne disparait jamais.
  const ready = (fontsLoaded || fontError !== null) && !hydrating;

  useEffect(() => {
    if (!ready) return;
    void SplashScreen.hideAsync();
    // Construit pendant que le splash est encore affiche : la premiere frappe
    // dans le champ de recherche ne doit rien avoir a attendre.
    warmSearchIndex();
  }, [ready]);

  if (!ready) return null;

  return (
    <SplashGateProvider visible={!splashDone}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      />
      {/* En surimpression plutot qu'en route : le splash ne doit jamais etre
          une destination du bouton retour. */}
      {splashDone ? null : <AnimatedSplash onDone={dismissSplash} />}
    </SplashGateProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
