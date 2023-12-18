import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { TextBase } from '../Text/TextBase';
import { FontTypes, StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';

export type ButtonProps = TouchableOpacityProps;

const Styled = styled.TouchableOpacity<StyledProps>`
  background-color: ${({ styledTheme }) => styledTheme.colors.text};
  padding: 12px;
  border-radius: 10px;
  align-items: center;
`;

const StyledText = styled(TextBase)<StyledProps>`
  color: ${({ styledTheme }) => styledTheme.colors.background};
`;

export const Button = ({ children, ...otherProps }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Styled styledTheme={theme} {...otherProps}>
      {typeof children === 'string' ? (
        <StyledText fontWeight={FontTypes.medium} styledTheme={theme}>
          {children}
        </StyledText>
      ) : (
        children
      )}
    </Styled>
  );
};
