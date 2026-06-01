export interface EquationEntry {
  readonly label: string;
  readonly expression: string;
  readonly description: string;
}

interface EquationPanelProps {
  readonly modelType:
    | "exact formula"
    | "numerical simulation"
    | "toy model"
    | "conceptual diagram";
  readonly equations: readonly EquationEntry[];
  readonly assumptions: readonly string[];
}

export function EquationPanel({
  modelType,
  equations,
  assumptions
}: EquationPanelProps): JSX.Element {
  return (
    <section className="panel equation-panel" aria-labelledby="equation-title">
      <div className="panel-heading compact">
        <div>
          <span className="panel-kicker">{modelType}</span>
          <h2 id="equation-title">Equations</h2>
        </div>
      </div>

      <div className="equation-list">
        {equations.map((equation) => (
          <article className="equation-item" key={equation.label}>
            <strong>{equation.label}</strong>
            <code>{equation.expression}</code>
            <p>{equation.description}</p>
          </article>
        ))}
      </div>

      <div className="assumption-list">
        <strong>Assumptions</strong>
        <ul>
          {assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
