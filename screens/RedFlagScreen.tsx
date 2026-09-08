import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { AppButton, AppHeader, Badge, Card, Notice, Screen, SectionTitle } from '../components/ui';
import { fill, useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { classifyComplaint } from '../lib/questionEngine';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RedFlag'>;

function Flashing({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <Animated.View entering={FadeIn.delay(delay)} style={{ opacity: on ? 1 : 0.86 }}>
      {children}
    </Animated.View>
  );
}

export default function RedFlagScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const t = useT();
  const { profile } = useSession();

  // Safety screening follows the same complaint classification as the interview:
  // a headache complaint shows headache flags, not chest-pain flags.
  const category = useMemo(() => classifyComplaint(profile?.complaint ?? '').primary, [profile?.complaint]);
  const flags = useMemo(() => {
    const tpl = t.flagTemplates[category];
    const list = [{ title: tpl.title, detail: tpl.detail, source: t.categoryLabels[category] }];
    if (category === 'chest' && profile) {
      list.push({
        title: t.riskFlagTitle,
        detail: fill(t.riskFlagDetail, { age: profile.age }),
        source: t.categoryLabels.general,
      });
    }
    return list;
  }, [category, profile, t]);
  const [modal, setModal] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const hero = (
    <Card tone="amber" elevation="lg" style={{ flex: isWide ? 1.2 : 1 }}>
      <Flashing>
        <View style={styles.alertIconWrap}>
          <View style={styles.alertIcon}>
            <Ionicons name="warning" size={40} color={colors.white} />
          </View>
        </View>
      </Flashing>

      <Text style={[type.h1, { color: colors.amber, marginTop: 18, textAlign: 'center' }]}>{t.alertTitle}</Text>
      <Text style={[type.body, { color: colors.ink, marginTop: 12, textAlign: 'center', fontSize: 17 }]}>{t.alertBody}</Text>
      <Text style={[type.h3, { color: colors.amber, marginTop: 10, textAlign: 'center' }]}>{t.alertPriority}</Text>

      <View style={styles.badgeRow}>
        <Badge label={t.urgent} tone="amber" icon="alarm" />
        <Badge label={t.noReplace} tone="neutral" icon="person" />
      </View>

      <View style={styles.rule} />

      <Text style={[type.micro, { color: colors.amber }]}>{t.whatTriggered}</Text>
      <View style={{ marginTop: 8 }}>
        {flags.map((f, i) => (
          <Animated.View key={f.title} entering={FadeInDown.delay(i * 110).duration(timing.normal)} style={styles.flagRow}>
            <View style={styles.flagBullet}>
              <Ionicons name="alert" size={16} color={colors.amber} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[type.bodyInk, { fontSize: 16 }]}>{f.title}</Text>
              <Text style={[type.small, { marginTop: 2 }]}>{f.detail}</Text>
              <Text style={[type.micro, { marginTop: 4, color: colors.inkFaint }]}>{f.source.toUpperCase()}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={{ marginTop: 14 }}>
        <Notice tone="amber" text={t.noDiagnosis} />
      </View>
    </Card>
  );

  const side = (
    <View style={{ width: isWide ? 360 : '100%', gap: 14 }}>
      <Card>
        <SectionTitle title={t.whatsNext} icon="shield-checkmark" color={colors.primary} />
        {t.nextTitles.map((title, i) => ({ n: String(i + 1), t: title, d: t.nextBodies[i] })).map((s, i) => (
          <Animated.View key={s.n} entering={FadeInDown.delay(i * 100).duration(timing.normal)} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{s.n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={type.bodyInk}>{s.t}</Text>
              <Text style={[type.small, { marginTop: 2 }]}>{s.d}</Text>
            </View>
          </Animated.View>
        ))}
      </Card>

      <Card tone="alt">
        <Text style={type.micro}>{t.protocolTitle.toUpperCase()}</Text>
        <Text style={[type.bodyInk, { marginTop: 6 }]}>{t.crashTeam}</Text>
        <Text style={[type.small, { marginTop: 4 }]}>{t.emergencyNote}</Text>
        <AppButton label={t.showProtocol} icon="call" variant="secondary" size="md" onPress={() => setModal(true)} style={{ marginTop: 14 }} />
        <Text style={[type.micro, { marginTop: 8, textAlign: 'center' }]}>{t.demoNoCall}</Text>
      </Card>
    </View>
  );

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <Pressable onPress={() => setAcknowledged((v) => !v)} style={styles.ackRow} accessibilityRole="checkbox" accessibilityState={{ checked: acknowledged }}>
            <View style={[styles.checkbox, acknowledged && styles.checkboxOn]}>
              {acknowledged ? <Ionicons name="checkmark" size={18} color={colors.white} /> : null}
            </View>
            <Text style={[type.small, { flex: 1, color: colors.ink }]}>{t.ackText}</Text>
          </Pressable>
          <AppButton
            label={t.continueDashboard}
            icon="arrow-forward"
            onPress={() => navigation.navigate('Dashboard')}
            disabled={!acknowledged}
            style={{ minWidth: 340 }}
          />
        </View>
      }
    >
      <AppHeader
        step={9}
        totalSteps={TOTAL_STEPS}
        title={t.flagHeader}
        subtitle={t.alertPriority}
        onBack={() => navigation.goBack()}
        right={<Badge label={t.urgent} tone="amber" icon="alarm" />}
      />

      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 20, alignItems: 'flex-start' }}>
        {hero}
        {side}
      </View>

      <Modal visible={modal} transparent animationType="fade" onRequestClose={() => setModal(false)}>
        <View style={styles.modalBackdrop}>
          <Animated.View entering={FadeInDown.duration(timing.normal)} style={styles.modalCard}>
            <View style={[styles.alertIcon, { backgroundColor: colors.danger }]}>
              <Ionicons name="call" size={28} color={colors.white} />
            </View>
            <Text style={[type.h2, { marginTop: 14 }]}>{t.protocolTitle}</Text>
            <Text style={[type.body, { marginTop: 8, textAlign: 'center' }]}>{t.protocolBody}</Text>
            <View style={{ height: 16 }} />
            <AppButton label={t.closeLabel} variant="secondary" onPress={() => setModal(false)} style={{ alignSelf: 'stretch' }} />
          </Animated.View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  alertIconWrap: { alignItems: 'center' },
  alertIcon: { width: 84, height: 84, borderRadius: radii.pill, backgroundColor: '#D98324', alignItems: 'center', justifyContent: 'center', ...shadow.md },
  badgeRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 16, flexWrap: 'wrap' },
  rule: { height: 1, backgroundColor: '#F4DFBD', marginVertical: 18 },
  flagRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  flagBullet: { width: 30, height: 30, borderRadius: radii.sm, backgroundColor: colors.amberSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8 },
  stepNum: { width: 30, height: 30, borderRadius: radii.pill, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepNumText: { fontSize: 14, fontWeight: '800', color: colors.primary },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  ackRow: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 12 },
  checkbox: { width: 32, height: 32, borderRadius: 9, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkboxOn: { backgroundColor: colors.amber, borderColor: colors.amber },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(11,27,43,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 420, backgroundColor: colors.surface, borderRadius: radii.xl, padding: 26, alignItems: 'center', ...shadow.lg },
});
