import React, { useEffect } from 'react';
import { useUserStore } from '../../../store/User/user.store';
import { useMessagesStore } from '../../../store/Messages/messages.store';

type MessagesProviderProps = {
  children?: React.ReactNode;
};

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const hasNetworkConnection = useUserStore(
    (state) => state.hasNetworkConnection,
  );

  const [onAddMessage, fetchStorageMessages, fetchMessages, saveMessages] =
    useMessagesStore((state) => [
      state.onAddMessage,
      state.fetchStorageMessages,
      state.fetchMessages,
      state.saveMessages,
    ]);

  useEffect(() => {
    fetchStorageMessages();
    if (hasNetworkConnection) fetchMessages();
    const subsription = onAddMessage.subscribe({
      next: (value) => {
        if (useUserStore.getState().hasNetworkConnection) saveMessages();
      },
    });

    return () => {
      subsription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
