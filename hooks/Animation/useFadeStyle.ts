import { useWindowDimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationTimingDefaults } from './useAnimationTimingDefaults';

export const useFadeStyle = (visible: boolean) => {
  const defaults = useAnimationTimingDefaults();
  const opacity = useDerivedValue(
    () => withTiming(visible ? 1 : 0, defaults),
    [visible],
  );
  const scale = useDerivedValue(
    () => withTiming(visible ? 1 : 0.9, defaults),
    [visible],
  );
  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
};
