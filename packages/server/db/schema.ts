import { pgTable, uuid, text, timestamp, geometry } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: geometry("location", {
    type: "point",
    mode: "xy",
    srid: 4326,
  }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
