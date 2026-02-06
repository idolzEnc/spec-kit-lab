import { diceService } from "../../src/services/diceService";

describe("diceService roll details", () => {
  it("returns roll details per term", () => {
    const result = diceService.evaluate("2d6+1d4+3");
    expect(result.rollSets[0].terms).toHaveLength(3);
    expect(result.rollSets[0].terms[0].rolls).toHaveLength(2);
    expect(result.rollSets[0].terms[2].rolls).toHaveLength(0);
  });
});
