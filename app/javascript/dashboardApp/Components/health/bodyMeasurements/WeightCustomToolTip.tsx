import React from "react";
import {
  WeightUnit,
  weightUnitToDisplayUnit,
} from "@/dashboardApp/types/WeightUnits";

export const WeightCustomTooltip: React.FC<{
  active?: boolean;
  payload?: unknown;
  weightUnit: WeightUnit;
}> = ({ active, payload, weightUnit }) => {
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
    rawPayload && typeof rawPayload["value"] === "number"
      ? (rawPayload["value"] as number)
      : rawPayload && rawPayload["value"] == null
      ? null
      : null;

  const value =
    rawValue == null
      ? "—"
      : `${Number(rawValue).toFixed(2)} ${weightUnitToDisplayUnit(weightUnit)}`;

  return (
    <div className="bg-white border rounded p-2 text-sm shadow">
      <div className="font-medium">{time}</div>
      <div className="text-slate-700">{value}</div>
    </div>
  );
};
