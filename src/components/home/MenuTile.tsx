import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';
import { ACCUEIL } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { IconChip } from '../base/IconChip';
import type { IconName } from '../base/iconNames';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

const T = ACCUEIL.tile;

export interface MenuTileProps {
  icon: IconName;
  title: string;
  onPress: () => void;
  /** L'axe `FILL 1` : plein pour `menu_book` et le marque-page. */
  iconFilled?: boolean;
  /** Fond de la pastille. Defaut `colors.primarySoft`. */
  iconBackground?: string;
  /** Couleur du glyphe. Defaut `colors.onPrimaryContainer`. */
  iconColor?: string;
  /** Affiche a l'oppose de la pastille, quand il y a un nombre a signaler. */
  badge?: ReactNode;
  /** A fournir des qu'un badge porte une information que le titre ne dit pas. */
  accessibilityLabel?: string;
}

/**
 * Case de la grille de l'Accueil.
 *
 * Sans sous-titre : « Tout le recueil » sous « Cantiques » ou « Thème, texte »
 * sous « Paramètres » n'apprenaient rien. Les retirer raccourcit la tuile d'un
 * tiers et la fait passer en format couche, ce qui elargit la grille a l'oeil.
 * Le seul sous-titre qui portait une information — le nombre de favoris — revient
 * sous forme de badge.
 */
export function MenuTile({
  icon,
  title,
  onPress,
  iconFilled = false,
  iconBackground,
  iconColor,
  badge,
  accessibilityLabel,
}: MenuTileProps) {
  const { colors, shadow } = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      scaleTo={PRESS_SCALE.tile}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={{
        flex: 1,
        borderRadius: T.radius,
        backgroundColor: colors.surface,
        padding: T.padding,
        boxShadow: shadow,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconChip
          icon={icon}
          size={T.chip.size}
          radius={T.chip.radius}
          iconSize={T.chip.iconSize}
          background={iconBackground}
          color={iconColor}
          filled={iconFilled}
        />
        <View style={{ flex: 1 }} />
        {badge}
      </View>
      <AppText size={15.5} weight={600} style={{ marginTop: T.titleMarginTop }}>
        {title}
      </AppText>
    </PressableScale>
  );
}
