export enum MessageRoles {
	USER = 'user',
	SYSTEM = 'system',
	ASSISTANT = 'assistant'
}

export type RequestMessage = {
	text: string;
}

export type ResponseMessage = RequestMessage & {
	id: number;
	updatedAt: string;
	messageRole: MessageRoles;
}

export type Message = ResponseMessage;

export type FakeMessage = Omit<Message, 'id' | 'updatedAt'>;
