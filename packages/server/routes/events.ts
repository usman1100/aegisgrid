import { Router } from "express";
import { eq } from "drizzle-orm";
import { databaseClient } from "../db/client";
import { events } from "../db/schema";

const router = Router();

// GET /events - List all events
router.get("/", async (req, res) => {
  try {
    const allEvents = await databaseClient.select().from(events);
    res.json({ events: allEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST /events - Create a new event
router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;

    const result = await databaseClient
      .insert(events)
      .values({
        name,
        location,
      })
      .returning();

    const event = result.at(0);
    res.status(201).json({ event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// GET /events/:id - Get a single event
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await databaseClient
      .select()
      .from(events)
      .where(eq(events.id, id));

    const event = result.at(0);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// PUT /events/:id - Update an event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const result = await databaseClient
      .update(events)
      .set({ name, updated_at: new Date() })
      .where(eq(events.id, id))
      .returning();

    const event = result.at(0);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE /events/:id - Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await databaseClient
      .delete(events)
      .where(eq(events.id, id))
      .returning();

    const event = result.at(0);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully", event });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
