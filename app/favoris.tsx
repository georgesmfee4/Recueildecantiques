import { useLocalSearchParams } from 'expo-router';

import { HymnListScreen } from '../src/screens/HymnListScreen';
import type { Section } from '../src/data/types';

export default function Favoris() {
  // `from` conserve la section d'ou l'on vient, pour y revenir via les chips.
  const { from } = useLocalSearchParams<{ from?: string }>();
  const initial: Section = from === 'choeurs' ? 'choeurs' : 'cantiques';

  return <HymnListScreen mode="favoris" initialSection={initial} />;
}
