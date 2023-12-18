import { useUserStore } from '../../store/User/user.store';

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  if (!user) throw new Error();
  return user;
};
