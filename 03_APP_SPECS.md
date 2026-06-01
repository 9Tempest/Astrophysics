# 03 App Specs

Each app has a stable ID. Codex should use the ID and slug for filenames, routes, tests, and task tracking.

## A1 — Cosmic Scale Explorer

**Slug:** `cosmic-scale-explorer`

**Concepts:** SI units, astronomical units, light-year, parsec, orders of magnitude

**MVP:** Log-scale explorer from atomic scale to observable-universe scale with unit conversions.

**UI elements:**
- log-scale slider
- object cards
- unit conversion panel
- scale ruler

**Physics / engine requirements:**
- unit conversion functions
- log10 scale mapping
- reference object data

**Challenge mode:**
- Find the scale gap between Earth and Sun
- Convert 1 parsec to light-years
- Place AU, ly, pc on the scale

**Acceptance tests:**
- unit conversions are reversible within tolerance
- log slider maps monotonically
- known constants match expected significant figures

**Depends on:** none

## A2 — Vector Field Playground

**Slug:** `vector-field-playground`

**Concepts:** vectors, position, velocity, acceleration, Cartesian and polar coordinates

**MVP:** A 2D canvas where users drag a particle and see position/velocity/acceleration vectors and coordinate transforms.

**UI elements:**
- draggable particle
- vector arrows
- coordinate system toggle
- numeric readout

**Physics / engine requirements:**
- Vec2 type
- cartesianToPolar
- polarToCartesian
- finite-difference velocity estimate

**Challenge mode:**
- Make velocity perpendicular to position
- Match a requested polar coordinate
- Create circular motion

**Acceptance tests:**
- coordinate transforms round-trip
- vector norms and dot products are correct
- angle normalization works

**Depends on:** A1

## A3 — Slope Field Lab

**Slug:** `slope-field-lab`

**Concepts:** derivatives, integrals, ODEs, slope fields, phase portraits

**MVP:** Plot dx/dt=f(x,t) and integrate trajectories from clicked initial conditions.

**UI elements:**
- formula selector
- slope field canvas
- click-to-seed trajectories
- time-step control

**Physics / engine requirements:**
- Euler integrator
- RK4 integrator
- ODE function registry

**Challenge mode:**
- Find a stable fixed point
- Compare Euler vs RK4
- Predict long-term behavior before running

**Acceptance tests:**
- RK4 solves dx/dt=x approximately
- Euler error decreases with smaller dt
- trajectory array has deterministic output

**Depends on:** A2

## A4 — Integrator Battle Arena

**Slug:** `integrator-battle-arena`

**Concepts:** numerical integration, Euler, RK4, Velocity Verlet, stability, energy drift

**MVP:** Run the same orbit or harmonic oscillator with several integrators and plot energy error over time.

**UI elements:**
- integrator toggles
- trajectory view
- energy error plot
- dt slider

**Physics / engine requirements:**
- Euler
- RK4
- Velocity Verlet
- energy computation

**Challenge mode:**
- Make Euler fail visibly
- Find dt where RK4 is stable
- Show why symplectic methods help orbital simulations

**Acceptance tests:**
- harmonic oscillator energy error behavior
- Verlet time reversibility sanity check
- integrators do not mutate inputs

**Depends on:** A3

## B1 — Force Sandbox

**Slug:** `force-sandbox`

**Concepts:** Newton's laws, force, mass, inertial frames, acceleration

**MVP:** 2D particle world with configurable forces: constant, spring, damping, gravity-like attraction.

**UI elements:**
- force palette
- particle inspector
- pause/step/play
- trajectory trails

**Physics / engine requirements:**
- force accumulator
- ParticleState
- mass handling
- fixed-step simulation loop

**Challenge mode:**
- Reach a target with a constant force
- Tune damping to stop at target
- Create stable spring oscillation

**Acceptance tests:**
- F=ma acceleration
- zero force keeps velocity constant
- fixed step deterministic

**Depends on:** A4

## B2 — Conservation Detective

**Slug:** `conservation-detective`

**Concepts:** momentum, kinetic energy, elastic collisions, inelastic collisions, invariants

**MVP:** Collision simulator that reports total momentum and energy before/after collisions.

**UI elements:**
- collision type selector
- before/after bars
- invariant panel
- error warning

**Physics / engine requirements:**
- 1D/2D collision solver
- momentum calculator
- energy calculator

**Challenge mode:**
- Create a perfectly elastic collision
- Detect an inelastic energy loss
- Minimize numerical error

**Acceptance tests:**
- elastic collision conserves momentum/energy
- inelastic collision conserves momentum
- edge cases with equal masses

**Depends on:** B1

## B3 — Action Minimizer

**Slug:** `action-minimizer`

**Concepts:** Lagrangian mechanics, action, least action, constraints, generalized coordinates

**MVP:** Users drag path control points between two events and see the action integral change.

**UI elements:**
- path editor
- action graph
- optimize button
- Lagrangian selector

**Physics / engine requirements:**
- discrete action integral
- simple gradient descent
- path interpolation

**Challenge mode:**
- Find the low-action path
- Compare free particle vs harmonic oscillator
- Explain why straight path wins for free particle

**Acceptance tests:**
- free-particle straight path has lower action
- discrete integral convergence
- optimizer reduces action

**Depends on:** A4, B2

## B4 — Gravity Well Simulator

**Slug:** `gravity-well-simulator`

**Concepts:** inverse-square gravity, gravitational potential, escape velocity, bound and unbound orbits

**MVP:** Launch particles around a central mass and classify fall, ellipse, parabola, or hyperbola behavior.

**UI elements:**
- central mass slider
- launch vector editor
- orbit classifier
- energy readout

**Physics / engine requirements:**
- Newtonian gravity
- specific orbital energy
- escape velocity
- Verlet orbit stepping

**Challenge mode:**
- Find circular orbit velocity
- Reach escape velocity
- Make a highly eccentric ellipse

**Acceptance tests:**
- escape velocity formula
- circular orbit speed formula
- energy sign classification

**Depends on:** A4, B1

## B5 — Kepler Law Verifier

**Slug:** `kepler-law-verifier`

**Concepts:** Kepler's laws, ellipses, swept area, period, semi-major axis

**MVP:** Adjust semi-major axis and eccentricity, then verify equal-area law and T^2 proportional to a^3.

**UI elements:**
- ellipse controls
- swept-area animation
- period plot
- law verification panel

**Physics / engine requirements:**
- ellipse parametric model
- area sweep estimator
- period calculator
- Kepler ratio checker

**Challenge mode:**
- Keep area rate constant
- Predict period after changing a
- Compare low/high eccentricity

**Acceptance tests:**
- T^2/a^3 constant for fixed central mass
- ellipse geometry correct
- area estimator converges

**Depends on:** B4

## B6 — Mini Solar System Engine

**Slug:** `mini-solar-system-engine`

**Concepts:** N-body gravity, center of mass, chaos, orbital stability, symplectic integration

**MVP:** Simulate Sun-Earth-Moon first, then allow adding Jupiter and custom bodies.

**UI elements:**
- body table
- orbit canvas
- integrator switch
- energy/angular momentum plots

**Physics / engine requirements:**
- N-body force calculation
- center-of-mass transform
- Verlet stepping
- RK4 comparison

**Challenge mode:**
- Keep Earth orbit stable for one year
- Add Jupiter and observe perturbation
- Compare integrator drift

**Acceptance tests:**
- pairwise forces equal and opposite
- center of mass constant without external forces
- energy drift below target for small dt

**Depends on:** B4, B5

## B7 — Tidal Force Explorer

**Slug:** `tidal-force-explorer`

**Concepts:** tidal forces, gravitational gradients, Roche limit, rings, disruption

**MVP:** Show near-side/far-side gravitational differences as a body approaches a massive object.

**UI elements:**
- two-body scene
- tidal vector arrows
- strength slider
- fragmentation animation

**Physics / engine requirements:**
- differential gravity
- Roche-limit estimate
- particle breakup model

**Challenge mode:**
- Predict disruption distance
- Make rings from fragments
- Compare fluid vs rigid limit

**Acceptance tests:**
- tidal gradient increases with proximity
- Roche estimate monotonic with density
- fragment particles conserve approximate momentum

**Depends on:** B6

## C1 — Wave Tank

**Slug:** `wave-tank`

**Concepts:** wave equation, frequency, amplitude, phase, interference, diffraction

**MVP:** Finite-difference 1D/2D wave simulation with sources, barriers, and slits.

**UI elements:**
- source painter
- barrier painter
- amplitude heatmap
- pause/step controls

**Physics / engine requirements:**
- finite difference wave equation
- CFL stability check
- boundary conditions

**Challenge mode:**
- Create constructive interference
- Build a double slit
- Find unstable dt and explain why

**Acceptance tests:**
- CFL warning triggers
- wave speed roughly matches parameter
- energy-like quantity behaves reasonably

**Depends on:** A4

## C2 — Spectrum Decomposer

**Slug:** `spectrum-decomposer`

**Concepts:** Fourier transform, spectra, frequency domain, absorption lines, observational data

**MVP:** Users draw waveforms; app computes and displays frequency spectrum via FFT.

**UI elements:**
- waveform editor
- spectrum plot
- component toggles
- stellar absorption mode

**Physics / engine requirements:**
- FFT wrapper
- sampling model
- line absorption overlay

**Challenge mode:**
- Find hidden frequency
- Reconstruct a square-like wave
- Identify absorption line shift

**Acceptance tests:**
- single sine produces peak
- sampling frequency affects Nyquist
- known line positions render correctly

**Depends on:** C1

## C3 — Doppler Shift Visualizer

**Slug:** `doppler-shift-visualizer`

**Concepts:** Doppler effect, redshift, blueshift, radial velocity, spectral lines

**MVP:** Move a star relative to observer and watch spectral lines shift in real time.

**UI elements:**
- velocity slider
- star-observer animation
- spectrum panel
- red/blue labels

**Physics / engine requirements:**
- classical Doppler approximation
- relativistic Doppler option
- line wavelength transform

**Challenge mode:**
- Infer velocity from shifted line
- Compare approaching/receding
- Toggle classical vs relativistic at high v

**Acceptance tests:**
- zero velocity gives no shift
- receding redshifts
- relativistic formula approaches classical for low v

**Depends on:** C2

## C4 — Blackbody Color Lab

**Slug:** `blackbody-color-lab`

**Concepts:** blackbody radiation, Planck curve, Wien displacement, Stefan-Boltzmann law, stellar color

**MVP:** Slider for temperature; plot spectrum and approximate perceived star color.

**UI elements:**
- temperature slider
- spectrum plot
- color swatch
- law cards

**Physics / engine requirements:**
- Planck function
- Wien peak
- luminosity proportionality
- approx color mapping

**Challenge mode:**
- Find peak wavelength for the Sun
- Compare red dwarf and blue star
- Estimate luminosity change with temperature

**Acceptance tests:**
- Wien peak within tolerance
- T^4 luminosity ratio
- Planck values finite for valid inputs

**Depends on:** C2

## C5 — Gas Particle Simulator

**Slug:** `gas-particle-simulator`

**Concepts:** temperature, pressure, Maxwell distribution, statistical mechanics, thermal equilibrium

**MVP:** Particles collide in a box; histogram velocities and compute temperature/pressure.

**UI elements:**
- particle box
- velocity histogram
- temperature readout
- wall pressure meter

**Physics / engine requirements:**
- elastic particle-wall collisions
- optional particle-particle collisions
- temperature estimator

**Challenge mode:**
- Double temperature and observe distribution
- Compress volume and observe pressure
- Reach equilibrium

**Acceptance tests:**
- wall collision conserves kinetic energy
- temperature tracks mean kinetic energy
- histogram normalization

**Depends on:** B2

## C6 — Fusion Energy Budget

**Slug:** `fusion-energy-budget`

**Concepts:** nuclear fusion, mass-energy equivalence, hydrogen burning, energy generation rate, stellar core

**MVP:** Simplified core model showing how tiny mass defect produces large energy release.

**UI elements:**
- core temperature/density sliders
- energy budget bars
- mass defect explanation
- warning for toy model

**Physics / engine requirements:**
- E=mc^2 calculator
- toy reaction rate scaling
- unit conversion

**Challenge mode:**
- Estimate energy from 1 kg mass defect
- Increase temperature and see rate effect
- Explain toy-model limitations

**Acceptance tests:**
- E=mc^2 conversion
- reaction rate monotonic with temperature
- invalid values rejected

**Depends on:** C4, C5

## C7 — Star Balance Simulator

**Slug:** `star-balance-simulator`

**Concepts:** hydrostatic equilibrium, pressure gradient, gravity, stellar layers, stability

**MVP:** Layered spherical star toy model: gravity inward, pressure outward, stable/expand/collapse status.

**UI elements:**
- layer diagram
- mass slider
- pressure profile plot
- stability indicator

**Physics / engine requirements:**
- shell model
- gravity per shell
- pressure gradient approximation
- stability heuristic

**Challenge mode:**
- Create stable star
- Trigger collapse
- Compare low/high mass

**Acceptance tests:**
- gravity increases with enclosed mass
- pressure gradient sign
- status classification deterministic

**Depends on:** C5, C6

## C8 — HR Diagram Explorer

**Slug:** `hr-diagram-explorer`

**Concepts:** Hertzsprung-Russell diagram, main sequence, red giants, white dwarfs, stellar evolution

**MVP:** Plot stars by temperature and luminosity; animate simplified evolution tracks for different masses.

**UI elements:**
- HR plot
- mass selector
- evolution timeline
- phase labels

**Physics / engine requirements:**
- toy mass-luminosity relation
- phase sequence model
- log-axis plotting

**Challenge mode:**
- Place the Sun
- Compare lifetime of massive and low-mass stars
- Identify evolutionary phase

**Acceptance tests:**
- mass-luminosity monotonic
- log axes valid
- phase sequence order

**Depends on:** C4, C7

## D1 — Light Clock Simulator

**Slug:** `light-clock-simulator`

**Concepts:** constancy of light speed, time dilation, inertial frames, light clock

**MVP:** Compare a stationary light clock and moving light clock with path-length geometry.

**UI elements:**
- speed slider
- two observer views
- gamma readout
- light path trace

**Physics / engine requirements:**
- Lorentz gamma
- light clock geometry
- units with c=1 option

**Challenge mode:**
- Find speed for gamma=2
- Explain longer light path
- Compare proper and coordinate time

**Acceptance tests:**
- gamma(0)=1
- gamma increases with v
- reject v>=c

**Depends on:** C1

## D2 — Lorentz Transformer

**Slug:** `lorentz-transformer`

**Concepts:** Lorentz transformation, space-time mixing, simultaneity, inertial frames

**MVP:** Input events and velocity; display transformed coordinates and tilted spacetime grid.

**UI elements:**
- event table
- velocity slider
- Minkowski grid
- coordinate readout

**Physics / engine requirements:**
- lorentzTransform1D
- inverse transform
- interval checker

**Challenge mode:**
- Make two events simultaneous in one frame
- Verify inverse transform
- Preserve spacetime interval

**Acceptance tests:**
- interval invariant
- inverse recovers original
- low-speed limit approx identity

**Depends on:** D1

## D3 — Spacetime Diagram Editor

**Slug:** `spacetime-diagram-editor`

**Concepts:** worldlines, light cones, timelike/spacelike/lightlike intervals, causality

**MVP:** Users draw events and worldlines; app classifies intervals and causal reachability.

**UI elements:**
- event editor
- light-cone overlay
- worldline drawing
- interval classifier

**Physics / engine requirements:**
- minkowskiInterval
- interval classifier
- causal reachability

**Challenge mode:**
- Connect two timelike events
- Find spacelike separated pair
- Draw physically possible worldline

**Acceptance tests:**
- classification thresholds
- light cone boundary
- worldline speed constraint

**Depends on:** D2

## D4 — Proper Time Race

**Slug:** `proper-time-race`

**Concepts:** proper time, twin paradox, worldline length, accelerated turnaround

**MVP:** Two travelers follow different worldlines and reunite; app computes elapsed proper time.

**UI elements:**
- worldline editor
- proper-time counters
- traveler avatars
- speed warnings

**Physics / engine requirements:**
- piecewise worldline integration
- proper time integral
- speed validator

**Challenge mode:**
- Make traveler age less
- Compare straight vs kinked worldline
- Avoid superluminal segments

**Acceptance tests:**
- straight inertial path maximizes proper time between timelike events
- zero velocity proper=time
- invalid paths rejected

**Depends on:** D3

## D5 — Relativistic Rocket Lab

**Slug:** `relativistic-rocket-lab`

**Concepts:** relativistic energy, momentum, velocity limit, rocket acceleration, rapidity

**MVP:** Continuous acceleration model showing speed approaching but not exceeding light speed.

**UI elements:**
- thrust slider
- velocity/gamma plot
- energy meter
- mission clock

**Physics / engine requirements:**
- relativistic velocity update
- gamma
- energy-momentum relation

**Challenge mode:**
- Reach 0.9c
- Estimate energy cost
- Compare proper and coordinate acceleration toy models

**Acceptance tests:**
- velocity remains below c
- energy increases with gamma
- low-speed kinetic energy approximation

**Depends on:** D1, D2

## E1 — Einstein Elevator

**Slug:** `einstein-elevator`

**Concepts:** equivalence principle, acceleration, free fall, local inertial frames, gravity vs acceleration

**MVP:** Elevator scenarios: resting on Earth, accelerating in space, and free-falling.

**UI elements:**
- scenario selector
- ball/light ray animation
- clock visualization
- observer notes

**Physics / engine requirements:**
- constant acceleration kinematics
- local frame comparison
- light ray bending cartoon model

**Challenge mode:**
- Identify indistinguishable cases
- Predict ball path
- Explain local vs global limitation

**Acceptance tests:**
- free-fall relative acceleration zero
- accelerated frame pseudo-force
- scenario labels consistent

**Depends on:** D3

## E2 — Geodesic on Surfaces

**Slug:** `geodesic-on-surfaces`

**Concepts:** geodesics, curved surfaces, intrinsic geometry, Christoffel symbols, shortest paths

**MVP:** Launch particles on sphere, saddle, and torus surfaces along geodesic paths.

**UI elements:**
- surface selector
- launch controls
- 3D surface view
- geodesic trace

**Physics / engine requirements:**
- surface parameterization
- geodesic ODE
- numerical integration

**Challenge mode:**
- Find great circle
- Compare Euclidean straightness vs surface straightness
- Observe geodesic divergence

**Acceptance tests:**
- sphere great circle sanity check
- state remains on parameter domain
- stepper deterministic

**Depends on:** A4, D3

## E3 — Metric Playground

**Slug:** `metric-playground`

**Concepts:** metric tensor, distance, spacetime interval, Euclidean, Minkowski, spherical coordinates

**MVP:** Choose a metric and see how the same coordinate difference has different length/interval.

**UI elements:**
- metric selector
- coordinate delta editor
- distance/interval result
- matrix display

**Physics / engine requirements:**
- metric matrix functions
- bilinear form
- signature classifier

**Challenge mode:**
- Find zero interval in Minkowski
- Compare Euclidean vs spherical distance
- Explain metric signature

**Acceptance tests:**
- Euclidean norm
- Minkowski interval
- matrix symmetry

**Depends on:** D2, E2

## E4 — Tensor Transformation Lab

**Slug:** `tensor-transformation-lab`

**Concepts:** tensors, coordinate transformations, components vs objects, index notation, Lorentz transforms

**MVP:** Transform vector/tensor components under rotations, scalings, and Lorentz boosts while invariant quantities remain fixed.

**UI elements:**
- basis editor
- component table
- before/after diagram
- invariant checker

**Physics / engine requirements:**
- matrix transforms
- covariant/contravariant toy model
- invariant contraction

**Challenge mode:**
- Preserve vector length under rotation
- Show components change under basis change
- Use Lorentz boost and preserve interval

**Acceptance tests:**
- rotation preserves Euclidean norm
- Lorentz preserves Minkowski interval
- inverse transform consistency

**Depends on:** E3

## E5 — Parallel Transport Game

**Slug:** `parallel-transport-game`

**Concepts:** curvature, parallel transport, holonomy, sphere, local flatness

**MVP:** Move an arrow around a closed path on a sphere and show it returns rotated.

**UI elements:**
- sphere map
- path drawer
- transported arrow
- angle difference readout

**Physics / engine requirements:**
- parallel transport approximation
- sphere path geometry
- holonomy estimator

**Challenge mode:**
- Make zero holonomy path
- Increase enclosed area and observe angle
- Explain curvature from transport

**Acceptance tests:**
- small loop small rotation
- equator loop sanity
- deterministic transport

**Depends on:** E2, E3

## E6 — Curvature-Matter Sandbox

**Slug:** `curvature-matter-sandbox`

**Concepts:** Einstein field equation intuition, stress-energy, curvature, geodesic motion, source fields

**MVP:** Conceptual toy model: draw energy density and see a generated curvature/potential field; particles follow geodesic-like paths.

**UI elements:**
- density painter
- curvature heatmap
- particle launcher
- explanation panel

**Physics / engine requirements:**
- Poisson-like toy solver
- field gradient
- particle stepping

**Challenge mode:**
- Create lens-like curvature
- Compare high/low density
- Explain why this is not full GR

**Acceptance tests:**
- symmetric density gives symmetric field
- field responds monotonically to density
- toy solver stable

**Depends on:** E3, E5

## F1 — Black Hole Orbit Lab

**Slug:** `black-hole-orbit-lab`

**Concepts:** Schwarzschild black hole, event horizon, Schwarzschild radius, stable and unstable orbits, photon paths

**MVP:** Show orbits around a Schwarzschild black hole with horizon radius and basic orbit classes.

**UI elements:**
- black hole mass slider
- launch controls
- horizon overlay
- orbit classification

**Physics / engine requirements:**
- Schwarzschild radius
- effective potential toy model
- geodesic-inspired stepping

**Challenge mode:**
- Find stable orbit
- Send photon near photon sphere
- Fall through horizon

**Acceptance tests:**
- rs=2GM/c^2
- horizon scales linearly with mass
- classification thresholds deterministic

**Depends on:** B4, E3

## F2 — Gravity Clock Comparator

**Slug:** `gravity-clock-comparator`

**Concepts:** gravitational time dilation, redshift, Schwarzschild radius, observer at infinity

**MVP:** Place clocks at different radii around a black hole and compare tick rates for a far observer.

**UI elements:**
- clock placement
- tick animations
- redshift meter
- radius slider

**Physics / engine requirements:**
- Schwarzschild time dilation factor
- valid radius checks
- redshift estimate

**Challenge mode:**
- Make lower clock run slower
- Approach horizon and observe factor
- Explain far vs local observer

**Acceptance tests:**
- factor approaches 1 far away
- factor decreases near horizon
- invalid radius handled

**Depends on:** F1, D4

## F3 — Gravitational Lens Renderer

**Slug:** `gravitational-lens-renderer`

**Concepts:** light bending, null geodesics, gravitational lensing, Einstein ring, black hole shadow

**MVP:** Background star field distorted by a central mass using approximate ray deflection.

**UI elements:**
- mass slider
- background image/grid
- ray overlay
- ring indicator

**Physics / engine requirements:**
- weak-field deflection approximation
- ray mapping
- optional Schwarzschild ray tracer later

**Challenge mode:**
- Create Einstein ring alignment
- Increase lens mass
- Compare ray overlay and rendered distortion

**Acceptance tests:**
- deflection increases with mass
- deflection decreases with impact parameter
- zero mass identity mapping

**Depends on:** F1, C1

## F4 — Accretion Disk Simulator

**Slug:** `accretion-disk-simulator`

**Concepts:** accretion disk, angular momentum, viscosity, heating, inspiral

**MVP:** Particles orbit a black hole; simple viscosity causes inspiral and heating color changes.

**UI elements:**
- particle disk view
- viscosity slider
- temperature color legend
- angular momentum plot

**Physics / engine requirements:**
- particle orbits
- damping/viscosity toy model
- temperature heuristic

**Challenge mode:**
- Create stable disk
- Increase viscosity and observe inflow
- Explain toy limitations

**Acceptance tests:**
- with zero viscosity angular momentum roughly conserved
- viscosity reduces orbital energy
- temperature heuristic bounded

**Depends on:** F1, B6

## F5 — Frame Dragging Explorer

**Slug:** `frame-dragging-explorer`

**Concepts:** Kerr black hole, spin, frame dragging, ergosphere, rotating spacetime

**MVP:** Conceptual visualization of rotating black hole dragging nearby trajectories as spin changes.

**UI elements:**
- spin slider
- ergosphere overlay
- trajectory field
- advanced notes

**Physics / engine requirements:**
- Kerr parameter toy constraints
- frame-dragging vector field approximation
- ergosphere shape cartoon

**Challenge mode:**
- Increase spin and observe ergosphere
- Compare prograde/retrograde paths
- Explain why this is a toy model

**Acceptance tests:**
- spin range validation
- zero spin reduces to non-rotating view
- ergosphere grows with spin heuristic

**Depends on:** F1, E6

## F6 — Horizon Thermodynamics Toy Model

**Slug:** `horizon-thermodynamics-toy-model`

**Concepts:** black hole thermodynamics, horizon area, entropy, Hawking radiation, evaporation

**MVP:** Concept panel showing black hole mass, horizon area, temperature, and evaporation-time scale.

**UI elements:**
- mass slider
- area/temperature bars
- evaporation timeline
- toy-model disclaimer

**Physics / engine requirements:**
- area proportionality
- temperature inverse to mass
- evaporation time scaling M^3

**Challenge mode:**
- Compare stellar vs tiny black hole
- Explain inverse mass-temperature relation
- Estimate scale differences

**Acceptance tests:**
- temperature decreases with mass
- area increases with mass squared
- evaporation time increases with mass cubed

**Depends on:** F1

## G1 — Binary Inspiral Simulator

**Slug:** `binary-inspiral-simulator`

**Concepts:** binary systems, center of mass, inspiral, gravitational wave energy loss, orbital frequency

**MVP:** Two compact objects orbit and slowly inspiral under a simplified energy-loss term.

**UI elements:**
- mass controls
- orbit view
- separation/frequency plot
- merge marker

**Physics / engine requirements:**
- two-body orbit
- toy radiation reaction
- frequency estimate

**Challenge mode:**
- Make chirp faster
- Compare equal vs unequal masses
- Observe separation shrinking

**Acceptance tests:**
- center of mass stays fixed without loss
- loss shrinks separation
- frequency increases as separation decreases

**Depends on:** B6, F1

## G2 — Gravitational Wave Chirp Lab

**Slug:** `gravitational-wave-chirp-lab`

**Concepts:** gravitational wave, chirp, waveform, frequency sweep, compact-object merger

**MVP:** Generate a simplified chirp waveform from masses and play/plot the signal.

**UI elements:**
- mass sliders
- waveform plot
- audio playback
- spectrogram option

**Physics / engine requirements:**
- toy chirp generator
- normalization
- audio buffer creation

**Challenge mode:**
- Hear frequency increase
- Compare heavier/lighter binaries
- Match chirp to inspiral view

**Acceptance tests:**
- waveform finite
- frequency increases over time
- normalization bounds output

**Depends on:** G1, C2

## G3 — LIGO Signal Hunter

**Slug:** `ligo-signal-hunter`

**Concepts:** detection, noise, matched filtering, correlation, signal-to-noise ratio

**MVP:** Hide a chirp in noisy data; users choose templates and find correlation peaks.

**UI elements:**
- noisy signal plot
- template selector
- correlation graph
- detection score

**Physics / engine requirements:**
- noise generator
- template bank
- cross-correlation
- SNR heuristic

**Challenge mode:**
- Detect hidden chirp
- Choose best template
- Reduce false positives

**Acceptance tests:**
- correlation peak at injected signal
- wrong template lower score
- noise seeded reproducibly

**Depends on:** G2

## H1 — Galaxy Distribution Viewer

**Slug:** `galaxy-distribution-viewer`

**Concepts:** cosmological principle, homogeneity, isotropy, large-scale structure, averaging

**MVP:** Random/clustered galaxy field that appears structured locally and smoother when averaged over larger scales.

**UI elements:**
- zoom control
- averaging window
- galaxy map
- statistics panel

**Physics / engine requirements:**
- random distributions
- cluster generation
- density averaging

**Challenge mode:**
- Find scale where distribution looks homogeneous
- Compare isotropic vs anisotropic
- Explain averaging

**Acceptance tests:**
- density average converges for random distribution
- cluster settings change variance
- seed reproducibility

**Depends on:** A1

## H2 — Expanding Grid Universe

**Slug:** `expanding-grid-universe`

**Concepts:** scale factor, expanding space, comoving coordinates, proper distance, Hubble flow

**MVP:** Grid expands with scale factor a(t), showing galaxies fixed in comoving coordinates while proper distances grow.

**UI elements:**
- scale-factor slider
- grid animation
- comoving/proper readout
- galaxy markers

**Physics / engine requirements:**
- comoving to proper conversion
- simple a(t) presets
- distance tracking

**Challenge mode:**
- Double scale factor
- Explain why galaxies are not flying through local space
- Compare nearby/far distances

**Acceptance tests:**
- proper distance = a * comoving
- comoving coordinates unchanged
- distance ratios scale correctly

**Depends on:** H1

## H3 — Universe Equation Solver

**Slug:** `universe-equation-solver`

**Concepts:** Friedmann equation, matter, radiation, dark energy, curvature, cosmic fate

**MVP:** Solve simplified Friedmann equation for a(t) from Ω parameters and plot past/future expansion.

**UI elements:**
- Ω sliders
- a(t) plot
- fate label
- component density chart

**Physics / engine requirements:**
- Friedmann RHS
- ODE integration
- parameter normalization/checks

**Challenge mode:**
- Make accelerating universe
- Make recollapsing toy universe
- Compare matter vs radiation dominated

**Acceptance tests:**
- flat parameter sum check
- known simple cases monotonic
- invalid negative density handled

**Depends on:** H2, A4

## H4 — Cosmic Redshift Calculator

**Slug:** `cosmic-redshift-calculator`

**Concepts:** cosmological redshift, lookback time, comoving distance, scale factor, distance ladder

**MVP:** Input redshift z; output scale factor, approximate lookback time, and distance from selected cosmology.

**UI elements:**
- z input
- distance cards
- timeline marker
- spectrum redshift preview

**Physics / engine requirements:**
- a=1/(1+z)
- numerical integral hooks
- approx cosmology presets

**Challenge mode:**
- Find scale factor at z=1
- Compare redshift and lookback time
- Shift a spectral line

**Acceptance tests:**
- z=0 gives a=1
- a formula exact
- distance monotonic with z

**Depends on:** H3, C3

## H5 — CMB Pixel Universe

**Slug:** `cmb-pixel-universe`

**Concepts:** cosmic microwave background, temperature fluctuations, early universe, power spectrum, recombination

**MVP:** Generate a sphere/2D map of small temperature fluctuations with adjustable large/small scale power.

**UI elements:**
- CMB map
- power sliders
- histogram
- scale explanation

**Physics / engine requirements:**
- seeded noise
- frequency-domain filtering
- temperature perturbation scaling

**Challenge mode:**
- Increase large-scale structure
- Suppress small scales
- Explain fluctuation amplitude

**Acceptance tests:**
- seed reproducible
- mean near baseline
- power sliders affect variance by band

**Depends on:** C2, H3

## H6 — Galaxy Rotation Curve Lab

**Slug:** `galaxy-rotation-curve-lab`

**Concepts:** dark matter, galaxy rotation curves, mass profiles, halo, orbital velocity

**MVP:** Compute rotation curves from visible matter alone and with a dark-matter halo.

**UI elements:**
- mass profile controls
- rotation curve plot
- halo toggle
- galaxy diagram

**Physics / engine requirements:**
- v=sqrt(GM(r)/r)
- disk/bulge toy profile
- halo profile toy model

**Challenge mode:**
- Flatten the rotation curve
- Compare no halo vs halo
- Infer hidden mass

**Acceptance tests:**
- velocity increases with enclosed mass
- halo can flatten curve
- no divide-by-zero at r=0

**Depends on:** B4, H1

## H7 — Dark Energy Slider

**Slug:** `dark-energy-slider`

**Concepts:** dark energy, cosmological constant, accelerating expansion, future universe, density parameters

**MVP:** Adjust ΩΛ and observe future scale-factor acceleration/deceleration.

**UI elements:**
- ΩΛ slider
- future a(t) plot
- acceleration indicator
- comparison presets

**Physics / engine requirements:**
- Friedmann solver reuse
- acceleration heuristic
- scenario comparison

**Challenge mode:**
- Make expansion accelerate
- Reduce dark energy
- Compare present and far future

**Acceptance tests:**
- higher ΩΛ increases late-time expansion rate
- solver stable for valid params
- presets load correctly

**Depends on:** H3

## H8 — Cosmic Timeline Builder

**Slug:** `cosmic-timeline-builder`

**Concepts:** cosmic history, inflation, nucleosynthesis, CMB, galaxy formation, stellar eras

**MVP:** Interactive logarithmic timeline from early universe to today with cards and linked mini simulations.

**UI elements:**
- log timeline
- event cards
- temperature/scale annotations
- links to apps

**Physics / engine requirements:**
- timeline data
- log time mapping
- cross-link registry

**Challenge mode:**
- Order key events
- Find CMB epoch
- Connect cosmic phases to apps

**Acceptance tests:**
- timeline order valid
- log mapping monotonic
- event links resolve

**Depends on:** H3, H4, H5

## I1 — Wormhole Taxonomy Explorer

**Slug:** `wormhole-taxonomy-explorer`

**Concepts:** Einstein-Rosen bridge, traversable wormhole, Morris-Thorne wormhole, shortcut geometry, stability

**MVP:** Compare three wormhole-like concepts and label traversability, stability, and exotic-matter requirements.

**UI elements:**
- mode selector
- comparison cards
- embedding sketch
- caveat panel

**Physics / engine requirements:**
- taxonomy data model
- concept flags
- diagram presets

**Challenge mode:**
- Classify a wormhole scenario
- Explain traversable vs non-traversable
- Identify missing physics

**Acceptance tests:**
- taxonomy flags consistent
- cards render all caveats
- mode switching deterministic

**Depends on:** F1, E3

## I2 — Wormhole Metric Builder

**Slug:** `wormhole-metric-builder`

**Concepts:** Morris-Thorne metric, throat, redshift function, shape function, flare-out condition

**MVP:** Choose shape/redshift functions and visualize throat geometry plus basic validity checks.

**UI elements:**
- function selector
- parameter sliders
- embedding plot
- condition checker

**Physics / engine requirements:**
- shape function b(r)
- redshift function Phi(r)
- throat solver
- flare-out heuristic

**Challenge mode:**
- Create a valid throat
- Avoid horizon-like redshift
- Explain shape function

**Acceptance tests:**
- throat detection
- flare-out condition sign
- invalid functions handled

**Depends on:** I1, E3

## I3 — Embedding Diagram Renderer

**Slug:** `embedding-diagram-renderer`

**Concepts:** embedding diagram, spatial slice, wormhole throat, curved geometry, visual analogy

**MVP:** Three.js surface rendering of a wormhole spatial slice with adjustable throat radius.

**UI elements:**
- 3D surface
- throat radius slider
- wireframe toggle
- camera controls

**Physics / engine requirements:**
- mesh generation
- embedding function sampler
- domain validation

**Challenge mode:**
- Increase throat radius
- Compare shallow/deep throat
- Explain what embedding hides

**Acceptance tests:**
- mesh finite
- symmetry about throat
- parameter changes regenerate mesh

**Depends on:** I2

## I4 — Energy Condition Checker

**Slug:** `energy-condition-checker`

**Concepts:** null energy condition, weak energy condition, stress-energy, exotic matter, wormhole constraints

**MVP:** Compute simplified energy-condition flags for selected wormhole toy functions.

**UI elements:**
- metric/function selector
- NEC/WEC status cards
- radial plot
- interpretation panel

**Physics / engine requirements:**
- toy stress-energy expressions
- NEC evaluator
- WEC evaluator
- sampling over radius

**Challenge mode:**
- Find NEC violation
- Compare functions
- Explain exotic matter caveat

**Acceptance tests:**
- known toy function violates expected condition
- sampler handles singular points
- status aggregation correct

**Depends on:** I2

## I5 — Traversability Stress Test

**Slug:** `traversability-stress-test`

**Concepts:** tidal forces, traveler constraints, proper acceleration, wormhole traversal, human-scale limits

**MVP:** Simulate a traveler path through a wormhole and flag excessive tidal acceleration in a toy model.

**UI elements:**
- traveler path
- speed slider
- tidal stress meter
- safe/unsafe banner

**Physics / engine requirements:**
- tidal acceleration heuristic
- path sampler
- threshold checker

**Challenge mode:**
- Find safe traversal parameters
- Increase throat size
- Explain why tidal forces matter

**Acceptance tests:**
- stress decreases with larger throat heuristic
- threshold comparison correct
- path sampling finite

**Depends on:** I2, B7

## I6 — Wormhole Time Machine Lab

**Slug:** `wormhole-time-machine-lab`

**Concepts:** wormhole mouths, time shift, time dilation, closed timelike curves, causality violation

**MVP:** Two wormhole mouths; one is moved relativistically to create time offset. App checks whether a signal loop returns to its own past.

**UI elements:**
- two-mouth diagram
- mouth travel controls
- signal route editor
- CTC warning

**Physics / engine requirements:**
- time dilation from Lorentz gamma
- wormhole mouth time offset
- causal loop detector
- route timing

**Challenge mode:**
- Create time offset
- Find a closed causal loop
- Avoid CTC with parameter constraints

**Acceptance tests:**
- time dilation offset grows with speed/duration
- loop detection identifies past return
- no loop for zero offset

**Depends on:** D4, I2, I7

## I7 — Causality Loop Detector

**Slug:** `causality-loop-detector`

**Concepts:** causal graph, events, directed cycles, closed timelike curves, partial order

**MVP:** Users create events and causal links; app detects cycles and labels causality violations.

**UI elements:**
- event graph editor
- edge type selector
- cycle highlight
- explanation log

**Physics / engine requirements:**
- directed graph
- cycle detection
- time-order validator
- reachability

**Challenge mode:**
- Build an acyclic causal history
- Create a paradoxical loop
- Repair the graph

**Acceptance tests:**
- DAG no cycle
- simple cycle found
- self-loop found
- cycle highlighting returns path

**Depends on:** D3

## I8 — Paradox Simulator

**Slug:** `paradox-simulator`

**Concepts:** grandfather paradox, self-consistency, constraints, SAT/CSP, many-worlds as interpretation

**MVP:** Model causal rules as Boolean constraints and check whether any self-consistent history exists.

**UI elements:**
- rule builder
- event truth table
- solver result
- scenario templates

**Physics / engine requirements:**
- Boolean constraint representation
- brute-force SAT for small N
- conflict explainer

**Challenge mode:**
- Create inconsistent history
- Repair it
- Find a self-consistent loop

**Acceptance tests:**
- known satisfiable scenario
- known unsatisfiable scenario
- solver enumerates assignments

**Depends on:** I7

## I9 — Chronology Protection Toy Model

**Slug:** `chronology-protection-toy-model`

**Concepts:** chronology protection, vacuum fluctuations, semiclassical gravity, CTC formation, physical instability

**MVP:** Conceptual graph: as CTC threshold approaches, toy field energy diverges or grows sharply.

**UI elements:**
- threshold slider
- energy growth plot
- CTC boundary
- caveat panel

**Physics / engine requirements:**
- toy divergence function
- stability flag
- parameter clamps

**Challenge mode:**
- Approach threshold
- Explain why this is not proof
- Compare stable/unstable settings

**Acceptance tests:**
- energy grows near threshold
- no NaN before clamp
- caveat always visible

**Depends on:** I6, I7

## I10 — Negative Energy Sandbox

**Slug:** `negative-energy-sandbox`

**Concepts:** negative energy, Casimir-like toy model, quantum field effects, semiclassical limitations, exotic matter

**MVP:** Toy Casimir-style panel: plate separation changes a conceptual negative energy density plot; explicitly labels limitations.

**UI elements:**
- plate separation slider
- energy density plot
- scale warning
- wormhole requirement comparison

**Physics / engine requirements:**
- toy inverse-fourth scaling
- unit-scale notes
- safety/caveat text

**Challenge mode:**
- Decrease separation and observe energy magnitude
- Explain why microscopic effects don't imply macroscopic wormholes
- Connect to NEC checker

**Acceptance tests:**
- magnitude increases as separation decreases
- invalid separation rejected
- limitation text rendered

**Depends on:** I4
