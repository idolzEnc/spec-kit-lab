import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export type Logger = {
  info: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
};

export const logger: Logger = {
  info: (message, meta) => {
    console.log(JSON.stringify({ level: "info", message, ...meta }));
  },
  error: (message, meta) => {
    console.error(JSON.stringify({ level: "error", message, ...meta }));
  },
};

export const requestCorrelation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId =
    (req.headers["x-correlation-id"] as string) || randomUUID();
  req.headers["x-correlation-id"] = correlationId;
  res.setHeader("x-correlation-id", correlationId);
  next();
};
