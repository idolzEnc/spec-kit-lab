import { z } from "zod";

export const rollRequestSchema = z.object({
  expression: z.string().min(1, "Expression is required"),
  mode: z
    .enum(["normal", "advantage", "disadvantage"])
    .optional()
    .default("normal"),
});

export type RollRequest = z.infer<typeof rollRequestSchema>;
