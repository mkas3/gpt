import { useMemo } from 'react';
import { MODELS } from '../../../constants/messages';
import styled from 'styled-components';
import { View } from '../../../components/Styled/View';
import { MessagesHeader } from '../../../components/Tabs/Pages/ChatBot/Messages/MessagesHeader';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useUserSettings } from '../../../hooks/User/useUserSettings';
import { useRouter } from 'expo-router';
import { Text } from '../../../components/Styled/Text';
import { FontTypes } from '../../../types/theme.types';

const Styled = styled(View)``;

const ModelsScrollView = styled(ScrollView)``;

const ModelSelect = styled(TouchableOpacity)``;

export default function Model() {
  const { settings, setSettings } = useUserSettings();
  const allModels = useMemo(() => ['test', ...MODELS], []);
  const router = useRouter();

  const selectModel = (value: string) => {
    setSettings({ ...settings, model: value });
    router.back();
  };

  return (
    <Styled>
      <MessagesHeader />
      <ModelsScrollView>
        {allModels.map((value, index) => (
          <ModelSelect key={index} onPress={() => selectModel(value)}>
            <Text
              fontSize={24}
              fontWeight={
                settings.model === value ? FontTypes.bold : FontTypes.regular
              }
            >
              {value}
            </Text>
          </ModelSelect>
        ))}
      </ModelsScrollView>
    </Styled>
  );
}
