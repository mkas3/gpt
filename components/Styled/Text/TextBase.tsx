import styled from 'styled-components/native';
import {TextProps, View, ViewProps} from 'react-native';
import { FontTypes, StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';

export type TextBaseProps = TextProps & {
  fontWeight?: FontTypes;
};

type StyledWeightProps = StyledProps & {
  fontWeight: FontTypes;
};

const Styled = styled.Text<StyledWeightProps>`
  color: ${({ styledTheme }) => styledTheme.colors.text};
  font-family: ${({ styledTheme, fontWeight }) =>
    styledTheme.fonts[fontWeight]};
  font-size: 16px;
`;

export const TextBase = ({ fontWeight = FontTypes.regular, ...otherProps }: TextBaseProps) => {
  const theme = useTheme();

  return <Styled fontWeight={fontWeight} styledTheme={theme} {...otherProps} />;
};
