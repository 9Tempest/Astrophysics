# 02 Learning Roadmap

## Phase A: 数学与模拟基本功
**Goal:** Build the numerical and visualization primitives used everywhere else.

| ID | App | Concepts | Output |
|---|---|---|---|
| A1 | Cosmic Scale Explorer | SI units, astronomical units, light-year | Log-scale explorer from atomic scale to observable-universe scale with unit conversions. |
| A2 | Vector Field Playground | vectors, position, velocity | A 2D canvas where users drag a particle and see position/velocity/acceleration vectors and coordinate transforms. |
| A3 | Slope Field Lab | derivatives, integrals, ODEs | Plot dx/dt=f(x,t) and integrate trajectories from clicked initial conditions. |
| A4 | Integrator Battle Arena | numerical integration, Euler, RK4 | Run the same orbit or harmonic oscillator with several integrators and plot energy error over time. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase B: 经典力学与轨道
**Goal:** Build intuition for forces, conservation laws, gravity, orbits, and N-body dynamics.

| ID | App | Concepts | Output |
|---|---|---|---|
| B1 | Force Sandbox | Newton's laws, force, mass | 2D particle world with configurable forces: constant, spring, damping, gravity-like attraction. |
| B2 | Conservation Detective | momentum, kinetic energy, elastic collisions | Collision simulator that reports total momentum and energy before/after collisions. |
| B3 | Action Minimizer | Lagrangian mechanics, action, least action | Users drag path control points between two events and see the action integral change. |
| B4 | Gravity Well Simulator | inverse-square gravity, gravitational potential, escape velocity | Launch particles around a central mass and classify fall, ellipse, parabola, or hyperbola behavior. |
| B5 | Kepler Law Verifier | Kepler's laws, ellipses, swept area | Adjust semi-major axis and eccentricity, then verify equal-area law and T^2 proportional to a^3. |
| B6 | Mini Solar System Engine | N-body gravity, center of mass, chaos | Simulate Sun-Earth-Moon first, then allow adding Jupiter and custom bodies. |
| B7 | Tidal Force Explorer | tidal forces, gravitational gradients, Roche limit | Show near-side/far-side gravitational differences as a body approaches a massive object. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase C: 波、光、热与恒星
**Goal:** Understand how astronomical information comes from light and how stars work.

| ID | App | Concepts | Output |
|---|---|---|---|
| C1 | Wave Tank | wave equation, frequency, amplitude | Finite-difference 1D/2D wave simulation with sources, barriers, and slits. |
| C2 | Spectrum Decomposer | Fourier transform, spectra, frequency domain | Users draw waveforms; app computes and displays frequency spectrum via FFT. |
| C3 | Doppler Shift Visualizer | Doppler effect, redshift, blueshift | Move a star relative to observer and watch spectral lines shift in real time. |
| C4 | Blackbody Color Lab | blackbody radiation, Planck curve, Wien displacement | Slider for temperature; plot spectrum and approximate perceived star color. |
| C5 | Gas Particle Simulator | temperature, pressure, Maxwell distribution | Particles collide in a box; histogram velocities and compute temperature/pressure. |
| C6 | Fusion Energy Budget | nuclear fusion, mass-energy equivalence, hydrogen burning | Simplified core model showing how tiny mass defect produces large energy release. |
| C7 | Star Balance Simulator | hydrostatic equilibrium, pressure gradient, gravity | Layered spherical star toy model: gravity inward, pressure outward, stable/expand/collapse status. |
| C8 | HR Diagram Explorer | Hertzsprung-Russell diagram, main sequence, red giants | Plot stars by temperature and luminosity; animate simplified evolution tracks for different masses. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase D: 狭义相对论
**Goal:** Understand spacetime, time dilation, proper time, and causal structure in flat spacetime.

| ID | App | Concepts | Output |
|---|---|---|---|
| D1 | Light Clock Simulator | constancy of light speed, time dilation, inertial frames | Compare a stationary light clock and moving light clock with path-length geometry. |
| D2 | Lorentz Transformer | Lorentz transformation, space-time mixing, simultaneity | Input events and velocity; display transformed coordinates and tilted spacetime grid. |
| D3 | Spacetime Diagram Editor | worldlines, light cones, timelike/spacelike/lightlike intervals | Users draw events and worldlines; app classifies intervals and causal reachability. |
| D4 | Proper Time Race | proper time, twin paradox, worldline length | Two travelers follow different worldlines and reunite; app computes elapsed proper time. |
| D5 | Relativistic Rocket Lab | relativistic energy, momentum, velocity limit | Continuous acceleration model showing speed approaching but not exceeding light speed. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase E: 广义相对论前置
**Goal:** Convert the intuition of gravity from force to geometry.

| ID | App | Concepts | Output |
|---|---|---|---|
| E1 | Einstein Elevator | equivalence principle, acceleration, free fall | Elevator scenarios: resting on Earth, accelerating in space, and free-falling. |
| E2 | Geodesic on Surfaces | geodesics, curved surfaces, intrinsic geometry | Launch particles on sphere, saddle, and torus surfaces along geodesic paths. |
| E3 | Metric Playground | metric tensor, distance, spacetime interval | Choose a metric and see how the same coordinate difference has different length/interval. |
| E4 | Tensor Transformation Lab | tensors, coordinate transformations, components vs objects | Transform vector/tensor components under rotations, scalings, and Lorentz boosts while invariant quantities remain fixed. |
| E5 | Parallel Transport Game | curvature, parallel transport, holonomy | Move an arrow around a closed path on a sphere and show it returns rotated. |
| E6 | Curvature-Matter Sandbox | Einstein field equation intuition, stress-energy, curvature | Conceptual toy model: draw energy density and see a generated curvature/potential field; particles follow geodesic-like paths. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase F: 黑洞与强引力
**Goal:** Use metrics, horizons, and geodesic intuition to model black holes.

| ID | App | Concepts | Output |
|---|---|---|---|
| F1 | Black Hole Orbit Lab | Schwarzschild black hole, event horizon, Schwarzschild radius | Show orbits around a Schwarzschild black hole with horizon radius and basic orbit classes. |
| F2 | Gravity Clock Comparator | gravitational time dilation, redshift, Schwarzschild radius | Place clocks at different radii around a black hole and compare tick rates for a far observer. |
| F3 | Gravitational Lens Renderer | light bending, null geodesics, gravitational lensing | Background star field distorted by a central mass using approximate ray deflection. |
| F4 | Accretion Disk Simulator | accretion disk, angular momentum, viscosity | Particles orbit a black hole; simple viscosity causes inspiral and heating color changes. |
| F5 | Frame Dragging Explorer | Kerr black hole, spin, frame dragging | Conceptual visualization of rotating black hole dragging nearby trajectories as spin changes. |
| F6 | Horizon Thermodynamics Toy Model | black hole thermodynamics, horizon area, entropy | Concept panel showing black hole mass, horizon area, temperature, and evaporation-time scale. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase G: 引力波与双星系统
**Goal:** Connect compact-object dynamics to observable spacetime waves.

| ID | App | Concepts | Output |
|---|---|---|---|
| G1 | Binary Inspiral Simulator | binary systems, center of mass, inspiral | Two compact objects orbit and slowly inspiral under a simplified energy-loss term. |
| G2 | Gravitational Wave Chirp Lab | gravitational wave, chirp, waveform | Generate a simplified chirp waveform from masses and play/plot the signal. |
| G3 | LIGO Signal Hunter | detection, noise, matched filtering | Hide a chirp in noisy data; users choose templates and find correlation peaks. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase H: 宇宙学
**Goal:** Treat the whole universe as a dynamical system.

| ID | App | Concepts | Output |
|---|---|---|---|
| H1 | Galaxy Distribution Viewer | cosmological principle, homogeneity, isotropy | Random/clustered galaxy field that appears structured locally and smoother when averaged over larger scales. |
| H2 | Expanding Grid Universe | scale factor, expanding space, comoving coordinates | Grid expands with scale factor a(t), showing galaxies fixed in comoving coordinates while proper distances grow. |
| H3 | Universe Equation Solver | Friedmann equation, matter, radiation | Solve simplified Friedmann equation for a(t) from Ω parameters and plot past/future expansion. |
| H4 | Cosmic Redshift Calculator | cosmological redshift, lookback time, comoving distance | Input redshift z; output scale factor, approximate lookback time, and distance from selected cosmology. |
| H5 | CMB Pixel Universe | cosmic microwave background, temperature fluctuations, early universe | Generate a sphere/2D map of small temperature fluctuations with adjustable large/small scale power. |
| H6 | Galaxy Rotation Curve Lab | dark matter, galaxy rotation curves, mass profiles | Compute rotation curves from visible matter alone and with a dark-matter halo. |
| H7 | Dark Energy Slider | dark energy, cosmological constant, accelerating expansion | Adjust ΩΛ and observe future scale-factor acceleration/deceleration. |
| H8 | Cosmic Timeline Builder | cosmic history, inflation, nucleosynthesis | Interactive logarithmic timeline from early universe to today with cards and linked mini simulations. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.

## Phase I: 虫洞、时间旅行与因果结构
**Goal:** Model wormholes and time-travel ideas as metric, energy-condition, and causal-graph problems.

| ID | App | Concepts | Output |
|---|---|---|---|
| I1 | Wormhole Taxonomy Explorer | Einstein-Rosen bridge, traversable wormhole, Morris-Thorne wormhole | Compare three wormhole-like concepts and label traversability, stability, and exotic-matter requirements. |
| I2 | Wormhole Metric Builder | Morris-Thorne metric, throat, redshift function | Choose shape/redshift functions and visualize throat geometry plus basic validity checks. |
| I3 | Embedding Diagram Renderer | embedding diagram, spatial slice, wormhole throat | Three.js surface rendering of a wormhole spatial slice with adjustable throat radius. |
| I4 | Energy Condition Checker | null energy condition, weak energy condition, stress-energy | Compute simplified energy-condition flags for selected wormhole toy functions. |
| I5 | Traversability Stress Test | tidal forces, traveler constraints, proper acceleration | Simulate a traveler path through a wormhole and flag excessive tidal acceleration in a toy model. |
| I6 | Wormhole Time Machine Lab | wormhole mouths, time shift, time dilation | Two wormhole mouths; one is moved relativistically to create time offset. App checks whether a signal loop returns to its own past. |
| I7 | Causality Loop Detector | causal graph, events, directed cycles | Users create events and causal links; app detects cycles and labels causality violations. |
| I8 | Paradox Simulator | grandfather paradox, self-consistency, constraints | Model causal rules as Boolean constraints and check whether any self-consistent history exists. |
| I9 | Chronology Protection Toy Model | chronology protection, vacuum fluctuations, semiclassical gravity | Conceptual graph: as CTC threshold approaches, toy field energy diverges or grows sharply. |
| I10 | Negative Energy Sandbox | negative energy, Casimir-like toy model, quantum field effects | Toy Casimir-style panel: plate separation changes a conceptual negative energy density plot; explicitly labels limitations. |

**Milestone:** complete the apps above, then write a one-page explanation of what the phase taught you.
