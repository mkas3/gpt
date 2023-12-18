import { authInstance, instance, TOKEN_KEY } from './index';
import { Message, RequestMessage } from '../types/message.types';
import EventSource from 'react-native-sse';
import * as SecureStore from 'expo-secure-store';
import { Subject, delay, concatMap, from } from 'rxjs';
import {useUserSettingsStore} from '../store/User/user-settings.store';

export const createMessage = (data: RequestMessage) => {
  return authInstance.post('message', data);
};

export const findAllMessages = () => {
  return authInstance.get<Message[]>(`message`);
};

export const editMessage = (id: number, data: RequestMessage) => {
  return authInstance.patch(`message/${id}`, data);
};

export const deleteAllMessages = () => {
  return authInstance.delete('message');
};

export const createFirstMessage = () => {
  return authInstance.post('message/first');
};

export const getCount = () => {
  return authInstance.get<number>('message/count');
};

export const getAnswer = async () => {
  const { model } = useUserSettingsStore.getState().settings;
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const url = instance.defaults.baseURL + `/message/answer?model=${model}`;
  const eventSource = new EventSource<string>(url, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = new Subject<string>();

  eventSource.addEventListener('message', (e) => {
    if (e.data) {
      const parsed = JSON.parse(e.data);
      if (!parsed.complete) result.next(parsed.content);
      else {
        result.complete();
        eventSource.close();
      }
    }
  });

  return result.pipe(concatMap((value) => from([value]).pipe(delay(1))));
};
