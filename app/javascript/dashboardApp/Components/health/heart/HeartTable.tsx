import React, { useState } from "react";
import {
  HeartMeasurement,
  useDeleteHeartMeasurementMutation,
  useUpdateHeartMeasurementMutation,
} from "@/dashboardApp/store/api/HealthHeartMeasurementsApiSlice";
import { FiTrash2, FiEdit2, FiSave, FiX } from "react-icons/fi";

export const HeartTable = ({
  measurements,
}: {
  measurements: HeartMeasurement[];
}) => {
  // placeholder rows — not wired to backend
  const rows = measurements.slice().sort((a, b) => {
    return new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime();
  });

  const [
    deleteHeartMeasurement,
    { isError: isDeleteError, error: deleteError },
  ] = useDeleteHeartMeasurementMutation();
  const [
    updateHeartMeasurement,
    { isError: isUpdateError, error: updateError },
  ] = useUpdateHeartMeasurementMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingBpm, setEditingBpm] = useState<string>("");
  const [editingSystolic, setEditingSystolic] = useState<string>("");
  const [editingDiastolic, setEditingDiastolic] = useState<string>("");
  const [editingDate, setEditingDate] = useState<string>("");

  const handleDelete = async (id: number) => {
    await deleteHeartMeasurement(id).unwrap();
  };

  const startEdit = (m: HeartMeasurement) => {
    setEditingId(m.id);
    setEditingBpm(m.data.bpm == null ? "" : String(m.data.bpm));
    setEditingSystolic(m.data.systolic == null ? "" : String(m.data.systolic));
    setEditingDiastolic(
      m.data.diastolic == null ? "" : String(m.data.diastolic)
    );
    const toLocalInput = (d: Date) => {
      const tzOffset = d.getTimezoneOffset();
      const local = new Date(d.getTime() - tzOffset * 60000);
      return local.toISOString().slice(0, 16);
    };
    setEditingDate(toLocalInput(new Date(m.measuredAt)));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingBpm("");
    setEditingSystolic("");
    setEditingDiastolic("");
    setEditingDate("");
  };

  const saveEdit = async (m: HeartMeasurement) => {
    const bpm = editingBpm === "" ? undefined : Number(editingBpm);
    const systolic =
      editingSystolic === "" ? undefined : Number(editingSystolic);
    const diastolic =
      editingDiastolic === "" ? undefined : Number(editingDiastolic);
    const payload = {
      measuredAt: editingDate ? new Date(editingDate) : new Date(m.measuredAt),
      bpm,
      systolic,
      diastolic,
    };
    await updateHeartMeasurement({ id: m.id, payload }).unwrap();
    cancelEdit();
  };

  return (
    <div>
      {(isDeleteError || isUpdateError) && (
        <div className="mb-2 text-rose-600">
          Error: {String(deleteError ?? updateError ?? "")}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-3">Date / Time</th>
            <th className="pb-3">BPM</th>
            <th className="pb-3">BP (S/D)</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100">
              {editingId === r.id ? (
                <input
                  type="datetime-local"
                  value={editingDate}
                  onChange={(e) => setEditingDate(e.target.value)}
                  className="border rounded px-2 py-1 w-40 text-sm"
                />
              ) : (
                <td className="py-3 text-slate-700">
                  {new Date(r.measuredAt).toLocaleString()}
                </td>
              )}

              <td className="py-3 font-medium text-slate-800">
                {editingId === r.id ? (
                  <input
                    type="number"
                    step="1"
                    value={editingBpm}
                    onChange={(e) => setEditingBpm(e.target.value)}
                    className="border rounded px-2 py-1 w-20 text-sm"
                  />
                ) : (
                  r.data.bpm ?? "N/A"
                )}
              </td>

              <td className="py-3 text-slate-700">
                {editingId === r.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="1"
                      value={editingSystolic}
                      onChange={(e) => setEditingSystolic(e.target.value)}
                      className="border rounded px-2 py-1 w-20 text-sm"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      step="1"
                      value={editingDiastolic}
                      onChange={(e) => setEditingDiastolic(e.target.value)}
                      className="border rounded px-2 py-1 w-20 text-sm"
                    />
                  </div>
                ) : r.data.diastolic === undefined ||
                  r.data.systolic == undefined ? (
                  "N/A"
                ) : (
                  `${r.data.systolic}/${r.data.diastolic}`
                )}
              </td>

              <td className="py-3 text-slate-700 flex items-center gap-2">
                {editingId === r.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => saveEdit(r)}
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
                      aria-label={`edit-${r.id}`}
                      title="Edit"
                      className="p-1 rounded hover:bg-slate-100"
                      onClick={() => startEdit(r)}
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`delete-${r.id}`}
                      title="Delete"
                      className="p-1 rounded hover:bg-slate-100"
                      onClick={() => handleDelete(r.id)}
                    >
                      <FiTrash2 className="w-4 h-4 text-rose-500" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
