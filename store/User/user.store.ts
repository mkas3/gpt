import { create } from 'zustand';
import { ResponseUser } from '../../types/user.types';
import {
  checkAuth,
  getStorageUser,
  saveUser,
} from '../../services/auth.service';

type UserStore = {
  user?: ResponseUser;
  initialized: boolean;
  hasNetworkConnection: boolean;
  setInitialized: () => void;
  revalidateUser: () => Promise<boolean>;
  setHasNetworkConnection: (value: boolean) => void;
  setUser: (value: ResponseUser, fromStorage?: boolean) => void;
  fetchStorageUser: () => Promise<boolean>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,
  initialized: false,
  hasNetworkConnection: true,
  setInitialized: () => {
    set({ initialized: true });
  },
  revalidateUser: async () => {
    if (get().user) return false;
    const user = await checkAuth();
    if (!user?.data) return false;
    set({ user: user.data });
    return true;
  },
  setHasNetworkConnection: (value) => {
    set({ hasNetworkConnection: value });
  },
  setUser: (value, fromStorage) => {
    if (!fromStorage) saveUser(value);
    set((state) => ({ ...state, user: value }));
  },
  fetchStorageUser: async () => {
    if (get().user) return false;
    const storageUser = await getStorageUser();
    if (!storageUser) return false;
    else get().setUser(storageUser, true);
    return true;
  },
}));
