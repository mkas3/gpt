import styled from 'styled-components/native';
import {Button, ButtonProps} from '../index';
import {useTheme} from '../../../../hooks/Theme/useTheme';
import {FontTypes, StyledProps} from '../../../../types/theme.types';
import {TextBase} from '../../Text/TextBase';
import {BaseLinearGradient} from '../../../Gradient/BaseLinearGradient';
import {View} from '../../View';

export type GradientButtonProps = ButtonProps;

const Styled = styled(Button)`
  background-color: transparent;
	padding: 0;
	justify-content: center;
`;

const StyledBackgroundView = styled(View)`
	position: absolute;
	border-radius: 30px;
	overflow: hidden;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`;

const StyledContent = styled(View)`
  padding: 0 8px 0 8px;
	display: flex;
	flex-direction: row;
  column-gap: 4px;
	align-items: center;
`;

const StyledText = styled(TextBase)<StyledProps>`
  color: ${({ styledTheme }) => styledTheme.colors.text};
`;

export const GradientButton = ({ children, ...otherProps }: GradientButtonProps) => {
	const theme = useTheme();

	return (
		<Styled {...otherProps}>
			<StyledBackgroundView>
				<BaseLinearGradient selected />
			</StyledBackgroundView>
			<StyledContent>
				{typeof children === 'string' ? (
					<StyledText fontWeight={FontTypes.medium} styledTheme={theme}>
						{children}
					</StyledText>
				) : (
					children
				)}
			</StyledContent>
		</Styled>
	);
};
