import {useContext} from 'react';
import {ThemeContext} from '../../components/Theme/ThemeContext';

export const useTheme = () => {
	return useContext(ThemeContext).theme;
};
