import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

export const useKeyboardTranslateStyle = () => {
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  return useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));
};
