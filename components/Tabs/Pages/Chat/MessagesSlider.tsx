import { Message } from './Message';
import { FakeMessage, MessageRoles } from '../../../../types/message.types';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { ShadowLinearGradient } from '../../../Gradient/ShadowLinearGradient';
import { useMessagesSliderStore } from '../../../../store/Messages/messages-slider.store';
import {
  concatMap,
  concatWith,
  finalize,
  from,
  iif,
  map,
  of,
  repeat, Subscription,
  switchAll,
  switchMap,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { StyledProps } from '../../../../types/theme.types';
import { useTheme } from '../../../../hooks/Theme/useTheme';
import { usePathname, useRouter } from 'expo-router';

const MessagesView = styled(View)`
  height: 45%;
`;

const Header = styled(View)<StyledProps>`
  background-color: ${({ styledTheme }) => styledTheme.colors.background};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25%;
  z-index: 5;
`;

const ShadowGradient = styled(ShadowLinearGradient)`
  position: absolute;
  height: 25%;
  bottom: 50%;
  width: 100%;
  z-index: 5;
`;

const SliderView = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px 0 20px;
  height: fit-content;
  flex-direction: column;
  row-gap: 12px;
`;

export const MessagesSlider = () => {
  const theme = useTheme();
  const [messages, currentMessageIndex, getNextMessage] =
    useMessagesSliderStore((state) => [
      state.messages,
      state.currentMessageIndex,
      state.getNextMessage,
    ]);
  const [currentMessages, setCurrentMessages] = useState<FakeMessage[]>([]);

  useEffect(() => {
    const subscription = from(messages)
      .pipe(
        concatMap((message) =>
          timer(1000).pipe(
            tap(() => {
              setCurrentMessages((prev) =>
                prev.length === messages.length ? prev.slice(1) : prev,
              );
            }),
            concatWith(
              timer(1000).pipe(
                tap(() => {
                  setCurrentMessages((prev) => [
                    ...prev,
                    {
                      text: '',
                      messageRole: message.messageRole,
                    },
                  ]);
                }),
                concatMap(() =>
                  from(message.text).pipe(
                    concatMap((value) =>
                      iif(
                        () =>
                          Math.random() < 0.7 ||
                          message.messageRole === MessageRoles.USER,
                        of(value),
                        timer(90).pipe(map(() => value)),
                      ),
                    ),
                  ),
                ),
                tap((value) => {
                  setCurrentMessages((prev) => [
                    ...prev.filter((_, index) => index !== prev.length - 1),
                    {
                      text: prev[prev.length - 1].text + value,
                      messageRole: prev[prev.length - 1].messageRole,
                    },
                  ]);
                }),
              ),
            ),
          ),
        ),
        repeat(),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MessagesView>
      <Header styledTheme={theme} />
      <ShadowGradient />
      {currentMessages.length > 0 && (
        <SliderView>
          {currentMessages.map((el, index) => (
            <Message
              key={index}
              owner={el.messageRole}
              date={new Date().toString()}
              prevDate={new Date().toString()}
              entering={
                el.messageRole === MessageRoles.ASSISTANT
                  ? SlideInLeft
                  : SlideInRight
              }
              timeHidden
            >
              {el.text}
            </Message>
          ))}
        </SliderView>
      )}
    </MessagesView>
  );
};
