import React, { useState } from "react";
import {
  BodyMeasurement,
  useDeleteBodyMeasurementMutation,
  useUpdateBodyMeasurementMutation,
} from "@/dashboardApp/store/api/HealthBodyMeasurementsApiSlice";
import {
  WeightUnitEnum,
  WeightDisplayUnitEnum,
} from "@/dashboardApp/types/WeightUnits";
import { getWeightValueForUnit } from "@/dashboardApp/utils/getWeightValueForUnit";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

export const WeightTable = ({
  weightMeasurements,
  weightUnit,
}: {
  weightMeasurements: BodyMeasurement[];
  weightUnit: WeightUnitEnum;
}) => {
  const [
    deleteBodyMeasurement,
    { isError: isDeleteError, error: deleteError },
  ] = useDeleteBodyMeasurementMutation();
  const [
    updateBodyMeasurement,
    { isError: isUpdateError, error: updateError },
  ] = useUpdateBodyMeasurementMutation();

  const showScrollable = weightMeasurements.length > 5;

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [editingDate, setEditingDate] = useState<string>("");
  const handleDelete = async (id: number) => {
    await deleteBodyMeasurement(id).unwrap();
  };

  const startEdit = (m: BodyMeasurement) => {
    const raw = getWeightValueForUnit(m, weightUnit);
    setEditingValue(raw == null ? "" : String(Number(raw).toFixed(1)));
    setEditingId(m.id);
    // set editingDate to a value suitable for `datetime` input
    const toLocalInput = (d: Date) => {
      const tzOffset = d.getTimezoneOffset();
      const local = new Date(d.getTime() - tzOffset * 60000);
      return local.toISOString().slice(0, 16);
    };
    setEditingDate(toLocalInput(new Date(m.measuredAt)));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
    setEditingDate("");
  };

  const saveEdit = async (m: BodyMeasurement) => {
    const parsed = parseFloat(editingValue);
    if (Number.isNaN(parsed)) return;
    const payload = {
      value: parsed,
      unit: ((): WeightDisplayUnitEnum => {
        switch (weightUnit) {
          case WeightUnitEnum.Kilograms:
            return WeightDisplayUnitEnum.Kilograms;
          case WeightUnitEnum.Pounds:
            return WeightDisplayUnitEnum.Pounds;
          case WeightUnitEnum.Stones:
            return WeightDisplayUnitEnum.Stones;
        }
      })(),
      measuredAt: editingDate ? new Date(editingDate) : new Date(m.measuredAt),
      topic: m.topic,
    };
    await updateBodyMeasurement({ id: m.id, payload }).unwrap();
    cancelEdit();
  };

  return (
    <div className={showScrollable ? "max-h-72 overflow-y-auto" : ""}>
      {(isDeleteError || isUpdateError) && (
        <div className="mb-2 text-rose-600">
          Error: {String(deleteError ?? updateError ?? "")}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-3 sticky top-0 bg-white z-10">Date / Time</th>
            <th className="pb-3 sticky top-0 bg-white z-10">Value</th>
            <th className="pb-3 sticky top-0 bg-white z-10">✍🏻</th>
          </tr>
        </thead>

        <tbody>
          {weightMeasurements.length === 0 ? (
            <tr>
              <td colSpan={2} className="py-4 text-slate-500">
                No weight measurements yet.
              </td>
            </tr>
          ) : (
            [...weightMeasurements].reverse().map((m) => {
              const rawVal = getWeightValueForUnit(
                m as BodyMeasurement,
                weightUnit
              );
              const displayVal =
                rawVal == null ? "—" : Number(rawVal).toFixed(1);
              return (
                <tr key={m.id} className="border-t border-slate-100">
                  {editingId === m.id ? (
                    <input
                      type="datetime-local"
                      value={editingDate}
                      onChange={(e) => setEditingDate(e.target.value)}
                      className="border rounded px-2 py-1 w-40 text-sm"
                    />
                  ) : (
                    <td className="py-3 text-slate-700">
                      {new Date(m.measuredAt).toLocaleString()}
                    </td>
                  )}
                  <td className="py-3 font-medium text-slate-800">
                    {editingId === m.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="border rounded px-2 py-1 w-20 text-sm"
                        />
                      </div>
                    ) : (
                      <>
                        {displayVal} {weightUnit}
                      </>
                    )}
                  </td>
                  <td className="py-3 text-slate-700 flex items-center gap-2">
                    {editingId === m.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEdit(m)}
                          title="Save"
                          className="p-1 rounded hover:bg-slate-100"
                        >
                          <FiSave className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => cancelEdit()}
                          title="Cancel"
                          className="p-1 rounded hover:bg-slate-100"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          aria-label={`edit-${m.id}`}
                          title="Edit"
                          className="p-1 rounded hover:bg-slate-100"
                          onClick={() => startEdit(m)}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`delete-${m.id}`}
                          title="Delete"
                          className="p-1 rounded hover:bg-slate-100"
                          onClick={() => handleDelete(m.id)}
                        >
                          <FiTrash2 className="w-4 h-4 text-rose-500" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
