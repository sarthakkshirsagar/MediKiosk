/**
 * Speech-to-Text helper using the browser Web Speech API
 * (window.SpeechRecognition || window.webkitSpeechRecognition).
 * Recognises the patient's spoken answer in the selected application language.
 */

export type SttErrorCode = 'denied' | 'unsupported' | 'no-speech' | 'other';

export interface SttHandlers {
  /** Real-time interim transcript while the patient is still speaking. */
  onInterim?: (text: string) => void;
  /** Final recognised transcript - becomes the patient's answer. */
  onFinal?: (text: string) => void;
  onEnd?: () => void;
  onError?: (code: SttErrorCode) => void;
}

type RecognitionCtor = new () => any;

function getCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function sttAvailable(): boolean {
  return getCtor() !== null;
}

export function sttLocaleFor(code?: string | null): string {
  const map: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    bn: 'bn-IN',
    ta: 'ta-IN',
    te: 'te-IN',
  };
  return (code && map[code]) || 'en-IN';
}

/** Starts a single-utterance recognition session. Returns a stop function, or null if unsupported. */
export function startListening(locale: string, handlers: SttHandlers): (() => void) | null {
  const Ctor = getCtor();
  if (!Ctor) {
    handlers.onError?.('unsupported');
    return null;
  }

  const recognition = new Ctor();
  recognition.lang = locale;
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  let finalText = '';

  recognition.onresult = (event: any) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0]?.transcript ?? '';
      if (result.isFinal) {
        finalText += (finalText ? ' ' : '') + transcript.trim();
      } else {
        interim += transcript;
      }
    }
    if (interim.trim()) handlers.onInterim?.(interim.trim());
    if (finalText.trim()) handlers.onFinal?.(finalText.trim());
  };

  recognition.onerror = (event: any) => {
    const code = event?.error;
    if (code === 'not-allowed' || code === 'service-not-allowed') handlers.onError?.('denied');
    else if (code === 'no-speech') handlers.onError?.('no-speech');
    else if (code === 'aborted') return; // user/system stop - ignore
    else handlers.onError?.('other');
  };

  recognition.onend = () => {
    handlers.onEnd?.();
  };

  try {
    recognition.start();
  } catch {
    handlers.onError?.('other');
    return null;
  }

  return () => {
    try {
      recognition.stop();
    } catch {
      /* already stopped */
    }
  };
}

const DEVANAGARI_DIGITS: Record<string, string> = {
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
};

/**
 * Lightweight, non-diagnostic duration hint parsed from the patient's own words,
 * so the Live Clinical Extract updates from the spoken answer.
 */
export function extractDurationHint(text: string): string | null {
  let normalised = text.replace(/[०-९]/g, (d) => DEVANAGARI_DIGITS[d] ?? d);
  // Common Hindi/Marathi number words -> digits so "दो दिन" is understood.
  ([
    [/एक/g, '1'],
    [/दो/g, '2'],
    [/तीन/g, '3'],
    [/चार/g, '4'],
    [/पाँच|पांच/g, '5'],
    [/छह/g, '6'],
    [/सात/g, '7'],
    [/आठ/g, '8'],
    [/नौ/g, '9'],
    [/दस/g, '10'],
  ] as [RegExp, string][]).forEach(([pattern, digit]) => {
    normalised = normalised.replace(pattern, digit);
  });

  const withCount = normalised.match(/(\d+)\s*(दिनों|दिन|दिवस|दिवसांपासून|दिवसां|days?|day)/i);
  if (withCount) return `${withCount[1]} day${withCount[1] === '1' ? '' : 's'}`;

  if (/आज\s*(सुबह|ही|morning)?/i.test(normalised) || /\btoday\b/i.test(normalised)) return 'Today';
  if (/कल\s|काल\s|\byesterday\b/i.test(normalised)) return '1 day';
  if (/एक\s*हफ्ते|हफ़्ते|सप्ताह|week/i.test(normalised)) return '1 week';
  if (/महीने|महीना|month/i.test(normalised)) return '1 month';

  return null;
}
