import * as z from "zod";

// Base location schema (reusable)
export const locationSchema = z.object({
  x: z.number().min(-180).max(180), // longitude
  y: z.number().min(-90).max(90), // latitude
});

// General event schema - works for both frontend and backend
export const eventSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  location: locationSchema,
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
});

// Schema for creating a new event (omit auto-generated fields)
export const createEventSchema = eventSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating an event (all fields optional)
export const updateEventSchema = createEventSchema.partial();

// Type exports
export type Event = z.infer<typeof eventSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type Location = z.infer<typeof locationSchema>;
