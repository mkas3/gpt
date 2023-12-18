import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useTheme } from '../../hooks/Theme/useTheme';
import { useMemo } from 'react';
import {Text} from 'react-native';

type ShadowLinearGradientProps = Omit<LinearGradientProps, 'colors'>;

const Styled = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

export const ShadowLinearGradient = ({
  ...otherProps
}: ShadowLinearGradientProps) => {
  const theme = useTheme();

  return (
    <Styled
      colors={[theme.colors.background, 'rgba(0 0 0 / 0)']}
      {...otherProps}
    />
  );
};
