import { instance, TOKEN_KEY } from './index';
import * as SecureStore from 'expo-secure-store';
import {RequestUser, ResponseUser} from '../types/user.types';

export const updateUser = async (data: Partial<RequestUser>) => {
  const response = await instance.patch<ResponseUser>('user', data);

  if (response.data && response.data.token)
    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

  return response;
};
