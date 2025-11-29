import React from "react";

export const DashboardHabits = () => {
  return (
    <section className="lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Habits</h3>
          <p className="text-sm text-slate-500">Track your daily routines</p>
        </div>
        <button className="text-sm text-indigo-600 hover:underline">
          Add habit
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {["Hydration", "Morning walk", "Meditation"].map((h, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-500/80" />
              <span className="text-slate-700">{h}</span>
            </div>
            <div className="text-sm text-slate-400">0 / 1</div>
          </div>
        ))}
      </div>
    </section>
  );
};
