import { SplashScreen, Stack, usePathname } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '../components/Theme/ThemeProvider';
import { themes } from '../constants/theme';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../components/Auth/AuthProvider';
import { MessagesProvider } from '../components/Messages/MessagesProvider';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider themes={themes}>
        <AuthProvider>
          <MessagesProvider>
            <Stack
              initialRouteName='(tabs)'
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name='(tabs)' />
            </Stack>
          </MessagesProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
