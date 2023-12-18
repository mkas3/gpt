import styled from 'styled-components/native';
import { TextBaseProps, TextBase } from './TextBase';
import { FontTypes } from '../../../types/theme.types';
import { useMemo } from 'react';

export type StyledTextProps = TextBaseProps & {
  fontSize?: string | number;
  lineHeight?: string;
};

type StyledProps = {
  fontSize: string;
  lineHeight?: string;
};

const Styled = styled(TextBase)<StyledProps>`
  font-size: ${({ fontSize }) => fontSize};
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}`};
  text-align: center;
`;

export const Text = ({ fontSize, ...otherProps }: StyledTextProps) => {
  const normalizeFontSize = useMemo(
    () => (typeof fontSize === 'number' ? `${fontSize}px` : fontSize),
    [fontSize],
  );

  return (
    <Styled
      fontSize={normalizeFontSize ?? '32px'}
      fontWeight={FontTypes.bold}
      {...otherProps}
    />
  );
};
