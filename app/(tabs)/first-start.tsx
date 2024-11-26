import { Title } from '../../components/Styled/Text/Title';
import styled from 'styled-components/native';
import { View } from '../../components/Styled/View';
import Reanimated, {
  Easing,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Text } from '../../components/Styled/Text';
import { FontTypes, StyledProps } from '../../types/theme.types';
import { Input } from '../../components/Styled/Input';
import { Button } from '../../components/Styled/Button';
import { GoogleButton } from '../../components/Styled/Button/GoogleButton';
import { useTheme } from '../../hooks/Theme/useTheme';
import { KeyboardAvoidingView } from 'react-native';
import { useKeyboardOpen } from '../../hooks/Keyboard/useKeyboardOpen';
import { login, register } from '../../services/auth.service';
import { useUserStore } from '../../store/User/user.store';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '../../components/Styled/Input/FormInput';
import { useRouter } from 'expo-router';
import { RequestUser } from '../../types/user.types';
import { defaultTimingEasing } from '../../constants/animation';
import { BackgroundSVGAnimation } from '../../components/Background/BackgroundSVGAnimation';

type FormValues = RequestUser & {
  confirmPassword?: string;
};

const MainView = styled(View)`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const TitleWrapper = styled(Reanimated.View)`
  position: absolute;
  top: 40%;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0;
`;

const SignInKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  z-index: 100;
`;

const SignInView = styled(Reanimated.View)`
  row-gap: 14px;
  align-items: center;
  opacity: 0;
  z-index: 10;
`;

const SignInInput = styled(FormInput)`
  width: 80%;
`;

const SignInButton = styled(Button)`
  width: 80%;
  border-radius: 50px;
`;

const ToggleButton = styled(Button)<StyledProps>`
  border-top-width: 1px;
  border-radius: 0;
  padding-left: 48px;
  padding-right: 48px;
  background-color: transparent;
  border-color: ${({ styledTheme }) => styledTheme.colors.extraTransparentText};
`;

const WelcomeWrapper = styled(Reanimated.View)`
  position: absolute;
  bottom: -10%;
  left: 0;
  right: 0;
`;

const BackgroundAnimationWrapper = styled(View)`
  position: absolute;
  bottom: 45%;
  height: 100%;
  left: 0;
  right: 0;
`;

export default function FirstStart() {
  const theme = useTheme();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [welcomeState, setWelcomeState] = useState(0);
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(1);
  const titleTranslateY = useSharedValue(0);
  const signInOpacity = useSharedValue(0);
  const welcomeTranslateY = useSharedValue(-10);
  const setUser = useUserStore((state) => state.setUser);
  const isKeyboardOpen = useKeyboardOpen();
  const { control, handleSubmit, resetField, formState } =
    useForm<FormValues>();

  const titleWrapperStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      { scale: titleScale.value },
      { translateY: titleTranslateY.value },
    ],
  }));

  const signInStyle = useAnimatedStyle(() => ({
    opacity: signInOpacity.value,
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: welcomeTranslateY.value }],
  }));

  const handleAuth = (data: FormValues) => {
    if (!isLogin && data.password !== data.confirmPassword) return;

    const { confirmPassword, ...authData } = data;

    if (isLogin)
      login(authData).then((res) => {
        if (res.data) {
          setUser(res.data);
          router.push('/(tabs)/chat');
        }
      });
    else
      register(authData).then((res) => {
        if (res.data) {
          setUser(res.data);
          router.push('/(tabs)/chat');
        }
      });
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    titleOpacity.value = withSequence(
      withTiming(1, {
        duration: 3000,
        easing: defaultTimingEasing,
      }),
      withTiming(0, {
        duration: 3000,
        easing: defaultTimingEasing,
      }, () => {
        runOnJS(setWelcomeState)(1);
      }),
      withTiming(1, {
        duration: 3000,
        easing: defaultTimingEasing,
      }),
    );
    titleScale.value = withDelay(
      9000,
      withTiming(0.5, {
        duration: 1500,
        easing: defaultTimingEasing,
      }),
    );
    titleTranslateY.value = withDelay(
      9500,
      withTiming(-750, {
        duration: 1000,
        easing: defaultTimingEasing,
      }),
    );
    signInOpacity.value = withDelay(
      10000,
      withTiming(1, {
        duration: 1000,
        easing: defaultTimingEasing,
      }),
    );
    welcomeTranslateY.value = withDelay(
      9500,
      withTiming(-100, {
        duration: 1000,
        easing: defaultTimingEasing,
      }),
    );
  }, []);

  return (
    <MainView>
      <TitleWrapper style={titleWrapperStyle}>
        <Title>{welcomeState === 0 ? 'Hello' : 'AIGeek'}</Title>
      </TitleWrapper>
      <SignInKeyboardAvoidingView behavior='height'>
        <SignInView style={signInStyle}>
          <Text>{isLogin ? 'Войти' : 'Авторизация'}</Text>
          <GoogleButton />
          {!isLogin && (
            <SignInInput
              placeholder='Имя'
              name='name'
              control={control}
              rules={{ required: !isLogin }}
            />
          )}
          <SignInInput
            placeholder='Логин'
            name='email'
            control={control}
            rules={{ required: true }}
          />
          <SignInInput
            placeholder='Пароль'
            name='password'
            control={control}
            rules={{ required: true }}
          />
          {!isLogin && (
            <SignInInput
              placeholder='Повторите пароль'
              name='confirmPassword'
              control={control}
              rules={{ required: !isLogin }}
            />
          )}
          <SignInButton onPress={handleSubmit(handleAuth)}>
            {isLogin ? 'Войти' : 'Регистрация'}
          </SignInButton>
          <ToggleButton styledTheme={theme} onPress={toggleAuth}>
            <Text fontSize='16px' fontWeight={FontTypes.medium}>
              {isLogin ? 'Регистрация' : 'Войти'}
            </Text>
          </ToggleButton>
        </SignInView>
      </SignInKeyboardAvoidingView>
      {!isKeyboardOpen && (
        <WelcomeWrapper style={welcomeStyle}>
          <Text fontSize='20px'>Добро пожаловать</Text>
        </WelcomeWrapper>
      )}
      <BackgroundAnimationWrapper>
        <BackgroundSVGAnimation />
      </BackgroundAnimationWrapper>
    </MainView>
  );
}
