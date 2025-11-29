import { HeartMeasurement } from "@/dashboardApp/store/api/HealthHeartMeasurementsApiSlice";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BpChartTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: unknown[];
}) => {
  if (!active || !payload) return null;
  const first = (payload as unknown[])[0];
  if (!first || typeof first !== "object" || !("payload" in first)) return null;
  const rawPayload = (first as { payload?: unknown }).payload as
    | Record<string, unknown>
    | undefined;

  const time =
    rawPayload && typeof rawPayload["time"] === "string"
      ? new Date(String(rawPayload["time"])).toLocaleString()
      : "";

  const rawSystolic =
    rawPayload && typeof rawPayload["systolic"] === "number"
      ? (rawPayload["systolic"] as number)
      : rawPayload && rawPayload["systolic"] == null
      ? null
      : null;

  const rawDiastolic =
    rawPayload && typeof rawPayload["diastolic"] === "number"
      ? (rawPayload["diastolic"] as number)
      : rawPayload && rawPayload["diastolic"] == null
      ? null
      : null;

  const systolic =
    rawSystolic == null ? "—" : `${Number(rawSystolic).toFixed(0)} mmHg`;
  const diastolic =
    rawDiastolic == null ? "—" : `${Number(rawDiastolic).toFixed(0)} mmHg`;

  return (
    <div className="bg-white border rounded p-2 text-sm shadow">
      <div className="font-medium">{time}</div>
      <div className="text-slate-700">Systolic: {systolic}</div>
      <div className="text-slate-700">Diastolic: {diastolic}</div>
    </div>
  );
};

export const BloodPressureChart = ({
  measurements,
}: {
  measurements: HeartMeasurement[];
}) => {
  const bpData = useMemo(() => {
    return measurements
      .filter((m) => m.data.systolic != null && m.data.diastolic != null)
      .map((m, idx) => {
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
          systolic: m.data.systolic,
          diastolic: m.data.diastolic,
          __originalTimeMs: baseMs,
        };
      });
  }, [measurements]);
  return (
    <div className="h-44" style={{ minWidth: 0, height: 176 }}>
      <ResponsiveContainer width="100%" height={176} className="pb-4">
        <LineChart
          data={bpData}
          margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
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
          <YAxis />
          <Tooltip content={<BpChartTooltip />} />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
