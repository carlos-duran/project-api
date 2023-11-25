import { serve } from "@hono/node-server";
import "dotenv/config";
import app from "./app";

const port = 6667;

serve(
	{
		fetch: app.fetch,
		port,
	},
	() => {
		console.log(`Servidor iniciado en ${port}`);
	},
);
