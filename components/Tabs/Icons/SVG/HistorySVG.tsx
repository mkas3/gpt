import Svg, { Path } from 'react-native-svg';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../../hooks/Theme/useTheme';
import {SVGLinearGradient} from '../../../Gradient/SVGLinearGradient';

type HistorySVGProps = {
  selected: boolean;
};

export const HistorySVG = ({ selected }: HistorySVGProps) => {
  return (
    <Svg width='21' height='21' viewBox='0 0 21 21' fill='none'>
      <SVGLinearGradient selected={selected} />
      <Path
        d='M19.0312 10.5C19.0312 11.2245 18.4432 11.8125 17.7188 11.8125H7.21875C6.49425 11.8125 5.90625 11.2245 5.90625 10.5C5.90625 9.7755 6.49425 9.1875 7.21875 9.1875H17.7188C18.4432 9.1875 19.0312 9.7755 19.0312 10.5Z'
        fill='url(#grad)'
      />
      <Path
        d='M19.0312 3.9375C19.0312 4.662 18.4432 5.25 17.7188 5.25H7.21875C6.49425 5.25 5.90625 4.662 5.90625 3.9375C5.90625 3.213 6.49425 2.625 7.21875 2.625H17.7188C18.4432 2.625 19.0312 3.213 19.0312 3.9375Z'
        fill='url(#grad)'
      />
      <Path
        d='M19.0312 17.0625C19.0312 17.787 18.4432 18.375 17.7188 18.375H7.21875C6.49425 18.375 5.90625 17.787 5.90625 17.0625C5.90625 16.338 6.49425 15.75 7.21875 15.75H17.7188C18.4432 15.75 19.0312 16.338 19.0312 17.0625Z'
        fill='url(#grad)'
      />
      <Path
        d='M1.96875 3.9375C1.96875 4.66134 2.55741 5.25 3.28125 5.25C4.00509 5.25 4.59375 4.66134 4.59375 3.9375C4.59375 3.21366 4.00509 2.625 3.28125 2.625C2.55741 2.625 1.96875 3.21366 1.96875 3.9375Z'
        fill='url(#grad)'
      />
      <Path
        d='M1.96875 10.5C1.96875 11.2238 2.55741 11.8125 3.28125 11.8125C4.00509 11.8125 4.59375 11.2238 4.59375 10.5C4.59375 9.77616 4.00509 9.1875 3.28125 9.1875C2.55741 9.1875 1.96875 9.77616 1.96875 10.5Z'
        fill='url(#grad)'
      />
      <Path
        d='M1.96875 17.0625C1.96875 17.7863 2.55741 18.375 3.28125 18.375C4.00509 18.375 4.59375 17.7863 4.59375 17.0625C4.59375 16.3387 4.00509 15.75 3.28125 15.75C2.55741 15.75 1.96875 16.3387 1.96875 17.0625Z'
        fill='url(#grad)'
      />
    </Svg>
  );
};
