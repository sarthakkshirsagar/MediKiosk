import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../lib/theme';

interface BarProps {
  progress: SharedValue<number>;
  index: number;
  total: number;
  color: string;
  width: number;
  max: number;
}

function Bar({ progress, index, total, color, width, max }: BarProps) {
  const style = useAnimatedStyle(() => {
    const phase = progress.value * Math.PI * 2 - index * 0.55;
    const wave = 0.5 + 0.5 * Math.sin(phase);
    const envelope = 0.55 + 0.45 * Math.sin((index / Math.max(total - 1, 1)) * Math.PI);
    return { height: 6 + wave * envelope * max };
  }, [index, max, total]);

  return <Animated.View style={[styles.bar, { width, backgroundColor: color, borderRadius: width }, style]} />;
}

export function Waveform({
  active,
  bars = 28,
  color = colors.primary,
  height = 56,
  barWidth = 4,
  gap = 4,
}: {
  active: boolean;
  bars?: number;
  color?: string;
  height?: number;
  barWidth?: number;
  gap?: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (active) {
      progress.value = 0;
      progress.value = withRepeat(withTiming(1, { duration: 1100, easing: Easing.linear }), -1, false);
    } else {
      cancelAnimation(progress);
      progress.value = withTiming(0, { duration: 260 });
    }
    return () => cancelAnimation(progress);
  }, [active, progress]);

  return (
    <View style={[styles.row, { height }]}>
      {Array.from({ length: bars }).map((_, i) => (
        <Bar key={i} progress={progress} index={i} total={bars} color={color} width={barWidth} max={height - 8} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bar: { backgroundColor: colors.primary },
});
