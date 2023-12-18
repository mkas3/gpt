import {Stack, usePathname} from 'expo-router';
import {TextBase} from '../components/Styled/Text/TextBase';

export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <>
      <Stack.Screen options={{ title: 'Упс!' }} />
      <TextBase>Путь {pathname} не найден</TextBase>
    </>
  );
}