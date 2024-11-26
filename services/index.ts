import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {config} from 'rxjs';

export const TOKEN_KEY = 'token';

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const authInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const authInterceptor = async (config: any) => {
  config.headers.authorization = `Bearer ${await SecureStore.getItemAsync(
    TOKEN_KEY,
  )}`;
  return config;
};

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  Promise.reject(error);
  return undefined;
})

authInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  Promise.reject(error);
  return undefined;
})

authInstance.interceptors.request.use(authInterceptor);
