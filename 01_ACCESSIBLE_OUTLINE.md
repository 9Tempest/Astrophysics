# 01 Accessible Outline

这份大纲的目的是让 Codex 和学习者都能快速理解项目方向。

## One-sentence project definition

`Spacetime Playground` 是一个交互式物理学习平台：每个物理概念都对应一个可以调参数、看公式、跑模拟、检查 invariant、完成 challenge 的 app。

## Learning arc

```text
Newtonian mechanics
-> numerical simulation
-> gravity and orbits
-> waves, spectra, thermodynamics, stars
-> special relativity
-> spacetime diagrams and proper time
-> differential geometry intuition
-> general relativity
-> black holes and gravitational waves
-> cosmology
-> wormholes, CTCs, and time-travel causality models
```

## Why this is motivating

你不是在“先学完物理再写代码”。你是在逐步构建自己的宇宙模拟器。

每一阶段都对应一个可见成果：

```text
Phase A: build the simulation engine
Phase B: build a solar-system engine
Phase C: build star and spectrum tools
Phase D: build a spacetime diagram editor
Phase E: build geometry/metric intuition tools
Phase F: build black-hole visualizers
Phase G: build gravitational-wave signal tools
Phase H: build a universe expansion solver
Phase I: build wormhole and causality validators
```

## Core design pattern for every app

每个 app 都应该遵循：

```text
1. Concept card
2. Visualization
3. Controls
4. Equation panel
5. Invariant/checker panel
6. Challenge mode
7. Beginner explanation
8. Advanced notes
9. Tests for the physics engine
```

## Physics as CS analogies

```text
physical law          -> semantics
coordinate system     -> syntax / representation
conservation law      -> invariant / type-level property
metric tensor         -> runtime environment for spacetime intervals
geodesic equation     -> execution rule for free-fall motion
causal graph          -> partial order / dependency graph
paradox detection     -> constraint satisfaction / cycle detection
```

## What Codex should optimize for

- Build small working apps, not a giant unfinished framework.
- Make every formula inspectable.
- Make every approximation explicit.
- Prefer deterministic toy models with tests.
- Make the learner want to continue by giving visual feedback and small challenges.
