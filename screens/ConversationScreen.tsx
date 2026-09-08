import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Waveform } from '../components/Waveform';
import { AppButton, AppHeader, Badge, Card, Kv, Notice, ProgressBar, Screen, SectionTitle } from '../components/ui';
import { TOTAL_QUESTIONS } from '../lib/data';
import { formatTime, localeFor } from '../lib/clock';
import { fill, useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { extractDurationHint, startListening, sttAvailable, sttLocaleFor } from '../lib/stt';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

interface Msg {
  id: string;
  role: 'ai' | 'patient';
  text: string;
  time: string;
  via?: 'voice' | 'type' | 'touch';
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'captured';

export default function ConversationScreen({ navigation }: Props) {
  const { setField, fields, language, profile } = useSession();
  const t = useT();
  const voiceLabels: Record<VoiceState, string> = {
    idle: t.readyLabel,
    listening: t.listeningLabel,
    processing: t.processingLabel,
    captured: t.capturedLabel,
  };
  const { isWide } = useLayout();
  const [mode, setMode] = useState<'speak' | 'type' | 'touch'>('speak');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [captured, setCaptured] = useState(false);
  const [interim, setInterim] = useState('');
  const [sttError, setSttError] = useState<string | null>(null);
  const stopSttRef = useRef<(() => void) | null>(null);
  const [draft, setDraft] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nowTime = () => formatTime(new Date(), localeFor(language?.code));

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'm1',
      role: 'ai',
      text: fill(t.greeting, { name: profile?.name ?? '' }),
      time: nowTime(),
    },
  ]);

  // Stop the microphone the moment the patient moves to another screen.
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused && stopSttRef.current) {
      stopSttRef.current();
      stopSttRef.current = null;
      setVoiceState('idle');
      setInterim('');
    }
  }, [focused]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      stopSttRef.current?.();
    },
    [],
  );

  const push = (m: Msg) => setMessages((prev) => [...prev, m]);

  const capture = (patientText: string, via: 'voice' | 'type' | 'touch' = 'voice', note?: string) => {
    const now = nowTime();
    push({ id: `p${Date.now()}`, role: 'patient', text: patientText, time: now, via });
    setCaptured(true);
    setVoiceState('captured');
    if (via === 'voice') {
      // The patient's own spoken words become the chief complaint and update the extract.
      setField('complaint', { label: 'Chief Complaint', value: patientText, source: 'voice' });
      const durationHint = extractDurationHint(patientText);
      if (durationHint) setField('duration', { label: 'Duration', value: durationHint, source: 'voice' });
    } else {
      setField('complaint', { label: 'Chief Complaint', value: profile?.complaint ?? patientText, source: 'touch' });
      setField('duration', { label: 'Duration', value: t.pending, source: 'derived' });
    }
    setField('inputMethod', {
      label: 'Input Method',
      value: via === 'voice' ? t.lblSpeak : via === 'type' ? t.lblType : t.lblTouch,
      source: via === 'voice' ? 'voice' : 'touch',
    });
    setField('patientResponse', {
      label: 'Patient Response',
      value: patientText,
      source: via === 'voice' ? 'voice' : 'touch',
    });
    if (note) {
      setField('associated', { label: 'Associated symptoms', value: note, source: 'touch' });
    }
    timers.current.push(
      setTimeout(() => {
        push({
          id: `a${Date.now()}`,
          role: 'ai',
          text: t.aiThanks,
          time: nowTime(),
        });
      }, 500),
    );
  };

  const startVoice = () => {
    if (voiceState === 'captured') {
      setCaptured(false);
      setVoiceState('idle');
      setInterim('');
      setSttError(null);
      return;
    }
    if (voiceState !== 'idle') return;
    setSttError(null);

    if (!sttAvailable()) {
      setSttError(t.sttUnsupported);
      setMode('type');
      return;
    }

    setInterim('');
    setVoiceState('listening');
    stopSttRef.current = startListening(sttLocaleFor(language?.code), {
      onInterim: (text) => setInterim(text),
      onFinal: (text) => {
        setInterim('');
        setVoiceState('processing');
        timers.current.push(setTimeout(() => capture(text, 'voice'), 500));
      },
      onError: (code) => {
        stopSttRef.current = null;
        setInterim('');
        setVoiceState('idle');
        if (code === 'denied') {
          setSttError(t.sttDenied);
          setMode('type');
        } else if (code === 'no-speech') {
          setSttError(t.sttNoSpeech);
        } else {
          setSttError(t.sttUnsupported);
        }
      },
      onEnd: () => {
        stopSttRef.current = null;
      },
    });
  };

  const sendTyped = () => {
    const txt = draft.trim();
    if (!txt) return;
    setDraft('');
    capture(txt, 'type');
  };

  const tapChip = (chip: string) => {
    push({ id: `t${Date.now()}`, role: 'patient', text: chip, time: nowTime(), via: 'touch' });
    setCaptured(true);
    setField('inputMethod', { label: 'Input Method', value: t.lblTouch, source: 'touch' });
    setField('associated', { label: 'Associated symptoms', value: 'Breathlessness on exertion (patient tapped)', source: 'touch' });
  };

  const canContinue = captured;

  const chat = (
    <Card padded={false} style={{ flex: 1, overflow: 'hidden' }}>
      <View style={styles.chatHeader}>
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={18} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.h3}>{t.assistantName}</Text>
          <Text style={[type.small, { marginTop: 1 }]}>{`${language?.native ?? 'हिन्दी'} · ${t.intakeMode}`}</Text>
        </View>
        <Badge
          label={voiceLabels[voiceState]}
          tone={voiceState === 'listening' ? 'danger' : voiceState === 'processing' ? 'amber' : voiceState === 'captured' ? 'success' : 'neutral'}
          icon={voiceState === 'listening' ? 'radio' : voiceState === 'processing' ? 'sync' : voiceState === 'captured' ? 'checkmark-circle' : 'ellipse-outline'}
        />
      </View>

      <View style={styles.messageArea}>
        {messages.map((m, i) => (
          <Animated.View
            key={m.id}
            entering={m.role === 'ai' ? FadeInDown.duration(timing.normal) : FadeInRight.duration(timing.normal)}
            style={[styles.bubbleWrap, m.role === 'patient' && { alignItems: 'flex-end' }]}
          >
            <View style={[styles.bubble, m.role === 'ai' ? styles.bubbleAi : styles.bubblePatient]}>
              <Text style={[type.body, { color: m.role === 'ai' ? colors.ink : colors.white, fontSize: 16.5, lineHeight: 25 }]}>
                {m.text}
              </Text>
            </View>
            <View style={styles.msgMeta}>
              {m.via === 'voice' ? <Ionicons name="mic" size={12} color={colors.inkFaint} /> : null}
              <Text style={styles.msgTime}>
                {m.via === 'voice' ? `${t.capturedViaVoice} · ` : m.via === 'touch' ? `${t.tapped} · ` : ''}
                {m.time}
              </Text>
            </View>
          </Animated.View>
        ))}

        {voiceState === 'listening' || voiceState === 'processing' ? (
          <Animated.View entering={FadeIn} style={[styles.bubbleWrap, { alignItems: 'flex-end' }]}>
            <View style={[styles.bubble, styles.bubblePatient, { paddingVertical: 10 }]}>
              <Waveform active={voiceState === 'listening'} bars={isWide ? 26 : 18} barWidth={3} height={36} color={colors.white} />
            </View>
            <Text style={styles.msgTime}>{voiceState === 'listening' ? `${t.listeningLabel}...` : t.processingSpeech}</Text>
          </Animated.View>
        ) : null}
      </View>

      <View style={styles.inputArea}>
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
          <>
          <Animated.View entering={FadeIn} style={styles.micArea}>
            <Pressable
              onPress={startVoice}
              accessibilityRole="button"
              accessibilityLabel={voiceState === 'listening' ? t.micStop : t.micStart}
              style={({ pressed }) => [
                styles.micBtn,
                voiceState === 'listening' && { backgroundColor: colors.danger, borderColor: colors.danger },
                voiceState === 'processing' && { backgroundColor: colors.teal, borderColor: colors.tealSoft },
                voiceState === 'captured' && { backgroundColor: colors.success, borderColor: colors.successSoft },
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <Ionicons
                name={
                  voiceState === 'listening'
                    ? 'stop'
                    : voiceState === 'processing'
                      ? 'sync'
                      : voiceState === 'captured'
                        ? 'refresh'
                        : 'mic'
                }
                size={34}
                color={colors.white}
              />
            </Pressable>
            <View style={{ flex: 1, marginLeft: 18 }}>
              <Waveform
                active={voiceState === 'listening'}
                bars={isWide ? 40 : 24}
                barWidth={4}
                height={48}
                color={voiceState === 'listening' ? colors.danger : voiceState === 'processing' ? colors.teal : colors.primary}
              />
              <Text style={[type.small, { marginTop: 6 }]}>
                {voiceState === 'listening'
                  ? `${t.listeningLabel}...`
                  : voiceState === 'processing'
                    ? t.processingSpeech
                    : voiceState === 'captured'
                      ? t.sttCaptured
                      : t.tapToSpeak}
              </Text>
              {voiceState === 'listening' && interim ? (
                <Animated.View entering={FadeIn} style={styles.interimBox}>
                  <Text style={styles.interimText}>{interim}</Text>
                </Animated.View>
              ) : null}
            </View>
          </Animated.View>
          {sttError ? (
            <View style={{ marginTop: 12 }}>
              <Notice tone="danger" text={sttError} icon="mic-off" />
            </View>
          ) : null}
          </>
        ) : null}

        {mode === 'type' ? (
          <Animated.View entering={FadeIn} style={styles.typeArea}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder={t.typePlaceholder}
              placeholderTextColor={colors.inkFaint}
              style={styles.input}
              multiline
              returnKeyType="send"
              onSubmitEditing={sendTyped}
              accessibilityLabel={t.typePlaceholder}
            />
            <AppButton label={t.send} icon="send" onPress={sendTyped} disabled={!draft.trim()} style={{ minWidth: 120 }} />
          </Animated.View>
        ) : null}

        {mode === 'touch' ? (
          <Animated.View entering={FadeIn}>
            <Text style={[type.micro, { marginBottom: 8 }]}>{t.chipsHeader}</Text>
            <View style={styles.chipGrid}>
              {t.chips.map((c) => (
                <Pressable key={c} onPress={() => tapChip(c)} style={({ pressed }) => [styles.chip, pressed && { backgroundColor: colors.primarySoft }]}>
                  <Text style={styles.chipText}>{c}</Text>
                  <Ionicons name="add" size={16} color={colors.primary} />
                </Pressable>
              ))}
            </View>
          </Animated.View>
        ) : null}
      </View>
    </Card>
  );

  const extract = (
    <Card style={{ width: isWide ? 360 : '100%', alignSelf: 'flex-start' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SectionTitle title={t.extractTitle} sub={t.extractSub} icon="reader" color={colors.tealDark} />
      </View>
      <View style={{ marginBottom: 4 }}>
        <Kv label={t.rows.complaint} value={fields.complaint.value} icon="medkit" tone="teal" />
        <Kv label={t.rows.duration} value={fields.duration.value} icon="time" tone="primary" />
        {fields.inputMethod ? <Kv label={t.inputMethodKv} value={fields.inputMethod.value} icon="mic" tone="violet" /> : null}
        {fields.patientResponse ? <Kv label={t.patientResponse} value={fields.patientResponse.value} icon="chatbubble-ellipses" tone="success" /> : null}
        {fields.character ? <Kv label={t.fieldCharacter} value={fields.character.value} icon="pulse" tone="violet" /> : null}
        {fields.associated ? <Kv label={t.fieldAssociated} value={fields.associated.value} icon="warning" tone="amber" /> : null}
      </View>

      <View style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={type.micro}>{t.confidenceLabel}</Text>
          <Text style={[type.micro, { color: colors.teal }]}>94%</Text>
        </View>
        <ProgressBar progress={0.94} tone="teal" />
      </View>

      <View style={styles.divider} />
      <Text style={type.micro}>{t.inputMethodInUse}</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <Badge label={t.lblSpeak.toUpperCase()} tone={mode === 'speak' ? 'primary' : 'neutral'} icon="mic" />
        <Badge label={t.lblType.toUpperCase()} tone={mode === 'type' ? 'primary' : 'neutral'} icon="keypad" />
        <Badge label={t.lblTouch.toUpperCase()} tone={mode === 'touch' ? 'primary' : 'neutral'} icon="hand-left" />
      </View>
      <View style={styles.divider} />
      <Notice tone="primary" text={t.draftOnlyNotice} />
    </Card>
  );

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label={t.back} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 110 }} />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {!canContinue ? <Text style={[type.small, { marginBottom: 6 }]}>{t.recordToContinue}</Text> : null}
          </View>
          <AppButton
            label={t.continueInterview}
            icon="arrow-forward"
            onPress={() => navigation.navigate('Adaptive')}
            disabled={!canContinue}
            style={{ minWidth: 260 }}
          />
        </View>
      }
    >
      <AppHeader
        step={5}
        totalSteps={TOTAL_STEPS}
        title={t.convHeader}
        subtitle={t.convSub}
        onBack={() => navigation.goBack()}
        right={
          <View style={styles.stepChip}>
            <Text style={styles.stepChipText}>{language?.native ?? 'हिन्दी'}</Text>
          </View>
        }
      />

      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 20, alignItems: 'flex-start' }}>
        {chat}
        {extract}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  messageArea: { padding: 18, gap: 12, backgroundColor: colors.surface },
  bubbleWrap: { maxWidth: '86%' },
  bubble: { borderRadius: radii.lg, paddingHorizontal: 16, paddingVertical: 12 },
  bubbleAi: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderTopLeftRadius: 6 },
  bubblePatient: { backgroundColor: colors.primary, borderTopRightRadius: 6 },
  msgMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginHorizontal: 6 },
  msgTime: { fontSize: 11, fontWeight: '700', color: colors.inkFaint },
  inputArea: { padding: 16, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surfaceAlt },
  segment: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radii.md, padding: 4, borderWidth: 1, borderColor: colors.border },
  segmentItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: radii.sm },
  segmentItemActive: { backgroundColor: colors.primarySoft },
  segmentText: { fontSize: 14.5, fontWeight: '700', color: colors.inkFaint, marginLeft: 7 },
  micArea: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  interimBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#C9DEFB',
  },
  interimText: { fontSize: 16, fontWeight: '600', color: colors.primaryDark, lineHeight: 22 },
  micBtn: {
    width: 74,
    height: 74,
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
    backgroundColor: colors.surface,
  },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chipText: { fontSize: 15.5, fontWeight: '700', color: colors.ink },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  stepChip: { paddingHorizontal: 12, height: 34, borderRadius: radii.pill, backgroundColor: colors.tealSoft, alignItems: 'center', justifyContent: 'center' },
  stepChipText: { color: colors.tealDark, fontWeight: '800', fontSize: 13, letterSpacing: 0.4 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
});
