import { describe, expect, it } from "vitest";
import {
  SEEDED_CIRCULAR_SCENARIO,
  circularAcceleration,
  circularVelocity,
  estimateDragKinematics,
  finiteDifferenceAcceleration,
  finiteDifferenceVelocity,
  stepVectorPlayground,
  vectorDiagnostics
} from "../../simulators/vectorField";
import { dot2, norm2 } from "../../physics/vector";

describe("vector field playground simulator", () => {
  it("estimates finite-difference velocity and acceleration", () => {
    const velocity = finiteDifferenceVelocity(
      { x: 1, y: -1 },
      { x: 4, y: 5 },
      0.5
    );

    expect(velocity).toEqual({ x: 6, y: 12 });

    const acceleration = finiteDifferenceAcceleration(
      { x: 2, y: 2 },
      { x: 6, y: -2 },
      2
    );

    expect(acceleration).toEqual({ x: 2, y: -2 });
  });

  it("ignores tiny drag displacement so a click does not create fake acceleration", () => {
    const result = estimateDragKinematics(
      { x: 1, y: 1 },
      { x: 1.01, y: 1.01 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      1 / 60,
      {
        minDisplacementMeters: 0.08,
        velocitySmoothing: 0.35,
        accelerationSmoothing: 0.2
      }
    );

    expect(result.didMove).toBe(false);
    expect(result.velocity).toEqual({ x: 0, y: 0 });
    expect(result.acceleration).toEqual({ x: 0, y: 0 });
  });

  it("smooths drag kinematics instead of exposing raw second differences", () => {
    const result = estimateDragKinematics(
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      0.1,
      {
        minDisplacementMeters: 0.08,
        velocitySmoothing: 0.5,
        accelerationSmoothing: 0.25
      }
    );

    expect(result.didMove).toBe(true);
    expect(result.velocity.x).toBeCloseTo(5, 12);
    expect(result.acceleration.x).toBeCloseTo(12.5, 12);
  });

  it("keeps circular velocity perpendicular to position", () => {
    const position = { x: 3, y: 4 };
    const velocity = circularVelocity(position, 0.7, false);

    expect(dot2(position, velocity)).toBeCloseTo(0, 12);
    expect(norm2(velocity)).toBeCloseTo(0.7 * 5, 12);
  });

  it("points circular acceleration inward", () => {
    const position = { x: 3, y: 4 };
    const acceleration = circularAcceleration(position, 2);

    expect(acceleration).toEqual({ x: -12, y: -16 });
  });

  it("conserves radius for the seeded circular scenario", () => {
    const initialRadius = norm2(SEEDED_CIRCULAR_SCENARIO.position);
    const state = stepVectorPlayground(
      SEEDED_CIRCULAR_SCENARIO,
      {
        mode: "circular-motion",
        acceleration: { x: 0, y: 0 },
        angularSpeedRadiansPerSecond: 0.5,
        clockwise: false
      },
      0.1
    );

    expect(norm2(state.position)).toBeCloseTo(initialRadius, 12);
    expect(vectorDiagnostics(state).isVelocityPerpendicularToPosition).toBe(
      true
    );
  });

  it("steps constant acceleration deterministically", () => {
    const state = stepVectorPlayground(
      {
        position: { x: 0, y: 0 },
        velocity: { x: 1, y: 0 },
        acceleration: { x: 0, y: 0 },
        timeSeconds: 0
      },
      {
        mode: "constant-acceleration",
        acceleration: { x: 0, y: 2 },
        angularSpeedRadiansPerSecond: 0,
        clockwise: false
      },
      0.5
    );

    expect(state.position.x).toBeCloseTo(0.5, 12);
    expect(state.position.y).toBeCloseTo(0.25, 12);
    expect(state.velocity.x).toBeCloseTo(1, 12);
    expect(state.velocity.y).toBeCloseTo(1, 12);
  });
});
