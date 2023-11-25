import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserEntity = z.object({
	_id: z.instanceof(ObjectId),
	email: z.string().email(),
	password: z.string(),
	firstName: z.string().max(50),
	lastName: z.string().max(50),
	role: z.enum(["admin", "user"]),
});

export type UserEntity = z.infer<typeof UserEntity>;
