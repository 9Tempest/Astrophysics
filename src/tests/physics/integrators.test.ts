import { describe, expect, it } from "vitest";
import {
  eulerStep,
  rk4Step,
  velocityVerletStep,
  type NumericState,
  type VerletState
} from "../../physics/integrators";

function integrate(
  state: NumericState,
  dt: number,
  steps: number,
  stepper: (current: NumericState, time: number, dt: number) => NumericState
): NumericState {
  let current = [...state];
  let time = 0;

  for (let index = 0; index < steps; index += 1) {
    current = [...stepper(current, time, dt)];
    time += dt;
  }

  return current;
}

describe("numeric integrators", () => {
  it("Euler error decreases with smaller time steps for dx/dt = x", () => {
    const derivative = (state: NumericState): NumericState => [state[0]];
    const coarse = integrate([1], 0.2, 5, (state, time, dt) =>
      eulerStep(state, time, dt, derivative)
    )[0];
    const fine = integrate([1], 0.1, 10, (state, time, dt) =>
      eulerStep(state, time, dt, derivative)
    )[0];
    const exact = Math.E;

    expect(Math.abs(fine - exact)).toBeLessThan(Math.abs(coarse - exact));
  });

  it("RK4 solves dx/dt = x over one second accurately", () => {
    const derivative = (state: NumericState): NumericState => [state[0]];
    const result = integrate([1], 0.1, 10, (state, time, dt) =>
      rk4Step(state, time, dt, derivative)
    )[0];

    expect(result).toBeCloseTo(Math.E, 5);
  });

  it("Velocity Verlet approximately conserves harmonic oscillator energy", () => {
    let state: VerletState = { position: [1], velocity: [0] };
    const energy = (position: number, velocity: number) =>
      0.5 * position * position + 0.5 * velocity * velocity;
    const initialEnergy = energy(state.position[0], state.velocity[0]);

    for (let index = 0; index < 200; index += 1) {
      state = velocityVerletStep(
        state,
        index * 0.05,
        0.05,
        (position) => [-position[0]]
      );
    }

    const finalEnergy = energy(state.position[0], state.velocity[0]);
    expect(Math.abs(finalEnergy - initialEnergy)).toBeLessThan(1e-3);
  });

  it("does not mutate input state arrays", () => {
    const state = [1, 2] as const;
    const derivative = (current: NumericState): NumericState => [
      current[1],
      -current[0]
    ];

    eulerStep(state, 0, 0.1, derivative);
    rk4Step(state, 0, 0.1, derivative);

    expect(state).toEqual([1, 2]);
  });
});
