import styled from 'styled-components/native';
import {GradientText, GradientTextProps} from '../GradientText';
import { StyledTextProps } from '../index';
import { FontTypes } from '../../../../types/theme.types';

type TitleProps = GradientTextProps & {
  children?: React.ReactNode;
};

const Styled = styled(GradientText)``;

export const Title = ({ children, animated, fontSize, fontWeight, ...otherProps }: TitleProps) => {
  return (
    <Styled animated fontSize={fontSize || 48} fontWeight={fontWeight || FontTypes.bold} {...otherProps}>
      {children ? children : 'AIGeek'}
    </Styled>
  );
};
