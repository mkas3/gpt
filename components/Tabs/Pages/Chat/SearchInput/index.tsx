import styled from 'styled-components/native';
import {Input} from '../../../../Styled/Input';
import {View} from '../../../../Styled/View';
import {SearchSVG} from '../Icons/SearchSVG';
import {TextInputProps} from 'react-native';

const SearchInputContainer = styled(View)`
	position: relative;
	display: flex;
	flex-direction: row;
`;

const MainInput = styled(Input)`
	width: 100%;
	padding-right: 48px;
`;

const SearchSVGContainer = styled(View)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 16px;
	align-items: center;
	justify-content: center;
`;

export const SearchInput = (props: TextInputProps) => {
	return (
		<SearchInputContainer>
			<MainInput placeholder='Что ты думаешь о...' {...props} />
			<SearchSVGContainer>
				<SearchSVG />
			</SearchSVGContainer>
		</SearchInputContainer>
	);
};
