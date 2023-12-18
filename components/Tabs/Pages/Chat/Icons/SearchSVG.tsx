import Svg, { Path } from 'react-native-svg';
import {useTheme} from '../../../../../hooks/Theme/useTheme';

export const SearchSVG = () => {
	const theme = useTheme();

  return (
    <Svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
      <Path
        d='M18.6342 18.6098L22 22M20.4444 14.2222C20.4444 17.6587 17.6587 20.4444 14.2222 20.4444C10.7858 20.4444 8 17.6587 8 14.2222C8 10.7858 10.7858 8 14.2222 8C17.6587 8 20.4444 10.7858 20.4444 14.2222Z'
        stroke={theme.colors.extraTransparentText}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};
