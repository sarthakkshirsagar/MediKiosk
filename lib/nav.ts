export type RootStackParamList = {
  Welcome: undefined;
  Language: undefined;
  Consent: undefined;
  PatientInfo: undefined;
  Conversation: undefined;
  Adaptive: undefined;
  Scan: undefined;
  Processing: undefined;
  RedFlag: undefined;
  Dashboard: undefined;
  Ayush: undefined;
  Success: undefined;
};

export const TOTAL_STEPS = 12;

/** Step number of each route in the patient journey */
export const STEP_OF: Record<keyof RootStackParamList, number | undefined> = {
  Welcome: undefined,
  Language: 2,
  Consent: 3,
  PatientInfo: 4,
  Conversation: 5,
  Adaptive: 6,
  Scan: 7,
  Processing: 8,
  RedFlag: 9,
  Dashboard: 10,
  Ayush: 11,
  Success: 12,
};
