import { useGetBodyMeasurementsQuery } from "@/dashboardApp/store/api/HealthBodyMeasurementsApiSlice";
import { setWeightUnit } from "@/dashboardApp/store/slices/UnitsSlice";
import { useAppDispatch, useAppSelector } from "@/dashboardApp/store/store";
import {
  allWeightUnits,
  WeightUnitEnum,
  weightUnitToDisplayUnit,
} from "@/dashboardApp/types/WeightUnits";
import React from "react";
import { AddWeight } from "./AddWeight";
import { WeightChart } from "./WeightChart";
import { WeightTable } from "./WeightTable";

export const WeightPage = () => {
  const { data, isLoading } = useGetBodyMeasurementsQuery();

  // filter and sort measurements by measuredAt
  const weightMeasurements = React.useMemo(() => {
    const items = (data ?? []).filter((m) => m.topic === "weight");
    return items.sort(
      (a, b) =>
        new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
    );
  }, [data]);

  const dispatch = useAppDispatch();
  const weightUnit = useAppSelector((state) => state.units.weightUnit);
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as WeightUnitEnum;
    dispatch(setWeightUnit(newUnit));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column: table on top, chart below (left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Weight</h2>
              <p className="text-sm text-slate-500">Weight trends and log</p>
            </div>
            <div>
              <label className="sr-only">Unit</label>
              <select
                value={weightUnit}
                onChange={handleUnitChange}
                className="border rounded px-2 py-1 text-sm"
              >
                {allWeightUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {weightUnitToDisplayUnit(unit)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table first */}
          <div className="mb-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Measurements
              </h3>
              {isLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-40 bg-slate-100 rounded" />
                </div>
              ) : (
                <WeightTable
                  weightMeasurements={weightMeasurements}
                  weightUnit={weightUnit}
                />
              )}
            </div>
          </div>

          {/* Then chart */}
          <div className="bg-slate-50 rounded-lg p-3">
            <h3 className="text-sm font-medium text-slate-700 mb-2">
              Weight Chart
            </h3>
            {isLoading ? (
              <div className="h-44 w-full animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
                <div className="h-32 bg-slate-100 rounded" />
              </div>
            ) : (
              <WeightChart weightMeasurements={weightMeasurements} />
            )}
          </div>
        </div>

        {/* Right column: add form */}
        <AddWeight />
      </div>
    </div>
  );
};
