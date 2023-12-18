import { create } from 'zustand';
import { FakeMessage, Message, MessageRoles } from '../../types/message.types';
import { SLIDER_MESSAGES } from '../../constants/messages';

type MessagesSliderStore = {
  messages: FakeMessage[];
  maxMessages: number;
  currentMessageIndex: number;
  getNextMessage: () => void;
};

export const useMessagesSliderStore = create<MessagesSliderStore>(
  (set, get) => ({
    messages: SLIDER_MESSAGES,
    maxMessages: SLIDER_MESSAGES.length,
    currentMessageIndex: 0,
    getNextMessage: () => {
      const newValue = get().currentMessageIndex + 1;
      if (newValue < get().maxMessages) set({ currentMessageIndex: newValue });
      else set({ currentMessageIndex: 0 });
    },
  }),
);
