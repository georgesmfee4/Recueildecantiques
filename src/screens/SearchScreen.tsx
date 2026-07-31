import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/base/AppText';
import { Icon } from '../components/base/Icon';
import { PRESS_SCALE, PressableScale } from '../components/base/PressableScale';
import { Screen } from '../components/base/Screen';
import { IconButton } from '../components/chrome/IconButton';
import { SearchResultRow } from '../components/search/SearchResultRow';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { search, type SearchResult } from '../lib/searchIndex';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/fonts';
import { RECHERCHE, SPACING } from '../theme/tokens';

const { header, field, clearButton, recent, hints, empty } = RECHERCHE;

const keyExtractor = (item: SearchResult): string => `${item.section}:${item.n}`;

const HINTS = [
  { badge: '87', label: 'Le numéro du cantique' },
  { icon: 'title', label: 'Un mot du titre' },
  { icon: 'format_quote', label: 'Une phrase des paroles' },
] as const;

export function SearchScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { recents, remember } = useRecentSearches();

  const [query, setQuery] = useState('');

  // L'index est deja construit au demarrage : la recherche est synchrone et
  // relancee a chaque frappe, sans bouton de validation ni temporisation.
  const results = useMemo(() => search(query), [query]);

  const trimmed = query.trim();
  const idle = trimmed.length === 0;

  const onOpen = useCallback(
    (item: SearchResult) => {
      remember(trimmed);
      router.push(`/lecture/${item.section}/${item.n}`);
    },
    [remember, router, trimmed]
  );

  const renderItem = useCallback<ListRenderItem<SearchResult>>(
    ({ item }) => <SearchResultRow item={item} onOpen={onOpen} />,
    [onOpen]
  );

  return (
    <Screen bottomInset={false}>
      {/* App bar avec champ actif */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: header.gap,
          paddingTop: header.paddingTop,
          paddingHorizontal: header.paddingH,
          paddingBottom: header.paddingBottom,
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
        <View
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: field.gap,
            height: field.height,
            paddingLeft: field.paddingLeft,
            paddingRight: field.paddingRight,
            borderRadius: field.radius,
            backgroundColor: colors.surface2,
          }}
        >
          <Icon name="search" size={field.iconSize} color={colors.onSurface2} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Numéro, titre, paroles…"
            placeholderTextColor={colors.onSurface3}
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Rechercher dans le recueil"
            style={{
              flex: 1,
              minWidth: 0,
              padding: 0,
              fontFamily: fontFamily('ui', 400),
              fontSize: field.fontSize,
              color: colors.onSurface,
            }}
          />
          {query ? (
            <PressableScale
              onPress={() => setQuery('')}
              scaleTo={PRESS_SCALE.icon}
              accessibilityRole="button"
              accessibilityLabel="Effacer la recherche"
              style={{
                width: clearButton.size,
                height: clearButton.size,
                flexShrink: 0,
                borderRadius: clearButton.size / 2,
                backgroundColor: colors.surface3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="close" size={clearButton.iconSize} color={colors.onSurface2} />
            </PressableScale>
          ) : null}
        </View>
      </View>

      {idle ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: 4,
            paddingHorizontal: SPACING.screenX,
            paddingBottom: 24 + insets.bottom,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Section masquee tant qu'aucune recherche n'a ete faite : la maquette
              affichait une liste factice, il n'y a rien a montrer au depart. */}
          {recents.length ? (
            <>
              <AppText
                size={11.5}
                weight={700}
                letterSpacing={1.2}
                color={colors.onSurface3}
                style={{ marginTop: 6, marginBottom: 12 }}
              >
                RECHERCHES RÉCENTES
              </AppText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: recent.gap }}>
                {recents.map((r) => (
                  <PressableScale
                    key={r}
                    onPress={() => setQuery(r)}
                    scaleTo={PRESS_SCALE.icon}
                    accessibilityRole="button"
                    accessibilityLabel={`Rechercher ${r}`}
                    style={{
                      height: recent.height,
                      paddingHorizontal: recent.paddingH,
                      borderRadius: recent.radius,
                      borderWidth: 1,
                      borderColor: colors.outline,
                      backgroundColor: colors.surface,
                      justifyContent: 'center',
                    }}
                  >
                    <AppText size={recent.fontSize} weight={500}>
                      {r}
                    </AppText>
                  </PressableScale>
                ))}
              </View>
            </>
          ) : null}

          <View
            style={{
              marginTop: recents.length ? 26 : 6,
              padding: hints.padding,
              borderRadius: hints.radius,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.outline,
            }}
          >
            <AppText size={hints.titleSize} weight={600}>
              Trois façons de chercher
            </AppText>
            <View style={{ marginTop: 14, gap: hints.rowGap }}>
              {HINTS.map((hint) => (
                <View key={hint.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View
                    style={{
                      width: hints.badge,
                      height: hints.badge,
                      flexShrink: 0,
                      borderRadius: hints.badgeRadius,
                      backgroundColor: colors.primarySoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {'badge' in hint ? (
                      <AppText
                        variant="lyric"
                        size={14}
                        weight={600}
                        color={colors.onPrimaryContainer}
                      >
                        {hint.badge}
                      </AppText>
                    ) : (
                      <Icon
                        name={hint.icon}
                        size={hints.iconSize}
                        color={colors.onPrimaryContainer}
                      />
                    )}
                  </View>
                  <AppText size={hints.labelSize} color={colors.onSurface2}>
                    {hint.label}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : results.length ? (
        <FlashList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <AppText
              size={11.5}
              weight={700}
              letterSpacing={1.2}
              color={colors.onSurface3}
              style={{ paddingTop: 4, paddingBottom: 10, paddingHorizontal: SPACING.screenX }}
            >
              {results.length} {results.length > 1 ? 'RÉSULTATS' : 'RÉSULTAT'}
            </AppText>
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: empty.paddingH,
            paddingBottom: 60,
          }}
        >
          <Icon name="search_off" size={empty.iconSize} color={colors.surface3} />
          <AppText size={empty.titleSize} weight={600} align="center" style={{ marginTop: 16 }}>
            Aucun résultat
          </AppText>
          <AppText
            size={empty.textSize}
            color={colors.onSurface3}
            lineHeight={1.55}
            align="center"
            style={{ marginTop: 6 }}
          >
            Rien ne correspond à « {trimmed} ». Essayez un numéro ou un autre mot.
          </AppText>
          <PressableScale
            onPress={() => setQuery('')}
            haptic="action"
            scaleTo={PRESS_SCALE.button}
            accessibilityRole="button"
            accessibilityLabel="Effacer la recherche"
            style={{
              marginTop: 20,
              height: empty.buttonHeight,
              paddingHorizontal: 20,
              borderRadius: empty.buttonRadius,
              backgroundColor: colors.primaryContainer,
              justifyContent: 'center',
            }}
          >
            <AppText size={14} weight={600} color={colors.onPrimaryContainer}>
              Effacer la recherche
            </AppText>
          </PressableScale>
        </View>
      )}
    </Screen>
  );
}
