import type { LengthUnitId } from "../physics/units";
import { LENGTH_UNIT_ORDER, getLengthUnit } from "../physics/units";

interface UnitInputProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly unit: LengthUnitId;
  readonly onValueChange: (value: string) => void;
  readonly onUnitChange: (unit: LengthUnitId) => void;
}

export function UnitInput({
  id,
  label,
  value,
  unit,
  onValueChange,
  onUnitChange
}: UnitInputProps): JSX.Element {
  return (
    <div className="unit-input">
      <label htmlFor={`${id}-value`}>{label}</label>
      <div className="unit-input-row">
        <input
          id={`${id}-value`}
          inputMode="decimal"
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onValueChange(event.currentTarget.value)}
        />
        <label className="sr-only" htmlFor={`${id}-unit`}>
          Unit
        </label>
        <select
          id={`${id}-unit`}
          value={unit}
          onChange={(event) => onUnitChange(event.currentTarget.value as LengthUnitId)}
        >
          {LENGTH_UNIT_ORDER.map((unitId) => {
            const definition = getLengthUnit(unitId);

            return (
              <option key={unitId} value={unitId}>
                {definition.symbol}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
