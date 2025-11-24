import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FiCalendar } from "react-icons/fi";

const sampleBpm = [
  { time: "2025-11-20", bpm: 72 },
  { time: "2025-11-21", bpm: 74 },
  { time: "2025-11-22", bpm: 70 },
  { time: "2025-11-23", bpm: 68 },
  { time: "2025-11-24", bpm: 71 },
];

const sampleBp = [
  { time: "2025-11-20", systolic: 120, diastolic: 78 },
  { time: "2025-11-21", systolic: 125, diastolic: 80 },
  { time: "2025-11-22", systolic: 118, diastolic: 76 },
  { time: "2025-11-23", systolic: 122, diastolic: 79 },
  { time: "2025-11-24", systolic: 121, diastolic: 77 },
];

const HeartBpmChart = () => {
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampleBpm}
          margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bpm"
            stroke="#e11d48"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const BloodPressureChart = () => {
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampleBp}
          margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
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

const AddHeart = () => {
  const [bpm, setBpm] = React.useState<number | "">("");
  const [systolic, setSystolic] = React.useState<number | "">("");
  const [diastolic, setDiastolic] = React.useState<number | "">("");
  const [measuredAt, setMeasuredAt] = React.useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: not wired to backend yet
    // eslint-disable-next-line no-console
    console.log({ bpm, systolic, diastolic, measuredAt });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Add Heart Data
          </h3>
          <p className="text-sm text-slate-500">
            Quickly record BPM and blood pressure.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-slate-600 mb-1">BPM</span>
          <input
            type="number"
            value={bpm}
            onChange={(e) =>
              setBpm(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 72"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-slate-600 mb-1">Systolic</span>
            <input
              type="number"
              value={systolic}
              onChange={(e) =>
                setSystolic(e.target.value === "" ? "" : Number(e.target.value))
              }
              required={!!diastolic}
              placeholder="e.g. 120"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-slate-600 mb-1">Diastolic</span>
            <input
              type="number"
              value={diastolic}
              onChange={(e) =>
                setDiastolic(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              required={!!systolic}
              placeholder="e.g. 80"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600 mb-1 flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-slate-400" />
            <span>When</span>
          </span>
          <input
            type="datetime-local"
            value={measuredAt}
            onChange={(e) => setMeasuredAt(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

const HeartTable = () => {
  // placeholder rows — not wired to backend
  const rows = [
    {
      id: 1,
      measuredAt: "2025-11-24T08:30",
      bpm: 71,
      systolic: 121,
      diastolic: 77,
    },
    {
      id: 2,
      measuredAt: "2025-11-23T09:00",
      bpm: 68,
      systolic: 122,
      diastolic: 79,
    },
  ];

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-3">Date / Time</th>
            <th className="pb-3">BPM</th>
            <th className="pb-3">BP (S/D)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100">
              <td className="py-3 text-slate-700">
                {new Date(r.measuredAt).toLocaleString()}
              </td>
              <td className="py-3 font-medium text-slate-800">{r.bpm}</td>
              <td className="py-3 text-slate-700">
                {r.systolic}/{r.diastolic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const HeartPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts area: left 2/3 */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Heart</h2>
              <p className="text-sm text-slate-500">
                BPM and blood pressure trends
              </p>
            </div>
          </div>

          {/* Two stacked charts */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Heart Rate (BPM)
              </h3>
              <HeartBpmChart />
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Blood Pressure (Systolic / Diastolic)
              </h3>
              <BloodPressureChart />
            </div>
          </div>
        </div>

        {/* Table: right 1/3 */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <HeartTable />
        </div>
      </div>

      <div className="flex gap-8">
        <AddHeart />
        <div className="bg-white rounded-2xl p-6 shadow-md flex-1">
          <h3 className="text-lg font-semibold text-slate-800">
            Tracking Heart Metrics
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Recording heart rate and blood pressure regularly helps you monitor
            cardiovascular health and notice trends over time.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            This form is a placeholder and does not send data to the backend
            yet.
          </p>
        </div>
      </div>
    </div>
  );
};
