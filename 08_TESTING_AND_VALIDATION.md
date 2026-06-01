# 08 Testing and Validation

## Why tests matter here

Physics apps can look visually plausible while being wrong. Tests should catch wrong units, wrong signs, invalid domains, and broken invariants.

## Test categories

### 1. Unit conversion tests

Examples:

```text
m -> km -> m returns original value
AU conversion matches constant
light-year conversion matches c * Julian year
parsec conversion positive and larger than light-year
```

### 2. Vector and geometry tests

```text
dot product
norm
normalization
polar/cartesian round trip
rotation preserves Euclidean norm
Lorentz transform preserves Minkowski interval
```

### 3. Numerical integrator tests

```text
Euler error decreases when dt decreases
RK4 solves simple ODE better than Euler for same dt
Velocity Verlet has lower long-term energy drift for harmonic oscillator
integrators do not mutate input state
```

### 4. Classical mechanics invariants

```text
isolated two-body forces are equal and opposite
center of mass velocity stays constant without external force
total momentum conserved in elastic collision
energy is approximately conserved for stable orbital integrator
```

### 5. Relativity tests

```text
gamma(0) = 1
gamma increases as v approaches c
v >= c is rejected
Minkowski interval invariant under Lorentz transform
proper time equals coordinate time for stationary observer
```

### 6. Cosmology tests

```text
z = 0 -> a = 1
a = 1/(1+z)
proper distance = a * comoving distance
Friedmann solver outputs finite monotonic a(t) for valid expanding presets
```

### 7. Wormhole / causality tests

```text
causal graph detects directed cycles
DAG reports no cycle
zero wormhole time offset does not create time-machine loop
known toy function flags expected energy-condition violation
constraint solver identifies satisfiable and unsatisfiable paradox scenarios
```

## Validation UI

Every app should show some kind of diagnostic:

```text
energy error
momentum error
angular momentum error
spacetime interval type
speed relative to c
CFL stability warning
redshift/domain warning
CTC/cycle warning
NEC/WEC condition flag
```

## CI suggestion

When the repo matures, add:

```text
npm run test
npm run typecheck
npm run lint
npm run build
```

Codex should run the relevant commands after each implementation task.
