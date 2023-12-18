import { useMessagesStore } from '../../store/Messages/messages.store';

export const useMessages = () => {
  return useMessagesStore((state) => ({
    messages: state.messages,
    generating: state.generating,
    onAddMessage: state.onAddMessage,
    addMessage: state.addMessage,
    getAnswer: state.getAnswer,
    fetchMessages: state.fetchMessages,
    deleteAllMessages: state.deleteAllMessages,
  }));
};
