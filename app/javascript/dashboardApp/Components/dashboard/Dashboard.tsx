import React from "react";
import { closeSidebar } from "../../store/slices/LayoutSlice";
import { useAppDispatch } from "../../store/store";
import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardHabits } from "./DashboardHabits";
import { DashboardHealth } from "./DashboardHealth";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  // close modal on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeSidebar());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  return (
    <div className="bg-linear-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <main className="flex flex-col items-start gap-6">
          {/* First row: Calendar + Habits (two columns on large screens, stacked on small) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="w-full h-full min-h-0">
              <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-hidden">
                <DashboardCalendar />
              </div>
            </div>
            <div className="w-full h-full min-h-0">
              <div className="h-full bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-hidden">
                <DashboardHabits />
              </div>
            </div>
          </div>

          {/* Second row: Health (full width) */}
          <div className="w-full">
            <DashboardHealth />
          </div>

          {/* Third row: Finance overview placeholder */}
          <section className="w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-700">
                Finance Overview
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Placeholder for finance charts and summaries — coming soon.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-24 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-sm text-slate-400">
                  Net Worth
                </div>
                <div className="h-24 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-sm text-slate-400">
                  Monthly Income
                </div>
                <div className="h-24 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-sm text-slate-400">
                  Monthly Expenses
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
