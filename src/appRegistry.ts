import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export interface LearningAppDefinition {
  readonly id: string;
  readonly phase: string;
  readonly slug: string;
  readonly title: string;
  readonly concepts: readonly string[];
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly route: string;
  readonly component: LazyExoticComponent<ComponentType>;
}

export const appRegistry: readonly LearningAppDefinition[] = [
  {
    id: "A1",
    phase: "A",
    slug: "cosmic-scale-explorer",
    title: "Cosmic Scale Explorer",
    concepts: [
      "SI units",
      "astronomical units",
      "light-year",
      "parsec",
      "orders of magnitude"
    ],
    difficulty: "beginner",
    route: "#/cosmic-scale-explorer",
    component: lazy(() => import("./apps/cosmic-scale-explorer/CosmicScaleExplorer"))
  },
  {
    id: "A2",
    phase: "A",
    slug: "vector-field-playground",
    title: "Vector Field Playground",
    concepts: [
      "vectors",
      "position",
      "velocity",
      "acceleration",
      "Cartesian and polar coordinates"
    ],
    difficulty: "beginner",
    route: "#/vector-field-playground",
    component: lazy(() => import("./apps/vector-field-playground/VectorFieldPlayground"))
  }
];

export function getAppBySlug(slug: string): LearningAppDefinition | undefined {
  return appRegistry.find((app) => app.slug === slug);
}
