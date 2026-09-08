import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppButton } from './ui';
import { colors, radii, shadow, type } from '../lib/theme';

/**
 * Large, kiosk-friendly select field with a bottom-sheet style modal list.
 * Designed for elderly / low-literacy users: 56px rows, clear chevron, big close button.
 */
export function SelectField({
  label,
  hint,
  placeholder,
  value,
  disabled,
  options,
  onSelect,
  error,
  icon = 'chevron-down',
  closeLabel = 'Close',
  searchLabel,
}: {
  label: string;
  hint?: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  options: string[];
  onSelect: (option: string) => void;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  closeLabel?: string;
  searchLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);
  const showSearch = options.length > 6;
  const visibleOptions = showSearch && query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  return (
    <View>
      <Text style={[type.h3, { marginBottom: 6 }]}>{label}</Text>
      {hint ? <Text style={[type.small, { marginBottom: 8 }]}>{hint}</Text> : null}
      <Pressable
        onPress={disabled ? undefined : () => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value || placeholder}`}
        accessibilityState={{ disabled: !!disabled, expanded: open }}
        style={({ pressed }) => [
          styles.selectBtn,
          !!error && styles.selectError,
          disabled && styles.selectDisabled,
          pressed && !disabled && { opacity: 0.85 },
        ]}
      >
        <Text style={[styles.selectValue, !value && { color: colors.inkFaint }, disabled && { color: colors.inkFaint }]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name={disabled ? 'lock-closed' : icon} size={20} color={disabled ? colors.inkFaint : colors.primary} />
      </Pressable>
      {error ? (
        <View style={styles.errRow}>
          <Ionicons name="alert-circle" size={15} color={colors.danger} />
          <Text style={styles.errText}>{error}</Text>
        </View>
      ) : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.sheetWrap} pointerEvents="box-none">
          <Animated.View entering={FadeInDown.duration(220)} style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={type.h3}>{label}</Text>
              <Pressable
                onPress={() => setOpen(false)}
                accessibilityLabel={closeLabel}
                style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}
              >
                <Ionicons name="close" size={20} color={colors.inkSoft} />
              </Pressable>
            </View>
            {showSearch ? (
              <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color={colors.inkFaint} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={searchLabel ?? 'Search'}
                  placeholderTextColor={colors.inkFaint}
                  style={styles.searchInput}
                  accessibilityLabel={searchLabel ?? 'Search'}
                />
              </View>
            ) : null}
            <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
              {visibleOptions.map((o) => {
                const selected = o === value;
                return (
                  <Pressable
                    key={o}
                    onPress={() => {
                      onSelect(o);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={({ pressed }) => [styles.optionRow, selected && styles.optionRowActive, pressed && { opacity: 0.8 }]}
                  >
                    <Text style={[styles.optionText, selected && { color: colors.primaryDark }]} numberOfLines={1}>
                      {o}
                    </Text>
                    {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
            <AppButton label={closeLabel} variant="ghost" size="md" onPress={() => setOpen(false)} style={{ alignSelf: 'stretch', marginTop: 6 }} />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectBtn: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.surfaceAlt,
  },
  selectDisabled: { backgroundColor: colors.surface, borderColor: colors.border, opacity: 0.75 },
  selectError: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  selectValue: { flex: 1, fontSize: 17, fontWeight: '600', color: colors.ink },
  errRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 7 },
  errText: { fontSize: 13, fontWeight: '700', color: colors.danger },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,27,43,0.5)' },
  sheetWrap: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 20,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
    maxHeight: '78%',
    ...shadow.lg,
  },
  sheetHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  closeBtn: { width: 38, height: 38, borderRadius: radii.pill, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  list: { flexGrow: 0 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    minHeight: 52,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.ink, paddingVertical: 12 },
  optionRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 8,
  },
  optionRowActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  optionText: { flex: 1, fontSize: 17, fontWeight: '600', color: colors.ink },
});
