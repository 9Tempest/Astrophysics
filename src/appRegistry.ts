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
  }
];

export function getAppBySlug(slug: string): LearningAppDefinition | undefined {
  return appRegistry.find((app) => app.slug === slug);
}
