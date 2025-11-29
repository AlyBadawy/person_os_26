import { NavLink, Outlet } from "react-router-dom";

export const HealthLayout = () => {
  const tabClass = (isActive: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-t ${
      isActive
        ? "bg-white border-t border-x border-slate-200 -mb-px text-slate-900"
        : "text-slate-600 hover:text-slate-800"
    }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-50 p-6">
      <div className="mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Health</h1>
          <p className="text-sm text-slate-500">
            Browse health measurements and details.
          </p>

          <div className="border-b border-slate-200 mt-3">
            <nav className="flex gap-2" role="tablist" aria-label="Health tabs">
              <NavLink
                to="/health"
                end
                className={({ isActive }) => tabClass(isActive)}
              >
                Overview
              </NavLink>
              <NavLink
                to="body-measurements"
                className={({ isActive }) => tabClass(isActive)}
              >
                Body Measurements
              </NavLink>
              <NavLink
                to="heart"
                className={({ isActive }) => tabClass(isActive)}
              >
                Heart
              </NavLink>
              <NavLink
                to="sleep"
                className={({ isActive }) => tabClass(isActive)}
              >
                Sleep
              </NavLink>
            </nav>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
