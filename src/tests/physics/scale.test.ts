import { describe, expect, it } from "vitest";
import {
  LOG_SCALE_MAX_EXPONENT,
  LOG_SCALE_MIN_EXPONENT,
  exponentDifference,
  logScalePositionToMeters,
  metersFromLog10Exponent,
  metersToLogScalePosition
} from "../../physics/scale";

describe("log-scale mapping", () => {
  it("maps slider positions monotonically to meters", () => {
    const positions = [0, 0.1, 0.5, 0.75, 1];
    const meters = positions.map((position) => logScalePositionToMeters(position));

    for (let index = 1; index < meters.length; index += 1) {
      expect(meters[index]).toBeGreaterThan(meters[index - 1]);
    }
  });

  it("round-trips length values through normalized log positions", () => {
    const exponents = [
      LOG_SCALE_MIN_EXPONENT,
      -10,
      0,
      11.17,
      16.49,
      LOG_SCALE_MAX_EXPONENT
    ];

    for (const exponent of exponents) {
      const meters = metersFromLog10Exponent(exponent);
      const position = metersToLogScalePosition(meters);
      const roundTripMeters = logScalePositionToMeters(position);

      expect(Math.abs(Math.log10(roundTripMeters) - exponent)).toBeLessThan(1e-12);
    }
  });

  it("computes order-of-magnitude gaps", () => {
    expect(exponentDifference(1e3, 1)).toBe(3);
    expect(exponentDifference(1, 1e2)).toBe(-2);
  });

  it("rejects invalid logarithmic domains", () => {
    expect(() => metersToLogScalePosition(0)).toThrow(RangeError);
    expect(() => logScalePositionToMeters(-0.1)).toThrow(RangeError);
  });
});
