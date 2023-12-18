import {TouchableOpacity} from 'react-native';
import {BackButtonSVG} from '../../../../Icons/BackButtonSVG';
import {Title} from '../../../../Styled/Text/Title';
import {FontTypes, StyledProps} from '../../../../../types/theme.types';
import {ShareSVG} from '../../Chat/Icons/ShareSVG';
import React from 'react';
import styled from 'styled-components/native';
import {View} from '../../../../Styled/View';
import {useRouter} from 'expo-router';
import {useTheme} from '../../../../../hooks/Theme/useTheme';

const Header = styled(View)<StyledProps>`
	background-color: ${({ styledTheme }) => styledTheme.colors.background};
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 24px 26px 0 26px;
`;

const BotTitleWrapper = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 55%;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: -5;
`;

export const MessagesHeader = () => {
	const theme = useTheme();
	const router = useRouter();
	const goBack = () => {
		router.back();
	};

	const share = () => {};

	return <Header styledTheme={theme}>
		<TouchableOpacity onPress={goBack} hitSlop={15}>
			<BackButtonSVG />
		</TouchableOpacity>
		<BotTitleWrapper>
			<Title fontSize={24} fontWeight={FontTypes.bold} />
		</BotTitleWrapper>
		<TouchableOpacity onPress={share} hitSlop={15}>
			<ShareSVG />
		</TouchableOpacity>
	</Header>;
}