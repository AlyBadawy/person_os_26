import React from "react";

export const SleepPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-slate-800">Sleep</h2>
        <p className="text-sm text-slate-500">View and add sleep data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-700">
            Sleep last night
          </h3>
          <div className="mt-3 text-2xl font-bold text-emerald-600">— hrs</div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-700">7-day average</h3>
          <div className="mt-3 text-2xl font-bold text-emerald-600">— hrs</div>
        </div>
      </div>
    </div>
  );
};
