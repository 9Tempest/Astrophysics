import type { ReactNode } from "react";
import type { LearningAppDefinition } from "../appRegistry";

interface AppShellProps {
  readonly apps: readonly LearningAppDefinition[];
  readonly selectedSlug: string;
  readonly onSelectApp: (slug: string) => void;
  readonly children: ReactNode;
}

export function AppShell({
  apps,
  selectedSlug,
  onSelectApp,
  children
}: AppShellProps): JSX.Element {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Learning app navigation">
        <div className="brand-block">
          <span className="brand-kicker">Spacetime Playground</span>
          <h1>Build your universe simulator</h1>
        </div>

        <nav className="app-nav" aria-label="App list">
          {apps.map((app) => (
            <button
              key={app.slug}
              className="nav-item"
              aria-pressed={app.slug === selectedSlug}
              type="button"
              onClick={() => onSelectApp(app.slug)}
            >
              <span className="nav-id">{app.id}</span>
              <span>
                <strong>{app.title}</strong>
                <small>{app.concepts.slice(0, 3).join(" / ")}</small>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="app-main">{children}</main>
    </div>
  );
}
