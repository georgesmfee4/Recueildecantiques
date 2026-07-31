import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, ScrollView, Share, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/base/AppText';
import { Icon } from '../components/base/Icon';
import { Screen } from '../components/base/Screen';
import { ChorusCard } from '../components/reader/ChorusCard';
import { ChorusReference } from '../components/reader/ChorusReference';
import { ReaderBottomBar } from '../components/reader/ReaderBottomBar';
import { VerseBlock } from '../components/reader/VerseBlock';
import { IconButton } from '../components/chrome/IconButton';
import { EmptyState } from '../components/list/EmptyState';
import { getEntry, getReaderBlocks, neighbours } from '../data/recueil';
import type { Section } from '../data/types';
import { useHaptic } from '../hooks/useHaptic';
import { useFavorites } from '../providers/FavoritesProvider';
import { useNumberPad } from '../providers/NumberPadProvider';
import { useSnackbar } from '../providers/SnackbarProvider';
import { useTheme, type TextSizeIndex } from '../theme/ThemeProvider';
import { LECTURE, MOTION, TEXT_SIZES } from '../theme/tokens';

const { appBar, body } = LECTURE;

/** Pointe du marque-page quand on ajoute ou retire un favori. */
const BOOKMARK_POP = 1.25;

export interface ReaderScreenProps {
  section: Section;
  n: number;
}

export function ReaderScreen({ section, n }: ReaderScreenProps) {
  const { colors, ts, setTs } = useTheme();
  const { isFavorite, toggle } = useFavorites();
  const { openNumberPad } = useNumberPad();
  const { show } = useSnackbar();
  const insets = useSafeAreaInsets();
  const buzz = useHaptic();
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const bookmarkScale = useSharedValue(1);

  const entry = getEntry(section, n);
  const isChoeur = section === 'choeurs';
  const favorite = isFavorite(section, n);

  // « Changement de cantique : le defilement revient en haut. »
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [section, n]);

  const bookmarkStyle = useAnimatedStyle(() => ({ transform: [{ scale: bookmarkScale.value }] }));

  const goTo = useCallback(
    (target: number) => {
      router.replace(`/lecture/${section}/${target}`);
    },
    [router, section]
  );

  const onToggleFavorite = useCallback(() => {
    buzz('favorite');
    bookmarkScale.value = withSequence(
      withTiming(BOOKMARK_POP, { duration: MOTION.press.duration }),
      withTiming(1, { duration: MOTION.press.duration })
    );
    // `favorite` vaut l'etat d'avant la bascule, d'ou l'inversion des messages.
    show(
      favorite ? 'Retiré des favoris' : 'Ajouté aux favoris',
      favorite ? 'check_circle' : 'bookmark'
    );
    toggle(section, n);
  }, [buzz, favorite, bookmarkScale, n, section, show, toggle]);

  const onCycleSize = useCallback(() => {
    const next = ((ts + 1) % TEXT_SIZES.length) as TextSizeIndex;
    buzz('action');
    setTs(next);
    show(`Taille du texte : ${TEXT_SIZES[next].label}`, 'format_size');
  }, [buzz, setTs, show, ts]);

  const onShare = useCallback(() => {
    if (!entry) return;
    buzz('action');
    const kicker = `${isChoeur ? 'CHŒUR' : 'CANTIQUE'} ${n}`;
    const lyrics = getReaderBlocks(section, n)
      .map((block) =>
        block.kind === 'chorus'
          ? `REFRAIN\n${block.lines.join('\n')}`
          : `${block.n === undefined ? '' : `${block.n}. `}${block.lines.join('\n')}`
      )
      .join('\n\n');
    void Share.share({ message: `${kicker}\n${entry.title}\n\n${lyrics}` }).catch(
      () => undefined
    );
  }, [buzz, entry, isChoeur, n, section]);

  if (!entry) {
    return (
      <Screen enter="fade">
        <View
          style={{
            height: appBar.height,
            justifyContent: 'center',
            paddingLeft: appBar.paddingLeft,
            paddingRight: appBar.paddingRight,
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
        </View>
        <EmptyState
          icon="search_off"
          title="Ce numéro n’existe pas"
          subtitle={`Le recueil ne contient pas ${isChoeur ? 'de chœur' : 'de cantique'} n° ${n}.`}
        />
      </Screen>
    );
  }

  const blocks = getReaderBlocks(section, n);
  const { prev, next } = neighbours(section, n);

  // Chants sans aucun couplet numerote — les choeurs, et les cantiques 30 et 38
  // ecrits en texte continu : le texte prend toute la largeur.
  const numbered = blocks.some((b) => b.kind === 'verse' && b.n !== undefined);
  const hasChorus = blocks.some((b) => b.kind === 'chorus');

  return (
    <Screen enter="fade" bottomInset={false}>
      {/*
        En-tete fixe sur deux registres. La rangee d'actions ne porte plus que le
        retour et les trois commandes ; le numero et le titre occupent une bande
        pleine largeur en dessous, ou le titre dispose de la place qu'il lui faut.
        Le titre reste ainsi visible pendant tout le defilement du chant.
      */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.outline,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            height: appBar.height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: appBar.gap,
            paddingLeft: appBar.paddingLeft,
            paddingRight: appBar.paddingRight,
          }}
        >
          <IconButton
            icon="arrow_back"
            iconSize={24}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/liste'))}
            accessibilityLabel="Retour"
            background={null}
            color={colors.onSurface}
          />
          <View style={{ flex: 1 }} />

          {/* Le marque-page pointe a la bascule : c'est l'icone qui grossit, pas le bouton. */}
          <Pressable
            onPress={onToggleFavorite}
            accessibilityRole="button"
            accessibilityState={{ selected: favorite }}
            accessibilityLabel={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pressed ? colors.surface2 : 'transparent',
            })}
          >
            <Animated.View style={bookmarkStyle}>
              <Icon
                name="bookmark"
                size={24}
                color={favorite ? colors.gold : colors.onSurface2}
                filled={favorite}
              />
            </Animated.View>
          </Pressable>

          <IconButton
            icon="share"
            onPress={onShare}
            accessibilityLabel="Partager"
            background={null}
            color={colors.onSurface}
            haptic={null}
          />
          <IconButton
            icon="format_size"
            onPress={onCycleSize}
            accessibilityLabel="Changer la taille du texte"
            background={null}
            color={colors.onSurface}
            haptic={null}
          />
        </View>

        {/* Numero et titre, a l'aplomb exact des couplets */}
        <View
          style={{
            paddingHorizontal: appBar.contentInset,
            paddingBottom: appBar.paddingBottom,
          }}
        >
          <AppText
            size={appBar.kickerSize}
            weight={700}
            color={colors.primary}
            letterSpacing={appBar.kickerLetterSpacing}
            numberOfLines={1}
          >
            {isChoeur ? 'CHŒUR' : 'CANTIQUE'} {n}
          </AppText>
          <AppText
            variant="lyric"
            size={appBar.titleSizes[ts]}
            weight={600}
            lineHeight={appBar.titleLineHeight}
            letterSpacing={appBar.titleLetterSpacing}
            numberOfLines={appBar.titleLines}
            style={{ marginTop: appBar.titleMarginTop }}
          >
            {entry.title}
          </AppText>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Le lecteur audio s'inserera ici — etape 11. Aucune piste n'etant
            embarquee, la section n'existe pas encore. */}

        <View
          style={{
            paddingTop: body.paddingTop,
            paddingHorizontal: body.paddingH,
            gap: body.blockGap,
          }}
        >
          {blocks.map((block, i) => {
            if (block.kind === 'chorus') return <ChorusCard key={i} lines={block.lines} />;

            // Pas de rappel quand le refrain suit deja immediatement : il serait
            // redondant avec le bloc qui vient juste apres.
            const nextIsChorus = blocks[i + 1]?.kind === 'chorus';
            return (
              <View key={i}>
                <VerseBlock n={block.n} lines={block.lines} gutter={numbered} />
                {hasChorus && !nextIsChorus ? <ChorusReference gutter={numbered} /> : null}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <ReaderBottomBar
        prevLabel={`N° ${prev}`}
        nextLabel={`N° ${next}`}
        onPrev={() => goTo(prev)}
        onNext={() => goTo(next)}
        onDialpad={() => openNumberPad(section)}
      />
    </Screen>
  );
}
