import {
  ASTRONOMICAL_UNIT_METERS,
  LIGHT_YEAR_METERS,
  PARSEC_METERS
} from "../../constants/physicalConstants";
import type { EquationEntry } from "../../components";

export interface ReferenceObject {
  readonly id: string;
  readonly name: string;
  readonly meters: number;
  readonly category: string;
  readonly description: string;
  readonly note: string;
}

export interface UnitLandmark {
  readonly id: string;
  readonly label: string;
  readonly meters: number;
  readonly description: string;
}

export const referenceObjects: readonly ReferenceObject[] = [
  {
    id: "atom",
    name: "Atom",
    meters: 1e-10,
    category: "microscopic",
    description: "Hydrogen atom diameter scale",
    note: "Rounded reference value for orientation"
  },
  {
    id: "human",
    name: "Human",
    meters: 1.7,
    category: "everyday",
    description: "Approximate standing height",
    note: "Representative everyday length"
  },
  {
    id: "earth",
    name: "Earth",
    meters: 1.2742e7,
    category: "planet",
    description: "Mean diameter",
    note: "Rounded physical reference"
  },
  {
    id: "sun",
    name: "Sun",
    meters: 1.3914e9,
    category: "star",
    description: "Mean diameter",
    note: "Rounded physical reference"
  },
  {
    id: "solar-system",
    name: "Solar System",
    meters: 9e12,
    category: "planetary system",
    description: "Approximate diameter across Neptune's orbit",
    note: "Conceptual reference, not a sharp boundary"
  },
  {
    id: "milky-way",
    name: "Milky Way",
    meters: 9.46e20,
    category: "galaxy",
    description: "About 100,000 light-years across",
    note: "Astronomical size estimate"
  },
  {
    id: "observable-universe",
    name: "Observable universe",
    meters: 8.8e26,
    category: "cosmology",
    description: "Approximate diameter of the observable universe",
    note: "Cosmology estimate, not the whole universe"
  }
];

export const unitLandmarks: readonly UnitLandmark[] = [
  {
    id: "au",
    label: "1 AU",
    meters: ASTRONOMICAL_UNIT_METERS,
    description: "Earth-Sun distance scale"
  },
  {
    id: "ly",
    label: "1 ly",
    meters: LIGHT_YEAR_METERS,
    description: "Light travel distance in one Julian year"
  },
  {
    id: "pc",
    label: "1 pc",
    meters: PARSEC_METERS,
    description: "Parallax distance unit"
  }
];

export const cosmicScaleEquations: readonly EquationEntry[] = [
  {
    label: "Order of magnitude",
    expression: "k = log10(L_m / 1 m), so L_m = 10^k m",
    description:
      "The slider is the exponent k. Moving one tick by 1 multiplies length by 10."
  },
  {
    label: "Unit conversion",
    expression: "L_target = L_m / meters_per_target_unit",
    description:
      "Every supported unit is converted through meters, so m -> AU -> m round-trips within floating-point tolerance."
  },
  {
    label: "Scale gap",
    expression: "gap = log10(A_m) - log10(B_m)",
    description:
      "A gap of 2 means A is 100 times larger than B; a gap of -3 means A is 1000 times smaller."
  }
];

export const cosmicScaleAssumptions: readonly string[] = [
  "Exact formula: unit conversions use fixed SI constants for m, km, AU, ly, and pc.",
  "Conceptual diagram: object sizes are rounded reference scales for learning, not precision catalog data.",
  "No dynamics are simulated here; this app teaches units, logarithms, and scale comparison."
];
