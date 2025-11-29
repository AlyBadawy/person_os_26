import { useAddHeartMeasurementMutation } from "@/dashboardApp/store/api/HealthHeartMeasurementsApiSlice";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export const AddHeartMeasurement = () => {
  const [addHeartMeasurement] = useAddHeartMeasurementMutation();

  const [bpm, setBpm] = React.useState<number | "">("");
  const [systolic, setSystolic] = React.useState<number | "">("");
  const [diastolic, setDiastolic] = React.useState<number | "">("");
  const [measuredAt, setMeasuredAt] = React.useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      bpm: bpm === "" ? undefined : bpm,
      systolic: systolic === "" ? undefined : systolic,
      diastolic: diastolic === "" ? undefined : diastolic,
      measuredAt: new Date(measuredAt),
    };

    addHeartMeasurement(payload);
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
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={bpm === "" && (systolic === "" || diastolic === "")}
          >
            Add
          </button>
        </div>
      </form>

      <div className="hidden md:block">
        <hr className="my-6 border-slate-200" />

        <p className="text-sm mb-2">
          Tracking your BPM and blood pressure regularly helps detect
          irregularities and trends that may indicate hypertension, arrhythmia,
          or other cardiovascular concerns. Person OS centralizes your heart
          readings and visualizes changes over time, making it easier to
          recognize patterns, share data with your clinician, and take
          preventative action.
        </p>
        <p className="text-sm text-slate-500">
          Note: Soon, you will be able to add heart measurements via
          integrations like Apple Health or Google Fit.
        </p>
      </div>
    </div>
  );
};
