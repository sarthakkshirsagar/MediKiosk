import { useSession } from './store';

/** Every patient-facing string in the MediKiosk journey, per language. */
export interface RowLabels {
  complaint: string;
  duration: string;
  location: string;
  radiation: string;
  aggravating: string;
  relieving: string;
}

export interface Strings {
  back: string;
  continueBtn: string;

  /* Consent */
  consentHeader: string;
  consentTitle: string;
  consentIntro: string;
  whyTitle: string;
  whyBody: string;
  privacyTitle: string;
  privacyBody: string;
  importantTitle: string;
  importantBody: string;
  listenExplanation: string;
  playingExplanation: string;
  audioSuffix: string;
  consentCheckbox: string;
  consentBtn: string;

  /* Conversation */
  convHeader: string;
  convSub: string;
  greeting: string;
  patientReply: string;
  aiThanks: string;
  speakNow: string;
  processingSpeech: string;
  tapToSpeak: string;
  capturedAgain: string;
  lblSpeak: string;
  lblType: string;
  lblTouch: string;
  readyLabel: string;
  listeningLabel: string;
  processingLabel: string;
  capturedLabel: string;
  continueInterview: string;
  capturedViaVoice: string;
  chips: string[];

  /* Adaptive questioning */
  adaptiveHeader: string;
  adaptiveSub: string;
  questions: string[];
  qOptions: string[][];
  skipQuestion: string;
  clinicalInfo: string;
  clinicalInfoSub: string;
  rows: RowLabels;
  pending: string;
  questionsAnswered: string;
  continueDocs: string;
  branchNotice: string;

  /* Document scanning */
  scanHeader: string;
  scanTitle: string;
  scanIntro: string;
  docTitles: string[];
  scanAll: string;
  scanLabel: string;
  ocrPipeline: string;
  stages: string[];
  extractedInfo: string;
  extractionComplete: string;
  ocrConfidence: string;
  draftNote: string;
  scanNotice: string;

  /* Processing */
  procHeader: string;
  sourceVoice: string;
  sourceTouch: string;
  sourceDocs: string;
  structuredHistory: string;
  stageLabels: string[];
  disclaimer: string;
  viewStructured: string;
  procReady: string;
  procWorking: string;

  /* Red flag */
  flagHeader: string;
  alertTitle: string;
  alertBody: string;
  alertPriority: string;
  urgent: string;
  noReplace: string;
  noDiagnosis: string;
  whatTriggered: string;
  ackText: string;
  continueDashboard: string;

  /* Welcome */
  welcomeHeadline: string;
  welcomeBody: string;
  startHistory: string;
  viewDashboard: string;
  liveMode: string;
  sihBadge: string;
  featuresTitle: string;
  featuresSub: string;
  featureTitles: string[];
  featureBodies: string[];
  howTitle: string;
  howSub: string;
  howStages: string[];
  metaBlock: string;
  metaOffline: string;
  metaPurge: string;
  designedFor: string;
  designedForValue: string;

  /* Consent extras */
  consentRecordTitle: string;
  consentRecordSub: string;
  consentRows: string[];

  /* Conversation extras */
  assistantName: string;
  intakeMode: string;
  chipsHeader: string;
  tapped: string;
  typePlaceholder: string;
  confidenceLabel: string;
  inputMethodKv: string;
  inputMethodInUse: string;
  recordToContinue: string;
  draftOnlyNotice: string;
  micStart: string;
  micStop: string;

  /* Adaptive extras */
  questionOf: string;
  doneTitle: string;
  doneBody: string;
  badgeQuestions: string;
  badgeDocuments: string;
  badgeRedFlag: string;
  prevQuestion: string;
  panelNotice: string;

  /* Scan extras */
  scanSub: string;
  scanHint: string;
  scanAgain: string;
  docsRead: string;
  docsInProgress: string;

  /* Processing extras */
  procSub: string;
  draftReadyTime: string;
  workingTitle: string;
  badgeComplete: string;
  badgeRunning: string;
  waitingEngine: string;
  outputReady: string;

  /* Red flag extras */
  whatsNext: string;
  nextTitles: string[];
  nextBodies: string[];
  showProtocol: string;
  demoNoCall: string;
  protocolTitle: string;
  protocolBody: string;
  closeLabel: string;
  emergencyNote: string;

  /* Success */
  successTitle: string;
  successBody: string;
  flowTitles: string[];
  flowSubs: string[];
  impactTitle: string;
  impactLabels: string[];
  tagline: string;
  startNewDemo: string;
  backToDashboard: string;
  verifiedBadge: string;
  unverifiedBadge: string;
  endToEndJourney: string;
  journeyNotice: string;
  fieldCharacter: string;
  fieldAssociated: string;
  fieldStatus: string;
  fieldOnset: string;
  tapAnswer: string;
  docHints: string[];
  processedBadge: string;
  consentModeAudio: string;
  consentModeWritten: string;
  taglineSub: string;

  /* Patient dashboard */
  dashTitle: string;
  dashSub: string;
  dashLive: string;
  dashAttendant: string;
  dashKioskLabel: string;
  dashLangLabel: string;
  dashAttendantValue: string;
  dashMale: string;
  dashAgeLine: string;
  dashBannerTitle: string;
  dashBannerBody: string;
  dashVerifiedTitle: string;
  dashVerifiedBody: string;
  dashTabHistory: string;
  dashTabTimeline: string;
  dashTabDocuments: string;
  dashHpi: string;
  dashPmh: string;
  dashMeds: string;
  dashAllergies: string;
  dashInvestigations: string;
  dashStructuredFields: string;
  dashAuditNote: string;
  dashEdit: string;
  dashMedsNote: string;
  dashStatLabels: string[];
  dashAyushBtn: string;
  dashAyushAttached: string;
  dashNotScanned: string;
  dashIntakeSummary: string;
  flagLow: string;
  flagHigh: string;
  flagNormal: string;
  dashEditHistory: string;
  dashSaveEdits: string;
  dashVerify: string;
  dashVerifiedBtn: string;
  dashSend: string;
  dashConfirmTitle: string;
  dashConfirmBody: string;
  dashConfirmYes: string;
  dashCancel: string;
  timelineTitle: string;
  timelineSub: string;
  timelineTitles: string[];
  timelineBodies: string[];

  /* AYUSH mode */
  ayushModeTitle: string;
  ayushModeSub: string;
  ayushDosha: string;
  ayushDoshaSub: string;
  ayushInterpLabel: string;
  ayushInterpBody: string;
  ayushDasha: string;
  ayushDashaSub: string;
  ayushTablePart: string;
  ayushTableFinding: string;
  ayushInclude: string;
  ayushIncluded: string;
  ayushBack: string;

  extractTitle: string;
  extractSub: string;
  scannedBadge: string;
  readingBadge: string;
  engineSub: string;
  crashTeam: string;
  declineNote: string;
  send: string;
  sttCaptured: string;
  sttDenied: string;
  sttUnsupported: string;
  sttNoSpeech: string;
  patientResponse: string;
  printReport: string;
  downloadPdf: string;
  pdfDownloaded: string;
  generatingReport: string;
  reportTitle: string;
  generatedOn: string;
  reportDocs: string;
  aiSummaryTitle: string;
  aiSummarySub: string;
  physicianReview: string;
  extractedFromDocs: string;
  pdfPrinted: string;

  /* Patient information entry */
  piTitle: string;
  piSub: string;
  piName: string;
  piNameHint: string;
  piAge: string;
  piGender: string;
  piMale: string;
  piFemale: string;
  piOther: string;
  piPhone: string;
  piCity: string;
  piState: string;
  piStatePlaceholder: string;
  piSelectStateFirst: string;
  piStateErr: string;
  piCityErr: string;
  piCityPlaceholder: string;
  searchPlaceholder: string;
  piComplaint: string;
  piComplaintHint: string;
  piNameErr: string;
  piAgeErr: string;
  piPhoneErr: string;
  piPhonePlaceholder: string;
  piComplaintErr: string;
  piFormNote: string;
  emptyNone: string;
  dashPhoneLabel: string;
  dashCityLabel: string;
  docDate: string;
  docMedication: string;
  docInvestigation: string;
  docTranscribed: string;
  riskFlagDetail: string;
  categoryLabels: { headache: string; chest: string; abdomen: string; cough: string; fever: string; general: string };
  interview: { headache: string[]; chest: string[]; abdomen: string[]; cough: string[]; fever: string[]; general: string[] };
  voiceAnswer: string;
  quickYes: string;
  quickNo: string;
  quickUnknown: string;
  riskFlagTitle: string;
  flagTemplates: {
    headache: { title: string; detail: string };
    chest: { title: string; detail: string };
    abdomen: { title: string; detail: string };
    cough: { title: string; detail: string };
    fever: { title: string; detail: string };
    general: { title: string; detail: string };
  };
}

const EN: Strings = {
  back: '← Back',
  continueBtn: 'Continue →',

  consentHeader: 'Patient Consent',
  consentTitle: 'Before We Begin',
  consentIntro:
    'MediKiosk will ask questions about your health and collect information to prepare a clinical history for your physician.',
  whyTitle: 'Why are we collecting this information?',
  whyBody: 'To help prepare your clinical history before consultation.',
  privacyTitle: 'Privacy',
  privacyBody: 'Your information is intended for this demonstration workflow and should be handled securely.',
  importantTitle: 'Important',
  importantBody: 'MediKiosk does not diagnose conditions or prescribe treatment.',
  listenExplanation: 'Listen to Explanation',
  playingExplanation: 'Playing explanation...',
  audioSuffix: 'second summary, read aloud for patients who prefer listening',
  consentCheckbox: 'I understand that my information will be used to prepare my clinical history.',
  consentBtn: 'I Understand & Consent →',

  convHeader: 'AI Patient Conversation',
  convSub: 'Speak, type or touch - answer in your own words',
  greeting: 'Hello {name}. What problem brought you to the hospital today?',
  patientReply: 'I need help with a health problem.',
  aiThanks: 'Thank you. I have noted your answer. Now I will ask a few simple questions - it will take 2-3 minutes.',
  speakNow: 'Please speak now...',
  processingSpeech: 'Converting speech to text...',
  tapToSpeak: 'Tap the microphone and answer in your own words.',
  capturedAgain: 'Response captured. Tap to speak again.',
  lblSpeak: 'Speak',
  lblType: 'Type',
  lblTouch: 'Touch',
  readyLabel: 'READY',
  listeningLabel: 'LISTENING',
  processingLabel: 'PROCESSING',
  capturedLabel: 'CAPTURED',
  continueInterview: 'Continue Interview →',
  capturedViaVoice: 'Captured via voice',
  chips: ['Sweating', 'Restlessness', 'Dizziness', 'Nausea', 'Weakness', 'No other problem'],

  adaptiveHeader: 'Adaptive Questioning',
  adaptiveSub: 'Follow-up questions based on your complaint',
  questions: [
    'When did the pain start?',
    'Where is the pain located?',
    'Does the pain spread anywhere?',
    'Does anything make it better or worse?',
  ],
  qOptions: [
    ['This morning', '2 days ago', 'For one week', 'It happened before too'],
    ['In the middle of the chest', 'In the left chest', 'In the right chest', 'Upper abdomen'],
    ['Yes, to the left arm', 'Yes, to the neck and jaw', 'Yes, to the back', 'No, it stays in one place'],
    ['Walking makes it worse', 'Rest makes it better', 'Deep breathing makes it worse', 'It is worse after meals'],
  ],
  skipQuestion: 'Skip this question',
  clinicalInfo: 'Clinical Information',
  clinicalInfoSub: 'Live structured information - updates with each answer',
  rows: {
    complaint: 'Chief Complaint',
    duration: 'Duration',
    location: 'Location',
    radiation: 'Radiation',
    aggravating: 'Aggravating Factors',
    relieving: 'Relieving Factors',
  },
  pending: 'Pending',
  questionsAnswered: 'QUESTIONS ANSWERED',
  continueDocs: 'Continue to Documents',
  branchNotice:
    'Branching logic: your answer about "{complaint}" automatically selected the relevant question set.',

  scanHeader: 'Medical Document Scanning',
  scanTitle: 'Scan Your Medical Documents',
  scanIntro: 'Add previous medical documents so MediKiosk can extract relevant information for the physician.',
  docTitles: ['Prescription', 'Lab Report', 'Discharge Summary', 'Investigation Report'],
  scanAll: 'Scan All Documents',
  scanLabel: 'Scan',
  ocrPipeline: 'OCR PIPELINE',
  stages: ['DOCUMENT UPLOADED', 'SCANNING', 'TEXT DETECTION', 'MEDICAL ENTITY EXTRACTION', 'STRUCTURED DATA'],
  extractedInfo: 'EXTRACTED INFORMATION',
  extractionComplete: 'EXTRACTION COMPLETE',
  ocrConfidence: 'OCR CONFIDENCE',
  draftNote: 'Extracted information is a draft and requires physician verification.',
  scanNotice:
    'Extracted information is a draft and requires physician verification. MediKiosk does not interpret results or adjust doses.',

  procHeader: 'AI Processing',
  sourceVoice: 'VOICE',
  sourceTouch: 'TOUCH',
  sourceDocs: 'MEDICAL DOCUMENTS',
  structuredHistory: 'STRUCTURED PATIENT HISTORY',
  stageLabels: [
    'Speech transcription',
    'Medical term detection',
    'Information extraction',
    'Normalization',
    'Clinical structuring',
  ],
  disclaimer: 'Prepared for physician review and consultation.',
  viewStructured: 'View Structured History →',
  procReady: 'The structured history is ready for physician verification.',
  procWorking: 'Voice, touch and document signals are being reconciled...',

  flagHeader: 'Red Flag Safety Alert',
  alertTitle: 'Potential Urgent Symptoms Detected',
  alertBody: 'Some information provided during intake may require timely clinical evaluation.',
  alertPriority: 'Please prioritize clinical evaluation.',
  urgent: 'PRIORITY: URGENT',
  noReplace: 'CLINICAL INTAKE DOES NOT REPLACE PHYSICIAN ASSESSMENT',
  noDiagnosis:
    'MediKiosk does not diagnose medical conditions. This is a rule-based safety screen - it does not name a condition or recommend any medicine.',
  whatTriggered: 'WHAT TRIGGERED THE SCREEN',
  ackText: 'I have shown this alert to the patient and the attendant',
  continueDashboard: 'Continue to Physician Dashboard →',

  welcomeHeadline: 'Patient history,\ntaken before you\nenter the room.',
  welcomeBody:
    'MediKiosk speaks with the patient in their own language, reads their paperwork and drafts a structured clinical history - so the physician starts the consultation with the patient, not with the clipboard.',
  startHistory: 'Start Patient History →',
  viewDashboard: 'View Physician Dashboard Preview',
  liveMode: 'LIVE DEMONSTRATION MODE',
  sihBadge: 'SMART INDIA HACKATHON 2026 - PROTOTYPE',
  featuresTitle: 'Built for the outpatient floor',
  featuresSub: 'Five capabilities, one 90-second kiosk interaction',
  featureTitles: ['Voice Interaction', 'Touch-Based Input', 'Multilingual Support', 'Medical Document Intelligence', 'Secure & Private'],
  featureBodies: [
    'Patients answer in their own words. Speech is transcribed live with medical term detection.',
    'Large tap targets, yes/no wheels and picture choices for elderly and low-literacy users.',
    '12 Indian languages including Hindi, Marathi, Gujarati, Bengali, Tamil and Telugu.',
    'On-device OCR reads prescriptions, lab reports and discharge summaries into structured data.',
    'Kiosk data is encrypted at rest, auto-purged after the visit and never leaves the hospital network.',
  ],
  howTitle: 'How it works',
  howSub: 'Patient → voice, touch and documents → AI intake → structured history → physician verification → consultation',
  howStages: ['PATIENT', 'VOICE + TOUCH + DOCUMENTS', 'MEDIKIOSK AI ENGINE', 'STRUCTURED CLINICAL HISTORY', 'PHYSICIAN VERIFICATION', 'CONSULTATION'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'On-premise, offline capable',
  metaPurge: 'Auto-purge after visit',
  designedFor: 'DESIGNED FOR',
  designedForValue: 'Government Medical Colleges • AYUSH OPDs • District Hospitals • High-Volume OPDs',

  consentRecordTitle: 'CONSENT RECORD',
  consentRecordSub: 'Will be attached to the visit',
  consentRows: ['Patient', 'Consent mode', 'Language', 'Kiosk', 'Timestamp'],

  assistantName: 'MediKiosk Assistant',
  intakeMode: 'Clinical intake mode',
  chipsHeader: 'TAP WHAT APPLIES TO YOU',
  tapped: 'Tapped',
  typePlaceholder: 'Type the problem here',
  confidenceLabel: 'EXTRACTION CONFIDENCE',
  inputMethodKv: 'INPUT METHOD',
  inputMethodInUse: 'INPUT METHOD IN USE',
  recordToContinue: 'Record one response to continue',
  draftOnlyNotice: 'Draft only. The doctor will review and confirm every field before it becomes part of the case sheet.',
  micStart: 'Start speaking',
  micStop: 'Stop recording',

  questionOf: 'QUESTION {n} OF {m}',
  doneTitle: 'Interview complete',
  doneBody:
    'All {m} questions answered. The remaining questions were resolved automatically from the voice transcript - you never have to repeat yourself.',
  badgeQuestions: '{n} QUESTIONS',
  badgeDocuments: '{n} DOCUMENTS',
  badgeRedFlag: '{n} RED FLAG',
  prevQuestion: 'Previous question',
  panelNotice: 'This panel is an AI-generated draft. Nothing here is a diagnosis and nothing is shown to the patient as a result.',

  scanSub: 'OCR extracts medicines, investigations and dates',
  scanHint: 'Place the document on the scanner bed or use the camera.',
  scanAgain: 'Scan again',
  docsRead: '{done} of {total} documents read',
  docsInProgress: '{n} in progress',

  procSub: 'Merging voice, touch and documents into one history',
  draftReadyTime: 'Draft prepared in 4.8 seconds',
  workingTitle: 'Crunching the intake...',
  badgeComplete: 'COMPLETE',
  badgeRunning: 'RUNNING',
  waitingEngine: 'Waiting for the engine...',
  outputReady: 'Draft ready - 12 fields, 4 documents, 3 safety flags',

  whatsNext: 'What happens next',
  nextTitles: ['Physician sees the alert', 'Vital signs taken early', 'Patient is not alarmed'],
  nextBodies: [
    'The draft history opens with the safety banner on top of the screen.',
    'Nurse is prompted to record BP, SpO2 and ECG before the doctor calls the patient in.',
    'The kiosk tells the patient only that the doctor will see them sooner.',
  ],
  showProtocol: 'Show Emergency Protocol',
  demoNoCall: 'DEMO BUILD - PLACES NO REAL CALL',
  protocolTitle: 'Emergency Protocol',
  protocolBody:
    'In a live deployment this would open the hospital emergency extension and page the on-call registrar. This is a prototype, so no call is placed.',
  closeLabel: 'Close',
  emergencyNote: 'National emergency number: 108 · Hospital extension: 2211',

  successTitle: 'Patient History Successfully Prepared',
  successBody:
    'The kiosk interaction is complete. The structured history of this visit is now ready for the physician to verify and consult.',
  flowTitles: ['Patient', 'Voice + Touch + Documents', 'AI Clinical Intake', 'Structured History', 'Doctor Verification', 'Consultation'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '12 questions answered · 4 documents scanned',
    'Transcription, extraction and red-flag screening',
    'SOAP draft with timeline and document links',
    'Reviewed and signed by Dr. A. Mehta, Medicine',
    'Clinician sees the patient - not the paperwork',
  ],
  impactTitle: 'IMPACT AT THIS KIOSK',
  impactLabels: ['Total intake time', 'Clinician documentation time', 'Average OCR confidence', 'Patient ease-of-use'],
  tagline: 'Less Time Documenting.\nMore Time Caring.',
  startNewDemo: 'Start New Demonstration',
  backToDashboard: 'Back to Physician Dashboard',
  verifiedBadge: 'PHYSICIAN VERIFIED',
  unverifiedBadge: 'DRAFT UNVERIFIED',
  endToEndJourney: 'END-TO-END JOURNEY',
  journeyNotice: 'Sample data only. MediKiosk drafts the history; a qualified physician always makes the clinical decision.',
  fieldCharacter: 'Character',
  fieldAssociated: 'Associated symptoms',
  fieldStatus: 'Status',
  fieldOnset: 'Onset',
  tapAnswer: 'TAP THE ANSWER THAT FITS BEST',
  docHints: ['Clinic OPD prescription slip', 'Blood test report from a laboratory', 'From a previous hospital visit', 'Printed investigation report'],
  processedBadge: 'PROCESSED ON-DEVICE · {n} FILES',
  consentModeAudio: 'Audio + written',
  consentModeWritten: 'Written',
  taglineSub: 'AI-POWERED CLINICAL INTAKE PLATFORM',

  dashTitle: 'Physician Dashboard',
  dashSub: 'Medicine OPD · Dr. A. Mehta · synced {time}',
  dashLive: 'LIVE',
  dashAttendant: 'ATTENDANT',
  dashKioskLabel: 'KIOSK',
  dashLangLabel: 'LANGUAGE',
  dashAttendantValue: '—',
  dashMale: 'Male',
  dashAgeLine: '{age} yrs · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI-GENERATED DRAFT - PHYSICIAN VERIFICATION REQUIRED',
  dashBannerBody: 'Nothing below has been clinically confirmed. Review each field before it enters the case sheet.',
  dashVerifiedTitle: 'Verified by Dr. A. Mehta',
  dashVerifiedBody: 'Medicine OPD · {stamp} · audit ID AUD-77120',
  dashTabHistory: 'Clinical History',
  dashTabTimeline: 'Medical Timeline',
  dashTabDocuments: 'Documents',
  dashHpi: 'History of Present Illness',
  dashPmh: 'Past Medical History',
  dashMeds: 'Current Medications',
  dashAllergies: 'Allergies',
  dashInvestigations: 'Previous Investigations',
  dashStructuredFields: 'STRUCTURED FIELDS CAPTURED AT THE KIOSK',
  dashAuditNote: 'EDITS ARE AUDIT-LOGGED WITH YOUR PHYSICIAN ID',
  dashEdit: 'Edit',
  dashMedsNote: 'As reported by the patient - doses not verified by MediKiosk.',
  dashStatLabels: ['Questions', 'Documents', 'Voice time', 'Safety flags'],
  dashAyushBtn: 'Open AYUSH Clinical Mode',
  dashAyushAttached: 'AYUSH ASSESSMENT ATTACHED',
  dashNotScanned: 'NOT SCANNED',
  dashIntakeSummary: 'Intake summary',
  flagLow: 'Low',
  flagHigh: 'High',
  flagNormal: 'Normal',
  dashEditHistory: 'Edit History',
  dashSaveEdits: 'Save Edits',
  dashVerify: 'Verify & Confirm',
  dashVerifiedBtn: 'Verified',
  dashSend: 'Send to Consultation',
  dashConfirmTitle: 'Confirm this history?',
  dashConfirmBody: 'Confirming signs the draft with your physician ID and releases it to the consultation queue. Your edits are stored in the audit log.',
  dashConfirmYes: 'Yes, verify the history',
  dashCancel: 'Cancel',
  timelineTitle: 'Medical Timeline',
  timelineSub: 'Consolidated across kiosk intake and hospital records',
  timelineTitles: ['Kiosk intake started', 'Chief complaint captured', 'Documents scanned', 'Safety screening', 'History structured', 'Physician verification'],
  timelineBodies: [
    'Checked in at {kiosk} · language {lang}',
    'Chief complaint recorded: {complaint}',
    '{n} documents scanned in this session',
    'Rule-based safety screen completed - {n} flags escalated',
    'Structured history prepared for physician review',
    'Verified and released to the consultation queue',
  ],

  ayushModeTitle: 'AYUSH Clinical Assessment Mode',
  ayushModeSub: 'Parallel Ayurvedic assessment for the same patient',
  ayushDosha: 'Dosha balance',
  ayushDoshaSub: 'Derived from 42 prompted responses',
  ayushInterpLabel: 'INTERPRETATION (DRAFT)',
  ayushInterpBody: 'Pitta-dominant Vikriti on a Vata-Pitta Prakriti. Agni is Tikshna and Koshtha is Mridu - consistent with the dietary and sleep pattern reported at the kiosk. To be correlated by the physician.',
  ayushDasha: 'Dashavidha Pariksha',
  ayushDashaSub: 'Ten-fold examination recorded at the kiosk',
  ayushTablePart: 'PARIKSHA',
  ayushTableFinding: 'FINDING',
  ayushInclude: 'Include in patient history',
  ayushIncluded: 'Included in patient history',
  ayushBack: 'Back to Physician Dashboard',

  extractTitle: 'Live clinical extract',
  extractSub: 'Updating as the patient speaks',
  scannedBadge: 'SCANNED',
  readingBadge: 'READING',
  engineSub: 'ASR · NER · OCR · Rule-based safety screen',
  crashTeam: 'Crash team on standby - Main OT corridor',
  declineNote: 'Declining does not affect your treatment. A nurse will take your history manually instead.',
  send: 'Send',
  sttCaptured: '✓ Speech captured',
  sttDenied: 'Microphone access is required for voice input. Please allow microphone permission or use Type instead.',
  sttUnsupported: 'Speech recognition is not supported in this browser. Please use the Type option.',
  sttNoSpeech: 'No speech detected. Please try again.',
  patientResponse: 'Patient Response',
  printReport: 'Print Report',
  downloadPdf: 'Download PDF',
  pdfDownloaded: '✓ Patient History Report Downloaded Successfully',
  generatingReport: 'Generating report...',
  reportTitle: 'Structured Patient History',
  generatedOn: 'Generated On',
  reportDocs: 'Medical Documents Reviewed',
  aiSummaryTitle: 'AI-Assisted Clinical Summary',
  aiSummarySub: 'Structured from patient inputs, voice interaction, and medical documents for physician review.',
  physicianReview: 'PHYSICIAN REVIEW REQUIRED',
  extractedFromDocs: 'Extracted from uploaded/scanned documents',
  pdfPrinted: '✓ Patient History Report Sent to Print',

  piTitle: 'Patient Information',
  piSub: 'Please enter your details so your doctor knows about you before the consultation.',
  piName: 'Full name',
  piNameHint: 'As per your ID proof',
  piAge: 'Age',
  piGender: 'Gender',
  piMale: 'Male',
  piFemale: 'Female',
  piOther: 'Other',
  piPhone: 'Mobile number',
  piCity: 'City',
  piState: 'State',
  piStatePlaceholder: 'Select State',
  piSelectStateFirst: 'Select State First',
  piStateErr: 'Please select your state',
  piCityErr: 'Please select your city',
  piCityPlaceholder: 'Select City',
  searchPlaceholder: 'Search',
  piComplaint: 'Main problem / Reason for coming to the hospital',
  piComplaintHint: 'Tell us in your own words why you came today',
  piNameErr: 'Please enter your full name',
  piAgeErr: 'Please enter a valid age (1-120)',
  piPhoneErr: 'Please enter a valid 10-digit mobile number',
  piPhonePlaceholder: 'Enter 10-digit mobile number',
  piComplaintErr: 'Please describe your main problem',
  piFormNote: 'This information is used only for today\'s visit and is attached to your kiosk session.',
  emptyNone: 'Not reported at the kiosk',
  dashPhoneLabel: 'MOBILE',
  dashCityLabel: 'CITY',
  docDate: 'Document Date',
  docMedication: 'Medication',
  docInvestigation: 'Investigation',
  docTranscribed: 'Transcribed from the scanned document',
  riskFlagDetail: '{age}-year-old with multiple cardiovascular risk factors reported at intake',
  categoryLabels: { headache: 'Headache', chest: 'Chest Pain', abdomen: 'Stomach Pain', cough: 'Cough', fever: 'Fever', general: 'General' },
  interview: {
    headache: ['When did the headache start?', 'Did the headache start suddenly or gradually?', 'Which part of the head hurts?', 'How does the pain feel - throbbing or pressure?'],
    chest: ['When did the chest pain start?', 'Where is the chest pain located?', 'Does the pain spread anywhere?', 'Does walking make the pain worse?'],
    abdomen: ['When did the stomach pain start?', 'Where exactly does it hurt - upper, lower, left or right side?', 'Does the pain change after eating?', 'Does going to the toilet give relief?'],
    cough: ['How long have you had the cough?', 'Is it a wet cough with phlegm or a dry cough?', 'Does the cough disturb your sleep?', 'Do you feel breathless on exertion?'],
    fever: ['How long have you had the fever?', 'Is the fever higher at night or during the day?', 'Do you have body ache or sweating with the fever?', 'Is your appetite or thirst reduced?'],
    general: ['How long have you had this problem?', 'Has this problem happened before?', 'Are you taking any medicine right now?', 'Do you have any known allergies?', 'Do you smoke or chew tobacco?'],
  },
  voiceAnswer: 'Answered by voice',
  quickYes: 'Yes',
  quickNo: 'No',
  quickUnknown: "Don't know",
  riskFlagTitle: 'Age and risk-factor pattern',
  flagTemplates: {
    headache: { title: 'Sudden or severe headache pattern', detail: 'A headache that is sudden, severe or different from earlier episodes may need timely clinical evaluation.' },
    chest: { title: 'Chest pain pattern needing timely review', detail: 'Chest pain linked to exertion, or with associated symptoms, may require prompt clinical evaluation.' },
    abdomen: { title: 'Persistent abdominal pain pattern', detail: 'Severe or unrelenting stomach pain, especially with vomiting, may need timely clinical evaluation.' },
    cough: { title: 'Prolonged or breathless cough pattern', detail: 'A cough lasting weeks, or with breathlessness, may need clinical evaluation.' },
    fever: { title: 'Prolonged fever pattern', detail: 'Fever lasting several days, or with reduced intake, may need clinical evaluation.' },
    general: { title: 'Persistent or worsening complaint', detail: 'A complaint that persists or worsens should be reviewed by a physician in time.' },
  },
};

const HI: Strings = {
  back: '← पीछे',
  continueBtn: 'आगे बढ़ें →',

  consentHeader: 'रोगी की सहमति',
  consentTitle: 'शुरू करने से पहले',
  consentIntro: 'MediKiosk आपके स्वास्थ्य के बारे में प्रश्न पूछेगा और आपके डॉक्टर के लिए चिकित्सा इतिहास तैयार करने हेतु जानकारी एकत्र करेगा।',
  whyTitle: 'यह जानकारी क्यों एकत्र की जा रही है?',
  whyBody: 'परामर्श से पहले आपका चिकित्सा इतिहास तैयार करने के लिए।',
  privacyTitle: 'गोपनीयता',
  privacyBody: 'आपकी जानकारी इस प्रदर्शन प्रक्रिया हेतु है और इसे सुरक्षित रखा जाना चाहिए।',
  importantTitle: 'महत्वपूर्ण',
  importantBody: 'MediKiosk कोई रोग नहीं बताता और न ही कोई दवा लिखता है।',
  listenExplanation: 'व्याख्या सुनें',
  playingExplanation: 'व्याख्या चल रही है...',
  audioSuffix: 'सेकंड का सारांश, जो सुनना चाहते हैं उनके लिए',
  consentCheckbox: 'मैं समझता/समझती हूँ कि मेरी जानकारी मेरा चिकित्सा इतिहास तैयार करने के लिए उपयोग की जाएगी।',
  consentBtn: 'मैं समझता हूँ और सहमत हूँ →',

  convHeader: 'AI रोगी साक्षात्कार',
  convSub: 'बोलें, लिखें या छूँ - अपने शब्दों में उत्तर दें',
  greeting: 'नमस्ते {name} जी। आपको किस समस्या के कारण अस्पताल आना पड़ा?',
  patientReply: 'मुझे एक स्वास्थ्य समस्या के लिए मदद चाहिए।',
  aiThanks: 'धन्यवाद। मैंने आपकी बात समझ ली है। अब कुछ आसान सवाल पूछूंगा - इसमें 2-3 मिनट लगेंगे।',
  speakNow: 'अब आप बोलिए...',
  processingSpeech: 'आवाज़ को लिखा जा रहा है...',
  tapToSpeak: 'माइक्रोफ़ोन दबाकर अपने शब्दों में उत्तर दें।',
  capturedAgain: 'उत्तर दर्ज हो गया। फिर बोलने के लिए दबाएँ।',
  lblSpeak: 'बोलें',
  lblType: 'लिखें',
  lblTouch: 'छूँ',
  readyLabel: 'तैयार',
  listeningLabel: 'सुन रहे हैं',
  processingLabel: 'प्रोसेसिंग',
  capturedLabel: 'दर्ज',
  continueInterview: 'साक्षात्कार जारी रखें →',
  capturedViaVoice: 'आवाज़ से दर्ज',
  chips: ['पसीना आना', 'बेचैनी', 'चक्कर आना', 'जी मिचलाना', 'कमज़ोरी', 'कोई और समस्या नहीं'],

  adaptiveHeader: 'अनुकूलित प्रश्नोत्तर',
  adaptiveSub: 'आपकी शिकायत के आधार पर अनुवर्ती प्रश्न',
  questions: ['दर्द कब शुरू हुआ था?', 'दर्द शरीर में कहाँ महसूस हो रहा है?', 'क्या दर्द कहीं और फैलता है?', 'क्या कोई बात दर्द को बढ़ाती या कम करती है?'],
  qOptions: [
    ['आज सुबह ही', '2 दिन पहले', 'एक हफ्ते से', 'इससे पहले भी हुआ था'],
    ['छाती के बीच में', 'बाईं छाती में', 'दाईं छाती में', 'पेट के ऊपर'],
    ['हाँ, बाएं हाथ में', 'हाँ, गर्दन और जबड़े में', 'हाँ, पीठ में', 'नहीं, वहीं रहता है'],
    ['चलने-फिरने से बढ़ता है', 'आराम से कम होता है', 'साँस लेने पर बढ़ता है', 'खाने के बाद बढ़ता है'],
  ],
  skipQuestion: 'यह सवाल छोड़ें',
  clinicalInfo: 'चिकित्सीय जानकारी',
  clinicalInfoSub: 'हर उत्तर के साथ जानकारी अपडेट होती है',
  rows: { complaint: 'मुख्य शिकायत', duration: 'अवधि', location: 'स्थान', radiation: 'फैलाव', aggravating: 'बढ़ाने वाले कारण', relieving: 'कम करने वाले कारण' },
  pending: 'प्रतीक्षित',
  questionsAnswered: 'पूछे गए सवाल',
  continueDocs: 'दस्तावेज़ों पर जाएँ',
  branchNotice: 'शाखा तर्क: "{complaint}" के आधार पर संबंधित सवाल अपने आप चुने गए।',

  scanHeader: 'चिकित्सा दस्तावेज़ स्कैनिंग',
  scanTitle: 'अपने चिकित्सा दस्तावेज़ स्कैन करें',
  scanIntro: 'पुराने चिकित्सा दस्तावेज़ जोड़ें ताकि MediKiosk डॉक्टर के लिए ज़रूरी जानकारी निकाल सके।',
  docTitles: ['पर्चा', 'लैब रिपोर्ट', 'डिस्चार्ज सारांश', 'जाँच रिपोर्ट'],
  scanAll: 'सभी दस्तावेज़ स्कैन करें',
  scanLabel: 'स्कैन करें',
  ocrPipeline: 'OCR प्रक्रिया',
  stages: ['दस्तावेज़ अपलोड', 'स्कैनिंग', 'टेक्स्ट पहचान', 'चिकित्सीय शब्द पहचान', 'संरचित डेटा'],
  extractedInfo: 'निकाली गई जानकारी',
  extractionComplete: 'निकालना पूरा हुआ',
  ocrConfidence: 'OCR सटीकता',
  draftNote: 'निकाली गई जानकारी मसौदा है और डॉक्टर की पुष्टि आवश्यक है।',
  scanNotice: 'निकाली गई जानकारी मसौदा है और डॉक्टर की पुष्टि आवश्यक है। MediKiosk परिणाम नहीं समझाता और दवा नहीं बदलता।',

  procHeader: 'AI प्रोसेसिंग',
  sourceVoice: 'आवाज़',
  sourceTouch: 'छुअन',
  sourceDocs: 'चिकित्सा दस्तावेज़',
  structuredHistory: 'संरचित रोगी इतिहास',
  stageLabels: ['आवाज़ को लिखना', 'चिकित्सीय शब्द पहचान', 'जानकारी निकालना', 'मानकीकरण', 'चिकित्सीय संरचना'],
  disclaimer: 'चिकित्सक की समीक्षा और परामर्श हेतु तैयार किया गया।',
  viewStructured: 'संरचित इतिहास देखें →',
  procReady: 'मसौदा डॉक्टर की पुष्टि हेतु तैयार है।',
  procWorking: 'आवाज़, छुअन और दस्तावेज़ जोड़े जा रहे हैं...',

  flagHeader: 'रेड फ्लैग सुरक्षा सूचना',
  alertTitle: 'गंभीर लक्षणों का संकेत मिला',
  alertBody: 'दी गई जानकारी के आधार पर कुछ लक्षणों को समय पर जाँच की आवश्यकता हो सकती है।',
  alertPriority: 'कृपया जाँच को प्राथमिकता दें।',
  urgent: 'प्राथमिकता: तत्काल',
  noReplace: 'यह प्रवेश प्रक्रिया डॉक्टर की जाँच का स्थान नहीं लेती',
  noDiagnosis: 'MediKiosk कोई रोग नहीं बताता। यह केवल सुरक्षा जाँच है - यह कोई नाम या दवा नहीं बताता।',
  whatTriggered: 'स्क्रीन क्यों चालू हुई',
  ackText: 'मैंने यह सूचना रोगी और साथ आए व्यक्ति को दिखा दी है',
  continueDashboard: 'डॉक्टर डैशबोर्ड पर जाएँ →',

  welcomeHeadline: 'मरीज़ का इतिहास,\nजो डॉक्टर से मिलने से\nपहले ही तैयार हो जाता है।',
  welcomeBody:
    'MediKiosk मरीज़ से उसी की भाषा में बात करता है, उसके कागज़ात पढ़ता है और व्यवस्थित चिकित्सा इतिहास का मसौदा तैयार करता है - ताकि डॉक्टर क्लिपबोर्ड के बजाय मरीज़ से बातचीत शुरू कर सके।',
  startHistory: 'मरीज़ का इतिहास शुरू करें →',
  viewDashboard: 'डॉक्टर डैशबोर्ड देखें',
  liveMode: 'लाइव प्रदर्शन मोड',
  sihBadge: 'स्मार्ट इंडिया हैकाथॉन 2026 - प्रोटोटाइप',
  featuresTitle: 'ओपीडी के लिए बनाया गया',
  featuresSub: 'पाँच क्षमताएँ, 90 सेकंड की कियोस्क प्रक्रिया',
  featureTitles: ['आवाज़ से बातचीत', 'छुअन आधारित इनपुट', 'बहुभाषी सहायता', 'चिकित्सा दस्तावेज़ बुद्धिमत्ता', 'सुरक्षित और निजी'],
  featureBodies: [
    'मरीज़ अपने शब्दों में उत्तर देता है। आवाज़ को चिकित्सीय शब्दों सहित लाइव लिखा जाता है।',
    'बड़े बटन, हाँ/नहीं विकल्प और चित्र आधारित चयन - बुज़ुर्गों और कम पढ़े-लिखे लोगों के लिए।',
    'हिन्दी, मराठी, गुजराती, बंगाली, तमिल और तेलुगु सहित 12 भारतीय भाषाएँ।',
    'कियोस्क पर ही पर्चे, लैब रिपोर्ट और डिस्चार्ज सारांश पढ़कर संरचित डेटा बनाया जाता है।',
    'डेटा सुरक्षित रखा जाता है, मुलाक़ात के बाद अपने आप हट जाता है और अस्पताल नेटवर्क से बाहर नहीं जाता।',
  ],
  howTitle: 'यह कैसे काम करता है',
  howSub: 'मरीज़ → आवाज़, छुअन और दस्तावेज़ → AI प्रवेश → व्यवस्थित इतिहास → डॉक्टर की पुष्टि → परामर्श',
  howStages: ['मरीज़', 'आवाज़ + छुअन + दस्तावेज़', 'MediKiosk AI इंजन', 'व्यवस्थित चिकित्सा इतिहास', 'डॉक्टर की पुष्टि', 'परामर्श'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'अस्पताल नेटवर्क पर, ऑफ़लाइन-सक्षम',
  metaPurge: 'मुलाक़ात के बाद अपने आप हटाया जाता है',
  designedFor: 'इनके लिए डिज़ाइन',
  designedForValue: 'सरकारी मेडिकल कॉलेज • AYUSH ओपीडी • ज़िला अस्पताल • व्यस्त ओपीडी',

  consentRecordTitle: 'सहमति रिकॉर्ड',
  consentRecordSub: 'इस मुलाक़ात से जोड़ा जाएगा',
  consentRows: ['मरीज़', 'सहमति का तरीक़ा', 'भाषा', 'कियोस्क', 'समय'],

  assistantName: 'MediKiosk सहायक',
  intakeMode: 'चिकित्सा प्रवेश मोड',
  chipsHeader: 'जो लागू हो उसे छूँ',
  tapped: 'छुआ गया',
  typePlaceholder: 'अपनी समस्या यहाँ लिखें',
  confidenceLabel: 'निकालने की सटीकता',
  inputMethodKv: 'इनपुट का तरीक़ा',
  inputMethodInUse: 'उपयोग में इनपुट तरीक़ा',
  recordToContinue: 'आगे बढ़ने के लिए एक उत्तर दर्ज करें',
  draftOnlyNotice: 'यह केवल मसौदा है। हर फ़ील्ड डॉक्टर की जाँच के बाद ही केस शीट का हिस्सा बनेगा।',
  micStart: 'बोलना शुरू करें',
  micStop: 'रिकॉर्डिंग रोकें',

  questionOf: 'सवाल {n} / {m}',
  doneTitle: 'साक्षात्कार पूरा हुआ',
  doneBody: 'सभी {m} सवाल पूछे गए। बाकी सवाल आवाज़ की रिकॉर्डिंग से अपने आप हल हो गए - आपको दोहराना नहीं पड़ा।',
  badgeQuestions: '{n} सवाल',
  badgeDocuments: '{n} दस्तावेज़',
  badgeRedFlag: '{n} सुरक्षा संकेत',
  prevQuestion: 'पिछला सवाल',
  panelNotice: 'यह पैनल AI का मसौदा है। इसमें कोई निदान नहीं है और कुछ भी मरीज़ को परिणाम के रूप में नहीं दिखाया जाता।',

  scanSub: 'OCR से दवाइयाँ, जाँचें और तारीख़ें निकाली जाती हैं',
  scanHint: 'दस्तावेज़ स्कैनर बिस्तर पर रखें या कैमरा उपयोग करें।',
  scanAgain: 'फिर से स्कैन करें',
  docsRead: '{total} में से {done} दस्तावेज़ पढ़े गए',
  docsInProgress: '{n} चल रहे हैं',

  procSub: 'आवाज़, छुअन और दस्तावेज़ एक इतिहास में जोड़े जा रहे हैं',
  draftReadyTime: 'मसौदा 4.8 सेकंड में तैयार',
  workingTitle: 'जानकारी जोड़ी जा रही है...',
  badgeComplete: 'पूर्ण',
  badgeRunning: 'चालू',
  waitingEngine: 'इंजन की प्रतीक्षा...',
  outputReady: 'मसौदा तैयार - 12 फ़ील्ड, 4 दस्तावेज़, 3 सुरक्षा संकेत',

  whatsNext: 'आगे क्या होगा',
  nextTitles: ['डॉक्टर को सूचना दिखेगी', 'ज़रूरी जाँच पहले', 'मरीज़ को घबराहट नहीं'],
  nextBodies: [
    'मसौदा इतिहास सुरक्षा बैनर के साथ खुलेगा।',
    'डॉक्टर के बुलाने से पहले नर्स BP, SpO2 और ECG दर्ज करेगी।',
    'कियोस्क मरीज़ को केवल इतना बताता है कि डॉक्टर जल्दी बुलाएँगे।',
  ],
  showProtocol: 'आपातकालीन प्रोटोकॉल देखें',
  demoNoCall: 'प्रदर्शन संस्करण - कोई कॉल नहीं होगी',
  protocolTitle: 'आपातकालीन प्रोटोकॉल',
  protocolBody: 'वास्तविक प्रणाली में यह अस्पताल का आपातकालीन नंबर खोलता और ड्यूटी रजिस्ट्रार को सूचित करता। यह प्रोटोटाइप है, इसलिए कोई कॉल नहीं होगी।',
  closeLabel: 'बंद करें',
  emergencyNote: 'राष्ट्रीय आपातकालीन नंबर: 108 · अस्पताल एक्सटेंशन: 2211',

  successTitle: 'मरीज़ का इतिहास सफलतापूर्वक तैयार',
  successBody: 'कियोस्क प्रक्रिया पूरी हो गई। इस मुलाक़ात का व्यवस्थित इतिहास अब चिकित्सक की पुष्टि और परामर्श हेतु तैयार है।',
  flowTitles: ['मरीज़', 'आवाज़ + छुअन + दस्तावेज़', 'AI चिकित्सा प्रवेश', 'व्यवस्थित इतिहास', 'डॉक्टर की पुष्टि', 'परामर्श'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '12 सवाल · 4 दस्तावेज़ स्कैन',
    'ट्रांसक्रिप्शन, निकालना और सुरक्षा जाँच',
    'समयरेखा सहित SOAP मसौदा',
    'डॉ. ए. मेहता द्वारा जाँचा और स्वीकृत',
    'डॉक्टर मरीज़ से मिलते हैं - कागज़ों से नहीं',
  ],
  impactTitle: 'इस कियोस्क का प्रभाव',
  impactLabels: ['कुल प्रवेश समय', 'डॉक्टर का दस्तावेज़ीकरण समय', 'औसत OCR सटीकता', 'मरीज़ के लिए आसानी'],
  tagline: 'कम समय दस्तावेज़ों में।\nज़्यादा समय मरीज़ की सेवा में।',
  startNewDemo: 'नया प्रदर्शन शुरू करें',
  backToDashboard: 'डॉक्टर डैशबोर्ड पर वापस',
  verifiedBadge: 'डॉक्टर द्वारा सत्यापित',
  unverifiedBadge: 'मसौदा असत्यापित',
  endToEndJourney: 'शुरू से अंत तक की प्रक्रिया',
  journeyNotice: 'केवल नमूना डेटा। MediKiosk इतिहास का मसौदा बनाता है; अंतिम निर्णय हमेशा योग्य डॉक्टर का होता है।',
  fieldCharacter: 'स्वरूप',
  fieldAssociated: 'संबंधित लक्षण',
  fieldStatus: 'स्थिति',
  fieldOnset: 'आरंभ',
  tapAnswer: 'सबसे उपयुक्त उत्तर छूँ',
  docHints: ['ओपीडी पर्चा', 'प्रयोगशाला की रिपोर्ट', 'पिछली अस्पताल यात्रा', 'छपी हुई जाँच रिपोर्ट'],
  processedBadge: 'डिवाइस पर ही प्रोसेस्ड · {n} फ़ाइलें',
  consentModeAudio: 'आवाज़ + लिखित',
  consentModeWritten: 'लिखित',
  taglineSub: 'AI-संचालित चिकित्सा प्रवेश मंच',

  dashTitle: 'मरीज़ का डैशबोर्ड',
  dashSub: 'मेडिसिन ओपीडी · डॉ. ए. मेहता · अपडेट {time}',
  dashLive: 'लाइव',
  dashAttendant: 'साथ आया व्यक्ति',
  dashKioskLabel: 'कियोस्क',
  dashLangLabel: 'भाषा',
  dashAttendantValue: '—',
  dashMale: 'पुरुष',
  dashAgeLine: '{age} वर्ष · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI द्वारा तैयार प्रारूप - चिकित्सक द्वारा सत्यापन आवश्यक',
  dashBannerBody: 'नीचे दी गई किसी जानकारी की चिकित्सक द्वारा पुष्टि नहीं हुई है। केस शीट में जोड़ने से पहले हर फ़ील्ड जाँच लें।',
  dashVerifiedTitle: 'डॉ. ए. मेहता द्वारा सत्यापित',
  dashVerifiedBody: 'मेडिसिन ओपीडी · {stamp} · ऑडिट ID AUD-77120',
  dashTabHistory: 'चिकित्सीय इतिहास',
  dashTabTimeline: 'चिकित्सीय समयरेखा',
  dashTabDocuments: 'दस्तावेज़',
  dashHpi: 'वर्तमान बीमारी का इतिहास',
  dashPmh: 'पिछला चिकित्सीय इतिहास',
  dashMeds: 'वर्तमान दवाएँ',
  dashAllergies: 'एलर्जी',
  dashInvestigations: 'पिछली जांचें',
  dashStructuredFields: 'कियोस्क पर दर्ज संरचित फ़ील्ड',
  dashAuditNote: 'संपादन आपके चिकित्सक ID के साथ ऑडिट लॉग में दर्ज होते हैं',
  dashEdit: 'संपादित करें',
  dashMedsNote: 'मरीज़ के अनुसार - खुराक MediKiosk द्वारा सत्यापित नहीं है।',
  dashStatLabels: ['सवाल', 'दस्तावेज़', 'आवाज़ का समय', 'सुरक्षा संकेत'],
  dashAyushBtn: 'AYUSH चिकित्सीय मोड खोलें',
  dashAyushAttached: 'AYUSH आकलन जोड़ा गया',
  dashNotScanned: 'स्कैन नहीं हुआ',
  dashIntakeSummary: 'प्रवेश सारांश',
  flagLow: 'कम',
  flagHigh: 'अधिक',
  flagNormal: 'सामान्य',
  dashEditHistory: 'इतिहास संपादित करें',
  dashSaveEdits: 'संपादन सहेजें',
  dashVerify: 'सत्यापित करें और पुष्टि करें',
  dashVerifiedBtn: 'सत्यापित',
  dashSend: 'परामर्श के लिए भेजें',
  dashConfirmTitle: 'इस इतिहास की पुष्टि करें?',
  dashConfirmBody: 'पुष्टि करने पर यह मसौदा आपके चिकित्सक ID से स्वीकृत होकर परामर्श कतार में चला जाएगा। आपके संपादन ऑडिट लॉग में सुरक्षित रहेंगे।',
  dashConfirmYes: 'हाँ, इतिहास सत्यापित करें',
  dashCancel: 'रद्द करें',
  timelineTitle: 'चिकित्सीय समयरेखा',
  timelineSub: 'कियोस्क प्रवेश और अस्पताल रिकॉर्ड का समेकित दृश्य',
  timelineTitles: ['कियोस्क पर प्रवेश शुरू', 'मुख्य शिकायत दर्ज', 'दस्तावेज़ स्कैन', 'सुरक्षा जाँच', 'इतिहास व्यवस्थित', 'चिकित्सक की पुष्टि'],
  timelineBodies: [
    '{kiosk} पर चेक-इन · भाषा {lang}',
    'मुख्य शिकायत दर्ज: {complaint}',
    'इस सत्र में {n} दस्तावेज़ स्कैन हुए',
    'नियम-आधारित सुरक्षा जाँच पूरी - {n} संकेत आगे भेजे गए',
    'चिकित्सक की समीक्षा हेतु व्यवस्थित इतिहास तैयार',
    'सत्यापित करके परामर्श कतार में भेजा गया',
  ],

  ayushModeTitle: 'AYUSH चिकित्सीय आकलन मोड',
  ayushModeSub: 'उसी रोगी के लिए समानांतर आयुर्वेदिक आकलन',
  ayushDosha: 'दोष संतुलन',
  ayushDoshaSub: '42 प्रेरित उत्तरों से प्राप्त',
  ayushInterpLabel: 'व्याख्या (मसौदा)',
  ayushInterpBody: 'आग्नेय प्रकृति पर पित्त वृद्धि विकृति। अग्नि तीक्ष्ण और कोष्ठ मृदु - कियोस्क पर बताए आहार और नींद के पैटर्न के अनुरूप। चिकित्सक द्वारा सहसंबंध जाँचा जाए।',
  ayushDasha: 'दशविध परीक्षा',
  ayushDashaSub: 'कियोस्क पर दर्ज दस-सूत्री परीक्षा',
  ayushTablePart: 'परीक्षा',
  ayushTableFinding: 'परिणाम',
  ayushInclude: 'रोगी इतिहास में जोड़ें',
  ayushIncluded: 'रोगी इतिहास में जोड़ा गया',
  ayushBack: 'डॉक्टर डैशबोर्ड पर वापस',

  extractTitle: 'लाइव चिकित्सीय विवरण',
  extractSub: 'मरीज़ के बोलते ही अपडेट होता है',
  scannedBadge: 'स्कैन हुआ',
  readingBadge: 'पढ़ा जा रहा है',
  engineSub: 'ASR · NER · OCR · नियम-आधारित सुरक्षा जाँच',
  crashTeam: 'आपात टीम तैयार - मुख्य OT गलियारा',
  declineNote: 'इनकार करने पर आपके इलाज पर कोई असर नहीं पड़ेगा। नर्स आपका इतिहास खुद लिख लेगी।',
  send: 'भेजें',
  sttCaptured: '✓ वाणी दर्ज हुई',
  sttDenied: 'आवाज़ के लिए माइक्रोफ़ोन की आवश्यकता है। कृपया माइक्रोफ़ोन की अनुमति दें या लिखने का विकल्प उपयोग करें।',
  sttUnsupported: 'इस ब्राउज़र में वाणी पहचान उपलब्ध नहीं है। कृपया लिखने का विकल्प उपयोग करें।',
  sttNoSpeech: 'कोई आवाज़ नहीं सुनी गई। कृपया फिर से प्रयास करें।',
  patientResponse: 'मरीज़ का उत्तर',
  printReport: 'रिपोर्ट प्रिंट करें',
  downloadPdf: 'PDF डाउनलोड करें',
  pdfDownloaded: '✓ रोगी इतिहास रिपोर्ट सफलतापूर्वक डाउनलोड हो गई',
  generatingReport: 'रिपोर्ट बन रही है...',
  reportTitle: 'व्यवस्थित रोगी इतिहास',
  generatedOn: 'बनाने का समय',
  reportDocs: 'देखे गए चिकित्सा दस्तावेज़',
  aiSummaryTitle: 'AI-सहायता से बनाया गया चिकित्सीय सारांश',
  aiSummarySub: 'रोगी की जानकारी, आवाज़ से हुई बातचीत और चिकित्सा दस्तावेज़ों से चिकित्सक की समीक्षा हेतु व्यवस्थित किया गया।',
  physicianReview: 'चिकित्सक की समीक्षा आवश्यक',
  extractedFromDocs: 'अपलोड/स्कैन किए गए दस्तावेज़ों से निकाला गया',
  pdfPrinted: '✓ रोगी इतिहास रिपोर्ट प्रिंट हेतु भेजी गई',

  piTitle: 'रोगी की जानकारी',
  piSub: 'कृपया अपनी जानकारी भरें ताकि परामर्श से पहले डॉक्टर आपके बारे में जान सकें।',
  piName: 'पूरा नाम',
  piNameHint: 'अपने पहचान पत्र के अनुसार',
  piAge: 'आयु',
  piGender: 'लिंग',
  piMale: 'पुरुष',
  piFemale: 'महिला',
  piOther: 'अन्य',
  piPhone: 'मोबाइल नंबर',
  piCity: 'शहर',
  piState: 'राज्य',
  piStatePlaceholder: 'राज्य चुनें',
  piSelectStateFirst: 'पहले राज्य चुनें',
  piStateErr: 'कृपया अपना राज्य चुनें',
  piCityErr: 'कृपया अपना शहर चुनें',
  piCityPlaceholder: 'शहर चुनें',
  searchPlaceholder: 'खोजें',
  piComplaint: 'मुख्य समस्या / अस्पताल आने का कारण',
  piComplaintHint: 'अपने शब्दों में बताएँ कि आज क्यों आए हैं',
  piNameErr: 'कृपया अपना पूरा नाम लिखें',
  piAgeErr: 'कृपया सही आयु लिखें (1-120)',
  piPhoneErr: 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें',
  piPhonePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
  piComplaintErr: 'कृपया अपनी मुख्य समस्या बताएँ',
  piFormNote: 'यह जानकारी केवल आज की मुलाक़ात के लिए है और आपके कियोस्क सत्र से जुड़ जाएगी।',
  emptyNone: 'कियोस्क पर नहीं बताया गया',
  dashPhoneLabel: 'मोबाइल',
  dashCityLabel: 'शहर',
  docDate: 'दस्तावेज़ की तारीख़',
  docMedication: 'दवा',
  docInvestigation: 'जाँच',
  docTranscribed: 'स्कैन किए गए दस्तावेज़ से लिखा गया',
  riskFlagDetail: '{age} वर्ष की आयु, प्रवेश पर कई हृदय जोखिम कारक बताए गए',
  categoryLabels: { headache: 'सिरदर्द', chest: 'सीने में दर्द', abdomen: 'पेट दर्द', cough: 'खांसी', fever: 'बुखार', general: 'सामान्य' },
  interview: {
    headache: ['सिरदर्द कब से हो रहा है?', 'सिरदर्द अचानक शुरू हुआ या धीरे-धीरे?', 'सिर के किस हिस्से में दर्द हो रहा है?', 'दर्द कैसा महसूस होता है - धड़कन जैसा या दबाव जैसा?'],
    chest: ['सीने में दर्द कब शुरू हुआ?', 'दर्द कहाँ महसूस हो रहा है?', 'क्या दर्द कहीं और फैलता है?', 'क्या चलने-फिरने से दर्द बढ़ता है?'],
    abdomen: ['पेट में दर्द कब शुरू हुआ?', 'पेट में दर्द कहाँ हो रहा है - ऊपर, नीचे, बाईं या दाईं ओर?', 'क्या खाने के बाद दर्द बदलता है?', 'क्या शौच जाने से आराम मिलता है?'],
    cough: ['खांसी कब से है?', 'खांसी में कफ़ आता है या सूखी खांसी है?', 'क्या खांसी से नींद प्रभावित होती है?', 'क्या चलने पर साँस फूलती है?'],
    fever: ['बुखार कब से है?', 'बुखार रात में ज़्यादा रहता है या दिन में?', 'क्या बुखार के साथ बदन दर्द या पसीना है?', 'क्या भूख या प्यास कम लगती है?'],
    general: ['आपकी समस्या कब से है?', 'क्या यह समस्या पहले भी हुई है?', 'क्या आप कोई दवा ले रहे हैं?', 'क्या आपको किसी चीज़ की एलर्जी है?', 'क्या आप धूम्रपान या तंबाकू लेते हैं?'],
  },
  voiceAnswer: 'आवाज़ से उत्तर दर्ज',
  quickYes: 'हाँ',
  quickNo: 'नहीं',
  quickUnknown: 'पता नहीं',
  riskFlagTitle: 'आयु और जोखिम कारकों का पैटर्न',
  flagTemplates: {
    headache: { title: 'अचानक या तीव्र सिरदर्द का पैटर्न', detail: 'अचानक, तीव्र या पहले से अलग सिरदर्द को समय पर चिकित्सीय जाँच की आवश्यकता हो सकती है।' },
    chest: { title: 'सीने के दर्द का पैटर्न - समय पर समीक्षा आवश्यक', detail: 'व्यायाम से जुड़ा या साथ में अन्य लक्षणों वाला सीने का दर्द तत्काल चिकित्सीय जाँच की माँग कर सकता है।' },
    abdomen: { title: 'लगातार पेट दर्द का पैटर्न', detail: 'गंभीर या रुकने वाला न होने वाला पेट दर्द, खासकर उल्टी के साथ, समय पर जाँच की माँग कर सकता है।' },
    cough: { title: 'लंबी या साँस फूलने वाली खांसी का पैटर्न', detail: 'हफ़्तों चलने वाली या साँस फूलने के साथ खांसी को चिकित्सीय जाँच की आवश्यकता हो सकती है।' },
    fever: { title: 'लंबे बुखार का पैटर्न', detail: 'कई दिनों तक चलने वाला बुखार या कम खाने के साथ बुखार को चिकित्सीय जाँच की आवश्यकता हो सकती है।' },
    general: { title: 'लगातार या बिगड़ती शिकायत', detail: 'लगातार या बिगड़ती शिकायत की समय पर डॉक्टर द्वारा समीक्षा होनी चाहिए।' },
  },
};

const MR: Strings = {
  back: '← मागे',
  continueBtn: 'पुढे जा →',

  consentHeader: 'रुग्णाची संमती',
  consentTitle: 'सुरू करण्यापूर्वी',
  consentIntro: 'MediKiosk आपल्या आरोग्याबद्दल प्रश्न विचारेल आणि आपल्या डॉक्टरसाठी वैद्यकीय इतिहास तयार करण्यासाठी माहिती गोळा करेल.',
  whyTitle: 'ही माहिती का गोळा केली जात आहे?',
  whyBody: 'परामर्शापूर्वी आपला वैद्यकीय इतिहास तयार करण्यासाठी.',
  privacyTitle: 'गोपनीयता',
  privacyBody: 'आपली माहिती या प्रदर्शनासाठी आहे आणि ती सुरक्षित ठेवली पाहिजे.',
  importantTitle: 'महत्त्वाचे',
  importantBody: 'MediKiosk रोग सांगत नाही किंवा औषध लिहत नाही.',
  listenExplanation: 'स्पष्टीकरण ऐका',
  playingExplanation: 'स्पष्टीकरण चालू आहे...',
  audioSuffix: 'सेकंदाचा सारांश, ऐकू इच्छणाऱ्यांसाठी',
  consentCheckbox: 'मला समजते की माझी माहिती माझा वैद्यकीय इतिहास तयार करण्यासाठी वापरली जाईल.',
  consentBtn: 'मला समजले आणि संमत आहे →',

  convHeader: 'AI रुग्ण संवाद',
  convSub: 'बोला, लिहा किंवा स्पर्श करा - आपल्या शब्दांत उत्तर द्या',
  greeting: 'नमस्कार {name}. आपल्याला कोणत्या समस्येमुळे रुग्णालयात यावे लागले?',
  patientReply: 'मला आरोग्य समस्येसाठी मदत हवी आहे.',
  aiThanks: 'धन्यवाद. आपले उत्तर मला समजले. आता काही सोपे प्रश्न विचारेन - यास 2-3 मिनिटे लागतील.',
  speakNow: 'आता बोला...',
  processingSpeech: 'आवाज लिहीला जात आहे...',
  tapToSpeak: 'मायक्रोफोन दाबून आपल्या शब्दांत उत्तर द्या.',
  capturedAgain: 'उत्तर नोंदवले. पुन्हा बोलण्यासाठी दाबा.',
  lblSpeak: 'बोला',
  lblType: 'लिहा',
  lblTouch: 'स्पर्श',
  readyLabel: 'तयार',
  listeningLabel: 'ऐकत आहोत',
  processingLabel: 'प्रक्रिया',
  capturedLabel: 'नोंदवले',
  continueInterview: 'संवाद सुरू ठेवा →',
  capturedViaVoice: 'आवाजाने नोंदवले',
  chips: ['घाम येणे', 'बेचैनी', 'चक्कर', 'मळमळ', 'कमकुवत', 'अजून कोणतीही समस्या नाही'],

  adaptiveHeader: 'अनुकूल प्रश्न',
  adaptiveSub: 'आपल्या तक्ररीवर आधारित पुढील प्रश्न',
  questions: ['दुखत कधी सुरू झाले?', 'दुखत शरीरात कुठे होत आहे?', 'दुखत कुठे पसरत आहे?', 'काही गोष्ट दुखत वाढवते किंवा कमी करते?'],
  qOptions: [
    ['आज सकाळीच', '2 दिवसांपूर्वी', 'एका आठवड्यापासून', 'आधीही झाले होते'],
    ['छातीच्या मध्यभागी', 'डावीकडच्या छातीत', 'उजवीकडच्या छातीत', 'पोटाच्या वर'],
    ['हो, डाव्या हातात', 'हो, मानेत आणि जडीत', 'हो, पाठीत', 'नाही, तिथेच राहते'],
    ['चालण्याने वाढते', 'विश्रांतीने कमी होते', 'श्वास घेताना वाढते', 'जेवणानंतर वाढते'],
  ],
  skipQuestion: 'हा प्रश्न वगळा',
  clinicalInfo: 'वैद्यकीय माहिती',
  clinicalInfoSub: 'प्रत्येक उत्तरासोबत माहिती अद्ययावत होते',
  rows: { complaint: 'मुख्य तक्रर', duration: 'कालावधी', location: 'ठिकाण', radiation: 'पसरणे', aggravating: 'वाढवणारे घटक', relieving: 'कमी करणारे घटक' },
  pending: 'प्रतीक्षित',
  questionsAnswered: 'विचारलेले प्रश्न',
  continueDocs: 'दस्तऐवजांकडे जा',
  branchNotice: 'शाखा तर्क: "{complaint}" यावर आधारित संबंधित प्रश्न आपोआप निवडले गेले.',

  scanHeader: 'वैद्यकीय दस्तऐवज स्कॅनिंग',
  scanTitle: 'आपले वैद्यकीय दस्तऐवज स्कॅन करा',
  scanIntro: 'जुने वैद्यकीय दस्तऐवज जोडा जेणेकरून MediKiosk डॉक्टरसाठी आवश्यक माहिती काढू शकेल.',
  docTitles: ['पर्चा', 'लॅब रिपोर्ट', 'डिस्चार्ज सारांश', 'तपासणी रिपोर्ट'],
  scanAll: 'सर्व दस्तऐवज स्कॅन करा',
  scanLabel: 'स्कॅन करा',
  ocrPipeline: 'OCR प्रक्रिया',
  stages: ['दस्तऐवज अपलोड', 'स्कॅनिंग', 'मजकूर ओळख', 'वैद्यकीय शब्द ओळख', 'संघटित डेटा'],
  extractedInfo: 'काढलेली माहिती',
  extractionComplete: 'काढणे पूर्ण झाले',
  ocrConfidence: 'OCR अचूकता',
  draftNote: 'काढलेली माहिती ही मसुदा असून डॉक्टरांची तपासणी आवश्यक आहे.',
  scanNotice: 'काढलेली माहिती मसुदा असून डॉक्टरांची तपासणी आवश्यक आहे. MediKiosk निकाल समजावत नाही किंवा औषध बदलत नाही.',

  procHeader: 'AI प्रक्रिया',
  sourceVoice: 'आवाज',
  sourceTouch: 'स्पर्श',
  sourceDocs: 'वैद्यकीय दस्तऐवज',
  structuredHistory: 'संघटित रुग्ण इतिहास',
  stageLabels: ['आवाज लिहणे', 'वैद्यकीय शब्द ओळख', 'माहिती काढणे', 'प्रमाणितीकरण', 'वैद्यकीय रचना'],
  disclaimer: 'डॉक्टरांच्या तपासणी आणि सल्ल्यासाठी तयार केले.',
  viewStructured: 'संघटित इतिहास पहा →',
  procReady: 'मसुदा डॉक्टरांची तपासणीसाठी तयार आहे.',
  procWorking: 'आवाज, स्पर्श आणि दस्तऐवज जोडले जात आहेत...',

  flagHeader: 'रेड फ्लॅग सुरक्षा सूचना',
  alertTitle: 'गंभीर लक्षणांचा आढावा आला',
  alertBody: 'दिलेल्या माहितीनुसार काही लक्षणांना वेळेवर तपासणीची गरज असू शकते.',
  alertPriority: 'कृपया तपासणीला प्राधान्य द्या.',
  urgent: 'प्राधान्य: तातडीचे',
  noReplace: 'ही प्रवेश प्रक्रिया डॉक्टरांच्या तपासणीची जागा घेत नाही',
  noDiagnosis: 'MediKiosk रोग सांगत नाही. ही केवळ सुरक्षा तपासणी आहे - ती नाव किंवा औषध सांगत नाही.',
  whatTriggered: 'स्क्रीन का सुरू झाली',
  ackText: 'मी ही माहिती रुग्णाला आणि सोबतीला दाखवली आहे',
  continueDashboard: 'डॉक्टर डॅशबोर्डकडे जा →',

  welcomeHeadline: 'रुग्णाचा इतिहास,\nडॉक्टरांना भेटण्यापूर्वीच\nतयार असतो.',
  welcomeBody:
    'MediKiosk रुग्णाशी त्याच्याच भाषेत बोलतो, त्याचे कागदपत्र वाचतो आणि संघटित वैद्यकीय इतिहासाचा मसुदा तयार करतो - जेणेकरून डॉक्टर क्लिपबोर्डच्या ऐवजी रुग्णाशी संवाद सुरू करू शकतात.',
  startHistory: 'रुग्णाचा इतिहास सुरू करा →',
  viewDashboard: 'डॉक्टर डॅशबोर्ड पहा',
  liveMode: 'लाइव्ह प्रदर्शन मोड',
  sihBadge: 'स्मार्ट इंडिया हॅकाथॉन 2026 - प्रोटोटाइप',
  featuresTitle: 'ओपीडीसाठी बनवलेले',
  featuresSub: 'पाच क्षमता, 90 सेकंदाची किओस्क प्रक्रिया',
  featureTitles: ['आवाजाने संवाद', 'स्पर्श आधारित इनपुट', 'बहुभाषिक सहाय्य', 'वैद्यकीय दस्तऐवज बुद्धिमत्ता', 'सुरक्षित आणि गोपनीय'],
  featureBodies: [
    'रुग्ण स्वतःच्या शब्दांत उत्तर देतो. आवाज वैद्यकीय शब्दांसहित लाइव्ह लिहिला जातो.',
    'मोठे बटणे, होय/नाही पर्याय आणि चित्रनिवड - वृद्ध आणि कमी शिक्षित वापरकर्त्यांसाठी.',
    'हिंदी, मराठी, गुजराती, बांगला, तमिळ आणि तेलुगू सहित १२ भारतीय भाषा.',
    'किओसकावरच पर्चे, लॅब रिपोर्ट आणि डिस्चार्ज सारांश वाचून संघटित डेटा तयार होतो.',
    'डेटा सुरक्षित ठेवला जातो, भेटीनंतर आपोआप हटवला जातो आणि रुग्णालय नेटवर्कच्या बाहेर जात नाही.',
  ],
  howTitle: 'हे कसे काम करते',
  howSub: 'रुग्ण → आवाज, स्पर्श आणि दस्तऐवज → AI प्रवेश → संघटित इतिहास → डॉक्टर तपासणी → सल्ला',
  howStages: ['रुग्ण', 'आवाज + स्पर्श + दस्तऐवज', 'MediKiosk AI इंजिन', 'संघटित वैद्यकीय इतिहास', 'डॉक्टर तपासणी', 'सल्ला'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'रुग्णालय नेटवर्कवर, ऑफलाइन-सक्षम',
  metaPurge: 'भेटीनंतर आपोआप हटवले जाते',
  designedFor: 'यांसाठी डिझाइन',
  designedForValue: 'सरकारी वैद्यकीय महाविद्यालय • AYUSH ओपीडी • जिल्हा रुग्णालये • व्यस्त ओपीडी',

  consentRecordTitle: 'संमती नोंद',
  consentRecordSub: 'या भेटीसोबत जोडली जाईल',
  consentRows: ['रुग्ण', 'संमती पद्धत', 'भाषा', 'किओसक', 'वेळ'],

  assistantName: 'MediKiosk सहाय्यक',
  intakeMode: 'वैद्यकीय प्रवेश मोड',
  chipsHeader: 'जे लागू होते ते स्पर्श करा',
  tapped: 'स्पर्श केला',
  typePlaceholder: 'समस्या इथे लिहा',
  confidenceLabel: 'काढण्याची अचूकता',
  inputMethodKv: 'इनपुट पद्धत',
  inputMethodInUse: 'वापरत असलेली इनपुट पद्धत',
  recordToContinue: 'पुढे जाण्यासाठी एक उत्तर नोंदवा',
  draftOnlyNotice: 'हा केवळ मसुदा आहे. प्रत्येक क्षेत्र डॉक्टरांची तपासणी झाल्यावरच केस शीटचा भाग बनेल.',
  micStart: 'बोलणे सुरू करा',
  micStop: 'रेकॉर्डिंग थांबवा',

  questionOf: 'प्रश्न {n} / {m}',
  doneTitle: 'संवाद पूर्ण झाला',
  doneBody: 'सर्व {m} प्रश्न विचारले गेले. उरलेले प्रश्न आवाजाच्या नोंदीवरून आपोआप सोडवले गेले - पुन्हा सांगावे लागले नाही.',
  badgeQuestions: '{n} प्रश्न',
  badgeDocuments: '{n} दस्तऐवज',
  badgeRedFlag: '{n} सुरक्षा संकेत',
  prevQuestion: 'मागील प्रश्न',
  panelNotice: 'हा पॅनल AI चा मसुदा आहे. यात रोग नाही आणि काहीही रुग्णाला निकाल म्हणून दाखवले जात नाही.',

  scanSub: 'OCR ते औषधे, तपासण्या आणि दिनांक काढते',
  scanHint: 'दस्तऐवज स्कॅनर बेडवर ठेवा किंवा कॅमेरा वापरा.',
  scanAgain: 'पुन्हा स्कॅन करा',
  docsRead: '{total} पैकी {done} दस्तऐवज वाचले',
  docsInProgress: '{n} चालू आहेत',

  procSub: 'आवाज, स्पर्श आणि दस्तऐवज एका इतिहासात जोडले जात आहेत',
  draftReadyTime: 'मसुदा ४.८ सेकंदात तयार',
  workingTitle: 'माहिती जोडली जात आहे...',
  badgeComplete: 'पूर्ण',
  badgeRunning: 'चालू',
  waitingEngine: 'इंजिनाची प्रतीक्षा...',
  outputReady: 'मसुदा तयार - १२ क्षेत्रे, ४ दस्तऐवज, ३ सुरक्षा संकेत',

  whatsNext: 'पुढे काय होईल',
  nextTitles: ['डॉक्टरांना सूचना दिसेल', 'आवश्यक तपासण्या आधी', 'रुग्णाला घाई नाही'],
  nextBodies: [
    'मसुदा इतिहास सुरक्षा बॅनरसह उघडेल.',
    'डॉक्टरने बोलवण्यापूर्वी नर्स BP, SpO2 आणि ECG नोंदवेल.',
    'किओसक रुग्णाला केवळ एवढे सांगतो की डॉक्टर लवकर बोलवतील.',
  ],
  showProtocol: 'आपत्ती प्रोटोकॉल दाखवा',
  demoNoCall: 'प्रदर्शन आवृत्ती - कोणतीही कॉल होत नाही',
  protocolTitle: 'आपत्ती प्रोटोकॉल',
  protocolBody: 'वास्तविक प्रणालीत हे रुग्णालयाचे आपत्ती विस्तार उघडेल आणि ड्युटी रजिस्ट्रारला कळवेल. हे प्रोटोटाइप असल्याने कोणतीही कॉल होत नाही.',
  closeLabel: 'बंद करा',
  emergencyNote: 'राष्ट्रीय आपत्ती क्रमांक: 108 · रुग्णालय विस्तार: 2211',

  successTitle: 'रुग्णाचा इतिहास यशस्वीरीत्या तयार झाला',
  successBody: 'किओसक प्रक्रिया पूर्ण झाली. या भेटीचा संघटित इतिहास आता डॉक्टरांच्या तपासणी आणि सल्ल्यासाठी तयार आहे.',
  flowTitles: ['रुग्ण', 'आवाज + स्पर्श + दस्तऐवज', 'AI वैद्यकीय प्रवेश', 'संघटित इतिहास', 'डॉक्टर तपासणी', 'सल्ला'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '१२ प्रश्न · ४ दस्तऐवज स्कॅन',
    'ट्रान्सक्रिप्शन, काढणे आणि सुरक्षा तपासणी',
    'कालरेखेसह SOAP मसुदा',
    'डॉ. ए. मेहतांनी तपासून सही केलेले',
    'डॉक्टर रुग्णाला भेटतात - कागदपत्रांना नाही',
  ],
  impactTitle: 'या किओसकचा परिणाम',
  impactLabels: ['एकूण प्रवेश वेळ', 'डॉक्टरांचा दस्तऐवजीकरण वेळ', 'सरासरी OCR अचूकता', 'रुग्णासाठी सोपेपण'],
  tagline: 'कमी वेळ दस्तऐवजांना.\nजास्त वेळ रुग्णसेवेला.',
  startNewDemo: 'नवे प्रदर्शन सुरू करा',
  backToDashboard: 'डॉक्टर डॅशबोर्डकडे परत',
  verifiedBadge: 'डॉक्टरने तपासलेले',
  unverifiedBadge: 'मसुदा अतपासलेला',
  endToEndJourney: 'सुरूातपासून शेवटपर्यंतची प्रक्रिया',
  journeyNotice: 'केवळ नमुना डेटा. MediKiosk इतिहासाचा मसुदा तयार करतो; अंतिम निर्णय नेहमी पात्र डॉक्टरांचाच असतो.',
  fieldCharacter: 'स्वरूप',
  fieldAssociated: 'संबंधित लक्षणे',
  fieldStatus: 'स्थिती',
  fieldOnset: 'सुरुवात',
  tapAnswer: 'सर्वात योग्य उत्तर स्पर्श करा',
  docHints: ['ओपीडी पर्चा', 'प्रयोगशाळेचा रिपोर्ट', 'मागील रुग्णालय भेट', 'छापलेला तपासणी रिपोर्ट'],
  processedBadge: 'डिव्हाइसवरच प्रक्रिया · {n} फाइलेस',
  consentModeAudio: 'आवाज + लिखित',
  consentModeWritten: 'लिखित',
  taglineSub: 'AI-सक्षम वैद्यकीय प्रवेश प्लॅटफॉर्म',

  dashTitle: 'रुग्णाचा डॅशबोर्ड',
  dashSub: 'मेडिसिन ओपीडी · डॉ. ए. मेहता · अपडेट {time}',
  dashLive: 'लाइव्ह',
  dashAttendant: 'सोबतीला व्यक्ती',
  dashKioskLabel: 'किओसक',
  dashLangLabel: 'भाषा',
  dashAttendantValue: '—',
  dashMale: 'पुरुष',
  dashAgeLine: '{age} वर्ष · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI ने तयार केलेला मसुदा - डॉक्टरांची तपासणी आवश्यक',
  dashBannerBody: 'खालील कोणतीही माहिती वैद्यकीयदृष्ट्या सत्यापित नाही. केस शीटमध्ये जोडण्यापूर्वी प्रत्येक क्षेत्र तपासा.',
  dashVerifiedTitle: 'डॉ. ए. मेहतांनी तपासलेले',
  dashVerifiedBody: 'मेडिसिन ओपीडी · {stamp} · ऑडिट ID AUD-77120',
  dashTabHistory: 'वैद्यकीय इतिहास',
  dashTabTimeline: 'वैद्यकीय कालरेखा',
  dashTabDocuments: 'दस्तऐवज',
  dashHpi: 'सध्याच्या आजाराचा इतिहास',
  dashPmh: 'मागील वैद्यकीय इतिहास',
  dashMeds: 'सध्याची औषधे',
  dashAllergies: 'अॅलर्जी',
  dashInvestigations: 'मागील तपासण्या',
  dashStructuredFields: 'किओसकावर नोंदवलेली संघटित क्षेत्रे',
  dashAuditNote: 'संपादने आपल्या डॉक्टर ID सह ऑडिट लॉगमध्ये नोंदवली जातात',
  dashEdit: 'संपादित करा',
  dashMedsNote: 'रुग्णानुसार - डोस MediKiosk ने तपासले नाहीत.',
  dashStatLabels: ['प्रश्न', 'दस्तऐवज', 'आवाजाची वेळ', 'सुरक्षा संकेत'],
  dashAyushBtn: 'AYUSH वैद्यकीय मोड उघडा',
  dashAyushAttached: 'AYUSH आकलन जोडले',
  dashNotScanned: 'स्कॅन झाले नाही',
  dashIntakeSummary: 'प्रवेश सारांश',
  flagLow: 'कमी',
  flagHigh: 'जास्त',
  flagNormal: 'सामान्य',
  dashEditHistory: 'इतिहास संपादित करा',
  dashSaveEdits: 'संपादन जतन करा',
  dashVerify: 'तपासा आणि स्वीकारा',
  dashVerifiedBtn: 'तपासलेले',
  dashSend: 'सल्ल्यासाठी पाठवा',
  dashConfirmTitle: 'हा इतिहास स्वीकारायचा?',
  dashConfirmBody: 'स्वीकारल्यावर हा मसुदा आपल्या डॉक्टर ID सह सही होऊन सल्ला रांगेत जाईल. आपली संपादने ऑडिट लॉगमध्ये राहतील.',
  dashConfirmYes: 'होय, इतिहास तपासा',
  dashCancel: 'रद्द करा',
  timelineTitle: 'वैद्यकीय कालरेखा',
  timelineSub: 'किओसक प्रवेश आणि रुग्णालय नोंदी एकत्रित',
  timelineTitles: ['किओसकवर प्रवेश सुरू', 'मुख्य तक्रर नोंदवली', 'दस्तऐवज स्कॅन', 'सुरक्षा तपासणी', 'इतिहास संघटित', 'डॉक्टर तपासणी'],
  timelineBodies: [
    '{kiosk} वर नोंदणी · भाषा {lang}',
    'मुख्य तक्रर नोंदवली: {complaint}',
    'या सत्रात {n} दस्तऐवज स्कॅन झाले',
    'नियम-आधारित सुरक्षा तपासणी पूर्ण - {n} संकेत पुढे पाठवले',
    'डॉक्टरांच्या तपासणीसाठी संघटित इतिहास तयार',
    'तपासून सल्ला रांगेत सोडवले',
  ],

  ayushModeTitle: 'AYUSH वैद्यकीय आकलन मोड',
  ayushModeSub: 'त्याच रुग्णासाठी समांतर आयुर्वेदिक आकलन',
  ayushDosha: 'दोष संतुलन',
  ayushDoshaSub: '४२ प्रश्नांच्या उत्तरांवरून',
  ayushInterpLabel: 'व्याख्या (मसुदा)',
  ayushInterpBody: 'आग्नेय प्रकृतीवर पित्त वाढीची विकृती. अग्नी तीक्ष्ण आणि कोष्ठ मृदु - किओसकावर सांगितलेल्या आहार व झोपेच्या नमुन्याशी सुसंगत. डॉक्टरांनी सहसंबंध तपासावा.',
  ayushDasha: 'दशविध परीक्षा',
  ayushDashaSub: 'किओसकावर नोंदवलेली दहा-सूत्री परीक्षा',
  ayushTablePart: 'परीक्षा',
  ayushTableFinding: 'निकाल',
  ayushInclude: 'रुग्ण इतिहासात जोडा',
  ayushIncluded: 'रुग्ण इतिहासात जोडले',
  ayushBack: 'डॉक्टर डॅशबोर्डकडे परत',

  extractTitle: 'लाइव्ह वैद्यकीय माहिती',
  extractSub: 'रुग्ण बोलतानाच अपडेट होते',
  scannedBadge: 'स्कॅन झाले',
  readingBadge: 'वाचले जात आहे',
  engineSub: 'ASR · NER · OCR · नियम-आधारित सुरक्षा तपासणी',
  crashTeam: 'आपत्ती टीम तयार - मुख्य OT गलियारा',
  declineNote: 'नाकारल्यास आपल्या उपचारांवर काही परिणाम होणार नाही. नर्स आपला इतिहास स्वतः नोंदवेल.',
  send: 'पाठवा',
  sttCaptured: '✓ आवाज नोंदवली',
  sttDenied: 'आवाजासाठी मायक्रोफोनची आवश्यकता आहे. कृपया मायक्रोफोनला परवानगी द्या किंवा लिहण्याचा पर्याय वापरा.',
  sttUnsupported: 'या ब्राउझरमध्ये आवाज ओळख उपलब्ध नाही. कृपया लिहण्याचा पर्याय वापरा.',
  sttNoSpeech: 'कोणताही आवाज ऐकू आला नाही. कृपया पुन्हा प्रयत्न करा.',
  patientResponse: 'रुग्णाचे उत्तर',
  printReport: 'रिपोर्ट प्रिंट करा',
  downloadPdf: 'PDF डाउनलोड करा',
  pdfDownloaded: '✓ रुग्ण इतिहास रिपोर्ट यशस्वीरित्या डाउनलोड झाली',
  generatingReport: 'रिपोर्ट तयार होत आहे...',
  reportTitle: 'संघटित रुग्ण इतिहास',
  generatedOn: 'तयार करण्याची वेळ',
  reportDocs: 'पाहिलेले वैद्यकीय दस्तऐवज',
  aiSummaryTitle: 'AI-सहाय्याने तयार केलेला वैद्यकीय सारांश',
  aiSummarySub: 'रुग्णाची माहिती, आवाजाने झालेला संवाद आणि वैद्यकीय दस्तऐवजांवरून डॉक्टरांच्या तपासणीसाठी संघटित केले.',
  physicianReview: 'डॉक्टरांची तपासणी आवश्यक',
  extractedFromDocs: 'अपलोड/स्कॅन केलेल्या दस्तऐवजांमधून काढले',
  pdfPrinted: '✓ रुग्ण इतिहास रिपोर्ट प्रिंटसाठी पाठवली',

  piTitle: 'रुग्णाची माहिती',
  piSub: 'कृपया आपली माहिती भरा जेणेकरून सल्ल्यापूर्वी डॉक्टर आपल्याविषयी जाणू शकतील.',
  piName: 'पूर्ण नाव',
  piNameHint: 'आपल्या ओळखपत्रानुसार',
  piAge: 'वय',
  piGender: 'लिंग',
  piMale: 'पुरुष',
  piFemale: 'स्त्री',
  piOther: 'इतर',
  piPhone: 'मोबाइल क्रमांक',
  piCity: 'शहर',
  piState: 'राज्य',
  piStatePlaceholder: 'राज्य निवडा',
  piSelectStateFirst: 'आधी राज्य निवडा',
  piStateErr: 'कृपया आपला राज्य निवडा',
  piCityErr: 'कृपया आपले शहर निवडा',
  piCityPlaceholder: 'शहर निवडा',
  searchPlaceholder: 'शोधा',
  piComplaint: 'मुख्य समस्या / रुग्णालयात येण्याचे कारण',
  piComplaintHint: 'आज का आलात हे आपल्या शब्दांत सांगा',
  piNameErr: 'कृपया पूर्ण नाव लिहा',
  piAgeErr: 'कृपया योग्य वय लिहा (1-120)',
  piPhoneErr: 'कृपया वैध 10 अंकी मोबाइल क्रमांक भरा',
  piPhonePlaceholder: '10 अंकी मोबाइल क्रमांक भरा',
  piComplaintErr: 'कृपया आपली मुख्य समस्या सांगा',
  piFormNote: 'ही माहिती केवळ आजच्या भेटीसाठी आहे आणि आपल्या किओसक सत्राशी जोडली जाईल.',
  emptyNone: 'किओसकावर सांगितले नाही',
  dashPhoneLabel: 'मोबाइल',
  dashCityLabel: 'शहर',
  docDate: 'दस्तऐवजाची तारीख',
  docMedication: 'औषध',
  docInvestigation: 'तपासणी',
  docTranscribed: 'स्कॅन केलेल्या दस्तऐवजातून लिहिले',
  riskFlagDetail: '{age} वयाचे, प्रवेशावर अनेक हृदय धोक्याचे घटक सांगितले',
  categoryLabels: { headache: 'डोकीदुखी', chest: 'छातीत दुखार', abdomen: 'पोटदुखी', cough: 'खोकला', fever: 'ताप', general: 'सामान्य' },
  interview: {
    headache: ['डोकीदुखी कधीपासून आहे?', 'डोकीदुखी अचानक सुरू झाले की हळूहळू?', 'डोकीच्या कोपऱ्याला दुखत आहे का?', 'दुखणे कसे वाटते - धडकणारे की दाबणारे?'],
    chest: ['छातीत दुखणे कधी सुरू झाले?', 'दुखणे कुठे होत आहे?', 'दुखणे कुठे पसरत आहे?', 'चालण्याने दुखणे वाढते का?'],
    abdomen: ['पोटदुखी कधी सुरू झाली?', 'पोटात कुठे दुखत आहे - वर, खाली, डावीकडे की उजवीकडे?', 'जेवणानंतर दुखणे बदलते का?', 'शौच जाण्याने आराम मिळतो का?'],
    cough: ['खोकला कधीपासून आहे?', 'खोकल्यात कफ येतो की कोरडा खोकला आहे?', 'खोकला झोपेला बाधित करतो का?', 'चालताना श्वास फुलतो का?'],
    fever: ['ताप कधीपासून आहे?', 'ताप रात्री जास्त राहतो की दिवसा?', 'ताब्यासोबत बददुखी की घाम आहे का?', 'भूकिर्दा कमी वाटतात का?'],
    general: ['ही समस्या कधीपासून आहे?', 'हीच समस्या आधीही झाली होती का?', 'आता आपण काही औषध घेत आहात का?', 'आपल्याला कोणत्याही गोष्टीची अॅलर्जी आहे का?', 'आपण धूम्रपान किंवा तंबाखू घेता का?'],
  },
  voiceAnswer: 'आवाजाने उत्तर नोंदवले',
  quickYes: 'होय',
  quickNo: 'नाही',
  quickUnknown: 'माहीत नाही',
  riskFlagTitle: 'वय व धोक्याच्या घटकांचा नमुना',
  flagTemplates: {
    headache: { title: 'अचानक किंवा तीव्र डोकीदुखाचा नमुना', detail: 'अचानक, तीव्र किंवा मागील वेळांपेक्षा वेगळा डोकीदुख लवकर वैद्यकीय तपासणीची गरज ठेवू शकतो.' },
    chest: { title: 'वेळेत तपासणीची गरज असलेला छातीदुखाचा नमुना', detail: 'व्यायामाशी संबंधित किंवा सहवर्ती लक्षणांसह असलेला छातीदुख लवकर वैद्यकीय तपासणीची गरज ठेवू शकतो.' },
    abdomen: { title: 'सतत उदरवेदनेचा नमुना', detail: 'तीव्र किंवा थांबत नसलेली पोटवेदना, विशेषतः उलट्यांसह, लवकर तपासणीची गरज ठेवू शकतो.' },
    cough: { title: 'दीर्घ किंवा श्वासघातासह खोकल्याचा नमुना', detail: 'आठवड्यानुसार चालणारा किंवा श्वास फुलण्यासह असलेला खोकला वैद्यकीय तपासणीची गरज ठेवू शकतो.' },
    fever: { title: 'दीर्घकाळ तापाचा नमुना', detail: 'दिवसानुसार चालणारा ताप किंवा कमी आहारासह ताप वैद्यकीय तपासणीची गरज ठेवू शकतो.' },
    general: { title: 'सतत किंवा वाढणारी तक्रर', detail: 'चालू किंवा वाढणारी तक्रर वेळेत डॉक्टरने तपासली पाहिजे.' },
  },
};

const GU: Strings = {
  back: '← પાછળ',
  continueBtn: 'આગળ વધો →',

  consentHeader: 'દર્દીની સંમતિ',
  consentTitle: 'શરૂ કરતા પહેલાં',
  consentIntro: 'MediKiosk તમારા સ્વાસ્થ્ય વિશે પ્રશ્નો પૂછશે અને તમારા ડૉક્ટર માટે તબીબી ઇતિહાસ તૈયાર કરવા માહિતી એકત્રિત કરશે.',
  whyTitle: 'આ માહિતી શા માટે એકત્રિત કરવામાં આવે છે?',
  whyBody: 'સલાહ પહેલાં તમારો તબીબી ઇતિહાસ તૈયાર કરવા માટે.',
  privacyTitle: 'ગોપનીયતા',
  privacyBody: 'તમારી માહિતી આ પ્રદર્શન માટે છે અને તેને સુરક્ષિત રાખવી જોઈએ.',
  importantTitle: 'મહત્વનું',
  importantBody: 'MediKiosk કોઈ રોગ જણાવતું નથી અને દવા લખતું નથી.',
  listenExplanation: 'સમજૂતી સાંભળો',
  playingExplanation: 'સમજૂતી ચાલુ છે...',
  audioSuffix: 'સેકન્ડનો સારાંશ, સાંભળવા ઇચ્છતા લોકો માટે',
  consentCheckbox: 'મને સમજાય છે કે મારી માહિતી મારો તબીબી ઇતિહાસ તૈયાર કરવા વપરાશે.',
  consentBtn: 'મને સમજાયું અને સંમત છું →',

  convHeader: 'AI દર્દી વાતચીત',
  convSub: 'બોલો, લખો કે સ્પર્શ કરો - તમારા શબ્દોમાં જવાબ આપો',
  greeting: 'નમસ્તે {name}. કઈ સમસ્યાને કારણે તમારે હોસ્પિટલ આવવું પડ્યું?',
  patientReply: 'મને આરોગ્ય સમસ્યા માટે મદદ જોઈએ છે.',
  aiThanks: 'આભાર. તમારો જવાબ મને સમજાયો. હવે થોડા સરળ પ્રશ્નો પૂછીશ - એમાં 2-3 મિનિટ લાગશે.',
  speakNow: 'હવે બોલો...',
  processingSpeech: 'અવાજને લખવામાં આવે છે...',
  tapToSpeak: 'માઇક્રોફોન દબાવીને તમારા શબ્દોમાં જવાબ આપો.',
  capturedAgain: 'જવાબ નોંધાયો. ફરી બોલવા માટે દબાવો.',
  lblSpeak: 'બોલો',
  lblType: 'લખો',
  lblTouch: 'સ્પર્શ',
  readyLabel: 'તૈયાર',
  listeningLabel: 'સાંભળી રહ્યા છીએ',
  processingLabel: 'પ્રક્રિયા',
  capturedLabel: 'નોંધાયું',
  continueInterview: 'વાતચીત ચાલુ રાખો →',
  capturedViaVoice: 'અવાજથી નોંધાયું',
  chips: ['પરસેવો', 'બેચૈની', 'ચક્કર', 'ઉબકા', 'નબળાઈ', 'બીજી કોઈ સમસ્યા નથી'],

  adaptiveHeader: 'અનુકૂલ પ્રશ્નો',
  adaptiveSub: 'તમારી ફરિયાદ પરથી પૂછાનારા પ્રશ્નો',
  questions: ['દુખાવો ક્યારે શરૂ થયો?', 'દુખાવો શરીરમાં ક્યાં થાય છે?', 'દુખાવો ક્યાંય ફેલાય છે?', 'શું કોઈ વાતથી દુખાવો વધે કે ઘટે?'],
  qOptions: [
    ['આજે સવારે જ', 'બે દિવસ પહેલાં', 'એક અઠવાડિયાથી', 'અગાઉ પણ થયો હતો'],
    ['છાતીની વચ્ચે', 'ડાબી છાતીમાં', 'જમણી છાતીમાં', 'પેટની ઉપર'],
    ['હા, ડાબા હાથમાં', 'હા, ગળા અને જડિયામાં', 'હા, પીઠમાં', 'ના, ત્યાં જ રહે છે'],
    ['ચાલવાથી વધે છે', 'આરામથી ઘટે છે', 'શ્વાસ લેવાથી વધે છે', 'જમ્યા પછી વધે છે'],
  ],
  skipQuestion: 'આ પ્રશ્ન છોડો',
  clinicalInfo: 'તબીબી માહિતી',
  clinicalInfoSub: 'દરેક જવાબ સાથે માહિતી અપડેટ થાય છે',
  rows: { complaint: 'મુખ્ય ફરિયાદ', duration: 'સમયગાળો', location: 'સ્થાન', radiation: 'ફેલાવો', aggravating: 'વધારતા પરિબળો', relieving: 'ઘટાડતા પરિબળો' },
  pending: 'પ્રતીક્ષામાં',
  questionsAnswered: 'પૂછેલા પ્રશ્નો',
  continueDocs: 'દસ્તાવેજો તરફ જાઓ',
  branchNotice: 'શાખા તર્ક: "{complaint}" પરથી સંબંધિત પ્રશ્નો આપોઆપ પસંદ થયા.',

  scanHeader: 'તબીબી દસ્તાવેજ સ્કેનિંગ',
  scanTitle: 'તમારા તબીબી દસ્તાવેજો સ્કેન કરો',
  scanIntro: 'જૂના તબીબી દસ્તાવેજો ઉમેરો જેથી MediKiosk ડૉક્ટર માટે જરૂરી માહિતી કાઢી શકે.',
  docTitles: ['પરચૂરો', 'લેબ રિપોર્ટ', 'ડિસ્ચાર્જ સારાંશ', 'તપાસ રિપોર્ટ'],
  scanAll: 'બધા દસ્તાવેજો સ્કેન કરો',
  scanLabel: 'સ્કેન કરો',
  ocrPipeline: 'OCR પ્રક્રિયા',
  stages: ['દસ્તાવેજ અપલોડ', 'સ્કેનિંગ', 'લખાણ ઓળખ', 'તબીબી શબ્દ ઓળખ', 'માળખાકીય ડેટા'],
  extractedInfo: 'કાઢેલી માહિતી',
  extractionComplete: 'કાઢવાનું પૂર્ણ',
  ocrConfidence: 'OCR ચોકસાઈ',
  draftNote: 'કાઢેલી માહિતી એ મસૂદો છે અને ડૉક્ટરની ચકાસણી જરૂરી છે.',
  scanNotice: 'કાઢેલી માહિતી મસૂદો છે અને ડૉક્ટરની ચકાસણી જરૂરી છે. MediKiosk પરિણામ સમજાવતું નથી કે દવા બદલતું નથી.',

  procHeader: 'AI પ્રક્રિયા',
  sourceVoice: 'અવાજ',
  sourceTouch: 'સ્પર્શ',
  sourceDocs: 'તબીબી દસ્તાવેજો',
  structuredHistory: 'માળખાકીય દર્દી ઇતિહાસ',
  stageLabels: ['અવાજ લખવો', 'તબીબી શબ્દ ઓળખ', 'માહિતી કાઢવી', 'પ્રમાણિકરણ', 'તબીબી માળખું'],
  disclaimer: 'ડૉક્ટરની સમીક્ષા અને સલાહ માટે તૈયાર કરાયું.',
  viewStructured: 'માળખાકીય ઇતિહાસ જુઓ →',
  procReady: 'મસૂદો ડૉક્ટરની ચકાસણી માટે તૈયાર છે.',
  procWorking: 'અવાજ, સ્પર્શ અને દસ્તાવેજો જોડવામાં આવે છે...',

  flagHeader: 'રેડ ફ્લેગ સુરક્ષા સૂચના',
  alertTitle: 'ગંભીર લક્ષણોની નોંધ',
  alertBody: 'આપેલી માહિતી મુજબ કેટલાક લક્ષણોને સમયસર તપાસની જરૂર પડી શકે છે.',
  alertPriority: 'કૃપા કરીને તપાસને પ્રાથમિકતા આપો.',
  urgent: 'પ્રાથમિકતા: તાત્કાલિક',
  noReplace: 'આ પ્રવેશ પ્રક્રિયા ડૉક્ટરની તપાસની જગ્યા લેતી નથી',
  noDiagnosis: 'MediKiosk કોઈ રોગ જણાવતું નથી. આ માત્ર સુરક્ષા તપાસ છે - તે નામ કે દવા જણાવતું નથી.',
  whatTriggered: 'સ્ક્રીન શા માટે ચાલુ થઈ',
  ackText: 'મેં આ સૂચના દર્દી અને સાથે આવેલા વ્યક્તિને બતાવી છે',
  continueDashboard: 'ડૉક્ટર ડેશબોર્ડ પર જાઓ →',

  welcomeHeadline: 'દર્દીનો ઇતિહાસ,\nડૉક્ટરને મળવા પહેલાં જ\nતૈયાર.',
  welcomeBody:
    'MediKiosk દર્દી સાથે તેની જ ભાષામાં વાત કરે છે, તેના દસ્તાવેજો વાંચે છે અને સંઘિત તબીબી ઇતિહાસનો મસૂદો તૈયાર કરે છે - જેથી ડૉક્ટર ક્લિપબોર્ડને બદલે દર્દી સાથે સલાહ શરૂ કરી શકે.',
  startHistory: 'દર્દીનો ઇતિહાસ શરૂ કરો →',
  viewDashboard: 'ડૉક્ટર ડેશબોર્ડ જુઓ',
  liveMode: 'લાઇવ પ્રદર્શન મોડ',
  sihBadge: 'સ્માર્ટ ઇન્ડિયા હેકાથોન 2026 - પ્રોટોટાઇપ',
  featuresTitle: 'ઓપીડી માટે રચાયેલ',
  featuresSub: 'પાંચ ક્ષમતાઓ, 90 સેકન્ડની કિઓસ્ક પ્રક્રિયા',
  featureTitles: ['અવાજ સાથે વાતચીત', 'સ્પર્શ આધારિત ઇનપુટ', 'બહુભાષી સહાય', 'તબીબી દસ્તાવેજ બુદ્ધિમત્તા', 'સુરક્ષિત અને ખાનગી'],
  featureBodies: [
    'દર્દી પોતાના શબ્દોમાં જવાબ આપે છે. અવાજને તબીબી શબ્દો સાથે લાઇવ લખાય છે.',
    'મોટા બટનો, હા/ના વિકલ્પો અને ચિત્ર પસંદગી - વૃદ્ધો અને ઓછા શિક્ષિત વપરાશકર્તાઓ માટે.',
    'હિન્દી, મરાઠી, ગુજરાતી, બંગાળી, તમિલ અને તેલુગુ સહિત 12 ભારતીય ભાષાઓ.',
    'કિઓસ્ક પર જ પરચૂરા, લેબ રિપોર્ટ અને ડિસ્ચાર્જ સારાંશ વાંચીને સંઘિત ડેટા બને છે.',
    'ડેટા સુરક્ષિત રાખાય છે, મુલાકાત પછી આપોઆપ દૂર થાય છે અને હોસ્પિટલ નેટવર્કની બહાર જતો નથી.',
  ],
  howTitle: 'આ કેવી રીતે કામ કરે છે',
  howSub: 'દર્દી → અવાજ, સ્પર્શ અને દસ્તાવેજો → AI પ્રવેશ → સંઘિત ઇતિહાસ → ડૉક્ટર ચકાસણી → સલાહ',
  howStages: ['દર્દી', 'અવાજ + સ્પર્શ + દસ્તાવેજો', 'MediKiosk AI ઇન્જિન', 'સંઘિત તબીબી ઇતિહાસ', 'ડૉક્ટર ચકાસણી', 'સલાહ'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'હોસ્પિટલ નેટવર્ક પર, ઓફલાઇન-સક્ષમ',
  metaPurge: 'મુલાકાત પછી આપોઆપ દૂર થાય છે',
  designedFor: 'આ માટે ડિઝાઇન',
  designedForValue: 'સરકારી મેડિકલ કોલેજો • AYUSH ઓપીડી • જિલ્લા હોસ્પિટલો • વ્યસ્ત ઓપીડી',

  consentRecordTitle: 'સંમતિ નોંધ',
  consentRecordSub: 'આ મુલાકાત સાથે જોડાશે',
  consentRows: ['દર્દી', 'સંમતિ પદ્ધતિ', 'ભાષા', 'કિઓસ્ક', 'સમય'],

  assistantName: 'MediKiosk સહાયક',
  intakeMode: 'તબીબી પ્રવેશ મોડ',
  chipsHeader: 'જે લાગુ પડે તે સ્પર્શ કરો',
  tapped: 'સ્પર્શ કર્યું',
  typePlaceholder: 'સમસ્યા અહીં લખો',
  confidenceLabel: 'કાઢવાની ચોકસાઈ',
  inputMethodKv: 'ઇનપુટ પદ્ધતિ',
  inputMethodInUse: 'વપરાતી ઇનપુટ પદ્ધતિ',
  recordToContinue: 'આગળ વધવા માટે એક જવાબ નોંધો',
  draftOnlyNotice: 'આ માત્ર મસૂદો છે. ડૉક્ટરની ચકાસણી પછી જ દરેક માહિતી કેસ શીટનો ભાગ બનશે.',
  micStart: 'બોલવાનું શરૂ કરો',
  micStop: 'રેકોર્ડિંગ બંધ કરો',

  questionOf: 'પ્રશ્ન {n} / {m}',
  doneTitle: 'વાતચીત પૂર્ણ',
  doneBody: 'બધા {m} પ્રશ્નો પૂછાયા. બાકીના પ્રશ્નો અવાજની નોંધમાંથી આપોઆપ ઉકેલાયા - ફરી કહેવું પડ્યું નહીં.',
  badgeQuestions: '{n} પ્રશ્નો',
  badgeDocuments: '{n} દસ્તાવેજો',
  badgeRedFlag: '{n} સુરક્ષા સંકેત',
  prevQuestion: 'પહેલાનો પ્રશ્ન',
  panelNotice: 'આ પેનલ AI નો મસૂદો છે. અહીં કોઈ રોગ નથી અને કંઈપણ દર્દીને પરિણામ તરીકે બતાવાતું નથી.',

  scanSub: 'OCR દવાઓ, તપાસો અને તારીખો કાઢે છે',
  scanHint: 'દસ્તાવેજ સ્કેનર બેડ પર મૂકો અથવા કેમેરો વાપરો.',
  scanAgain: 'ફરી સ્કેન કરો',
  docsRead: '{total} માંથી {done} દસ્તાવેજો વાંચ્યા',
  docsInProgress: '{n} ચાલુ છે',

  procSub: 'અવાજ, સ્પર્શ અને દસ્તાવેજો એક ઇતિહાસમાં જોડાય છે',
  draftReadyTime: 'મસૂદો 4.8 સેકન્ડમાં તૈયાર',
  workingTitle: 'માહિતી જોડાય છે...',
  badgeComplete: 'પૂર્ણ',
  badgeRunning: 'ચાલુ',
  waitingEngine: 'ઇન્જિનની રાહ જોઈ રહ્યા છીએ...',
  outputReady: 'મસૂદો તૈયાર - 12 માહિતી, 4 દસ્તાવેજો, 3 સુરક્ષા સંકેત',

  whatsNext: 'આગળ શું થશે',
  nextTitles: ['ડૉક્ટરને સૂચના દેખાશે', 'જરૂરી તપાસ પહેલાં', 'દર્દી ગભરાશે નહીં'],
  nextBodies: [
    'મસૂદો ઇતિહાસ સુરક્ષા બેનર સાથે ખૂલશે.',
    'ડૉક્ટર બોલાવતા પહેલાં નર્સ BP, SpO2 અને ECG નોંધશે.',
    'કિઓસ્ક દર્દીને માત્ર એટલું કહે છે કે ડૉક્ટર જલ્દી બોલાવશે.',
  ],
  showProtocol: 'આપાતકાલીન પ્રોટોકોલ બતાવો',
  demoNoCall: 'પ્રદર્શન આવૃત્તિ - કોઈ કૉલ થતી નથી',
  protocolTitle: 'આપાતકાલીન પ્રોટોકોલ',
  protocolBody: 'વાસ્તવિક સિસ્ટમમાં આ હોસ્પિટલનું આપાતકાલીન નંબર ખોલે અને ડ્યુટી રજિસ્ટ્રારને જાણ કરે. આ પ્રોટોટાઇપ છે, તેથી કોઈ કૉલ થતી નથી.',
  closeLabel: 'બંધ કરો',
  emergencyNote: 'રાષ્ટ્રીય આપાતકાલીન નંબર: 108 · હોસ્પિટલ એક્સટેન્શન: 2211',

  successTitle: 'દર્દીનો ઇતિહાસ સફળતાપૂર્વક તૈયાર',
  successBody: 'કિઓસ્ક પ્રક્રિયા પૂર્ણ થઈ. આ મુલાકાતનો સંઘિત ઇતિહાસ હવે ડૉક્ટરની ચકાસણી અને સલાહ માટે તૈયાર છે.',
  flowTitles: ['દર્દી', 'અવાજ + સ્પર્શ + દસ્તાવેજો', 'AI તબીબી પ્રવેશ', 'સંઘિત ઇતિહાસ', 'ડૉક્ટર ચકાસણી', 'સલાહ'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '12 પ્રશ્નો · 4 દસ્તાવેજો સ્કેન',
    'ટ્રાન્સક્રિપ્શન, કાઢવું અને સુરક્ષા તપાસ',
    'સમયરેખા સાથે SOAP મસૂદો',
    'ડૉ. એ. મેહતાએ ચકાસીને સહી કરેલ',
    'ડૉક્ટર દર્દીને મળે છે - કાગળોને નહીં',
  ],
  impactTitle: 'આ કિઓસ્કની અસર',
  impactLabels: ['કુલ પ્રવેશ સમય', 'ડૉક્ટરનો દસ્તાવેજીકરણ સમય', 'સરેરાશ OCR ચોકસાઈ', 'દર્દી માટે સરળતા'],
  tagline: 'ઓછો સમય દસ્તાવેજોમાં.\nવધુ સમય દર્દીની સેવામાં.',
  startNewDemo: 'નવું પ્રદર્શન શરૂ કરો',
  backToDashboard: 'ડૉક્ટર ડેશબોર્ડ પર પાછા',
  verifiedBadge: 'ડૉક્ટરે ચકાસેલ',
  unverifiedBadge: 'મસૂદો અચકાસાયેલ',
  endToEndJourney: 'શરૂઆતથી અંત સુધીની પ્રક્રિયા',
  journeyNotice: 'માત્ર નમૂના ડેટા. MediKiosk ઇતિહાસનો મસૂદો બનાવે છે; અંતિમ નિર્ણય હંમેશા લાયક ડૉક્ટરનો હોય છે.',
  fieldCharacter: 'સ્વરૂપ',
  fieldAssociated: 'સંબંધિત લક્ષણો',
  fieldStatus: 'સ્થિતિ',
  fieldOnset: 'શરૂઆત',
  tapAnswer: 'સૌથી યોગ્ય જવાબ સ્પર્શ કરો',
  docHints: ['ઓપીડી પરચૂરો', 'લેબોરેટરી રિપોર્ટ', 'પહેલાની હોસ્પિટલ મુલાકાત', 'છપાયેલો તપાસ રિપોર્ટ'],
  processedBadge: 'ડિવાઇસ પર જ પ્રક્રિયા · {n} ફાઇલો',
  consentModeAudio: 'અવાજ + લખિત',
  consentModeWritten: 'લખિત',
  taglineSub: 'AI-સક્ષમ તબીબી પ્રવેશ પ્લેટફોર્મ',

  dashTitle: 'દર્દીનું ડેશબોર્ડ',
  dashSub: 'મેડિસિન ઓપીડી · ડૉ. એ. મેહતા · અપડેટ {time}',
  dashLive: 'લાઇવ',
  dashAttendant: 'સાથે આવેલ વ્યક્તિ',
  dashKioskLabel: 'કિઓસ્ક',
  dashLangLabel: 'ભાષા',
  dashAttendantValue: '—',
  dashMale: 'પુરુષ',
  dashAgeLine: '{age} વર્ષ · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI દ્વારા બનાવેલો મસૂદો - ડૉક્ટરની ચકાસણી જરૂરી',
  dashBannerBody: 'નીચેની કોઈ માહિતી તબીબી રીતે ચકાસાયેલ નથી. કેસ શીટમાં ઉમેરતા પહેલાં દરેક માહિતી તપાસો.',
  dashVerifiedTitle: 'ડૉ. એ. મેહતાએ ચકાસેલ',
  dashVerifiedBody: 'મેડિસિન ઓપીડી · {stamp} · ઓડિટ ID AUD-77120',
  dashTabHistory: 'તબીબી ઇતિહાસ',
  dashTabTimeline: 'તબીબી સમયરેખા',
  dashTabDocuments: 'દસ્તાવેજો',
  dashHpi: 'વર્તમાન બીમારીનો ઇતિહાસ',
  dashPmh: 'પહેલાનો તબીબી ઇતિહાસ',
  dashMeds: 'વર્તમાન દવાઓ',
  dashAllergies: 'એલર્જી',
  dashInvestigations: 'પહેલાની તપાસો',
  dashStructuredFields: 'કિઓસ્ક પર નોંધાયેલી સંઘિત માહિતી',
  dashAuditNote: 'સંશોધનો તમારા ડૉક્ટર ID સાથે ઓડિટ લૉગમાં નોંધાય છે',
  dashEdit: 'સંપાદિત કરો',
  dashMedsNote: 'દર્દીના જણાવ્યા મુજબ - ડોસ MediKiosk દ્વારા ચકાસાયેલ નથી.',
  dashStatLabels: ['પ્રશ્નો', 'દસ્તાવેજો', 'અવાજનો સમય', 'સુરક્ષા સંકેતો'],
  dashAyushBtn: 'AYUSH તબીબી મોડ ખોલો',
  dashAyushAttached: 'AYUSH આકલન જોડાયું',
  dashNotScanned: 'સ્કેન થયું નથી',
  dashIntakeSummary: 'પ્રવેશ સારાંશ',
  flagLow: 'ઓછું',
  flagHigh: 'વધારે',
  flagNormal: 'સામાન્ય',
  dashEditHistory: 'ઇતિહાસ સંપાદિત કરો',
  dashSaveEdits: 'સંશોધનો સાચવો',
  dashVerify: 'ચકાસો અને ખાતરી કરો',
  dashVerifiedBtn: 'ચકાસાયેલ',
  dashSend: 'સલાહ માટે મોકલો',
  dashConfirmTitle: 'આ ઇતિહાસ ખાતરી કરવો?',
  dashConfirmBody: 'ખાતરી કરતાં આ મસૂદો તમારા ડૉક્ટર ID થી સહી થઈને સલાહ કતારમાં જશે. તમારા સંશોધનો ઓડિટ લૉગમાં રહેશે.',
  dashConfirmYes: 'હા, ઇતિહાસ ચકાસો',
  dashCancel: 'રદ કરો',
  timelineTitle: 'તબીબી સમયરેખા',
  timelineSub: 'કિઓસ્ક પ્રવેશ અને હોસ્પિટલ નોંધોનું એકત્રીકરણ',
  timelineTitles: ['કિઓસ્ક પર પ્રવેશ શરૂ', 'મુખ્ય ફરિયાદ નોંધાઈ', 'દસ્તાવેજો સ્કેન', 'સુરક્ષા તપાસ', 'ઇતિહાસ સંઘિત', 'ડૉક્ટર ચકાસણી'],
  timelineBodies: [
    '{kiosk} પર ચેક-ઇન · ભાષા {lang}',
    'મુખ્ય ફરિયાદ નોંધાઈ: {complaint}',
    'આ સત્રમાં {n} દસ્તાવેજો સ્કેન થયા',
    'નિયમ-આધારિત સુરક્ષા તપાસ પૂર્ણ - {n} સંકેતો આગળ મોકલાયા',
    'ડૉક્ટરની સમીક્ષા માટે સંઘિત ઇતિહાસ તૈયાર',
    'ચકાસીને સલાહ કતારમાં મોકલાયો',
  ],

  ayushModeTitle: 'AYUSH તબીબી આકલન મોડ',
  ayushModeSub: 'એ જ દર્દી માટે સમાંતર આયુર્વેદિક આકલન',
  ayushDosha: 'દોષ સંતુલન',
  ayushDoshaSub: '42 પ્રશ્નોના જવાબોમાંથી',
  ayushInterpLabel: 'વ્યાખ્યા (મસૂદો)',
  ayushInterpBody: 'આગ્નેય પ્રકૃતિ પર પિત્ત વધારાની વિકૃતિ. અગ્નિ તીક્ષ્ણ અને કોષ્ઠ મૃદુ - કિઓસ્ક પર જણાવેલા આહાર અને ઊંઘના નમૂના સાથે સુસંગત. ડૉક્ટરે સંબંધ તપાસવો જોઈએ.',
  ayushDasha: 'દશવિધ પરીક્ષા',
  ayushDashaSub: 'કિઓસ્ક પર નોંધાયેલ દસ-સૂત્રી પરીક્ષા',
  ayushTablePart: 'પરીક્ષા',
  ayushTableFinding: 'પરિણામ',
  ayushInclude: 'દર્દીના ઇતિહાસમાં ઉમેરો',
  ayushIncluded: 'દર્દીના ઇતિહાસમાં ઉમેરાયું',
  ayushBack: 'ડૉક્ટર ડેશબોર્ડ પર પાછા',

  extractTitle: 'લાઇવ તબીબી માહિતી',
  extractSub: 'દર્દી બોલતાં જ અપડેટ થાય છે',
  scannedBadge: 'સ્કેન થયું',
  readingBadge: 'વંચાય છે',
  engineSub: 'ASR · NER · OCR · નિયમ-આધારિત સુરક્ષા તપાસ',
  crashTeam: 'આપાત ટીમ તૈયાર - મુખ્ય OT ગલલીયારો',
  declineNote: 'ના કહેવાથી તમારા ઉપચાર પર કોઈ અસર થશે નહીં. નર્સ તમારો ઇતિહાસ જાતે નોંધશે.',
  send: 'મોકલો',
  sttCaptured: '✓ અવાજ નોંધાયો',
  sttDenied: 'અવાજ માટે માઇક્રોફોનની જરૂર છે. કૃપા કરીને માઇક્રોફોનને પરવાનગી આપો અથવા લખવાનો વિકલ્પ વાપરો.',
  sttUnsupported: 'આ બ્રાઉઝરમાં અવાજ ઓળખ ઉપલબ્ધ નથી. કૃપા કરીને લખવાનો વિકલ્પ વાપરો.',
  sttNoSpeech: 'કોઈ અવાજ સાંભળાયો નહીં. કૃપા કરીને ફરી પ્રયાસ કરો.',
  patientResponse: 'દર્દીનો જવાબ',
  printReport: 'રિપોર્ટ પ્રિન્ટ કરો',
  downloadPdf: 'PDF ડાઉનલોડ કરો',
  pdfDownloaded: '✓ દર્દીનો ઇતિહાસ રિપોર્ટ સફળતાપૂર્વક ડાઉનલોડ થયો',
  generatingReport: 'રિપોર્ટ બની રહી છે...',
  reportTitle: 'સંઘિત દર્દી ઇતિહાસ',
  generatedOn: 'બનાવ્યાનો સમય',
  reportDocs: 'જોયેલા તબીબી દસ્તાવેજો',
  aiSummaryTitle: 'AI-સહાયથી બનાવેલો તબીબી સારાંશ',
  aiSummarySub: 'દર્દીની માહિતી, અવાજથી થયેલી વાતચીત અને તબીબી દસ્તાવેજોમાંથી ડૉક્ટરની સમીક્ષા માટે સંઘિત કરાયું.',
  physicianReview: 'ડૉક્ટરની સમીક્ષા જરૂરી',
  extractedFromDocs: 'અપલોડ/સ્કેન કરેલા દસ્તાવેજોમાંથી કાઢેલું',
  pdfPrinted: '✓ દર્દીનો ઇતિહાસ રિપોર્ટ પ્રિન્ટ માટે મોકલાયો',

  piTitle: 'દર્દીની માહિતી',
  piSub: 'કૃપા કરીને તમારી માહિતી ભરો જેથી સલાહ પહેલાં ડૉક્ટર તમારા વિશે જાણી શકે.',
  piName: 'પૂરું નામ',
  piNameHint: 'તમારા ઓળખપત્ર મુજબ',
  piAge: 'ઉંમર',
  piGender: 'લિંગ',
  piMale: 'પુરુષ',
  piFemale: 'સ્ત્રી',
  piOther: 'અન્ય',
  piPhone: 'મોબાઇલ નંબર',
  piCity: 'શહેર',
  piState: 'રાજ્ય',
  piStatePlaceholder: 'રાજ્ય પસંદ કરો',
  piSelectStateFirst: 'પહેલા રાજ્ય પસંદ કરો',
  piStateErr: 'કૃપા કરીને તમારું રાજ્ય પસંદ કરો',
  piCityErr: 'કૃપા કરીને તમારું શહેર પસંદ કરો',
  piCityPlaceholder: 'શહેર પસંદ કરો',
  searchPlaceholder: 'શોધો',
  piComplaint: 'મુખ્ય સમસ્યા / હોસ્પિટલ આવવાનું કારણ',
  piComplaintHint: 'આજે કેમ આવ્યા તે તમારા શબ્દોમાં કહો',
  piNameErr: 'કૃપા કરીને પૂરું નામ લખો',
  piAgeErr: 'કૃપા કરીને યોગ્ય ઉંમર લખો (1-120)',
  piPhoneErr: 'કૃપા કરીને માન્ય 10 અંકનો મોબાઇલ નંબર લખો',
  piPhonePlaceholder: '10 અંકનો મોબાઇલ નંબર લખો',
  piComplaintErr: 'કૃપા કરીને તમારી મુખ્ય સમસ્યા લખો',
  piFormNote: 'આ માહિતી માત્ર આજની મુલાકાત માટે છે અને તમારા કિઓસ્ક સત્ર સાથે જોડાશે.',
  emptyNone: 'કિઓસ્ક પર જણાવ્યું નથી',
  dashPhoneLabel: 'મોબાઇલ',
  dashCityLabel: 'શહેર',
  docDate: 'દસ્તાવેજની તારીખ',
  docMedication: 'દવા',
  docInvestigation: 'તપાસ',
  docTranscribed: 'સ્કેન કરેલા દસ્તાવેજમાંથી લખાયેલ',
  riskFlagDetail: '{age} વર્ષની ઉંમર, પ્રવેશ પર અનેક હૃદય જોખમ પરિબળો જણાવ્યા',
  categoryLabels: { headache: 'માથાનો દુખાવો', chest: 'છાતીમાં દુખાવો', abdomen: 'પેટનો દુખાવો', cough: 'ઉધરસ', fever: 'તાવ', general: 'સામાન્ય' },
  interview: {
    headache: ['માથાનો દુખાવો ક્યારથી છે?', 'દુખાવો અચાનક શરૂ થયો કે ધીમે ધીમે?', 'માથાના કયા ભાગમાં દુખાવો છે?', 'દુખાવો કેવો લાગે છે - ધબકતો કે દબાણ જેવો?'],
    chest: ['છાતીમાં દુખાવો ક્યારે શરૂ થયો?', 'દુખાવો ક્યાં લાગે છે?', 'દુખાવો ક્યાંય ફેલાય છે?', 'ચાલવાથી દુખાવો વધે છે?'],
    abdomen: ['પેટનો દુખાવો ક્યારે શરૂ થયો?', 'પેટમાં ક્યાં દુખે છે - ઉપર, નીચે, ડાબી કે જમણી બાજુ?', 'જમ્યા પછી દુખાવો બદલાય છે?', 'શૌચ જવાથી રાહત મળે છે?'],
    cough: ['ઉધરસ ક્યારથી છે?', 'ઉધરસમાં કફ આવે છે કે કોરી ઉધરસ છે?', 'ઉધરસથી ઊંઘ બગડે છે?', 'કસરતથી શ્વાસ ફૂલે છે?'],
    fever: ['તાવ ક્યારથી છે?', 'તાવ રાત્રે વધારે રહે છે કે દિવસે?', 'તાવ સાથે બદનદુખાવો કે પરસેવો છે?', 'ભૂખ કે તરસ ઓછી લાગે છે?'],
    general: ['આ સમસ્યા ક્યારથી છે?', 'આ જ સમસ્યા અગાઉ પણ થઈ છે?', 'તમે હાલ કોઈ દવા લઈ રહ્યા છો?', 'તમને કોઈ વસ્તુની એલર્જી છે?', 'તમે ધૂમ્રપાન કે તંબાકુ લો છો?'],
  },
  voiceAnswer: 'અવાજથી જવાબ નોંધાયો',
  quickYes: 'હા',
  quickNo: 'ના',
  quickUnknown: 'ખબર નથી',
  riskFlagTitle: 'ઉંમર અને જોખમ પરિબળોનો નમૂનો',
  flagTemplates: {
    headache: { title: 'અચાનક કે તીવ્ર માથાના દુખાવાનો નમૂનો', detail: 'અચાનક, તીવ્ર કે અગાઉના કરતાં અલગ માથાનો દુખાવો સમયસર તબીબી તપાસની જરૂર પડી શકે.' },
    chest: { title: 'સમયસર સમીક્ષા જરૂરી છાતીના દુખાવાનો નમૂનો', detail: 'કસરત સાથે સંકળાયેલ કે સહવર્તી લક્ષણો સાથેનો છાતીનો દુખાવો ઝડપી તબીબી તપાસની જરૂર પડી શકે.' },
    abdomen: { title: 'સતત પેટના દુખાવાનો નમૂનો', detail: 'તીવ્ર કે અટકે નહીં તેવો પેટનો દુખાવો, ખાસ કરીને ઉલટી સાથે, સમયસર તપાસની જરૂર પડી શકે.' },
    cough: { title: 'લાંબી કે શ્વાસ ફૂલવા સાથેની ઉધરસનો નમૂનો', detail: 'અઠવાડિયાં ચાલતી ઉધરસ કે શ્વાસ ફૂલવા સાથે તબીબી તપાસની જરૂર પડી શકે.' },
    fever: { title: 'લાંબા સમયના તાવનો નમૂનો', detail: 'દિવસો સુધી ચાલતો તાવ કે ઓછા આહાર સાથેનો તાવ તબીબી તપાસની જરૂર પડી શકે.' },
    general: { title: 'સતત કે વધતી ફરિયાદ', detail: 'ચાલુ કે વધતી ફરિયાદ સમયસર ડૉક્ટર દ્વારા તપાસવી જોઈએ.' },
  },
};

const BN: Strings = {
  back: '← পিছনে',
  continueBtn: 'এগিয় যান →',

  consentHeader: 'রোগীর সম্মতি',
  consentTitle: 'শুরু করার আগে',
  consentIntro: 'MediKiosk আপনার স্বাস্থ্য সম্পর্কে প্রশ্ন করবে এবং আপনার ডাক্তারের জন্য চিকিৎসা ইতিহাস প্রস্তুত করতে তথ্য সংগ্রহ করবে।',
  whyTitle: 'এই তথ্য কেন সংগ্রহ করা হচ্ছে?',
  whyBody: 'পরামর্শের আগে আপনার চিকিৎসা ইতিহাস প্রস্তুত করতে।',
  privacyTitle: 'গোপনীয়তা',
  privacyBody: 'আপনার তথ্য এই প্রদর্শনীর জন্য এবং এটি নিরাপদে রাখা উচিত।',
  importantTitle: 'গুরুত্বপূর্ণ',
  importantBody: 'MediKiosk কোনো রোগ বলে না বা ওষুধ লেখে না।',
  listenExplanation: 'ব্যাখ্যা শুনুন',
  playingExplanation: 'ব্যাখ্যা চলছে...',
  audioSuffix: 'সেকেন্ডের সারসংক্ষেপ, শুনতে চাইলে',
  consentCheckbox: 'আমি বুঝি যে আমার তথ্য আমার চিকিৎসা ইতিহাস প্রস্তুত করতে ব্যবহৃত হবে।',
  consentBtn: 'আমি বুঝেছি ও সম্মত →',

  convHeader: 'AI রোগী সাক্ষাৎকার',
  convSub: 'বলুন, লিখুন বা স্পর্শ করুন - আপনার নিজের ভাষায় উত্তর দিন',
  greeting: 'নমস্কার {name}. কোন সমস্যায় আপনাকে হাসপাতালে আসতে হয়েছে?',
  patientReply: 'আমার একটি স্বাস্থ্য সমস্যার সাহায্য দরকার।',
  aiThanks: 'ধন্যবাদ। আপনার উত্তর বুঝেছি। এখন কয়েকটি সহজ প্রশ্ন করব - এতে ২-৩ মিনিট লাগবে।',
  speakNow: 'এখন বলুন...',
  processingSpeech: 'কণ্ঠস্বর লেখা হচ্ছে...',
  tapToSpeak: 'মাইক্রোফোন চেপে আপনার নিজের ভাষায় উত্তর দিন।',
  capturedAgain: 'উত্তর নেওয়া হয়েছে। আবার বলতে চাপুন।',
  lblSpeak: 'বলুন',
  lblType: 'লিখুন',
  lblTouch: 'স্পর্শ',
  readyLabel: 'প্রস্তুত',
  listeningLabel: 'শুনছি',
  processingLabel: 'প্রসেসিং',
  capturedLabel: 'নেওয়া হয়েছে',
  continueInterview: 'আলাপ চালিয়ে যান →',
  capturedViaVoice: 'কণ্ঠস্বরে নেওয়া',
  chips: ['ঘাম', 'অস্থিরতা', 'মাথা ঘোরা', 'বমি বমি ভাব', 'দুর্বলতা', 'অন্য কোনো সমস্যা নেই'],

  adaptiveHeader: 'অভিযোজিত প্রশ্ন',
  adaptiveSub: 'আপনার অভিযোগ অনুযায়ী প্রশ্ন',
  questions: ['ব্যথা কখন শুরু হয়েছিল?', 'ব্যথা শরীরের কোথায় অনুভব হচ্ছে?', 'ব্যথা কি অন্য কোথাও ছড়ায়?', 'কোনো বিষয় ব্যথা বাড়ায় বা কমায়?'],
  qOptions: [
    ['আজ সকালেই', '২ দিন আগে', 'এক সপ্তাহ ধরে', 'আগেও হয়েছিল'],
    ['বুকের মাঝখানে', 'বাঁ বুকে', 'ডান বুকে', 'পেটের উপরে'],
    ['হ্যাঁ, বাঁ হাতে', 'হ্যাঁ, গলা ও চোয়ালে', 'হ্যাঁ, পিঠে', 'না, এক জায়গাতেই থাকে'],
    ['হাঁটলে বাড়ে', 'বিশ্রামে কমে', 'গভীর শ্বাসে বাড়ে', 'খাবারের পরে বাড়ে'],
  ],
  skipQuestion: 'এই প্রশ্নটি বাদ দিন',
  clinicalInfo: 'চিকিৎসা তথ্য',
  clinicalInfoSub: 'প্রতিটি উত্তরের সাথে তথ্য হালনাগাদ হয়',
  rows: { complaint: 'প্রধান অভিযোগ', duration: 'সময়কাল', location: 'অবস্থান', radiation: 'ছড়ানো', aggravating: 'বাড়ানোর কারণ', relieving: 'কমানোর কারণ' },
  pending: 'অপেক্ষমাণ',
  questionsAnswered: 'জিজ্ঞাসিত প্রশ্ন',
  continueDocs: 'ডকুমেন্টে যান',
  branchNotice: 'শাখা যুক্তি: "{complaint}" অনুযায়ী সংশ্লিষ্ট প্রশ্ন নিজে থেকেই নির্বাচিত হয়েছে।',

  scanHeader: 'চিকিৎসা ডকুমেন্ট স্ক্যানিং',
  scanTitle: 'আপনার চিকিৎসা ডকুমেন্ট স্ক্যান করুন',
  scanIntro: 'আগের চিকিৎসা ডকুমেন্ট যোগ করুন যাতে MediKiosk ডাক্তারের জন্য প্রয়োজনীয় তথ্য বের করতে পারে।',
  docTitles: ['প্রেসক্রিপশন', 'ল্যাব রিপোর্ট', 'ডিসচার্জ সারাংশ', 'তদন্ত রিপোর্ট'],
  scanAll: 'সব ডকুমেন্ট স্ক্যান করুন',
  scanLabel: 'স্ক্যান করুন',
  ocrPipeline: 'OCR প্রক্রিয়া',
  stages: ['ডকুমেন্ট আপলোড', 'স্ক্যানিং', 'লেখা শনাক্তকরণ', 'চিকিৎসা পরিভাষা শনাক্তকরণ', 'সংগঠিত ডেটা'],
  extractedInfo: 'বের করা তথ্য',
  extractionComplete: 'তথ্য বের করা সম্পন্ন',
  ocrConfidence: 'OCR নির্ভুলতা',
  draftNote: 'বের করা তথ্য খসড়া এবং ডাক্তারের যাচাই প্রয়োজন।',
  scanNotice: 'বের করা তথ্য খসড়া এবং ডাক্তারের যাচাই প্রয়োজন। MediKiosk ফলাফল ব্যাখ্যা করে না বা ওষুধ বদলায় না।',

  procHeader: 'AI প্রসেসিং',
  sourceVoice: 'কণ্ঠস্বর',
  sourceTouch: 'স্পর্শ',
  sourceDocs: 'চিকিৎসা ডকুমেন্ট',
  structuredHistory: 'সংগঠিত রোগীর ইতিহাস',
  stageLabels: ['কণ্ঠস্বর লেখা', 'চিকিৎসা পরিভাষা শনাক্তকরণ', 'তথ্য বের করা', 'স্বরূপকরণ', 'চিকিৎসা সংগঠন'],
  disclaimer: 'ডাক্তারের পর্যালোচনা ও পরামর্শের জন্য প্রস্তুত করা হয়েছে।',
  viewStructured: 'সংগঠিত ইতিহাস দেখুন →',
  procReady: 'খসড়া ডাক্তারের যাচাইয়ের জন্য প্রস্তুত।',
  procWorking: 'কণ্ঠস্বর, স্পর্শ ও ডকুমেন্ট একত্র করা হচ্ছে...',

  flagHeader: 'রেড ফ্ল্যাগ নিরাপত্তা সতর্কতা',
  alertTitle: 'গুরুতর উপসর্গের ইঙ্গিত পাওয়া গেছে',
  alertBody: 'দেওয়া তথ্য অনুযায়ী কিছু উপসর্গের সময়মতো পরীক্ষা প্রয়োজন হতে পারে।',
  alertPriority: 'অনুগ্রহ করে পরীক্ষাকে অগ্রাধিকার দিন।',
  urgent: 'অগ্রাধিকার: জরুরি',
  noReplace: 'এই ইনটেক প্রক্রিয়া ডাক্তারের পরীক্ষার বিকল্প নয়',
  noDiagnosis: 'MediKiosk কোনো রোগ বলে না। এটি শুধু নিরাপত্তা পরীক্ষা - নাম বা ওষুধ বলে না।',
  whatTriggered: 'স্ক্রিন কেন চালু হয়েছে',
  ackText: 'আমি এই তথ্য রোগী ও সঙ্গীকে দেখিয়েছি',
  continueDashboard: 'ডাক্তার ড্যাশবোর্ডে যান →',

  welcomeHeadline: 'রোগীর ইতিহাস,\nডাক্তারের সঙ্গে\nদেখা হওয়ার আগেই।',
  welcomeBody:
    'MediKiosk রোগীর নিজের ভাষায় কথা বলে, তার কাগজপত্র পড়ে এবং সুশৃঙ্খল চিকিৎসা ইতিহাসের খসড়া তৈরি করে - যাতে ডাক্তার ক্লিপবোর্ডের বদলে রোগী নিয়ে পরামর্শ শুরু করতে পারেন।',
  startHistory: 'রোগীর ইতিহাস শুরু করুন →',
  viewDashboard: 'ডাক্তারের ড্যাশবোর্ড দেখুন',
  liveMode: 'লাইভ প্রদর্শন মোড',
  sihBadge: 'স্মার্ট ইন্ডিয়া হ্যাকাথন ২০২৬ - প্রোটোটাইপ',
  featuresTitle: 'আউটপেশেন্ট বিভাগের জন্য',
  featuresSub: 'পাঁচটি সক্ষমতা, ৯০ সেকেন্ডের কিওস্ক প্রক্রিয়া',
  featureTitles: ['কণ্ঠস্বরে আলাপ', 'স্পর্শ-ভিত্তিক ইনপুট', 'বহুভাষিক সহায়তা', 'চিকিৎসা ডকুমেন্ট বুদ্ধিমত্তা', 'নিরাপদ ও গোপনীয়'],
  featureBodies: [
    'রোগী নিজের শব্দে উত্তর দেন। কণ্ঠস্বর চিকিৎসা পরিভাষাসহ লাইভ লেখা হয়।',
    'বড় বোতাম, হ্যাঁ/না বিকল্প ও ছবি নির্বাচন - বয়স্ক ও কম শিক্ষিত ব্যবহারকারীদের জন্য।',
    'হিন্দি, মরাঠি, গুজরাটি, বাংলা, তামিল ও তেলুগু সহ ১২টি ভারতীয় ভাষা।',
    'কিওস্কেই প্রেসক্রিপশন, ল্যাব রিপোর্ট ও ডিসচার্জ সারাংশ পড়ে সুশৃঙ্খল তথ্য তৈরি হয়।',
    'তথ্য নিরাপদে রাখা হয়, সাক্ষাতের পরে নিজে থেকেই মুছে যায় এবং হাসপাতালের নেটওয়ার্ক ছাড়ে না।',
  ],
  howTitle: 'এটি কীভাবে কাজ করে',
  howSub: 'রোগী → কণ্ঠস্বর, স্পর্শ ও ডকুমেন্ট → AI ইনটেক → সুশৃঙ্খল ইতিহাস → ডাক্তারের যাচাই → পরামর্শ',
  howStages: ['রোগী', 'কণ্ঠস্বর + স্পর্শ + ডকুমেন্ট', 'MediKiosk AI ইঞ্জিন', 'সুশৃঙ্খল চিকিৎসা ইতিহাস', 'ডাক্তারের যাচাই', 'পরামর্শ'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'হাসপাতালের নেটওয়ার্কে, অফলাইন-সক্ষম',
  metaPurge: 'সাক্ষাতের পরে নিজে থেকেই মুছে যায়',
  designedFor: 'যাদের জন্য ডিজাইন',
  designedForValue: 'সরকারি মেডিকেল কলেজ • AYUSH আউটপেশেন্ট • জেলা হাসপাতাল • ব্যস্ত আউটপেশেন্ট',

  consentRecordTitle: 'সম্মতির নথি',
  consentRecordSub: 'এই সাক্ষাতের সঙ্গে যুক্ত হবে',
  consentRows: ['রোগী', 'সম্মতির ধরন', 'ভাষা', 'কিওস্ক', 'সময়'],

  assistantName: 'MediKiosk সহায়ক',
  intakeMode: 'চিকিৎসা ইনটেক মোড',
  chipsHeader: 'যা প্রযোজ্য তা স্পর্শ করুন',
  tapped: 'স্পর্শ করা হয়েছে',
  typePlaceholder: 'সমস্যাটি এখানে লিখুন',
  confidenceLabel: 'তথ্য বের করার নির্ভুলতা',
  inputMethodKv: 'ইনপুটের ধরন',
  inputMethodInUse: 'ব্যবহৃত ইনপুটের ধরন',
  recordToContinue: 'এগোতে একটি উত্তর নিন',
  draftOnlyNotice: 'শুধু খসড়া। ডাক্তার যাচাই করার পরেই প্রতিটি তথ্য কেস শিটের অংশ হবে।',
  micStart: 'বলা শুরু করুন',
  micStop: 'রেকর্ডিং বন্ধ করুন',

  questionOf: 'প্রশ্ন {n} / {m}',
  doneTitle: 'আলাপ সম্পন্ন',
  doneBody: 'সব {m}টি প্রশ্ন করা হয়েছে। বাকিগুলি কণ্ঠস্বরের নথি থেকে নিজে থেকেই সমাধান হয়েছে - আবার বলতে হয়নি।',
  badgeQuestions: '{n}টি প্রশ্ন',
  badgeDocuments: '{n}টি ডকুমেন্ট',
  badgeRedFlag: '{n}টি সতর্কতা',
  prevQuestion: 'আগের প্রশ্ন',
  panelNotice: 'এই প্যানেল AI-এর খসড়া। এখানে কোনো রোগ নেই এবং কিছুই রোগীকে ফলাফল হিসেবে দেখানো হয় না।',

  scanSub: 'OCR থেকে ওষুধ, পরীক্ষা ও তারিখ বের হয়',
  scanHint: 'ডকুমেন্ট স্ক্যানার বেডে রাখুন বা ক্যামেরা ব্যবহার করুন।',
  scanAgain: 'আবার স্ক্যান করুন',
  docsRead: '{total}টির মধ্যে {done}টি ডকুমেন্ট পড়া হয়েছে',
  docsInProgress: '{n}টি চলছে',

  procSub: 'কণ্ঠস্বর, স্পর্শ ও ডকুমেন্ট এক ইতিহাসে যোগ হচ্ছে',
  draftReadyTime: '৪.৮ সেকেন্ডে খসড়া তৈরি',
  workingTitle: 'তথ্য যোগ হচ্ছে...',
  badgeComplete: 'সম্পন্ন',
  badgeRunning: 'চলছে',
  waitingEngine: 'ইঞ্জিনের অপেক্ষায়...',
  outputReady: 'খসড়া প্রস্তুত - ১২টি তথ্য, ৪টি ডকুমেন্ট, ৩টি সতর্কতা',

  whatsNext: 'এরপর কী হবে',
  nextTitles: ['ডাক্তার সতর্কতা দেখবেন', 'জরুরি পরীক্ষা আগে', 'রোগী আতঙ্কিত হবেন না'],
  nextBodies: [
    'খসড়া ইতিহাস সতর্কতা ব্যানারসহ খুলবে।',
    'ডাক্তার ডাকার আগে নার্স BP, SpO2 ও ECG লিখবেন।',
    'কিওস্ক রোগীকে শুধু বলে যে ডাক্তার তাড়াতাড়ি ডাকবেন।',
  ],
  showProtocol: 'জরুরি প্রোটোকল দেখুন',
  demoNoCall: 'প্রদর্শন সংস্করণ - কোনো কল হয় না',
  protocolTitle: 'জরুরি প্রোটোকল',
  protocolBody: 'বাস্তব ব্যবস্থায় এটি হাসপাতালের জরুরি নম্বর খুলবে এবং ডিউটি রেজিস্ট্রারকে জানাবে। এটি প্রোটোটাইপ, তাই কোনো কল হয় না।',
  closeLabel: 'বন্ধ করুন',
  emergencyNote: 'জাতীয় জরুরি নম্বর: ১০৮ · হাসপাতাল এক্সটেনশন: ২২১১',

  successTitle: 'রোগীর ইতিহাস সফলভাবে তৈরি হয়েছে',
  successBody: 'কিওস্ক প্রক্রিয়া সম্পন্ন। এই সাক্ষাতের সুশৃঙ্খল ইতিহাস এখন ডাক্তারের যাচাই ও পরামর্শের জন্য প্রস্তুত।',
  flowTitles: ['রোগী', 'কণ্ঠস্বর + স্পর্শ + ডকুমেন্ট', 'AI চিকিৎসা ইনটেক', 'সুশৃঙ্খল ইতিহাস', 'ডাক্তারের যাচাই', 'পরামর্শ'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '১২টি প্রশ্ন · ৪টি ডকুমেন্ট স্ক্যান',
    'লিপ্যন্তর, তথ্য বের করা ও সতর্কতা পরীক্ষা',
    'সময়রেখাসহ SOAP খসড়া',
    'ডা. এ. মেহতা কর্তৃক যাচাই ও স্বাক্ষরিত',
    'ডাক্তার রোগী দেখেন - কাগজ নয়',
  ],
  impactTitle: 'এই কিওস্কের প্রভাব',
  impactLabels: ['মোট ইনটেক সময়', 'ডাক্তারের নথির সময়', 'গড় OCR নির্ভুলতা', 'রোগীর সুবিধা'],
  tagline: 'কম সময় নথিতে।\nবেশি সময় রোগীর সেবায়।',
  startNewDemo: 'নতুন প্রদর্শন শুরু করুন',
  backToDashboard: 'ডাক্তারের ড্যাশবোর্ডে ফিরে যান',
  verifiedBadge: 'ডাক্তার কর্তৃক যাচাইকৃত',
  unverifiedBadge: 'খসড়া অযাচাইকৃত',
  endToEndJourney: 'শুরু থেকে শেষ পর্যন্ত প্রক্রিয়া',
  journeyNotice: 'শুধু নমুনা তথ্য। MediKiosk ইতিহাসের খসড়া তৈরি করে; চূড়ান্ত সিদ্ধান্ত সবসময় যোগ্য ডাক্তারের।',
  fieldCharacter: 'স্বরূপ',
  fieldAssociated: 'সংশ্লিষ্ট উপসর্গ',
  fieldStatus: 'অবস্থা',
  fieldOnset: 'শুরু',
  tapAnswer: 'সবচেয়ে উপযুক্ত উত্তর স্পর্শ করুন',
  docHints: ['ওপিডি প্রেসক্রিপশন', 'ল্যাবরেটরি রিপোর্ট', 'আগের হাসপাতাল সাক্ষাৎ', 'ছাপা পরীক্ষার রিপোর্ট'],
  processedBadge: 'ডিভাইসেই প্রক্রিয়া · {n} ফাইল',
  consentModeAudio: 'কণ্ঠস্বর + লিখিত',
  consentModeWritten: 'লিখিত',
  taglineSub: 'AI-চালিত চিকিৎসা ইনটেক প্ল্যাটফর্ম',

  dashTitle: 'রোগীর ড্যাশবোর্ড',
  dashSub: 'মেডিসিন আউটপেশেন্ট · ডা. এ. মেহতা · হালনাগাদ {time}',
  dashLive: 'লাইভ',
  dashAttendant: 'সঙ্গী ব্যক্তি',
  dashKioskLabel: 'কিওস্ক',
  dashLangLabel: 'ভাষা',
  dashAttendantValue: '—',
  dashMale: 'পুরুষ',
  dashAgeLine: '{age} বছর · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI দ্বারা তৈরি খসড়া - ডাক্তারের যাচাই প্রয়োজন',
  dashBannerBody: 'নিচের কোনো তথ্য চিকিৎসাকীয়ভাবে যাচাই করা হয়নি। কেস শিটে যোগ করার আগে প্রতিটি তথ্য দেখুন।',
  dashVerifiedTitle: 'ডা. এ. মেহতা কর্তৃক যাচাইকৃত',
  dashVerifiedBody: 'মেডিসিন আউটপেশেন্ট · {stamp} · অডিট ID AUD-77120',
  dashTabHistory: 'চিকিৎসা ইতিহাস',
  dashTabTimeline: 'চিকিৎসা সময়রেখা',
  dashTabDocuments: 'ডকুমেন্ট',
  dashHpi: 'বর্তমান রোগের ইতিহাস',
  dashPmh: 'পূর্বের চিকিৎসা ইতিহাস',
  dashMeds: 'বর্তমান ওষুধ',
  dashAllergies: 'অ্যালার্জি',
  dashInvestigations: 'পূর্বের পরীক্ষা',
  dashStructuredFields: 'কিওস্কে নেওয়া সুশৃঙ্খল তথ্য',
  dashAuditNote: 'সংশোধন আপনার ডাক্তার ID সহ অডিট লগে নেওয়া হয়',
  dashEdit: 'সম্পাদনা',
  dashMedsNote: 'রোগীর বলা অনুযায়ী - ডোজ MediKiosk দ্বারা যাচাই করা হয়নি।',
  dashStatLabels: ['প্রশ্ন', 'ডকুমেন্ট', 'কণ্ঠস্বরের সময়', 'সতর্কতা'],
  dashAyushBtn: 'AYUSH চিকিৎসা মোড খুলুন',
  dashAyushAttached: 'AYUSH আকলন যুক্ত হয়েছে',
  dashNotScanned: 'স্ক্যান হয়নি',
  dashIntakeSummary: 'ইনটেক সারাংশ',
  flagLow: 'কম',
  flagHigh: 'বেশি',
  flagNormal: 'স্বাভাবিক',
  dashEditHistory: 'ইতিহাস সম্পাদনা',
  dashSaveEdits: 'সংশোধন সংরক্ষণ',
  dashVerify: 'যাচাই ও নিশ্চিত করুন',
  dashVerifiedBtn: 'যাচাইকৃত',
  dashSend: 'পরামর্শে পাঠান',
  dashConfirmTitle: 'এই ইতিহাস নিশ্চিত করবেন?',
  dashConfirmBody: 'নিশ্চিত করলে খসড়া আপনার ডাক্তার ID দিয়ে স্বাক্ষরিত হয়ে পরামর্শ তালিকায় চলে যাবে। আপনার সংশোধন অডিট লগে থাকবে।',
  dashConfirmYes: 'হ্যাঁ, ইতিহাস যাচাই করুন',
  dashCancel: 'বাতিল',
  timelineTitle: 'চিকিৎসা সময়রেখা',
  timelineSub: 'কিওস্ক ইনটেক ও হাসপাতালের নথির সমন্বয়',
  timelineTitles: ['কিওস্কে ইনটেক শুরু', 'প্রধান অভিযোগ নেওয়া হয়েছে', 'ডকুমেন্ট স্ক্যান', 'নিরাপত্তা পরীক্ষা', 'ইতিহাস সুশৃঙ্খল', 'ডাক্তারের যাচাই'],
  timelineBodies: [
    '{kiosk}-এ চেক-ইন · ভাষা {lang}',
    'প্রধান অভিযোগ নেওয়া হয়েছে: {complaint}',
    'এই সেশনে {n}টি ডকুমেন্ট স্ক্যান হয়েছে',
    'নিয়ম-ভিত্তিক নিরাপত্তা পরীক্ষা সম্পন্ন - {n}টি সতর্কতা পাঠানো হয়েছে',
    'ডাক্তারের পর্যালোচনার জন্য সুশৃঙ্খল ইতিহাস তৈরি',
    'যাচাই করে পরামর্শ তালিকায় পাঠানো হয়েছে',
  ],

  ayushModeTitle: 'AYUSH চিকিৎসা আকলন মোড',
  ayushModeSub: 'একই রোগীর জন্য সমান্তরাল আয়ুর্বেদিক আকলন',
  ayushDosha: 'দোষ ভারসাম্য',
  ayushDoshaSub: '৪২টি প্রশ্নের উত্তর থেকে',
  ayushInterpLabel: 'ব্যাখ্যা (খসড়া)',
  ayushInterpBody: 'আগ্নেয় প্রকৃতিতে পিত্ত বৃদ্ধির বিকৃতি। অগ্নি তীক্ষ্ণ ও কোষ্ঠ মৃদু - কিওস্কে বলা আহার ও ঘুমের ধরনের সাথে সামঞ্জস্যপূর্ণ। ডাক্তার সম্পর্ক যাচাই করবেন।',
  ayushDasha: 'দশবিধ পরীক্ষা',
  ayushDashaSub: 'কিওস্কে নেওয়া দশ-সূত্রী পরীক্ষা',
  ayushTablePart: 'পরীক্ষা',
  ayushTableFinding: 'ফলাফল',
  ayushInclude: 'রোগীর ইতিহাসে যোগ করুন',
  ayushIncluded: 'রোগীর ইতিহাসে যুক্ত হয়েছে',
  ayushBack: 'ডাক্তারের ড্যাশবোর্ডে ফিরে যান',

  extractTitle: 'লাইভ চিকিৎসা তথ্য',
  extractSub: 'রোগী কথা বলার সঙ্গে সঙ্গে হালনাগাদ হয়',
  scannedBadge: 'স্ক্যান হয়েছে',
  readingBadge: 'পড়া হচ্ছে',
  engineSub: 'ASR · NER · OCR · নিয়ম-ভিত্তিক নিরাপত্তা পরীক্ষা',
  crashTeam: 'জরুরি দল প্রস্তুত - মূল OT করিডোর',
  declineNote: 'অস্বীকার করলে আপনার চিকিৎসায় কোনো প্রভাব পড়বে না। নার্স আপনার ইতিহাস নিজে নেবেন।',
  send: 'পাঠান',
  sttCaptured: '✓ কণ্ঠস্বর নেওয়া হয়েছে',
  sttDenied: 'কণ্ঠস্বরের জন্য মাইক্রোফোন প্রয়োজন। অনুগ্রহ করে মাইক্রোফোনের অনুমতি দিন বা লেখার বিকল্প ব্যবহার করুন।',
  sttUnsupported: 'এই ব্রাউজারে কণ্ঠস্বর শনাক্তকরণ নেই। অনুগ্রহ করে লেখার বিকল্প ব্যবহার করুন।',
  sttNoSpeech: 'কোনো কণ্ঠস্বর শনাক্ত হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
  patientResponse: 'রোগীর উত্তর',
  printReport: 'রিপোর্ট প্রিন্ট করুন',
  downloadPdf: 'PDF ডাউনলোড করুন',
  pdfDownloaded: '✓ রোগীর ইতিহাসের রিপোর্ট সফলভাবে ডাউনলোড হয়েছে',
  generatingReport: 'রিপোর্ট তৈরি হচ্ছে...',
  reportTitle: 'সুশৃঙ্খল রোগীর ইতিহাস',
  generatedOn: 'তৈরির সময়',
  reportDocs: 'দেখা চিকিৎসা ডকুমেন্ট',
  aiSummaryTitle: 'AI-সহায়তায় তৈরি চিকিৎসা সারাংশ',
  aiSummarySub: 'রোগীর তথ্য, কণ্ঠস্বরে কথোপকথন ও চিকিৎসা ডকুমেন্ট থেকে ডাক্তারের পর্যালোচনার জন্য সুশৃঙ্খল করা হয়েছে।',
  physicianReview: 'ডাক্তারের পর্যালোচনা প্রয়োজন',
  extractedFromDocs: 'আপলোড/স্ক্যান করা ডকুমেন্ট থেকে বের করা',
  pdfPrinted: '✓ রোগীর ইতিহাসের রিপোর্ট প্রিন্টের জন্য পাঠানো হয়েছে',

  piTitle: 'রোগীর তথ্য',
  piSub: 'অনুগ্রহ করে আপনার তথ্য লিখুন যাতে পরামর্শের আগে ডাক্তার আপনার কথা জানতে পারেন।',
  piName: 'পুরো নাম',
  piNameHint: 'আপনার পরিচয়পত্র অনুযায়ী',
  piAge: 'বয়স',
  piGender: 'লিঙ্গ',
  piMale: 'পুরুষ',
  piFemale: 'নারী',
  piOther: 'অন্যান্য',
  piPhone: 'মোবাইল নম্বর',
  piCity: 'শহর',
  piState: 'রাজ্য',
  piStatePlaceholder: 'রাজ্য নির্বাচন করুন',
  piSelectStateFirst: 'আগে রাজ্য নির্বাচন করুন',
  piStateErr: 'অনুগ্রহ করে আপনার রাজ্য নির্বাচন করুন',
  piCityErr: 'অনুগ্রহ করে আপনার শহর নির্বাচন করুন',
  piCityPlaceholder: 'শহর নির্বাচন করুন',
  searchPlaceholder: 'খুঁজুন',
  piComplaint: 'প্রধান সমস্যা / হাসপাতাল আসার কারণ',
  piComplaintHint: 'আজ কেন এসেছেন নিজের ভাষায় বলুন',
  piNameErr: 'অনুগ্রহ করে পুরো নাম লিখুন',
  piAgeErr: 'অনুগ্রহ করে সঠিক বয়স লিখুন (1-120)',
  piPhoneErr: 'অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন',
  piPhonePlaceholder: '১০ সংখ্যার মোবাইল নম্বর লিখুন',
  piComplaintErr: 'অনুগ্রহ করে আপনার প্রধান সমস্যা লিখুন',
  piFormNote: 'এই তথ্য শুধু আজকের সাক্ষাতের জন্য এবং আপনার কিওস্ক সেশনের সঙ্গে যুক্ত হবে।',
  emptyNone: 'কিওস্কে বলা হয়নি',
  dashPhoneLabel: 'মোবাইল',
  dashCityLabel: 'শহর',
  docDate: 'ডকুমেন্টের তারিখ',
  docMedication: 'ওষুধ',
  docInvestigation: 'পরীক্ষা',
  docTranscribed: 'স্ক্যান করা ডকুমেন্ট থেকে লেখা',
  riskFlagDetail: '{age} বছর বয়সী, ইনটেকে বহু হৃদয় ঝুঁকি উল্লেখ করা হয়েছে',
  categoryLabels: { headache: 'মাথাব্যথা', chest: 'বুকে ব্যথা', abdomen: 'পেট ব্যথা', cough: 'কাশি', fever: 'জ্বর', general: 'সাধারণ' },
  interview: {
    headache: ['মাথাব্যথা কবে থেকে?', 'ব্যথাটি হঠাৎ শুরু হয়েছে নাকি ধীরে ধীরে?', 'মাথার কোন অংশে ব্যথা হচ্ছে?', 'ব্যথাটি কেমন - ধড়ফড় করে নাকি চাপ দেওয়ার মতো?'],
    chest: ['বুকের ব্যথা কবে শুরু হয়েছিল?', 'ব্যথাটি কোথায় অনুভব হচ্ছে?', 'ব্যথা কি অন্য কোথাও ছড়ায়?', 'হাঁটলে কি ব্যথা বাড়ে?'],
    abdomen: ['পেটের ব্যথা কবে শুরু হয়েছিল?', 'পেটের কোন অংশে ব্যথা - উপরে, নিচে, বাঁ বা ডান দিকে?', 'খাওয়ার পরে কি ব্যথা বদলায়?', 'পায়খানা গেলে কি আরাম পান?'],
    cough: ['কাশি কবে থেকে?', 'কাশিতে কি কফ আসে নাকি শুকনো কাশি?', 'কাশিতে কি ঘুম ব্যাহত হয়?', 'হাঁটলে কি শ্বাসকষ্ট হয়?'],
    fever: ['জ্বর কবে থেকে?', 'জ্বর রাতে বেশি থাকে নাকি দিনে?', 'জ্বরের সঙ্গে কি গা ব্যথা বা ঘাম হয়?', 'কি ক্ষুধা বা তৃষ্ণা কম লাগছে?'],
    general: ['এই সমস্যাটি কবে থেকে?', 'এই সমস্যাটি কি আগেও হয়েছে?', 'আপনি কি এখন কোনো ওষুধ খাচ্ছেন?', 'আপনার কি কোনো জ্ঞাত অ্যালার্জি আছে?', 'আপনি কি ধূমপান বা তামাক খান?'],
  },
  voiceAnswer: 'কণ্ঠস্বরে উত্তর নেওয়া হয়েছে',
  quickYes: 'হ্যাঁ',
  quickNo: 'না',
  quickUnknown: 'জানি না',
  riskFlagTitle: 'বয়স ও ঝুঁকি উপাদানের ধরন',
  flagTemplates: {
    headache: { title: 'হঠাৎ বা তীব্র মাথাব্যথার ধরন', detail: 'হঠাৎ, তীব্র বা আগের থেকে ভিন্ন মাথাব্যথা সময়মতো চিকিৎসা পরীক্ষার প্রয়োজন হতে পারে।' },
    chest: { title: 'সময়মতো পর্যালোচনা প্রয়োজন এমন বুকের ব্যথার ধরন', detail: 'ব্যায়ামের সঙ্গে সম্পর্কিত বা সহযোগী উপসর্গসহ বুকের ব্যথা দ্রুত চিকিৎসা পরীক্ষার প্রয়োজন হতে পারে।' },
    abdomen: { title: 'টেকা পেটের ব্যথার ধরন', detail: 'তীব্র বা থেমে না যাওয়া পেটের ব্যথা, বিশেষত বমি সহ, সময়মতো পরীক্ষার প্রয়োজন হতে পারে।' },
    cough: { title: 'দীর্ঘস্থায়ী বা শ্বাসকষ্টসহ কাশির ধরন', detail: 'সপ্তাহ ধরে কাশি বা শ্বাসকষ্টসহ কাশি চিকিৎসা পরীক্ষার প্রয়োজন হতে পারে।' },
    fever: { title: 'দীর্ঘস্থায়ী জ্বরের ধরন', detail: 'কয়েকদিন ধরে জ্বর বা খাবার কমে যাওয়া সহ জ্বর চিকিৎসা পরীক্ষার প্রয়োজন হতে পারে।' },
    general: { title: 'টেকা পড়া বা বাড়তে থাকা অভিযোগ', detail: 'চলমান বা বাড়তে থাকা অভিযোগ সময়মতো ডাক্তার দ্বারা পর্যালোচনা করা উচিত।' },
  },
};

const TA: Strings = {
  back: '← பின்',
  continueBtn: 'தொடரவும் →',

  consentHeader: 'நோயாளர் சம்மதம்',
  consentTitle: 'தொடங்குவதற்கு முன்',
  consentIntro: 'MediKiosk உங்கள் உடல்நலம் பற்றிய கேள்விகள் கேட்டு, உங்கள் மருத்துவருக்கான வரலாற்றைத் தயாரிக்கத் தகவல் சேகரிக்கும்.',
  whyTitle: 'இந்தத் தகவல் ஏன் சேகரிக்கப்படுகிறது?',
  whyBody: 'ஆலோசனைக்கு முன் உங்கள் மருத்துவ வரலாற்றைத் தயாரிக்க.',
  privacyTitle: 'தனியுரிமை',
  privacyBody: 'உங்கள் தகவல் இந்தக் காட்சிக்கானது, பாதுகாப்பாக வைக்கப்பட வேண்டும்.',
  importantTitle: 'முக்கியம்',
  importantBody: 'MediKiosk நோய் கூறாது, மருந்து எழுதாது.',
  listenExplanation: 'விளக்கம் கேளுங்கள்',
  playingExplanation: 'விளக்கம் ஒலிக்கிறது...',
  audioSuffix: 'வினாடி சுருக்கம், கேட்க விரும்புவோருக்கு',
  consentCheckbox: 'என் தகவல் என் மருத்துவ வரலாற்றைத் தயாரிக்ப் பயன்படும் என்பதை நான் புரிந்துகொள்கிறேன்.',
  consentBtn: 'நான் புரிந்துகொண்டு சம்மதிக்கிறேன் →',

  convHeader: 'AI நோயாளர் நேர்காணல்',
  convSub: 'பேசுங்கள், எழுதுங்கள் அல்லது தட்டுங்கள் - உங்கள் சொற்களில் பதிலளியுங்கள்',
  greeting: 'வணக்கம் {name}. எந்தப் பிரச்சனைக்காக மருத்துவமனை வந்தீர்கள்?',
  patientReply: 'ஒரு உடல்நலப் பிரச்சனைக்கு உதவி தேவை.',
  aiThanks: 'நன்றி. உங்கள் பதில் புரிந்தது. இப்போது சில எளிய கேள்விகள் கேட்பேன் - 2-3 நிமிடம் ஆகும்.',
  speakNow: 'இப்போது பேசுங்கள்...',
  processingSpeech: 'பேச்சை எழுத்தாக்குகிறோம்...',
  tapToSpeak: 'மைக்ரோஃபோனை அழுத்தி உங்கள் சொற்களில் பதிலளியுங்கள்.',
  capturedAgain: 'பதில் பதிவாகிவிட்டது. மீண்டும் பேச அழுத்துங்கள்.',
  lblSpeak: 'பேசுங்கள்',
  lblType: 'எழுதுங்கள்',
  lblTouch: 'தட்டுங்கள்',
  readyLabel: 'தயார்',
  listeningLabel: 'கேட்கிறோம்',
  processingLabel: 'செயலாக்கம்',
  capturedLabel: 'பதிவாகியது',
  continueInterview: 'நேர்காணலைத் தொடரவும் →',
  capturedViaVoice: 'குரல் வழியாகப் பதிவு',
  chips: ['வேர்க்குரல்', 'அமைதியின்மை', 'தலைசுற்றல்', 'குமட்டல்', 'பலவீனம்', 'வேறு பிரச்சனை இல்லை'],

  adaptiveHeader: 'தகவமைப்பு கேள்விகள்',
  adaptiveSub: 'உங்கள் புகாரின் அடிப்படையில் கேள்விகள்',
  questions: ['வலி எப்போது தொடங்கியது?', 'வலி உடலில் எங்கே உணரப்படுகிறது?', 'வலி வேறு இடத்திற்குப் பரவுகிறதா?', 'வலியை அதிகரிக்கவோ குறைக்கவோ ஏதாவது உண்டா?'],
  qOptions: [
    ['இன்று காலையிலேயே', '2 நாட்களுக்கு முன்', 'ஒரு வாரமாக', 'முன்பும் நடந்தது'],
    ['மார்பின் நடுவே', 'இடது மார்பில்', 'வலது மார்பில்', 'வயிற்றின் மேலே'],
    ['ஆம், இடது கையில்', 'ஆம், கழுத்து, தாடையில்', 'ஆம், முதுகில்', 'இல்லை, அதே இடத்தில் இருக்கிறது'],
    ['நடக்கும்போது அதிகமாகிறது', 'ஓய்வெடுத்தால் குறையிறது', 'ஆழமாக மூச்செடுத்தால் அதிகமாகிறது', 'சாப்பிட்ட பின் அதிகமாகிறது'],
  ],
  skipQuestion: 'இந்தக் கேள்வியைத் தவிர்க்கவும்',
  clinicalInfo: 'மருத்துவத் தகவல்',
  clinicalInfoSub: 'ஒவ்வொரு பதிலுடனும் தகவல் புதுப்பிக்கப்படுகிறது',
  rows: { complaint: 'முக்கிய புகார்', duration: 'கால அளவு', location: 'இடம்', radiation: 'பரவல்', aggravating: 'அதிகரிக்கும் காரணிகள்', relieving: 'குறைக்கும் காரணிகள்' },
  pending: 'நிலுவையில்',
  questionsAnswered: 'கேட்ட கேள்விகள்',
  continueDocs: 'ஆவணங்களுக்குச் செல்லவும்',
  branchNotice: 'கிளை உத்தி: "{complaint}" அடிப்படையில் தொடர்புடைய கேள்விகள் தானாகத் தேர்வு செய்யப்பட்டன.',

  scanHeader: 'மருத்துவ ஆவண ஸ்கேனிங்',
  scanTitle: 'உங்கள் மருத்துவ ஆவணங்களை ஸ்கேன் செய்யுங்கள்',
  scanIntro: 'மருத்துவருக்குத் தேவையான தகவலை MediKiosk எடுக்க, முந்தைய ஆவணங்களைச் சேர்க்கவும்.',
  docTitles: ['மருந்துச் சீட்டு', 'ஆய்வக அறிக்கை', 'டிஸ்சார்ஜ் சுருக்கம்', 'சோதனை அறிக்கை'],
  scanAll: 'அனைத்து ஆவணங்களையும் ஸ்கேன் செய்யவும்',
  scanLabel: 'ஸ்கேன் செய்யவும்',
  ocrPipeline: 'OCR செயல்முறை',
  stages: ['ஆவணம் ஏற்றப்பட்டது', 'ஸ்கேனிங்', 'உரை அடையாளம்', 'மருத்துவச் சொற் அடையாளம்', 'கட்டமைக்கப்பட்ட தரவு'],
  extractedInfo: 'எடுக்கப்பட்ட தகவல்',
  extractionComplete: 'எடுத்தல் முடிந்தது',
  ocrConfidence: 'OCR துல்லியம்',
  draftNote: 'எடுக்கப்பட்ட தகவல் வரைவு மட்டுமே; மருத்துவர் சரிபார்ப்பு அவசியம்.',
  scanNotice: 'எடுக்கப்பட்ட தகவல் வரைவு மட்டுமே; மருத்துவர் சரிபார்ப்பு அவசியம். MediKiosk முடிவுகளை விளக்கவோ மருந்தை மாற்றவோ செய்யாது.',

  procHeader: 'AI செயலாக்கம்',
  sourceVoice: 'குரல்',
  sourceTouch: 'தொடுதல்',
  sourceDocs: 'மருத்துவ ஆவணங்கள்',
  structuredHistory: 'கட்டமைக்கப்பட்ட நோயாளர் வரலாறு',
  stageLabels: ['பேச்சு எழுத்து', 'மருத்துவச் சொல் அடையாளம்', 'தகவல் எடுத்தல்', 'தரமாக்கல்', 'மருத்துவக் கட்டமைப்பு'],
  disclaimer: 'மருத்துவர் மதிப்பீடு மற்றும் ஆலோசனைக்காகத் தயார் செய்யப்பட்டது.',
  viewStructured: 'கட்டமைக்கப்பட்ட வரலாற்றைக் காணவும் →',
  procReady: 'வரைவு மருத்துவர் சரிபார்ப்புக்குத் தயார்.',
  procWorking: 'குரல், தொடுதல், ஆவணங்கள் இணைக்கப்படுகின்றன...',

  flagHeader: 'சிவப்புக் கொடி பாதுகாப்பு எச்சரிக்கை',
  alertTitle: 'கவலைக்குரிய அறிகுறிகள் கண்டறியப்பட்டன',
  alertBody: 'தரப்பட்ட தகவலின் அடிப்படையில் சில அறிகுறிகளுக்கு சரியான நேரத்தில் மதிப்பீடு தேவைப்படலாம்.',
  alertPriority: 'தயவுசெய்து மதிப்பீட்டுக்கு முன்னுரிமை கொடுங்கள்.',
  urgent: 'முன்னுரிமை: அவசரம்',
  noReplace: 'இந்த இன்டேக் செயல்முறை மருத்துவர் மதிப்பீட்டுக்கு மாற்றாகாது',
  noDiagnosis: 'MediKiosk நோயைக் கூறாது. இது பாதுகாப்புச் சோதனை மட்டுமே - பெயரோ மருந்தோ கூறாது.',
  whatTriggered: 'திரை ஏன் இயக்கப்பட்டது',
  ackText: 'இந்தத் தகவலை நோயாளர் மற்றும் உடன் வந்தவருக்குக் காட்டிவிட்டேன்',
  continueDashboard: 'மருத்துவர் டாஷ்போர்டுக்குச் செல்லவும் →',

  welcomeHeadline: 'நோயாளர் வரலாறு,\nமருத்துவரைச் சந்திப்பதற்கு\nமுன்பே தயார்.',
  welcomeBody:
    'MediKiosk நோயாளரின் சொந்த மொழியில் பேசுகிறது, அவரது ஆவணங்களைப் படித்து கட்டமைக்கப்பட்ட மருத்துவ வரலாற்று வரைவை உருவாக்குகிறது - மருத்துவர் கிளிப்போர்டுக்குப் பதிலாக நோயாளருடன் ஆலோசனையைத் தொடங்கலாம்.',
  startHistory: 'நோயாளர் வரலாற்றைத் தொடங்கவும் →',
  viewDashboard: 'மருத்துவர் டாஷ்போர்டைக் காணவும்',
  liveMode: 'நேரடிக் காட்சி முறை',
  sihBadge: 'ஸ்மார்ட் இந்தியா ஹாக்கத்தோன் 2026 - மாதிரி',
  featuresTitle: 'நோயாளர் பிரிவுக்காக வடிவமைக்கப்பட்டது',
  featuresSub: 'ஐந்து திறன்கள், 90 வினாடிக் கியோஸ்க் செயல்முறை',
  featureTitles: ['குரல் உள்ளீடு', 'தொடுதல் உள்ளீடு', 'பல மொழி ஆதரவு', 'மருத்துவ ஆவண அறிவு', 'பாதுகாப்பு மற்றும் தனியுரிமை'],
  featureBodies: [
    'நோயாளர் தன் சொற்களில் பதிலளிப்பார். குரல் மருத்துவச் சொற்களுடன் நேரடியாக எழுதப்படுகிறது.',
    'பெரிய பொத்தான்கள், ஆம்/இல்லை விருப்பங்கள், படத் தேர்வுகள் - முதியவர்கள் மற்றும் கல்விக் குறைவானோருக்கு.',
    'ஹிந்தி, மராத்தி, குஜராத்தி, வங்காளம், தமிழ், தெலுங்கு உட்பட 12 இந்திய மொழிகள்.',
    'கியோஸ்கிலேயே மருந்துச் சீட்டு, ஆய்வக அறிக்கை, டிஸ்சார்ஜ் சுருக்கம் படித்து கட்டமைக்கப்பட்ட தரவு உருவாகிறது.',
    'தரவு பாதுகாப்பாக வைக்கப்படுகிறது, சந்திப்புக்குப் பின் தானாக அழிக்கப்படுகிறது, மருத்துவமனை வலையமைப்பை விட்டு வெளியே செல்வதில்லை.',
  ],
  howTitle: 'இது எப்படிச் செயல்படுகிறது',
  howSub: 'நோயாளர் → குரல், தொடுதல், ஆவணங்கள் → AI இன்டேக் → கட்டமைக்கப்பட்ட வரலாறு → மருத்துவர் சரிபார்ப்பு → ஆலோசனை',
  howStages: ['நோயாளர்', 'குரல் + தொடுதல் + ஆவணங்கள்', 'MediKiosk AI இயந்திரம்', 'கட்டமைக்கப்பட்ட மருத்துவ வரலாறு', 'மருத்துவர் சரிபார்ப்பு', 'ஆலோசனை'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'மருத்துவமனை வலையமைப்பில், ஆஃப்லைன் ஆதரவு',
  metaPurge: 'சந்திப்புக்குப் பின் தானாக அழிக்கப்படும்',
  designedFor: 'யாருக்காக வடிவமைக்கப்பட்டது',
  designedForValue: 'அரசு மருத்துவக் கல்லூரிகள் • AYUSH அவுட்பேஷன்ட் • மாவட்ட மருத்துவமனைகள் • நெருக்கமான அவுட்பேஷன்ட்',

  consentRecordTitle: 'சம்மதப் பதிவு',
  consentRecordSub: 'இந்தச் சந்திப்புடன் இணைக்கப்படும்',
  consentRows: ['நோயாளர்', 'சம்மத முறை', 'மொழி', 'கியோஸ்க்', 'நேரம்'],

  assistantName: 'MediKiosk உதவியாளர்',
  intakeMode: 'மருத்துவ இன்டேக் முறை',
  chipsHeader: 'பொருந்துவதைத் தட்டுங்கள்',
  tapped: 'தட்டப்பட்டது',
  typePlaceholder: 'பிரச்சனையே இங்கே எழுதுங்கள்',
  confidenceLabel: 'எடுத்தல் துல்லியம்',
  inputMethodKv: 'உள்ளீட்டு முறை',
  inputMethodInUse: 'பயன்படும் உள்ளீட்டு முறை',
  recordToContinue: 'தொடர ஒரு பதிலைப் பதிவு செய்யுங்கள்',
  draftOnlyNotice: 'இது வரைவு மட்டுமே. மருத்துவர் சரிபார்த்த பின்பே ஒவ்வொரு தகவலும் கேஸ் ஷீட்டின் அங்கமாகும்.',
  micStart: 'பேசத் தொடங்குங்கள்',
  micStop: 'பதிவை நிறுத்துங்கள்',

  questionOf: 'கேள்வி {n} / {m}',
  doneTitle: 'நேர்காணல் முடிந்தது',
  doneBody: 'அனைத்து {m} கேள்விகளும் கேட்கப்பட்டன. மீதமுள்ளவை குரல் பதிவிலிருந்து தானாகத் தீர்க்கப்பட்டன - மீண்டும் சொல்ல வேண்டியதில்லை.',
  badgeQuestions: '{n} கேள்விகள்',
  badgeDocuments: '{n} ஆவணங்கள்',
  badgeRedFlag: '{n} பாதுகாப்பு அறிகுறி',
  prevQuestion: 'முந்தைய கேள்வி',
  panelNotice: 'இந்தப் பேனல் AI வரைவு மட்டுமே. இதில் எந்த நோயும் இல்லை, எதுவும் நோயாளருக்கு முடிவாகக் காட்டப்படுவதில்லை.',

  scanSub: 'OCR மூலம் மருந்துகள், சோதனைகள், தேதிகள் எடுக்கப்படுகின்றன',
  scanHint: 'ஆவணத்தை ஸ்கேனர் படுக்கையில் வைக்கவும் அல்லது கேமராவைப் பயன்படுத்தவும்.',
  scanAgain: 'மீண்டும் ஸ்கேன் செய்யவும்',
  docsRead: '{total}ல் {done} ஆவணங்கள் படிக்கப்பட்டன',
  docsInProgress: '{n} நடைமுறையில்',

  procSub: 'குரல், தொடுதல், ஆவணங்கள் ஒரே வரலாற்றில் இணைக்கப்படுகின்றன',
  draftReadyTime: '4.8 வினாடியில் வரைவு தயார்',
  workingTitle: 'தகவல் இணைக்கப்படுகிறது...',
  badgeComplete: 'முடிந்தது',
  badgeRunning: 'நடைமுறையில்',
  waitingEngine: 'இயந்திரம் காத்திருக்கிறது...',
  outputReady: 'வரைவு தயார் - 12 தகவல்கள், 4 ஆவணங்கள், 3 பாதுகாப்பு அறிகுறிகள்',

  whatsNext: 'அடுத்து என்ன',
  nextTitles: ['மருத்துவர் எச்சரிக்கையைக் காண்பார்', 'அவசர மதிப்பீடு முதலில்', 'நோயாளர் அச்சப்படமாட்டார்'],
  nextBodies: [
    'வரைவு வரலாறு பாதுகாப்பு பேனருடன் திறக்கும்.',
    'மருத்துவர் அழைப்பதற்கு முன் செவிலியர் BP, SpO2, ECG பதிவு செய்வார்.',
    'கியோஸ்க் நோயாளரிடம் மருத்துவர் விரைவில் அழைப்பார் என்று மட்டும் கூறும்.',
  ],
  showProtocol: 'அவசர நெறிமுறையைக் காட்டவும்',
  demoNoCall: 'மாதிரிப் பதிப்பு - எந்த அழைப்பும் இல்லை',
  protocolTitle: 'அவசர நெறிமுறை',
  protocolBody: 'நேரடிப் பயன்பாட்டில் இது மருத்துவமனை அவசர எண்ணைத் திறந்து பணிபுரியும் பதிவாளருக்குத் தெரிவிக்கும். இது மாதிரி என்பதால் அழைப்பு எதுவும் இல்லை.',
  closeLabel: 'மூடவும்',
  emergencyNote: 'தேசிய அவசர எண்: 108 · மருத்துவமனை நீட்டிப்பு: 2211',

  successTitle: 'நோயாளர் வரலாறு வெற்றிகரமாகத் தயாராகிவிட்டது',
  successBody: 'கியோஸ்க் செயல்முறை முடிந்தது. இந்தச் சந்திப்பின் கட்டமைக்கப்பட்ட வரலாறு இப்போது மருத்துவர் சரிபார்ப்பு, ஆலோசனைக்குத் தயார்.',
  flowTitles: ['நோயாளர்', 'குரல் + தொடுதல் + ஆவணங்கள்', 'AI மருத்துவ இன்டேக்', 'கட்டமைக்கப்பட்ட வரலாறு', 'மருத்துவர் சரிபார்ப்பு', 'ஆலோசனை'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '12 கேள்விகள் · 4 ஆவணங்கள் ஸ்கேன்',
    'எழுத்துப்படுத்தல், தகவல் எடுத்தல், பாதுகாப்புச் சோதனை',
    'காலவரிசையுடன் SOAP வரைவு',
    'டா. ஏ. மெஹ்தா சரிபார்த்து ஒப்பந்தர்',
    'மருத்துவர் நோயாளரைச் சந்திப்பார் - காகிதங்களை அல்ல',
  ],
  impactTitle: 'இந்தக் கியோஸ்கின் தாக்கம்',
  impactLabels: ['மொத்த இன்டேக் நேரம்', 'மருத்துவரின் ஆவண நேரம்', 'சராசரி OCR துல்லியம்', 'நோயாளர் எளிமை'],
  tagline: 'குறைவான நேரம் ஆவணங்களுக்கு.\nஅதிக நேரம் நோயாளர் பராமரிப்புக்கு.',
  startNewDemo: 'புதிய காட்சியைத் தொடங்கவும்',
  backToDashboard: 'மருத்துவர் டாஷ்போர்டுக்குத் திரும்ப',
  verifiedBadge: 'மருத்துவர் சரிபார்த்தது',
  unverifiedBadge: 'வரைவு சரிபார்க்கப்படவில்லை',
  endToEndJourney: 'தொடக்கம் முதல் முடிவு வரை',
  journeyNotice: 'மாதிரித் தரவு மட்டுமே. MediKiosk வரலாற்று வரைவை உருவாக்குகிறது; இறுதித் தீர்மானம் எப்போதும் தகுதிவாய்ந்த மருத்துவருடையது.',
  fieldCharacter: 'தன்மை',
  fieldAssociated: 'தொடர்புடைய அறிகுறிகள்',
  fieldStatus: 'நிலை',
  fieldOnset: 'தொடக்கம்',
  tapAnswer: 'பொருந்தும் பதிலைத் தட்டுங்கள்',
  docHints: ['ஓபிடி மருந்துச் சீட்டு', 'ஆய்வக அறிக்கை', 'முந்தைய மருத்துவமனை வருகை', 'அச்சிடப்பட்ட சோதனை அறிக்கை'],
  processedBadge: 'சாதனத்திலேயே செயலாக்கம் · {n} கோப்புகள்',
  consentModeAudio: 'குரல் + எழுத்து',
  consentModeWritten: 'எழுத்து',
  taglineSub: 'AI இயக்கப்படும் மருத்துவ இன்டேக் தளம்',

  dashTitle: 'நோயாளர் டாஷ்போர்டு',
  dashSub: 'மருந்தியல் அவுட்பேஷன்ட் · டா. ஏ. மெஹ்தா · புதுப்பிப்பு {time}',
  dashLive: 'நேரடி',
  dashAttendant: 'உடன் வந்தவர்',
  dashKioskLabel: 'கியோஸ்க்',
  dashLangLabel: 'மொழி',
  dashAttendantValue: '—',
  dashMale: 'ஆண்',
  dashAgeLine: '{age} வயது · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI உருவாக்கிய வரைவு - மருத்துவர் சரிபார்ப்பு அவசியம்',
  dashBannerBody: 'கீழே உள்ள எந்தத் தகவலும் மருத்துவ ரீதியாக சரிபார்க்கப்படவில்லை. கேஸ் ஷீட்டில் சேர்ப்பதற்கு முன் ஒவ்வொரு விவரத்தையும் பாருங்கள்.',
  dashVerifiedTitle: 'டா. ஏ. மெஹ்தா சரிபார்த்தது',
  dashVerifiedBody: 'மருந்தியல் அவுட்பேஷன்ட் · {stamp} · ஆடிட் ID AUD-77120',
  dashTabHistory: 'மருத்துவ வரலாறு',
  dashTabTimeline: 'மருத்துவக் காலவரிசை',
  dashTabDocuments: 'ஆவணங்கள்',
  dashHpi: 'தற்போதைய நோயின் வரலாறு',
  dashPmh: 'முந்தைய மருத்துவ வரலாறு',
  dashMeds: 'தற்போதைய மருந்துகள்',
  dashAllergies: 'ஒவ்வாமை',
  dashInvestigations: 'முந்தைய சோதனைகள்',
  dashStructuredFields: 'கியோஸ்கில் பதிவு செய்யப்பட்ட கட்டமைக்கப்பட்ட விவரங்கள்',
  dashAuditNote: 'திருத்தங்கள் உங்கள் மருத்துவர் ID உடன் ஆடிட் லாகில் பதிவாகும்',
  dashEdit: 'திருத்து',
  dashMedsNote: 'நோயாளர் கூறியவாறு - அளவுகள் MediKiosk சரிபார்க்கப்படவில்லை.',
  dashStatLabels: ['கேள்விகள்', 'ஆவணங்கள்', 'குரல் நேரம்', 'பாதுகாப்பு அறிகுறிகள்'],
  dashAyushBtn: 'AYUSH மருத்துவ முறையைத் திறக்கவும்',
  dashAyushAttached: 'AYUSH ஆகலன் சேர்க்கப்பட்டது',
  dashNotScanned: 'ஸ்கேன் செய்யப்படவில்லை',
  dashIntakeSummary: 'இன்டேக் சுருக்கம்',
  flagLow: 'குறைவு',
  flagHigh: 'அதிகம்',
  flagNormal: 'சாதாரணம்',
  dashEditHistory: 'வரலாற்றைத் திருத்து',
  dashSaveEdits: 'திருத்தங்களைச் சேமி',
  dashVerify: 'சரிபார்த்து உறுதிப்படுத்து',
  dashVerifiedBtn: 'சரிபார்க்கப்பட்டது',
  dashSend: 'ஆலோசனைக்கு அனுப்பு',
  dashConfirmTitle: 'இந்த வரலாற்றை உறுதிப்படுத்தவா?',
  dashConfirmBody: 'உறுதிப்படுத்தினால் வரைவு உங்கள் மருத்துவர் ID உடன் ஒப்பந்தரப்பட்டு ஆலோசனைப் பட்டியலுக்குச் செல்லும். உங்கள் திருத்தங்கள் ஆடிட் லாகில் இருக்கும்.',
  dashConfirmYes: 'ஆம், வரலாற்றைச் சரிபார்க்கவும்',
  dashCancel: 'ரத்து',
  timelineTitle: 'மருத்துவக் காலவரிசை',
  timelineSub: 'கியோஸ்க் இன்டேக் மற்றும் மருத்துவமனைப் பதிவுகளின் தொகுப்பு',
  timelineTitles: ['கியோஸ்கில் இன்டேக் தொடக்கம்', 'முக்கியப் புகார் பதிவு', 'ஆவணங்கள் ஸ்கேன்', 'பாதுகாப்புச் சோதனை', 'வரலாறு கட்டமைப்பு', 'மருத்துவர் சரிபார்ப்பு'],
  timelineBodies: [
    '{kiosk}-ல் செக்-இன் · மொழி {lang}',
    'முக்கியப் புகார் பதிவு: {complaint}',
    'இந்த அமர்வில் {n} ஆவணங்கள் ஸ்கேன்',
    'விதி-அடிப்படை பாதுகாப்புச் சோதனை முடிந்தது - {n} அறிகுறிகள் முன்னேற்றம்',
    'மருத்துவர் மதிப்பீட்டுக்கு கட்டமைக்கப்பட்ட வரலாறு தயார்',
    'சரிபார்த்து ஆலோசனைப் பட்டியலுக்கு அனுப்பப்பட்டது',
  ],

  ayushModeTitle: 'AYUSH மருத்துவ மதிப்பீட்டு முறை',
  ayushModeSub: 'அதே நோயாளருக்கான சமானாந்த ஆயுர்வேத மதிப்பீடு',
  ayushDosha: 'தோஷ சமநிலை',
  ayushDoshaSub: '42 கேள்விகளின் பதிலிலிருந்து',
  ayushInterpLabel: 'விளக்கம் (வரைவு)',
  ayushInterpBody: 'ஆக்னேய பிரகிருதியில் பித்த வர்த்தி விக்கிரம். அக்னி தீக்ஷ்ணை, கோஷ்ட மிருது - கியோஸ்கில் கூறப்பட்ட உணவு, தூக்கப் பகுத்தறிவுடன் ஒத்துப்போகிறது. மருத்துவர் தொடர்பைச் சரிபார்க்க வேண்டும்.',
  ayushDasha: 'தசவித பரீட்சை',
  ayushDashaSub: 'கியோஸ்கில் பதிவு செய்யப்பட்ட பத்துமுறைப் பரீட்சை',
  ayushTablePart: 'பரீட்சை',
  ayushTableFinding: 'முடிவு',
  ayushInclude: 'நோயாளர் வரலாற்றில் சேர்',
  ayushIncluded: 'நோயாளர் வரலாற்றில் சேர்க்கப்பட்டது',
  ayushBack: 'மருத்துவர் டாஷ்போர்டுக்குத் திரும்ப',

  extractTitle: 'நேரடி மருத்துவத் தகவல்',
  extractSub: 'நோயாளர் பேசும்போதே புதுப்பிக்கப்படுகிறது',
  scannedBadge: 'ஸ்கேன் செய்யப்பட்டது',
  readingBadge: 'படிக்கப்படுகிறது',
  engineSub: 'ASR · NER · OCR · விதி-அடிப்படை பாதுகாப்புச் சோதனை',
  crashTeam: 'அவசரக் குழு தயார் - முதன்மை OT வழிகால்',
  declineNote: 'மறுத்தால் உங்கள் சிகிச்சை பாதிக்கப்படாது. செவிலியர் உங்கள் வரலாற்றை நேரடியாக எழுதிக்கொள்வார்.',
  send: 'அனுப்பு',
  sttCaptured: '✓ குரல் பதிவாகியது',
  sttDenied: 'குரல் உள்ளீட்டிற்கு மைக்ரோஃபோன் தேவை. மைக்ரோஃபோன் அனுமதி வழங்கவும் அல்லது எழுதும் விருப்பத்தைப் பயன்படுத்தவும்.',
  sttUnsupported: 'இந்த உலாவியில் குரல் அடையாளம் காணப்படவில்லை. எழுதும் விருப்பத்தைப் பயன்படுத்தவும்.',
  sttNoSpeech: 'எந்தக் குரலும் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.',
  patientResponse: 'நோயாளர் பதில்',
  printReport: 'அறிக்கையை அச்சிடு',
  downloadPdf: 'PDF பதிவிறக்கு',
  pdfDownloaded: '✓ நோயாளர் வரலாற்று அறிக்கை வெற்றிகரமாக பதிவிறக்கப்பட்டது',
  generatingReport: 'அறிக்கை உருவாக்கப்படுகிறது...',
  reportTitle: 'கட்டமைக்கப்பட்ட நோயாளர் வரலாறு',
  generatedOn: 'உருவாக்கிய நேரம்',
  reportDocs: 'பார்க்கப்பட்ட மருத்துவ ஆவணங்கள்',
  aiSummaryTitle: 'AI உதவியுடன் உருவாக்கிய மருத்துவச் சுருக்கம்',
  aiSummarySub: 'நோயாளர் தகவல், குரல் உரையாடல், மருத்துவ ஆவணங்களிலிருந்து மருத்துவர் மதிப்பீட்டுக்காக கட்டமைக்கப்பட்டது.',
  physicianReview: 'மருத்துவர் மதிப்பீடு தேவை',
  extractedFromDocs: 'பதிவேற்றம்/ஸ்கேன் செய்யப்பட்ட ஆவணங்களிலிருந்து எடுக்கப்பட்டது',
  pdfPrinted: '✓ நோயாளர் வரலாற்று அறிக்கை அச்சிட அனுப்பப்பட்டது',

  piTitle: 'நோயாளர் தகவல்',
  piSub: 'ஆலோசனைக்கு முன் மருத்துவர் உங்களை அறிந்துகொள்ள உங்கள் விவரங்களை உள்ளிடவும்.',
  piName: 'முழுப் பெயர்',
  piNameHint: 'உங்கள் அடையாள அட்டைப்படி',
  piAge: 'வயது',
  piGender: 'பாலினம்',
  piMale: 'ஆண்',
  piFemale: 'பெண்',
  piOther: 'மற்றவர்',
  piPhone: 'கைபேசி எண்',
  piCity: 'நகரம்',
  piState: 'மாநிலம்',
  piStatePlaceholder: 'மாநிலத்தைத் தேர்வு செய்யவும்',
  piSelectStateFirst: 'முதலில் மாநிலத்தைத் தேர்வு செய்யவும்',
  piStateErr: 'மாநிலத்தைத் தேர்வு செய்யவும்',
  piCityErr: 'நகரத்தைத் தேர்வு செய்யவும்',
  piCityPlaceholder: 'நகரத்தைத் தேர்வு செய்யவும்',
  searchPlaceholder: 'தேடுங்கள்',
  piComplaint: 'முக்கியப் பிரச்சனை / மருத்துவமனை வந்த காரணம்',
  piComplaintHint: 'இன்று ஏன் வந்தீர்கள் என்பதை உங்கள் சொற்களில் கூறுங்கள்',
  piNameErr: 'முழுப் பெயரை உள்ளிடவும்',
  piAgeErr: 'சரியான வயதை உள்ளிடவும் (1-120)',
  piPhoneErr: 'சரியான 10 இலக்கக் கைபேசி எண்ணை உள்ளிடவும்',
  piPhonePlaceholder: '10 இலக்கக் கைபேசி எண்ணை உள்ளிடவும்',
  piComplaintErr: 'உங்கள் முக்கியப் பிரச்சனையைக் குறிப்பிடவும்',
  piFormNote: 'இந்தத் தகவல் இன்றைய சந்திப்புக்கு மட்டுமே; உங்கள் கியோஸ்க் அமர்வுடன் இணைக்கப்படும்.',
  emptyNone: 'கியோஸ்கில் கூறப்படவில்லை',
  dashPhoneLabel: 'கைபேசி',
  dashCityLabel: 'நகரம்',
  docDate: 'ஆவணத் தேதி',
  docMedication: 'மருந்து',
  docInvestigation: 'சோதனை',
  docTranscribed: 'ஸ்கேன் செய்யப்பட்ட ஆவணத்திலிருந்து எழுதப்பட்டது',
  riskFlagDetail: '{age} வயது, இன்டேக்கில் பல இதய ஆபத்துக் காரணிகள் கூறப்பட்டன',
  categoryLabels: { headache: 'தலைவலி', chest: 'மார்பு வலி', abdomen: 'வயிற்று வலி', cough: 'இருமல்', fever: 'காய்ச்சல்', general: 'பொது' },
  interview: {
    headache: ['தலைவலி எப்போது முதலில் வந்தது?', 'வலி திடீரென வந்ததா அல்லது மெதுவாக வந்ததா?', 'தலையின் எந்தப் பகுதியில் வலி இருக்கிறது?', 'வலி எப்படி இருக்கிறது - துடிப்பா அல்லது அழுத்தமா?'],
    chest: ['மார்பு வலி எப்போது தொடங்கியது?', 'வலி எங்கே உணரப்படுகிறது?', 'வலி வேறு இடத்திற்குப் பரவுகிறதா?', 'நடக்கும்போது வலி அதிகரிக்கிறதா?'],
    abdomen: ['வயிற்று வலி எப்போது தொடங்கியது?', 'வயிற்றில் எங்கே வலி - மேலே, கீழே, இடது அல்லது வலது பக்கம்?', 'சாப்பிட்ட பின் வலி மாறுகிறதா?', 'கழிப்பறை சென்றால் ஆறுதல் கிடைக்கிறதா?'],
    cough: ['இருமல் எப்போது இருந்து?', 'இருமலில் சளி வருகிறதா அல்லது உலர் இருமலா?', 'இருமல் தூக்கத்தைப் பாதிக்கிறதா?', 'நடக்கும்போது மூச்சு வாங்குகிறதா?'],
    fever: ['காய்ச்சல் எப்போது இருந்து?', 'காய்ச்சல் இரவில் அதிகமா இருக்கிறதா அல்லது பகலிலா?', 'காய்ச்சலுடன் உடல் வலி அல்லது வேர்க்குரல் இருக்கிறதா?', 'பசி அல்லது தாகம் குறைந்திருக்கிறதா?'],
    general: ['இந்தப் பிரச்சனை எப்போது இருந்து?', 'இந்தப் பிரச்சனை முன்பும் வந்திருக்கிறதா?', 'நீங்கள் தற்போது ஏதேனும் மருந்து எடுத்துக்கொள்கிறீர்களா?', 'உங்களுக்கு ஏதேனும் அறியப்பட்ட ஒவ்வாமை இருக்கிறதா?', 'நீங்கள் புகை அல்லது பானமசாலை எடுக்கிறீர்களா?'],
  },
  voiceAnswer: 'குரல் வழியாகப் பதில் பதிவு',
  quickYes: 'ஆம்',
  quickNo: 'இல்லை',
  quickUnknown: 'தெரியவில்லை',
  riskFlagTitle: 'வயது மற்றும் ஆபத்துக் காரணிப் பகுத்றிவு',
  flagTemplates: {
    headache: { title: 'திடீர் அல்லது தீவிரத் தலைவலிப் பகுத்றிவு', detail: 'திடீரான, தீவிரமான அல்லது முந்தையதை விட வேறுபட்ட தலைவலி சரியான நேரத்தில் மருத்துவ மதிப்பீடு தேவைப்படலாம்.' },
    chest: { title: 'சரியான நேரத்தில் மதிப்பீடு தேவைப்படும் மார்பு வலிப் பகுத்றிவு', detail: 'உடற்பயிற்சியுடன் தொடர்புடைய அல்லது துணை அறிகுறிகள் உள்ள மார்பு வலி விரைவான மருத்துவ மதிப்பீடு தேவைப்படலாம்.' },
    abdomen: { title: 'தொடர்ச்சியான வயிற்று வலிப் பகுத்றிவு', detail: 'தீவிரமான அல்லது நிற்காத வயிற்று வலி, குறிப்பாக வாந்தியுடன், சரியான நேரத்தில் மதிப்பீடு தேவைப்படலாம்.' },
    cough: { title: 'நீடித்த அல்லது மூச்சுவிடச் சிரமப்படும் இருமல் பகுத்றிவு', detail: 'வாரங்கள் நீடிக்கும் இருமல் அல்லது மூச்சுவிடச் சிரமத்துடன் கூடிய இருமல் மருத்துவ மதிப்பீடு தேவைப்படலாம்.' },
    fever: { title: 'நீடித்த காய்ச்சல் பகுத்றிவு', detail: 'நாட்கள் நீடிக்கும் காய்ச்சல் அல்லது உணவு குறைவுடன் கூடிய காய்ச்சல் மருத்துவ மதிப்பீடு தேவைப்படலாம்.' },
    general: { title: 'தொடரும் அல்லது மோசமடையும் புகார்', detail: 'தொடரும் அல்லது மோசமடையும் புகாரை சரியான நேரத்தில் மருத்துவர் பரிசோதிக்க வேண்டும்.' },
  },
};

const TE: Strings = {
  back: '← వెనుకకు',
  continueBtn: 'కొనసాగించండి →',

  consentHeader: 'రోగి సమ్మతి',
  consentTitle: 'ప్రారంభించే ముందు',
  consentIntro: 'MediKiosk మీ ఆరోగ్యం గురించి ప్రశ్నలు అడిగి, మీ వైద్యుని కోసం వైద్య చరిత్రను సిద్ధం చేయడానికి సమాచారం సేకరిస్తుంది.',
  whyTitle: 'ఈ సమాచారాన్ని ఎందుకు సేకరిస్తున్నారు?',
  whyBody: 'సంప్రదింపు ముందు మీ వైద్య చరిత్రను సిద్ధం చేయడానికి.',
  privacyTitle: 'గోప్యత',
  privacyBody: 'మీ సమాచారం ఈ ప్రదర్శన కోసం, దానిని సురక్షితంగా ఉంచాలి.',
  importantTitle: 'ముఖ్యమైనది',
  importantBody: 'MediKiosk వ్యాధిని చెప్పదు, మందు రాయదు.',
  listenExplanation: 'వివరణ వినండి',
  playingExplanation: 'వివరణ వినిపిస్తోంది...',
  audioSuffix: 'సెకన్ల సారాంశం, వినడానికి ఇష్టపడేవారికి',
  consentCheckbox: 'నా సమాచారం నా వైద్య చరిత్రను సిద్ధం చేయడానికి ఉపయోగిస్తారని నేను అర్థం చేసుకున్నాను.',
  consentBtn: 'నేను అర్థం చేసుకున్నాను, సమ్మతిస్తున్నాను →',

  convHeader: 'AI రోగి సంభాషణ',
  convSub: 'మాట్లాడండి, రాయండి లేదా తాకండి - మీ మాటల్లో సమాధానం ఇవ్వండి',
  greeting: 'నమస్తే {name}. ఏ సమస్య వల్ల ఆసుపత్రికి రావాల్సి వచ్చింది?',
  patientReply: 'ఆరోగ్య సమస్యకు సహాయం కావాలి.',
  aiThanks: 'ధన్యవాదాలు. మీ సమాధానం అర్థమైంది. ఇప్పుడు కొన్ని సులభమైన ప్రశ్నలు అడుగుతాను - దీనికి 2-3 నిమిషాలు పడుతుంది.',
  speakNow: 'ఇప్పుడు మాట్లాడండి...',
  processingSpeech: 'మాటలను వ్రాస్తున్నాము...',
  tapToSpeak: 'మైక్రోఫోన్ నొక్కి మీ మాటల్లో సమాధానం ఇవ్వండి.',
  capturedAgain: 'సమాధానం నమోదైంది. మళ్లీ మాట్లాడటానికి నొక్కండి.',
  lblSpeak: 'మాట్లాడండి',
  lblType: 'రాయండి',
  lblTouch: 'తాకండి',
  readyLabel: 'సిద్ధం',
  listeningLabel: 'వింటున్నాము',
  processingLabel: 'ప్రాసెసింగ్',
  capturedLabel: 'నమోదైంది',
  continueInterview: 'ఇంటర్వ్యూ కొనసాగించండి →',
  capturedViaVoice: 'వాయిస్ ద్వారా నమోదు',
  chips: ['చెమటలు', 'ఆందోళన', 'తల తిరగడం', 'వాంతి', 'బలహీనతం', 'ఇంకే సమస్య లేదు'],

  adaptiveHeader: 'అనుకూల ప్రశ్నలు',
  adaptiveSub: 'మీ ఫిర్యాదు ఆధారంగా ప్రశ్నలు',
  questions: ['నొప్పి ఎప్పుడు మొదలైంది?', 'నొప్పి శరీరంలో ఎక్కడ అనిపిస్తోంది?', 'నొప్పి వేరే చోటికి వ్యాపిస్తుందా?', 'నొప్పిని పెంచేది లేదా తగ్గించేది ఏమైనా ఉందా?'],
  qOptions: [
    ['ఈరోజు ఉదయమే', '2 రోజుల క్రితం', 'ఒక వారం నుంచి', 'ఇంతకు ముందు కూడా వచ్చింది'],
    ['ఛాతీ మధ్యలో', 'ఎడమ ఛాతీలో', 'కుడి ఛాతీలో', 'పొత్తికడుపు పైన'],
    ['అవును, ఎడమ చేతిలో', 'అవును, మెడ, దవడలో', 'అవును, వీపులో', 'లేదు, అక్కడే ఉంటుంది'],
    ['నడిచేటప్పుడు పెరుగుతుంది', 'విశ్రాంతితో తగ్గుతుంది', 'లోతుగా శ్వాస తీసుకుంటే పెరుగుతుంది', 'తిన్న తర్వాత పెరుగుతుంది'],
  ],
  skipQuestion: 'ఈ ప్రశ్నను దాటవేయండి',
  clinicalInfo: 'వైద్య సమాచారం',
  clinicalInfoSub: 'ప్రతి సమాధానంతో సమాచారం నవీకరించబడుతుంది',
  rows: { complaint: 'ప్రధాన ఫిర్యాదు', duration: 'కాల వ్యవధి', location: 'స్థానం', radiation: 'వ్యాప్తి', aggravating: 'పెంచే అంశాలు', relieving: 'తగ్గించే అంశాలు' },
  pending: 'పెండింగ్‌లో ఉంది',
  questionsAnswered: 'అడిగిన ప్రశ్నలు',
  continueDocs: 'పత్రాల వైపు వెళ్లండి',
  branchNotice: 'శాఖ తర్కం: "{complaint}" ఆధారంగా సంబంధిత ప్రశ్నలు స్వయంచాలకంగా ఎంపికయ్యాయి.',

  scanHeader: 'వైద్య పత్రాల స్కానింగ్',
  scanTitle: 'మీ వైద్య పత్రాలను స్కాన్ చేయండి',
  scanIntro: 'వైద్యునికి అవసరమైన సమాచారాన్ని MediKiosk తీసుకోవడానికి మునుపటి పత్రాలను జోడించండి.',
  docTitles: ['మందు చీటీ', 'ల్యాబ్ రిపోర్ట్', 'డిస్ఛార్జ్ సారాంశం', 'పరీక్షా నివేదిక'],
  scanAll: 'అన్ని పత్రాలను స్కాన్ చేయండి',
  scanLabel: 'స్కాన్ చేయండి',
  ocrPipeline: 'OCR ప్రక్రియ',
  stages: ['పత్రం అప్‌లోడ్', 'స్కానింగ్', 'పాఠ్య గుర్తింపు', 'వైద్య పద గుర్తింపు', 'నిర్మిత డేటా'],
  extractedInfo: 'తీసిన సమాచారం',
  extractionComplete: 'తీయడం పూర్తయింది',
  ocrConfidence: 'OCR ఖచ్చితత్వం',
  draftNote: 'తీసిన సమాచారం ముసాయిదే, వైద్యుని ధృవీకరణ అవసరం.',
  scanNotice: 'తీసిన సమాచారం ముసాయిదే, వైద్యుని ధృవీకరణ అవసరం. MediKiosk ఫలితాలను వివరించదు, మందులు మార్చదు.',

  procHeader: 'AI ప్రాసెసింగ్',
  sourceVoice: 'వాయిస్',
  sourceTouch: 'టచ్',
  sourceDocs: 'వైద్య పత్రాలు',
  structuredHistory: 'నిర్మిత రోగి చరిత్ర',
  stageLabels: ['వాయిస్ లిప్యంతరీకరణ', 'వైద్య పద గుర్తింపు', 'సమాచార సేకరణ', 'ప్రామాణీకరణ', 'వైద్య నిర్మాణం'],
  disclaimer: 'వైద్యుని సమీక్ష, సంప్రదింపు కోసం సిద్ధం చేయబడింది.',
  viewStructured: 'నిర్మిత చరిత్రను చూడండి →',
  procReady: 'ముసాయిదా వైద్యుని ధృవీకరణకు సిద్ధంగా ఉంది.',
  procWorking: 'వాయిస్, టచ్, పత్రాలను కలుపుతున్నాము...',

  flagHeader: 'ఎర్ర జెండా భద్రతా హెచ్చరిక',
  alertTitle: 'తీవ్రమైన లక్షణాలు గుర్తించబడ్డాయి',
  alertBody: 'ఇచ్చిన సమాచారం ప్రకారం కొన్ని లక్షణాలకు సకాలంలో పరీక్ష అవసరం కావచ్చు.',
  alertPriority: 'దయచేసి పరీక్షకు ప్రాధాన్యత ఇవ్వండి.',
  urgent: 'ప్రాధాన్యత: అత్యవసరం',
  noReplace: 'ఈ ఇంటేక్ ప్రక్రియ వైద్యుని పరీక్షకు ప్రత్యామ్నాయం కాదు',
  noDiagnosis: 'MediKiosk వ్యాధిని చెప్పదు. ఇది భద్రతా పరీక్ష మాత్రమే - పేరు లేదా మందు చెప్పదు.',
  whatTriggered: 'స్క్రీన్ ఎందుకు ప్రారంభమైంది',
  ackText: 'ఈ సమాచారాన్ని రోగి, వారి వద్దకు వచ్చిన వ్యక్తికి చూపించాను',
  continueDashboard: 'వైద్యుని డాష్‌బోర్డ్‌కు వెళ్లండి →',

  welcomeHeadline: 'రోగి చరిత్ర,\nవైద్యుని కలిసేముందే\nసిద్ధం.',
  welcomeBody:
    'MediKiosk రోగితో వారి సొంత భాషలో మాట్లాడుతుంది, వారి పత్రాలు చదివి నిర్మిత వైద్య చరిత్ర ముసాయిదా తయారు చేస్తుంది - వైద్యుడు క్లిప్‌బోర్డుకు బదులుగా రోగితో సంప్రదింపు ప్రారంభించగలరు.',
  startHistory: 'రోగి చరిత్రను ప్రారంభించండి →',
  viewDashboard: 'వైద్యుని డాష్‌బోర్డ్ చూడండి',
  liveMode: 'లైవ్ ప్రదర్శన మోడ్',
  sihBadge: 'స్మార్ట్ ఇండియా హ్యాకథాన్ 2026 - ప్రోటోటైప్',
  featuresTitle: 'ఔట్‌పేషియంట్ కోసం రూపొందించినది',
  featuresSub: 'ఐదు సామర్థ్యాలు, 90 సెకన్ల కియోస్క్ ప్రక్రియ',
  featureTitles: ['వాయిస్ సంభాషణ', 'టచ్ ఆధారిత ఇన్‌పుట్', 'బహుభాషా మద్దతు', 'వైద్య పత్రాల తెలివితేటలు', 'సురక్షితం & గోప్యం'],
  featureBodies: [
    'రోగి తన మాటల్లో సమాధానం ఇస్తారు. వాయిస్ వైద్య పదాలతో లైవ్‌గా నమోదవుతుంది.',
    'పెద్ద బటన్లు, అవును/కాదు ఎంపికలు, చిత్ర ఎంపికలు - వృద్ధులు, తక్కువ చదువుకున్నవారికి.',
    'హిందీ, మరాఠీ, గుజరాతీ, బెంగాలీ, తమిళం, తెలుగు సహా 12 భారతీయ భాషలు.',
    'కియోస్క్‌లోనే మందు చీటీలు, ల్యాబ్ రిపోర్టులు, డిస్ఛార్జ్ సారాంశం చదివి నిర్మిత డేటా తయారవుతుంది.',
    'డేటా సురక్షితంగా ఉంటుంది, సందర్శన తర్వాత స్వయంచాలకంగా తొలగిపోతుంది, ఆసుపత్రి నెట్‌వర్క్ దాటదు.',
  ],
  howTitle: 'ఇది ఎలా పనిచేస్తుంది',
  howSub: 'రోగి → వాయిస్, టచ్, పత్రాలు → AI ఇంటేక్ → నిర్మిత చరిత్ర → వైద్యుని ధృవీకరణ → సంప్రదింపు',
  howStages: ['రోగి', 'వాయిస్ + టచ్ + పత్రాలు', 'MediKiosk AI ఇంజిన్', 'నిర్మిత వైద్య చరిత్ర', 'వైద్యుని ధృవీకరణ', 'సంప్రదింపు'],
  metaBlock: 'IET DAVV - M BLOCK',
  metaOffline: 'ఆసుపత్రి నెట్‌వర్క్‌లో, ఆఫ్‌లైన్ సామర్థ్యం',
  metaPurge: 'సందర్శన తర్వాత స్వయంచాలకంగా తొలగింపు',
  designedFor: 'దీని కోసం రూపొందించబడింది',
  designedForValue: 'ప్రభుత్వ వైద్య కళాశాలలు • AYUSH ఔట్‌పేషియంట్ • జిల్లా ఆసుపత్రులు • రద్దీ ఔట్‌పేషియంట్',

  consentRecordTitle: 'సమ్మతి నమోదు',
  consentRecordSub: 'ఈ సందర్శనతో జోడించబడుతుంది',
  consentRows: ['రోగి', 'సమ్మతి విధానం', 'భాష', 'కియోస్క్', 'సమయం'],

  assistantName: 'MediKiosk సహాయకుడు',
  intakeMode: 'వైద్య ఇంటేక్ మోడ్',
  chipsHeader: 'వర్తించేదాన్ని తాకండి',
  tapped: 'తాకబడింది',
  typePlaceholder: 'సమస్యను ఇక్కడ రాయండి',
  confidenceLabel: 'సమాచార తీసుకునే ఖచ్చితత్వం',
  inputMethodKv: 'ఇన్‌పుట్ విధానం',
  inputMethodInUse: 'వాడుకలో ఉన్న ఇన్‌పుట్ విధానం',
  recordToContinue: 'కొనసాగడానికి ఒక సమాధానం నమోదు చేయండి',
  draftOnlyNotice: 'ఇది ముసాయిదా మాత్రమే. వైద్యుడు ధృవీకరించిన తర్వాతే ప్రతి వివరం కేస్ షీట్‌లో భాగమవుతుంది.',
  micStart: 'మాట్లాడటం ప్రారంభించండి',
  micStop: 'రికార్డింగ్ ఆపండి',

  questionOf: 'ప్రశ్న {n} / {m}',
  doneTitle: 'ఇంటర్వ్యూ పూర్తయింది',
  doneBody: 'అన్ని {m} ప్రశ్నలు అడగబడ్డాయి. మిగిలినవి వాయిస్ నమోదు నుండి స్వయంచాలకంగా పరిష్కరించబడ్డాయి - మళ్లీ చెప్పాల్సిన అవసరం లేదు.',
  badgeQuestions: '{n} ప్రశ్నలు',
  badgeDocuments: '{n} పత్రాలు',
  badgeRedFlag: '{n} భద్రతా సంకేతం',
  prevQuestion: 'మునుపటి ప్రశ్న',
  panelNotice: 'ఈ ప్యానెల్ AI ముసాయిదా మాత్రమే. ఇందులో వ్యాధి లేదు, ఏదీ రోగికి ఫలితంగా చూపబడదు.',

  scanSub: 'OCR ద్వారా మందులు, పరీక్షలు, తేదీలు తీసుకోబడతాయి',
  scanHint: 'పత్రాన్ని స్కానర్ బెడ్‌పై ఉంచండి లేదా కెమెరా ఉపయోగించండి.',
  scanAgain: 'మళ్లీ స్కాన్ చేయండి',
  docsRead: '{total}లో {done} పత్రాలు చదవబడ్డాయి',
  docsInProgress: '{n} నడుస్తున్నాయి',

  procSub: 'వాయిస్, టచ్, పత్రాలు ఒకే చరిత్రలో కలుపుతున్నాయి',
  draftReadyTime: '4.8 సెకన్లలో ముసాయిదా సిద్ధం',
  workingTitle: 'సమాచారం కలుపుతోంది...',
  badgeComplete: 'పూర్తి',
  badgeRunning: 'నడుస్తోంది',
  waitingEngine: 'ఇంజిన్ కోసం వేచి ఉంది...',
  outputReady: 'ముసాయిదా సిద్ధం - 12 వివరాలు, 4 పత్రాలు, 3 భద్రతా సంకేతాలు',

  whatsNext: 'ముందు ఏమి జరుగుతుంది',
  nextTitles: ['వైద్యుడు హెచ్చరిక చూస్తారు', 'అత్యవసర పరీక్ష ముందు', 'రోగి భయపడరు'],
  nextBodies: [
    'ముసాయిదా చరిత్ర భద్రతా బ్యానర్‌తో తెరుచుకుంటుంది.',
    'వైద్యుడు పిలవక ముందు నర్స్ BP, SpO2, ECG నమోదు చేస్తారు.',
    'కియోస్క్ రోగికి వైద్యుడు త్వరగా పిలుస్తారని మాత్రమే చెబుతుంది.',
  ],
  showProtocol: 'అత్యవసర ప్రోటోకాల్ చూపించు',
  demoNoCall: 'ప్రదర్శన వెర్షన్ - ఎలాంటి కాల్ ఉండదు',
  protocolTitle: 'అత్యవసర ప్రోటోకాల్',
  protocolBody: 'నిజమైన వ్యవస్థలో ఇది ఆసుపత్రి అత్యవసర నంబర్ తెరిచి డ్యూటీ రిజిస్ట్రార్‌కు తెలియజేస్తుంది. ఇది ప్రోటోటైప్ కాబట్టి కాల్ జరగదు.',
  closeLabel: 'మూసివేయండి',
  emergencyNote: 'జాతీయ అత్యవసర నంబర్: 108 · ఆసుపత్రి ఎక్స్టెన్షన్: 2211',

  successTitle: 'రోగి చరిత్ర విజయవంతంగా సిద్ధమైంది',
  successBody: 'కియోస్క్ ప్రక్రియ పూర్తయింది. ఈ సందర్శన యొక్క నిర్మిత చరిత్ర ఇప్పుడు వైద్యుని ధృవీకరణ, సంప్రదింపుకు సిద్ధంగా ఉంది.',
  flowTitles: ['రోగి', 'వాయిస్ + టచ్ + పత్రాలు', 'AI వైద్య ఇంటేక్', 'నిర్మిత చరిత్ర', 'వైద్యుని ధృవీకరణ', 'సంప్రదింపు'],
  flowSubs: [
    'IET DAVV - M BLOCK',
    '12 ప్రశ్నలు · 4 పత్రాలు స్కాన్',
    'లిప్యంతరీకరణ, సమాచార సేకరణ, భద్రతా పరీక్ష',
    'కాలక్రమంతో SOAP ముసాయిదా',
    'డా. ఏ. మెహతా ధృవీకరణ & సంతకం',
    'వైద్యుడు రోగిని కలుస్తారు - పత్రాలను కాదు',
  ],
  impactTitle: 'ఈ కియోస్క్ ప్రభావం',
  impactLabels: ['మొత్తం ఇంటేక్ సమయం', 'వైద్యుని పత్రాల సమయం', 'సగటు OCR ఖచ్చితత్వం', 'రోగి సౌలభ్యం'],
  tagline: 'తక్కువ సమయం పత్రాలకు.\nఎక్కువ సమయం రోగి సేవకు.',
  startNewDemo: 'కొత్త ప్రదర్శన ప్రారంభించండి',
  backToDashboard: 'వైద్యుని డాష్‌బోర్డ్‌కు తిరిగి',
  verifiedBadge: 'వైద్యుడు ధృవీకరించారు',
  unverifiedBadge: 'ముసాయిదా ధృవీకరించబడలేదు',
  endToEndJourney: 'ప్రారంభం నుండి చివరి వరకు',
  journeyNotice: 'నమూనా డేటా మాత్రమే. MediKiosk చరిత్ర ముసాయిదా తయారు చేస్తుంది; తుది నిర్ణయం ఎల్లప్పుడూ అర్హులైన వైద్యునిది.',
  fieldCharacter: 'స్వభావం',
  fieldAssociated: 'సంబంధిత లక్షణాలు',
  fieldStatus: 'స్థితి',
  fieldOnset: 'ప్రారంభం',
  tapAnswer: 'సరైన సమాధానాన్ని తాకండి',
  docHints: ['ఓపీడీ మందు చీటీ', 'ల్యాబొరేటరీ రిపోర్టు', 'గత ఆసుపత్రి సందర్శన', 'ముద్రిత పరీక్షా నివేదిక'],
  processedBadge: 'పరికరంలోనే ప్రాసెసింగ్ · {n} ఫైళ్లు',
  consentModeAudio: 'వాయిస్ + వ్రాత',
  consentModeWritten: 'వ్రాత',
  taglineSub: 'AI-ఆధారిత వైద్య ఇంటేక్ ప్లాట్‌ఫారమ్',

  dashTitle: 'రోగి డాష్‌బోర్డ్',
  dashSub: 'మెడిసిన్ ఔట్‌పేషియంట్ · డా. ఏ. మెహతా · నవీకరణ {time}',
  dashLive: 'లైవ్',
  dashAttendant: 'సహవాసి',
  dashKioskLabel: 'కియోస్క్',
  dashLangLabel: 'భాష',
  dashAttendantValue: '—',
  dashMale: 'పురుషుడు',
  dashAgeLine: '{age} సంవత్సరాలు · {sex} · MRN {mrn}',
  dashBannerTitle: 'AI సృష్టించిన ముసాయిదా - వైద్యుని ధృవీకరణ అవసరం',
  dashBannerBody: 'కింది ఏ వివరమూ వైద్యపరంగా ధృవీకరించబడలేదు. కేస్ షీట్‌లో చేర్చే ముందు ప్రతి వివరాన్ని సమీక్షించండి.',
  dashVerifiedTitle: 'డా. ఏ. మెహతా ధృవీకరించారు',
  dashVerifiedBody: 'మెడిసిన్ ఔట్‌పేషియంట్ · {stamp} · ఆడిట్ ID AUD-77120',
  dashTabHistory: 'వైద్య చరిత్ర',
  dashTabTimeline: 'వైద్య కాలక్రమం',
  dashTabDocuments: 'పత్రాలు',
  dashHpi: 'ప్రస్తుత వ్యాధి చరిత్ర',
  dashPmh: 'గత వైద్య చరిత్ర',
  dashMeds: 'ప్రస్తుత మందులు',
  dashAllergies: 'అలర్జీలు',
  dashInvestigations: 'గత పరీక్షలు',
  dashStructuredFields: 'కియోస్క్‌లో నమోదైన నిర్మిత వివరాలు',
  dashAuditNote: 'సవరణలు మీ వైద్యుని IDతో ఆడిట్ లాగ్‌లో నమోదవుతాయి',
  dashEdit: 'సవరించు',
  dashMedsNote: 'రోగి చెప్పినట్లు - మోతాదులు MediKiosk ద్వారా ధృవీకరించబడలేదు.',
  dashStatLabels: ['ప్రశ్నలు', 'పత్రాలు', 'వాయిస్ సమయం', 'భద్రతా సంకేతాలు'],
  dashAyushBtn: 'AYUSH వైద్య మోడ్ తెరవండి',
  dashAyushAttached: 'AYUSH ఆకలన్ చేర్చబడింది',
  dashNotScanned: 'స్కాన్ చేయబడలేదు',
  dashIntakeSummary: 'ఇంటేక్ సారాంశం',
  flagLow: 'తక్కువ',
  flagHigh: 'ఎక్కువ',
  flagNormal: 'సాధారణం',
  dashEditHistory: 'చరిత్రను సవరించు',
  dashSaveEdits: 'సవరణలను సేవ్ చేయి',
  dashVerify: 'ధృవీకరించి నిర్ధారించు',
  dashVerifiedBtn: 'ధృవీకరించబడింది',
  dashSend: 'సంప్రదింపుకు పంపు',
  dashConfirmTitle: 'ఈ చరిత్రను నిర్ధారించాలా?',
  dashConfirmBody: 'నిర్ధారించినట్లయితే ముసాయిదా మీ వైద్యుని IDతో సంతకమై సంప్రదింపు జాబితాకు వెళుతుంది. మీ సవరణలు ఆడిట్ లాగ్‌లో ఉంటాయి.',
  dashConfirmYes: 'అవును, చరిత్రను ధృవీకరించు',
  dashCancel: 'రద్దు',
  timelineTitle: 'వైద్య కాలక్రమం',
  timelineSub: 'కియోస్క్ ఇంటేక్, ఆసుపత్రి నమోదుల సమన్వయం',
  timelineTitles: ['కియోస్క్‌లో ఇంటేక్ ప్రారంభం', 'ప్రధాన ఫిర్యాదు నమోదు', 'పత్రాలు స్కాన్', 'భద్రతా పరీక్ష', 'చరిత్ర నిర్మాణం', 'వైద్యుని ధృవీకరణ'],
  timelineBodies: [
    '{kiosk}లో చెక్-ఇన్ · భాష {lang}',
    'ప్రధాన ఫిర్యాదు నమోదు: {complaint}',
    'ఈ సెషన్‌లో {n} పత్రాలు స్కాన్',
    'నియమ-ఆధారిత భద్రతా పరీక్ష పూర్తి - {n} సంకేతాలు పంపబడ్డాయి',
    'వైద్యుని సమీక్ష కోసం నిర్మిత చరిత్ర సిద్ధం',
    'ధృవీకరించి సంప్రదింపు జాబితాకు పంపబడింది',
  ],

  ayushModeTitle: 'AYUSH వైద్య మూల్యాంకన మోడ్',
  ayushModeSub: 'అదే రోగి కోసం సమాంతర ఆయుర్వేద మూల్యాంకనం',
  ayushDosha: 'దోష సమతుల్యత',
  ayushDoshaSub: '42 ప్రశ్నల సమాధానాల నుండి',
  ayushInterpLabel: 'వివరణ (ముసాయిదా)',
  ayushInterpBody: 'ఆగ్నేయ ప్రకృతిపై పిత్త వృద్ధి వికృతి. అగ్ని తీక్ష్ణ, కోష్ఠ మృదు - కియోస్క్‌లో చెప్పిన ఆహార, నిద్ర విధానాలతో సరిపోలుతుంది. వైద్యుడు సంబంధం సమీక్షించాలి.',
  ayushDasha: 'దశవిధ పరీక్ష',
  ayushDashaSub: 'కియోస్క్‌లో నమోదైన పది అంశాల పరీక్ష',
  ayushTablePart: 'పరీక్ష',
  ayushTableFinding: 'ఫలితం',
  ayushInclude: 'రోగి చరిత్రలో చేర్చు',
  ayushIncluded: 'రోగి చరిత్రలో చేర్చబడింది',
  ayushBack: 'వైద్యుని డాష్‌బోర్డ్‌కు తిరిగి',

  extractTitle: 'లైవ్ వైద్య సమాచారం',
  extractSub: 'రోగి మాట్లాడుతుండగానే నవీకరించబడుతుంది',
  scannedBadge: 'స్కాన్ చేయబడింది',
  readingBadge: 'చదవబడుతోంది',
  engineSub: 'ASR · NER · OCR · నియమ-ఆధారిత భద్రతా పరీక్ష',
  crashTeam: 'అత్యవసర బృందం సిద్ధం - ప్రధాన OT కారిడార్',
  declineNote: 'నిరాకరిస్తే మీ చికిత్సపై ప్రభావం ఉండదు. నర్స్ మీ చరిత్రను స్వయంగా నమోదు చేసుకుంటారు.',
  send: 'పంపు',
  sttCaptured: '✓ వాయిస్ నమోదైంది',
  sttDenied: 'వాయిస్ ఇన్‌పుట్‌కు మైక్రోఫోన్ అవసరం. దయచేసి మైక్రోఫోన్ అనుమతి ఇవ్వండి లేదా టైప్ చేసే ఎంపికను ఉపయోగించండి.',
  sttUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు అందుబాటులో లేదు. టైప్ చేసే ఎంపికను ఉపయోగించండి.',
  sttNoSpeech: 'ఏ వాయిస్ గుర్తించబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
  patientResponse: 'రోగి సమాధానం',
  printReport: 'నివేదికను ముద్రించండి',
  downloadPdf: 'PDF డౌన్‌లోడ్ చేయండి',
  pdfDownloaded: '✓ రోగి చరిత్ర నివేదిక విజయవంతంగా డౌన్‌లోడ్ అయింది',
  generatingReport: 'నివేదిక తయారవుతోంది...',
  reportTitle: 'నిర్మిత రోగి చరిత్ర',
  generatedOn: 'తయారైన సమయం',
  reportDocs: 'చూసిన వైద్య పత్రాలు',
  aiSummaryTitle: 'AI సహాయంతో తయారైన వైద్య సారాంశం',
  aiSummarySub: 'రోగి సమాచారం, వాయిస్ సంభాషణ, వైద్య పత్రాల నుండి వైద్యుని సమీక్ష కోసం నిర్మించబడింది.',
  physicianReview: 'వైద్యుని సమీక్ష అవసరం',
  extractedFromDocs: 'అప్‌లోడ్/స్కాన్ చేసిన పత్రాల నుండి తీసినది',
  pdfPrinted: '✓ రోగి చరిత్ర నివేదిక ముద్రణకు పంపబడింది',

  piTitle: 'రోగి సమాచారం',
  piSub: 'సంప్రదింపు ముందు వైద్యుడు మిమ్మల్ని తెలుసుకోవడానికి మీ వివరాలు నమోదు చేయండి.',
  piName: 'పూర్తి పేరు',
  piNameHint: 'మీ గుర్తింపు కార్డు ప్రకారం',
  piAge: 'వయస్సు',
  piGender: 'లింగం',
  piMale: 'పురుషుడు',
  piFemale: 'స్త్రీ',
  piOther: 'ఇతరులు',
  piPhone: 'మొబైల్ నంబర్',
  piCity: 'నగరం',
  piState: 'రాష్ట్రం',
  piStatePlaceholder: 'రాష్ట్రాన్ని ఎంచుకోండి',
  piSelectStateFirst: 'మొదట రాష్ట్రాన్ని ఎంచుకోండి',
  piStateErr: 'రాష్ట్రాన్ని ఎంచుకోండి',
  piCityErr: 'నగరాన్ని ఎంచుకోండి',
  piCityPlaceholder: 'నగరాన్ని ఎంచుకోండి',
  searchPlaceholder: 'వెతకండి',
  piComplaint: 'ప్రధాన సమస్య / ఆసుపత్రికి రావడానికి కారణం',
  piComplaintHint: 'ఈరోజు ఎందుకు వచ్చారో మీ మాటల్లో చెప్పండి',
  piNameErr: 'పూర్తి పేరు నమోదు చేయండి',
  piAgeErr: 'సరైన వయస్సు నమోదు చేయండి (1-120)',
  piPhoneErr: 'సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
  piPhonePlaceholder: '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
  piComplaintErr: 'మీ ప్రధాన సమస్యను వివరించండి',
  piFormNote: 'ఈ సమాచారం ఈరోజు సందర్శనకు మాత్రమే; మీ కియోస్క్ సెషన్‌కు జోడించబడుతుంది.',
  emptyNone: 'కియోస్క్‌లో చెప్పబడలేదు',
  dashPhoneLabel: 'మొబైల్',
  dashCityLabel: 'నగరం',
  docDate: 'పత్రం తేదీ',
  docMedication: 'మందు',
  docInvestigation: 'పరీక్ష',
  docTranscribed: 'స్కాన్ చేసిన పత్రం నుండి నమోదు చేయబడింది',
  riskFlagDetail: '{age} సంవత్సరాల వయస్సు, ఇంటేక్‌లో బహుళ హృదయ ప్రమాద కారకాలు తెలిపారు',
  categoryLabels: { headache: 'తలనొప్పి', chest: 'ఛాతీ నొప్పి', abdomen: 'కడుపు నొప్పి', cough: 'దగ్గు', fever: 'జ్వరం', general: 'సాధారణ' },
  interview: {
    headache: ['తలనొప్పి ఎప్పటి నుండి ఉంది?', 'నొప్పి అకస్మాత్తుగా మొదలైందా లేక నెమ్మదిగానా?', 'తలలో ఏ భాగంలో నొప్పి ఉంది?', 'నొప్పి ఎలా ఉంది - కొట్టుకున్నట్లుగా లేదా ఒత్తిడిగా?'],
    chest: ['ఛాతీ నొప్పి ఎప్పుడు మొదలైంది?', 'నొప్పి ఎక్కడ అనిపిస్తోంది?', 'నొప్పి వేరే చోటికి వ్యాపిస్తుందా?', 'నడిచేటప్పుడు నొప్పి పెరుగుతుందా?'],
    abdomen: ['కడుపు నొప్పి ఎప్పుడు మొదలైంది?', 'కడుపులో ఎక్కడ నొప్పి - పైన, కింద, ఎడమ లేదా కుడి వైపు?', 'తిన్న తర్వాత నొప్పి మారుతుందా?', 'మలవిసర్జన చేస్తే ఉపశమనం వస్తుందా?'],
    cough: ['దగ్గు ఎప్పటి నుండి ఉంది?', 'దగ్గులో కఫం వస్తుందా లేదా పొడి దగ్గా?', 'దగ్గు మీ నిద్రను దెబ్బతీస్తుందా?', 'నడిచేటప్పుడు శ్వాస తీసుకోవడం కష్టంగా ఉంటుందా?'],
    fever: ['జ్వరం ఎప్పటి నుండి ఉంది?', 'జ్వరం రాత్రి ఎక్కువగా ఉంటుందా లేక పగలా?', 'జ్వరంతో ఒంటి నొప్పి లేదా చెమటలు ఉన్నాయా?', 'ఆకలి లేదా దాహం తక్కువగా ఉందా?'],
    general: ['ఈ సమస్య ఎప్పటి నుండి ఉంది?', 'ఈ సమస్య ముందు కూడా వచ్చిందా?', 'మీరు ప్రస్తుతం ఏదైనా మందు తీసుకుంటున్నారా?', 'మీకు తెలిసిన అలర్జీ ఉందా?', 'మీరు పొగ లేదా తంబాకు తీసుకుంటారా?'],
  },
  voiceAnswer: 'వాయిస్ ద్వారా సమాధానం నమోదు',
  quickYes: 'అవును',
  quickNo: 'కాదు',
  quickUnknown: 'తెలియదు',
  riskFlagTitle: 'వయస్సు, ప్రమాద కారకాల విధానం',
  flagTemplates: {
    headache: { title: 'అకస్మాత్తు లేదా తీవ్రమైన తలనొప్పి విధానం', detail: 'అకస్మాత్తుగా, తీవ్రంగా లేదా గతంలో కంటే భిన్నంగా ఉన్న తలనొప్పికి సకాలంలో వైద్య మూల్యాంకనం అవసరం కావచ్చు.' },
    chest: { title: 'సకాలంలో సమీక్ష అవసరమైన ఛాతీ నొప్పి విధానం', detail: 'వ్యాయామంతో ముడిపడిన లేదా అనుబంధ లక్షణాలు ఉన్న ఛాతీ నొప్పికి వేగవంతమైన వైద్య మూల్యాంకనం అవసరం కావచ్చు.' },
    abdomen: { title: 'నిరంతర ఉదర నొప్పి విధానం', detail: 'తీవ్రమైన లేదా తగ్గని కడుపు నొప్పి, ముఖ్యంగా వాంతులతో, సకాలంలో మూల్యాంకనం అవసరం కావచ్చు.' },
    cough: { title: 'దీర్ఘకాలిక లేదా శ్వాసతో కూడిన దగ్గు విధానం', detail: 'వారాల పాటు ఉన్న దగ్గు లేదా శ్వాస ఇబ్బందితో కూడిన దగ్గుకు వైద్య మూల్యాంకనం అవసరం కావచ్చు.' },
    fever: { title: 'దీర్ఘకాలిక జ్వరం విధానం', detail: 'రోజుల పాటు ఉన్న జ్వరం లేదా తక్కువ ఆహారంతో కూడిన జ్వరానికి వైద్య మూల్యాంకనం అవసరం కావచ్చు.' },
    general: { title: 'నిరంతరం లేదా తీవ్రమవుతున్న ఫిర్యాదు', detail: 'నిరంతరం లేదా తీవ్రమవుతున్న ఫిర్యాదును సకాలంలో వైద్యుడు సమీక్షించాలి.' },
  },
};

export const DICT: Record<string, Strings> = { en: EN, hi: HI, mr: MR, gu: GU, bn: BN, ta: TA, te: TE };

/** Replace {placeholders} in a translated template, e.g. fill(t.questionOf, { n: 4, m: 12 }). */
export function fill(template: string, vars: Record<string, string | number>): string {
  return Object.keys(vars).reduce((out, k) => out.split(`{${k}}`).join(String(vars[k])), template);
}

export function stringsFor(code: string | null | undefined): Strings {
  return (code && DICT[code]) || EN;
}

/** Resolve the active language from the session. Falls back to English. */
export function useT(): Strings {
  const { language } = useSession();
  return stringsFor(language?.code);
}

/** True when the UI should hide English sub-labels (they would duplicate the translation). */
export function useIsEnglish(): boolean {
  const { language } = useSession();
  return !language || language.code === 'en';
}
