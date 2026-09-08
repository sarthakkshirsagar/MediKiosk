import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { AppButton, AppHeader, Badge, Card, Notice, Screen } from '../components/ui';
import { PROCESSING_STEPS } from '../lib/data';
import { useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Processing'>;

function FlowDot({ delay, color }: { delay: number; color: string }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(delay, withRepeat(withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }), -1, false));
  }, [delay, p]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: p.value * 34 }],
    opacity: p.value < 0.15 ? p.value / 0.15 : p.value > 0.85 ? (1 - p.value) / 0.15 : 1,
  }));
  return <Animated.View style={[styles.dot, { backgroundColor: color }, style]} />;
}

function PulseRing({ delay, size }: { delay: number; size: number }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(delay, withRepeat(withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }), -1, false));
  }, [delay, p]);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 0.7 + p.value * 0.9 }],
    opacity: 0.35 * (1 - p.value),
  }));
  return <Animated.View pointerEvents="none" style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }, style]} />;
}

function SourceChip({ icon, label, color, delay }: { icon: string; label: string; color: string; delay: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(timing.normal)} style={[styles.sourceChip, { borderColor: color + '44' }]}>
      <View style={[styles.sourceIcon, { backgroundColor: color + '1A' }]}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={color} />
      </View>
      <Text style={styles.sourceLabel}>{label}</Text>
      <FlowDot delay={delay} color={color} />
    </Animated.View>
  );
}

export default function ProcessingScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const t = useT();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= PROCESSING_STEPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 1050);
    return () => clearTimeout(t);
  }, [step]);

  const complete = step >= PROCESSING_STEPS.length;

  return (
    <Screen scroll>
      <AppHeader
        step={8}
        totalSteps={TOTAL_STEPS}
        title={t.procHeader}
        subtitle={t.procSub}
        right={<Badge label={complete ? t.badgeComplete : t.badgeRunning} tone={complete ? 'success' : 'primary'} icon={complete ? 'checkmark-circle' : 'sync'} />}
      />

      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 20, alignItems: 'stretch' }}>
        <Card style={{ flex: 1 }}>
          <Text style={type.micro}>INPUT SIGNALS</Text>

          <View style={[styles.sources, { flexDirection: isWide ? 'row' : 'column' }]}>
            <SourceChip icon="mic" label={t.sourceVoice} color={colors.primary} delay={80} />
            <SourceChip icon="hand-left" label={t.sourceTouch} color={colors.teal} delay={200} />
            <SourceChip icon="document-text" label={t.sourceDocs} color={colors.violet} delay={320} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 6 }}>
            <View style={styles.engineWrap}>
              <PulseRing delay={0} size={210} />
              <PulseRing delay={900} size={210} />
              <LinearGradient colors={[colors.primary, colors.teal]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.engine}>
                <Ionicons name="sparkles" size={30} color={colors.white} />
                <Text style={styles.engineTitle}>MEDIKIOSK AI ENGINE</Text>
                <Text style={styles.engineSub}>{t.engineSub}</Text>
                <View style={styles.engineBarWrap}>
                  <View style={[styles.engineBar, { width: `${Math.round((step / PROCESSING_STEPS.length) * 100)}%` }]} />
                </View>
              </LinearGradient>
            </View>
            <FlowDot delay={400} color={colors.teal} />
          </View>

          <Animated.View entering={FadeIn.delay(500)} style={[styles.output, complete && { borderColor: colors.success, backgroundColor: colors.successSoft }]}>
            <Ionicons name="reader" size={22} color={complete ? colors.success : colors.inkFaint} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[type.h3, complete && { color: colors.success }]}>{t.structuredHistory}</Text>
              <Text style={[type.small, { marginTop: 2 }]}>
                {complete ? t.outputReady : t.waitingEngine}
              </Text>
            </View>
          </Animated.View>
        </Card>

        <Card style={{ width: isWide ? 400 : '100%', alignSelf: 'flex-start' }}>
          <Text style={type.micro}>PIPELINE</Text>
          <View style={{ marginTop: 12 }}>
            {PROCESSING_STEPS.map((s, i) => {
              const state = i < step ? 'done' : i === step ? 'active' : 'pending';
              return (
                <Animated.View key={s.id} entering={FadeInDown.delay(i * 120).duration(timing.normal)} style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepIcon,
                      state === 'done' && { backgroundColor: colors.successSoft },
                      state === 'active' && { backgroundColor: colors.primarySoft },
                    ]}
                  >
                    {state === 'done' ? (
                      <Ionicons name="checkmark" size={17} color={colors.success} />
                    ) : state === 'active' ? (
                      <Ionicons name="sync" size={16} color={colors.primary} />
                    ) : (
                      <Ionicons name={s.icon as keyof typeof Ionicons.glyphMap} size={16} color={colors.inkFaint} />
                    )}
                  </View>
                  <View style={{ flex: 1, opacity: state === 'pending' ? 0.5 : 1 }}>
                    <Text style={[type.bodyInk, { fontSize: 15.5 }]}>{t.stageLabels[i] || s.label}</Text>
                    <Text style={[type.small, { marginTop: 1 }]}>{s.detail}</Text>
                  </View>
                  {state === 'done' ? <Badge label="OK" tone="success" /> : state === 'active' ? <Badge label="RUN" tone="primary" /> : null}
                </Animated.View>
              );
            })}
          </View>

          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 16 }} />
          <Notice tone="primary" text={t.disclaimer} icon="reader" />
        </Card>
      </View>

      <Animated.View entering={FadeInDown.delay(400)} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ flex: 1 }}>
          <Text style={type.h3}>{complete ? t.draftReadyTime : t.workingTitle}</Text>
          <Text style={[type.small, { marginTop: 2 }]}>{complete ? t.procReady : t.procWorking}</Text>
        </View>
        <AppButton
          label={t.viewStructured}
          icon="arrow-forward"
          onPress={() => navigation.navigate('RedFlag')}
          disabled={!complete}
          style={{ minWidth: 300 }}
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sources: { gap: 12, marginTop: 14 },
  sourceChip: {
    flex: 1,
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radii.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surfaceAlt,
  },
  sourceIcon: { width: 34, height: 34, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sourceLabel: { fontSize: 13.5, fontWeight: '800', color: colors.ink, letterSpacing: 0.6, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  engineWrap: { alignItems: 'center', justifyContent: 'center', marginVertical: 10, width: 240, height: 220 },
  ring: { position: 'absolute', borderWidth: 2, borderColor: colors.teal },
  engine: {
    width: 220,
    height: 150,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    ...shadow.lg,
  },
  engineTitle: { color: colors.white, fontSize: 14, fontWeight: '800', letterSpacing: 0.8, marginTop: 8 },
  engineSub: { color: colors.white, opacity: 0.85, fontSize: 11, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  engineBarWrap: { width: '100%', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 12, overflow: 'hidden' },
  engineBar: { height: '100%', backgroundColor: colors.white, borderRadius: 2 },
  output: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 16,
    backgroundColor: colors.surfaceAlt,
    marginTop: 4,
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  stepIcon: { width: 34, height: 34, borderRadius: radii.sm, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: colors.border },
});
