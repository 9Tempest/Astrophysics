import { describe, expect, it } from "vitest";
import {
  ASTRONOMICAL_UNIT_METERS,
  LIGHT_YEAR_METERS,
  PARSEC_METERS,
  SPEED_OF_LIGHT_METERS_PER_SECOND,
  JULIAN_YEAR_SECONDS
} from "../../constants/physicalConstants";
import {
  LENGTH_UNIT_ORDER,
  convertLength,
  lengthToMeters
} from "../../physics/units";

function expectRelativeClose(
  actual: number,
  expected: number,
  relativeTolerance: number
): void {
  expect(Math.abs(actual - expected) / Math.abs(expected)).toBeLessThanOrEqual(
    relativeTolerance
  );
}

describe("length unit conversions", () => {
  it("round-trips every supported unit through meters", () => {
    const value = 3.25e8;

    for (const unit of LENGTH_UNIT_ORDER) {
      const meters = convertLength(value, unit, "m");
      const roundTrip = convertLength(meters, "m", unit);

      expectRelativeClose(roundTrip, value, 1e-12);
    }
  });

  it("matches known astronomical constants to expected significant figures", () => {
    expect(convertLength(1, "au", "m")).toBe(ASTRONOMICAL_UNIT_METERS);
    expect(LIGHT_YEAR_METERS).toBe(
      SPEED_OF_LIGHT_METERS_PER_SECOND * JULIAN_YEAR_SECONDS
    );
    expectRelativeClose(convertLength(1, "pc", "ly"), 3.26156, 2e-6);
    expect(PARSEC_METERS).toBeGreaterThan(LIGHT_YEAR_METERS);
  });

  it("rejects invalid lengths", () => {
    expect(() => lengthToMeters(-1, "m")).toThrow(RangeError);
    expect(() => lengthToMeters(Number.NaN, "m")).toThrow(RangeError);
  });
});
