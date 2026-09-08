import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { LogoLockup } from '../components/Logo';
import { Clock } from '../components/Clock';
import { AppButton, Badge, Card, Notice, Screen } from '../components/ui';
import { SUCCESS_FLOW } from '../lib/data';
import { fill, useT } from '../lib/i18n';
import { redFlagCount } from '../lib/questionEngine';
import { RootStackParamList } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const TONE_COLORS: Record<string, string> = {
  primary: colors.primary,
  teal: colors.teal,
  violet: colors.violet,
  amber: '#D98324',
  success: colors.success,
};

function CheckMark() {
  const s = useSharedValue(0);
  useEffect(() => {
    s.value = withDelay(180, withSpring(1, { damping: 9, stiffness: 110 }));
  }, [s]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: 0.6 + s.value * 0.4 }], opacity: s.value }));
  return (
    <Animated.View style={[styles.checkCircle, style]}>
      <Ionicons name="checkmark" size={54} color={colors.white} />
    </Animated.View>
  );
}

function Connector({ delay }: { delay: number }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(delay, withRepeat(withTiming(1, { duration: 1200 }), -1, false));
  }, [delay, p]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: p.value * 26 }], opacity: p.value < 0.2 ? p.value * 5 : p.value > 0.8 ? (1 - p.value) * 5 : 1 }));
  return (
    <View style={styles.connector}>
      <View style={styles.connectorLine} />
      <Animated.View style={[styles.connectorDot, style]} />
    </View>
  );
}

export default function SuccessScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const { reset, verified, profile, scannedDocs, fields, reportStatus } = useSession();
  const answeredCount = Object.keys(fields).filter((k) => fields[k].value && fields[k].value !== '—').length;
  const flagCount = redFlagCount(profile?.complaint ?? '');
  const t = useT();

  const startOver = () => {
    reset();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Welcome' }] }),
    );
  };

  return (
    <Screen>
      <View style={{ alignItems: 'center', paddingTop: 8 }}>
        <CheckMark />
        <Animated.View entering={FadeInDown.delay(240).duration(timing.slow)} style={{ alignItems: 'center' }}>
          <Text style={[type.display, { textAlign: 'center', marginTop: 22 }]}>{t.successTitle}</Text>
          <Text style={[type.body, { textAlign: 'center', marginTop: 12, maxWidth: 620, fontSize: 17 }]}>{t.successBody}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge label={fill(t.badgeQuestions, { n: answeredCount })} tone="primary" icon="chatbubbles" />
            <Badge label={fill(t.badgeDocuments, { n: scannedDocs.length })} tone="amber" icon="document-text" />
            <Badge label={fill(t.badgeRedFlag, { n: flagCount })} tone="danger" icon="warning" />
            <Badge label={verified ? t.verifiedBadge : t.unverifiedBadge} tone={verified ? 'success' : 'neutral'} icon="shield-checkmark" />
          </View>
          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <Clock />
          </View>
          {reportStatus ? (
            <Animated.View entering={FadeInDown.delay(200).duration(timing.normal)} style={{ marginTop: 14, alignSelf: 'center', maxWidth: 560, width: '100%' }}>
              <Notice tone="success" text={reportStatus === 'downloaded' ? t.pdfDownloaded : t.pdfPrinted} icon="checkmark-circle" />
            </Animated.View>
          ) : null}
        </Animated.View>
      </View>

      <View style={[styles.flowWrap, { flexDirection: isWide ? 'row' : 'column', gap: 24, marginTop: 34 }]}>
        <Card style={{ flex: isWide ? 1.4 : 1 }}>
          <Text style={type.micro}>{t.endToEndJourney}</Text>
          <View style={{ marginTop: 18 }}>
            {SUCCESS_FLOW.map((f, i) => (
              <View key={f.title}>
                <Animated.View entering={FadeInDown.delay(320 + i * 130).duration(timing.normal)} style={styles.flowRow}>
                  <View style={[styles.flowIcon, { backgroundColor: (TONE_COLORS[f.tone] ?? colors.primary) + '1A' }]}>
                    <Ionicons name={f.icon as keyof typeof Ionicons.glyphMap} size={22} color={TONE_COLORS[f.tone] ?? colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={type.h3}>{t.flowTitles[i] ?? f.title}</Text>
                    <Text style={[type.small, { marginTop: 2 }]}>
                      {i === 0
                        ? `${profile?.name ?? '—'} · ${t.metaBlock}`
                        : i === 1
                          ? `${fill(t.badgeQuestions, { n: answeredCount })} · ${fill(t.badgeDocuments, { n: scannedDocs.length })}`
                          : t.flowSubs[i] ?? f.sub}
                    </Text>
                  </View>
                  <View style={styles.flowBadge}>
                    <Text style={styles.flowBadgeText}>{i + 1}</Text>
                  </View>
                </Animated.View>
                {i < SUCCESS_FLOW.length - 1 ? <Connector delay={400 + i * 130} /> : null}
              </View>
            ))}
          </View>
        </Card>

        <View style={{ flex: 1, gap: 14 }}>
          <Card tone="primary">
            <Text style={[type.micro, { color: colors.primaryDark }]}>{t.impactTitle}</Text>
            <View style={styles.statGrid}>
              {[
                { v: '6m 40s' },
                { v: '↓ 72%' },
                { v: '96%' },
                { v: '4.6/5' },
              ].map((s, i) => (
                <Animated.View key={i} entering={FadeInDown.delay(420 + i * 80)} style={styles.statBox}>
                  <Text style={[type.h1, { color: colors.primary }]}>{s.v}</Text>
                  <Text style={[type.small, { marginTop: 2 }]}>{t.impactLabels[i]}</Text>
                </Animated.View>
              ))}
            </View>
          </Card>

          <Card tone="alt">
            <LogoLockup size={44} title={24} sub={t.taglineSub} />
            <Text style={[type.h2, { marginTop: 18, lineHeight: 32 }]}>{t.tagline}</Text>
            <View style={{ height: 12 }} />
            <AppButton label={t.startNewDemo} icon="refresh" onPress={startOver} style={{ alignSelf: 'stretch' }} />
            <View style={{ height: 10 }} />
            <AppButton label={t.backToDashboard} variant="ghost" size="md" icon="pulse" onPress={() => navigation.goBack()} style={{ alignSelf: 'stretch' }} />
          </Card>

          <Notice tone="amber" text={t.journeyNotice} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  checkCircle: {
    width: 108,
    height: 108,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lg,
  },
  flowWrap: { alignItems: 'flex-start' },
  flowRow: { flexDirection: 'row', alignItems: 'center' },
  flowIcon: { width: 48, height: 48, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  flowBadge: { width: 28, height: 28, borderRadius: radii.pill, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  flowBadgeText: { fontSize: 12.5, fontWeight: '800', color: colors.inkFaint },
  connector: { height: 34, marginLeft: 24, justifyContent: 'center' },
  connectorLine: { position: 'absolute', left: 23, top: 0, bottom: 0, width: 2, backgroundColor: colors.border },
  connectorDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal, marginLeft: 20 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 14 },
  statBox: { flexGrow: 1, minWidth: 130, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: '#C9DEFB', padding: 14 },
});
