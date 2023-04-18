import { describe, it, expect } from "vitest";
import { add } from "@/math";

describe("math test(sample)", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
