// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import "./polyfills/compression";

if (!Bun.env.DATABASE_URL) throw new Error("DATABASE_URL is not defined");
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: Bun.env.DATABASE_URL,
  },
});
