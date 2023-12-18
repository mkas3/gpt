import * as SecureStore from 'expo-secure-store';
import { authInstance, instance, TOKEN_KEY } from './index';
import { RequestUser, ResponseUser } from '../types/user.types';
import * as FileSystem from 'expo-file-system';
import { MessageRoles } from '../types/message.types';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure();

const userFile = FileSystem.cacheDirectory + 'user.json';

export const googleLogin = async () => {
  // const userInfo = await GoogleSignin.signIn();
};

export const register = async (data: RequestUser) => {
  const response = await instance.post<ResponseUser>('user', data);

  if (response.data && response.data.token)
    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

  return response;
};

export const login = async (data: RequestUser) => {
  const response = await instance.post<ResponseUser>('auth/login', data);

  if (response.data && response.data.token)
    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

  return response;
};

export const checkAuth = async () => {
  const response = await authInstance.get<ResponseUser>('auth');

  if (response.data && response.data.token)
    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

  return response;
};

export const getStorageUser = async () => {
  const fileInfo = await FileSystem.getInfoAsync(userFile);
  if (!fileInfo.exists) return;
  const user = await FileSystem.readAsStringAsync(userFile);
  if (!user) return;
  return JSON.parse(user);
};

export const saveUser = async (user: ResponseUser) => {
  await FileSystem.writeAsStringAsync(userFile, JSON.stringify(user));
};
