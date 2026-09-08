import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { LogoLockup, LogoMark } from '../components/Logo';
import { Clock } from '../components/Clock';
import { AppButton, Badge, Card, Notice, Screen, SectionTitle } from '../components/ui';
import { FEATURES } from '../lib/data';
import { useT } from '../lib/i18n';
import { RootStackParamList } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { colors, radii, shadow, timing, type } from '../lib/theme';

const TONE_MAP = {
  primary: { bg: colors.primarySoft, fg: colors.primary },
  teal: { bg: colors.tealSoft, fg: colors.teal },
  violet: { bg: colors.violetSoft, fg: colors.violet },
  amber: { bg: colors.amberSoft, fg: '#D98324' },
  success: { bg: colors.successSoft, fg: colors.success },
} as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const HOW_IT_WORKS = [
  { title: 'PATIENT', icon: 'person', tone: colors.primary },
  { title: 'VOICE + TOUCH + DOCUMENTS', icon: 'mic', tone: colors.teal },
  { title: 'MEDIKIOSK AI ENGINE', icon: 'sparkles', tone: colors.violet },
  { title: 'STRUCTURED CLINICAL HISTORY', icon: 'reader', tone: '#D98324' },
  { title: 'PHYSICIAN VERIFICATION', icon: 'shield-checkmark', tone: colors.success },
  { title: 'CONSULTATION', icon: 'medkit', tone: colors.primary },
];

/** Softly pulsing dot for the live-demonstration badge */
function PulseDot() {
  const p = useSharedValue(1);
  useEffect(() => {
    p.value = withRepeat(withTiming(0.25, { duration: 850 }), -1, true);
  }, [p]);
  const style = useAnimatedStyle(() => ({ opacity: p.value }));
  return <Animated.View style={[styles.liveDot, style]} />;
}

/** Subtle animated connection between two workflow stages */
function FlowConnector({ vertical, color, delay }: { vertical?: boolean; color: string; delay: number }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(delay, withRepeat(withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.quad) }), -1, false));
  }, [delay, p]);
  const style = useAnimatedStyle(() => {
    const t = p.value;
    const opacity = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
    return vertical ? { transform: [{ translateY: t * 22 }], opacity } : { transform: [{ translateX: t * 20 }], opacity };
  });
  return (
    <View style={vertical ? styles.vConn : styles.hConn}>
      <View style={[vertical ? styles.vConnLine : styles.hConnLine, { backgroundColor: color }]} />
      <Animated.View style={[vertical ? styles.vConnDot : styles.hConnDot, { backgroundColor: color }, style]} />
    </View>
  );
}

export default function WelcomeScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const t = useT();

  const hero = (
    <View style={{ flex: isWide ? 1.05 : 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 }}>
        <Clock />
      </View>
      <Animated.View entering={FadeIn.duration(timing.slow)}>
        <LogoLockup size={72} title={isWide ? 44 : 36} sub={t.taglineSub} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(timing.slow)} style={{ marginTop: 26 }}>
        <View style={styles.badgeRow}>
          <View style={styles.liveBadge} accessibilityLabel={t.liveMode}>
            <PulseDot />
            <Text style={styles.liveText}>{t.liveMode}</Text>
          </View>
          <Badge label={t.sihBadge} icon="flask" tone="violet" />
        </View>
        <Text style={[type.display, { marginTop: 16 }]}>{t.welcomeHeadline}</Text>
        <Text style={[type.body, { marginTop: 14, maxWidth: 520, fontSize: 17 }]}>{t.welcomeBody}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(220).duration(timing.slow)} style={{ marginTop: 30, maxWidth: 520 }}>
        <AppButton label={t.startHistory} icon="arrow-forward" onPress={() => navigation.navigate('Language')} />
        <View style={{ height: 12 }} />
        <AppButton
          label={t.viewDashboard}
          icon="pulse"
          variant="secondary"
          size="md"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(timing.slow)} style={{ marginTop: 24, maxWidth: 520 }}>
        <Notice tone="neutral" text="MediKiosk never diagnoses or prescribes. Every AI-generated draft requires physician verification." icon="shield-checkmark" />
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="business" size={15} color={colors.inkFaint} />
            <Text style={styles.metaText}>{t.metaBlock}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="wifi" size={15} color={colors.success} />
            <Text style={styles.metaText}>{t.metaOffline}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="lock-closed" size={15} color={colors.inkFaint} />
            <Text style={styles.metaText}>{t.metaPurge}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );

  const features = (
    <View style={{ flex: isWide ? 1 : 1 }}>
      <SectionTitle title={t.featuresTitle} sub={t.featuresSub} />
      <View style={{ gap: 12 }}>
        {FEATURES.map((f, i) => {
          const tone = TONE_MAP[f.tone];
          return (
            <Animated.View key={f.title} entering={FadeInDown.delay(160 + i * 90).duration(timing.slow)}>
              <Card style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: tone.bg }]}>
                  <Ionicons name={f.icon as keyof typeof Ionicons.glyphMap} size={24} color={tone.fg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={type.h3}>{t.featureTitles[i] ?? f.title}</Text>
                  <Text style={[type.small, { marginTop: 3 }]}>{t.featureBodies[i] ?? f.body}</Text>
                </View>
              </Card>
            </Animated.View>
          );
        })}
      </View>

      <Animated.View entering={FadeInDown.delay(640).duration(timing.slow)}>
        <Card tone="alt" style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center' }}>
          <LogoMark size={44} rounded={radii.md} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[type.micro, { color: colors.inkFaint }]}>{t.designedFor}</Text>
            <Text style={[type.bodyInk, { marginTop: 2, lineHeight: 22 }]}>{t.designedForValue}</Text>
          </View>
        </Card>
      </Animated.View>
    </View>
  );

  return (
    <Screen>
      <View style={[styles.split, { flexDirection: isWide ? 'row' : 'column', gap: isWide ? 44 : 30 }]}>
        {hero}
        {features}
      </View>

      <Animated.View entering={FadeInDown.delay(420).duration(timing.slow)} style={{ marginTop: 30 }}>
        <Card>
          <SectionTitle
            title={t.howTitle}
            sub={t.howSub}
            icon="git-branch"
            color={colors.primary}
          />
          {isWide ? (
            <View style={styles.hFlow}>
              {HOW_IT_WORKS.map((s, i) => (
                <React.Fragment key={s.title}>
                  <View style={styles.hStage}>
                    <View style={[styles.stageIcon, { backgroundColor: s.tone + '1A' }]}>
                      <Ionicons name={s.icon as keyof typeof Ionicons.glyphMap} size={20} color={s.tone} />
                    </View>
                    <Text style={styles.stageText} numberOfLines={2}>
                      {t.howStages[i] ?? s.title}
                    </Text>
                  </View>
                  {i < HOW_IT_WORKS.length - 1 ? <FlowConnector color={s.tone} delay={i * 220} /> : null}
                </React.Fragment>
              ))}
            </View>
          ) : (
            <View>
              {HOW_IT_WORKS.map((s, i) => (
                <React.Fragment key={s.title}>
                  <View style={styles.vStage}>
                    <View style={[styles.stageIcon, { backgroundColor: s.tone + '1A' }]}>
                      <Ionicons name={s.icon as keyof typeof Ionicons.glyphMap} size={20} color={s.tone} />
                    </View>
                    <Text style={styles.stageText}>{t.howStages[i] ?? s.title}</Text>
                  </View>
                  {i < HOW_IT_WORKS.length - 1 ? <FlowConnector vertical color={HOW_IT_WORKS[i + 1].tone} delay={i * 220} /> : null}
                </React.Fragment>
              ))}
            </View>
          )}
        </Card>
      </Animated.View>

      {/* Premium team credit - TECH ALLIANCE (Smart India Hackathon 2026) */}
      <Animated.View entering={FadeInDown.delay(560).duration(timing.slow)} style={styles.creditWrap}>
        <View style={styles.creditRule} />
        <LinearGradient
          colors={[colors.primarySoft, colors.tealSoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.creditCard}
        >
          <View style={styles.creditRow}>
            <LinearGradient
              colors={[colors.primary, colors.teal]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.creditIcon}
            >
              <Ionicons name="bulb" size={30} color={colors.white} />
            </LinearGradient>
            <View style={{ flex: 1, marginLeft: 18 }}>
              <Text style={styles.creditKicker}>CRAFTED BY</Text>
              <Text style={styles.creditName}>TECH ALLIANCE</Text>
              <View style={styles.creditAccent} />
              <Text style={styles.creditEvent}>Smart India Hackathon 2026</Text>
            </View>
            <View style={isWide ? styles.creditSide : styles.creditSideStacked}>
              <Badge label="A SMART INDIA HACKATHON 2026 INNOVATION" tone="teal" icon="bulb" />
              <Text style={[styles.creditTagline, !isWide && { textAlign: 'left' }]}>Building smarter healthcare experiences with AI</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  split: { flex: 1, alignItems: 'stretch' },
  creditWrap: { marginTop: 26 },
  creditRule: { height: 1, backgroundColor: colors.borderStrong, marginBottom: 18, opacity: 0.85 },
  creditCard: {
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#C9E7E5',
    padding: 24,
    ...shadow.md,
  },
  creditRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', rowGap: 14 },
  creditIcon: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lg,
  },
  creditKicker: { fontSize: 11.5, fontWeight: '800', letterSpacing: 2.6, color: colors.inkFaint },
  creditName: { fontSize: 30, fontWeight: '800', letterSpacing: 3.5, color: colors.ink, marginTop: 4 },
  creditAccent: { width: 52, height: 3, borderRadius: 2, backgroundColor: colors.teal, marginTop: 10, marginBottom: 10 },
  creditEvent: { fontSize: 15, fontWeight: '700', color: colors.teal, letterSpacing: 0.4 },
  creditSide: { alignItems: 'flex-end', maxWidth: 330, marginLeft: 24, gap: 8 },
  creditSideStacked: { alignItems: 'flex-start', maxWidth: 360, marginLeft: 74, gap: 8 },
  creditTagline: { fontSize: 13, fontWeight: 600, color: colors.inkSoft, textAlign: 'right' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.successSoft,
    borderWidth: 1,
    borderColor: '#C3E8D8',
  },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success },
  liveText: { fontSize: 12, fontWeight: '800', color: colors.success, letterSpacing: 0.6 },
  hFlow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  hStage: { flex: 1, minWidth: 118, alignItems: 'center' },
  vStage: { flexDirection: 'row', alignItems: 'center' },
  stageIcon: { width: 44, height: 44, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  stageText: { fontSize: 11.5, fontWeight: '800', color: colors.ink, letterSpacing: 0.5, textAlign: 'center' },
  hConn: { width: 26, height: 44, justifyContent: 'center', alignItems: 'center' },
  hConnLine: { position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 1, opacity: 0.35 },
  hConnDot: { width: 6, height: 6, borderRadius: 3 },
  vConn: { height: 26, marginLeft: 21, justifyContent: 'center' },
  vConnLine: { position: 'absolute', left: 1, top: 0, bottom: 0, width: 2, borderRadius: 1, opacity: 0.35 },
  vConnDot: { width: 6, height: 6, borderRadius: 3, marginLeft: 0 },
  featureCard: { flexDirection: 'row', alignItems: 'center' },
  featureIcon: { width: 52, height: 52, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12.5, fontWeight: '600', color: colors.inkFaint },
});
