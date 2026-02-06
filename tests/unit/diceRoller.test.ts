import { rollTerms } from "../../src/services/diceService/roller";

describe("rollTerms", () => {
  it("returns totals within bounds", () => {
    const roll = rollTerms([
      { kind: "dice", sign: 1, count: 2, sides: 6, raw: "2d6" },
    ]);
    expect(roll.total).toBeGreaterThanOrEqual(2);
    expect(roll.total).toBeLessThanOrEqual(12);
  });

  it("applies constant modifiers", () => {
    const roll = rollTerms([
      { kind: "dice", sign: 1, count: 1, sides: 6, raw: "1d6" },
      { kind: "const", sign: -1, value: 2, raw: "-2" },
    ]);
    expect(roll.terms[1].termTotal).toBe(-2);
  });
});
