export interface LanguageOption {
  code: string;
  native: string;
  name: string;
  sample: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'hi', native: 'हिन्दी', name: 'Hindi', sample: 'नमस्ते' },
  { code: 'en', native: 'English', name: 'English', sample: 'Hello' },
  { code: 'mr', native: 'मराठी', name: 'Marathi', sample: 'नमस्कार' },
  { code: 'gu', native: 'ગુજરાતી', name: 'Gujarati', sample: 'નમસ્તે' },
  { code: 'bn', native: 'বাংলা', name: 'Bengali', sample: 'নমস্কার' },
  { code: 'ta', native: 'தமிழ்', name: 'Tamil', sample: 'வணக்கம்' },
  { code: 'te', native: 'తెలుగు', name: 'Telugu', sample: 'నమస్కారం' },
];

export interface FeatureCard {
  icon: string;
  title: string;
  body: string;
  tone: 'primary' | 'teal' | 'violet' | 'amber' | 'success';
}

export const FEATURES: FeatureCard[] = [
  {
    icon: 'mic',
    title: 'Voice Interaction',
    body: 'Patients answer in their own words. Speech is transcribed live with medical term detection.',
    tone: 'primary',
  },
  {
    icon: 'hand-left',
    title: 'Touch-Based Input',
    body: 'Large tap targets, yes/no wheels and picture choices for elderly and low-literacy users.',
    tone: 'teal',
  },
  {
    icon: 'language',
    title: 'Multilingual Support',
    body: '12 Indian languages including Hindi, Marathi, Gujarati, Bengali, Tamil and Telugu.',
    tone: 'violet',
  },
  {
    icon: 'document-text',
    title: 'Medical Document Intelligence',
    body: 'On-device OCR reads prescriptions, lab reports and discharge summaries into structured data.',
    tone: 'amber',
  },
  {
    icon: 'shield-checkmark',
    title: 'Secure & Private',
    body: 'Kiosk data is encrypted at rest, auto-purged after the visit and never leaves the hospital network.',
    tone: 'success',
  },
];

export interface FollowUpQuestion {
  id: string;
  index: number;
  hindi: string;
  english: string;
  fieldLabel: string;
  options: { label: string; value: string }[];
}

/** Interview = 12 questions. Q1-Q3 were captured in the live conversation,
 *  Q4-Q7 are asked interactively here, Q8-Q12 are auto-filled from the transcript. */
export const TOTAL_QUESTIONS = 12;
export const FIRST_SHOWN_QUESTION = 4;

export const FOLLOW_UP_QUESTIONS: FollowUpQuestion[] = [
  {
    id: 'onset',
    index: 4,
    hindi: 'दर्द कब शुरू हुआ था?',
    english: 'When did the pain start?',
    fieldLabel: 'Onset',
    options: [
      { label: 'आज सुबह ही', value: 'Today, this morning' },
      { label: '2 दिन पहले', value: '2 days ago - sudden' },
      { label: 'एक हफ्ते से', value: 'Gradual, over 1 week' },
      { label: 'इससे पहले भी हुआ था', value: 'Recurrent, earlier episodes' },
    ],
  },
  {
    id: 'location',
    index: 5,
    hindi: 'दर्द शरीर में कहाँ महसूस हो रहा है?',
    english: 'Where is the pain located?',
    fieldLabel: 'Location',
    options: [
      { label: 'छाती के बीच में', value: 'Retrosternal (centre of chest)' },
      { label: 'बाईं छाती में', value: 'Left pectoral region' },
      { label: 'दाईं छाती में', value: 'Right pectoral region' },
      { label: 'पेट के ऊपर', value: 'Epigastric (upper abdomen)' },
    ],
  },
  {
    id: 'radiation',
    index: 6,
    hindi: 'क्या दर्द कहीं और फैलता है?',
    english: 'Does the pain spread anywhere?',
    fieldLabel: 'Radiation',
    options: [
      { label: 'बाएं हाथ में', value: 'Left arm' },
      { label: 'गर्दन और जबड़े में', value: 'Neck & jaw' },
      { label: 'पीठ में', value: 'Interscapular back' },
      { label: 'नहीं, वहीं रहता है', value: 'No radiation - localised' },
    ],
  },
  {
    id: 'modifier',
    index: 7,
    hindi: 'क्या कोई बात दर्द को बढ़ाती या कम करती है?',
    english: 'Does anything make it better or worse?',
    fieldLabel: 'Aggravating / Relieving',
    options: [
      { label: 'चलने-फिरने से बढ़ता है', value: 'Worsens on exertion' },
      { label: 'आराम से कम होता है', value: 'Eases with rest' },
      { label: 'साँस लेने पर बढ़ता है', value: 'Worsens on deep inspiration' },
      { label: 'खाने के बाद बढ़ता है', value: 'Worsens after meals' },
    ],
  },
];

export interface ScannableDoc {
  key: string;
  title: string;
  icon: string;
  hint: string;
  confidence: number;
}

export const SCANNABLE_DOCS: ScannableDoc[] = [
  {
    key: 'prescription',
    title: 'Prescription',
    icon: 'medkit',
    hint: 'Clinic OPD prescription slip',
    confidence: 96,
  },
  {
    key: 'lab',
    title: 'Lab Report',
    icon: 'flask',
    hint: 'Blood test report from a laboratory',
    confidence: 96,
  },
  {
    key: 'discharge',
    title: 'Discharge Summary',
    icon: 'albums',
    hint: 'From a previous hospital visit',
    confidence: 93,
  },
  {
    key: 'investigation',
    title: 'Investigation Report',
    icon: 'pulse',
    hint: 'Printed investigation report',
    confidence: 95,
  },
];

export const PROCESSING_STEPS: { id: string; label: string; detail: string; icon: string }[] = [
  { id: 'asr', label: 'Speech transcription', detail: 'Hindi speech converted to clinical text (98% confidence)', icon: 'mic' },
  { id: 'ner', label: 'Medical term detection', detail: 'Symptoms and clinical concepts recognised in the transcript', icon: 'sparkles' },
  { id: 'ex', label: 'Information extraction', detail: 'Duration, location, modifiers and associations pulled out', icon: 'git-branch' },
  { id: 'norm', label: 'Normalization', detail: 'Values mapped to standard clinical terms and units', icon: 'swap-horizontal' },
  { id: 'struct', label: 'Clinical structuring', detail: '4 OCR documents merged into a SOAP-formatted draft', icon: 'reader' },
];

export const DOSHA_BALANCE = [
  { label: 'Vata', value: 32, color: '#5B4BE0' },
  { label: 'Pitta', value: 48, color: '#0FA3A3' },
  { label: 'Kapha', value: 20, color: '#0E63E4' },
];

export const AYUSH_FIELDS: { key: string; label: string; sanskrit: string; value: string; note: string; icon: string }[] = [
  {
    key: 'prakriti',
    label: 'Prakriti (Constitution)',
    sanskrit: 'प्रकृति',
    value: 'Vata-Pitta (आग्नेय)',
    note: 'Inherited constitution assessed from birth history, body frame and temperament.',
    icon: 'body',
  },
  {
    key: 'vikriti',
    label: 'Vikriti (Current Imbalance)',
    sanskrit: 'विकृति',
    value: 'Pitta aggravation',
    note: 'Sharp appetite, heat intolerance, irritability and acid reflux reported today.',
    icon: 'sync',
  },
  {
    key: 'agni',
    label: 'Agni (Digestive Fire)',
    sanskrit: 'अग्नि',
    value: 'Tikshna (तीक्ष्ण) - sharp',
    note: 'Hungry within 2-3 hours of meals; occasional burning epigastric discomfort.',
    icon: 'flame',
  },
  {
    key: 'koshtha',
    label: 'Koshtha (Bowel Habit)',
    sanskrit: 'कोष्ठ',
    value: 'Mridu (मृदु) - soft',
    note: 'Bowels once daily, soft, well-formed. No urgency or alternating pattern.',
    icon: 'water',
  },
  {
    key: 'ahara',
    label: 'Ahara (Diet)',
    sanskrit: 'आहार',
    value: 'Madhura-Amla-Lavana dominant',
    note: 'Late dinner (~10 PM), high salt and oil, irregular breakfast on work days.',
    icon: 'restaurant',
  },
  {
    key: 'vihara',
    label: 'Vihara (Lifestyle)',
    sanskrit: 'विहार',
    value: 'Sedentary, sleep-deprived',
    note: '8-10 hours seated, ~5 hours sleep, high screen time, no regular exercise.',
    icon: 'walk',
  },
];

export const DASHAVIDHA: { part: string; sanskrit: string; finding: string }[] = [
  { part: 'Prakriti', sanskrit: 'प्रकृति', finding: 'Vata-Pitta' },
  { part: 'Vikriti', sanskrit: 'विकृति', finding: 'Pitta dominant' },
  { part: 'Sara (Tissue quality)', sanskrit: 'सार', finding: 'Madhyama - moderate' },
  { part: 'Samhanana (Build)', sanskrit: 'संहनन', finding: 'Madhyama, BMI 26.4' },
  { part: 'Pramana (Measurements)', sanskrit: 'प्रमाण', finding: 'Madhyama - 5 ft 8 in, 74 kg' },
  { part: 'Ahara Shakti (Digestion)', sanskrit: 'आहार शक्ति', finding: 'Tikshna - strong' },
  { part: 'Vyayama Shakti (Exercise)', sanskrit: 'व्यायाम शक्ति', finding: 'Durbala - reduced' },
  { part: 'Satmya (Adaptation)', sanskrit: 'सात्म्य', finding: 'Sadharana - ordinary' },
  { part: 'Satva (Mind)', sanskrit: 'सत्त्व', finding: 'Madhyama - moderate' },
  { part: 'Ahara-Vihara (Routine)', sanskrit: 'आहार-विहार', finding: 'Dushta - irregular' },
];

export const SUCCESS_FLOW: { title: string; sub: string; icon: string; tone: string }[] = [
  { title: 'Patient', sub: 'This kiosk session', icon: 'person', tone: 'primary' },
  { title: 'Voice + Touch + Documents', sub: '12 questions answered - 4 documents scanned', icon: 'mic', tone: 'teal' },
  { title: 'AI Clinical Intake', sub: 'Transcription, extraction and red-flag screening', icon: 'sparkles', tone: 'violet' },
  { title: 'Structured History', sub: 'SOAP draft with timeline and document links', icon: 'reader', tone: 'amber' },
  { title: 'Doctor Verification', sub: 'Reviewed and signed by Dr. A. Mehta, Medicine', icon: 'shield-checkmark', tone: 'success' },
  { title: 'Consultation', sub: 'Clinician sees the patient - not the paperwork', icon: 'medkit', tone: 'primary' },
];
