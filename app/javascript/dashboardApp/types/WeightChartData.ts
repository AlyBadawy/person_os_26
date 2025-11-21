import { WeightData } from "./WeightData";

export type WeightChartData = {
  id: number;
  data: WeightData;
  time: string;
  label: string;
  value: number | null;
  __originalTimeMs: number;
};
