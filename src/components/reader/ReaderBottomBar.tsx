import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeProvider';
import { LECTURE } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

const { bottomBar } = LECTURE;

export interface ReaderBottomBarProps {
  prevLabel: string;
  nextLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onDialpad: () => void;
}

/** Barre fixe de navigation. Le parcours est circulaire dans la section. */
export function ReaderBottomBar({
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  onDialpad,
}: ReaderBottomBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const sideButton = {
    flex: 1,
    height: bottomBar.buttonHeight,
    borderRadius: bottomBar.buttonRadius,
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 6,
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: bottomBar.gap,
        paddingTop: bottomBar.paddingTop,
        paddingHorizontal: bottomBar.paddingH,
        paddingBottom: bottomBar.paddingBottom + insets.bottom,
        borderTopWidth: 1,
        borderTopColor: colors.outline,
        backgroundColor: colors.surface,
      }}
    >
      <PressableScale
        onPress={onPrev}
        scaleTo={PRESS_SCALE.button}
        accessibilityRole="button"
        accessibilityLabel={`Précédent, ${prevLabel}`}
        style={sideButton}
      >
        <Icon name="arrow_back" size={bottomBar.iconSize} color={colors.onSurface} />
        <AppText size={bottomBar.fontSize} weight={600}>
          {prevLabel}
        </AppText>
      </PressableScale>

      <PressableScale
        onPress={onDialpad}
        haptic="open"
        scaleTo={PRESS_SCALE.icon}
        accessibilityRole="button"
        accessibilityLabel="Aller à un numéro"
        style={{
          width: bottomBar.dialpadWidth,
          height: bottomBar.buttonHeight,
          flexShrink: 0,
          borderRadius: bottomBar.buttonRadius,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="dialpad" size={24} color={colors.onPrimary} filled />
      </PressableScale>

      <PressableScale
        onPress={onNext}
        scaleTo={PRESS_SCALE.button}
        accessibilityRole="button"
        accessibilityLabel={`Suivant, ${nextLabel}`}
        style={sideButton}
      >
        <AppText size={bottomBar.fontSize} weight={600}>
          {nextLabel}
        </AppText>
        <Icon name="arrow_forward" size={bottomBar.iconSize} color={colors.onSurface} />
      </PressableScale>
    </View>
  );
}
