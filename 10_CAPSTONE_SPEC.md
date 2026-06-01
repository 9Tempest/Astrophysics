# 10 Capstone Spec: Spacetime Playground

The final project is a unified sandbox called `Spacetime Playground`.

## Modes

```text
Newtonian
Special Relativity
Schwarzschild Black Hole
FLRW Cosmology
Morris-Thorne Wormhole
Causal Graph / Time Machine Validator
```

## Objects

```text
planet
star
black hole
observer
photon
spaceship
wormhole mouth
galaxy
cosmic scale marker
causal event
```

## Visualizations

```text
trajectory
worldline
light cone
proper time counter
energy / momentum / angular momentum
metric interval
geodesic path
scale factor a(t)
redshift
causal graph cycle
energy condition status
```

## Checkers

```text
energy conservation
momentum conservation
angular momentum conservation
speed < c
spacetime interval classification
geodesic domain validity
CFL / numerical stability
Friedmann parameter validation
NEC/WEC condition flags
causal cycle / CTC detection
SAT consistency for paradox scenarios
```

## Suggested implementation plan

Do not build this first. Build it after the individual apps have produced reusable modules.

```text
1. Extract app registry and shared UI layout.
2. Extract physics modules and simulators.
3. Add a sandbox mode selector.
4. Add object placement and property inspector.
5. Add checker panel that changes by selected mode.
6. Add save/load for scenarios.
7. Add guided lesson scripts.
```

## Capstone success criteria

A learner should be able to create these scenarios:

```text
1. A Newtonian two-body orbit and see energy conservation.
2. A fast spaceship worldline and see proper time difference.
3. A photon passing near a black hole and see approximate deflection.
4. An expanding FLRW grid and see redshift/scale factor.
5. A wormhole-mouth time-offset scenario and detect a causal loop.
```
