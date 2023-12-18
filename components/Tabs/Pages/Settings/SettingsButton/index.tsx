import styled from 'styled-components/native';
import { View } from '../../../../Styled/View';
import { StyledProps } from '../../../../../types/theme.types';
import { useTheme } from '../../../../../hooks/Theme/useTheme';
import { TextBase } from '../../../../Styled/Text/TextBase';
import { BackButtonSVG } from '../../../../Icons/BackButtonSVG';
import { TouchableOpacityProps } from 'react-native';

type SettingsButtonProps = TouchableOpacityProps & {
  icon: React.ReactNode;
  last?: boolean;
};

type StyledSettingsButtonProps = StyledProps & {
  last?: boolean;
};

const Styled = styled.TouchableOpacity<StyledSettingsButtonProps>`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  font-size: 15px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-color: ${({ styledTheme, last }) =>
    last ? 'transparent' : styledTheme.colors.transparentBackground};
`;

const TextView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
`;

const Icon = styled(View)<StyledProps>`
  background-color: ${({ styledTheme }) => styledTheme.colors.text};
  padding: 5px;
  border-radius: 6px;
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const SettingsButton = ({
  icon,
  children,
  last,
  ...otherProps
}: SettingsButtonProps) => {
  const theme = useTheme();
  return (
    <Styled styledTheme={theme} last={last} {...otherProps}>
      <TextView>
        <Icon styledTheme={theme}>{icon}</Icon>
        <TextBase>{children}</TextBase>
      </TextView>
      <BackButtonSVG isForward={true} color={theme.colors.extraText} />
    </Styled>
  );
};
