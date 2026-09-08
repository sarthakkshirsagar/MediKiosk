import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadow } from '../lib/theme';

export function LogoMark({ size = 64, rounded = radii.lg }: { size?: number; rounded?: number }) {
  return (
    <LinearGradient
      colors={[colors.primary, colors.teal]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.mark, { width: size, height: size, borderRadius: rounded }]}
    >
      <View style={[styles.crossV, { height: size * 0.5, width: size * 0.16, borderRadius: size * 0.06 }]} />
      <View style={[styles.crossH, { width: size * 0.5, height: size * 0.16, borderRadius: size * 0.06 }]} />
      <View style={styles.pulseBadge}>
        <Ionicons name="pulse" size={size * 0.28} color={colors.white} />
      </View>
    </LinearGradient>
  );
}

export function Wordmark({ size = 30, sub }: { size?: number; sub?: string }) {
  return (
    <View>
      <Text style={{ fontSize: size, fontWeight: '800', letterSpacing: -0.8, color: colors.ink }}>
        Medi<Text style={{ color: colors.teal }}>Kiosk</Text>
      </Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

export function LogoLockup({ size = 64, title = 30, sub }: { size?: number; title?: number; sub?: string }) {
  return (
    <View style={styles.lockup}>
      <LogoMark size={size} />
      <View style={{ marginLeft: 14 }}>
        <Wordmark size={title} sub={sub} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.md,
  },
  crossV: { backgroundColor: colors.white, position: 'absolute' },
  crossH: { backgroundColor: colors.white, position: 'absolute' },
  pulseBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: colors.tealSoft,
  },
  lockup: { flexDirection: 'row', alignItems: 'center' },
  sub: { fontSize: 13, fontWeight: '700', color: colors.inkFaint, letterSpacing: 0.4, marginTop: 2 },
});
