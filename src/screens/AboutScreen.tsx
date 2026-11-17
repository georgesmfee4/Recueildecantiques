import { useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/base/AppText';
import { Screen } from '../components/base/Screen';
import { IconButton } from '../components/chrome/IconButton';
import { SettingsDivider, SettingsSection } from '../components/settings/SettingsSection';
import { TOTALS } from '../data/recueil';
import { useTheme } from '../theme/ThemeProvider';
import { APROPOS, PARAMETRES } from '../theme/tokens';
import { APP_VERSION } from './SettingsScreen';

const logo = require('../../assets/logo.png');

const A = APROPOS;
const P = PARAMETRES;

const AUTHORS = [
  { initials: 'TC', name: 'TCHINDEBBE Charles', role: 'Auteur du recueil' },
  { initials: 'GM', name: 'GM DIGITAL', role: 'Conception et développement' },
] as const;

export function AboutScreen() {
  const { colors } = useTheme();
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
          À propos
        </AppText>
      </View>

      {/* Identite */}
      <View
        style={{
          alignItems: 'center',
          paddingTop: A.hero.paddingTop,
          paddingHorizontal: A.hero.paddingH,
        }}
      >
        {/* Sans ombre : le logo est un livre detoure, une ombre suivrait le carre
            de l'image et non la silhouette. */}
        <Image
          source={logo}
          accessibilityIgnoresInvertColors
          accessibilityLabel="Logo du recueil"
          style={{ width: A.hero.logoSize, height: A.hero.logoSize }}
        />
        <AppText
          variant="lyric"
          size={A.hero.nameSize}
          weight={600}
          letterSpacing={A.hero.nameLetterSpacing}
          align="center"
          style={{ marginTop: A.hero.nameMarginTop }}
        >
          Recueil de Chants
        </AppText>

        <View
          style={{
            flexDirection: 'row',
            gap: A.hero.pillGap,
            marginTop: A.hero.pillMarginTop,
          }}
        >
          <Pill
            label="1ʳᵉ ÉDITION"
            background={colors.primaryContainer}
            color={colors.onPrimaryContainer}
            weight={700}
          />
          <Pill
            label={`Version ${APP_VERSION}`}
            background={colors.surface2}
            color={colors.onSurface2}
            weight={600}
          />
        </View>
      </View>

      {/* Presentation. Les nombres viennent du recueil, jamais ecrits en dur. */}
      <View
        style={{
          marginTop: A.intro.marginTop,
          marginHorizontal: P.contentInset,
          borderRadius: A.intro.radius,
          backgroundColor: colors.primarySoft,
          padding: A.intro.padding,
        }}
      >
        <AppText
          variant="lyric"
          size={A.intro.size}
          lineHeight={A.intro.lineHeight}
          color={colors.onSurface2}
        >
          Ce recueil rassemble{' '}
          <AppText variant="lyric" size={A.intro.size} weight={600}>
            {TOTALS.cantiques} cantiques
          </AppText>{' '}
          pour la louange, l’adoration et l’édification de l’Église. Cette première édition est
          destinée aux cultes, aux réunions de prière et à la méditation personnelle.
        </AppText>
      </View>

      <SettingsSection label="AUTEURS">
        {AUTHORS.map((author, i) => (
          <View key={author.initials}>
            {i > 0 ? <SettingsDivider /> : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: A.author.gap,
                paddingVertical: A.author.paddingV,
                paddingHorizontal: P.contentInset,
              }}
            >
              <View
                style={{
                  width: A.author.avatar,
                  height: A.author.avatar,
                  flexShrink: 0,
                  borderRadius: A.author.avatar / 2,
                  backgroundColor: colors.primaryContainer,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  size={A.author.avatarFontSize}
                  weight={700}
                  color={colors.onPrimaryContainer}
                >
                  {author.initials}
                </AppText>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <AppText size={A.author.nameSize} weight={600}>
                  {author.name}
                </AppText>
                <AppText
                  size={A.author.roleSize}
                  color={colors.onSurface3}
                  style={{ marginTop: 1 }}
                >
                  {author.role}
                </AppText>
              </View>
            </View>
          </View>
        ))}
      </SettingsSection>

      <AppText
        size={A.copyright.size}
        color={colors.onSurface3}
        lineHeight={A.copyright.lineHeight}
        align="center"
        style={{
          paddingTop: A.copyright.paddingTop,
          paddingHorizontal: A.copyright.paddingH,
          paddingBottom: A.copyright.paddingBottom,
        }}
      >
        {'© 2026 TCHINDEBBE Charles & GM DIGITAL\nTous droits réservés.'}
      </AppText>
    </Screen>
  );
}

function Pill({
  label,
  background,
  color,
  weight,
}: {
  label: string;
  background: string;
  color: string;
  weight: 600 | 700;
}) {
  return (
    <View
      style={{
        paddingVertical: A.hero.pill.paddingV,
        paddingHorizontal: A.hero.pill.paddingH,
        borderRadius: A.hero.pill.radius,
        backgroundColor: background,
      }}
    >
      <AppText size={A.hero.pill.fontSize} weight={weight} color={color} letterSpacing={0.2}>
        {label}
      </AppText>
    </View>
  );
}
