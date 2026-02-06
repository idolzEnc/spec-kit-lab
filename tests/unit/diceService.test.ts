import { diceService } from "../../src/services/diceService";

describe("diceService", () => {
  it("evaluates totals within expected range", () => {
    const result = diceService.evaluate("1d20+5");
    expect(result.total).toBeGreaterThanOrEqual(6);
    expect(result.total).toBeLessThanOrEqual(25);
  });

  it("returns roll sets and selected total", () => {
    const result = diceService.evaluate("1d20+5", "advantage");
    expect(result.rollSets).toHaveLength(2);
    expect(result.selectedIndex).toBeGreaterThanOrEqual(0);
  });
});
