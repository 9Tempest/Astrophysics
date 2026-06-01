export type DiagnosticStatus = "pass" | "warn" | "fail" | "info";

export interface DiagnosticItem {
  readonly label: string;
  readonly value: string;
  readonly status: DiagnosticStatus;
  readonly description?: string;
}

interface InvariantPanelProps {
  readonly title?: string;
  readonly diagnostics: readonly DiagnosticItem[];
}

export function InvariantPanel({
  title = "Checks",
  diagnostics
}: InvariantPanelProps): JSX.Element {
  return (
    <section className="panel invariant-panel" aria-labelledby="invariant-title">
      <div className="panel-heading compact">
        <div>
          <span className="panel-kicker">Invariant checker</span>
          <h2 id="invariant-title">{title}</h2>
        </div>
      </div>

      <dl className="diagnostic-list">
        {diagnostics.map((diagnostic) => (
          <div
            className={`diagnostic diagnostic-${diagnostic.status}`}
            key={diagnostic.label}
          >
            <dt>{diagnostic.label}</dt>
            <dd>
              <strong>{diagnostic.value}</strong>
              {diagnostic.description ? <span>{diagnostic.description}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
