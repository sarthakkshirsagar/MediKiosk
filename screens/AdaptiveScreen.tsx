import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Waveform } from '../components/Waveform';
import { AppButton, AppHeader, Badge, Card, Notice, ProgressBar, Screen, SectionTitle } from '../components/ui';
import { fill, useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { EngineQuestion, buildInterview } from '../lib/questionEngine';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Adaptive'>;
type Mode = 'speak' | 'type' | 'touch';

export default function AdaptiveScreen({ navigation }: Props) {
  const t = useT();
  const { isWide } = useLayout();
  const { profile, fields, setField, language } = useSession();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Patient Complaint -> category -> relevant question set (one question at a time).
  const { category, secondary, questions } = useMemo(
    () => buildInterview(profile?.complaint ?? ''),
    [profile?.complaint],
  );
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('speak');
  const [recording, setRecording] = useState(false);
  const [typed, setTyped] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const current: EngineQuestion | null = questions[index] ?? null;
  const done = !current;

  const questionText = (q: EngineQuestion) => (t.interview[q.cat] && t.interview[q.cat][q.qIndex]) || '';

  /** Analyze Answer -> store it -> ask the next relevant question. */
  const answerWith = (value: string, source: 'voice' | 'touch') => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    setField(`intake_${current.id}`, { label: questionText(current), value, source });
    // The first question is always onset - it resolves the Duration field.
    if (current.qIndex === 0 && current.cat === category) {
      setField('duration', { label: 'Duration', value, source });
    }
    setTyped('');
    timers.current.push(setTimeout(() => setIndex((i) => i + 1), 420));
  };

  const startVoice = () => {
    if (recording || !current) return;
    setRecording(true);
    timers.current.push(setTimeout(() => setRecording(false), 1800));
    timers.current.push(setTimeout(() => answerWith(t.voiceAnswer, 'voice'), 1900));
  };

  const skip = () => answerWith('—', 'touch');

  const categoryLabel = t.categoryLabels[category] || category;

  const questionCard = (
    <Card style={{ flex: 1 }}>
      {!done && current ? (
        <Animated.View key={current.id} entering={FadeInDown.duration(timing.normal)}>
          <View style={styles.badgeRow}>
            <Badge label={fill(t.questionOf, { n: index + 1, m: total })} icon="help-circle" tone="primary" />
            <Badge label={categoryLabel} icon="pricetag" tone="teal" />
            {index > 0 ? (
              <Pressable
                onPress={() => setIndex((i) => Math.max(0, i - 1))}
                style={({ pressed }) => [styles.miniBtn, pressed && { opacity: 0.6 }]}
                accessibilityLabel={t.prevQuestion}
              >
                <Ionicons name="chevron-back" size={18} color={colors.inkSoft} />
              </Pressable>
            ) : null}
          </View>

          <View style={styles.aiRow}>
            <View style={styles.aiAvatar}>
              <Ionicons name="sparkles" size={18} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[type.h2, { lineHeight: 32 }]}>{questionText(current)}</Text>
            </View>
          </View>

          {/* Answer controls - Speak / Type / Touch */}
          <View style={styles.segment}>
            {([
              { key: 'speak', label: t.lblSpeak, icon: 'mic' },
              { key: 'type', label: t.lblType, icon: 'keypad' },
              { key: 'touch', label: t.lblTouch, icon: 'hand-left' },
            ] as const).map((m) => {
              const active = mode === m.key;
              return (
                <Pressable
                  key={m.key}
                  onPress={() => setMode(m.key)}
                  style={[styles.segmentItem, active && styles.segmentItemActive]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                >
                  <Ionicons name={m.icon} size={17} color={active ? colors.primary : colors.inkFaint} />
                  <Text style={[styles.segmentText, active && { color: colors.primary }]}>{m.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {mode === 'speak' ? (
            <Animated.View entering={FadeIn} style={styles.answerArea}>
              <Pressable
                onPress={startVoice}
                accessibilityRole="button"
                accessibilityLabel={recording ? t.micStop : t.micStart}
                style={({ pressed }) => [
                  styles.micBtn,
                  recording && { backgroundColor: colors.danger, borderColor: colors.danger },
                  pressed && { transform: [{ scale: 0.96 }] },
                ]}
              >
                <Ionicons name={recording ? 'stop' : 'mic'} size={28} color={colors.white} />
              </Pressable>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Waveform active={recording} bars={isWide ? 34 : 20} barWidth={3} height={40} color={recording ? colors.danger : colors.primary} />
                <Text style={[type.small, { marginTop: 6 }]}>{recording ? t.speakNow : t.tapToSpeak}</Text>
              </View>
            </Animated.View>
          ) : null}

          {mode === 'type' ? (
            <Animated.View entering={FadeIn} style={styles.typeArea}>
              <TextInput
                value={typed}
                onChangeText={setTyped}
                placeholder={t.typePlaceholder}
                placeholderTextColor={colors.inkFaint}
                style={styles.input}
                returnKeyType="send"
                onSubmitEditing={() => typed.trim() && answerWith(typed.trim(), 'touch')}
                accessibilityLabel={t.typePlaceholder}
              />
              <AppButton label={t.send} icon="send" onPress={() => typed.trim() && answerWith(typed.trim(), 'touch')} disabled={!typed.trim()} style={{ minWidth: 110 }} />
            </Animated.View>
          ) : null}

          {mode === 'touch' ? (
            <Animated.View entering={FadeIn} style={styles.chipRow}>
              {[t.quickYes, t.quickNo, t.quickUnknown].map((c) => (
                <Pressable key={c} onPress={() => answerWith(c, 'touch')} style={({ pressed }) => [styles.chip, pressed && { backgroundColor: colors.primarySoft }]}>
                  <Text style={styles.chipText}>{c}</Text>
                  <Ionicons name="add" size={16} color={colors.primary} />
                </Pressable>
              ))}
            </Animated.View>
          ) : null}

          <Pressable onPress={skip} style={({ pressed }) => [styles.skip, pressed && { opacity: 0.6 }]}>
            <Text style={styles.skipText}>{t.skipQuestion}</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn} style={{ alignItems: 'center', paddingVertical: 30 }}>
          <View style={styles.doneIcon}>
            <Ionicons name="checkmark" size={44} color={colors.white} />
          </View>
          <Text style={[type.h2, { marginTop: 18 }]}>{t.doneTitle}</Text>
          <Text style={[type.body, { marginTop: 8, textAlign: 'center', maxWidth: 460 }]}>{fill(t.doneBody, { m: total })}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge label={fill(t.badgeQuestions, { n: total })} tone="primary" icon="chatbubbles" />
            <Badge label={`${categoryLabel}`} tone="teal" icon="pricetag" />
          </View>
        </Animated.View>
      )}
    </Card>
  );

  const answeredList = questions.slice(0, index);

  const panel = (
    <Card style={{ width: isWide ? 380 : '100%', alignSelf: 'flex-start' }}>
      <SectionTitle title={t.clinicalInfo} sub={t.clinicalInfoSub} icon="reader" color={colors.tealDark} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={type.micro}>{t.questionsAnswered}</Text>
        <Text style={[type.micro, { color: colors.primary }]}>
          {Math.min(index, total)} / {total}
        </Text>
      </View>
      <ProgressBar progress={Math.min(index / total, 1)} />

      <View style={[styles.row, { marginTop: 14 }]}>
        <View style={styles.rowIcon}>
          <Ionicons name="pricetag" size={15} color={colors.teal} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.micro}>{categoryLabel === t.categoryLabels.general ? t.rows.complaint.toUpperCase() : t.categoryLabels[category].toUpperCase()}</Text>
          <Text style={[type.bodyInk, { marginTop: 2, fontSize: 15 }]}>{categoryLabel}{secondary ? ` + ${t.categoryLabels[secondary]}` : ''}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowIcon}>
          <Ionicons name="medkit" size={15} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.micro}>{t.rows.complaint.toUpperCase()}</Text>
          <Text style={[type.bodyInk, { marginTop: 2, fontSize: 15 }]}>{profile?.complaint ?? '—'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowIcon}>
          <Ionicons name="time" size={15} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.micro}>{t.rows.duration.toUpperCase()}</Text>
          <Text style={[type.bodyInk, { marginTop: 2, fontSize: 15 }]}>{fields.duration?.value ?? '—'}</Text>
        </View>
      </View>

      {answeredList.map((q, i) => (
        <Animated.View key={q.id} entering={FadeInDown.delay(i * 50).duration(timing.normal)} style={styles.row}>
          <View style={[styles.rowIcon, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="checkmark" size={15} color={colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.micro, { lineHeight: 16 }]}>{questionText(q).toUpperCase()}</Text>
            <Text style={[type.bodyInk, { marginTop: 2, fontSize: 15 }]}>{answers[q.id] ?? '—'}</Text>
          </View>
        </Animated.View>
      ))}

      {!done && current ? (
        <View style={[styles.row, { opacity: 0.6 }]}>
          <View style={[styles.rowIcon, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="time-outline" size={15} color={colors.inkFaint} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.micro, { lineHeight: 16 }]}>{questionText(current).toUpperCase()}</Text>
            <Text style={[type.small, { marginTop: 2, fontStyle: 'italic' }]}>{t.pending}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.divider} />
      <Notice tone="amber" text={t.panelNotice} />
    </Card>
  );

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label={t.back} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 110 }} />
          <View style={{ flex: 1 }} />
          <AppButton
            label={t.continueDocs}
            icon="arrow-forward"
            onPress={() => navigation.navigate('Scan')}
            disabled={!done}
            style={{ minWidth: 280 }}
          />
        </View>
      }
    >
      <AppHeader
        step={6}
        totalSteps={TOTAL_STEPS}
        title={t.adaptiveHeader}
        subtitle={t.adaptiveSub}
        onBack={() => navigation.goBack()}
        right={
          <View style={styles.stepChip}>
            <Text style={styles.stepChipText}>
              {Math.min(index + 1, total)} / {total}
            </Text>
          </View>
        }
      />

      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 20, alignItems: 'flex-start' }}>
        {questionCard}
        {panel}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  aiRow: { flexDirection: 'row', alignItems: 'flex-start' },
  aiAvatar: { width: 42, height: 42, borderRadius: radii.pill, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  segment: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: radii.md, padding: 4, borderWidth: 1, borderColor: colors.border, marginTop: 20 },
  segmentItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: radii.sm, gap: 7 },
  segmentItemActive: { backgroundColor: colors.primarySoft },
  segmentText: { fontSize: 14.5, fontWeight: '700', color: colors.inkFaint },
  answerArea: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  micBtn: {
    width: 66,
    height: 66,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.primarySoft,
    ...shadow.md,
  },
  typeArea: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 14 },
  input: {
    flex: 1,
    minHeight: 56,
    maxHeight: 120,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.surfaceAlt,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chipText: { fontSize: 15.5, fontWeight: '700', color: colors.ink },
  skip: { alignSelf: 'center', paddingVertical: 14, paddingHorizontal: 20, marginTop: 8 },
  skipText: { fontSize: 14, fontWeight: '700', color: colors.inkFaint },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 30, height: 30, borderRadius: radii.sm, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  miniBtn: { width: 34, height: 34, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt },
  doneIcon: { width: 86, height: 86, borderRadius: radii.pill, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center', ...shadow.md },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  stepChip: { paddingHorizontal: 12, height: 34, borderRadius: radii.pill, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  stepChipText: { color: colors.primaryDark, fontWeight: '800', fontSize: 13 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
});
