import { BodyMeasurement } from "../store/api/HealthBodyMeasurementsApiSlice";
import { WeightUnitEnum } from "../types/WeightUnits";

export function getWeightValueForUnit(
  m: BodyMeasurement,
  unit: WeightUnitEnum
): number | null {
  if (!m || !m.data) return null;
  const data = m.data;
  switch (unit) {
    case WeightUnitEnum.Kilograms:
      return data.valueInKilograms ?? data.originalValue ?? null;
    case WeightUnitEnum.Pounds:
      return data.valueInPounds ?? null;
    case WeightUnitEnum.Stones:
      return data.valueInStones ?? null;
  }
}
