import { useAddBodyMeasurementMutation } from "@/dashboardApp/store/api/HealthBodyMeasurementsApiSlice";
import { WeightDisplayUnitEnum } from "@/dashboardApp/types/WeightUnits";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export const AddWeight = () => {
  const [addBodyMeasurement] = useAddBodyMeasurementMutation();
  const [unit, setUnit] = React.useState<WeightDisplayUnitEnum>(
    WeightDisplayUnitEnum.Kilograms
  );
  const [value, setValue] = React.useState<number>(0);
  // datetime expects a local datetime string `YYYY-MM-DDTHH:mm`
  const toLocalInput = (d: Date) => {
    const tzOffset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - tzOffset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const [measureAt, setMeasureAt] = React.useState<string>(
    toLocalInput(new Date())
  );

  const handleAdd = () => {
    const payload = {
      unit,
      value,
      measuredAt: new Date(measureAt),
      topic: "weight",
    };
    // for now, just log the payload — could dispatch or call an API
    // eslint-disable-next-line no-console
    addBodyMeasurement(payload).unwrap();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Add Weight</h3>
          <p className="text-sm text-slate-500">
            Quickly record your body weight.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col">
          <span className="text-sm text-slate-600 mb-1">Units</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as WeightDisplayUnitEnum)}
            className="rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="kilograms">Kilograms (kg)</option>
            <option value="pounds">Pounds (lb)</option>
            <option value="stones">Stones (st)</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600 mb-1">Value</span>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              setValue(v === "" ? 0 : Number(v));
            }}
            placeholder="e.g. 72.5"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600 mb-1 flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-slate-400" />
            <span>When</span>
          </span>
          <input
            type="datetime-local"
            value={measureAt}
            onChange={(e) => setMeasureAt(e.target.value)}
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

      <div className="hidden md:block">
        <hr className="my-6 border-slate-200" />

        <p className="text-sm mb-2">
          Regularly tracking your weight helps you spot trends, understand how
          changes in diet and activity affect your body, and catch early signs
          of unwanted weight gain or loss. Person OS centralizes your
          measurements and visualizes trends over time, making it easy to log
          entries and use the data to make informed health decisions.
        </p>
        <p className="text-sm text-slate-500">
          Note: Soon, you will be able to add weight measurements via
          integrations like Apple Health or Google Fit.
        </p>
      </div>
    </div>
  );
};
