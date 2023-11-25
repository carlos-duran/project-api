import { z } from "zod";
import { UserEntity } from "../entities/user";

export const CreateUser = UserEntity.omit({ _id: true }).extend({
  password: z.string().max(100),
});

export type CreateUser = z.infer<typeof CreateUser>;

export const PatchUser = CreateUser.partial();

export type PatchUser = z.infer<typeof PatchUser>;

export const ResponseUser = UserEntity.omit({ password: true });

export type ResponseUser = z.infer<typeof ResponseUser>;
