# 09 Accessibility and Learning UX

This project should be easy to explore even when the physics is difficult.

## Interaction principles

- Every slider must have a label, unit, min, max, and current value.
- Every animation must have pause, step, and reset when applicable.
- Avoid relying only on color; use labels, icons, patterns, and text.
- Provide keyboard-accessible controls.
- Provide textual explanations for visual phenomena.
- Use plain-language descriptions first, equations second, advanced notes third.

## Learning flow inside each app

Each app should expose three levels:

```text
Beginner: What am I seeing?
Formula: What equation drives it?
Advanced: What assumptions and limitations are hidden here?
```

## Challenge design

Each challenge should have:

```ts
interface Challenge {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'exploratory';
  goal: string;
  hint: string;
  successCondition: string;
  explanationAfterSuccess: string;
}
```

Example:

```text
Title: Make the orbit circular
Goal: Adjust launch speed until the radial distance stays nearly constant.
Hint: Circular orbit speed around a point mass is sqrt(GM/r).
Success: radial variation < 5% for one orbit.
Explanation: A circular orbit balances inward gravitational acceleration with the needed centripetal acceleration.
```

## Motivation design

The app sequence should feel like quests:

```text
Quest 1: Build a Solar System
Quest 2: Build a Black Hole Visualizer
Quest 3: Build a Time Travel Validator
```

Each phase should end with a small milestone screen explaining what the learner can now understand.

## Copywriting rules

Use sentences like:

```text
Move this slider and watch what breaks.
This number is the invariant we expect to stay constant.
When it drifts, you are seeing numerical error, not new physics.
This is a toy model. It preserves the core idea but omits [...].
```

Avoid vague statements like:

```text
This is complicated.
This is just how relativity works.
Trust the formula.
```
