import { describe, expect, it } from "vitest";
import {
  cartesianToPolar,
  angleBetween2,
  dot2,
  norm2,
  normalize2,
  polarToCartesian,
  rotate2
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

  it("normalizes angles to [0, 2π) through Cartesian/polar conversion", () => {
    const roundTrip = polarToCartesian({
      r: 3,
      thetaRadians: -Math.PI / 2
    });

    expect(roundTrip.x).toBeCloseTo(0, 12);
    expect(roundTrip.y).toBeCloseTo(-3, 12);
  });

  it("rotation preserves Euclidean norm", () => {
    const original = { x: 7, y: -4 };
    const rotated = rotate2(original, Math.PI / 3);

    expect(norm2(rotated)).toBeCloseTo(norm2(original), 12);
  });

  it("measures a right angle between perpendicular vectors", () => {
    expect(angleBetween2({ x: 1, y: 0 }, { x: 0, y: 4 })).toBeCloseTo(
      Math.PI / 2,
      12
    );
  });

  it("rejects zero-vector normalization", () => {
    expect(() => normalize2({ x: 0, y: 0 })).toThrow(RangeError);
  });
});
