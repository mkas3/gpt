import styled from 'styled-components/native';
import { useTheme } from '../../hooks/Theme/useTheme';
import { useEffect, useMemo, useState } from 'react';
import Reanimated, {
  Easing,
  Layout,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  Canvas,
  LinearGradient,
  LinearGradientProps,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  useWindowDimensions,
} from 'react-native';

type BaseLinearGradientProps = Omit<
  LinearGradientProps,
  'colors' | 'start' | 'end'
> & {
  selected?: boolean;
  parentCanvasLayout?: LayoutRectangle;
};

const StyledCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
`;

const Styled = styled(LinearGradient)``;

export const BaseLinearGradient = ({
  selected,
  parentCanvasLayout,
  ...otherProps
}: BaseLinearGradientProps) => {
  const theme = useTheme();
  const [canvasLayout, setCanvasLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const rootCanvas = useMemo(
    () => (parentCanvasLayout ? parentCanvasLayout : canvasLayout),
    [parentCanvasLayout, canvasLayout],
  );

  const setSize = (event: LayoutChangeEvent) => {
    setCanvasLayout(event.nativeEvent.layout);
  };

  const rect = useMemo(
    () => (
      <Rect {...rootCanvas}>
        <Styled
          start={vec(rootCanvas.x, rootCanvas.y)}
          end={vec(rootCanvas.x + rootCanvas.width, rootCanvas.y)}
          colors={
            !selected
              ? ['white', 'white']
              : [theme.colors.primary, theme.colors.accent]
          }
          {...otherProps}
        />
      </Rect>
    ),
    [
      rootCanvas,
      selected,
      theme.colors.primary,
      theme.colors.accent,
      otherProps,
    ],
  );

  return parentCanvasLayout ? (
    rect
  ) : (
    <StyledCanvas onLayout={setSize}>{rect}</StyledCanvas>
  );
};
