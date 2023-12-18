import { Slot, Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='index'
        options={{
          freezeOnBlur: true,
        }}
      />
      <Stack.Screen
        name='chatBot'
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
