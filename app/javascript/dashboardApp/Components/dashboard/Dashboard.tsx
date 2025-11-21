import { useGetMeQuery } from "@/dashboardApp/store/api/MeApiSlice";
import React from "react";
import { FiClock, FiCheck } from "react-icons/fi";
import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardHealth } from "./DashboardHealth";
import { DashboardHabits } from "./DashboardHabits";
import { useAppDispatch } from "../../store/store";
import { closeSidebar } from "../../store/slices/LayoutSlice";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMeQuery();

  // close modal on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeSidebar());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Hello, {userData?.me.email ? userData.me.email : "User"} —
                welcome back!
              </h1>
              <p className="mt-1 text-slate-600">
                Here&rsquo;s what is happening in your health hub today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
                <FiClock className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium">Today</span>
              </button>
              <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition">
                <FiCheck className="w-5 h-5" />
                <span className="text-sm font-semibold">Quick Add</span>
              </button>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - large left area on large screens */}
          <DashboardCalendar />

          {/* Right column - Health + Habits */}
          <section className="space-y-6">
            <DashboardHealth />
            <DashboardHabits />
          </section>
        </main>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          This is a minimal dashboard layout — placeholders can be replaced with
          real widgets.
        </footer>
      </div>
    </div>
  );
};
