import {useContext} from 'react';
import {ThemeContext} from '../../components/Theme/ThemeContext';

export const useThemeType = () => {
	return useContext(ThemeContext).type;
};
