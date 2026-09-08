import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControlProps,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CONTENT_MAX_WIDTH, colors, radii, shadow, timing, type } from '../lib/theme';
import { useLayout } from '../lib/responsive';

/* ------------------------------------------------------------------ Screen */

export function Screen({
  children,
  footer,
  scroll = true,
  contentStyle,
  refreshControl,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}) {
  const { gutter } = useLayout();
  const inner: ViewStyle = {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: gutter,
    paddingVertical: 22,
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[inner, { flexGrow: 1 }, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[inner, { flex: 1 }, contentStyle]}>{children}</View>
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ Header */

export function AppHeader({
  step,
  totalSteps,
  title,
  subtitle,
  onBack,
  right,
}: {
  step?: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  const progress = step && totalSteps ? step / totalSteps : 0;
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </Pressable>
        ) : (
          <View style={{ width: 46 }} />
        )}
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={type.h3} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[type.small, { marginTop: 1 }]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right ?? (
          <View style={styles.stepChip}>
            <Text style={styles.stepChipText}>
              {step && totalSteps ? `${step} / ${totalSteps}` : ''}
            </Text>
          </View>
        )}
      </View>
      {step && totalSteps ? <ProgressBar progress={progress} height={5} style={{ marginTop: 14 }} /> : <View style={{ height: 2 }} />}
    </View>
  );
}

/* ----------------------------------------------------------------- Progress */

export function ProgressBar({
  progress,
  height = 8,
  tone = 'primary',
  style,
}: {
  progress: number;
  height?: number;
  tone?: 'primary' | 'teal' | 'success' | 'danger' | 'violet' | 'amber';
  style?: ViewStyle;
}) {
  const bg = { primary: colors.primary, teal: colors.teal, success: colors.success, danger: colors.danger, violet: colors.violet, amber: '#D98324' }[tone];
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View style={[{ height, backgroundColor: colors.border, borderRadius: radii.pill, overflow: 'hidden' }, style]}>
      <Animated.View
        entering={FadeIn.duration(timing.normal)}
        style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: bg, borderRadius: radii.pill }}
      />
    </View>
  );
}

/* -------------------------------------------------------------------- Card */

export function Card({
  children,
  style,
  padded = true,
  tone = 'surface',
  elevation = 'md',
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
  tone?: 'surface' | 'alt' | 'primary' | 'teal' | 'danger' | 'amber' | 'success' | 'violet';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}) {
  const toneStyle: Record<string, ViewStyle> = {
    surface: { backgroundColor: colors.surface, borderColor: colors.border },
    alt: { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
    primary: { backgroundColor: colors.primarySoft, borderColor: '#C9DEFB' },
    teal: { backgroundColor: colors.tealSoft, borderColor: '#BFEAE7' },
    danger: { backgroundColor: colors.dangerSoft, borderColor: '#F3CBD0' },
    amber: { backgroundColor: colors.amberSoft, borderColor: '#F4DFBD' },
    success: { backgroundColor: colors.successSoft, borderColor: '#C3E8D8' },
    violet: { backgroundColor: colors.violetSoft, borderColor: '#DAD3FB' },
  };
  return (
    <View
      style={[
        styles.card,
        toneStyle[tone],
        shadow[elevation],
        padded && { padding: 20 },
        style as ViewStyle,
      ]}
    >
      {children}
    </View>
  );
}

/* ------------------------------------------------------------------ Buttons */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'teal';

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  size = 'lg',
  style,
  sublabel,
}: {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  size?: 'lg' | 'md' | 'sm';
  style?: ViewStyle | ViewStyle[];
  sublabel?: string;
}) {
  const heights = { lg: 60, md: 50, sm: 40 };
  const fontSizes = { lg: 17, md: 16, sm: 14 };
  const map: Record<ButtonVariant, { bg: string; fg: string; border: string }> = {
    primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
    secondary: { bg: colors.surface, fg: colors.primary, border: colors.borderStrong },
    ghost: { bg: 'transparent', fg: colors.inkSoft, border: 'transparent' },
    danger: { bg: colors.danger, fg: colors.white, border: colors.danger },
    success: { bg: colors.success, fg: colors.white, border: colors.success },
    teal: { bg: colors.teal, fg: colors.white, border: colors.teal },
  };
  const c = map[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      style={({ pressed }) => [
        styles.btn,
        {
          height: heights[size],
          backgroundColor: c.bg,
          borderColor: c.border,
          opacity: isDisabled ? 0.45 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed && !isDisabled ? 0.985 : 1 }],
        },
        variant === 'primary' || variant === 'danger' || variant === 'success' || variant === 'teal' ? shadow.sm : null,
        style as ViewStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={c.fg} />
      ) : (
        <View style={styles.btnRow}>
          {icon ? <Ionicons name={icon} size={size === 'lg' ? 22 : 19} color={c.fg} style={{ marginRight: 10 }} /> : null}
          <View>
            <Text style={{ color: c.fg, fontSize: fontSizes[size], fontWeight: '700', letterSpacing: 0.2 }}>{label}</Text>
            {sublabel ? <Text style={{ color: c.fg, opacity: 0.8, fontSize: 12, fontWeight: '600', marginTop: 1 }}>{sublabel}</Text> : null}
          </View>
        </View>
      )}
    </Pressable>
  );
}

/* -------------------------------------------------------------------- Badge */

export function Badge({
  label,
  icon,
  tone = 'primary',
  style,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tone?: 'primary' | 'teal' | 'danger' | 'amber' | 'success' | 'violet' | 'neutral';
  style?: ViewStyle | ViewStyle[];
}) {
  const map = {
    primary: { bg: colors.primarySoft, fg: colors.primaryDark },
    teal: { bg: colors.tealSoft, fg: colors.tealDark },
    danger: { bg: colors.dangerSoft, fg: colors.dangerDark },
    amber: { bg: colors.amberSoft, fg: colors.amber },
    success: { bg: colors.successSoft, fg: colors.success },
    violet: { bg: colors.violetSoft, fg: '#3F31B5' },
    neutral: { bg: colors.surfaceAlt, fg: colors.inkSoft },
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: map.bg }, style as ViewStyle]}>
      {icon ? <Ionicons name={icon} size={13} color={map.fg} style={{ marginRight: 6 }} /> : null}
      <Text style={{ color: map.fg, fontSize: 12, fontWeight: '800', letterSpacing: 0.4 }}>{label}</Text>
    </View>
  );
}

/* ------------------------------------------------------------ Key-value row */

export function Kv({
  label,
  value,
  icon,
  tone,
  style,
}: {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tone?: 'primary' | 'teal' | 'amber' | 'success' | 'violet';
  style?: ViewStyle;
}) {
  const toneMap = {
    primary: colors.primary,
    teal: colors.teal,
    amber: '#D98324',
    success: colors.success,
    violet: colors.violet,
  } as const;
  return (
    <Animated.View entering={FadeInDown.duration(timing.normal)} style={[styles.kv, style]}>
      <View style={{ flex: 1 }}>
        <Text style={type.micro}>{label.toUpperCase()}</Text>
        <Text style={[type.bodyInk, { marginTop: 3 }]}>{value}</Text>
      </View>
      {icon ? (
        <View style={[styles.kvIcon, { backgroundColor: (tone ? toneMap[tone] : colors.primary) + '1A' }]}>
          <Ionicons name={icon} size={18} color={tone ? toneMap[tone] : colors.primary} />
        </View>
      ) : null}
    </Animated.View>
  );
}

/* ------------------------------------------------------------ Section title */

export function SectionTitle({
  title,
  sub,
  icon,
  right,
  color = colors.ink,
}: {
  title: string;
  sub?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  right?: React.ReactNode;
  color?: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {icon ? <Ionicons name={icon} size={20} color={color} style={{ marginRight: 10 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={[type.h3, { color }]}>{title}</Text>
          {sub ? <Text style={[type.small, { marginTop: 2 }]}>{sub}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}

/* -------------------------------------------------------------------- Notes */

export function Notice({
  text,
  tone = 'neutral',
  icon,
  style,
}: {
  text: string;
  tone?: 'neutral' | 'amber' | 'danger' | 'success' | 'primary';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}) {
  const map = {
    neutral: { bg: colors.surfaceAlt, fg: colors.inkSoft, ic: 'information-circle' },
    amber: { bg: colors.amberSoft, fg: colors.amber, ic: 'alert-circle' },
    danger: { bg: colors.dangerSoft, fg: colors.dangerDark, ic: 'warning' },
    success: { bg: colors.successSoft, fg: colors.success, ic: 'checkmark-circle' },
    primary: { bg: colors.primarySoft, fg: colors.primaryDark, ic: 'sparkles' },
  }[tone];
  return (
    <View style={[styles.notice, { backgroundColor: map.bg }, style as ViewStyle]}>
      <Ionicons name={(icon as keyof typeof Ionicons.glyphMap) ?? (map.ic as keyof typeof Ionicons.glyphMap)} size={18} color={map.fg} style={{ marginRight: 10, marginTop: 1 }} />
      <Text style={{ color: map.fg, fontSize: 13.5, lineHeight: 20, flex: 1, fontWeight: '600' }}>{text}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------- List */

export function BulletList({
  items,
  tone = 'primary',
  icon = 'checkmark-circle',
}: {
  items: { label: string; value?: string }[];
  tone?: 'primary' | 'teal' | 'amber' | 'success' | 'violet' | 'danger';
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const c = { primary: colors.primary, teal: colors.teal, amber: '#D98324', success: colors.success, violet: colors.violet, danger: colors.danger }[tone];
  return (
    <View>
      {items.map((it, i) => (
        <Animated.View key={i} entering={FadeInDown.delay(i * 60).duration(timing.normal)} style={styles.bulletRow}>
          <Ionicons name={icon} size={18} color={c} style={{ marginRight: 10, marginTop: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={type.bodyInk}>{it.label}</Text>
            {it.value ? <Text style={[type.small, { marginTop: 1 }]}>{it.value}</Text> : null}
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

/* ----------------------------------------------------------------- Spinner */

export function Centered({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style]}>{children}</View>;
}

export const textStyle = (t: TextStyle): TextStyle => t;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 16,
  },
  header: { marginBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6, transform: [{ scale: 0.97 }] },
  stepChip: {
    paddingHorizontal: 12,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepChipText: { color: colors.primaryDark, fontWeight: '800', fontSize: 13, letterSpacing: 0.4 },
  card: { borderRadius: radii.lg, borderWidth: 1 },
  btn: {
    borderRadius: radii.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  kv: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  kvIcon: { width: 36, height: 36, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  notice: { flexDirection: 'row', borderRadius: radii.md, padding: 14 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7 },
});
