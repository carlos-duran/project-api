import { MongoClient } from "mongodb";
import { env } from "../constants/env";

const client = new MongoClient(env.MONGO_URI);

export const db = client.db(env.MONGO_DBNAME);
