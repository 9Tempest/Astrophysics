import { describe, expect, it } from "vitest";
import {
  cartesianToPolar,
  dot2,
  norm2,
  normalize2,
  polarToCartesian
} from "../../physics/vector";

describe("vector helpers", () => {
  it("computes dot products and Euclidean norms", () => {
    expect(dot2({ x: 3, y: 4 }, { x: 2, y: -1 })).toBe(2);
    expect(norm2({ x: 3, y: 4 })).toBe(5);
  });

  it("normalizes nonzero vectors", () => {
    const normalized = normalize2({ x: 3, y: 4 });

    expect(norm2(normalized)).toBeCloseTo(1, 12);
  });

  it("round-trips Cartesian and polar coordinates", () => {
    const original = { x: -2, y: 5 };
    const polar = cartesianToPolar(original);
    const roundTrip = polarToCartesian(polar);

    expect(roundTrip.x).toBeCloseTo(original.x, 12);
    expect(roundTrip.y).toBeCloseTo(original.y, 12);
  });

  it("rejects zero-vector normalization", () => {
    expect(() => normalize2({ x: 0, y: 0 })).toThrow(RangeError);
  });
});
