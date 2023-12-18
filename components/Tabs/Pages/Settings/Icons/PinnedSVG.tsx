import { useTheme } from '../../../../../hooks/Theme/useTheme';
import Svg, {Path} from 'react-native-svg';

export const PinnedSVG = () => {
  const theme = useTheme();

  return (
    <Svg
      width='9'
      height='12'
      viewBox='0 0 9 12'
      fill='none'
    >
      <Path
        d='M0 12V1.33333C0 0.596953 0.575634 0 1.28571 0H7.71429C8.42439 0 9 0.596953 9 1.33333V12L5.19525 9.46353C4.77174 9.18113 4.22826 9.18113 3.80475 9.46353L0 12Z'
        fill={theme.colors.background}
      />
    </Svg>
  );
};
