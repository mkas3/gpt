import Reanimated from 'react-native-reanimated';
import { useFadeStyle } from '../../../hooks/Animation/useFadeStyle';
import { usePathname } from 'expo-router';
import {useEffect} from 'react';

type PageRevealWrapperProps = {
  children?: React.ReactNode;
  pagePath?: string;
  pagePaths?: string[];
};

export const PageRevealWrapper = ({
  children,
  pagePath,
  pagePaths,
}: PageRevealWrapperProps) => {
  const pathname = usePathname();

  const isFade = pagePath
    ? pathname === pagePath
    : pagePaths
      ? pagePaths.includes(pathname)
      : true;

  const fadeStyle = useFadeStyle(isFade);
  return <Reanimated.View style={fadeStyle}>{children}</Reanimated.View>;
};
