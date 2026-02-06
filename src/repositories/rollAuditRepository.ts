import { prisma } from "../lib/prisma";

export type RollAuditCreate = {
  expression: string;
  mode: string;
  rollSets: unknown;
  selectedIndex: number;
  total: number;
};

export const rollAuditRepository = {
  create: async (data: RollAuditCreate) => prisma.rollAudit.create({ data }),
};
