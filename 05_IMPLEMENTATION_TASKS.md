# 05 Implementation Tasks

Use this file as a queue of Codex tasks. Each task should be small enough to review.

## Task 0 — Repository scaffold

Prompt to Codex:

```text
Read AGENTS.md and the project docs. Create a Vite + React + TypeScript app. Add Vitest. Create the src folder structure from 04_ARCHITECTURE.md. Implement empty reusable layout components: AppShell, ControlPanel, EquationPanel, InvariantPanel, ChallengePanel. Add a placeholder app registry with Phase A apps.
```

Acceptance:

- `npm install` works.
- `npm run dev` starts.
- `npm test` runs.
- App shell renders.

## Task 1 — Core physics utilities

Prompt to Codex:

```text
Implement src/physics/vector.ts, src/physics/units.ts, src/constants/physicalConstants.ts, and tests. Include Vec2, Vec3, dot, norm, normalize, add, sub, scale, cartesian/polar conversion, and astronomy unit conversions for m, km, AU, ly, pc. Keep functions pure and documented.
```

Acceptance:

- Unit conversion tests pass.
- Vector tests pass.
- No React code imports into physics modules.

## Task 2 — First app: Cosmic Scale Explorer

Prompt to Codex:

```text
Implement app A1 Cosmic Scale Explorer using the app standard in AGENTS.md and the spec in 03_APP_SPECS.md. Use a log-scale slider from 1e-15 m to 1e27 m, reference object cards, a unit converter, an equation panel, and three challenges. Add tests for scale mapping and conversion logic.
```

Acceptance:

- App is reachable from registry/navigation.
- Slider updates visualization and object cards.
- Unit converter works both directions.
- Tests pass.

## Task 3 — Integrator foundation

Prompt to Codex:

```text
Implement src/physics/integrators.ts with Euler, RK4, and Velocity Verlet. Add tests using harmonic oscillator and dx/dt=x sanity checks. Then create an IntegratorComparison component that future apps can reuse.
```

Acceptance:

- Integrators are pure functions.
- Tests check convergence and energy drift behavior.
- Documentation explains when to use each integrator.

## Task A1 — Cosmic Scale Explorer

Prompt to Codex:

```text
Implement app A1 `Cosmic Scale Explorer` (`cosmic-scale-explorer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- unit conversions are reversible within tolerance
- log slider maps monotonically
- known constants match expected significant figures

## Task A2 — Vector Field Playground

Prompt to Codex:

```text
Implement app A2 `Vector Field Playground` (`vector-field-playground`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- coordinate transforms round-trip
- vector norms and dot products are correct
- angle normalization works

## Task A3 — Slope Field Lab

Prompt to Codex:

```text
Implement app A3 `Slope Field Lab` (`slope-field-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- RK4 solves dx/dt=x approximately
- Euler error decreases with smaller dt
- trajectory array has deterministic output

## Task A4 — Integrator Battle Arena

Prompt to Codex:

```text
Implement app A4 `Integrator Battle Arena` (`integrator-battle-arena`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- harmonic oscillator energy error behavior
- Verlet time reversibility sanity check
- integrators do not mutate inputs

## Task B1 — Force Sandbox

Prompt to Codex:

```text
Implement app B1 `Force Sandbox` (`force-sandbox`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- F=ma acceleration
- zero force keeps velocity constant
- fixed step deterministic

## Task B2 — Conservation Detective

Prompt to Codex:

```text
Implement app B2 `Conservation Detective` (`conservation-detective`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- elastic collision conserves momentum/energy
- inelastic collision conserves momentum
- edge cases with equal masses

## Task B3 — Action Minimizer

Prompt to Codex:

```text
Implement app B3 `Action Minimizer` (`action-minimizer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A4, B2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- free-particle straight path has lower action
- discrete integral convergence
- optimizer reduces action

## Task B4 — Gravity Well Simulator

Prompt to Codex:

```text
Implement app B4 `Gravity Well Simulator` (`gravity-well-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A4, B1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- escape velocity formula
- circular orbit speed formula
- energy sign classification

## Task B5 — Kepler Law Verifier

Prompt to Codex:

```text
Implement app B5 `Kepler Law Verifier` (`kepler-law-verifier`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- T^2/a^3 constant for fixed central mass
- ellipse geometry correct
- area estimator converges

## Task B6 — Mini Solar System Engine

Prompt to Codex:

```text
Implement app B6 `Mini Solar System Engine` (`mini-solar-system-engine`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B4, B5.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- pairwise forces equal and opposite
- center of mass constant without external forces
- energy drift below target for small dt

## Task B7 — Tidal Force Explorer

Prompt to Codex:

```text
Implement app B7 `Tidal Force Explorer` (`tidal-force-explorer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B6.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- tidal gradient increases with proximity
- Roche estimate monotonic with density
- fragment particles conserve approximate momentum

## Task C1 — Wave Tank

Prompt to Codex:

```text
Implement app C1 `Wave Tank` (`wave-tank`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- CFL warning triggers
- wave speed roughly matches parameter
- energy-like quantity behaves reasonably

## Task C2 — Spectrum Decomposer

Prompt to Codex:

```text
Implement app C2 `Spectrum Decomposer` (`spectrum-decomposer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- single sine produces peak
- sampling frequency affects Nyquist
- known line positions render correctly

## Task C3 — Doppler Shift Visualizer

Prompt to Codex:

```text
Implement app C3 `Doppler Shift Visualizer` (`doppler-shift-visualizer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- zero velocity gives no shift
- receding redshifts
- relativistic formula approaches classical for low v

## Task C4 — Blackbody Color Lab

Prompt to Codex:

```text
Implement app C4 `Blackbody Color Lab` (`blackbody-color-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- Wien peak within tolerance
- T^4 luminosity ratio
- Planck values finite for valid inputs

## Task C5 — Gas Particle Simulator

Prompt to Codex:

```text
Implement app C5 `Gas Particle Simulator` (`gas-particle-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- wall collision conserves kinetic energy
- temperature tracks mean kinetic energy
- histogram normalization

## Task C6 — Fusion Energy Budget

Prompt to Codex:

```text
Implement app C6 `Fusion Energy Budget` (`fusion-energy-budget`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C4, C5.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- E=mc^2 conversion
- reaction rate monotonic with temperature
- invalid values rejected

## Task C7 — Star Balance Simulator

Prompt to Codex:

```text
Implement app C7 `Star Balance Simulator` (`star-balance-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C5, C6.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- gravity increases with enclosed mass
- pressure gradient sign
- status classification deterministic

## Task C8 — HR Diagram Explorer

Prompt to Codex:

```text
Implement app C8 `HR Diagram Explorer` (`hr-diagram-explorer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C4, C7.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- mass-luminosity monotonic
- log axes valid
- phase sequence order

## Task D1 — Light Clock Simulator

Prompt to Codex:

```text
Implement app D1 `Light Clock Simulator` (`light-clock-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- gamma(0)=1
- gamma increases with v
- reject v>=c

## Task D2 — Lorentz Transformer

Prompt to Codex:

```text
Implement app D2 `Lorentz Transformer` (`lorentz-transformer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- interval invariant
- inverse recovers original
- low-speed limit approx identity

## Task D3 — Spacetime Diagram Editor

Prompt to Codex:

```text
Implement app D3 `Spacetime Diagram Editor` (`spacetime-diagram-editor`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- classification thresholds
- light cone boundary
- worldline speed constraint

## Task D4 — Proper Time Race

Prompt to Codex:

```text
Implement app D4 `Proper Time Race` (`proper-time-race`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- straight inertial path maximizes proper time between timelike events
- zero velocity proper=time
- invalid paths rejected

## Task D5 — Relativistic Rocket Lab

Prompt to Codex:

```text
Implement app D5 `Relativistic Rocket Lab` (`relativistic-rocket-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D1, D2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- velocity remains below c
- energy increases with gamma
- low-speed kinetic energy approximation

## Task E1 — Einstein Elevator

Prompt to Codex:

```text
Implement app E1 `Einstein Elevator` (`einstein-elevator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- free-fall relative acceleration zero
- accelerated frame pseudo-force
- scenario labels consistent

## Task E2 — Geodesic on Surfaces

Prompt to Codex:

```text
Implement app E2 `Geodesic on Surfaces` (`geodesic-on-surfaces`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A4, D3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- sphere great circle sanity check
- state remains on parameter domain
- stepper deterministic

## Task E3 — Metric Playground

Prompt to Codex:

```text
Implement app E3 `Metric Playground` (`metric-playground`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D2, E2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- Euclidean norm
- Minkowski interval
- matrix symmetry

## Task E4 — Tensor Transformation Lab

Prompt to Codex:

```text
Implement app E4 `Tensor Transformation Lab` (`tensor-transformation-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: E3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- rotation preserves Euclidean norm
- Lorentz preserves Minkowski interval
- inverse transform consistency

## Task E5 — Parallel Transport Game

Prompt to Codex:

```text
Implement app E5 `Parallel Transport Game` (`parallel-transport-game`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: E2, E3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- small loop small rotation
- equator loop sanity
- deterministic transport

## Task E6 — Curvature-Matter Sandbox

Prompt to Codex:

```text
Implement app E6 `Curvature-Matter Sandbox` (`curvature-matter-sandbox`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: E3, E5.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- symmetric density gives symmetric field
- field responds monotonically to density
- toy solver stable

## Task F1 — Black Hole Orbit Lab

Prompt to Codex:

```text
Implement app F1 `Black Hole Orbit Lab` (`black-hole-orbit-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B4, E3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- rs=2GM/c^2
- horizon scales linearly with mass
- classification thresholds deterministic

## Task F2 — Gravity Clock Comparator

Prompt to Codex:

```text
Implement app F2 `Gravity Clock Comparator` (`gravity-clock-comparator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1, D4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- factor approaches 1 far away
- factor decreases near horizon
- invalid radius handled

## Task F3 — Gravitational Lens Renderer

Prompt to Codex:

```text
Implement app F3 `Gravitational Lens Renderer` (`gravitational-lens-renderer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1, C1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- deflection increases with mass
- deflection decreases with impact parameter
- zero mass identity mapping

## Task F4 — Accretion Disk Simulator

Prompt to Codex:

```text
Implement app F4 `Accretion Disk Simulator` (`accretion-disk-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1, B6.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- with zero viscosity angular momentum roughly conserved
- viscosity reduces orbital energy
- temperature heuristic bounded

## Task F5 — Frame Dragging Explorer

Prompt to Codex:

```text
Implement app F5 `Frame Dragging Explorer` (`frame-dragging-explorer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1, E6.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- spin range validation
- zero spin reduces to non-rotating view
- ergosphere grows with spin heuristic

## Task F6 — Horizon Thermodynamics Toy Model

Prompt to Codex:

```text
Implement app F6 `Horizon Thermodynamics Toy Model` (`horizon-thermodynamics-toy-model`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- temperature decreases with mass
- area increases with mass squared
- evaporation time increases with mass cubed

## Task G1 — Binary Inspiral Simulator

Prompt to Codex:

```text
Implement app G1 `Binary Inspiral Simulator` (`binary-inspiral-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B6, F1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- center of mass stays fixed without loss
- loss shrinks separation
- frequency increases as separation decreases

## Task G2 — Gravitational Wave Chirp Lab

Prompt to Codex:

```text
Implement app G2 `Gravitational Wave Chirp Lab` (`gravitational-wave-chirp-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: G1, C2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- waveform finite
- frequency increases over time
- normalization bounds output

## Task G3 — LIGO Signal Hunter

Prompt to Codex:

```text
Implement app G3 `LIGO Signal Hunter` (`ligo-signal-hunter`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: G2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- correlation peak at injected signal
- wrong template lower score
- noise seeded reproducibly

## Task H1 — Galaxy Distribution Viewer

Prompt to Codex:

```text
Implement app H1 `Galaxy Distribution Viewer` (`galaxy-distribution-viewer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: A1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- density average converges for random distribution
- cluster settings change variance
- seed reproducibility

## Task H2 — Expanding Grid Universe

Prompt to Codex:

```text
Implement app H2 `Expanding Grid Universe` (`expanding-grid-universe`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: H1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- proper distance = a * comoving
- comoving coordinates unchanged
- distance ratios scale correctly

## Task H3 — Universe Equation Solver

Prompt to Codex:

```text
Implement app H3 `Universe Equation Solver` (`universe-equation-solver`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: H2, A4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- flat parameter sum check
- known simple cases monotonic
- invalid negative density handled

## Task H4 — Cosmic Redshift Calculator

Prompt to Codex:

```text
Implement app H4 `Cosmic Redshift Calculator` (`cosmic-redshift-calculator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: H3, C3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- z=0 gives a=1
- a formula exact
- distance monotonic with z

## Task H5 — CMB Pixel Universe

Prompt to Codex:

```text
Implement app H5 `CMB Pixel Universe` (`cmb-pixel-universe`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: C2, H3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- seed reproducible
- mean near baseline
- power sliders affect variance by band

## Task H6 — Galaxy Rotation Curve Lab

Prompt to Codex:

```text
Implement app H6 `Galaxy Rotation Curve Lab` (`galaxy-rotation-curve-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: B4, H1.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- velocity increases with enclosed mass
- halo can flatten curve
- no divide-by-zero at r=0

## Task H7 — Dark Energy Slider

Prompt to Codex:

```text
Implement app H7 `Dark Energy Slider` (`dark-energy-slider`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: H3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- higher ΩΛ increases late-time expansion rate
- solver stable for valid params
- presets load correctly

## Task H8 — Cosmic Timeline Builder

Prompt to Codex:

```text
Implement app H8 `Cosmic Timeline Builder` (`cosmic-timeline-builder`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: H3, H4, H5.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- timeline order valid
- log mapping monotonic
- event links resolve

## Task I1 — Wormhole Taxonomy Explorer

Prompt to Codex:

```text
Implement app I1 `Wormhole Taxonomy Explorer` (`wormhole-taxonomy-explorer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: F1, E3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- taxonomy flags consistent
- cards render all caveats
- mode switching deterministic

## Task I2 — Wormhole Metric Builder

Prompt to Codex:

```text
Implement app I2 `Wormhole Metric Builder` (`wormhole-metric-builder`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I1, E3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- throat detection
- flare-out condition sign
- invalid functions handled

## Task I3 — Embedding Diagram Renderer

Prompt to Codex:

```text
Implement app I3 `Embedding Diagram Renderer` (`embedding-diagram-renderer`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- mesh finite
- symmetry about throat
- parameter changes regenerate mesh

## Task I4 — Energy Condition Checker

Prompt to Codex:

```text
Implement app I4 `Energy Condition Checker` (`energy-condition-checker`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I2.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- known toy function violates expected condition
- sampler handles singular points
- status aggregation correct

## Task I5 — Traversability Stress Test

Prompt to Codex:

```text
Implement app I5 `Traversability Stress Test` (`traversability-stress-test`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I2, B7.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- stress decreases with larger throat heuristic
- threshold comparison correct
- path sampling finite

## Task I6 — Wormhole Time Machine Lab

Prompt to Codex:

```text
Implement app I6 `Wormhole Time Machine Lab` (`wormhole-time-machine-lab`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D4, I2, I7.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- time dilation offset grows with speed/duration
- loop detection identifies past return
- no loop for zero offset

## Task I7 — Causality Loop Detector

Prompt to Codex:

```text
Implement app I7 `Causality Loop Detector` (`causality-loop-detector`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: D3.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- DAG no cycle
- simple cycle found
- self-loop found
- cycle highlighting returns path

## Task I8 — Paradox Simulator

Prompt to Codex:

```text
Implement app I8 `Paradox Simulator` (`paradox-simulator`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I7.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- known satisfiable scenario
- known unsatisfiable scenario
- solver enumerates assignments

## Task I9 — Chronology Protection Toy Model

Prompt to Codex:

```text
Implement app I9 `Chronology Protection Toy Model` (`chronology-protection-toy-model`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I6, I7.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- energy grows near threshold
- no NaN before clamp
- caveat always visible

## Task I10 — Negative Energy Sandbox

Prompt to Codex:

```text
Implement app I10 `Negative Energy Sandbox` (`negative-energy-sandbox`) according to `03_APP_SPECS.md` and `curriculum_manifest.json`.
Dependencies to reuse: I4.
Keep physics logic in src/physics or src/simulators, UI in src/apps/<slug> and src/components. Add tests for the acceptance criteria. Label approximations and assumptions in the EquationPanel.
```

Acceptance tests to implement:
- magnitude increases as separation decreases
- invalid separation rejected
- limitation text rendered
