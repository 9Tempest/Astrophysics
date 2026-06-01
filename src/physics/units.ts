import {
  ASTRONOMICAL_UNIT_METERS,
  KILOMETER_METERS,
  LIGHT_YEAR_METERS,
  PARSEC_METERS
} from "../constants/physicalConstants";

export type LengthUnitId = "m" | "km" | "au" | "ly" | "pc";

export interface LengthUnitDefinition {
  readonly id: LengthUnitId;
  readonly name: string;
  readonly symbol: string;
  readonly meters: number;
  readonly description: string;
}

export const LENGTH_UNITS: Record<LengthUnitId, LengthUnitDefinition> = {
  m: {
    id: "m",
    name: "meter",
    symbol: "m",
    meters: 1,
    description: "SI base unit for length"
  },
  km: {
    id: "km",
    name: "kilometer",
    symbol: "km",
    meters: KILOMETER_METERS,
    description: "1 km = 1000 m"
  },
  au: {
    id: "au",
    name: "astronomical unit",
    symbol: "AU",
    meters: ASTRONOMICAL_UNIT_METERS,
    description: "Mean Earth-Sun orbital scale"
  },
  ly: {
    id: "ly",
    name: "light-year",
    symbol: "ly",
    meters: LIGHT_YEAR_METERS,
    description: "Distance light travels in one Julian year"
  },
  pc: {
    id: "pc",
    name: "parsec",
    symbol: "pc",
    meters: PARSEC_METERS,
    description: "Distance at which 1 AU subtends 1 arcsecond"
  }
};

export const LENGTH_UNIT_ORDER: readonly LengthUnitId[] = [
  "m",
  "km",
  "au",
  "ly",
  "pc"
];

export interface ConvertedLength {
  readonly unit: LengthUnitDefinition;
  readonly value: number;
}

function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be finite.`);
  }
}

function assertNonNegativeLength(value: number, label: string): void {
  assertFiniteNumber(value, label);

  if (value < 0) {
    throw new RangeError(`${label} must be non-negative.`);
  }
}

export function getLengthUnit(unitId: LengthUnitId): LengthUnitDefinition {
  return LENGTH_UNITS[unitId];
}

export function lengthToMeters(value: number, unitId: LengthUnitId): number {
  assertNonNegativeLength(value, "length");

  // Exact formula under the selected unit definition: length_m = length_unit * meters_per_unit.
  return value * getLengthUnit(unitId).meters;
}

export function metersToLength(meters: number, unitId: LengthUnitId): number {
  assertNonNegativeLength(meters, "meters");

  // Exact formula under the selected unit definition: length_unit = length_m / meters_per_unit.
  return meters / getLengthUnit(unitId).meters;
}

export function convertLength(
  value: number,
  fromUnitId: LengthUnitId,
  toUnitId: LengthUnitId
): number {
  return metersToLength(lengthToMeters(value, fromUnitId), toUnitId);
}

export function convertLengthToAllUnits(
  value: number,
  fromUnitId: LengthUnitId
): ConvertedLength[] {
  const meters = lengthToMeters(value, fromUnitId);

  return LENGTH_UNIT_ORDER.map((unitId) => ({
    unit: getLengthUnit(unitId),
    value: metersToLength(meters, unitId)
  }));
}

export function formatScientific(value: number, significantDigits = 3): string {
  assertFiniteNumber(value, "value");

  if (value === 0) {
    return "0";
  }

  return value.toExponential(significantDigits);
}

export function formatHumanLength(meters: number): string {
  assertNonNegativeLength(meters, "meters");

  const unitId =
    meters >= PARSEC_METERS
      ? "pc"
      : meters >= LIGHT_YEAR_METERS
        ? "ly"
        : meters >= ASTRONOMICAL_UNIT_METERS
          ? "au"
          : meters >= KILOMETER_METERS
            ? "km"
            : "m";

  const unit = getLengthUnit(unitId);
  const value = metersToLength(meters, unitId);

  return `${formatScientific(value, 3)} ${unit.symbol}`;
}
