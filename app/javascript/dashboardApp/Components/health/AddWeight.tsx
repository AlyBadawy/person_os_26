import { useAddBodyMeasurementMutation } from "@/dashboardApp/store/api/BodyMeasurementsApiSlice";
import { WeightDisplayUnitEnum } from "@/dashboardApp/types/WeightUnits";
import React from "react";

export const AddWeight: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [addBodyMeasurement] = useAddBodyMeasurementMutation();
  const [unit, setUnit] = React.useState<WeightDisplayUnitEnum>(
    WeightDisplayUnitEnum.Kilograms
  );
  const [value, setValue] = React.useState<number>(0);
  const [measureAt, setMeasureAt] = React.useState<string>(
    new Date().toISOString().slice(0, 16)
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

    if (onClose) onClose();
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-800">Quick Add</h3>
        <button
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-slate-700"
          aria-label="Close quick add"
        >
          Close
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-600">Quickly record a measurement.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <label className="block">
            <span className="text-sm text-slate-500">Units</span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as WeightDisplayUnitEnum)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 bg-white"
            >
              <option value="kilograms">Kilograms (kg)</option>
              <option value="pounds">Pounds (lb)</option>
              <option value="stones">Stones (st)</option>
            </select>
          </label>

          <label className="block sm:col-span-1">
            <span className="text-sm text-slate-500">Value</span>
            <input
              type="number"
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                setValue(v === "" ? 0 : Number(v));
              }}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
              placeholder="e.g. 72.5"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-500">When</span>
            <input
              type="datetime-local"
              value={measureAt}
              onChange={(e) => setMeasureAt(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 bg-white"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
