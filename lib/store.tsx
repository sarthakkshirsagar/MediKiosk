import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LanguageOption } from './data';

export type FieldSource = 'voice' | 'touch' | 'document' | 'derived';

export interface PatientProfile {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  state: string;
  city: string;
  complaint: string;
  mrn: string;
}

export interface StructuredField {
  label: string;
  value: string;
  source: FieldSource;
}

export interface SessionState {
  language: LanguageOption | null;
  /** Global, persistent selection for the whole patient journey (alias of `language`). */
  selectedLanguage: LanguageOption | null;
  setLanguage: (l: LanguageOption) => void;
  /** Patient-entered profile for the current kiosk session. */
  profile: PatientProfile | null;
  setProfile: (p: Omit<PatientProfile, 'mrn'>) => void;
  clearProfile: () => void;
  /** Real-time ISO timestamps recorded from the device clock. */
  sessionStart: string | null;
  historyGenerated: string | null;
  verifyHistory: () => void;
  /** Set when the patient history report is exported (printed or downloaded as PDF). */
  reportStatus: 'downloaded' | 'printed' | null;
  setReportStatus: (s: 'downloaded' | 'printed' | null) => void;
  consentGiven: boolean;
  setConsent: (v: boolean) => void;
  consentMode: 'read' | 'audio';
  setConsentMode: (m: 'read' | 'audio') => void;
  fields: Record<string, StructuredField>;
  setField: (id: string, field: StructuredField) => void;
  extraNotes: string[];
  addNote: (note: string) => void;
  scannedDocs: string[];
  markScanned: (key: string) => void;
  hpi: string;
  setHpi: (v: string) => void;
  meds: string[];
  setMeds: (v: string[]) => void;
  allergies: string[];
  setAllergies: (v: string[]) => void;
  verified: boolean;
  setVerified: (v: boolean) => void;
  ayushIncluded: boolean;
  setAyushIncluded: (v: boolean) => void;
  reset: () => void;
}

const seedFields: Record<string, StructuredField> = {
  complaint: { label: 'Chief Complaint', value: '—', source: 'touch' },
  duration: { label: 'Duration', value: '—', source: 'derived' },
  inputMethod: { label: 'Input Method', value: '—', source: 'touch' },
};

const Ctx = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageOption | null>(null);
  const [profile, setProfileState] = useState<PatientProfile | null>(null);
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [historyGenerated, setHistoryGenerated] = useState<string | null>(null);
  const [reportStatus, setReportStatus] = useState<'downloaded' | 'printed' | null>(null);
  const [consentGiven, setConsent] = useState(false);
  const [consentMode, setConsentMode] = useState<'read' | 'audio'>('read');
  const [fields, setFields] = useState<Record<string, StructuredField>>(seedFields);
  const [extraNotes, setExtraNotes] = useState<string[]>([]);
  const [scannedDocs, setScannedDocs] = useState<string[]>([]);
  const [hpi, setHpi] = useState('');
  const [meds, setMeds] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [ayushIncluded, setAyushIncluded] = useState(false);

  const setField = useCallback((id: string, field: StructuredField) => {
    setFields((prev) => ({ ...prev, [id]: field }));
  }, []);

  /** Seed the clinical draft from what the patient themselves entered at the kiosk. */
  const setProfile = useCallback((p: Omit<PatientProfile, 'mrn'>) => {
    const mrn = `OPD-2026-${Math.floor(10000 + Math.random() * 89999)}`;
    const full: PatientProfile = { ...p, mrn };
    setProfileState(full);
    setSessionStart(new Date().toISOString());
    setHpi(
      `${full.name}, ${full.age}-year-old ${full.gender}, attended the kiosk with the chief complaint: "${full.complaint}". ` +
        'History was collected through voice and touch input at the kiosk; supporting answers are recorded in the structured fields below. ' +
        `Contact: ${full.phone} · ${full.state} · ${full.city}. No medication, allergy or past-history details were reported at the kiosk.`,
    );
    setMeds([]);
    setAllergies([]);
    setVerified(false);
    setFields({
      complaint: { label: 'Chief Complaint', value: full.complaint, source: 'touch' },
      duration: { label: 'Duration', value: '—', source: 'derived' },
      inputMethod: { label: 'Input Method', value: 'Touch', source: 'touch' },
    });
    setScannedDocs([]);
  }, []);

  const clearProfile = useCallback(() => setProfileState(null), []);

  const verifyHistory = useCallback(() => {
    setVerified(true);
    setHistoryGenerated(new Date().toISOString());
  }, []);

  const addNote = useCallback((note: string) => {
    setExtraNotes((prev) => (prev.includes(note) ? prev : [...prev, note]));
  }, []);

  const markScanned = useCallback((key: string) => {
    setScannedDocs((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, []);

  const reset = useCallback(() => {
    setLanguage(null);
    setProfileState(null);
    setSessionStart(null);
    setHistoryGenerated(null);
    setReportStatus(null);
    setConsent(false);
    setConsentMode('read');
    setFields(seedFields);
    setExtraNotes([]);
    setScannedDocs([]);
    setHpi('');
    setMeds([]);
    setAllergies([]);
    setVerified(false);
    setAyushIncluded(false);
  }, []);

  const value = useMemo<SessionState>(
    () => ({
      language,
      selectedLanguage: language,
      setLanguage,
      profile,
      setProfile,
      clearProfile,
      sessionStart,
      historyGenerated,
      verifyHistory,
      reportStatus,
      setReportStatus,
      consentGiven,
      setConsent,
      consentMode,
      setConsentMode,
      fields,
      setField,
      extraNotes,
      addNote,
      scannedDocs,
      markScanned,
      hpi,
      setHpi,
      meds,
      setMeds,
      allergies,
      setAllergies,
      verified,
      setVerified,
      ayushIncluded,
      setAyushIncluded,
      reset,
    }),
    [language, consentGiven, consentMode, fields, extraNotes, scannedDocs, hpi, meds, allergies, verified, ayushIncluded, profile, setProfile, clearProfile, sessionStart, historyGenerated, verifyHistory, reportStatus, setField, addNote, markScanned, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): SessionState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
