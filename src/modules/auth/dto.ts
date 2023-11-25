import { CreateUser } from "@/modules/users/dto";

export const LoginUserDto = CreateUser.pick({ email: true, password: true });
