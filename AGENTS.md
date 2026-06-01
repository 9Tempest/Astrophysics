# AGENTS.md

You are Codex working in the `spacetime-playground` repository.

## Mission

Build an interactive physics learning suite that helps a learner progress from basic Newtonian mechanics to astrophysics, black holes, cosmology, wormholes, and time-travel causality models.

The project must be understandable to a beginner in physics but robust enough for a CS graduate student to inspect, test, and extend.

## Required reading order

Before implementing any feature, read:

1. `01_ACCESSIBLE_OUTLINE.md`
2. `02_LEARNING_ROADMAP.md`
3. `03_APP_SPECS.md`
4. `04_ARCHITECTURE.md`
5. `06_PHYSICS_MODELING_GUIDE.md`
6. `08_TESTING_AND_VALIDATION.md`

For individual tasks, also check `curriculum_manifest.json`.

## Coding rules

- Use TypeScript.
- Keep pure physics logic outside React components.
- Put reusable physics code in `src/physics`.
- Put app-specific simulators in `src/simulators`.
- Put UI components in `src/components`.
- Put lesson copy and equations in `src/lessons` or app-local data files.
- Do not mix numerical algorithms with rendering code.
- Prefer small pure functions with unit tests.
- Avoid hidden globals. Simulation state should be explicit and serializable.
- Use fixed-step simulation for physics; rendering may use `requestAnimationFrame`.
- Every physics formula must be commented with units and assumptions.
- Every approximation must be labeled as a toy model, weak-field approximation, or conceptual visualization.

## App standard

Every interactive app should include:

1. Visualization panel: Canvas, SVG, or Three.js.
2. Control panel: sliders, toggles, inputs.
3. Equation panel: governing equations and assumptions.
4. Invariant/checker panel: energy, momentum, interval, causal validity, or model-specific validation.
5. Challenge mode: at least 3 small tasks that motivate exploration.
6. Reset and pause/step controls where simulation is time-based.
7. Beginner explanation and advanced notes.

## Physics correctness standard

- Use SI units for classical mechanics unless otherwise stated.
- For relativity modules, use natural units with `c = 1` internally, but display SI equivalents where useful.
- Never present a toy model as a full physical solution.
- For black holes, wormholes, and cosmology, clearly state whether the implementation is exact, approximate, or conceptual.
- Always include domain checks: no `v >= c`, no invalid square roots, no divide-by-zero near singularities, and no silent NaNs.

## Testing rules

- Use Vitest for pure physics functions.
- Add tests before or with each physics module.
- Tests should verify known limits, invariants, monotonic behavior, and invalid-input handling.
- For every simulator, include at least one deterministic seeded scenario.

## UI/UX rules

- The learner should be able to understand what changed after moving any slider.
- Use labels with units.
- Keep controls keyboard accessible.
- Provide pause/step/reset.
- Show assumptions and caveats directly in the UI, not only in docs.

## Implementation workflow

For each task:

1. Restate the goal in one sentence.
2. Identify files to modify.
3. Implement the smallest working slice.
4. Add or update tests.
5. Run tests and type checks.
6. Provide a concise summary of changes and remaining limitations.

## First implementation priority

Start with infrastructure, not advanced physics:

1. Create Vite + React + TypeScript scaffold.
2. Implement app registry and navigation.
3. Implement shared layout: `AppShell`, `ControlPanel`, `EquationPanel`, `InvariantPanel`, `ChallengePanel`.
4. Implement `src/physics/vector.ts`, `src/physics/units.ts`, `src/physics/integrators.ts`.
5. Build the first app: `Cosmic Scale Explorer`.

## Learning-first development rule

This repository is not only a software project. It is a physics learning environment.

For every feature, Codex must include:
1. A short conceptual explanation.
2. The governing equations.
3. A prediction task for the learner.
4. An interactive parameter control.
5. A visualization.
6. An invariant or correctness checker.
7. A short quiz or reflection section.
8. Unit tests for the physics logic.

Never implement a large feature without first creating a minimal experiment.
Prefer small, testable simulations over broad but shallow demos.