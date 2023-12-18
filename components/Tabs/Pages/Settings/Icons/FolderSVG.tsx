import {useTheme} from '../../../../../hooks/Theme/useTheme';
import Svg, {Path} from 'react-native-svg';

export const FolderSVG = () => {
	const theme = useTheme();
  return (
    <Svg
      width='15'
      height='13'
      viewBox='0 0 15 13'
      fill='none'
    >
      <Path
        d='M1 3.51429C1 2.6342 1 2.19416 1.15744 1.85802C1.29592 1.56233 1.51689 1.32193 1.78868 1.17128C2.09766 1 2.50215 1 3.31111 1H5.82049C6.17378 1 6.35044 1 6.51669 1.04342C6.66403 1.08191 6.80493 1.1454 6.93421 1.23157C7.07996 1.32874 7.2049 1.46463 7.45472 1.73642L7.54528 1.83501C7.7951 2.1068 7.92004 2.24269 8.06579 2.33986C8.19507 2.42602 8.33597 2.48952 8.48331 2.52801C8.64956 2.57143 8.82622 2.57143 9.17953 2.57143H11.6889C12.4978 2.57143 12.9024 2.57143 13.2113 2.74271C13.4831 2.89336 13.7041 3.13376 13.8426 3.42944C14 3.76559 14 4.20564 14 5.08571V9.48571C14 10.3658 14 10.8059 13.8426 11.142C13.7041 11.4377 13.4831 11.6781 13.2113 11.8287C12.9024 12 12.4978 12 11.6889 12H3.31111C2.50214 12 2.09766 12 1.78868 11.8287C1.51689 11.6781 1.29592 11.4377 1.15744 11.142C1 10.8059 1 10.3658 1 9.48571V3.51429Z'
        stroke={theme.colors.background}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};
