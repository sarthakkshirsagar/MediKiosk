import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Waveform } from '../components/Waveform';
import { formatStamp, localeFor } from '../lib/clock';
import { AppButton, AppHeader, Badge, Card, Notice, ProgressBar, Screen, SectionTitle } from '../components/ui';
import { useT } from '../lib/i18n';
import { estimateSeconds, pauseSpeech, primeVoices, resumeSpeech, speakText, stopSpeech, ttsLocaleFor } from '../lib/tts';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Consent'>;

export default function ConsentScreen({ navigation }: Props) {
  const { language, consentMode, setConsentMode, setConsent } = useSession();
  const t = useT();
  const { isWide } = useLayout();
  const [agreed, setAgreed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationRef = useRef(10);
  const focused = useIsFocused();

  // Stop audio the moment the patient moves on to another screen.
  useEffect(() => {
    if (!focused) {
      stopSpeech();
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      setPlaying(false);
    }
  }, [focused]);

  /** Full consent explanation, assembled from the localised strings for the selected language. */
  const spokenText = useMemo(
    () =>
      [
        t.consentIntro,
        `${t.whyTitle}. ${t.whyBody}`,
        `${t.privacyTitle}. ${t.privacyBody}`,
        `${t.importantTitle}. ${t.importantBody}`,
      ].join(' '),
    [t],
  );

  const stopTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const startTick = () => {
    stopTick();
    tickRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 0.2;
        setProgress(Math.min(0.99, next / durationRef.current));
        return next;
      });
    }, 200);
  };

  // Stop any audio when leaving the screen or switching language.
  useEffect(() => {
    primeVoices();
    return () => {
      stopSpeech();
      stopTick();
    };
  }, []);

  useEffect(() => {
    stopSpeech();
    stopTick();
    setPlaying(false);
    setElapsed(0);
    setProgress(0);
  }, [language?.code]);

  const playAudio = () => {
    setConsentMode('audio');
    if (playing) {
      // Pause button while audio is playing.
      pauseSpeech();
      setPlaying(false);
      stopTick();
      return;
    }
    // Resume paused speech, or start fresh.
    if (resumeSpeech()) {
      setPlaying(true);
      startTick();
      return;
    }
    durationRef.current = estimateSeconds(spokenText);
    if (progress >= 0.99) {
      setElapsed(0);
      setProgress(0);
    }
    speakText(spokenText, ttsLocaleFor(language?.code), {
      onProgress: (p) => setProgress(p),
      onEnd: () => {
        setPlaying(false);
        setProgress(1);
        stopTick();
      },
    });
    setPlaying(true);
    startTick();
  };

  const accept = () => {
    setConsent(true);
    navigation.navigate('PatientInfo');
  };

  const main = (
    <View style={{ flex: 1 }}>
      <AppHeader
        step={3}
        totalSteps={TOTAL_STEPS}
        title={t.consentHeader}
        subtitle={`${language?.native ?? 'हिन्दी'} · ${language?.name ?? 'Hindi'}`}
        onBack={() => navigation.goBack()}
      />

      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Text style={type.h1}>{t.consentTitle}</Text>
        <Text style={[type.body, { marginTop: 8, maxWidth: 640, fontSize: 17 }]}>{t.consentIntro}</Text>
      </Animated.View>

      <Card style={{ marginTop: 22 }}>
        {[
          {
            icon: 'help-circle',
            title: t.whyTitle,
            body: t.whyBody,
            tone: colors.primary,
            bg: colors.primarySoft,
          },
          {
            icon: 'lock-closed',
            title: t.privacyTitle,
            body: t.privacyBody,
            tone: colors.success,
            bg: colors.successSoft,
          },
          {
            icon: 'alert-circle',
            title: t.importantTitle,
            body: t.importantBody,
            tone: colors.amber,
            bg: colors.amberSoft,
          },
        ].map((s, i) => (
          <Animated.View key={s.title} entering={FadeInDown.delay(i * 90).duration(timing.normal)} style={styles.sectionRow}>
            <View style={[styles.pointIcon, { backgroundColor: s.bg }]}>
              <Ionicons name={s.icon as keyof typeof Ionicons.glyphMap} size={20} color={s.tone} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={type.h3}>{s.title}</Text>
              <Text style={[type.body, { marginTop: 4 }]}>{s.body}</Text>
            </View>
          </Animated.View>
        ))}
      </Card>

      <Card style={{ marginTop: 16 }} tone={playing ? 'primary' : 'alt'}>
        <View style={styles.audioRow}>
          <Pressable
            onPress={playAudio}
            accessibilityRole="button"
            accessibilityLabel={playing ? t.playingExplanation : t.listenExplanation}
            style={({ pressed }) => [styles.playBtn, pressed && { transform: [{ scale: 0.96 }] }]}
          >
            <Ionicons name={playing ? 'pause' : 'play'} size={26} color={colors.white} />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={type.h3}>{playing ? t.playingExplanation : t.listenExplanation}</Text>
            <Text style={[type.small, { marginTop: 2 }]}>
              {language?.native ?? 'हिन्दी'} · {Math.round(durationRef.current)}s {t.audioSuffix}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Waveform active={playing} bars={isWide ? 34 : 20} barWidth={3} gap={3} height={34} color={colors.primary} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <ProgressBar progress={progress} height={4} style={{ flex: 1 }} />
              <Text style={[type.micro, { marginLeft: 10 }]}>
                {Math.round(elapsed)}s / {durationRef.current}s
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={{ marginTop: 16 }} tone="success">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="shield-checkmark" size={22} color={colors.success} />
          <Text style={[type.h3, { marginLeft: 10, color: colors.success }]}>{t.privacyTitle}</Text>
          <View style={{ flex: 1 }} />
          <Badge label="HIPAA-ALIGNED" tone="success" />
        </View>
        <Text style={[type.small, { marginTop: 10 }]}>{t.privacyBody}</Text>
      </Card>
    </View>
  );

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <Pressable
            onPress={() => setAgreed((v) => !v)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
            style={({ pressed }) => [styles.consentRow, pressed && { opacity: 0.8 }]}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed ? <Ionicons name="checkmark" size={20} color={colors.white} /> : null}
            </View>
            <Text style={[type.bodyInk, { flex: 1, fontSize: 15 }]}>{t.consentCheckbox}</Text>
          </Pressable>
          <AppButton label={t.consentBtn} icon="arrow-forward" onPress={accept} disabled={!agreed} style={{ minWidth: 320 }} />
        </View>
      }
    >
      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 22, flex: 1 }}>
        {main}
        <Animated.View entering={FadeIn.delay(200)} style={{ width: isWide ? 320 : '100%' }}>
          <Card tone="alt" style={{ position: isWide ? 'absolute' : 'relative', top: 0, width: '100%' }}>
            <Text style={type.micro}>{t.consentRecordTitle}</Text>
            <Text style={[type.h3, { marginTop: 4 }]}>{t.consentRecordSub}</Text>
            <View style={{ marginTop: 14, gap: 12 }}>
              {[
                { k: t.consentRows[0], v: '—' },
                { k: t.consentRows[1], v: consentMode === 'audio' ? t.consentModeAudio : t.consentModeWritten },
                { k: t.consentRows[2], v: language?.native ?? 'हिन्दी' },
                { k: t.consentRows[3], v: t.metaBlock },
                { k: t.consentRows[4], v: formatStamp(new Date(), localeFor(language?.code)) },
              ].map((r) => (
                <View key={r.k}>
                  <Text style={type.micro}>{r.k.toUpperCase()}</Text>
                  <Text style={[type.bodyInk, { marginTop: 2 }]}>{r.v}</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
            <Notice tone="neutral" text={t.declineNote} />
            <AppButton label={t.back} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ marginTop: 8 }} />
          </Card>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12 },
  pointIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  audioRow: { flexDirection: 'row', alignItems: 'center' },
  playBtn: {
    width: 62,
    height: 62,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.md,
  },
  consentRow: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 16 },
  checkbox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
});
