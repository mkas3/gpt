import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';
import {StyledProps} from '../../../types/theme.types';
import {useTheme} from '../../../hooks/Theme/useTheme';

const Styled = styled.TextInput<StyledProps>`
	color: ${({ styledTheme }) => styledTheme.colors.text};
	background-color: ${({ styledTheme }) => styledTheme.colors.transparentBackground};
	padding: 10px 16px 10px 22px;
	border-radius: 50px;
	font-size: 16px;
`;

export const Input = (props: TextInputProps) => {
	const theme = useTheme();

	return (
		<Styled styledTheme={theme} placeholderTextColor={theme.colors.extraTransparentText} {...props} />
	);
};
