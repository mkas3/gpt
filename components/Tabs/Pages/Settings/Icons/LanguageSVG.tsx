import {useTheme} from '../../../../../hooks/Theme/useTheme';
import Svg, {Path} from 'react-native-svg';

export const LanguageSVG = () => {
	const theme = useTheme();

  return (
    <Svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
    >
      <Path
        d='M9.009 0C13.977 0 18 4.032 18 9C18 13.968 13.977 18 9.009 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9.009 0ZM2.772 5.4H5.427C5.715 4.275 6.129 3.195 6.669 2.196C5.013 2.763 3.636 3.915 2.772 5.4ZM9 1.836C8.253 2.916 7.668 4.113 7.281 5.4H10.719C10.332 4.113 9.747 2.916 9 1.836ZM15.966 10.8C16.11 10.224 16.2 9.621 16.2 9C16.2 8.379 16.11 7.776 15.966 7.2H12.924C12.996 7.794 13.05 8.388 13.05 9C13.05 9.612 12.996 10.206 12.924 10.8H15.966ZM15.228 12.6H12.573C12.285 13.725 11.871 14.805 11.331 15.804C12.987 15.237 14.364 14.094 15.228 12.6ZM12.573 5.4H15.228C14.364 3.906 12.987 2.763 11.331 2.196C11.871 3.195 12.285 4.275 12.573 5.4ZM9 16.164C9.747 15.084 10.332 13.887 10.719 12.6H7.281C7.668 13.887 8.253 15.084 9 16.164ZM6.894 10.8H11.106C11.187 10.206 11.25 9.612 11.25 9C11.25 8.388 11.187 7.785 11.106 7.2H6.894C6.813 7.785 6.75 8.388 6.75 9C6.75 9.612 6.813 10.206 6.894 10.8ZM6.669 15.804C6.129 14.805 5.715 13.725 5.427 12.6H2.772C3.636 14.085 5.013 15.237 6.669 15.804ZM5.076 10.8C5.004 10.206 4.95 9.612 4.95 9C4.95 8.388 5.004 7.794 5.076 7.2H2.034C1.89 7.776 1.8 8.379 1.8 9C1.8 9.621 1.89 10.224 2.034 10.8H5.076Z'
        fill={theme.colors.background}
      />
    </Svg>
  );
};
