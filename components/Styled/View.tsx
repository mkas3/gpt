import styled from 'styled-components/native';
import {ViewProps} from 'react-native';
import {StyledProps} from '../../types/theme.types';
import {useTheme} from '../../hooks/Theme/useTheme';

const Styled = styled.View<StyledProps>`
	
`;

export const View = (props: ViewProps) => {
	const theme = useTheme();

	return (
		<Styled styledTheme={theme} {...props} />
	);
};
