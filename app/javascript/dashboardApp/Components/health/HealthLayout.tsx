import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export const HealthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-50 p-6">
      <div className="mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Health</h1>
          <p className="text-sm text-slate-500">
            Browse health measurements and details.
          </p>
          <nav className="mt-3 flex gap-3">
            <NavLink
              to="/health"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-sm text-indigo-700 font-semibold underline"
                  : "text-sm text-slate-600 hover:underline"
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="weight"
              className={({ isActive }) =>
                isActive
                  ? "text-sm text-indigo-700 font-semibold underline"
                  : "text-sm text-slate-600 hover:underline"
              }
            >
              Weight
            </NavLink>

            <NavLink
              to="heart"
              className={({ isActive }) =>
                isActive
                  ? "text-sm text-indigo-700 font-semibold underline"
                  : "text-sm text-slate-600 hover:underline"
              }
            >
              Heart
            </NavLink>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
