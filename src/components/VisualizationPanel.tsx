import type { ReactNode } from "react";

interface VisualizationPanelProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
}

export function VisualizationPanel({
  title,
  subtitle,
  children
}: VisualizationPanelProps): JSX.Element {
  return (
    <section className="panel visualization-panel" aria-labelledby="visual-title">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Visualization</span>
          <h2 id="visual-title">{title}</h2>
        </div>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
