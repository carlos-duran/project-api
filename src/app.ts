import { Hono } from "hono";
import { auth } from "./routes/auth";
import { users } from "./routes/users";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello world!" }));

app.route("/users", users);
app.route("/auth", auth);

export default app;
