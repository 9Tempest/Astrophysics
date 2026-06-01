import type { Challenge } from "../../components";

export const vectorFieldChallenges: readonly Challenge[] = [
  {
    id: "perpendicular-velocity",
    title: "Make velocity perpendicular",
    difficulty: "beginner",
    goal: "Use circular mode or dragging to make the velocity arrow nearly 90 degrees from the position arrow.",
    hint: "For a point moving around the origin, tangent velocity is perpendicular to the radius.",
    successCondition: "The checker should show r · v close to 0.",
    explanationAfterSuccess:
      "A zero dot product means no radial velocity component, so the particle is not moving toward or away from the origin at that instant."
  },
  {
    id: "match-polar-coordinate",
    title: "Match a polar coordinate",
    difficulty: "intermediate",
    goal: "Drag the particle to about r = 5 m and θ = 45 degrees.",
    hint: "45 degrees means x and y should be about equal and positive.",
    successCondition: "The polar readout should be near r = 5 m, θ = 45°.",
    explanationAfterSuccess:
      "Polar coordinates are often the cleaner representation when radius and angle matter more than x and y separately."
  },
  {
    id: "create-circular-motion",
    title: "Create circular motion",
    difficulty: "exploratory",
    goal: "Switch to circular mode, press Play, and observe which vectors change direction as the particle moves.",
    hint: "The velocity arrow should stay tangent; the acceleration arrow should point inward.",
    successCondition: "The radius stays nearly constant while the particle moves.",
    explanationAfterSuccess:
      "Circular motion is acceleration without speed increase: acceleration changes the direction of velocity."
  }
];
