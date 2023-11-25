import { CreateUser } from "./user";

export const LoginUser = CreateUser.pick({ email: true, password: true });
