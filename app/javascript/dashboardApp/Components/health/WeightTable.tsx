import { BodyMeasurement } from "@/dashboardApp/store/api/BodyMeasurementsApiSlice";
import { WeightUnitEnum } from "@/dashboardApp/types/WeightUnits";
import { getWeightValueForUnit } from "@/dashboardApp/utils/getWeightValueForUnit";

export const WeightTable = ({
  weightMeasurements,
  weightUnit,
}: {
  weightMeasurements: BodyMeasurement[];
  weightUnit: WeightUnitEnum;
}) => {
  const showScrollable = weightMeasurements.length > 6;
  return (
    <div className={showScrollable ? "max-h-72 overflow-y-auto" : ""}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-3 sticky top-0 bg-white z-10">Date / Time</th>
            <th className="pb-3 sticky top-0 bg-white z-10">Value</th>
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
                  <td className="py-3 text-slate-700">
                    {new Date(m.measuredAt).toLocaleString()}
                  </td>
                  <td className="py-3 font-medium text-slate-800">
                    {displayVal} {weightUnit}
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
