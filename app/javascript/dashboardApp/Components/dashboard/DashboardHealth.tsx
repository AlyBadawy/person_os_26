import { useGetBodyMeasurementsQuery } from "../../store/api/BodyMeasurementsApiSlice";
import { Link } from "react-router-dom";

export const DashboardHealth = () => {
  const { data: measurementsData } = useGetBodyMeasurementsQuery();

  const latestWeight = measurementsData
    ?.filter((measurement) => measurement.topic === "weight")
    .sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
    )[0];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Health</h3>
          <p className="text-sm text-slate-500">Quick snapshot</p>
        </div>
        <div className="text-sm text-slate-400">Updated now</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          className="bg-indigo-50 rounded-lg p-3 flex flex-col items-start cursor-pointer"
          to="/health/weight"
        >
          <span className="text-sm text-slate-500">Weight</span>
          <span className="mt-1 text-xl font-bold text-indigo-600">
            {latestWeight
              ? `${latestWeight.data.originalValue} ${latestWeight.data.originalUnit}`
              : "— kg"}
          </span>
        </Link>
        <div className="bg-rose-50 rounded-lg p-3 flex flex-col items-start">
          <span className="text-sm text-slate-500">Heart</span>
          <span className="mt-1 text-xl font-bold text-rose-600">— bpm</span>
        </div>
        <div className="bg-emerald-50 rounded-lg p-3 flex flex-col items-start">
          <span className="text-sm text-slate-500">Sleep</span>
          <span className="mt-1 text-xl font-bold text-emerald-600">— hrs</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 flex flex-col items-start">
          <span className="text-sm text-slate-500">Steps</span>
          <span className="mt-1 text-xl font-bold text-yellow-600">—</span>
        </div>
      </div>
    </div>
  );
};
