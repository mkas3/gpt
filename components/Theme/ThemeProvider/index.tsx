import { useColorScheme } from 'react-native';
import React, {useEffect} from 'react';
import { ThemeContext } from '../ThemeContext';
import { ThemeNavigationProvider } from '../ThemeNavigationProvider';
import {Themes, ThemeTypes} from '../../../types/theme.types';
import {useFonts} from 'expo-font';

type ThemeProviderProps = {
  themes: Themes;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ themes, children  }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded)
    return null;

  return (
    <ThemeContext.Provider
      value={
        colorScheme === 'dark'
          ? themes[ThemeTypes.dark]
          : themes[ThemeTypes.light]
      }
    >
      <ThemeNavigationProvider>{children}</ThemeNavigationProvider>
    </ThemeContext.Provider>
  );
};
