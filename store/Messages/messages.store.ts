import { create } from 'zustand';
import {
  Message,
  MessageRoles,
  RequestMessage,
} from '../../types/message.types';
import {
  createFirstMessage,
  createMessage,
  deleteAllMessages,
  findAllMessages,
  getAnswer,
} from '../../services/message.service';
import { concatMap, delay, from, of, Subject } from 'rxjs';
import * as FileSystem from 'expo-file-system';
import { useUserStore } from '../User/user.store';

export type MessagesStore = {
  messages: Message[];
  onAddMessage: Subject<MessageRoles>;
  addMessage: (message: RequestMessage) => Promise<void>;
  addFirstMessage: () => Promise<void>;
  getAnswer: () => Promise<void>;

  generating: boolean;
  addTempMessage: (text: string, role?: MessageRoles) => void;

  fetchMessages: () => Promise<void>;
  fetchStorageMessages: () => Promise<void>;

  saveMessages: () => Promise<void>;

  deleteAllMessages: () => Promise<void>;
};

const messagesFile = FileSystem.cacheDirectory + 'messages.json';

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  onAddMessage: new Subject<MessageRoles>(),
  addMessage: async (message) => {
    get().addTempMessage(message.text);
    if (useUserStore.getState().hasNetworkConnection)
      await createMessage(message);
    await get().fetchMessages();
  },
  addFirstMessage: async () => {
    if (!useUserStore.getState().hasNetworkConnection) {
      get().addTempMessage(
        'Извините, чтобы использовать GPT, нужен доступ к интернету',
        MessageRoles.ASSISTANT,
      );
      return;
    }
    await createFirstMessage();
    const newData = await findAllMessages();
    if (newData?.data && newData.data.length !== 0)
      set({ messages: newData.data });
  },
  getAnswer: async () => {
    get().addTempMessage('', MessageRoles.ASSISTANT);
    set({ generating: true });
    get().onAddMessage.next(MessageRoles.ASSISTANT);
    const answer = !useUserStore.getState().hasNetworkConnection
      ? from('Извините, чтобы использовать GPT, нужен доступ к интернету').pipe(
          concatMap((value) => of(value).pipe(delay(1))),
        )
      : await getAnswer();
    const messages = get().messages;
    const slicedMessage = messages.filter(
      (_, index) => index !== messages.length - 1,
    );
    const lastMessage = messages[messages.length - 1];

    answer.subscribe({
      next: (value) => {
        lastMessage.text += value;
        set({ messages: [...slicedMessage, lastMessage] });
      },
      complete: async () => {
        await get().fetchMessages();
        set({ generating: false });
      },
    });
  },

  generating: false,
  addTempMessage: (text, role = MessageRoles.USER) => {
    get().onAddMessage.next(role);
    set((state) => ({
      messages: [
        ...state.messages,
        {
          text,
          id: -1,
          messageRole: role,
          updatedAt: new Date(Date.now()).toString(),
        },
      ],
    }));
  },

  fetchMessages: async () => {
    if (useUserStore.getState().hasNetworkConnection) {
      const data = await findAllMessages();
      if (data?.data && data.data.length !== 0) set({ messages: data.data });
      else await get().addFirstMessage();
    }
    get().onAddMessage.next(MessageRoles.SYSTEM);
  },

  fetchStorageMessages: async () => {
    if (get().messages.length > 0) return;
    const fileInfo = await FileSystem.getInfoAsync(messagesFile);
    if (!fileInfo.exists) return;
    const messages = await FileSystem.readAsStringAsync(messagesFile);
    if (!messages) return;
    set({ messages: JSON.parse(messages) });
    get().onAddMessage.next(MessageRoles.SYSTEM);
  },

  saveMessages: async () => {
    if (get().messages.length === 0) return;
    await FileSystem.writeAsStringAsync(
      messagesFile,
      JSON.stringify(get().messages),
    );
  },

  deleteAllMessages: async () => {
    await deleteAllMessages();
    await get().fetchMessages();
  },
}));
