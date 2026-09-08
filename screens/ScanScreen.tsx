import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AppButton, AppHeader, Badge, Card, Notice, ProgressBar, Screen } from '../components/ui';
import { SCANNABLE_DOCS, ScannableDoc } from '../lib/data';
import { formatShortDate, localeFor } from '../lib/clock';
import { fill, useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;
type Status = 'idle' | 'scanning' | 'done';

const SCAN_STAGES = [
  'DOCUMENT UPLOADED',
  'SCANNING',
  'TEXT DETECTION',
  'MEDICAL ENTITY EXTRACTION',
  'STRUCTURED DATA',
];

function ScanPreview({ active }: { active: boolean }) {
  const y = useSharedValue(0);

  useEffect(() => {
    if (active) {
      y.value = 0;
      y.value = withRepeat(withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.quad) }), -1, true);
    } else {
      y.value = withTiming(0, { duration: 200 });
    }
    return () => {
      y.value = 0;
    };
  }, [active, y]);

  const lineStyle = useAnimatedStyle(() => ({ transform: [{ translateY: 8 + y.value * 92 }], opacity: active ? 1 : 0 }));

  return (
    <View style={styles.preview}>
      {[70, 90, 55, 82, 62].map((w, i) => (
        <View key={i} style={[styles.paperLine, { width: `${w}%` }]} />
      ))}
      <Animated.View style={[styles.scanLine, lineStyle]} />
    </View>
  );
}

function DocCard({ doc, status, progress, onScan }: { doc: ScannableDoc; status: Status; progress: number; onScan: () => void }) {
  const t = useT();
  const { profile, language } = useSession();
  const idx = Math.max(0, SCANNABLE_DOCS.indexOf(doc));
  const title = t.docTitles[idx] || doc.title;
  const today = formatShortDate(new Date(), localeFor(language?.code));
  const rows = [
    { label: t.consentRows[0], value: profile?.name ?? '—' },
    { label: doc.key === 'prescription' ? t.docMedication : t.docInvestigation, value: t.docTranscribed },
    { label: t.docDate, value: today },
  ];
  const done = status === 'done';
  const scanning = status === 'scanning';

  return (
    <Card padded={false} style={{ overflow: 'hidden', opacity: done ? 1 : 1 }}>
      <View style={styles.docHead}>
        <View style={[styles.docIcon, done && { backgroundColor: colors.successSoft }, scanning && { backgroundColor: colors.primarySoft }]}>
          <Ionicons name={doc.icon as keyof typeof Ionicons.glyphMap} size={22} color={done ? colors.success : scanning ? colors.primary : colors.inkSoft} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.h3}>{title}</Text>
          <Text style={[type.small, { marginTop: 1 }]}>{t.docHints[SCANNABLE_DOCS.indexOf(doc)] ?? doc.hint}</Text>
        </View>
        {done ? <Badge label={t.scannedBadge} tone="success" icon="checkmark-circle" /> : scanning ? <Badge label={t.readingBadge} tone="primary" icon="scan" /> : null}
      </View>

      <View style={styles.docBody}>
        <ScanPreview active={scanning} />
        <View style={{ flex: 1, marginLeft: 16 }}>
          {done ? (
            <Animated.View entering={FadeInDown.duration(timing.normal)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                <Badge label={t.extractionComplete} tone="success" icon="checkmark-circle" />
                <Badge label={`${t.ocrConfidence}: ${doc.confidence}%`} tone="teal" icon="analytics" />
              </View>
              <Text style={type.micro}>{t.extractedInfo}</Text>
              <View style={{ marginTop: 8 }}>
                {rows.map((e, i) => (
                  <View key={i} style={styles.extractRow}>
                    <Text style={type.micro}>{e.label.toUpperCase()}</Text>
                    <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{e.value}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.draftNote}>{t.draftNote}</Text>
            </Animated.View>
          ) : scanning ? (
            <View>
              <Text style={type.micro}>{t.ocrPipeline}</Text>
              {SCAN_STAGES.map((s, i) => {
                const stage = progress * SCAN_STAGES.length;
                const st = stage >= i + 1 ? 'done' : stage > i ? 'active' : 'pending';
                return (
                  <View key={s} style={styles.stageRow}>
                    <Ionicons
                      name={st === 'done' ? 'checkmark-circle' : st === 'active' ? 'sync' : 'ellipse-outline'}
                      size={13}
                      color={st === 'done' ? colors.success : st === 'active' ? colors.primary : colors.inkFaint}
                    />
                    <Text
                      style={[
                        styles.stageText,
                        st === 'active' && { color: colors.primary },
                        st === 'done' && { color: colors.success },
                      ]}
                    >
                      {t.stages[i] || s}
                    </Text>
                  </View>
                );
              })}
              <ProgressBar progress={progress} style={{ marginTop: 10 }} height={5} />
              <Text style={[type.micro, { marginTop: 6 }]}>{Math.round(progress * 100)}%</Text>
            </View>
          ) : (
            <View>
              <Text style={[type.small, { marginBottom: 12 }]}>{t.scanHint}</Text>
              <AppButton label={`${t.scanLabel} ${title}`} icon="scan" size="md" variant="secondary" onPress={onScan} style={{ alignSelf: 'flex-start' }} />
            </View>
          )}
        </View>
      </View>

      {done ? (
        <Pressable onPress={onScan} style={styles.rescan}>
          <Ionicons name="refresh" size={15} color={colors.inkFaint} />
          <Text style={styles.rescanText}>{t.scanAgain}</Text>
        </Pressable>
      ) : null}
    </Card>
  );
}

export default function ScanScreen({ navigation }: Props) {
  const { markScanned, scannedDocs } = useSession();
  const t = useT();
  const { isWide } = useLayout();
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const counter = useRef(0);

  const scan = (key: string) => {
    counter.current += 1;
    setStatus((s) => ({ ...s, [key]: 'scanning' }));
    setProgress((p) => ({ ...p, [key]: 0 }));
  };

  const scanAll = () => SCANNABLE_DOCS.forEach((d, i) => setTimeout(() => scan(d.key), i * 260));

  useEffect(() => {
    const active = Object.keys(status).filter((k) => status[k] === 'scanning');
    if (!active.length) return;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = { ...p };
        active.forEach((k) => {
          next[k] = Math.min(1, (next[k] ?? 0) + 0.055 + Math.random() * 0.045);
        });
        return next;
      });
    }, 95);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    Object.keys(status).forEach((k) => {
      if (status[k] === 'scanning' && (progress[k] ?? 0) >= 1) {
        setStatus((s) => ({ ...s, [k]: 'done' }));
        markScanned(k);
      }
    });
  }, [progress, status, markScanned]);

  const doneCount = SCANNABLE_DOCS.filter((d) => status[d.key] === 'done').length;
  const scanningCount = SCANNABLE_DOCS.filter((d) => status[d.key] === 'scanning').length;

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label={t.back} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 110 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[type.small, { textAlign: 'center' }]}>
              {fill(t.docsRead, { done: doneCount, total: SCANNABLE_DOCS.length })}
              {scanningCount ? ` - ${fill(t.docsInProgress, { n: scanningCount })}` : ''}
            </Text>
          </View>
          <AppButton
            label={t.continueBtn}
            icon="arrow-forward"
            onPress={() => navigation.navigate('Processing')}
            disabled={doneCount === 0}
            style={{ minWidth: 220 }}
          />
        </View>
      }
    >
      <AppHeader
        step={7}
        totalSteps={TOTAL_STEPS}
        title={t.scanHeader}
        subtitle={t.scanSub}
        onBack={() => navigation.goBack()}
        right={
          <View style={styles.stepChip}>
            <Text style={styles.stepChipText}>{doneCount} / {SCANNABLE_DOCS.length}</Text>
          </View>
        }
      />

      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Text style={type.h1}>{t.scanTitle}</Text>
        <Text style={[type.body, { marginTop: 8, maxWidth: 660, fontSize: 17 }]}>{t.scanIntro}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(90)} style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <AppButton label={t.scanAll} icon="documents" variant="teal" size="md" onPress={scanAll} disabled={scanningCount > 0 || doneCount === SCANNABLE_DOCS.length} />
        <View style={{ flex: 1 }} />
        <Badge label={fill(t.processedBadge, { n: scannedDocs.length })} tone="neutral" icon="lock-closed" />
      </Animated.View>

      <View style={[styles.grid, { marginTop: 20, flexDirection: isWide ? 'row' : 'column' }]}>
        {SCANNABLE_DOCS.map((d, i) => (
          <Animated.View key={d.key} entering={FadeInDown.delay(140 + i * 80).duration(timing.normal)} style={{ flex: isWide ? 1 : undefined }}>
            <DocCard doc={d} status={status[d.key] ?? 'idle'} progress={progress[d.key] ?? 0} onScan={() => scan(d.key)} />
          </Animated.View>
        ))}
      </View>

      <View style={{ marginTop: 18 }}>
        <Notice tone="amber" text={t.scanNotice} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 16, alignItems: 'stretch' },
  docHead: { flexDirection: 'row', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  docIcon: { width: 46, height: 46, borderRadius: radii.md, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  docBody: { flexDirection: 'row', padding: 18, alignItems: 'flex-start' },
  preview: {
    width: 96,
    height: 116,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  paperLine: { height: 6, borderRadius: 3, backgroundColor: colors.border },
  scanLine: { position: 'absolute', left: 6, right: 6, height: 3, borderRadius: 2, backgroundColor: colors.primary },
  extractRow: { marginBottom: 8 },
  stageRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 4 },
  stageText: { fontSize: 11, fontWeight: '800', color: colors.inkSoft, letterSpacing: 0.5, flexShrink: 1 },
  draftNote: { fontSize: 11.5, fontWeight: '700', color: colors.amber, marginTop: 10, lineHeight: 16 },
  rescan: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surfaceAlt },
  rescanText: { fontSize: 13, fontWeight: '700', color: colors.inkFaint },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  stepChip: { paddingHorizontal: 12, height: 34, borderRadius: radii.pill, backgroundColor: colors.amberSoft, alignItems: 'center', justifyContent: 'center' },
  stepChipText: { color: colors.amber, fontWeight: '800', fontSize: 13 },
});
