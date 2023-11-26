import { env } from "@/constants/env";
import { getUserByEmail } from "@/modules/users/service";
import { zValidator } from "@hono/zod-validator";
import { compare } from "bcryptjs";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { LoginUserDto } from "./dto";
import { JWTPayload } from "./types";

export const auth = new Hono();

auth.post("/login", zValidator("json", LoginUserDto), async (c) => {
	const loginUser = c.req.valid("json");

	const user = await getUserByEmail(loginUser.email);
	if (!user) {
		throw new HTTPException(401, { message: "Usuario no existe" });
	}

	if (!(await compare(loginUser.password, user.password))) {
		throw new HTTPException(401, { message: "Contraseña incorrecta" });
	}

	const payload: JWTPayload = {
		id: user._id.toString(),
		role: user.role,
		iat: Math.ceil(Date.now() / 1000),
		exp: Math.ceil(Date.now() / 1000) + 60 * 60,
	};

	const token = await sign(payload, env.JWT_SECRET);

	return c.json({ token });
});
