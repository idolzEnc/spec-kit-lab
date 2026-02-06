import type { Request, Response, NextFunction } from "express";
import { rollRequestSchema } from "../validators/rollRequestSchema";
import { diceService } from "../services/diceService";
import { ValidationError } from "../lib/errors";
import { logger } from "../lib/logger";

export const createRoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = rollRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError("Invalid request payload", {
        field: "expression",
        reason: parsed.error.flatten(),
      });
    }

    const result = diceService.evaluate(
      parsed.data.expression,
      parsed.data.mode,
    );
    logger.info("roll_created", {
      expression: parsed.data.expression,
      mode: parsed.data.mode,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
