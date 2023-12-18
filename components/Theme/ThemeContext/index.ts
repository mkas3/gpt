import { createContext } from 'react';
import { ContextTheme, Theme, ThemeTypes } from '../../../types/theme.types';
import { darkTheme } from '../../../constants/theme/dark-theme';
import { themes } from '../../../constants/theme';

export const ThemeContext = createContext<ContextTheme>(
  themes[ThemeTypes.dark],
);
