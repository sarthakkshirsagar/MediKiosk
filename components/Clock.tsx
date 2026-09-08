import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatShortDate, formatTime, localeFor, useClock } from '../lib/clock';
import { useSession } from '../lib/store';
import { colors, radii } from '../lib/theme';

/**
 * Subtle real-time date & clock chip - 08 September 2026 | 05:30:15 PM (IST).
 * Always reads the device/system clock and ticks every second.
 */
export function Clock({ showDate = true }: { showDate?: boolean }) {
  const { language } = useSession();
  const now = useClock();
  const locale = localeFor(language?.code);

  return (
    <View style={styles.chip} accessibilityLabel={`${formatShortDate(now, locale)} ${formatTime(now, locale)}`}>
      <Ionicons name="time-outline" size={13} color={colors.inkFaint} />
      <Text style={styles.text} numberOfLines={1}>
        {showDate ? `${formatShortDate(now, locale)} | ` : ''}
        {formatTime(now, locale)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 12.5, fontWeight: '700', color: colors.inkSoft, letterSpacing: 0.3 },
});
