import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppButton, AppHeader, Card, Notice, Screen, SectionTitle } from '../components/ui';
import { SelectField } from '../components/SelectField';
import { useT } from '../lib/i18n';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { STATES, citiesForState } from '../lib/regions';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PatientInfo'>;
type Gender = 'male' | 'female' | 'other';

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[type.h3, { marginBottom: 6 }]}>{label}</Text>
      {hint ? <Text style={[type.small, { marginBottom: 8 }]}>{hint}</Text> : null}
      {children}
      {error ? (
        <View style={styles.errRow}>
          <Ionicons name="alert-circle" size={15} color={colors.danger} />
          <Text style={styles.errText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function PatientInfoScreen({ navigation }: Props) {
  const t = useT();
  const { isWide } = useLayout();
  const { profile, setProfile, language } = useSession();

  const [name, setName] = useState(profile?.name ?? '');
  const [age, setAge] = useState(profile?.age ?? '');
  const [gender, setGender] = useState<Gender | null>(profile?.gender ?? null);
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [state, setState] = useState(profile?.state ?? '');
  const [city, setCity] = useState(profile?.city ?? '');
  const [complaint, setComplaint] = useState(profile?.complaint ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = t.piNameErr;
    const ageNum = parseInt(age.trim(), 10);
    if (!ageNum || ageNum < 1 || ageNum > 120) e.age = t.piAgeErr;
    if (!gender) e.gender = t.piGender;
    if (!/^[0-9]{10}$/.test(phone.trim().replace(/\s/g, ''))) e.phone = t.piPhoneErr;
    if (!state) e.state = t.piStateErr;
    if (state && !city) e.city = t.piCityErr;
    if (complaint.trim().length < 3) e.complaint = t.piComplaintErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setProfile({
      name: name.trim(),
      age: age.trim(),
      gender: gender as Gender,
      phone: phone.trim(),
      state,
      city,
      complaint: complaint.trim(),
    });
    navigation.navigate('Conversation');
  };

  const inputStyle = (hasError?: boolean) => [styles.input, hasError && styles.inputError];

  const form = (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Text style={type.h1}>{t.piTitle}</Text>
        <Text style={[type.body, { marginTop: 8, maxWidth: 640, fontSize: 17 }]}>{t.piSub}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(timing.normal)} style={{ marginTop: 22 }}>
        <Card>
          <Field label={t.piName} hint={t.piNameHint} error={errors.name}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t.piName}
              placeholderTextColor={colors.inkFaint}
              style={inputStyle(!!errors.name)}
              returnKeyType="next"
              accessibilityLabel={t.piName}
            />
          </Field>

          <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Field label={t.piAge} error={errors.age}>
                <TextInput
                  value={age}
                  onChangeText={(v) => setAge(v.replace(/[^0-9]/g, '').slice(0, 3))}
                  placeholder="25"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="number-pad"
                  style={inputStyle(!!errors.age)}
                  accessibilityLabel={t.piAge}
                />
              </Field>
            </View>
            <View style={{ flex: 1.6 }}>
              <Field label={t.piGender} error={errors.gender}>
                <View style={styles.genderRow}>
                  {([
                    { key: 'male', label: t.piMale },
                    { key: 'female', label: t.piFemale },
                    { key: 'other', label: t.piOther },
                  ] as const).map((g) => {
                    const active = gender === g.key;
                    return (
                      <Pressable
                        key={g.key}
                        onPress={() => setGender(g.key)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: active }}
                        accessibilityLabel={g.label}
                        style={({ pressed }) => [styles.genderBtn, active && styles.genderBtnActive, pressed && { opacity: 0.8 }]}
                      >
                        <Ionicons
                          name={g.key === 'male' ? 'male' : g.key === 'female' ? 'female' : 'person'}
                          size={18}
                          color={active ? colors.primary : colors.inkFaint}
                        />
                        <Text style={[styles.genderText, active && { color: colors.primaryDark }]}>{g.label}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </Field>
            </View>
          </View>

          <Field label={t.piPhone} error={errors.phone}>
            <TextInput
              value={phone}
              onChangeText={(v) => setPhone(v.replace(/[^0-9]/g, '').slice(0, 10))}
              placeholder={t.piPhonePlaceholder}
              placeholderTextColor={colors.inkFaint}
              keyboardType="number-pad"
              maxLength={10}
              style={inputStyle(!!errors.phone)}
              accessibilityLabel={t.piPhone}
            />
          </Field>

          <SelectField
            label={t.piState}
            placeholder={t.piStatePlaceholder}
            value={state}
            options={STATES.map((s) => s.name)}
            onSelect={(name) => {
              setState(name);
              setCity('');
            }}
            error={errors.state}
            closeLabel={t.back}
            searchLabel={t.searchPlaceholder}
          />

          <View style={{ height: 16 }} />

          <SelectField
            label={t.piCity}
            placeholder={state ? t.piCityPlaceholder : t.piSelectStateFirst}
            value={city}
            disabled={!state}
            options={citiesForState(STATES.find((s) => s.name === state)?.code ?? null).map((c) => c.name)}
            onSelect={setCity}
            error={errors.city}
            closeLabel={t.back}
            searchLabel={t.searchPlaceholder}
          />

          <Field label={t.piComplaint} hint={t.piComplaintHint} error={errors.complaint}>
            <TextInput
              value={complaint}
              onChangeText={setComplaint}
              placeholder="…"
              placeholderTextColor={colors.inkFaint}
              multiline
              style={[...inputStyle(!!errors.complaint), { minHeight: 110, textAlignVertical: 'top' }]}
              accessibilityLabel={t.piComplaint}
            />
          </Field>

          <View style={styles.divider} />
          <Notice tone="primary" text={t.piFormNote} icon="lock-closed" />
        </Card>
      </Animated.View>
    </KeyboardAvoidingView>
  );

  const summary = (
    <Card style={{ width: isWide ? 340 : '100%', alignSelf: 'flex-start' }}>
      <SectionTitle title={t.piTitle} icon="person" color={colors.primary} />
      <Text style={[type.small, { marginBottom: 14 }]}>{t.piSub}</Text>
      {[
        { icon: 'pricetag', label: t.dashKioskLabel, value: t.metaBlock },
        { icon: 'map', label: t.piState, value: state || '—' },
        { icon: 'location', label: t.piCity, value: city || '—' },
        { icon: 'language', label: t.dashLangLabel, value: language?.native ?? 'हिन्दी' },
        { icon: 'shield-checkmark', label: t.privacyTitle, value: t.piFormNote },
      ].map((r, i) => (
        <Animated.View key={r.label} entering={FadeInDown.delay(150 + i * 80).duration(timing.normal)} style={styles.sumRow}>
          <View style={styles.sumIcon}>
            <Ionicons name={r.icon as keyof typeof Ionicons.glyphMap} size={17} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={type.micro}>{r.label.toUpperCase()}</Text>
            <Text style={[type.small, { marginTop: 2, color: colors.ink }]}>{r.value}</Text>
          </View>
        </Animated.View>
      ))}
    </Card>
  );

  return (
    <Screen
      footer={
        <View style={styles.footerRow}>
          <AppButton label={t.back} variant="ghost" size="md" onPress={() => navigation.goBack()} style={{ minWidth: 120 }} />
          <View style={{ flex: 1 }} />
          <AppButton label={`${t.continueBtn} — ${t.piTitle}`} icon="arrow-forward" onPress={submit} style={{ minWidth: 320 }} />
        </View>
      }
    >
      <AppHeader
        step={4}
        totalSteps={TOTAL_STEPS}
        title={t.piTitle}
        subtitle={t.piSub}
        onBack={() => navigation.goBack()}
      />
      <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 22, flex: 1 }}>
        <View style={{ flex: 1 }}>{form}</View>
        {summary}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 58,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 17,
    color: colors.ink,
    backgroundColor: colors.surfaceAlt,
  },
  inputError: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  errRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 7 },
  errText: { fontSize: 13, fontWeight: '700', color: colors.danger },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderBtn: {
    flex: 1,
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
  },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft, ...shadow.sm },
  genderText: { fontSize: 16, fontWeight: '700', color: colors.inkFaint },
  sumRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  sumIcon: { width: 34, height: 34, borderRadius: radii.sm, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
});
