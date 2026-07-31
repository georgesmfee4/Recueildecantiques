import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '../theme/ThemeProvider';
import { FavoritesProvider } from './FavoritesProvider';
import { NumberPadProvider } from './NumberPadProvider';
import { SnackbarProvider } from './SnackbarProvider';

/**
 * Contextes globaux de l'application, dans l'ordre de dependance.
 *
 * Attention en developpement : ce composant est monte par le layout racine, et
 * les modifications d'un layout racine ne se rechargent pas a chaud de maniere
 * fiable. Apres avoir ajoute un provider ici, relancer le serveur
 * (`npx expo start --clear`) plutot que de compter sur Fast Refresh.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          {/* Le clavier numerique se pose au-dessus des ecrans, le snackbar
              au-dessus de tout — y compris du clavier. */}
          <SnackbarProvider>
            <NumberPadProvider>{children}</NumberPadProvider>
          </SnackbarProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
