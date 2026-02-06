import { diceService } from "../../src/services/diceService";

describe("diceService advantage/disadvantage", () => {
  it("selects higher total for advantage", () => {
    const result = diceService.evaluate("1d20+5", "advantage");
    const totals = result.rollSets.map((roll) => roll.total);
    const max = Math.max(...totals);
    expect(result.total).toBe(max);
  });

  it("selects lower total for disadvantage", () => {
    const result = diceService.evaluate("1d20+5", "disadvantage");
    const totals = result.rollSets.map((roll) => roll.total);
    const min = Math.min(...totals);
    expect(result.total).toBe(min);
  });
});
