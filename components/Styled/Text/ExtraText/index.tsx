import styled from 'styled-components/native';
import { FontTypes, StyledProps } from '../../../../types/theme.types';
import { useTheme } from '../../../../hooks/Theme/useTheme';
import { StyledTextProps, Text } from '../index';

const Styled = styled(Text)<StyledProps>`
  color: ${({ styledTheme }) => styledTheme.colors.extraText};
`;

export const ExtraText = (props: StyledTextProps) => {
  const theme = useTheme();

  return (
    <Styled
      fontSize='10px'
      lineHeight='14px'
      fontWeight={FontTypes.regular}
      styledTheme={theme}
      {...props}
    />
  );
};
