import { create } from 'zustand';
import { ResponseUser } from '../../types/user.types';
import { checkAuth, saveUser } from '../../services/auth.service';

type UserStore = {
  user?: ResponseUser;
  hasNetworkConnection: boolean;
  revalidateUser: () => Promise<boolean>;
  setHasNetworkConnection: (value: boolean) => void;
  setUser: (value: ResponseUser, fromStorage?: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  hasNetworkConnection: true,
  revalidateUser: async () => {
    const user = await checkAuth();
    if (!user.data) return false;
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
}));
