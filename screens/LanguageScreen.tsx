import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppButton, AppHeader, Card, Notice, Screen } from '../components/ui';
import { LANGUAGES } from '../lib/data';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

export default function LanguageScreen({ navigation }: Props) {
  const { setLanguage, language } = useSession();
  const { isWide, isTablet } = useLayout();
  const [selected, setSelected] = useState<string | null>(language?.code ?? null);

  const columns = isWide ? 4 : isTablet ? 3 : 2;

  const onContinue = () => {
    const lang = LANGUAGES.find((l) => l.code === selected);
    if (lang) setLanguage(lang);
    navigation.navigate('Consent');
  };

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label="← Back" variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 120 }} />
          <AppButton
            label={selected ? `Continue → ${LANGUAGES.find((l) => l.code === selected)?.native}` : 'Select a language to continue'}
            icon="arrow-forward"
            onPress={onContinue}
            disabled={!selected}
            style={{ flex: 1, maxWidth: 520 }}
          />
        </View>
      }
    >
      <AppHeader step={2} totalSteps={TOTAL_STEPS} title="Language Selection" subtitle="Step 2 - भाषा का चयन करें" />

      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Text style={type.h1}>Choose Your Language / अपनी भाषा चुनें</Text>
        <Text style={[type.body, { marginTop: 8, maxWidth: 640 }]}>
          The kiosk will ask every question, play every instruction and read back the summary in this language. You can
          change it at any time by tapping the globe icon.
        </Text>
      </Animated.View>

      <View style={[styles.grid, { marginTop: 26, flexDirection: isWide ? 'row' : 'column', gap: 22 }]}>
        <View style={{ flex: 1 }}>
          <View style={[styles.langGrid, { width: '100%' }]}>
            {LANGUAGES.map((l, i) => {
              const active = selected === l.code;
              return (
                <Animated.View
                  key={l.code}
                  entering={FadeInDown.delay(i * 55).duration(timing.normal)}
                  style={{ width: `${100 / columns}%`, padding: 6 }}
                >
                  <Pressable
                    onPress={() => setSelected(l.code)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    style={({ pressed }) => [
                      styles.langBtn,
                      active && styles.langBtnActive,
                      pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                    ]}
                  >
                    <View style={styles.langTopRow}>
                      <Text style={[styles.langNative, active && { color: colors.primaryDark }]} numberOfLines={1}>
                        {l.native}
                      </Text>
                      {active ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
                    </View>
                    <Text style={[type.micro, { color: active ? colors.primary : colors.inkFaint }]}>{l.name.toUpperCase()}</Text>
                    <Text style={styles.langSample}>"{l.sample}"</Text>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>

          <Animated.View entering={FadeInDown.delay(420).duration(timing.normal)} style={{ marginTop: 16 }}>
            <Card tone="teal" style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="add-circle" size={22} color={colors.tealDark} />
              <Text style={[type.small, { color: colors.tealDark, flex: 1, marginLeft: 10, fontWeight: '600' }]}>
                5 more languages available on this kiosk - Kannada, Malayalam, Odia, Punjabi, Assamese.
              </Text>
            </Card>
          </Animated.View>
        </View>

        <Card style={{ width: isWide ? 340 : '100%', alignSelf: 'flex-start' }}>
          <Text style={type.micro}>VOICE ENGINE</Text>
          <Text style={[type.h3, { marginTop: 4 }]}>Indian-accent ASR</Text>
          <Text style={[type.small, { marginTop: 8 }]}>
            Built for natural multilingual conversations — seamlessly handling code-mixing (“severe दर्द हो रहा है”) and
            regional language variations without interrupting the conversation flow.
          </Text>
          <View style={styles.divider} />
          <Text style={type.micro}>PATIENT CAN ALSO</Text>
          <View style={{ marginTop: 10, gap: 10 }}>
            {[
              { icon: 'hand-left', text: 'Tap picture-based answers' },
              { icon: 'keypad', text: 'Type with a large-key keyboard' },
              { icon: 'person', text: 'Ask a attendant to answer for them' },
            ].map((r) => (
              <View key={r.text} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={r.icon as keyof typeof Ionicons.glyphMap} size={17} color={colors.primary} />
                <Text style={[type.small, { marginLeft: 10, color: colors.ink }]}>{r.text}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <Notice tone="neutral" text="No internet required. Language packs are bundled with the kiosk image." />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  langGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  langBtn: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
    minHeight: 128,
    justifyContent: 'space-between',
    ...shadow.sm,
  },
  langBtnActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft, ...shadow.md },
  langTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  langNative: { fontSize: 26, fontWeight: '800', color: colors.ink, flex: 1 },
  langSample: { fontSize: 13, fontWeight: '600', color: colors.inkFaint, marginTop: 4 },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  grid: { flex: 1 },
});
