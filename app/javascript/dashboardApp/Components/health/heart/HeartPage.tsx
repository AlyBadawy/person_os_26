import { useGetHeartMeasurementsQuery } from "@/dashboardApp/store/api/HealthHeartMeasurementsApiSlice";
import React from "react";
import { AddHeartMeasurement } from "./AddHeartMeasurement";
import { HeartBpmChart } from "./HeartBpmChart";
import { HeartTable } from "./HeartTable";
import { BloodPressureChart } from "./BloodPressureChart";

export const HeartPage = () => {
  const { data, isLoading } = useGetHeartMeasurementsQuery();

  const heartMeasurements = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort(
      (a, b) =>
        new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
    );
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column: table on top, charts stacked below (left 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Heart</h2>
              <p className="text-sm text-slate-500">
                BPM and blood pressure trends
              </p>
            </div>
          </div>

          {/* Table first */}
          <div className="mb-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Measurements
              </h3>
              <HeartTable measurements={heartMeasurements} />
            </div>
          </div>

          {/* Then stacked charts */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Heart Rate (BPM)
              </h3>
              {isLoading ? (
                <div className="h-44 w-full animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
                  <div className="h-32 bg-slate-100 rounded" />
                </div>
              ) : (
                <HeartBpmChart measurements={heartMeasurements} />
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Blood Pressure (Systolic / Diastolic)
              </h3>
              {isLoading ? (
                <div className="h-44 w-full animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
                  <div className="h-32 bg-slate-100 rounded" />
                </div>
              ) : (
                <BloodPressureChart measurements={heartMeasurements} />
              )}
            </div>
          </div>
        </div>

        {/* Right column: add form */}

        <AddHeartMeasurement />
      </div>
    </div>
  );
};
