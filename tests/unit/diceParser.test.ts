import { parseExpression } from "../../src/services/diceService/parser";
import { ValidationError } from "../../src/lib/errors";

describe("parseExpression", () => {
  it("parses simple dice terms", () => {
    const terms = parseExpression("2d6");
    expect(terms).toHaveLength(1);
    expect(terms[0]).toMatchObject({ kind: "dice", count: 2, sides: 6 });
  });

  it("parses additive expressions", () => {
    const terms = parseExpression("2d6+1d4+3");
    expect(terms).toHaveLength(3);
  });

  it("rejects invalid syntax", () => {
    expect(() => parseExpression("2dd6")).toThrow(ValidationError);
  });

  it("rejects empty expression", () => {
    expect(() => parseExpression("  ")).toThrow(ValidationError);
  });
});
