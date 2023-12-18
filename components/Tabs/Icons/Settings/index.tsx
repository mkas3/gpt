import { Image } from 'react-native';
import { View } from '../../../Styled/View';
import styled from 'styled-components/native';
import { StyledProps } from '../../../../types/theme.types';
import { useTheme } from '../../../../hooks/Theme/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { BaseLinearGradient } from '../../../Gradient/BaseLinearGradient';
import { useEffect, useMemo, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { Canvas, Circle, Group, Mask, Oval } from '@shopify/react-native-skia';
import { defaultLayout } from '../../../../constants/layout';

type SettingsTabIconProps = {
  selected: boolean;
};

const StyledView = styled(View)`
  align-items: center;
  justify-content: center;
`;

const BorderMask = styled(Mask)``;

const StyledLinearGradient = styled(BaseLinearGradient)`
  height: 100%;
  width: 100%;
`;

const StyledCanvas = styled(Canvas)`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
`;

const StyledImage = styled.Image<StyledProps>`
  height: 20px;
  width: 20px;
  margin: 0 2px 2px 0;
`;

export const SettingsTabIcon = ({ selected }: SettingsTabIconProps) => {
  const [layout, setLayout] = useState(defaultLayout);
  const theme = useTheme();

  return (
    <StyledView>
      <StyledCanvas onLayout={(e) => setLayout(e.nativeEvent.layout)}>
        <BorderMask
          mode='luminance'
          mask={
            <Group>
              <Oval
                x={0}
                y={0}
                width={layout.width - 2}
                height={layout.height - 2}
                color='white'
              />
              <Oval
                x={1}
                y={1}
                width={layout.width - 4}
                height={layout.height - 4}
                color='black'
              />
            </Group>
          }
        >
          <StyledLinearGradient
            parentCanvasLayout={layout}
            selected={selected}
          />
        </BorderMask>
      </StyledCanvas>
      <StyledImage
        source={require('../../../../assets/images/tabs/profile.png')}
        alt='Profile'
        width={21}
        height={21}
        styledTheme={theme}
      />
    </StyledView>
  );
};
