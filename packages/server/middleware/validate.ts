import type { NextFunction, Request, Response } from "express";
import type z from "zod";

export const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: z.ZodSchema
) => {
  try {
    const validatedBody = schema.parse(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid request body" });
  }
};
