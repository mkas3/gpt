import { useUserStore } from '../../../store/User/user.store';
import React, { useEffect } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import * as Network from 'expo-network';
import styled from 'styled-components/native';
import { FontTypes, StyledProps } from '../../../types/theme.types';
import { useTheme } from '../../../hooks/Theme/useTheme';
import { Text } from '../../Styled/Text';
import Reanimated, {
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated';
import { concatMap, from, iif, interval, map, of, tap, timer } from 'rxjs';
import {logout} from '../../../services/auth.service';

type AuthProviderProps = {
  children?: React.ReactNode;
};

const NetworkNotification = styled(Reanimated.View)<StyledProps>`
  background-color: ${({ styledTheme }) =>
    styledTheme.colors.transparentBackground};
  padding: 15px;
  border-radius: 15px;
  position: absolute;
  top: 0;
  z-index: 10;
  justify-content: center;
  align-self: center;
  margin: 15% 0 0 0;
  row-gap: 5px;
  pointer-events: none;
`;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const theme = useTheme();
  const [
    hasNetworkConnection,
    revalidateUser,
    setHasNetworkConnection,
    fetchStorageUser,
    setInitialized
  ] = useUserStore((state) => [
    state.hasNetworkConnection,
    state.revalidateUser,
    state.setHasNetworkConnection,
    state.fetchStorageUser,
    state.setInitialized,
  ]);
  const router = useRouter();

  useEffect(() => {
    const subscription = timer(0, 3000)
      .pipe(
        concatMap(() =>
          from(Network.getNetworkStateAsync()).pipe(
            map((network) => {
              if (!useUserStore.getState().initialized) {
                SplashScreen.hideAsync();
                setInitialized();
              }
              else if (hasNetworkConnection === network.isConnected)
                return of(false);
              setHasNetworkConnection(network.isConnected ?? false);
              if (network.isConnected) return revalidateUser();
              else return fetchStorageUser();
            }),
            concatMap((value) =>
              from(value).pipe(
                tap((value) => {
                  if (!value && !useUserStore.getState().user)
                    router.push('/first-start');
                }),
              ),
            ),
          ),
        ),
      )
      .subscribe(() => {});

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {!hasNetworkConnection && (
        <NetworkNotification
          styledTheme={theme}
          entering={SlideInUp}
          exiting={SlideOutUp}
        >
          <Text fontSize={16}>Нет доступа к интернету</Text>
          <Text fontSize={10} fontWeight={FontTypes.regular}>
            Чтобы пользоваться GPT, подключитесь к интернету
          </Text>
        </NetworkNotification>
      )}
      {children}
    </>
  );
};
