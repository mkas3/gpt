import MaskedView from '@react-native-masked-view/masked-view';
import {BaseLinearGradient} from '../../Gradient/BaseLinearGradient';
import {TextBase} from '../../Styled/Text/TextBase';
import styled from 'styled-components';
import {View} from '../../Styled/View';

type LabelProps = {
	selected: boolean;
	children: string;
}

const StyledMask = styled(MaskedView)`
	top: 20%;
	width: 100%;
	height: 100%;
`;

const LabelView = styled(View)`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const LabelText = styled(TextBase)`
	font-size: 9px;
`;

const LabelGradient = styled(BaseLinearGradient)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100px;
	height: 100px;
`;

export const Label = ({ selected, children }: LabelProps) => {
	return (
		<StyledMask maskElement={
			<LabelView>
				<LabelText>{children}</LabelText>
			</LabelView>
		}>
			<LabelGradient selected={selected} />
		</StyledMask>
	);
};
