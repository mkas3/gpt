import { Message } from '../../Chat/Message';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Reanimated from 'react-native-reanimated';
import { useMessages } from '../../../../../hooks/Messages/useMessages';
import { useKeyboardTranslateStyle } from '../../../../../hooks/Keyboard/useKeyboardTranslateStyle';
import { View } from '../../../../Styled/View';
import { MessageRoles } from '../../../../../types/message.types';

const MessagesScrollView = styled(Reanimated.ScrollView)`
  z-index: -10;
  margin-bottom: 65px;
`;

const MessagesView = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px 24px 20px;
  margin-top: auto;
`;

export const Messages = () => {
  const { messages, onAddMessage, fetchMessages, generating } = useMessages();
  const keyboardTranslateStyle = useKeyboardTranslateStyle();
  const ref = useRef<Reanimated.ScrollView>(null);
  const [firstAppear, setFirstAppear] = useState(0);

  const handleFirstAppear = () => {
    if (firstAppear === 0) setFirstAppear(1);
    else if (firstAppear === 1) {
      ref.current?.scrollToEnd({ animated: false });
      setFirstAppear(-1);
    }
  };

  useEffect(() => {
    fetchMessages();
    ref.current?.scrollToEnd({ animated: false });
    const subscription = onAddMessage.subscribe({
      next: (value) => {
        ref.current?.scrollToEnd({ animated: value !== MessageRoles.SYSTEM });
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MessagesScrollView
      ref={ref}
      contentContainerStyle={{ minHeight: '79%' }}
      style={keyboardTranslateStyle}
    >
      <MessagesView onLayout={() => handleFirstAppear()}>
        {messages.map((el, index) => (
          <Message
            key={index}
            owner={el.messageRole}
            date={el.updatedAt}
            prevDate={index !== 0 ? messages[index - 1].updatedAt : undefined}
            isLoading={index === messages.length - 1 && generating}
          >
            {el.text}
          </Message>
        ))}
      </MessagesView>
    </MessagesScrollView>
  );
};
