import { View } from '../Styled/View';
import { BaseLinearGradient } from '../Gradient/BaseLinearGradient';
import MaskedView from '@react-native-masked-view/masked-view';
import styled from 'styled-components';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { usePrerenderStore } from '../../store/prerender.store';
import { Canvas, ImageSVG, Skia, useSVG } from '@shopify/react-native-skia';

const MaskWrapper = styled(Reanimated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledMask = styled(MaskedView)``;

const ImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BackgroundAnimation = () => {
  const [isPrerendered, setIsPrerendered] = usePrerenderStore((state) => [
    state.isBackgroundImagePrerendered,
    state.setIsBackgroundImagePrerendered,
  ]);
  const [forceImageRerender, setForceImageRerender] = useState<number>(0);
  const rotation = useSharedValue(0);

  const animatedImage = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1,
    );
    if (!isPrerendered) {
      Image.prefetch(
        Image.resolveAssetSource(
          require('../../assets/images/tabs/Vector2.png'),
        ).uri,
      ).then((didLoad) => {
        setForceImageRerender(Date.now());
        setIsPrerendered(true);
      });
    }
  }, []);

  return (
    <MaskWrapper style={animatedImage}>
      <StyledMask
        key={forceImageRerender}
        maskElement={
          <ImageWrapper>
            <Image
              source={require('../../assets/images/tabs/Vector2.png')}
              width={800}
              height={800}
            />
          </ImageWrapper>
        }
      >
        <BaseLinearGradient selected />
      </StyledMask>
    </MaskWrapper>
  );
};
