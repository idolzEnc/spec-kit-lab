import { randomInt } from "crypto";

export const secureRandomInt = (minInclusive: number, maxInclusive: number) => {
  if (minInclusive > maxInclusive) {
    throw new Error("Invalid random range");
  }
  return randomInt(minInclusive, maxInclusive + 1);
};
