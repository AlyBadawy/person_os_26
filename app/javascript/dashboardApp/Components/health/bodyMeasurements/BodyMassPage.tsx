import React from "react";

export const BodyMassPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-slate-800">Body Mass</h2>
        <p className="text-sm text-slate-500">
          Placeholder for body mass related metrics (BMI, lean mass, etc.).
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-sm text-slate-700">No body mass data yet.</p>
      </div>
    </div>
  );
};
