import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardHealth } from "./DashboardHealth";
import { DahboardHabits } from "./dashboard/DahboardHabits";

export const Dashboard = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar - large left area on large screens */}
      <DashboardCalendar />

      {/* Right column - Health + Habits */}
      <section className="space-y-6">
        <DashboardHealth />
        <DahboardHabits />
      </section>
    </main>
  );
};
