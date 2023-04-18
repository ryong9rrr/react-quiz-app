import { describe, it, expect } from "vitest";

const add = (a: number, b: number) => a + b;

describe("math test(sample)", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
