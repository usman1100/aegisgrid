import express from "express";
import cors from "cors";
import * as middleware from "./middleware";
import { clerkMiddleware } from "@clerk/express";
import { databaseClient } from "./db/client";
import { events } from "./db/schema";
const PORT = Bun.env?.PORT || 8000;

const app = express();

import eventsRouter from "./routes/events";

app.use(cors({ origin: "*" }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(middleware.authenticate);

app.use("/events", eventsRouter);

app.listen(PORT, async () => {
  await databaseClient.execute("SELECT 1");
  console.log("Database connection has been established successfully.");
  console.log(`Server is running on port http://localhost:${PORT}`);
});
