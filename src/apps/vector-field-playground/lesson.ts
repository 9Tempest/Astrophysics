import type { EquationEntry } from "../../components";

export const vectorFieldEquations: readonly EquationEntry[] = [
  {
    label: "Position vector",
    expression: "r = <x, y>",
    description:
      "The teal arrow starts at the origin and points to the particle. Components are measured in meters."
  },
  {
    label: "Finite-difference velocity",
    expression: "v ≈ Δr / Δt",
    description:
      "Dragging estimates average velocity from the last two sampled particle positions."
  },
  {
    label: "Finite-difference acceleration",
    expression: "a ≈ Δv / Δt",
    description:
      "Acceleration is the rate of change of velocity, measured in meters per second squared."
  },
  {
    label: "Polar coordinates",
    expression: "r = sqrt(x² + y²), θ = atan2(y, x)",
    description:
      "The same point can be represented by Cartesian components or by distance plus angle."
  },
  {
    label: "Circular-motion demo",
    expression: "v = ω × r, a = -ω²r",
    description:
      "In the circular preset, velocity is tangent to the radius and acceleration points inward."
  }
];

export const vectorFieldAssumptions: readonly string[] = [
  "Numerical simulation: fixed-step updates use seconds, meters, meters/second, and meters/second squared.",
  "Toy model: the circular-motion preset enforces perfect circular kinematics rather than solving a force law.",
  "Finite differences estimate average rates over small time intervals; noisy dragging can create noisy acceleration."
];

export const vectorFieldPredictionPrompts: readonly string[] = [
  "Before pressing Play in circular mode, predict whether the velocity arrow points inward, outward, or sideways.",
  "Set acceleration to zero and predict what the velocity arrow will do.",
  "Drag the particle through the origin and predict how the polar angle changes."
];

export const vectorFieldReflectionQuestions: readonly string[] = [
  "If position and velocity are perpendicular, what happens to the distance from the origin for circular motion?",
  "Why can the same particle position be described as either (x, y) or (r, θ)?",
  "When you drag quickly, why does the acceleration readout jump around?"
];
