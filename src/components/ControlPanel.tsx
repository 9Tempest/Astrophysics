import type { ReactNode } from "react";

interface ControlPanelProps {
  readonly title?: string;
  readonly description?: string;
  readonly children: ReactNode;
}

export function ControlPanel({
  title = "Controls",
  description,
  children
}: ControlPanelProps): JSX.Element {
  return (
    <section className="panel control-panel" aria-labelledby="control-title">
      <div className="panel-heading compact">
        <div>
          <span className="panel-kicker">Controls</span>
          <h2 id="control-title">{title}</h2>
        </div>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="control-stack">{children}</div>
    </section>
  );
}
