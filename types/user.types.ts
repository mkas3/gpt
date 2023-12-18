export type RequestUser = {
	email: string;
	password: string;
	name?: string;
}

export type ResponseUser = Omit<RequestUser, 'password'> & {
	token: string;
	tokens: number;
}

export type User = ResponseUser;