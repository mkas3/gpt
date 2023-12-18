import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import React from 'react';
import { ThemeTypes } from '../../../types/theme.types';
import {useTheme} from '../../../hooks/Theme/useTheme';
import {useThemeType} from '../../../hooks/Theme/useThemeType';

type ThemeNavigationProviderProps = {
	children?: React.ReactNode;
}

export const ThemeNavigationProvider = ({ children }: ThemeNavigationProviderProps) => {
	const themeType = useThemeType();
	return (
		<ThemeProvider value={themeType === ThemeTypes.dark ? DarkTheme : DefaultTheme}>
			{children}
		</ThemeProvider>
	);
};
