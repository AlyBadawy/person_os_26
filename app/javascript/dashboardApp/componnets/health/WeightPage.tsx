import { useGetBodyMeasurementsQuery } from "@/dashboardApp/store/api/BodyMeasurementsApiSlice";
import { setWeightUnit } from "@/dashboardApp/store/slices/UnitsSlice";
import { useAppDispatch, useAppSelect } from "@/dashboardApp/store/store";
import {
  allWeightUnits,
  WeightUnitEnum,
  weightUnitToDisplayUnit,
} from "@/dashboardApp/types/WeightUnits";
import React from "react";
import { AddWeight } from "./AddWeight";
import { WeightChart } from "./WeightChart";
import { WeightTable } from "./weightTable";

export const WeightPage: React.FC = () => {
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
  const weightUnit = useAppSelect((state) => state.units.weightUnit);
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as WeightUnitEnum;
    dispatch(setWeightUnit(newUnit));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart: 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md h-80">
          <div className="flex justify-end mb-2">
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
          {isLoading ? (
            <div className="h-full w-full animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
              <div className="h-56 bg-slate-100 rounded" />
            </div>
          ) : (
            <WeightChart weightMeasurements={weightMeasurements} />
          )}
        </div>

        {/* Table: 1/3 width */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
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
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <AddWeight />
      </div>
    </div>
  );
};

export default WeightPage;
