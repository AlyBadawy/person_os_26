import { useGetHeartMeasurementsQuery } from "@/dashboardApp/store/api/HealthHeartMeasurementsApiSlice";
import { useGetBodyMeasurementsQuery } from "../../store/api/HealthBodyMeasurementsApiSlice";
import { Link } from "react-router-dom";

export const DashboardHealth = () => {
  const { data: bodyMeasurementsData } = useGetBodyMeasurementsQuery();
  const { data: heartMeasurementsData } = useGetHeartMeasurementsQuery();

  const latestWeight = bodyMeasurementsData
    ?.filter((measurement) => measurement.topic === "weight")
    .sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
    )[0];

  const latestHeartBpm = heartMeasurementsData
    ?.filter((m) => !!m.data.bpm)
    .sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
    )[0];

  const latestHeartBp = heartMeasurementsData
    ?.filter((m) => !!m.data.systolic && !!m.data.diastolic)
    .sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
    )[0];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Health</h3>
          <p className="text-sm text-slate-500">
            Overview — sections for health data
          </p>
        </div>
        <div className="text-sm text-slate-400">Updated now</div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Body measurements section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-800">
              Body measurements
            </h4>
            <Link to="/health/weight" className="text-sm text-indigo-600">
              Manage
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/health/weight"
              className="bg-indigo-50 rounded-lg p-3 flex flex-col items-start cursor-pointer"
            >
              <span className="text-sm text-slate-500">Weight</span>
              <span className="mt-1 text-xl font-bold text-indigo-600">
                {latestWeight
                  ? `${latestWeight.data.originalValue} ${latestWeight.data.originalUnit}`
                  : "—"}
              </span>
            </Link>

            <div className="bg-slate-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">Height</span>
              <span className="mt-1 text-xl font-bold text-slate-800">—</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">BMI</span>
              <span className="mt-1 text-xl font-bold text-slate-800">—</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">
                Body fat (placeholder)
              </span>
              <span className="mt-1 text-xl font-bold text-slate-800">—</span>
            </div>
          </div>
        </section>

        {/* Heart section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-800">Heart</h4>
            <Link to="/health/heart" className="text-sm text-rose-600">
              View
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/health/heart"
              className="bg-rose-50 rounded-lg p-3 flex flex-col items-start cursor-pointer"
            >
              <span className="text-sm text-slate-500">BPM</span>
              <span className="mt-1 text-xl font-bold text-rose-600">
                {latestHeartBpm ? `${latestHeartBpm.data.bpm} bpm` : "—"}
              </span>
            </Link>

            <div className="bg-rose-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">Blood pressure</span>
              <span className="mt-1 text-xl font-bold text-rose-600">
                {latestHeartBp
                  ? `${latestHeartBp.data.systolic}/${latestHeartBp.data.diastolic} mmHg`
                  : "—/— mmHg"}
              </span>
            </div>
          </div>
        </section>

        {/* Sleep section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-800">Sleep</h4>
            <Link to="/health/sleep" className="text-sm text-emerald-600">
              View
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-emerald-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">Last night</span>
              <span className="mt-1 text-xl font-bold text-emerald-600">
                — hrs
              </span>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 flex flex-col items-start">
              <span className="text-sm text-slate-500">7-day avg</span>
              <span className="mt-1 text-xl font-bold text-emerald-600">
                — hrs
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
