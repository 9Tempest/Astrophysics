export const KILOMETER_METERS = 1_000;

export const ASTRONOMICAL_UNIT_METERS = 149_597_870_700;

export const SPEED_OF_LIGHT_METERS_PER_SECOND = 299_792_458;

export const JULIAN_YEAR_SECONDS = 365.25 * 24 * 60 * 60;

// Exact formula under SI assumptions: 1 ly = c * 1 Julian year, units m = (m/s) * s.
export const LIGHT_YEAR_METERS =
  SPEED_OF_LIGHT_METERS_PER_SECOND * JULIAN_YEAR_SECONDS;

// Conventional parsec length in meters; equivalent to about 3.26156 light-years.
export const PARSEC_METERS = 3.085_677_581_491_367e16;
