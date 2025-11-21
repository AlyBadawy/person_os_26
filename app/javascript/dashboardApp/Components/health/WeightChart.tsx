import { BodyMeasurement } from "@/dashboardApp/store/api/BodyMeasurementsApiSlice";
import { useAppSelector } from "@/dashboardApp/store/store";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeightCustomTooltip } from "./WeightCustomToolTip";
import { getWeightValueForUnit } from "@/dashboardApp/utils/getWeightValueForUnit";
import { useMemo } from "react";

export const WeightChart = ({
  weightMeasurements,
}: {
  weightMeasurements: BodyMeasurement[];
}) => {
  const weightUnit = useAppSelector((state) => state.units.weightUnit);

  const chartDataConverted = useMemo(() => {
    return weightMeasurements.map((m, idx) => {
      const raw = getWeightValueForUnit(m as BodyMeasurement, weightUnit);
      const value = raw == null ? null : Number(Number(raw).toFixed(3));
      // When multiple measurements have identical timestamps, add a tiny offset
      // by index (milliseconds) so each point is unique on the x-axis and the
      // tooltip can distinguish them. We keep the displayed tick formatting
      // based on the original timestamp.
      const baseMs = new Date(m.measuredAt).getTime();
      const timeMs = baseMs + idx; // tiny offset per point
      return {
        id: m.id,
        data: m.data,
        time: new Date(timeMs).toISOString(),
        label: new Date(m.measuredAt).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
        }),
        value,
        __originalTimeMs: baseMs,
      };
    });
  }, [weightMeasurements, weightUnit]);

  return (
    <ResponsiveContainer width="100%" height="100%" className="pb-4">
      <LineChart
        data={chartDataConverted}
        margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(t: unknown) => {
            try {
              return new Date(String(t)).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
              });
            } catch {
              return String(t);
            }
          }}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip content={<WeightCustomTooltip weightUnit={weightUnit} />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#7f2f7f"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
