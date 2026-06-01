import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent
} from "react";
import {
  ChallengePanel,
  ControlPanel,
  EquationPanel,
  InvariantPanel,
  Slider,
  VisualizationPanel,
  type DiagnosticItem
} from "../../components";
import {
  cartesianToPolar,
  dot2,
  norm2,
  type Vec2
} from "../../physics/vector";
import {
  DEFAULT_VECTOR_STATE,
  SEEDED_CIRCULAR_SCENARIO,
  estimateDragKinematics,
  stepVectorPlayground,
  vectorDiagnostics,
  type VectorPlaygroundMode,
  type VectorPlaygroundParams,
  type VectorPlaygroundState
} from "../../simulators/vectorField";
import { vectorFieldChallenges } from "./challenges";
import {
  vectorFieldAssumptions,
  vectorFieldEquations,
  vectorFieldPredictionPrompts,
  vectorFieldReflectionQuestions
} from "./lesson";

type CoordinateMode = "cartesian" | "polar";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 560;
const WORLD_LIMIT_METERS = 10;
const FIXED_DT_SECONDS = 1 / 60;
const DRAG_MIN_DT_SECONDS = 1 / 30;
const DRAG_MIN_DISPLACEMENT_METERS = 0.08;
const MAX_VECTOR_DISPLAY_METERS = 7.5;
const DRAG_KINEMATICS_OPTIONS = {
  minDisplacementMeters: DRAG_MIN_DISPLACEMENT_METERS,
  velocitySmoothing: 0.35,
  accelerationSmoothing: 0.2
};

interface DragSample {
  readonly position: Vec2;
  readonly velocity: Vec2;
  readonly acceleration: Vec2;
  readonly timeMs: number;
}

function formatNumber(value: number, digits = 2): string {
  if (Math.abs(value) < 1e-9) {
    return "0.00";
  }

  return value.toFixed(digits);
}

function modeLabel(mode: VectorPlaygroundMode): string {
  switch (mode) {
    case "constant-acceleration":
      return "Constant acceleration";
    case "circular-motion":
      return "Circular motion";
    default:
      return "Drag and inspect";
  }
}

function worldToCanvas(point: Vec2): Vec2 {
  const scale = CANVAS_HEIGHT / (2 * WORLD_LIMIT_METERS);

  return {
    x: CANVAS_WIDTH / 2 + point.x * scale,
    y: CANVAS_HEIGHT / 2 - point.y * scale
  };
}

function canvasToWorld(point: Vec2): Vec2 {
  const scale = CANVAS_HEIGHT / (2 * WORLD_LIMIT_METERS);

  return {
    x: (point.x - CANVAS_WIDTH / 2) / scale,
    y: (CANVAS_HEIGHT / 2 - point.y) / scale
  };
}

function clampWorld(point: Vec2): Vec2 {
  return {
    x: Math.max(-WORLD_LIMIT_METERS, Math.min(WORLD_LIMIT_METERS, point.x)),
    y: Math.max(-WORLD_LIMIT_METERS, Math.min(WORLD_LIMIT_METERS, point.y))
  };
}

function drawArrow(
  context: CanvasRenderingContext2D,
  startWorld: Vec2,
  vectorWorld: Vec2,
  color: string,
  label: string,
  scale = 1
): void {
  const start = worldToCanvas(startWorld);
  const vectorLength = norm2(vectorWorld);
  const displayScale =
    vectorLength === 0
      ? scale
      : Math.min(scale, MAX_VECTOR_DISPLAY_METERS / vectorLength);
  const end = worldToCanvas({
    x: startWorld.x + vectorWorld.x * displayScale,
    y: startWorld.y + vectorWorld.y * displayScale
  });
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const headLength = 12;

  context.save();
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();

  context.beginPath();
  context.moveTo(end.x, end.y);
  context.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 6),
    end.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  context.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 6),
    end.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  context.closePath();
  context.fill();

  context.font = "700 14px Inter, system-ui, sans-serif";
  context.fillText(label, end.x + 8, end.y - 8);
  context.restore();
}

function drawVectorCanvas(
  canvas: HTMLCanvasElement,
  state: VectorPlaygroundState,
  params: VectorPlaygroundParams,
  vectorScale: number
): void {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "#fffaf0";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const origin = worldToCanvas({ x: 0, y: 0 });
  const gridScale = CANVAS_HEIGHT / (2 * WORLD_LIMIT_METERS);

  context.save();
  context.strokeStyle = "#e3d8c4";
  context.lineWidth = 1;

  for (
    let meter = -WORLD_LIMIT_METERS;
    meter <= WORLD_LIMIT_METERS;
    meter += 1
  ) {
    const verticalX = origin.x + meter * gridScale;
    const horizontalY = origin.y - meter * gridScale;

    context.beginPath();
    context.moveTo(verticalX, 0);
    context.lineTo(verticalX, CANVAS_HEIGHT);
    context.stroke();

    context.beginPath();
    context.moveTo(0, horizontalY);
    context.lineTo(CANVAS_WIDTH, horizontalY);
    context.stroke();
  }

  context.strokeStyle = "#54636b";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, origin.y);
  context.lineTo(CANVAS_WIDTH, origin.y);
  context.moveTo(origin.x, 0);
  context.lineTo(origin.x, CANVAS_HEIGHT);
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = "#4e5960";
  context.font = "600 12px Inter, system-ui, sans-serif";
  context.fillText("+x", CANVAS_WIDTH - 32, origin.y - 8);
  context.fillText("+y", origin.x + 8, 22);
  context.restore();

  if (params.mode === "circular-motion") {
    const radiusPixels = norm2(state.position) * gridScale;
    context.save();
    context.strokeStyle = "rgba(23, 107, 104, 0.28)";
    context.setLineDash([8, 8]);
    context.beginPath();
    context.arc(origin.x, origin.y, radiusPixels, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  drawArrow(context, { x: 0, y: 0 }, state.position, "#176b68", "r", 1);
  drawArrow(context, state.position, state.velocity, "#b86f12", "v", vectorScale);
  drawArrow(
    context,
    state.position,
    state.acceleration,
    "#b24b43",
    "a",
    vectorScale
  );

  const particle = worldToCanvas(state.position);
  context.save();
  context.fillStyle = "#223238";
  context.strokeStyle = "#ffffff";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(particle.x, particle.y, 10, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.restore();
}

export default function VectorFieldPlayground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const previousFrameTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef(0);
  const dragSampleRef = useRef<DragSample | null>(null);
  const [state, setState] = useState<VectorPlaygroundState>(
    DEFAULT_VECTOR_STATE
  );
  const [mode, setMode] = useState<VectorPlaygroundMode>("drag");
  const [coordinateMode, setCoordinateMode] =
    useState<CoordinateMode>("cartesian");
  const [isRunning, setIsRunning] = useState(false);
  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  const [angularSpeed, setAngularSpeed] = useState(0.5);
  const [clockwise, setClockwise] = useState(false);
  const [vectorScale, setVectorScale] = useState(1);

  const params = useMemo<VectorPlaygroundParams>(
    () => ({
      mode,
      acceleration: { x: accelerationX, y: accelerationY },
      angularSpeedRadiansPerSecond: angularSpeed,
      clockwise
    }),
    [accelerationX, accelerationY, angularSpeed, clockwise, mode]
  );

  const diagnostics = useMemo(() => vectorDiagnostics(state), [state]);
  const polar = useMemo(() => cartesianToPolar(state.position), [state.position]);
  const positionVelocityDot = useMemo(
    () => dot2(state.position, state.velocity),
    [state.position, state.velocity]
  );

  const diagnosticItems: readonly DiagnosticItem[] = [
    {
      label: "Finite values",
      value: "pass",
      status: Number.isFinite(state.position.x + state.position.y)
        ? "pass"
        : "fail",
      description: "Position, velocity, and acceleration are kept explicit."
    },
    {
      label: "Speed",
      value: `${formatNumber(diagnostics.speedMetersPerSecond)} m/s`,
      status: "info",
      description: "The velocity vector length."
    },
    {
      label: "r · v",
      value: formatNumber(positionVelocityDot, 3),
      status: Math.abs(positionVelocityDot) < 0.2 ? "pass" : "warn",
      description: "Near zero means velocity is tangent to the radius."
    },
    {
      label: "Radius",
      value: `${formatNumber(diagnostics.radiusMeters)} m`,
      status: diagnostics.radiusMeters <= WORLD_LIMIT_METERS ? "pass" : "warn",
      description: "The display window covers -10 m to +10 m."
    }
  ];

  const stepOnce = useCallback((): void => {
    setState((currentState) =>
      stepVectorPlayground(currentState, params, FIXED_DT_SECONDS)
    );
  }, [params]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    drawVectorCanvas(canvas, state, params, vectorScale);
  }, [params, state, vectorScale]);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      previousFrameTimeRef.current = null;
      accumulatedTimeRef.current = 0;
      return;
    }

    function tick(frameTimeMs: number): void {
      if (previousFrameTimeRef.current === null) {
        previousFrameTimeRef.current = frameTimeMs;
      }

      const frameDtSeconds = Math.min(
        0.1,
        (frameTimeMs - previousFrameTimeRef.current) / 1000
      );
      previousFrameTimeRef.current = frameTimeMs;
      accumulatedTimeRef.current += frameDtSeconds;

      setState((currentState) => {
        let nextState = currentState;
        let steps = 0;

        while (
          accumulatedTimeRef.current >= FIXED_DT_SECONDS &&
          steps < 8
        ) {
          nextState = stepVectorPlayground(nextState, params, FIXED_DT_SECONDS);
          accumulatedTimeRef.current -= FIXED_DT_SECONDS;
          steps += 1;
        }

        return nextState;
      });

      animationRef.current = window.requestAnimationFrame(tick);
    }

    animationRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, params]);

  function reset(): void {
    setIsRunning(false);

    if (mode === "circular-motion") {
      setState(SEEDED_CIRCULAR_SCENARIO);
    } else {
      setState(DEFAULT_VECTOR_STATE);
    }
  }

  function pointFromPointer(event: PointerEvent<HTMLCanvasElement>): Vec2 {
    const rect = event.currentTarget.getBoundingClientRect();
    const canvasPoint = {
      x: ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT
    };

    return clampWorld(canvasToWorld(canvasPoint));
  }

  function beginDrag(event: PointerEvent<HTMLCanvasElement>): void {
    event.currentTarget.setPointerCapture(event.pointerId);
    const position = pointFromPointer(event);

    setIsRunning(false);
    setMode("drag");
    dragSampleRef.current = {
      position,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      timeMs: event.timeStamp
    };
    setState((currentState) => ({
      ...currentState,
      position,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 }
    }));
  }

  function updateDrag(event: PointerEvent<HTMLCanvasElement>): void {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const position = pointFromPointer(event);
    const previous = dragSampleRef.current;

    if (!previous) {
      return;
    }

    const dtSeconds = Math.max(
      DRAG_MIN_DT_SECONDS,
      (event.timeStamp - previous.timeMs) / 1000
    );
    const kinematics = estimateDragKinematics(
      previous.position,
      position,
      previous.velocity,
      previous.acceleration,
      dtSeconds,
      DRAG_KINEMATICS_OPTIONS
    );

    if (!kinematics.didMove) {
      return;
    }

    dragSampleRef.current = {
      position,
      velocity: kinematics.velocity,
      acceleration: kinematics.acceleration,
      timeMs: event.timeStamp
    };
    setState((currentState) => ({
      ...currentState,
      position,
      velocity: kinematics.velocity,
      acceleration: kinematics.acceleration,
      timeSeconds: currentState.timeSeconds + dtSeconds
    }));
  }

  function endDrag(event: PointerEvent<HTMLCanvasElement>): void {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragSampleRef.current = null;
  }

  function chooseMode(nextMode: VectorPlaygroundMode): void {
    setMode(nextMode);
    setIsRunning(false);

    if (nextMode === "circular-motion") {
      setState(SEEDED_CIRCULAR_SCENARIO);
    }
  }

  return (
    <div className="vector-page">
      <header className="app-header">
        <span className="phase-pill">Phase A2</span>
        <div>
          <h1>Vector Field Playground</h1>
          <p>
            Drag a particle, inspect its vectors, and switch between Cartesian
            and polar views of the same motion.
          </p>
        </div>
      </header>

      <div className="primary-grid vector-primary-grid">
        <VisualizationPanel
          title="Position, velocity, acceleration"
          subtitle="Drag the particle or run a preset to watch vectors change."
        >
          <canvas
            ref={canvasRef}
            className="vector-canvas"
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            aria-label="2D vector playground with draggable particle"
            onPointerDown={beginDrag}
            onPointerMove={updateDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />

          <div className="vector-legend" aria-label="Vector legend">
            <span className="legend-r">r position</span>
            <span className="legend-v">v velocity</span>
            <span className="legend-a">a acceleration</span>
          </div>

          <div className="readout-grid">
            {coordinateMode === "cartesian" ? (
              <>
                <div>
                  <span>Position r</span>
                  <strong>
                    ({formatNumber(state.position.x)}, {formatNumber(state.position.y)}) m
                  </strong>
                </div>
                <div>
                  <span>Velocity v</span>
                  <strong>
                    ({formatNumber(state.velocity.x)}, {formatNumber(state.velocity.y)}) m/s
                  </strong>
                </div>
                <div>
                  <span>
                    Acceleration a{mode === "drag" ? " (smoothed estimate)" : ""}
                  </span>
                  <strong>
                    ({formatNumber(state.acceleration.x)}, {formatNumber(state.acceleration.y)}) m/s²
                  </strong>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span>Radius</span>
                  <strong>{formatNumber(polar.r)} m</strong>
                </div>
                <div>
                  <span>Angle</span>
                  <strong>
                    {formatNumber((polar.thetaRadians * 180) / Math.PI)}°
                  </strong>
                </div>
                <div>
                  <span>Speed</span>
                  <strong>{formatNumber(norm2(state.velocity))} m/s</strong>
                </div>
              </>
            )}
          </div>
        </VisualizationPanel>

        <div className="side-stack">
          <ControlPanel
            title="Motion controls"
            description="Use fixed-step updates for presets; dragging uses smoothed finite differences."
          >
            <label className="select-control" htmlFor="vector-mode">
              <span>Mode</span>
              <select
                id="vector-mode"
                value={mode}
                onChange={(event) =>
                  chooseMode(event.currentTarget.value as VectorPlaygroundMode)
                }
              >
                <option value="drag">Drag and inspect</option>
                <option value="constant-acceleration">Constant acceleration</option>
                <option value="circular-motion">Circular motion</option>
              </select>
            </label>

            <p className="mode-help">
              {mode === "drag"
                ? "Clicking only moves the particle. Tiny click jitter is ignored; drag velocity and acceleration are smoothed estimates."
                : `${modeLabel(mode)} uses a fixed simulation step of ${formatNumber(
                    FIXED_DT_SECONDS,
                    3
                  )} s.`}
            </p>

            <div className="segmented-control" aria-label="Coordinate readout">
              <button
                type="button"
                aria-pressed={coordinateMode === "cartesian"}
                onClick={() => setCoordinateMode("cartesian")}
              >
                Cartesian
              </button>
              <button
                type="button"
                aria-pressed={coordinateMode === "polar"}
                onClick={() => setCoordinateMode("polar")}
              >
                Polar
              </button>
            </div>

            <div className="button-row">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                disabled={mode === "drag"}
              >
                {isRunning ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={stepOnce}
                disabled={mode === "drag"}
              >
                Step
              </button>
              <button type="button" onClick={reset}>
                Reset
              </button>
            </div>

            <Slider
              id="vector-scale"
              label="Vector display scale"
              min={0.2}
              max={2.5}
              step={0.1}
              value={vectorScale}
              formatValue={(value) => value.toFixed(1)}
              onChange={setVectorScale}
            />

            <Slider
              id="acceleration-x"
              label="Acceleration x"
              min={-4}
              max={4}
              step={0.1}
              value={accelerationX}
              unit="m/s²"
              formatValue={(value) => value.toFixed(1)}
              onChange={setAccelerationX}
            />

            <Slider
              id="acceleration-y"
              label="Acceleration y"
              min={-4}
              max={4}
              step={0.1}
              value={accelerationY}
              unit="m/s²"
              formatValue={(value) => value.toFixed(1)}
              onChange={setAccelerationY}
            />

            <Slider
              id="angular-speed"
              label="Circular angular speed"
              min={0.1}
              max={2}
              step={0.1}
              value={angularSpeed}
              unit="rad/s"
              formatValue={(value) => value.toFixed(1)}
              onChange={setAngularSpeed}
            />

            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={clockwise}
                onChange={(event) => setClockwise(event.currentTarget.checked)}
              />
              <span>Clockwise circular motion</span>
            </label>
          </ControlPanel>

          <InvariantPanel
            title="Vector diagnostics"
            diagnostics={diagnosticItems}
          />
        </div>
      </div>

      <div className="learning-grid">
        <EquationPanel
          modelType="numerical simulation"
          equations={vectorFieldEquations}
          assumptions={vectorFieldAssumptions}
        />

        <ChallengePanel challenges={vectorFieldChallenges} />
      </div>

      <section className="panel notes-panel" aria-labelledby="vector-notes-title">
        <div className="panel-heading compact">
          <div>
            <span className="panel-kicker">Learning notes</span>
            <h2 id="vector-notes-title">Prediction and reflection</h2>
          </div>
        </div>

        <div className="notes-grid">
          <article>
            <h3>Prediction tasks</h3>
            <ul>
              {vectorFieldPredictionPrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Reflection quiz</h3>
            <ul>
              {vectorFieldReflectionQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
