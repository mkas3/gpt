import styled from 'styled-components/native';
import { View } from '../../../components/Styled/View';
import { usePathname } from 'expo-router';
import { ShadowLinearGradient } from '../../../components/Gradient/ShadowLinearGradient';
import React from 'react';
import Reanimated, {
  Layout,
} from 'react-native-reanimated';
import { useKeyboardTranslateStyle } from '../../../hooks/Keyboard/useKeyboardTranslateStyle';
import { Messages } from '../../../components/Tabs/Pages/ChatBot/Messages';
import {MessagesInput} from '../../../components/Tabs/Pages/ChatBot/Messages/MessagesInput';
import {MessagesHeader} from '../../../components/Tabs/Pages/ChatBot/Messages/MessagesHeader';
import {useFadeStyle} from '../../../hooks/Animation/useFadeStyle';
import {PageRevealWrapper} from '../../../components/Tabs/Pages/PageRevealWrapper';

const ContentView = styled(View)`
  z-index: 10;
  height: 100%;
`;

const ChatShadow = styled(ShadowLinearGradient)`
  position: absolute;
  height: 100px;
  left: 0;
  right: 0;
  top: 100px;
  z-index: 15;
`;

export default function ChatBot() {
  return (
    <PageRevealWrapper pagePath='/chat/chatBot'>
      <ChatShadow />
      <ContentView>
        <MessagesHeader />
        <Messages />
        <MessagesInput />
      </ContentView>
    </PageRevealWrapper>
  );
}
