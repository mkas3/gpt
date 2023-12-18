import styled from 'styled-components/native';
import { Button, ButtonProps } from '../index';
import { googleLogin } from '../../../../services/auth.service';
import { GestureResponderEvent } from 'react-native';
import { FontTypes, StyledProps } from '../../../../types/theme.types';
import { useTheme } from '../../../../hooks/Theme/useTheme';
import { Text } from '../../Text';
import {GoogleSVG} from '../../../Icons/GoogleSVG';

const Styled = styled(Button)<StyledProps>`
	display: flex;
	flex-direction: row;
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
	border-radius: 50px;
	width: 80%;
	align-items: center;
	justify-content: center;
	column-gap: 10px;
`;

export const GoogleButton = ({ onPress, children, ...otherProps }: ButtonProps) => {
  const theme = useTheme();

  const onAuth = (event: GestureResponderEvent) => {
    googleLogin();
    if (onPress) onPress(event);
  };

	return <Styled styledTheme={theme} onPress={onAuth} {...otherProps}>
		<GoogleSVG />
		<Text fontSize='16px' fontWeight={FontTypes.medium}>
			Продолжить с Google
		</Text>
		{children}
	</Styled>;
};
