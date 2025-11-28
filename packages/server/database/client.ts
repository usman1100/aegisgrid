import { drizzle } from "drizzle-orm/node-postgres";

const DATABASE_URL = Bun.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");
export const databaseClient = drizzle(DATABASE_URL);
