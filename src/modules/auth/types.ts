export type JWTPayload = {
	id: string;
	role: string;
	iat: number;
	exp: number;
};
