import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppButton, AppHeader, Badge, Card, Notice, ProgressBar, Screen, SectionTitle } from '../components/ui';
import { AYUSH_FIELDS, DASHAVIDHA, DOSHA_BALANCE } from '../lib/data';
import { useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Ayush'>;

export default function AyushScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const { ayushIncluded, setAyushIncluded } = useSession();
  const t = useT();

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label={t.ayushBack} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 200 }} />
          <View style={{ flex: 1 }} />
          <AppButton
            label={ayushIncluded ? t.ayushIncluded : t.ayushInclude}
            icon={ayushIncluded ? 'checkmark-circle' : 'add-circle'}
            variant={ayushIncluded ? 'success' : 'teal'}
            onPress={() => setAyushIncluded(!ayushIncluded)}
            style={{ minWidth: 320 }}
          />
        </View>
      }
    >
      <AppHeader
        step={11}
        totalSteps={TOTAL_STEPS}
        title={t.ayushModeTitle}
        subtitle={t.ayushModeSub}
        onBack={() => navigation.goBack()}
        right={<Badge label="AYUSH" tone="success" icon="leaf" />}
      />

      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Card tone="success" style={styles.modeBanner}>
          <View style={styles.leafCircle}>
            <Ionicons name="leaf" size={26} color={colors.white} />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[type.h2, { color: colors.success, letterSpacing: 0.4 }]}>{t.ayushModeTitle}</Text>
            <Text style={[type.small, { color: colors.success, marginTop: 4 }]}>{t.ayushModeSub}</Text>
          </View>
        </Card>
      </Animated.View>

      <View style={{ marginTop: 16 }}>
        <Notice tone="neutral" text={t.noReplace} icon="information-circle" />
      </View>

      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 16, marginTop: 18, alignItems: 'flex-start' }}>
        <Card style={{ flex: 1 }}>
          <SectionTitle title={t.ayushDosha} sub={t.ayushDoshaSub} icon="analytics" color={colors.tealDark} />
          {DOSHA_BALANCE.map((d, i) => (
            <Animated.View key={d.label} entering={FadeInDown.delay(i * 110).duration(timing.normal)} style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={type.bodyInk}>{d.label}</Text>
                <Text style={[type.bodyInk, { color: d.color }]}>{d.value}%</Text>
              </View>
              <View style={styles.barTrack}>
                <Animated.View entering={FadeInDown.duration(600)} style={[styles.barFill, { width: `${d.value}%`, backgroundColor: d.color }]} />
              </View>
            </Animated.View>
          ))}
          <View style={{ height: 14 }} />
          <Card tone="alt" padded>
            <Text style={type.micro}>{t.ayushInterpLabel}</Text>
            <Text style={[type.small, { marginTop: 6 }]}>{t.ayushInterpBody}</Text>
          </Card>
        </Card>

        <View style={{ flex: 1.3, gap: 14 }}>
          {AYUSH_FIELDS.map((f, i) => (
            <Animated.View key={f.key} entering={FadeInDown.delay(i * 70).duration(timing.normal)}>
              <Card style={styles.fieldCard}>
                <View style={styles.fieldIcon}>
                  <Ionicons name={f.icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.tealDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Text style={type.h3}>{f.label}</Text>
                    <Text style={[type.h3, { color: colors.teal }]}>{f.sanskrit}</Text>
                  </View>
                  <Text style={[type.bodyInk, { marginTop: 4, color: colors.tealDark, fontSize: 16.5 }]}>{f.value}</Text>
                  <Text style={[type.small, { marginTop: 4 }]}>{f.note}</Text>
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>
      </View>

      <Animated.View entering={FadeInDown.delay(260)} style={{ marginTop: 16 }}>
        <Card>
          <SectionTitle title={t.ayushDasha} sub={t.ayushDashaSub} icon="list" color={colors.tealDark} right={<Badge label="10 / 10" tone="teal" icon="checkmark-circle" />} />
          <View style={styles.tableHead}>
            <Text style={[type.micro, { flex: 1.4 }]}>{t.ayushTablePart}</Text>
            <Text style={[type.micro, { flex: 1 }]}>{t.ayushTablePart}</Text>
            <Text style={[type.micro, { flex: 1.2 }]}>{t.ayushTableFinding}</Text>
          </View>
          {DASHAVIDHA.map((d, i) => (
            <Animated.View key={d.part} entering={FadeInDown.delay(i * 45).duration(timing.normal)} style={[styles.tableRow, i % 2 === 1 && { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[type.bodyInk, { flex: 1.4, fontSize: 14.5 }]}>{d.part}</Text>
              <Text style={[type.bodyInk, { flex: 1, color: colors.teal }]}>{d.sanskrit}</Text>
              <Text style={[type.small, { flex: 1.2, color: colors.ink }]}>{d.finding}</Text>
            </Animated.View>
          ))}
        </Card>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modeBanner: { flexDirection: 'row', alignItems: 'center' },
  leafCircle: { width: 54, height: 54, borderRadius: radii.pill, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  barTrack: { height: 10, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: radii.pill },
  fieldCard: { flexDirection: 'row', alignItems: 'flex-start' },
  fieldIcon: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: colors.tealSoft, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  tableHead: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: colors.tealSoft, borderRadius: radii.sm },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 6 },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
});
