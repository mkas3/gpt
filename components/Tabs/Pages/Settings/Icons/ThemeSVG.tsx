import {useTheme} from '../../../../../hooks/Theme/useTheme';
import Svg, {Path} from 'react-native-svg';

export const ThemeSVG = () => {
	const theme = useTheme();

  return (
    <Svg
      width='15'
      height='14'
      viewBox='0 0 15 14'
      fill='none'
    >
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.5 0C3.35786 0 0 3.13401 0 7C0 10.866 3.35786 14 7.5 14C11.6421 14 15 10.866 15 7C15 3.13401 11.6421 0 7.5 0ZM3.25737 10.9598C4.34316 11.9732 5.84315 12.6 7.5 12.6C10.8137 12.6 13.5 10.0928 13.5 7C13.5 5.45361 12.8284 4.05361 11.7427 3.04021L3.25737 10.9598Z'
        fill={theme.colors.background}
      />
    </Svg>
  );
};
