import { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { MAX_NUMBER, getEntry } from '../../data/recueil';
import type { Section } from '../../data/types';
import { useHaptic } from '../../hooks/useHaptic';
import { KEYS, applyKey, digitsFor, isActionKey, type Key } from '../../lib/numberInput';
import { useTheme } from '../../theme/ThemeProvider';
import { DIALOG, EASING, MOTION } from '../../theme/tokens';
import { AppText } from '../base/AppText';
import { Icon } from '../base/Icon';
import { IconChip } from '../base/IconChip';
import { PRESS_SCALE, PressableScale } from '../base/PressableScale';

const { header, preview, keypad, submit } = DIALOG;

/**
 * Decoupage en rangees de trois. Une grille CSS a `1fr 1fr 1fr` ne se transpose
 * pas en pourcentages : 3 x 33,33 % plus deux gouttieres depasse la largeur et
 * ne laisse que deux touches par rangee. Des rangees de `flex: 1` reproduisent
 * exactement le comportement de la grille.
 */
const KEY_ROWS: Key[][] = Array.from({ length: KEYS.length / keypad.columns }, (_, r) =>
  KEYS.slice(r * keypad.columns, (r + 1) * keypad.columns)
);

export interface NumberPadDialogProps {
  visible: boolean;
  onClose: () => void;
  onOpen: (section: Section, n: number) => void;
  /** Section preselectionnee : celle d'ou vient l'utilisateur. */
  initialSection?: Section;
}

export function NumberPadDialog({
  visible,
  onClose,
  onOpen,
  initialSection = 'cantiques',
}: NumberPadDialogProps) {
  const { colors, shadow, error } = useTheme();
  const buzz = useHaptic();

  const section: Section = initialSection;
  const [value, setValue] = useState('');

  const progress = useSharedValue(0);

  // Remise a zero a chaque ouverture.
  useEffect(() => {
    if (!visible) return;
    setValue('');
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: MOTION.dialogIn.duration,
      easing: Easing.bezier(...EASING.dialogIn),
    });
  }, [visible, progress]);

  // Le bouton retour Android ferme le dialogue au lieu de quitter l'ecran.
  useEffect(() => {
    if (!visible) return undefined;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  const max = MAX_NUMBER[section];
  const maxDigits = digitsFor(max);

  const entry = useMemo(() => {
    const n = Number.parseInt(value, 10);
    return Number.isNaN(n) ? undefined : getEntry(section, n);
  }, [section, value]);

  const press = useCallback(
    (key: Key) => {
      buzz('key');
      setValue((v) => applyKey(v, key, maxDigits));
    },
    [buzz, maxDigits]
  );

  const go = useCallback(() => {
    if (!entry) return;
    buzz('open');
    onOpen(entry.section, entry.n);
  }, [buzz, entry, onOpen]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: DIALOG.pop.scale + (1 - DIALOG.pop.scale) * progress.value },
      { translateY: (1 - progress.value) * DIALOG.pop.offset },
    ],
  }));

  if (!visible) return null;

  const invalid = value.length > 0 && !entry;
  const hint = invalid
    ? 'Ce numéro n’existe pas dans le recueil'
    : `Entrez un numéro de 1 à ${max}`;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          backgroundColor: colors.scrim,
          alignItems: 'center',
          justifyContent: 'center',
          padding: DIALOG.overlayPadding,
        },
        overlayStyle,
      ]}
    >
      {/* Le voile ferme au toucher ; la carte absorbe les appuis pour ne pas se
          refermer quand on tape a cote d'une touche. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fermer"
        onPress={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <Animated.View style={[{ width: '100%' }, cardStyle]}>
        <Pressable
          onPress={() => undefined}
          accessibilityViewIsModal
          style={{
            borderRadius: DIALOG.radius,
            backgroundColor: colors.surface,
            paddingTop: DIALOG.paddingTop,
            paddingHorizontal: DIALOG.paddingH,
            paddingBottom: DIALOG.paddingBottom,
            boxShadow: DIALOG.shadow,
          }}
        >
          {/* En-tete */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: header.gap }}>
            {/* Icone en pastille, comme dans les reglages et les conseils de
                recherche : l'en-tete gagne un point d'ancrage. */}
            <IconChip icon="dialpad" size={38} radius={13} iconSize={header.iconSize} filled />
            <AppText
              size={header.titleSize}
              weight={700}
              letterSpacing={header.titleLetterSpacing}
              style={{ flex: 1 }}
            >
              Aller à un numéro
            </AppText>
            <PressableScale
              onPress={onClose}
              scaleTo={PRESS_SCALE.icon}
              accessibilityRole="button"
              accessibilityLabel="Fermer"
              style={{
                width: header.closeSize,
                height: header.closeSize,
                borderRadius: header.closeRadius,
                backgroundColor: colors.surface2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="close" size={header.closeIconSize} color={colors.onSurface2} />
            </PressableScale>
          </View>

          {/* Aperçu en direct. Plus de selecteur Cantique / Chœur : les chœurs
              ont ete retires, le clavier ouvre toujours un cantique. */}
          <View
            style={{
              marginTop: preview.marginTop,
              paddingVertical: preview.paddingV,
              paddingHorizontal: preview.paddingH,
              borderRadius: preview.radius,
              backgroundColor: colors.primarySoft,
              borderWidth: 1,
              borderColor: colors.primaryBorder,
              minHeight: preview.minHeight,
              justifyContent: 'center',
            }}
          >
            {/* Le nombre passe lui aussi au rouge quand le numero n'existe pas :
                le prototype ne colorait que le message, ce qui envoyait deux
                signaux contradictoires. */}
            <AppText
              variant="lyric"
              size={preview.displaySize}
              weight={600}
              lineHeight={1}
              letterSpacing={preview.displayLetterSpacing}
              color={invalid ? error : colors.primary}
              style={{ minHeight: preview.displayMinHeight }}
            >
              {value || preview.placeholder}
            </AppText>

            {entry ? (
              // Titre en Literata, comme partout ailleurs dans l'application, et
              // rappel de la structure du chant : l'apercu confirme reellement ce
              // que l'on s'apprete a ouvrir.
              <View
                style={{ marginTop: preview.hintMarginTop, minHeight: preview.hintMinHeight }}
                accessibilityLiveRegion="polite"
              >
                <AppText
                  variant="lyric"
                  size={preview.titleSize}
                  weight={600}
                  color={colors.onPrimaryContainer}
                  lineHeight={preview.hintLineHeight}
                  numberOfLines={2}
                >
                  {entry.title}
                </AppText>
                <AppText
                  size={preview.metaSize}
                  color={colors.onPrimaryContainer}
                  style={{ marginTop: 3, opacity: preview.metaOpacity }}
                >
                  {entry.meta}
                </AppText>
              </View>
            ) : (
              <AppText
                size={preview.hintSize}
                weight={500}
                color={invalid ? error : colors.onPrimaryContainer}
                lineHeight={preview.hintLineHeight}
                accessibilityLiveRegion="polite"
                style={{ marginTop: preview.hintMarginTop, minHeight: preview.hintMinHeight }}
              >
                {hint}
              </AppText>
            )}
          </View>

          {/* Pavé numérique */}
          <View style={{ marginTop: keypad.marginTop, gap: keypad.gap }}>
            {KEY_ROWS.map((row, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: keypad.gap }}>
                {row.map((key) => (
                  <KeypadKey key={key} value={key} onPress={press} />
                ))}
              </View>
            ))}
          </View>

          {/* Ouvrir */}
          <PressableScale
            onPress={go}
            disabled={!entry}
            haptic={null}
            scaleTo={PRESS_SCALE.row}
            accessibilityRole="button"
            accessibilityState={{ disabled: !entry }}
            accessibilityLabel={entry ? `Ouvrir ${entry.title}` : 'Ouvrir'}
            style={{
              height: submit.height,
              marginTop: submit.marginTop,
              borderRadius: submit.radius,
              backgroundColor: entry ? colors.primary : colors.surface2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: submit.gap,
              ...(entry ? { boxShadow: shadow } : null),
            }}
          >
            <AppText
              size={submit.fontSize}
              weight={700}
              color={entry ? colors.onPrimary : colors.onSurface3}
            >
              Ouvrir
            </AppText>
            <Icon
              name="arrow_forward"
              size={submit.iconSize}
              color={entry ? colors.onPrimary : colors.onSurface3}
            />
          </PressableScale>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

/**
 * Touche du pave. Enfoncement et changement de fond, comme dans le prototype :
 * la mise a l'echelle est portee par une vue animee, le fond par l'etat pressed
 * du `Pressable` — combiner les deux sur un seul noeud anime n'est pas fiable.
 */
function KeypadKey({ value, onPress }: { value: Key; onPress: (k: Key) => void }) {
  const { colors } = useTheme();
  const action = isActionKey(value);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <Pressable
        onPress={() => onPress(value)}
        onPressIn={() => {
          scale.value = withTiming(keypad.pressScale, { duration: MOTION.press.duration });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: MOTION.press.duration });
        }}
        accessibilityRole="button"
        accessibilityLabel={
          value === 'back'
            ? 'Effacer le dernier chiffre'
            : value === 'clear'
              ? 'Tout effacer'
              : value
        }
        style={({ pressed }) => ({
          height: keypad.keyHeight,
          borderRadius: keypad.keyRadius,
          borderWidth: 1,
          borderColor: colors.outline,
          backgroundColor: pressed
            ? colors.surface3
            : action
              ? colors.surface2
              : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        {action ? (
          <Icon
            name={value === 'back' ? 'backspace' : 'close'}
            size={keypad.actionIconSize}
            color={colors.onSurface2}
          />
        ) : (
          <AppText variant="lyric" size={keypad.digitSize} weight={600}>
            {value}
          </AppText>
        )}
      </Pressable>
    </Animated.View>
  );
}
