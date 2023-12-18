import styled from 'styled-components/native';
import { View } from '../../../components/Styled/View';
import { BackgroundAnimation } from '../../../components/Background';
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

const BackgroundAnimationWrapper = styled(Reanimated.View)<{ hidden: boolean }>`
  position: absolute;
  top: 75%;
  height: 100%;
  right: -70%;
  width: 250%;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
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
  const keyboardTranslateStyle = useKeyboardTranslateStyle();

  return (
    <PageRevealWrapper pagePath='/chat/chatBot'>
      <BackgroundAnimationWrapper
        style={keyboardTranslateStyle}
        layout={Layout.duration(200)}
        hidden={false}
      >
        <BackgroundAnimation />
      </BackgroundAnimationWrapper>
      <ChatShadow />
      <ContentView>
        <MessagesHeader />
        <Messages />
        <MessagesInput />
      </ContentView>
    </PageRevealWrapper>
  );
}
