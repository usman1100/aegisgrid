import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
