import { useRouter } from 'expo-router';
import { Image, View } from 'react-native';

import { AppText } from '../src/components/base/AppText';
import { Screen } from '../src/components/base/Screen';
import { IconButton } from '../src/components/chrome/IconButton';
import { PrimaryButton } from '../src/components/controls/PrimaryButton';
import { ListRowLink } from '../src/components/home/ListRowLink';
import { CountBadge } from '../src/components/base/CountBadge';
import { MenuTile } from '../src/components/home/MenuTile';
import { StatCard } from '../src/components/home/StatCard';
import { VerseQuoteCard } from '../src/components/home/VerseQuoteCard';
import { TOTALS } from '../src/data/recueil';
import { useDailyVerse } from '../src/hooks/useDailyVerse';
import { useFavorites } from '../src/providers/FavoritesProvider';
import { useNumberPad } from '../src/providers/NumberPadProvider';
import { useTheme } from '../src/theme/ThemeProvider';
import { ACCUEIL, SPACING } from '../src/theme/tokens';

const logo = require('../assets/logo.png');

const X = SPACING.screenX;

export default function Accueil() {
  const { colors } = useTheme();
  const { count } = useFavorites();
  const { openNumberPad } = useNumberPad();
  const verset = useDailyVerse();
  const router = useRouter();

  const favLabel = count
    ? `${count} ${count > 1 ? 'enregistrés' : 'enregistré'}`
    : 'Aucun pour l’instant';

  return (
    // `edgeToEdgeEnabled` est actif : sans la zone sure basse, la carte du verset
    // passerait sous la barre de navigation Android.
    <Screen scroll>
      {/* En-tete */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingTop: ACCUEIL.header.paddingTop,
          paddingBottom: ACCUEIL.header.paddingBottom,
          paddingHorizontal: X,
        }}
      >
        <Image
          source={logo}
          accessibilityIgnoresInvertColors
          style={{
            width: ACCUEIL.header.logoSize,
            height: ACCUEIL.header.logoSize,
            borderRadius: ACCUEIL.header.logoRadius,
            flexShrink: 0,
          }}
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText size={19} weight={700} letterSpacing={-0.3} lineHeight={1.15}>
            Recueil de Chants
          </AppText>
          <AppText size={12.5} color={colors.onSurface3} style={{ marginTop: 2 }}>
            1ʳᵉ édition
          </AppText>
        </View>
        <IconButton
          icon="tune"
          onPress={() => router.push('/parametres')}
          accessibilityLabel="Paramètres"
        />
      </View>

      {/* Carte statistique : les nombres viennent du recueil */}
      <View style={{ marginHorizontal: X }}>
        <StatCard
          primaryValue={TOTALS.cantiques}
          primaryLabel="cantiques"
          secondaryValue={TOTALS.choeurs}
          secondaryLabel="chœurs"
          pillIcon="auto_stories"
          pillLabel="Pour la louange et l’adoration"
        />
      </View>

      {/* Action principale */}
      <PrimaryButton
        icon="dialpad"
        label="Aller à un numéro"
        sublabel="Le plus rapide pendant le culte"
        trailingIcon="chevron_right"
        height={ACCUEIL.mainButton.height}
        onPress={() => openNumberPad('cantiques')}
        style={{ marginTop: 16, marginHorizontal: X }}
      />

      {/* Grille 2x2 */}
      <View style={{ paddingTop: 12, paddingHorizontal: X, gap: ACCUEIL.tile.gridGap }}>
        <View style={{ flexDirection: 'row', gap: ACCUEIL.tile.gridGap }}>
          <MenuTile
            icon="menu_book"
            iconFilled
            title="Cantiques"
            onPress={() => router.push('/liste')}
          />
          {/* Seule tuile doree. `onGold` plutot que `gold` pour le glyphe : sur
              `goldSoft`, le doré plein tombe a 2,3 de contraste, l'autre a 7,8. */}
          <MenuTile
            icon="bookmark"
            iconFilled
            iconBackground={colors.goldSoft}
            iconColor={colors.onGold}
            title="Favoris"
            badge={count ? <CountBadge count={count} /> : undefined}
            accessibilityLabel={`Favoris. ${favLabel}`}
            onPress={() => router.push('/favoris')}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: ACCUEIL.tile.gridGap }}>
          <MenuTile
            icon="search"
            title="Recherche"
            onPress={() => router.push('/recherche')}
          />
          <MenuTile
            icon="settings"
            title="Paramètres"
            onPress={() => router.push('/parametres')}
          />
        </View>
      </View>

      <ListRowLink
        icon="info"
        title="À propos du recueil"
        onPress={() => router.push('/apropos')}
        radius={ACCUEIL.aboutRow.radius}
        style={{ marginTop: 12, marginHorizontal: X }}
      />

      <VerseQuoteCard
        label="Verset du jour"
        quote={verset.text}
        reference={verset.reference}
        style={{ marginTop: 18, marginHorizontal: X, marginBottom: 26 }}
      />
    </Screen>
  );
}
