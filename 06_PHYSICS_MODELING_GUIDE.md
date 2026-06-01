# 06 Physics Modeling Guide

This document tells Codex how to model the physics without overclaiming accuracy.

## Modeling levels

Use these labels in code comments and UI:

```text
exact formula          # algebraic formula under stated assumptions
numerical simulation   # simulated dynamics from explicit equations
weak-field approx      # valid far from strong gravity / low curvature
toy model              # concept demonstration, not physically complete
conceptual diagram     # visualization only, not a solver
```

## Classical mechanics

Core formulas:

```text
F = ma
p = mv
K = 1/2 mv^2
U_gravity = -GMm/r
F_gravity = G m1 m2 / r^2
L = r × p
v_escape = sqrt(2GM/r)
```

Classical invariants:

```text
total momentum
kinetic + potential energy
angular momentum
center of mass position/velocity
```

For N-body simulations, compute pairwise forces symmetrically to reduce momentum error.

## Waves and spectra

Use finite differences for the wave equation only after adding a stability/CFL warning.

For FFT-based apps, include sampling rate and Nyquist notes.

For blackbody apps, Planck curves may be scaled for visualization; label normalized plots clearly.

## Special relativity

Use c = 1 internally unless SI is specifically needed.

Core formulas:

```text
gamma = 1 / sqrt(1 - v^2/c^2)
interval: Δs² = c²Δt² - Δx² - Δy² - Δz²
proper time: dτ = dt * sqrt(1 - v²/c²)
E² = p²c² + m²c⁴
```

Classify intervals:

```text
Δs² > 0: timelike, possible causal relation for massive observer
Δs² = 0: lightlike, causal relation by light
Δs² < 0: spacelike, no causal relation in SR
```

Never allow a worldline segment whose speed exceeds c.

## General relativity intuition

Do not implement full Einstein equation solvers initially. Most apps should be labeled as metric-based, geodesic-based, weak-field, or conceptual.

Useful concept chain:

```text
metric -> interval -> geodesic -> curvature -> stress-energy intuition
```

Metric convention should be explicit. Recommended convention:

```text
signature: (+, -, -, -)
```

## Black holes

Core formula:

```text
Schwarzschild radius: r_s = 2GM/c²
```

For beginner apps, it is acceptable to use:

- exact `r_s` calculation
- effective-potential toy plots
- approximate weak-field light bending
- conceptual event horizon visualization

Any renderer near the horizon must label whether it is approximate.

## Cosmology

Core concepts:

```text
scale factor a(t)
redshift: 1 + z = 1/a, if a_now = 1
Friedmann-style expansion from Ω_m, Ω_r, Ω_Λ, Ω_k
```

Use numerical integration for `a(t)` and label chosen cosmological parameters.

## Wormholes and time-travel apps

Treat wormholes as theoretical metric/causality models, not engineering plans.

Important concepts:

```text
Morris-Thorne metric
throat radius
shape function b(r)
redshift function Phi(r)
flare-out condition
null/weak energy condition
closed timelike curve
causal graph cycle
```

For time-travel paradoxes, use CS tools:

```text
events -> nodes
causal influence -> directed edges
CTC/paradox risk -> directed cycle with time-order violation
self-consistent history -> satisfiable constraint assignment
```

Always show caveats:

- theoretical model
- no evidence of human-made traversable wormholes
- toy energy-condition calculations are not full semiclassical gravity

## Numerical safety

All physics functions should guard against:

```text
NaN
Infinity
negative sqrt arguments
r = 0 singularities
v >= c
invalid units
large dt instability
```
