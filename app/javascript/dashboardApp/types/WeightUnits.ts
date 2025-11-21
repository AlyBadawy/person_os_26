export type WeightDisplayUnit = "kilograms" | "pounds" | "stones";
export type WeightUnit = "kg" | "lb" | "st";

export enum WeightUnitEnum {
  Kilograms = "kg",
  Pounds = "lb",
  Stones = "st",
}

export enum WeightDisplayUnitEnum {
  Kilograms = "kilograms",
  Pounds = "pounds",
  Stones = "stones",
}

export function weightUnitToDisplayUnit(unit: WeightUnit): WeightDisplayUnit {
  switch (unit) {
    case "kg":
      return "kilograms";
    case "lb":
      return "pounds";
    case "st":
      return "stones";
  }
}
export function displayUnitToWeightUnit(unit: WeightDisplayUnit): WeightUnit {
  switch (unit) {
    case "kilograms":
      return "kg";
    case "pounds":
      return "lb";
    case "stones":
      return "st";
  }
}
export const allDisplayUnits: WeightDisplayUnit[] = [
  "kilograms",
  "pounds",
  "stones",
];
export const allWeightUnits: WeightUnit[] = ["kg", "lb", "st"];
