import rateLimit from "express-rate-limit";
import type { Request, Response } from "express";

export const rollRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      errorCode: "RATE_LIMITED",
      message: "Too many requests",
    });
  },
});
