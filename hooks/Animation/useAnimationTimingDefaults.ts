import { useMemo } from 'react';
import { Easing } from 'react-native-reanimated';

export const useAnimationTimingDefaults = () => {
  return useMemo(() => {
    return {
      duration: 200,
      easing: Easing.linear,
    };
  }, []);
};
