import { FlashList, type FlashListRef, type ListRenderItem } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/base/AppText';
import { Screen } from '../components/base/Screen';
import { IconButton } from '../components/chrome/IconButton';
import { Chip } from '../components/controls/Chip';
import { SearchField } from '../components/controls/SearchField';
import { EmptyState } from '../components/list/EmptyState';
import { HymnRow } from '../components/list/HymnRow';
import { IndexRail } from '../components/list/IndexRail';
import { entriesFor, getSection, railTarget, type ListEntry } from '../data/recueil';
import type { Section } from '../data/types';
import { useFavorites } from '../providers/FavoritesProvider';
import { useTheme } from '../theme/ThemeProvider';
import { LISTE } from '../theme/tokens';

/** Duree totale de l'ouverture en cascade, derivee des tokens. */
const REVEAL_TOTAL = LISTE.reveal.staggeredRows * LISTE.reveal.step + LISTE.reveal.duration;

const keyExtractor = (item: ListEntry): string => `${item.section}:${item.n}`;

export interface HymnListScreenProps {
  /** `favoris` reunit cantiques et choeurs ; `liste` filtre par section. */
  mode: 'liste' | 'favoris';
  /** Section initiale, conservee lors des allers-retours avec les Favoris. */
  initialSection?: Section;
}

export function HymnListScreen({ mode, initialSection = 'cantiques' }: HymnListScreenProps) {
  const { colors } = useTheme();
  const { favs, favsCh, isFavorite } = useFavorites();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const favView = mode === 'favoris';
  const [section, setSection] = useState<Section>(initialSection);

  const listRef = useRef<FlashListRef<ListEntry>>(null);
  const reveal = useSharedValue(0);

  /**
   * Les lignes sont deja construites et indexees au chargement du module : il n'y
   * a donc rien a calculer ici, ni au premier rendu ni au changement de section.
   * C'est ce qui donne l'impression que la liste ne charge pas.
   */
  const rows = useMemo(
    () => (favView ? entriesFor(favs, favsCh) : getSection(section).entries),
    [favView, favs, favsCh, section]
  );

  const railStops = favView ? [] : getSection(section).railStops;

  const startReveal = useCallback(() => {
    reveal.value = 0;
    reveal.value = withTiming(REVEAL_TOTAL, {
      duration: REVEAL_TOTAL,
      easing: Easing.linear,
    });
  }, [reveal]);

  // Relance a chaque changement de section ou de filtre. Au premier affichage,
  // `onLoad` la relance encore une fois, quand les lignes sont reellement dessinees.
  useEffect(() => {
    startReveal();
  }, [startReveal, section, favView]);

  const openEntry = useCallback(
    (entry: ListEntry) => {
      router.push(`/lecture/${entry.section}/${entry.n}`);
    },
    [router]
  );

  const onJump = useCallback(
    (stop: number) => {
      // « Defilement instantane » : pas d'animation, c'est un acces, pas une transition.
      listRef.current?.scrollToIndex({ index: railTarget(section, stop), animated: false });
    },
    [section]
  );

  const goSection = useCallback(
    (next: Section) => {
      if (favView) router.replace({ pathname: '/liste', params: { section: next } });
      else setSection(next);
    },
    [favView, router]
  );

  const toggleFavView = useCallback(() => {
    if (favView) router.replace({ pathname: '/liste', params: { section } });
    else router.replace({ pathname: '/favoris', params: { from: section } });
  }, [favView, router, section]);

  // Les lignes sont memoisees : `extraData` previent FlashList qu'un changement
  // de favoris doit tout de meme les rafraichir.
  const extraData = useMemo(() => ({ favs, favsCh }), [favs, favsCh]);

  const renderItem = useCallback<ListRenderItem<ListEntry>>(
    ({ item, index }) => (
      <HymnRow
        entry={item}
        favorite={isFavorite(item.section, item.n)}
        onOpen={openEntry}
        index={index}
        reveal={reveal}
      />
    ),
    [isFavorite, openEntry, reveal]
  );

  const title = favView ? 'Favoris' : section === 'choeurs' ? 'Chœurs' : 'Cantiques';
  const noun = favView ? 'favori' : section === 'choeurs' ? 'chœur' : 'cantique';
  const count =
    `${rows.length} ${noun}${rows.length > 1 ? 's' : ''}` +
    (favView && favsCh.length ? ' · cantiques et chœurs' : '');

  return (
    <Screen bottomInset={false}>
      {/* En-tete fixe */}
      <View
        style={{
          paddingHorizontal: LISTE.header.paddingH,
          paddingBottom: LISTE.header.paddingBottom,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            height: LISTE.header.appBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            gap: LISTE.header.gap,
          }}
        >
          <IconButton
            icon="arrow_back"
            iconSize={24}
            onPress={() => router.back()}
            accessibilityLabel="Retour"
            background={null}
            color={colors.onSurface}
          />
          {/* Pas de pastille « N° » ici : l'acces direct par numero reste sur
              l'Accueil et dans l'ecran de lecture. */}
          <View style={{ flex: 1, minWidth: 0, paddingLeft: 4 }}>
            <AppText size={18} weight={600} letterSpacing={-0.2}>
              {title}
            </AppText>
            <AppText size={12} color={colors.onSurface3} style={{ marginTop: 1 }}>
              {count}
            </AppText>
          </View>
        </View>

        <SearchField
          placeholder="Numéro, titre ou paroles…"
          onPress={() => router.push('/recherche')}
          style={{ marginTop: 2 }}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: LISTE.chip.gap,
            marginTop: 12,
            paddingLeft: 2,
          }}
        >
          <Chip
            label="Cantiques"
            active={!favView && section === 'cantiques'}
            onPress={() => goSection('cantiques')}
          />
          <Chip
            label="Chœurs"
            active={!favView && section === 'choeurs'}
            onPress={() => goSection('choeurs')}
          />
          {/* L'icone suit la couleur du chip et non `gold` : sur le fond `primary`
              de l'etat actif, le jaune passerait sous le seuil de contraste dans
              plusieurs des six themes — l'orange notamment. */}
          <Chip
            label="Favoris"
            icon="bookmark"
            iconFilled
            active={favView}
            onPress={toggleFavView}
          />
        </View>
      </View>

      {/* Liste et rail */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <FlashList
            ref={listRef}
            data={rows}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            extraData={extraData}
            onLoad={startReveal}
            // Un peu plus d'avance que le defaut : le rail projette d'un coup a
            // 20 lignes de distance, autant que les voisines soient deja pretes.
            drawDistance={600}
            contentContainerStyle={{ paddingTop: 2, paddingBottom: 20 + insets.bottom }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyState
                icon="bookmark"
                title="Aucun favori pour l’instant"
                subtitle="Touchez le marque-page en haut d’un cantique pour le retrouver ici."
              />
            }
          />
        </View>

        {railStops.length ? (
          <IndexRail stops={railStops} onJump={onJump} extraBottomPadding={insets.bottom} />
        ) : null}
      </View>
    </Screen>
  );
}
