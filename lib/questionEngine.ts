/**
 * Complaint-oriented adaptive questioning engine.
 *
 * Patient Complaint -> Identify Complaint Category -> Select Relevant Question Set
 * -> Ask Question -> Analyze Answer -> Ask Next Relevant Question.
 *
 * Question text itself lives in the centralised translation system (lib/i18n.ts,
 * `interview` + `categoryLabels`) so nothing is hard-coded into the screen.
 */

export type Category = 'headache' | 'chest' | 'abdomen' | 'cough' | 'fever' | 'general';

/** Keywords in English + Indian languages, since complaints are typed freely. */
const KEYWORDS: { cat: Category; words: string[] }[] = [
  {
    cat: 'chest',
    words: ['chest', 'heart', 'सीने', 'सीना', 'छाती', 'वक्ष', 'हृदय', 'छाति', 'छातीत', 'छાતી', 'હૃદય', 'বুক', 'হৃদয়', 'மார்பு', 'நெஞ்சு', 'ఛాతీ', 'గుండె'],
  },
  {
    cat: 'abdomen',
    words: ['stomach', 'abdomen', 'belly', 'gastric', 'पेट', 'पोट', 'उदर', 'पेटदुखी', 'पोटदुखी', 'পেট', 'வயிறு', 'వயிற்று', 'ఉదరం', 'కడుపు', 'પેટ', 'પોટ'],
  },
  {
    cat: 'headache',
    words: ['headache', 'head ache', 'migraine', 'forehead', 'सिरदर्द', 'सिर', 'माइग्रेन', 'माथा', 'माथे', 'शिर', 'डोकी', 'डोकीदुखी', 'মাথা', 'মাথাব্যথা', 'தலைவலி', 'தலை', 'తలనొప్పి', 'తల', 'માથા', 'શિર'],
  },
  {
    cat: 'cough',
    words: ['cough', 'खांसी', 'खोकला', 'कफ', 'खोकल', 'ખાંસી', 'ઉધરસ', 'কাশি', 'இருமல்', 'దగ్గు'],
  },
  {
    cat: 'fever',
    words: ['fever', 'temperature', 'बुखार', 'ज्वर', 'ताप', 'તાવ', 'জ্বর', 'காய்ச்சல்', 'జ్వరం'],
  },
];

export interface EngineQuestion {
  /** Stable field id, e.g. `chest-2` */
  id: string;
  cat: Category;
  /** Index into the translated question array for this category. */
  qIndex: number;
}

export interface Classification {
  primary: Category;
  secondary: Category | null;
}

/** Patient Complaint -> Identify Complaint Category (handles multiple complaints). */
export function classifyComplaint(text: string): Classification {
  const lower = (text || '').toLowerCase();
  let primary: Category | null = null;
  let primaryPos = Number.MAX_SAFE_INTEGER;
  let secondary: Category | null = null;
  let secondaryPos = Number.MAX_SAFE_INTEGER;

  for (const { cat, words } of KEYWORDS) {
    for (const w of words) {
      const i = lower.indexOf(w);
      if (i === -1) continue;
      if (cat !== primary && i < primaryPos) {
        secondary = primary;
        secondaryPos = primaryPos;
        primary = cat;
        primaryPos = i;
      } else if (cat !== primary && cat !== secondary && i < secondaryPos) {
        secondary = cat;
        secondaryPos = i;
      }
      break;
    }
  }
  return { primary: primary ?? 'general', secondary };
}

/** Select Relevant Question Set - primary set, extra questions for a second complaint, general closer. */
export function buildInterview(complaint: string): { category: Category; secondary: Category | null; questions: EngineQuestion[] } {
  const { primary, secondary } = classifyComplaint(complaint);
  const questions: EngineQuestion[] = [];

  for (let i = 0; i < 4; i++) questions.push({ id: `${primary}-${i}`, cat: primary, qIndex: i });

  if (secondary && secondary !== 'general') {
    for (let i = 0; i < 2; i++) questions.push({ id: `${secondary}-${i}`, cat: secondary, qIndex: i });
  }

  // General closer: medication/allergy screening (or a 5th general question for unknown complaints).
  const closer = primary === 'general' ? 4 : 2;
  questions.push({ id: `general-${closer}`, cat: 'general', qIndex: closer });

  return { category: primary, secondary, questions };
}

/** Short, stable field label key for the live panel. */
export function fieldIdFor(q: EngineQuestion): string {
  return `intake_${q.id}`;
}

/** How many safety flags the rule-based screen raises for this complaint. */
export function redFlagCount(complaint: string): number {
  return classifyComplaint(complaint).primary === 'chest' ? 2 : 1;
}
