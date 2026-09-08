import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Modal, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { AppButton, AppHeader, Badge, Card, Notice, Screen, SectionTitle } from '../components/ui';
import { Clock } from '../components/Clock';
import { formatShortDate, formatStamp, formatTime, localeFor } from '../lib/clock';
import { SCANNABLE_DOCS } from '../lib/data';
import { fill, useT } from '../lib/i18n';
import { buildInterview, redFlagCount } from '../lib/questionEngine';
import { buildReportHtml, printReport, ReportBlock, ReportModel } from '../lib/report';
import { RootStackParamList, TOTAL_STEPS } from '../lib/nav';
import { useLayout } from '../lib/responsive';
import { useSession } from '../lib/store';
import { colors, radii, shadow, timing, type } from '../lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
type Tab = 'history' | 'timeline' | 'documents';

const TONE_COLORS: Record<string, string> = {
  primary: colors.primary,
  teal: colors.teal,
  amber: '#D98324',
  danger: colors.danger,
  violet: colors.violet,
};

export default function DashboardScreen({ navigation }: Props) {
  const { isWide } = useLayout();
  const session = useSession();
  const t = useT();
  const fieldLabel = (id: string, fallback: string) => {
    const map: Record<string, string> = {
      complaint: t.rows.complaint,
      duration: t.rows.duration,
      character: t.fieldCharacter,
      onset: t.fieldOnset,
      location: t.rows.location,
      radiation: t.rows.radiation,
      modifier: t.rows.aggravating,
      associated: t.fieldAssociated,
      status: t.fieldStatus,
      inputMethod: t.inputMethodKv,
      reliev: t.rows.relieving,
    };
    return map[id] ?? fallback;
  };
  const [tab, setTab] = useState<Tab>('history');
  const [editing, setEditing] = useState(false);
  const [draftHpi, setDraftHpi] = useState(session.hpi);
  const [draftMeds, setDraftMeds] = useState(session.meds.join('\n'));
  const [draftAllergies, setDraftAllergies] = useState(session.allergies.join('\n'));
  const [confirm, setConfirm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const locale = localeFor(session.language?.code);
  const [syncedAt, setSyncedAt] = useState(() => formatTime(new Date(), locale));
  const sessionStartStamp = session.sessionStart ? formatStamp(new Date(session.sessionStart), locale) : '—';
  const verifiedStamp = session.historyGenerated ? formatStamp(new Date(session.historyGenerated), locale) : '—';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setSyncedAt(formatTime(new Date(), localeFor(session.language?.code)));
    }, 1200);
  }, [session.language?.code]);

  const saveEdits = () => {
    session.setHpi(draftHpi.trim() || session.hpi);
    session.setMeds(draftMeds.split('\n').map((s) => s.trim()).filter(Boolean));
    session.setAllergies(draftAllergies.split('\n').map((s) => s.trim()).filter(Boolean));
    setEditing(false);
  };

  const fieldOrder = ['complaint', 'duration', 'character', 'onset', 'location', 'radiation', 'modifier', 'associated', 'status'];
  const baseFields = fieldOrder.map((k) => ({ id: k, ...session.fields[k] })).filter((f) => !!f.value);
  const intakeFields = Object.keys(session.fields)
    .filter((k) => k.startsWith('intake_'))
    .map((k) => ({ id: k, ...session.fields[k] }))
    .filter((f) => !!f.value);
  const fields = [...baseFields, ...intakeFields];

  /** Assembles the printable/downloadable patient history report from the live session data. */
  const buildHtml = () => {
    const p = session.profile;
    const genderLabel = p ? (p.gender === 'male' ? t.piMale : p.gender === 'female' ? t.piFemale : t.piOther) : '—';
    const meds = session.meds;
    const allergies = session.allergies;
    const scanned = SCANNABLE_DOCS.filter((d) => session.scannedDocs.includes(d.key));

    const blocks: ReportBlock[] = [
      {
        heading: t.piTitle,
        items: [
          { label: t.piName, value: p?.name ?? '—' },
          { label: t.piAge, value: p?.age ?? '—' },
          { label: t.piGender, value: genderLabel },
          { label: t.piPhone, value: p?.phone ?? '—' },
          { label: t.piState, value: p?.state ?? '—' },
          { label: t.piCity, value: p?.city ?? '—' },
          { label: t.consentRows[4], value: sessionStartStamp },
        ],
      },
      {
        heading: t.rows.complaint,
        items: [
          { label: t.rows.complaint, value: session.fields.complaint?.value ?? '—' },
          { label: t.rows.duration, value: session.fields.duration?.value ?? '—' },
          ...(session.fields.patientResponse ? [{ label: t.patientResponse, value: session.fields.patientResponse.value }] : []),
        ],
      },
      { heading: t.dashHpi, bullets: [session.hpi || '—'] },
    ];

    if (fields.length) {
      blocks.push({
        heading: t.fieldAssociated,
        items: fields.map((f) => ({ label: f.label, value: f.value })),
      });
    }
    if (meds.length) blocks.push({ heading: t.dashMeds, bullets: meds });
    if (allergies.length) blocks.push({ heading: t.dashAllergies, bullets: allergies });
    if (scanned.length) {
      blocks.push({
        heading: t.reportDocs,
        items: scanned.map((d) => ({
          label: t.docTitles[SCANNABLE_DOCS.indexOf(d)] ?? d.title,
          value: `${t.docDate}: ${today} · ${t.ocrConfidence} ${d.confidence}%`,
        })),
        footnote: t.extractedFromDocs,
      });
    }

    const model: ReportModel = {
      tagline: t.taglineSub,
      title: t.reportTitle,
      aiSummaryTitle: t.aiSummaryTitle,
      aiSummaryBody: t.aiSummarySub,
      reviewBadge: t.physicianReview,
      generatedLabel: t.generatedOn,
      generatedValue: formatStamp(new Date(), locale),
      statusLabel: t.dashBannerTitle,
      statusValue: session.verified ? t.verifiedBadge : t.unverifiedBadge,
      blocks,
      footerNote: t.journeyNotice,
    };
    return buildReportHtml(model, t.metaBlock, t.tagline);
  };

  const onPrintReport = () => {
    try {
      printReport(buildHtml());
      session.setReportStatus('printed');
    } catch {
      /* print unsupported - keep app functional */
    }
  };
  const profile = session.profile;
  const today = formatShortDate(new Date(), locale);
  const genderLabel = profile ? (profile.gender === 'male' ? t.piMale : profile.gender === 'female' ? t.piFemale : t.piOther) : '';
  const initials = profile ? profile.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') : '';

  if (!profile) {
    return (
      <Screen>
        <AppHeader
          step={10}
          totalSteps={TOTAL_STEPS}
          title={t.dashTitle}
          subtitle={t.emptyNone}
          onBack={() => navigation.goBack()}
        />
        <Card style={{ alignItems: 'center', paddingVertical: 46, paddingHorizontal: 26 }}>
          <View style={[styles.avatar, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="person-add" size={28} color={colors.inkFaint} />
          </View>
          <Text style={[type.h2, { marginTop: 16, textAlign: 'center' }]}>{t.piSub}</Text>
          <Text style={[type.small, { marginTop: 8, textAlign: 'center', maxWidth: 440 }]}>{t.emptyNone}</Text>
          <View style={{ height: 18 }} />
          <AppButton label={t.startHistory} icon="arrow-forward" onPress={() => navigation.navigate('PatientInfo')} />
        </Card>
      </Screen>
    );
  }

  const tabs: { key: Tab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'history', label: t.dashTabHistory, icon: 'reader' },
    { key: 'timeline', label: t.dashTabTimeline, icon: 'time' },
    { key: 'documents', label: t.dashTabDocuments, icon: 'document-text' },
  ];

  const left = (
    <View style={{ flex: 1, gap: 16 }}>
      <Card>
        <SectionTitle title={t.rows.complaint} icon="medkit" color={colors.primary} />
        <Text style={[type.h2, { lineHeight: 30 }]}>{session.fields.complaint.value}</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <Badge label={`${t.rows.duration.toUpperCase()}: ${session.fields.duration.value.toUpperCase()}`} tone="primary" icon="time" />
          {session.fields.character ? (
            <Badge label={session.fields.character.value.toUpperCase()} tone="neutral" icon="pulse" />
          ) : null}
        </View>
      </Card>

      <Card>
        <SectionTitle
          title={t.dashHpi}
          icon="chatbubbles"
          color={colors.tealDark}
          right={
            editing ? null : (
              <AppButton label={t.dashEdit} icon="create" variant="ghost" size="sm" onPress={() => setEditing(true)} />
            )
          }
        />
        {editing ? (
          <Animated.View entering={FadeIn}>
            <TextInput value={draftHpi} onChangeText={setDraftHpi} multiline style={styles.editInput} accessibilityLabel={t.dashEditHistory} />
            <Text style={[type.micro, { marginTop: 6 }]}>{t.dashAuditNote}</Text>
          </Animated.View>
        ) : (
          <Text style={type.body}>{session.hpi}</Text>
        )}
        <View style={{ height: 12 }} />
        <Text style={type.micro}>{t.dashStructuredFields}</Text>
        <View style={{ marginTop: 6 }}>
          {fields.map((f, i) => (
            <Animated.View key={f.id} entering={FadeInDown.delay(i * 50).duration(timing.normal)} style={styles.fieldRow}>
              <View style={[styles.fieldIcon, { backgroundColor: f.source === 'voice' ? colors.primarySoft : f.source === 'touch' ? colors.tealSoft : colors.amberSoft }]}>
                <Ionicons
                  name={f.source === 'voice' ? 'mic' : f.source === 'touch' ? 'hand-left' : f.source === 'document' ? 'document-text' : 'sparkles'}
                  size={15}
                  color={f.source === 'voice' ? colors.primary : f.source === 'touch' ? colors.tealDark : colors.amber}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={type.micro}>{fieldLabel(f.id, f.label).toUpperCase()}</Text>
                <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{f.value}</Text>
              </View>
            </Animated.View>
          ))}
        </View>
        <View style={{ height: 12 }} />
        <Notice tone="neutral" text={t.panelNotice} icon="person" />
      </Card>

      <Card>
        <SectionTitle title={t.dashPmh} icon="albums" color={colors.violet} />
        <Notice tone="neutral" text={t.emptyNone} icon="ellipse-outline" />
      </Card>

      <Card tone="danger">
        <SectionTitle title={t.dashAllergies} icon="alert-circle" color={colors.dangerDark} />
        {editing ? (
          <TextInput value={draftAllergies} onChangeText={setDraftAllergies} multiline style={[styles.editInput, { backgroundColor: colors.surface }]} accessibilityLabel={t.dashAllergies} />
        ) : session.allergies.length ? (
          session.allergies.map((a, i) => (
            <Animated.View key={a} entering={FadeInDown.delay(i * 70).duration(timing.normal)} style={styles.bullet}>
              <Ionicons name="close-circle" size={16} color={colors.danger} style={{ marginTop: 4, marginRight: 10 }} />
              <Text style={[type.bodyInk, { flex: 1, fontSize: 15.5, color: colors.dangerDark }]}>{a}</Text>
            </Animated.View>
          ))
        ) : (
          <Notice tone="neutral" text={t.emptyNone} icon="ellipse-outline" />
        )}
      </Card>
    </View>
  );

  const right = (
    <View style={{ width: isWide ? 400 : '100%', gap: 16 }}>
      <Card>
        <SectionTitle title={t.dashMeds} icon="medkit" color={colors.tealDark} />
        {editing ? (
          <TextInput value={draftMeds} onChangeText={setDraftMeds} multiline style={styles.editInput} accessibilityLabel={t.dashMeds} />
        ) : session.meds.length ? (
          session.meds.map((m, i) => (
            <Animated.View key={m} entering={FadeInDown.delay(i * 70).duration(timing.normal)} style={styles.bullet}>
              <Ionicons name="checkmark-circle" size={17} color={colors.teal} style={{ marginTop: 3, marginRight: 10 }} />
              <Text style={[type.bodyInk, { flex: 1, fontSize: 15.5 }]}>{m}</Text>
            </Animated.View>
          ))
        ) : (
          <Notice tone="neutral" text={t.emptyNone} icon="ellipse-outline" />
        )}
        <View style={{ height: 10 }} />
        <Notice tone="neutral" text={t.dashMedsNote} />
      </Card>

      <Card>
        <SectionTitle title={t.dashInvestigations} icon="flask" color={colors.primary} />
        <Notice tone="neutral" text={t.emptyNone} icon="ellipse-outline" />
      </Card>

      <Card tone="alt">
        <SectionTitle title={t.dashIntakeSummary} icon="analytics" color={colors.inkSoft} />
        <View style={styles.statGrid}>
          {[
            { k: t.dashStatLabels[0], v: `${fields.filter((f) => f.value && f.value !== '—').length} / ${buildInterview(profile.complaint).questions.length}` },
            { k: t.dashStatLabels[1], v: `${session.scannedDocs.length} / ${SCANNABLE_DOCS.length}` },
            { k: t.inputMethodKv, v: session.fields.inputMethod?.value ?? '—' },
            { k: t.dashStatLabels[3], v: String(redFlagCount(profile.complaint)) },
          ].map((s) => (
            <View key={s.k} style={styles.statBox}>
              <Text style={type.micro}>{s.k.toUpperCase()}</Text>
              <Text style={[type.h3, { marginTop: 2 }]}>{s.v}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 12 }} />
        <AppButton
          label={t.dashAyushBtn}
          icon="leaf"
          variant="secondary"
          size="md"
          onPress={() => navigation.navigate('Ayush')}
          style={{ alignSelf: 'stretch' }}
        />
        {session.ayushIncluded ? <View style={{ marginTop: 10 }}><Badge label={t.dashAyushAttached} tone="success" icon="checkmark-circle" /></View> : null}
      </Card>
    </View>
  );

  const timelineTab = (
    <Card>
      <SectionTitle title={t.timelineTitle} sub={t.timelineSub} icon="time" color={colors.primary} />
      <View style={{ marginTop: 6 }}>
        {[
          { icon: 'log-in', tone: 'primary', title: t.timelineTitles[0], body: fill(t.timelineBodies[0], { kiosk: t.metaBlock, lang: session.language?.native ?? 'हिन्दी' }) },
          { icon: 'chatbubbles', tone: 'primary', title: t.timelineTitles[1], body: fill(t.timelineBodies[1], { complaint: profile.complaint }) },
          { icon: 'document-text', tone: 'amber', title: t.timelineTitles[2], body: fill(t.timelineBodies[2], { n: session.scannedDocs.length }) },
          { icon: 'warning', tone: 'danger', title: t.timelineTitles[3], body: fill(t.timelineBodies[3], { n: redFlagCount(profile.complaint) }) },
          { icon: 'reader', tone: 'violet', title: t.timelineTitles[4], body: t.timelineBodies[4] },
          { icon: 'shield-checkmark', tone: 'success', title: t.timelineTitles[5], body: session.verified ? t.timelineBodies[5] : t.dashBannerTitle },
        ].map((entry, i, arr) => (
          <Animated.View key={entry.title} entering={FadeInDown.delay(i * 80).duration(timing.normal)} style={styles.tlRow}>
            <View style={{ alignItems: 'center', width: 44 }}>
              <View style={[styles.tlDot, { backgroundColor: (TONE_COLORS[entry.tone] ?? colors.primary) + '1A' }]}>
                <Ionicons name={entry.icon as keyof typeof Ionicons.glyphMap} size={17} color={TONE_COLORS[entry.tone] ?? colors.primary} />
              </View>
              {i < arr.length - 1 ? <View style={styles.tlLine} /> : null}
            </View>
            <View style={{ flex: 1, paddingBottom: 22 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Text style={type.h3}>{entry.title}</Text>
                <Text style={type.micro}>{today.toUpperCase()}</Text>
              </View>
              <Text style={[type.small, { marginTop: 3 }]}>{entry.body}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </Card>
  );

  const documentsTab = (
    <View style={{ gap: 16 }}>
      {SCANNABLE_DOCS.map((d, i) => (
        <Animated.View key={d.key} entering={FadeInDown.delay(i * 80).duration(timing.normal)}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.fieldIcon, { width: 42, height: 42 }]}>
                <Ionicons name={d.icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={type.h3}>{t.docTitles[SCANNABLE_DOCS.indexOf(d)] ?? d.title}</Text>
                <Text style={[type.small, { marginTop: 1 }]}>{t.docHints[SCANNABLE_DOCS.indexOf(d)] ?? d.hint}</Text>
              </View>
              {session.scannedDocs.includes(d.key) ? (
                <Badge label={`${t.ocrConfidence} ${d.confidence}%`} tone="teal" icon="checkmark-circle" />
              ) : (
                <Badge label={t.dashNotScanned} tone="neutral" icon="ellipse-outline" />
              )}
            </View>
            {session.scannedDocs.includes(d.key) ? (
              <View style={{ marginTop: 12 }}>
                {[
                  { label: t.consentRows[0], value: profile.name },
                  { label: d.key === 'prescription' ? t.docMedication : t.docInvestigation, value: t.docTranscribed },
                  { label: t.docDate, value: today },
                ].map((e, j) => (
                  <View key={j} style={styles.fieldRow}>
                    <View style={[styles.fieldIcon, { backgroundColor: colors.surfaceAlt }]}>
                      <Ionicons name="document-text" size={14} color={colors.inkSoft} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={type.micro}>{e.label.toUpperCase()}</Text>
                      <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{e.value}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
          </Card>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <Screen
      scroll
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />}
      footer={
        <View style={styles.footerCol}>
          <View style={styles.footerRowWrap}>
            <AppButton
              label={editing ? t.dashSaveEdits : t.dashEditHistory}
              icon={editing ? 'save' : 'create'}
              variant="secondary"
              onPress={editing ? saveEdits : () => setEditing(true)}
              style={styles.footerBtn}
            />
            <AppButton label={t.printReport} icon="print" variant="secondary" onPress={onPrintReport} style={styles.footerBtn} />
          </View>
          <View style={styles.footerRowWrap}>
            <AppButton
              label={session.verified ? t.dashVerifiedBtn : t.dashVerify}
              icon={session.verified ? 'shield-checkmark' : 'checkmark-circle'}
              variant={session.verified ? 'success' : 'primary'}
              onPress={() => setConfirm(true)}
              disabled={session.verified}
              style={styles.footerBtn}
            />
            <AppButton
              label={t.dashSend}
              icon="arrow-forward"
              variant="teal"
              onPress={() => navigation.navigate('Success')}
              disabled={!session.verified}
              style={[styles.footerBtn, { flex: 1.4 }]}
            />
          </View>
        </View>
      }
    >
      <AppHeader
        step={10}
        totalSteps={TOTAL_STEPS}
        title={t.dashTitle}
        subtitle={fill(t.dashSub, { time: syncedAt })}
        onBack={() => navigation.goBack()}
        right={
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <Badge label={t.dashLive} tone="success" icon="radio" />
            <Clock />
          </View>
        }
      />

      <Animated.View entering={FadeInDown.duration(timing.normal)}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 200 }}>
            <Text style={type.h2}>{profile.name}</Text>
            <Text style={[type.small, { marginTop: 2 }]}>
              {fill(t.dashAgeLine, { age: profile.age, sex: genderLabel, mrn: profile.mrn })}
            </Text>
          </View>
          <View style={styles.idMeta}>
            <View>
              <Text style={type.micro}>{t.dashPhoneLabel}</Text>
              <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{profile.phone}</Text>
            </View>
            <View>
              <Text style={type.micro}>{t.dashCityLabel}</Text>
              <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{`${profile.state} · ${profile.city}`}</Text>
            </View>
            <View>
              <Text style={type.micro}>{t.dashKioskLabel}</Text>
              <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{t.metaBlock}</Text>
            </View>
            <View>
              <Text style={type.micro}>{t.dashLangLabel}</Text>
              <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{session.language?.native ?? 'हिन्दी'}</Text>
            </View>
            <View>
              <Text style={type.micro}>{t.consentRows[4].toUpperCase()}</Text>
              <Text style={[type.bodyInk, { marginTop: 1, fontSize: 15 }]}>{sessionStartStamp}</Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(90)} style={{ marginTop: 14 }}>
        {session.verified ? (
          <Card tone="success" style={styles.banner}>
            <Ionicons name="shield-checkmark" size={24} color={colors.success} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[type.h3, { color: colors.success }]}>{t.dashVerifiedTitle}</Text>
              <Text style={[type.small, { color: colors.success, marginTop: 1 }]}>{fill(t.dashVerifiedBody, { stamp: verifiedStamp })}</Text>
            </View>
          </Card>
        ) : (
          <Card tone="amber" style={styles.banner}>
            <Ionicons name="alert-circle" size={24} color={colors.amber} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[type.h3, { color: colors.amber, letterSpacing: 0.3 }]}>{t.dashBannerTitle}</Text>
              <Text style={[type.small, { color: colors.amber, marginTop: 1 }]}>{t.dashBannerBody}</Text>
            </View>
          </Card>
        )}
      </Animated.View>

      <View style={styles.tabs}>
        {tabs.map((tabDef) => {
          const active = tab === tabDef.key;
          return (
            <Pressable key={tabDef.key} onPress={() => setTab(tabDef.key)} style={[styles.tab, active && styles.tabActive]} accessibilityRole="tab" accessibilityState={{ selected: active }}>
              <Ionicons name={tabDef.icon} size={17} color={active ? colors.primary : colors.inkFaint} />
              <Text style={[styles.tabText, active && { color: colors.primary }]}>{tabDef.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 16 }}>
        {tab === 'history' ? (
          <View style={{ flexDirection: isWide ? 'row' : 'column', gap: 16, alignItems: 'flex-start' }}>
            {left}
            {right}
          </View>
        ) : tab === 'timeline' ? (
          timelineTab
        ) : (
          documentsTab
        )}
      </View>

      <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}>
        <View style={styles.modalBackdrop}>
          <Animated.View entering={FadeInDown.duration(timing.normal)} style={styles.modalCard}>
            <View style={[styles.modalIcon, { backgroundColor: colors.successSoft }]}>
              <Ionicons name="checkmark-circle" size={34} color={colors.success} />
            </View>
            <Text style={[type.h2, { marginTop: 14, textAlign: 'center' }]}>{t.dashConfirmTitle}</Text>
            <Text style={[type.body, { marginTop: 8, textAlign: 'center' }]}>{t.dashConfirmBody}</Text>
            <View style={{ height: 18 }} />
            <AppButton
              label={t.dashConfirmYes}
              icon="shield-checkmark"
              variant="success"
              onPress={() => {
                session.verifyHistory();
                setConfirm(false);
              }}
              style={{ alignSelf: 'stretch' }}
            />
            <View style={{ height: 10 }} />
            <AppButton label={t.dashCancel} variant="ghost" size="md" onPress={() => setConfirm(false)} style={{ alignSelf: 'stretch' }} />
          </Animated.View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 62, height: 62, borderRadius: radii.pill, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: colors.white, fontSize: 22, fontWeight: '800' },
  idMeta: { flexDirection: 'row', gap: 22, flexWrap: 'wrap', marginTop: 4 },
  banner: { flexDirection: 'row', alignItems: 'flex-start' },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 18, flexWrap: 'wrap' },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  tabText: { fontSize: 14.5, fontWeight: '700', color: colors.inkFaint },
  editInput: {
    minHeight: 120,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radii.md,
    padding: 14,
    fontSize: 15.5,
    lineHeight: 23,
    color: colors.ink,
    backgroundColor: colors.surfaceAlt,
    textAlignVertical: 'top',
  },
  fieldRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.border },
  fieldIcon: { width: 30, height: 30, borderRadius: radii.sm, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  bullet: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6 },
  invRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statBox: { flexGrow: 1, minWidth: 120, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, padding: 12 },
  tlRow: { flexDirection: 'row' },
  tlDot: { width: 36, height: 36, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center' },
  tlLine: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: 4 },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  footerCol: { gap: 10, maxWidth: 1240, alignSelf: 'center', width: '100%' },
  footerRowWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  footerBtn: { flex: 1, minWidth: 168 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(11,27,43,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 440, backgroundColor: colors.surface, borderRadius: radii.xl, padding: 26, alignItems: 'center', ...shadow.lg },
  modalIcon: { width: 64, height: 64, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center' },
});
