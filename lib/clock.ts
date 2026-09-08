import { useEffect, useState } from 'react';

/** Locale per selected language, formatted for India. */
export const LOCALES: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
};

export function localeFor(code?: string | null): string {
  return (code && LOCALES[code]) || 'en-IN';
}

/** Tuesday, 8 September 2026 (IST) */
export function formatDate(now: Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);
}

/** 08 September 2026 (IST, compact) */
export function formatShortDate(now: Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now);
}

/** 05:30:15 PM (IST) */
export function formatTime(now: Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
    .format(now)
    .toUpperCase();
}

/** 08 September 2026 | 05:30:15 PM */
export function formatStamp(now: Date, locale = 'en-IN'): string {
  return `${formatShortDate(now, locale)} | ${formatTime(now, locale)}`;
}

/** Live clock - reads the device/system time and updates every second. */
export function useClock(): Date {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

/** 2026-09-08 in Asia/Kolkata - used for report filenames. */
export function isoDateIST(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}
