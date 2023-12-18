import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SearchInput } from '../../../components/Tabs/Pages/Chat/SearchInput';
import { GradientText } from '../../../components/Styled/Text/GradientText';
import { Title } from '../../../components/Styled/Text/Title';
import { Text } from '../../../components/Styled/Text';
import { ExtraText } from '../../../components/Styled/Text/ExtraText';
import { TitleWrapper } from '../../../components/Styled/Text/Title/TitleWrapper';
import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { MessagesSlider } from '../../../components/Tabs/Pages/Chat/MessagesSlider';
import {View} from '../../../components/Styled/View';
import {PageRevealWrapper} from '../../../components/Tabs/Pages/PageRevealWrapper';

const MainView = styled(PageRevealWrapper)``;

const ExtraGradientTextWrapper = styled(View)`
  margin: 4px 0 10px 0;
  height: 5%;
`;

const SearchButton = styled(TouchableOpacity)`
  width: 80%;
  margin: auto;
`;

export default function Chat() {
  const router = useRouter();

  const pushToChat = () => {
    router.push('/chat/chatBot');
  };

  return (
    <MainView pagePath='/chat'>
      <MessagesSlider />
      <TitleWrapper>
        <Title animated />
      </TitleWrapper>
      <Text>Напиши{'\n'}любой запрос</Text>
      <ExtraText>или{'\n'}опробуй новую модель</ExtraText>
      <ExtraGradientTextWrapper>
        <GradientText fontSize={10}>CHAT GPT 4</GradientText>
      </ExtraGradientTextWrapper>
      <SearchButton onPress={pushToChat}>
        <SearchInput editable={false} />
      </SearchButton>
    </MainView>
  );
}
