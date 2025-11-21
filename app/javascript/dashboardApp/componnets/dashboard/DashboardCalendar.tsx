import React from "react";

export const DashboardCalendar = () => {
  return (
    <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Calendar</h2>
        <div className="text-sm text-slate-500">Placeholder</div>
      </div>

      <div className="h-80 rounded-md border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-6xl">📅</div>
          <p className="mt-3 text-slate-600">Your calendar will appear here.</p>
          <p className="mt-1 text-sm text-slate-400">
            Events, appointments, and reminders
          </p>
        </div>
      </div>
    </section>
  );
};
