import { Themes, ThemeTypes } from '../../types/theme.types';
import { lightTheme } from './light-theme';
import {darkTheme} from './dark-theme';

export const themes: Themes = {
  [ThemeTypes.light]: {
    type: ThemeTypes.light,
    theme: lightTheme,
  },
  [ThemeTypes.dark]: {
    type: ThemeTypes.dark,
		theme: darkTheme,
  },
};