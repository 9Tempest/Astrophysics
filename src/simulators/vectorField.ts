import {
  add2,
  norm2,
  rotate2,
  scale2,
  sub2,
  type Vec2
} from "../physics/vector";

export type VectorPlaygroundMode =
  | "drag"
  | "constant-acceleration"
  | "circular-motion";

export interface VectorPlaygroundState {
  readonly position: Vec2;
  readonly velocity: Vec2;
  readonly acceleration: Vec2;
  readonly timeSeconds: number;
}

export interface VectorPlaygroundParams {
  readonly mode: VectorPlaygroundMode;
  readonly acceleration: Vec2;
  readonly angularSpeedRadiansPerSecond: number;
  readonly clockwise: boolean;
}

export interface VectorDiagnostics {
  readonly radiusMeters: number;
  readonly speedMetersPerSecond: number;
  readonly accelerationMetersPerSecondSquared: number;
  readonly radialVelocityDot: number;
  readonly isVelocityPerpendicularToPosition: boolean;
}

export interface DragKinematicsOptions {
  readonly minDisplacementMeters: number;
  readonly velocitySmoothing: number;
  readonly accelerationSmoothing: number;
}

export interface DragKinematicsResult {
  readonly velocity: Vec2;
  readonly acceleration: Vec2;
  readonly didMove: boolean;
}

export const DEFAULT_VECTOR_STATE: VectorPlaygroundState = {
  position: { x: 4, y: 2 },
  velocity: { x: 0.6, y: 1.2 },
  acceleration: { x: 0, y: 0 },
  timeSeconds: 0
};

export const SEEDED_CIRCULAR_SCENARIO: VectorPlaygroundState = {
  position: { x: 5, y: 0 },
  velocity: { x: 0, y: 2.5 },
  acceleration: { x: -1.25, y: 0 },
  timeSeconds: 0
};

function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be finite.`);
  }
}

function assertPositiveDt(dtSeconds: number): void {
  assertFiniteNumber(dtSeconds, "dtSeconds");

  if (dtSeconds <= 0) {
    throw new RangeError("dtSeconds must be positive.");
  }
}

function assertFiniteVec2(vector: Vec2, label: string): void {
  assertFiniteNumber(vector.x, `${label}.x`);
  assertFiniteNumber(vector.y, `${label}.y`);
}

function assertSmoothingFactor(value: number, label: string): void {
  assertFiniteNumber(value, label);

  if (value < 0 || value > 1) {
    throw new RangeError(`${label} must be between 0 and 1.`);
  }
}

function lerpVec2(a: Vec2, b: Vec2, alpha: number): Vec2 {
  assertFiniteVec2(a, "a");
  assertFiniteVec2(b, "b");
  assertSmoothingFactor(alpha, "alpha");

  return add2(scale2(a, 1 - alpha), scale2(b, alpha));
}

export function finiteDifferenceVelocity(
  previousPosition: Vec2,
  currentPosition: Vec2,
  dtSeconds: number
): Vec2 {
  assertFiniteVec2(previousPosition, "previousPosition");
  assertFiniteVec2(currentPosition, "currentPosition");
  assertPositiveDt(dtSeconds);

  // Exact finite difference estimate: v = Δx / Δt.
  // Units: m/s = m / s. This estimates average velocity over the sample interval.
  return scale2(sub2(currentPosition, previousPosition), 1 / dtSeconds);
}

export function finiteDifferenceAcceleration(
  previousVelocity: Vec2,
  currentVelocity: Vec2,
  dtSeconds: number
): Vec2 {
  assertFiniteVec2(previousVelocity, "previousVelocity");
  assertFiniteVec2(currentVelocity, "currentVelocity");
  assertPositiveDt(dtSeconds);

  // Exact finite difference estimate: a = Δv / Δt.
  // Units: m/s^2 = (m/s) / s. This estimates average acceleration.
  return scale2(sub2(currentVelocity, previousVelocity), 1 / dtSeconds);
}

export function estimateDragKinematics(
  previousPosition: Vec2,
  currentPosition: Vec2,
  previousVelocity: Vec2,
  previousAcceleration: Vec2,
  dtSeconds: number,
  options: DragKinematicsOptions
): DragKinematicsResult {
  assertFiniteVec2(previousPosition, "previousPosition");
  assertFiniteVec2(currentPosition, "currentPosition");
  assertFiniteVec2(previousVelocity, "previousVelocity");
  assertFiniteVec2(previousAcceleration, "previousAcceleration");
  assertPositiveDt(dtSeconds);
  assertFiniteNumber(options.minDisplacementMeters, "minDisplacementMeters");
  assertSmoothingFactor(options.velocitySmoothing, "velocitySmoothing");
  assertSmoothingFactor(options.accelerationSmoothing, "accelerationSmoothing");

  if (options.minDisplacementMeters < 0) {
    throw new RangeError("minDisplacementMeters must be non-negative.");
  }

  const displacement = sub2(currentPosition, previousPosition);

  if (norm2(displacement) < options.minDisplacementMeters) {
    return {
      velocity: previousVelocity,
      acceleration: previousAcceleration,
      didMove: false
    };
  }

  const rawVelocity = finiteDifferenceVelocity(
    previousPosition,
    currentPosition,
    dtSeconds
  );
  const velocity = lerpVec2(
    previousVelocity,
    rawVelocity,
    options.velocitySmoothing
  );
  const rawAcceleration = finiteDifferenceAcceleration(
    previousVelocity,
    velocity,
    dtSeconds
  );

  return {
    velocity,
    acceleration: lerpVec2(
      previousAcceleration,
      rawAcceleration,
      options.accelerationSmoothing
    ),
    didMove: true
  };
}

export function circularVelocity(
  position: Vec2,
  angularSpeedRadiansPerSecond: number,
  clockwise: boolean
): Vec2 {
  assertFiniteVec2(position, "position");
  assertFiniteNumber(
    angularSpeedRadiansPerSecond,
    "angularSpeedRadiansPerSecond"
  );

  if (angularSpeedRadiansPerSecond < 0) {
    throw new RangeError("angularSpeedRadiansPerSecond must be non-negative.");
  }

  const signedOmega = clockwise
    ? -angularSpeedRadiansPerSecond
    : angularSpeedRadiansPerSecond;

  // Kinematic circular-motion identity: v = ω × r in 2D.
  // Units: m/s = rad/s * m, treating radians as dimensionless.
  return {
    x: -signedOmega * position.y,
    y: signedOmega * position.x
  };
}

export function circularAcceleration(
  position: Vec2,
  angularSpeedRadiansPerSecond: number
): Vec2 {
  assertFiniteVec2(position, "position");
  assertFiniteNumber(
    angularSpeedRadiansPerSecond,
    "angularSpeedRadiansPerSecond"
  );

  if (angularSpeedRadiansPerSecond < 0) {
    throw new RangeError("angularSpeedRadiansPerSecond must be non-negative.");
  }

  // Kinematic circular-motion identity: a = -ω^2 r.
  // Units: m/s^2 = (rad/s)^2 * m, treating radians as dimensionless.
  return scale2(position, -(angularSpeedRadiansPerSecond ** 2));
}

export function stepVectorPlayground(
  state: VectorPlaygroundState,
  params: VectorPlaygroundParams,
  dtSeconds: number
): VectorPlaygroundState {
  assertFiniteVec2(state.position, "state.position");
  assertFiniteVec2(state.velocity, "state.velocity");
  assertFiniteVec2(state.acceleration, "state.acceleration");
  assertFiniteNumber(state.timeSeconds, "state.timeSeconds");
  assertFiniteVec2(params.acceleration, "params.acceleration");
  assertPositiveDt(dtSeconds);

  if (params.mode === "drag") {
    return {
      ...state,
      timeSeconds: state.timeSeconds + dtSeconds
    };
  }

  if (params.mode === "circular-motion") {
    const signedAngle =
      (params.clockwise ? -1 : 1) *
      params.angularSpeedRadiansPerSecond *
      dtSeconds;
    const position = rotate2(state.position, signedAngle);

    return {
      position,
      velocity: circularVelocity(
        position,
        params.angularSpeedRadiansPerSecond,
        params.clockwise
      ),
      acceleration: circularAcceleration(
        position,
        params.angularSpeedRadiansPerSecond
      ),
      timeSeconds: state.timeSeconds + dtSeconds
    };
  }

  // Constant-acceleration kinematics:
  // x_next = x + v Δt + 0.5 a Δt^2, v_next = v + a Δt.
  // Units are SI-compatible: m, m/s, m/s^2, and seconds.
  const position = add2(
    add2(state.position, scale2(state.velocity, dtSeconds)),
    scale2(params.acceleration, 0.5 * dtSeconds * dtSeconds)
  );
  const velocity = add2(state.velocity, scale2(params.acceleration, dtSeconds));

  return {
    position,
    velocity,
    acceleration: params.acceleration,
    timeSeconds: state.timeSeconds + dtSeconds
  };
}

export function vectorDiagnostics(
  state: VectorPlaygroundState
): VectorDiagnostics {
  const radiusMeters = norm2(state.position);
  const speedMetersPerSecond = norm2(state.velocity);
  const accelerationMetersPerSecondSquared = norm2(state.acceleration);
  const radialVelocityDot =
    state.position.x * state.velocity.x + state.position.y * state.velocity.y;

  return {
    radiusMeters,
    speedMetersPerSecond,
    accelerationMetersPerSecondSquared,
    radialVelocityDot,
    isVelocityPerpendicularToPosition: Math.abs(radialVelocityDot) < 1e-6
  };
}
