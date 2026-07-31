import { useLocalSearchParams } from 'expo-router';

import type { Section } from '../../../src/data/types';
import { ReaderScreen } from '../../../src/screens/ReaderScreen';

export default function Lecture() {
  const params = useLocalSearchParams<{ section?: string; n?: string }>();
  const section: Section = params.section === 'choeurs' ? 'choeurs' : 'cantiques';
  // Un parametre d'URL absurde ne doit pas faire planter l'ecran : `ReaderScreen`
  // affiche un etat « ce numero n'existe pas » pour tout numero introuvable.
  const n = Number.parseInt(params.n ?? '', 10);

  return <ReaderScreen section={section} n={Number.isNaN(n) ? 0 : n} />;
}
