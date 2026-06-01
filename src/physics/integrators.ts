export type NumericState = readonly number[];

export type DerivativeFunction = (
  state: NumericState,
  time: number
) => NumericState;

export interface VerletState {
  readonly position: NumericState;
  readonly velocity: NumericState;
}

export type AccelerationFunction = (
  position: NumericState,
  time: number
) => NumericState;

function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be finite.`);
  }
}

function assertFiniteState(state: NumericState, label: string): void {
  if (state.length === 0) {
    throw new RangeError(`${label} must contain at least one component.`);
  }

  for (const component of state) {
    assertFiniteNumber(component, label);
  }
}

function assertSameLength(
  a: NumericState,
  b: NumericState,
  aLabel: string,
  bLabel: string
): void {
  if (a.length !== b.length) {
    throw new RangeError(`${aLabel} and ${bLabel} must have the same length.`);
  }
}

function addScaled(
  state: NumericState,
  delta: NumericState,
  scale: number
): number[] {
  assertSameLength(state, delta, "state", "delta");
  return state.map((value, index) => value + scale * delta[index]);
}

export function eulerStep(
  state: NumericState,
  time: number,
  dt: number,
  derivative: DerivativeFunction
): number[] {
  assertFiniteState(state, "state");
  assertFiniteNumber(time, "time");
  assertFiniteNumber(dt, "dt");

  const rate = derivative([...state], time);
  assertFiniteState(rate, "derivative");

  // First-order explicit Euler: x_next = x + dt * dx/dt.
  // Units: state units plus seconds * state-units/second.
  return addScaled(state, rate, dt);
}

export function rk4Step(
  state: NumericState,
  time: number,
  dt: number,
  derivative: DerivativeFunction
): number[] {
  assertFiniteState(state, "state");
  assertFiniteNumber(time, "time");
  assertFiniteNumber(dt, "dt");

  const k1 = derivative([...state], time);
  const k2 = derivative(addScaled(state, k1, dt / 2), time + dt / 2);
  const k3 = derivative(addScaled(state, k2, dt / 2), time + dt / 2);
  const k4 = derivative(addScaled(state, k3, dt), time + dt);

  for (const [label, rate] of [
    ["k1", k1],
    ["k2", k2],
    ["k3", k3],
    ["k4", k4]
  ] as const) {
    assertFiniteState(rate, label);
    assertSameLength(state, rate, "state", label);
  }

  // Fourth-order Runge-Kutta weighted slope average for dx/dt = f(x, t).
  return state.map(
    (value, index) =>
      value +
      (dt / 6) *
        (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index])
  );
}

export function velocityVerletStep(
  state: VerletState,
  time: number,
  dt: number,
  acceleration: AccelerationFunction
): VerletState {
  assertFiniteState(state.position, "position");
  assertFiniteState(state.velocity, "velocity");
  assertSameLength(state.position, state.velocity, "position", "velocity");
  assertFiniteNumber(time, "time");
  assertFiniteNumber(dt, "dt");

  const a0 = acceleration([...state.position], time);
  assertFiniteState(a0, "acceleration");
  assertSameLength(state.position, a0, "position", "acceleration");

  // Velocity Verlet for acceleration depending on position.
  // Units: x_next = x + v*dt + 0.5*a*dt^2, with SI-compatible seconds for dt.
  const nextPosition = state.position.map(
    (position, index) =>
      position + state.velocity[index] * dt + 0.5 * a0[index] * dt * dt
  );

  const a1 = acceleration(nextPosition, time + dt);
  assertFiniteState(a1, "next acceleration");
  assertSameLength(state.position, a1, "position", "next acceleration");

  const nextVelocity = state.velocity.map(
    (velocity, index) => velocity + 0.5 * (a0[index] + a1[index]) * dt
  );

  return {
    position: nextPosition,
    velocity: nextVelocity
  };
}
