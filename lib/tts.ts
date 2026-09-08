/**
 * Text-to-Speech helper using the browser Web Speech API.
 * Reads the consent explanation aloud in the patient's selected language.
 * - Picks the best installed voice for the selected locale (falls back gracefully).
 * - Tracks pause state in the module (Chromium's `synth.paused` is unreliable after cancel()).
 * Safe no-op on platforms without speechSynthesis.
 */
import React from 'react';

/** BCP-47 voice tags per selected application language. */
export const TTS_LOCALES: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
};

/** Voice-name hints used when no exact locale voice is installed. */
const VOICE_NAME_HINTS: Record<string, string[]> = {
  en: ['english', 'india', 'in-'],
  hi: ['hindi', 'हिन्दी'],
  mr: ['marathi', 'मराठी'],
  gu: ['gujarati', 'ગુજરાતી'],
  bn: ['bengali', 'bangla', 'বাংলা'],
  ta: ['tamil', 'தமிழ்'],
  te: ['telugu', 'తెలుగు'],
};

export function ttsLocaleFor(code?: string | null): string {
  return (code && TTS_LOCALES[code]) || 'en-IN';
}

export function ttsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export interface SpeakHandlers {
  /** 0..1 progress, driven by boundary events where the browser supports them. */
  onProgress?: (progress: number) => void;
  onEnd?: () => void;
}

/** Rough duration estimate (seconds) so the progress bar can tick smoothly. */
export function estimateSeconds(text: string): number {
  return Math.max(4, Math.round(text.length / 13));
}

let pausedByUser = false;
/** Invalidates callbacks from utterances that were cancelled by a newer speak/stop call. */
let session = 0;

/**
 * Chromium truncates long utterances (often after the first word).
 * Split the explanation into sentence-sized chunks and speak them sequentially.
 */
function splitIntoChunks(text: string, max = 160): string[] {
  const parts = text.match(/[^.!?।؛।;]+[.!?।؛।;]*/g) || [text];
  const chunks: string[] = [];
  let current = '';
  for (const part of parts) {
    if (current && (current + part).length > max) {
      chunks.push(current.trim());
      current = part;
    } else {
      current += part;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length ? chunks : [text];
}

function stopKeepAlive(): void {
  /* keep-alive removed: pause()/resume() nudges were killing the chunk queue in Chromium */
}

/** Warm the voice list (Chrome loads it asynchronously). */
export function primeVoices(): void {
  if (!ttsAvailable()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/** Exact locale voice -> base-language voice -> name hint -> null (browser decides). */
function pickVoiceFrom(voices: SpeechSynthesisVoice[], locale: string): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const lower = locale.toLowerCase();
  const base = lower.split('-')[0];

  const exact = voices.find((v) => (v.lang || '').replace('_', '-').toLowerCase() === lower);
  if (exact) return exact;

  const byLang = voices.find((v) => (v.lang || '').replace('_', '-').toLowerCase().startsWith(base));
  if (byLang) return byLang;

  const hints = VOICE_NAME_HINTS[base] || [];
  for (const hint of hints) {
    const byName = voices.find((v) => (v.name || '').toLowerCase().includes(hint));
    if (byName) return byName;
  }
  return null;
}

/**
 * Chromium loads the voice list asynchronously; speaking before it arrives makes it fall
 * back to a default (often Latin-only) voice, so Hindi/regional text stays silent.
 * Resolve voices first (with a short wait), then speak.
 */
function withVoices(callback: (voices: SpeechSynthesisVoice[]) => void): void {
  if (!ttsAvailable()) return;
  const existing = window.speechSynthesis.getVoices();
  if (existing && existing.length > 0) {
    callback(existing);
    return;
  }
  const handler = () => {
    const loaded = window.speechSynthesis.getVoices();
    if (loaded && loaded.length > 0) {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      callback(loaded);
    }
  };
  window.speechSynthesis.addEventListener('voiceschanged', handler);
  setTimeout(() => {
    window.speechSynthesis.removeEventListener('voiceschanged', handler);
    callback(window.speechSynthesis.getVoices());
  }, 500);
}

export function speakText(text: string, lang: string, handlers: SpeakHandlers = {}): boolean {
  if (!ttsAvailable() || !text) return false;

  primeVoices();
  stopKeepAlive();
  const mySession = ++session;
  window.speechSynthesis.cancel();
  try {
    window.speechSynthesis.resume();
  } catch {
    /* noop */
  }
  pausedByUser = false;

  const chunks = splitIntoChunks(text);
  let index = 0;
  let voice: SpeechSynthesisVoice | null = null;

  const speakNext = () => {
    if (mySession !== session) return;
    if (index >= chunks.length) {
      stopKeepAlive();
      pausedByUser = false;
      handlers.onProgress?.(1);
      handlers.onEnd?.();
      return;
    }
    const chunk = chunks[index];
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (voice) utterance.voice = voice;

    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (mySession !== session) return;
      const within = Math.min(0.99, (event.charIndex ?? 0) / Math.max(1, chunk.length));
      handlers.onProgress?.((index + within) / chunks.length);
    };
    let advanced = false;
    const advance = () => {
      if (advanced || mySession !== session) return;
      advanced = true;
      index += 1;
      handlers.onProgress?.(index / chunks.length);
      speakNext();
    };
    // Watchdog: if the synth stalls (never fires onend), keep the flow moving.
    const watchdog = setTimeout(advance, Math.max(6000, (chunk.length / 6) * 1000));

    utterance.onend = () => {
      if (mySession !== session) return;
      clearTimeout(watchdog);
      if (advanced) return;
      advanced = true;
      index += 1;
      handlers.onProgress?.(index / chunks.length);
      speakNext();
    };
    utterance.onerror = () => {
      if (mySession !== session) return;
      clearTimeout(watchdog);
      if (advanced) return;
      advanced = true;
      index += 1;
      if (index >= chunks.length) {
        pausedByUser = false;
        handlers.onEnd?.();
      } else {
        speakNext();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  withVoices((voices) => {
    if (mySession !== session) return;
    let resolved = pickVoiceFrom(voices, lang);

    const startSpeaking = () => {
      if (mySession !== session) return;
      voice = resolved;
      speakNext();
    };

    // Regional voices (e.g. Google हिन्दी) can load late; poll briefly for a match
    // before falling back to the browser default so Indic scripts stay audible.
    if (!resolved && lang.split('-')[0] !== 'en') {
      let waited = 0;
      const poll = setInterval(() => {
        waited += 300;
        resolved = pickVoiceFrom(window.speechSynthesis.getVoices(), lang);
        if (resolved || waited >= 1500) {
          clearInterval(poll);
          startSpeaking();
        }
      }, 300);
    } else {
      startSpeaking();
    }
  });
  return true;
}

export function pauseSpeech(): void {
  if (!ttsAvailable()) return;
  pausedByUser = true;
  window.speechSynthesis.pause();
}

/** Returns true if paused speech was resumed. */
export function resumeSpeech(): boolean {
  if (!ttsAvailable() || !pausedByUser) return false;
  pausedByUser = false;
  window.speechSynthesis.resume();
  return true;
}

export function stopSpeech(): void {
  stopKeepAlive();
  session += 1;
  pausedByUser = false;
  if (ttsAvailable()) window.speechSynthesis.cancel();
}

/**
 * Speaks `text` automatically whenever it changes (AI prompts, interview questions),
 * in the given speech locale. Stops any ongoing speech when unmounted.
 */
export function useSpeakOnChange(text: string, locale: string, enabled = true): void {
  const lastRef = React.useRef<string>('');

  React.useEffect(() => {
    if (!enabled || !text || lastRef.current === text) return;
    lastRef.current = text;
    speakText(text, locale);
  }, [text, locale, enabled]);

  React.useEffect(() => {
    return () => stopSpeech();
  }, []);
}
