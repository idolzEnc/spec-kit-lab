import { Router } from "express";
import { createRoll } from "../controllers/rollController";
import { rollRateLimiter } from "../lib/rateLimit";

export const rollRoutes = Router();

rollRoutes.post("/rolls", rollRateLimiter, createRoll);
