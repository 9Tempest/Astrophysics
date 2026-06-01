export const LOG_SCALE_MIN_EXPONENT = -15;
export const LOG_SCALE_MAX_EXPONENT = 27;

function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be finite.`);
  }
}

function assertPositiveLength(meters: number): void {
  assertFiniteNumber(meters, "meters");

  if (meters <= 0) {
    throw new RangeError("meters must be positive for logarithmic mapping.");
  }
}

function assertValidRange(minExponent: number, maxExponent: number): void {
  assertFiniteNumber(minExponent, "minExponent");
  assertFiniteNumber(maxExponent, "maxExponent");

  if (minExponent >= maxExponent) {
    throw new RangeError("minExponent must be smaller than maxExponent.");
  }
}

export function clamp(
  value: number,
  minValue: number,
  maxValue: number
): number {
  assertFiniteNumber(value, "value");
  assertValidRange(minValue, maxValue);

  return Math.min(maxValue, Math.max(minValue, value));
}

export function metersFromLog10Exponent(exponent: number): number {
  assertFiniteNumber(exponent, "exponent");

  // Exact definition for this scale: length_m = 10^exponent m.
  return 10 ** exponent;
}

export function log10Meters(meters: number): number {
  assertPositiveLength(meters);

  // Exact definition for this scale: exponent = log10(length_m / 1 m).
  return Math.log10(meters);
}

export function metersToLogScalePosition(
  meters: number,
  minExponent = LOG_SCALE_MIN_EXPONENT,
  maxExponent = LOG_SCALE_MAX_EXPONENT
): number {
  assertPositiveLength(meters);
  assertValidRange(minExponent, maxExponent);

  return (log10Meters(meters) - minExponent) / (maxExponent - minExponent);
}

export function logScalePositionToMeters(
  position: number,
  minExponent = LOG_SCALE_MIN_EXPONENT,
  maxExponent = LOG_SCALE_MAX_EXPONENT
): number {
  assertFiniteNumber(position, "position");
  assertValidRange(minExponent, maxExponent);

  if (position < 0 || position > 1) {
    throw new RangeError("position must be between 0 and 1.");
  }

  return metersFromLog10Exponent(
    minExponent + position * (maxExponent - minExponent)
  );
}

export function clampLogScalePosition(position: number): number {
  return clamp(position, 0, 1);
}

export function exponentDifference(aMeters: number, bMeters: number): number {
  assertPositiveLength(aMeters);
  assertPositiveLength(bMeters);

  return log10Meters(aMeters) - log10Meters(bMeters);
}
