import {
  Blur,
  Canvas,
  Group,
  ImageSVG,
  Paint,
  Skia,
  Transforms2d,
  vec,
} from '@shopify/react-native-skia';
import { useTheme } from '../../hooks/Theme/useTheme';
import { useEffect, useMemo, useState } from 'react';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LayoutRectangle } from 'react-native';
import styled from 'styled-components';

const BackgroundCanvas = styled(Canvas)`
  height: 100%;
  width: 100%;
`;

export const BackgroundSVGAnimation = () => {
  const theme = useTheme();
  const rotation = useSharedValue(0);
  const prop = useDerivedValue<Transforms2d>(() => {
    return [
      {
        rotate: rotation.value,
      },
    ];
  }, [rotation]);
  const [center, setCenter] = useState(vec(0, 0));
  const svg = useMemo(
    () =>
      Skia.SVG.MakeFromString(`
    <svg width="360" height="242" viewBox="0 0 360 242" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter)">
        <path 
          d="M116.511 398.049C97.0378 381.864 91.9968 354.51 83.378 330.663C76.8043 312.474 77.6342 292.975 71.8628 274.514C65.8336 255.227 44.362 239.166 48.5896 219.382C52.8511 199.438 83.3875 196.169 92.5023 177.923C104.165 154.577 83.7744 113.439 107.21 102.036C131.217 90.3556 151.855 133.93 178.424 136.118C200.32 137.92 218.768 105.147 239.313 112.911C259.432 120.514 258.001 150.819 267.916 169.935C275.721 184.983 282.831 199.726 291.798 214.107C304.188 233.975 330.243 247.819 331.095 271.254C331.9 293.416 310.725 310.267 295.893 326.761C281.941 342.277 262.803 350.937 247.095 364.665C227.016 382.215 215.819 412.7 190.017 419.296C164.965 425.7 136.379 414.562 116.511 398.049Z" 
          fill='${theme.colors.primary}' 
          shape-rendering="crispEdges"
        />
      </g>
    </svg>`),
    [theme.colors.primary],
  );

  const setLayoutCenter = (layout: LayoutRectangle) => {
    setCenter(
      vec(layout.x + layout.width / 2, layout.y + layout.height / 2 - 242 / 2),
    );
  };

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  return (
    <BackgroundCanvas onLayout={(e) => setLayoutCenter(e.nativeEvent.layout)}>
      <Group
        transform={prop}
        origin={center}
        layer={
          <Paint>
            <Blur blur={50} />
          </Paint>
        }
      >
        <ImageSVG svg={svg} />
      </Group>
    </BackgroundCanvas>
  );
};
