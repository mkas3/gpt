import styled from 'styled-components/native';
import { View } from '../../View';
import { ViewProps } from 'react-native';

const Styled = styled(View)`
  margin: 16px 0 32px 0;
  flex: 1;
`;

export const TitleWrapper = (props: ViewProps) => {
  return <Styled {...props} />;
};
