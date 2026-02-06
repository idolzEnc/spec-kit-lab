import { secureRandomInt } from "../../lib/random";
import type { DiceTerm } from "./parser";

export type RollTerm = {
  term: string;
  rolls: number[];
  termTotal: number;
};

export type RollSet = {
  terms: RollTerm[];
  total: number;
};

export const rollTerms = (terms: DiceTerm[]): RollSet => {
  const rollTerms: RollTerm[] = terms.map((term) => {
    if (term.kind === "const") {
      return {
        term: term.raw,
        rolls: [],
        termTotal: term.sign * term.value,
      };
    }

    const rolls = Array.from({ length: term.count }, () =>
      secureRandomInt(1, term.sides),
    );
    const rawTotal = rolls.reduce((sum, value) => sum + value, 0);

    return {
      term: term.raw,
      rolls,
      termTotal: term.sign * rawTotal,
    };
  });

  const total = rollTerms.reduce((sum, term) => sum + term.termTotal, 0);

  return { terms: rollTerms, total };
};
