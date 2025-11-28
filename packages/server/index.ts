import express from "express";
import cors from "cors";
import * as middleware from "./middleware";
import { clerkMiddleware } from "@clerk/express";
import { databaseClient } from "./database/client";
const PORT = Bun.env?.PORT || 8000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(clerkMiddleware());
app.use(middleware.authenticate);

app.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, async () => {
  await databaseClient.execute("SELECT 1");
  console.log("Database connection has been established successfully.");
  console.log(`Server is running on port http://localhost:${PORT}`);
});
