import { TextBase } from '../../../components/Styled/Text/TextBase';
import { View } from '../../../components/Styled/View';
import styled from 'styled-components/native';
import { FontTypes, StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';
import { useRouter } from 'expo-router';
import { CloseButtonSVG } from '../../../components/Icons/CloseButtonSVG';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '../../../components/Styled/Button';

const MainView = styled(View)`
  height: 100%;
`;

const QRView = styled(View)<StyledProps>`
  position: absolute;
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
  height: 60%;
  border-radius: 15px 15px 0 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const HeaderText = styled(TextBase)`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 16px;
  font-size: 16px;
`;

const DescriptionText = styled(TextBase)`
  font-size: 12px;
  text-align: center;
  padding-right: 30px;
  padding-left: 30px;
  line-height: 20px;
`;

const QRCodeWrapper = styled(View)`
  margin: 40px 0 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ShareButton = styled(Button)`
  margin: auto;
  width: 80%;
`;

export default function QR() {
  const theme = useTheme();
  const router = useRouter();

  const close = () => {
    router.back();
  };

  return (
    <MainView>
      <QRView styledTheme={theme}>
        <CloseButton onPress={close}>
          <CloseButtonSVG />
        </CloseButton>
        <HeaderText fontWeight={FontTypes.medium}>
          Партнёрская программа
        </HeaderText>
        <DescriptionText>
          Поделись приложением с другом и получи 100 токенов для запросов Chat
          GPT-4. Приглашенному необходимо пройти регистрацию и пользоваться
          приложением в течение 3-ех дней.
        </DescriptionText>
        <QRCodeWrapper>
          <QRCode
            value='megalink with unexpected information placeholder'
            backgroundColor='black'
            color='white'
            size={150}
          />
        </QRCodeWrapper>
        <ShareButton>Поделиться</ShareButton>
      </QRView>
    </MainView>
  );
}
