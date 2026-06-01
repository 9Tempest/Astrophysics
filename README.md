# Spacetime Playground

Interactive physics learning apps that build from basic simulation skills toward astrophysics, black holes, cosmology, wormholes, and causality models.

The first app is **Cosmic Scale Explorer**, a logarithmic length-scale explorer from atomic sizes to the observable universe.

## Run Locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm test
npm run typecheck
npm run build
```

## Repository Shape

```text
src/components/   reusable app layout and panels
src/physics/      pure physics and math helpers
src/apps/         individual learning apps
src/tests/        Vitest tests for pure physics logic
```

Project planning documents remain in the root so future apps can follow the curriculum and modeling constraints.
