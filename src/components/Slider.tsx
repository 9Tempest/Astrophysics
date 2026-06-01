interface SliderProps {
  readonly id: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly value: number;
  readonly unit?: string;
  readonly formatValue?: (value: number) => string;
  readonly onChange: (value: number) => void;
}

export function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  unit,
  formatValue = (currentValue) => String(currentValue),
  onChange
}: SliderProps): JSX.Element {
  return (
    <label className="slider-control" htmlFor={id}>
      <span className="control-label-row">
        <span>{label}</span>
        <output htmlFor={id}>
          {formatValue(value)}
          {unit ? ` ${unit}` : ""}
        </output>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
      />
      <span className="slider-bounds">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </span>
    </label>
  );
}
