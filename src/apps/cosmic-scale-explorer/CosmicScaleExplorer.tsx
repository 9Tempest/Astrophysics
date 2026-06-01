import { useMemo, useState } from "react";
import {
  ChallengePanel,
  ControlPanel,
  EquationPanel,
  InvariantPanel,
  Slider,
  UnitInput,
  VisualizationPanel
} from "../../components";
import type { DiagnosticItem } from "../../components";
import {
  LOG_SCALE_MAX_EXPONENT,
  LOG_SCALE_MIN_EXPONENT,
  clampLogScalePosition,
  exponentDifference,
  log10Meters,
  metersFromLog10Exponent,
  metersToLogScalePosition
} from "../../physics/scale";
import {
  LENGTH_UNIT_ORDER,
  convertLengthToAllUnits,
  formatHumanLength,
  formatScientific,
  type ConvertedLength,
  type LengthUnitId
} from "../../physics/units";
import { cosmicScaleChallenges } from "./challenges";
import {
  cosmicScaleAssumptions,
  cosmicScaleEquations,
  referenceObjects,
  unitLandmarks,
  type ReferenceObject
} from "./lesson";

interface ConverterState {
  readonly rows: readonly ConvertedLength[];
  readonly error?: string;
}

function findNearestReferenceObject(meters: number): ReferenceObject {
  return referenceObjects.reduce((nearest, current) => {
    const nearestGap = Math.abs(exponentDifference(nearest.meters, meters));
    const currentGap = Math.abs(exponentDifference(current.meters, meters));
    return currentGap < nearestGap ? current : nearest;
  });
}

function formatExponent(exponent: number): string {
  return exponent % 1 === 0 ? String(exponent) : exponent.toFixed(1);
}

function formatGap(referenceMeters: number, selectedMeters: number): string {
  const gap = exponentDifference(referenceMeters, selectedMeters);
  const magnitude = Math.abs(gap);

  if (magnitude < 0.05) {
    return "current scale";
  }

  return `${magnitude.toFixed(2)} orders ${gap > 0 ? "larger" : "smaller"}`;
}

function buildConverterState(
  valueText: string,
  unit: LengthUnitId
): ConverterState {
  const trimmedValue = valueText.trim();

  if (trimmedValue.length === 0) {
    return { rows: [], error: "Enter a non-negative finite length." };
  }

  const value = Number(trimmedValue);

  if (!Number.isFinite(value) || value < 0) {
    return { rows: [], error: "Enter a non-negative finite length." };
  }

  try {
    return { rows: convertLengthToAllUnits(value, unit) };
  } catch (error) {
    return {
      rows: [],
      error: error instanceof Error ? error.message : "Conversion failed."
    };
  }
}

function ScaleRuler({
  selectedMeters,
  selectedExponent
}: {
  readonly selectedMeters: number;
  readonly selectedExponent: number;
}): JSX.Element {
  const axisStart = 70;
  const axisEnd = 930;
  const axisWidth = axisEnd - axisStart;
  const axisY = 188;
  const tickExponents = Array.from({ length: 15 }, (_, index) => -15 + index * 3);

  function xForMeters(meters: number): number {
    return (
      axisStart +
      clampLogScalePosition(metersToLogScalePosition(meters)) * axisWidth
    );
  }

  const selectedX = xForMeters(selectedMeters);

  return (
    <div className="scale-ruler-wrap">
      <svg
        className="scale-ruler"
        role="img"
        viewBox="0 0 1000 290"
        aria-label="Logarithmic length ruler from 10^-15 meters to 10^27 meters"
      >
        <rect className="ruler-bg" x="0" y="0" width="1000" height="290" />

        <line className="ruler-axis" x1={axisStart} x2={axisEnd} y1={axisY} y2={axisY} />

        {tickExponents.map((exponent) => {
          const x = xForMeters(metersFromLog10Exponent(exponent));

          return (
            <g key={exponent}>
              <line className="ruler-tick" x1={x} x2={x} y1={axisY - 14} y2={axisY + 14} />
              <text className="ruler-tick-label" x={x} y={axisY + 36}>
                10^{exponent}
              </text>
            </g>
          );
        })}

        {referenceObjects.map((object, index) => {
          const x = xForMeters(object.meters);
          const row = index % 3;
          const y = 46 + row * 36;

          return (
            <g className="object-marker" key={object.id}>
              <line x1={x} x2={x} y1={y + 12} y2={axisY - 18} />
              <circle cx={x} cy={y} r="6" />
              <text x={x} y={y - 12}>
                {object.name}
              </text>
            </g>
          );
        })}

        {unitLandmarks.map((landmark, index) => {
          const x = xForMeters(landmark.meters);
          const y = 246 + (index % 2) * 22;

          return (
            <g className="unit-marker" key={landmark.id}>
              <line x1={x} x2={x} y1={axisY + 12} y2={y - 14} />
              <rect x={x - 22} y={y - 22} width="44" height="20" rx="4" />
              <text x={x} y={y - 7}>
                {landmark.label}
              </text>
            </g>
          );
        })}

        <g className="selected-marker">
          <line x1={selectedX} x2={selectedX} y1="18" y2="274" />
          <circle cx={selectedX} cy={axisY} r="10" />
          <text x={selectedX} y="22">
            current 10^{formatExponent(selectedExponent)} m
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function CosmicScaleExplorer(): JSX.Element {
  const [exponent, setExponent] = useState(0);
  const [converterValue, setConverterValue] = useState("1");
  const [converterUnit, setConverterUnit] = useState<LengthUnitId>("au");

  const selectedMeters = useMemo(() => metersFromLog10Exponent(exponent), [exponent]);
  const nearestReference = useMemo(
    () => findNearestReferenceObject(selectedMeters),
    [selectedMeters]
  );
  const converterState = useMemo(
    () => buildConverterState(converterValue, converterUnit),
    [converterValue, converterUnit]
  );

  const diagnostics: readonly DiagnosticItem[] = [
    {
      label: "Scale domain",
      value: `10^${formatExponent(exponent)} m`,
      status:
        exponent >= LOG_SCALE_MIN_EXPONENT && exponent <= LOG_SCALE_MAX_EXPONENT
          ? "pass"
          : "fail",
      description: "Slider remains inside the supported logarithmic domain."
    },
    {
      label: "Nearest reference",
      value: nearestReference.name,
      status: "info",
      description: `${formatGap(nearestReference.meters, selectedMeters)} from the current scale.`
    },
    {
      label: "Converter",
      value: converterState.error ? "invalid input" : "finite",
      status: converterState.error ? "fail" : "pass",
      description: converterState.error ?? "All conversions go through meters."
    },
    {
      label: "Model label",
      value: "conceptual diagram",
      status: "warn",
      description: "Reference sizes are rounded educational anchors."
    }
  ];

  return (
    <div className="cosmic-page">
      <header className="app-header">
        <span className="phase-pill">Phase A1</span>
        <div>
          <h1>Cosmic Scale Explorer</h1>
          <p>
            Slide through powers of ten, compare familiar objects, and convert
            between SI and astronomical length units.
          </p>
        </div>
      </header>

      <div className="primary-grid">
        <VisualizationPanel
          title="Logarithmic length ruler"
          subtitle="A one-step move by 1 exponent means a factor of 10 in length."
        >
          <div className="current-scale-strip">
            <div>
              <span>Current length</span>
              <strong>{formatScientific(selectedMeters, 3)} m</strong>
            </div>
            <div>
              <span>Readable unit</span>
              <strong>{formatHumanLength(selectedMeters)}</strong>
            </div>
            <div>
              <span>Closest anchor</span>
              <strong>{nearestReference.name}</strong>
            </div>
          </div>

          <ScaleRuler selectedMeters={selectedMeters} selectedExponent={exponent} />

          <div className="landmark-list" aria-label="Distance unit landmarks">
            {unitLandmarks.map((landmark) => (
              <div key={landmark.id}>
                <strong>{landmark.label}</strong>
                <span>{landmark.description}</span>
              </div>
            ))}
          </div>
        </VisualizationPanel>

        <div className="side-stack">
          <ControlPanel
            title="Scale and converter"
            description="Move the scale slider or convert a specific length."
          >
            <Slider
              id="scale-exponent"
              label="Log10 length"
              min={LOG_SCALE_MIN_EXPONENT}
              max={LOG_SCALE_MAX_EXPONENT}
              step={0.1}
              value={exponent}
              unit="m exponent"
              formatValue={formatExponent}
              onChange={setExponent}
            />

            <div className="button-row">
              <button type="button" onClick={() => setExponent(0)}>
                Reset to 1 m
              </button>
              <button
                type="button"
                onClick={() => {
                  setConverterValue(formatScientific(selectedMeters, 8));
                  setConverterUnit("m");
                }}
              >
                Use current scale
              </button>
            </div>

            <UnitInput
              id="length-converter"
              label="Convert length"
              value={converterValue}
              unit={converterUnit}
              onValueChange={setConverterValue}
              onUnitChange={setConverterUnit}
            />

            {converterState.error ? (
              <p className="form-error">{converterState.error}</p>
            ) : (
              <table className="conversion-table">
                <caption>Converted length values</caption>
                <tbody>
                  {converterState.rows.map(({ unit, value }) => (
                    <tr key={unit.id}>
                      <th scope="row">{unit.symbol}</th>
                      <td>{formatScientific(value, 5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </ControlPanel>

          <InvariantPanel title="Scale diagnostics" diagnostics={diagnostics} />
        </div>
      </div>

      <section className="panel object-panel" aria-labelledby="object-title">
        <div className="panel-heading compact">
          <div>
            <span className="panel-kicker">Reference objects</span>
            <h2 id="object-title">Anchors on the scale</h2>
          </div>
        </div>

        <div className="object-grid">
          {referenceObjects.map((object) => {
            const isNearest = object.id === nearestReference.id;

            return (
              <article
                className={`object-card${isNearest ? " nearest" : ""}`}
                key={object.id}
              >
                <span>{object.category}</span>
                <h3>{object.name}</h3>
                <strong>{formatScientific(object.meters, 3)} m</strong>
                <p>{object.description}</p>
                <small>{formatGap(object.meters, selectedMeters)}</small>
                <button
                  type="button"
                  onClick={() => setExponent(log10Meters(object.meters))}
                >
                  Jump
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <div className="learning-grid">
        <EquationPanel
          modelType="exact formula"
          equations={cosmicScaleEquations}
          assumptions={cosmicScaleAssumptions}
        />

        <ChallengePanel challenges={cosmicScaleChallenges} />
      </div>

      <section className="panel notes-panel" aria-labelledby="notes-title">
        <div className="panel-heading compact">
          <div>
            <span className="panel-kicker">Learning notes</span>
            <h2 id="notes-title">Beginner and advanced views</h2>
          </div>
        </div>
        <div className="notes-grid">
          <article>
            <h3>Beginner explanation</h3>
            <p>
              A logarithmic scale compresses huge differences. The distance from
              an atom to a human and the distance from the Sun to a galaxy can
              both fit on one ruler because each equal step multiplies by 10.
            </p>
          </article>
          <article>
            <h3>Advanced notes</h3>
            <p>
              This app is a conceptual diagram backed by exact unit conversion
              formulas. The sizes are rounded anchors, so use them for order-of-
              magnitude reasoning rather than precision astronomy.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
