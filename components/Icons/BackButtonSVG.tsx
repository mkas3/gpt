import {useTheme} from '../../hooks/Theme/useTheme';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components/native';

type BackButtonSVGProps = {
  isForward?: boolean;
  color?: string;
};

const Styled = styled(Svg)<{ isForward?: boolean }>`
  ${({ isForward }) => isForward ? 'transform: scaleX(-1);' : ''}
`;

export const BackButtonSVG = ({ isForward = false, color }: BackButtonSVGProps) => {
	const theme = useTheme();

  return (
    <Styled
      width='8'
      height='17'
      viewBox='0 0 8 17'
      fill='none'
      isForward={isForward}
    >
      <Path
        d='M0.0026995 7.99977C0.00217833 7.73288 0.0951301 7.47423 0.265421 7.26872L5.97676 0.415119C6.17064 0.181849 6.44926 0.0351535 6.7513 0.00730537C7.05335 -0.0205428 7.35408 0.0727369 7.58735 0.266624C7.82062 0.460511 7.96732 0.739123 7.99517 1.04117C8.02301 1.34321 7.92974 1.64395 7.73585 1.87722L2.61849 7.99977L7.55308 14.1223C7.64797 14.2392 7.71882 14.3736 7.76158 14.5179C7.80434 14.6622 7.81815 14.8136 7.80223 14.9632C7.78631 15.1129 7.74096 15.258 7.6688 15.39C7.59664 15.5221 7.49909 15.6387 7.38174 15.7329C7.2643 15.8375 7.12651 15.9168 6.97701 15.9656C6.82752 16.0145 6.66955 16.032 6.51298 16.017C6.35642 16.002 6.20464 15.9548 6.06717 15.8784C5.92969 15.802 5.80946 15.698 5.71403 15.573L0.196885 8.7194C0.0535122 8.50798 -0.0148577 8.25461 0.0026995 7.99977Z'
        fill={color || theme.colors.text}
      />
    </Styled>
  );
};
