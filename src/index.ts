import { serve } from "@hono/node-server";
import "dotenv/config";
import app from "./app";
import { env } from "./constants/env";

const port = +env.PORT || 6667;

serve(
	{
		fetch: app.fetch,
		port,
	},
	() => {
		console.log(`Servidor iniciado en ${port}`);
	},
);
