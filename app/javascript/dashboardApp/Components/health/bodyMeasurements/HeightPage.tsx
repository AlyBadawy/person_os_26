import React from "react";

export const HeightPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-slate-800">Height</h2>
        <p className="text-sm text-slate-500">
          Record and view height measurements.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-sm text-slate-700">No height measurements yet.</p>
      </div>
    </div>
  );
};
