import { z } from "zod";

export const ObjectIdSchema = z
	.string()
	.regex(/[0-9a-f]{24}/, "Debe ser un id válido");
