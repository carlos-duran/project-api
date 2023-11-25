import { z } from "zod"

const envSchema = z.object({
  JWT_SECRET: z.string(),
  MONGO_URI: z.string(),
  MONGO_DBNAME: z.string(),
})

export const env = envSchema.parse(process.env)
