# 04 Architecture

## Recommended repository structure

```text
spacetime-playground/
  AGENTS.md
  package.json
  vite.config.ts
  tsconfig.json
  src/
    main.tsx
    App.tsx
    appRegistry.ts
    constants/
      physicalConstants.ts
      units.ts
    physics/
      vector.ts
      units.ts
      integrators.ts
      ode.ts
      invariants.ts
      relativity.ts
      gravity.ts
      waves.ts
      thermodynamics.ts
      cosmology.ts
      wormholes.ts
      causalGraph.ts
    simulators/
      nbody.ts
      waveTank.ts
      spacetime.ts
      blackHole.ts
      universe.ts
    components/
      AppShell.tsx
      VisualizationPanel.tsx
      ControlPanel.tsx
      EquationPanel.tsx
      InvariantPanel.tsx
      ChallengePanel.tsx
      Plot.tsx
      Slider.tsx
      UnitInput.tsx
    apps/
      cosmic-scale-explorer/
        CosmicScaleExplorer.tsx
        lesson.ts
        challenges.ts
        tests-or-notes.md
      vector-field-playground/
        ...
    tests/
      physics/
        units.test.ts
        vector.test.ts
        integrators.test.ts
```

## Data model

Use app definitions like:

```ts
export interface LearningAppDefinition {
  id: string;
  phase: string;
  slug: string;
  title: string;
  concepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  route: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}
```

## Simulation state rule

A simulator should usually expose pure stepping functions:

```ts
export interface StepResult<S> {
  state: S;
  diagnostics: Record<string, number | string | boolean>;
}

export type Stepper<S, P> = (state: S, params: P, dt: number) => StepResult<S>;
```

React components should call these functions; they should not contain the physics logic themselves.

## Units

Classical mechanics:

```text
length: meter
mass: kilogram
time: second
energy: joule
angle: radian
```

Relativity modules:

```text
Use c = 1 internally when possible.
Display SI conversions in the UI.
Never allow v >= c.
```

Astronomy conversions:

```text
AU, light-year, parsec, solar mass, solar radius
```

## Integrators

Implement and test:

```text
Euler
RK4
Velocity Verlet
Optional: Leapfrog / symplectic Euler
```

Use Velocity Verlet or another symplectic method for long-running orbital demos. Use RK4 for general ODE demos and geodesic toy models.

## Rendering

- Canvas: particle systems, vector fields, wave simulations.
- SVG: diagrams, spacetime graphs, plots when small.
- Three.js: geodesic surfaces, embedding diagrams, 3D black-hole/wormhole views.

## Performance

- Keep simulation stepping separate from rendering.
- Cap max particle count in UI.
- Add pause and reset.
- Use seeded randomness for reproducible tests and demos.
