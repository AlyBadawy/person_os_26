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

const BpmChartTooltip = ({
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

  const rawValue =
    rawPayload && typeof rawPayload["bpm"] === "number"
      ? (rawPayload["bpm"] as number)
      : rawPayload && rawPayload["bpm"] == null
      ? null
      : null;

  const value = rawValue == null ? "—" : `${Number(rawValue).toFixed(0)} BPM`;

  return (
    <div className="bg-white border rounded p-2 text-sm shadow">
      <div className="font-medium">{time}</div>
      <div className="text-slate-700">{value}</div>
    </div>
  );
};

export const HeartBpmChart = ({
  measurements,
}: {
  measurements: HeartMeasurement[];
}) => {
  const bpmData = useMemo(() => {
    return measurements
      .filter((m) => m.data.bpm != null)
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
          bpm: m.data.bpm,
          __originalTimeMs: baseMs,
        };
      });
  }, [measurements]);
  return (
    <div className="h-44" style={{ minWidth: 0, height: 176 }}>
      <ResponsiveContainer width="100%" height={176} className="pb-4">
        <LineChart
          data={bpmData}
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
          <Tooltip content={<BpmChartTooltip />} />
          <Line
            type="monotone"
            dataKey="bpm"
            stroke="#e11d48"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
