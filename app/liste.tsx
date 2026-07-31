import { useLocalSearchParams } from 'expo-router';

import { HymnListScreen } from '../src/screens/HymnListScreen';
import type { Section } from '../src/data/types';

export default function Liste() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const initial: Section = section === 'choeurs' ? 'choeurs' : 'cantiques';

  return <HymnListScreen mode="liste" initialSection={initial} />;
}
