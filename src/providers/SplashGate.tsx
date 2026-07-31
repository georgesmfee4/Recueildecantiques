import { createContext, useContext, type ReactNode } from 'react';

/** `true` tant que le splash couvre l'ecran. */
const SplashGateContext = createContext(false);

/**
 * L'ecran d'accueil est monte sous le splash des le demarrage. Sans ce garde-fou,
 * son animation d'entree se jouerait derriere le voile et serait terminee au
 * moment ou l'utilisateur la verrait. Les ecrans attendent donc ce signal.
 */
export function SplashGateProvider({ visible, children }: { visible: boolean; children: ReactNode }) {
  return <SplashGateContext.Provider value={visible}>{children}</SplashGateContext.Provider>;
}

export const useSplashVisible = (): boolean => useContext(SplashGateContext);
