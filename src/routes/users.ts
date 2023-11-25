import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { jwt } from "hono/jwt";
import { z } from "zod";
import { env } from "../constants/env";
import { ObjectIdSchema } from "../schemas/validators/object-id";
import {
	CreateUser,
	PatchUser,
	ResponseUser,
} from "../schemas/validators/user";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../services/users";
import { JWTPayload } from "../types/auth";

export const users = new Hono();

users.use("*", jwt({ secret: env.JWT_SECRET }));

users.use("*", async (c, next) => {
	const payload = c.var.jwtPayload as JWTPayload;
	if (payload.role !== "admin") {
		throw new HTTPException(403, { message: "Acceso denegado" });
	}
	return next();
});

users.get("/", async (c) => {
	const users = await getUsers();
	return c.json(ResponseUser.array().parse(users));
});

users.get(
	"/:id",
	zValidator("param", z.object({ id: ObjectIdSchema })),
	async (c) => {
		const user = await getUser(c.req.param("id"));
		if (!user) return c.notFound();
		return c.json(ResponseUser.parse(user));
	},
);

users.post("/", zValidator("json", CreateUser), async (c) => {
	const body = await c.req.json();
	const result = await createUser(body);
	if (result.acknowledged) c.status(201);
	return c.json(result);
});

users.patch(
	"/:id",
	zValidator("param", z.object({ id: ObjectIdSchema })),
	zValidator("json", PatchUser),
	async (c) => {
		const body = await c.req.json();
		const result = await updateUser(c.req.param("id"), body);
		return c.json(result);
	},
);

users.delete(
	"/:id",
	zValidator("param", z.object({ id: ObjectIdSchema })),
	async (c) => {
		const result = await deleteUser(c.req.param("id"));
		return c.json(result);
	},
);
