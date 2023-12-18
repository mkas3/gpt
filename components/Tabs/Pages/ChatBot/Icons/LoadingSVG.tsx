import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../../../hooks/Theme/useTheme';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import styled from 'styled-components';
import { View } from '../../../../Styled/View';

const SVGWrapper = styled(Reanimated.View)``;

export const LoadingSVG = () => {
  const rotation = useSharedValue(0);
  const theme = useTheme();

  const rotationStyle = useAnimatedStyle(() => ({
    rotation: rotation.value,
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  return (
    <SVGWrapper style={rotationStyle}>
      <Svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
        <Path
          opacity='0.2'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5 0.9375C3.92256 0.9375 2.88925 1.36551 2.12738 2.12738C1.36551 2.88925 0.9375 3.92256 0.9375 5C0.9375 6.07744 1.36551 7.11075 2.12738 7.87262C2.88925 8.63449 3.92256 9.0625 5 9.0625C6.07744 9.0625 7.11075 8.63449 7.87262 7.87262C8.63449 7.11075 9.0625 6.07744 9.0625 5C9.0625 3.92256 8.63449 2.88925 7.87262 2.12738C7.11075 1.36551 6.07744 0.9375 5 0.9375ZM0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5C10 6.32608 9.47322 7.59785 8.53553 8.53553C7.59785 9.47322 6.32608 10 5 10C3.67392 10 2.40215 9.47322 1.46447 8.53553C0.526784 7.59785 0 6.32608 0 5Z'
          fill='#F7F9F7'
          fillOpacity='0.5'
        />
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.53125 0.46875C4.53125 0.34443 4.58064 0.225201 4.66854 0.137294C4.75645 0.049386 4.87568 0 5 0C6.32608 0 7.59785 0.526784 8.53553 1.46447C9.47322 2.40215 10 3.67392 10 5C10 5.12432 9.95061 5.24355 9.86271 5.33146C9.7748 5.41936 9.65557 5.46875 9.53125 5.46875C9.40693 5.46875 9.2877 5.41936 9.19979 5.33146C9.11189 5.24355 9.0625 5.12432 9.0625 5C9.0625 3.92256 8.63449 2.88925 7.87262 2.12738C7.11075 1.36551 6.07744 0.9375 5 0.9375C4.87568 0.9375 4.75645 0.888114 4.66854 0.800206C4.58064 0.712299 4.53125 0.59307 4.53125 0.46875Z'
          fill={theme.colors.primary}
        />
      </Svg>
    </SVGWrapper>
  );
};
