import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/base/AppText';
import { CountBadge } from '../components/base/CountBadge';
import { Screen } from '../components/base/Screen';
import { IconButton } from '../components/chrome/IconButton';
import { SegmentedControl, type SegmentedOption } from '../components/controls/SegmentedControl';
import { Switch } from '../components/controls/Switch';
import { ListRowLink } from '../components/home/ListRowLink';
import { SettingsRow } from '../components/settings/SettingsRow';
import { ReadingPreview } from '../components/settings/ReadingPreview';
import { SettingsDivider, SettingsSection } from '../components/settings/SettingsSection';
import { ThemeSwatches } from '../components/settings/ThemeSwatches';
import { useFavorites } from '../providers/FavoritesProvider';
import { useTheme, type TextSizeIndex } from '../theme/ThemeProvider';
import { PARAMETRES, TEXT_SIZES } from '../theme/tokens';

const P = PARAMETRES;

const APP_VERSION = '1.0.0';

/** Les quatre « A », de corps croissant. La valeur est l'indice, en chaine. */
const SIZE_OPTIONS: readonly SegmentedOption<string>[] = TEXT_SIZES.map((size, i) => ({
  value: String(i),
  label: 'A',
  labelSize: P.textSize.scale[i],
  accessibilityLabel: `Taille ${size.label}`,
}));

export function SettingsScreen() {
  const { colors, theme, dark, ts, setTheme, setDark, setTs } = useTheme();
  const { count } = useFavorites();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Screen scroll bottomInset={false} contentContainerStyle={{ paddingBottom: insets.bottom }}>
      <View
        style={{
          height: P.appBar.height,
          flexDirection: 'row',
          alignItems: 'center',
          gap: P.appBar.gap,
          paddingHorizontal: P.appBar.paddingH,
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
        <AppText size={P.appBar.titleSize} weight={600} style={{ paddingLeft: 4 }}>
          Paramètres
        </AppText>
      </View>

      {/*
        « Lecture » passe en premier. C'est le reglage pour lequel on ouvre cet
        ecran pendant le culte, et son apercu est l'element le plus parlant :
        autant qu'il soit visible sans defiler.
      */}
      <SettingsSection label="LECTURE" first>
        <View
          style={{
            paddingHorizontal: P.contentInset,
            paddingTop: P.block.paddingTop,
            paddingBottom: P.block.paddingBottom,
          }}
        >
          <AppText size={P.row.titleSize} weight={600}>
            Taille du texte
          </AppText>
          <AppText size={P.row.subtitleSize} color={colors.onSurface3} style={{ marginTop: 2 }}>
            Titres et paroles, dans toute l’application
          </AppText>

          <SegmentedControl
            options={SIZE_OPTIONS}
            value={String(ts)}
            onChange={(v) => setTs(Number(v) as TextSizeIndex)}
            height={P.textSize.height}
            trackRadius={P.textSize.trackRadius}
            trackPadding={P.textSize.trackPadding}
            itemRadius={P.textSize.itemRadius}
            gap={P.textSize.gap}
            style={{ marginTop: 14 }}
          />
          <View style={{ flexDirection: 'row', gap: P.textSize.gap, marginTop: P.textSize.labelMarginTop }}>
            {TEXT_SIZES.map((size, i) => (
              <AppText
                key={size.id}
                size={P.textSize.labelSize}
                weight={600}
                align="center"
                color={ts === i ? colors.onSurface : colors.onSurface3}
                style={{ flex: 1 }}
              >
                {size.label}
              </AppText>
            ))}
          </View>

          <View style={{ marginTop: 16 }}>
            <ReadingPreview />
          </View>
        </View>
      </SettingsSection>

      <SettingsSection label="APPARENCE">
        <View
          style={{
            paddingHorizontal: P.contentInset,
            paddingTop: P.block.paddingTop,
            paddingBottom: P.block.paddingBottom,
          }}
        >
          <AppText size={P.row.titleSize} weight={600}>
            Couleur du thème
          </AppText>
          <AppText size={P.row.subtitleSize} color={colors.onSurface3} style={{ marginTop: 2 }}>
            Appliqué immédiatement
          </AppText>
          <View style={{ marginTop: 16 }}>
            <ThemeSwatches value={theme} onChange={setTheme} />
          </View>
        </View>

        <SettingsDivider />

        <SettingsRow
          icon={dark ? 'dark_mode' : 'light_mode'}
          iconFilled
          title="Mode sombre"
          subtitle={dark ? 'Activé' : 'Désactivé'}
          right={
            <Switch value={dark} onChange={setDark} accessibilityLabel="Mode sombre" />
          }
        />
      </SettingsSection>

      <SettingsSection label="MES DONNÉES">
        <SettingsRow
          icon="bookmark"
          iconFilled
          iconBackground={colors.goldSoft}
          iconColor={colors.onGold}
          title="Favoris enregistrés"
          right={<CountBadge count={count} />}
        />

        <SettingsDivider />

        <SettingsRow
          icon="phonelink_lock"
          alignTop
          title="Stockage local"
          subtitle="Cantiques, favoris et préférences restent sur votre téléphone."
        />
      </SettingsSection>

      <ListRowLink
        icon="info"
        title="À propos"
        subtitle={`Version ${APP_VERSION}`}
        onPress={() => router.push('/apropos')}
        radius={P.aboutRow.radius}
        style={{
          marginTop: P.aboutRow.marginTop,
          marginHorizontal: P.contentInset,
          marginBottom: P.aboutRow.marginBottom,
        }}
      />
    </Screen>
  );
}

/** Reexporte pour que l'ecran À propos affiche la meme version. */
export { APP_VERSION };
