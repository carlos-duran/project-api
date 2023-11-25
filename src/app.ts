import { Hono } from "hono";
import { users } from "./routes/users";
import { auth } from "./routes/auth";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello world!" }));

app.route("/users", users);
app.route("/auth", auth);

export default app;
