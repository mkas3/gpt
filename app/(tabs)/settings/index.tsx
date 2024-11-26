import { QRCodeSVG } from '../../../components/Tabs/Pages/Settings/Icons/QRCodeSVG';
import { GradientText } from '../../../components/Styled/Text/GradientText';
import { Title } from '../../../components/Styled/Text/Title';
import { Text } from '../../../components/Styled/Text';
import { SettingsButton } from '../../../components/Tabs/Pages/Settings/SettingsButton';
import { OpenAISVG } from '../../../components/Tabs/Pages/Settings/Icons/OpenAISVG';
import { SearchHistorySVG } from '../../../components/Tabs/Pages/Settings/Icons/SearchHistorySVG';
import { PinnedSVG } from '../../../components/Tabs/Pages/Settings/Icons/PinnedSVG';
import { FolderSVG } from '../../../components/Tabs/Pages/Settings/Icons/FolderSVG';
import { ThemeSVG } from '../../../components/Tabs/Pages/Settings/Icons/ThemeSVG';
import { LanguageSVG } from '../../../components/Tabs/Pages/Settings/Icons/LanguageSVG';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { View } from '../../../components/Styled/View';
import { StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';
import { TouchableOpacity } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { TitleWrapper } from '../../../components/Styled/Text/Title/TitleWrapper';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useUser} from '../../../hooks/User/useUser';
import {PageRevealWrapper} from '../../../components/Tabs/Pages/PageRevealWrapper';
import {defaultTimingConfig, defaultTimingEasing} from '../../../constants/animation';
import {BackgroundSVGAnimation} from '../../../components/Background/BackgroundSVGAnimation';

const MainView = styled(PageRevealWrapper)`
  height: 100%;
  width: 100%;
  align-items: center;
`;

const QRBackgroundWrapper = styled(Reanimated.View)`
  position: absolute;
  top: -90%;
  height: 150%;
  right: 0;
  width: 250%;
`;

const HeaderView = styled(Reanimated.View)`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15%;
  padding-left: 25px;
  padding-right: 20px;
`;

const ContentView = styled(Reanimated.View)`
  width: 100%;
  align-items: center;
`;

const HeaderGradientTextWrapper = styled(View)`
  width: 12%;
`;

const SettingsView = styled(View)`
  margin-top: 54px;
  height: 25%;
  width: 90%;
`;

const SettingsText = styled(Text)`
  margin-bottom: 12px;
`;

const SettingsBlock = styled(View)<StyledProps>`
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
  padding: 6px 20px 6px 20px;
  border-radius: 20px;
  row-gap: 2px;
  width: 100%;
  margin-bottom: 18px;
`;

export default function SettingsMainScreen() {
  const user = useUser();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isQR = useMemo(() => pathname === '/settings/qr', [pathname]);
  const qrOpacity = useDerivedValue(
    () =>
      withTiming(isQR ? 1 : 0, defaultTimingConfig),
    [isQR],
  );
  const settingsOpacity = useDerivedValue(
    () =>
      withTiming(isQR ? 0 : 1, {
        duration: 150,
        easing: defaultTimingEasing,
      }),
    [isQR],
  );

  const settingsOpacityStyle = useAnimatedStyle(() => ({
    opacity: settingsOpacity.value,
  }));

  const qrOpacityStyle = useAnimatedStyle(() => ({
    opacity: qrOpacity.value,
  }));

  const changeAIModel = () => {
    router.push('/settings/model');
  }

  const openQR = () => {
    router.push('/settings/qr');
  };

  return (
    <MainView pagePaths={['/settings', '/settings/qr']}>
      <QRBackgroundWrapper style={qrOpacityStyle}>
        <BackgroundSVGAnimation />
      </QRBackgroundWrapper>
      <HeaderView style={settingsOpacityStyle}>
        <TouchableOpacity onPress={openQR}>
          <QRCodeSVG />
        </TouchableOpacity>
        <HeaderGradientTextWrapper>
          <GradientText fontSize={16}>Изм.</GradientText>
        </HeaderGradientTextWrapper>
      </HeaderView>
      <TitleWrapper>
        <Title />
      </TitleWrapper>
      <ContentView style={settingsOpacityStyle}>
        <Text fontSize='24px'>
          Добрый день,{'\n'}{user.name}
        </Text>
        <SettingsView>
          <SettingsText fontSize='20px'>Настройки</SettingsText>
          <SettingsBlock styledTheme={theme}>
            <SettingsButton icon={<OpenAISVG />} onPress={changeAIModel} last>
              Сменить AI модель
            </SettingsButton>
          </SettingsBlock>
          <SettingsBlock styledTheme={theme}>
            <SettingsButton icon={<SearchHistorySVG />}>
              История запросов
            </SettingsButton>
            <SettingsButton icon={<PinnedSVG />}>Избранное</SettingsButton>
            <SettingsButton icon={<FolderSVG />}>Папки с чатами</SettingsButton>
            <SettingsButton icon={<ThemeSVG />}>Оформление</SettingsButton>
            <SettingsButton icon={<LanguageSVG />} last>
              Язык
            </SettingsButton>
          </SettingsBlock>
        </SettingsView>
      </ContentView>
    </MainView>
  );
}
