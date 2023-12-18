import styled from 'styled-components/native';
import MaskedView from '@react-native-masked-view/masked-view';
import { BaseLinearGradient } from '../../../Gradient/BaseLinearGradient';
import { Text, StyledTextProps } from '../index';
import { FontTypes } from '../../../../types/theme.types';
import { View } from '../../View';
import { useState } from 'react';
import {
  LayoutRectangle,
} from 'react-native';
import { defaultLayout } from '../../../../constants/layout';
import {Canvas} from '@shopify/react-native-skia';

export type GradientTextProps = Omit<StyledTextProps, 'fontSize'> & {
  animated?: boolean;
  fontSize?: number;
};

const MainView = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const StyledMask = styled(MaskedView)`
  flex: 1;
  flex-direction: row;
`;

const TextMaskView = styled(View)`
  flex: 1;
  flex-direction: row;
  margin: 0 auto 0 auto;
`;

const TextMask = styled(Text)``;

const GradientCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
`;

export const GradientText = ({
  ...otherProps
}: GradientTextProps) => {
  const [textViewLayout, setTextViewLayout] =
    useState<LayoutRectangle>(defaultLayout);

  return (
    <MainView>
      <StyledMask
        maskElement={
          <TextMaskView
            onLayout={(e) => setTextViewLayout(e.nativeEvent.layout)}
          >
            <TextMask
              fontWeight={FontTypes.regular}
              {...otherProps}
            />
          </TextMaskView>
        }
      >
        <GradientCanvas>
          <BaseLinearGradient parentCanvasLayout={textViewLayout} selected />
        </GradientCanvas>
      </StyledMask>
    </MainView>
  );
};
