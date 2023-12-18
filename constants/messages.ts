import { FakeMessage, MessageRoles } from '../types/message.types';

export const MAX_MESSAGES_TAKE = 25;

export const MESSAGES_REFETCH_OFFSET = 200;

export const MODELS = [
  'gpt-4-1106-preview',
  'gpt-4-vision-preview',
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-0613',
  'gpt-4-32k',
  'gpt-4-32k-0314',
  'gpt-4-32k-0613',
  'gpt-3.5-turbo-1106',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-16k-0613',
];

export const SLIDER_MESSAGES: FakeMessage[] = [
  {
    text: 'Привет, я AI чат-бот 1, чем могу помочь',
    messageRole: MessageRoles.ASSISTANT,
  },
  {
    text: 'Что такое GPT 1',
    messageRole: MessageRoles.USER,
  },
  {
    text: 'Привет, я AI чат-бот 2, чем могу помочь',
    messageRole: MessageRoles.ASSISTANT,
  },
  {
    text: 'Что такое GPT 2',
    messageRole: MessageRoles.USER,
  },
  {
    text: 'Привет, я AI чат-бот 3, чем могу помочь',
    messageRole: MessageRoles.ASSISTANT,
  },
  {
    text: 'Что такое GPT 3',
    messageRole: MessageRoles.USER,
  },
];
