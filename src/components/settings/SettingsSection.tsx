import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { PARAMETRES } from '../../theme/tokens';
import { AppText } from '../base/AppText';

const P = PARAMETRES;

export interface SettingsSectionProps {
  label: string;
  children: ReactNode;
  /** Premiere section : pas d'espace superieur superflu sous l'app bar. */
  first?: boolean;
}

/**
 * Section a plat : un libelle, puis le contenu directement sur le fond.
 *
 * Le prototype enfermait chaque groupe dans une carte bordee, posee a 20 px des
 * bords. Deux cadres imbriques — l'ecran puis la carte — retrecissent l'espace
 * utile et donnent un ecran engonce. Le regroupement passe desormais par le
 * libelle et les filets, pas par une boite.
 */
export function SettingsSection({ label, children, first = false }: SettingsSectionProps) {
  const { colors } = useTheme();

  return (
    <>
      <AppText
        size={P.sectionLabel.size}
        weight={700}
        letterSpacing={P.sectionLabel.letterSpacing}
        color={colors.primary}
        style={{
          paddingTop: first ? 14 : P.sectionLabel.paddingTop,
          paddingHorizontal: P.contentInset,
          paddingBottom: P.sectionLabel.paddingBottom,
        }}
      >
        {label}
      </AppText>
      <View>{children}</View>
    </>
  );
}

/**
 * Filet de separation, d'un bord a l'autre. Sans retrait : c'est ce qui porte le
 * regard jusqu'aux bords et fait paraitre l'ecran plus large.
 */
export function SettingsDivider() {
  const { colors } = useTheme();
  return <View style={{ height: 1, backgroundColor: colors.outline }} />;
}
