import { ValidationError } from "../../lib/errors";

export type DiceTerm =
  | { kind: "dice"; sign: 1 | -1; count: number; sides: number; raw: string }
  | { kind: "const"; sign: 1 | -1; value: number; raw: string };

const expressionPattern = /^[+-]?(?:\d+d\d+|\d+)(?:[+-](?:\d+d\d+|\d+))*$/;
const tokenPattern = /[+-]?(?:\d+d\d+|\d+)/g;
const termPattern = /^([+-]?)(\d+)(?:d(\d+))?$/;

export const parseExpression = (input: string) => {
  const expression = input.replace(/\s+/g, "");
  if (!expression) {
    throw new ValidationError("Invalid dice expression", {
      field: "expression",
      reason: "Expression is empty",
    });
  }

  if (!expressionPattern.test(expression)) {
    throw new ValidationError("Invalid dice expression", {
      field: "expression",
      reason: "Syntax does not match NdM format",
    });
  }

  const matches = expression.match(tokenPattern);
  if (!matches || matches.join("") !== expression) {
    throw new ValidationError("Invalid dice expression", {
      field: "expression",
      reason: "Unsupported token format",
    });
  }

  if (matches.length > 20) {
    throw new ValidationError("Too many terms", { field: "expression" });
  }

  const terms: DiceTerm[] = [];
  let totalDice = 0;

  for (const token of matches) {
    const parsed = token.match(termPattern);
    if (!parsed) {
      throw new ValidationError("Invalid term", { field: "expression" });
    }

    const sign: 1 | -1 = parsed[1] === "-" ? -1 : 1;
    const first = Number(parsed[2]);
    const sides = parsed[3] ? Number(parsed[3]) : null;

    if (!Number.isSafeInteger(first)) {
      throw new ValidationError("Invalid number", { field: "expression" });
    }

    if (sides === null) {
      terms.push({ kind: "const", sign, value: first, raw: token });
      continue;
    }

    if (!Number.isSafeInteger(sides) || first < 1 || sides < 1) {
      throw new ValidationError("Invalid dice term", { field: "expression" });
    }

    if (sides > 1000) {
      throw new ValidationError("Dice sides exceed limit", {
        field: "expression",
      });
    }

    totalDice += first;
    if (totalDice > 100) {
      throw new ValidationError("Dice count exceeds limit", {
        field: "expression",
      });
    }

    terms.push({ kind: "dice", sign, count: first, sides, raw: token });
  }

  return terms;
};
