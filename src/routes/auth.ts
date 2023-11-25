import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { LoginUser } from "../schemas/validators/auth";
import { getUserByEmail } from "../services/users";
import { HTTPException } from "hono/http-exception";
import { compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { JWTPayload } from "../types/auth";
import { env } from "../constants/env";

export const auth = new Hono();

auth.post("/login", zValidator("json", LoginUser), async (c) => {
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
	};

	const token = await sign(payload, env.JWT_SECRET);

	return c.json({ token });
});