import { Hono } from "hono";
import { auth } from "./modules/auth/router";
import { users } from "./modules/users/router";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello world!" }));

app.route("/users", users);
app.route("/auth", auth);

export default app;
