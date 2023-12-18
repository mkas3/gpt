import {Text} from '../../../../Styled/Text';
import {TokensSVG} from '../../../../Icons/TokensSVG';
import {SendSVG} from '../../Chat/Icons/SendSVG';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import Reanimated from 'react-native-reanimated';
import {StyledProps} from '../../../../../types/theme.types';
import {Input} from '../../../../Styled/Input';
import {useTheme} from '../../../../../hooks/Theme/useTheme';
import {GradientButton} from '../../../../Styled/Button/GradientButton';
import {TouchableOpacity} from 'react-native';
import {useKeyboardTranslateStyle} from '../../../../../hooks/Keyboard/useKeyboardTranslateStyle';
import {useUser} from '../../../../../hooks/User/useUser';
import {useMessages} from '../../../../../hooks/Messages/useMessages';

const MessageInputView = styled(Reanimated.View)<StyledProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 65px;
  background-color: ${({ styledTheme }) =>
	styledTheme.colors.transparentBackground};
  align-items: center;
`;

const Styled = styled(Input)`
  background-color: transparent;
  padding-left: 12px;
  width: 70%;
`;

const TokensButton = styled(GradientButton)`
  height: 50%;
  margin-left: 10px;
`;

const SendButton = styled(TouchableOpacity)``;

export const MessagesInput = () => {
	const user = useUser();
	const [inputValue, setInputValue] = useState('');
	const theme = useTheme();
	const { addMessage, getAnswer, deleteAllMessages } = useMessages();
	const keyboardTranslateStyle = useKeyboardTranslateStyle();

	const submitMessage = async () => {
		if (inputValue === '') return;
		setInputValue('');
		await addMessage({ text: inputValue });
		getAnswer();
	};

	const deleteMessages = async () => {
		await deleteAllMessages();
	}
	
	return (
		<MessageInputView styledTheme={theme} style={keyboardTranslateStyle}>
			<TokensButton onPress={deleteMessages}>
				<Text fontSize='16px'>{user.tokens}</Text>
				<TokensSVG />
			</TokensButton>
			<Styled
				placeholder='Сообщение...'
				onChange={(e) => setInputValue(e.nativeEvent.text)}
				value={inputValue}
				onSubmitEditing={submitMessage}
				blurOnSubmit={false}
			/>
			<SendButton onPress={submitMessage}>
				<SendSVG />
			</SendButton>
		</MessageInputView>
	);
};
