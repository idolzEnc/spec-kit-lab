import { parseExpression } from "./parser";
import { rollTerms } from "./roller";

export type RollMode = "normal" | "advantage" | "disadvantage";

export type RollResult = {
  expression: string;
  mode: RollMode;
  rollSets: Array<{
    terms: { term: string; rolls: number[]; termTotal: number }[];
    total: number;
  }>;
  selectedIndex: number;
  total: number;
};

const selectIndex = (mode: RollMode, totals: number[]) => {
  if (totals.length === 1) {
    return 0;
  }

  if (mode === "advantage") {
    return totals[0] >= totals[1] ? 0 : 1;
  }

  if (mode === "disadvantage") {
    return totals[0] <= totals[1] ? 0 : 1;
  }

  return 0;
};

export const diceService = {
  evaluate: (expression: string, mode: RollMode = "normal"): RollResult => {
    const terms = parseExpression(expression);
    const rollCount = mode === "normal" ? 1 : 2;

    const rollSets = Array.from({ length: rollCount }, () => rollTerms(terms));
    const totals = rollSets.map((roll) => roll.total);
    const selectedIndex = selectIndex(mode, totals);

    return {
      expression,
      mode,
      rollSets,
      selectedIndex,
      total: totals[selectedIndex],
    };
  },
};
