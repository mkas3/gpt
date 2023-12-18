import Reanimated, {
  Easing,
  Layout,
  SlideInDown,
  SlideOutDown,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { BackgroundAnimation } from '../../Background';
import { View } from '../../Styled/View';
import { StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';
import { Label } from '../Label';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {SafeAreaView, useWindowDimensions} from 'react-native';

const Styled = styled(Reanimated.View)<{ hidden: boolean }>`
  position: absolute;
  height: 75px;
  margin-bottom: ${({ hidden }) => (hidden ? '-75px' : '0')};
  left: 0;
  right: 0;
  bottom: 0;
`;

const BackgroundTabView = styled(Reanimated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const BackgroundTab = styled(View)<StyledProps>`
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BackgroundAnimationWrapper = styled(Reanimated.View)<{ hidden: boolean, height: number }>`
  position: absolute;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
  bottom: -875%;
  height: 1200%;
  right: -100%;
  left: -100%;
  pointer-events: none;
`;

const Routes = styled(Reanimated.View)<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const TabBarButton = styled.TouchableOpacity`
  flex: 1;
`;

const IconWrapper = styled(View)`
  position: absolute;
  top: -20%;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const theme = useTheme();
  const pathname = usePathname();
  const { width, height } = useWindowDimensions();
  const partiallyHidden = useMemo(
    () => pathname === '/settings/qr',
    [pathname],
  );
  const hidden = useMemo(
    () => pathname === '/first-start' || pathname === '/chat/chatBot',
    [pathname],
  );
  const keyboard = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });
  const translateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  return (
    <Styled
      style={translateStyle}
      hidden={hidden || partiallyHidden}
      layout={Layout.duration(200)}
    >
      <Routes
        layout={Layout.duration(200)}
        hidden={hidden}
        entering={SlideInDown}
        exiting={SlideOutDown}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (!options.title) return null;

          return (
            <TabBarButton
              key={index}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <IconWrapper>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    size: 0,
                    color: '',
                  })}
              </IconWrapper>
              <Label selected={isFocused}>{options.title}</Label>
            </TabBarButton>
          );
        })}
      </Routes>
      <BackgroundTabView>
        <BackgroundAnimationWrapper
          height={height}
          layout={Layout.duration(200)}
          hidden={hidden}
        >
          <BackgroundAnimation />
        </BackgroundAnimationWrapper>
        <BackgroundTab styledTheme={theme} />
      </BackgroundTabView>
    </Styled>
  );
};
