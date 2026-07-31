import { router } from 'expo-router';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { NumberPadDialog } from '../components/overlay/NumberPadDialog';
import type { Section } from '../data/types';

interface NumberPadContextValue {
  /** Ouvre le clavier, en preselectionnant la section d'ou vient l'utilisateur. */
  openNumberPad: (section?: Section) => void;
}

const NumberPadContext = createContext<NumberPadContextValue | null>(null);

/**
 * Le clavier « Aller à un numéro » est atteignable depuis l'Accueil et l'ecran de
 * lecture. Une instance unique montee au-dessus de l'application evite d'en
 * dupliquer l'etat dans chaque ecran.
 *
 * La navigation passe par l'API imperative `router` : ce provider est monte
 * au-dessus du navigateur, donc hors de portee du hook `useRouter`.
 */
export function NumberPadProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState<Section>('cantiques');

  const openNumberPad = useCallback((from: Section = 'cantiques') => {
    setSection(from);
    setVisible(true);
  }, []);

  const close = useCallback(() => setVisible(false), []);

  const open = useCallback((target: Section, n: number) => {
    setVisible(false);
    router.push(`/lecture/${target}/${n}`);
  }, []);

  const value = useMemo(() => ({ openNumberPad }), [openNumberPad]);

  return (
    <NumberPadContext.Provider value={value}>
      {children}
      <NumberPadDialog
        visible={visible}
        initialSection={section}
        onClose={close}
        onOpen={open}
      />
    </NumberPadContext.Provider>
  );
}

export function useNumberPad(): NumberPadContextValue {
  const ctx = useContext(NumberPadContext);
  if (!ctx) throw new Error('useNumberPad doit etre utilise a l\'interieur de <NumberPadProvider>');
  return ctx;
}
