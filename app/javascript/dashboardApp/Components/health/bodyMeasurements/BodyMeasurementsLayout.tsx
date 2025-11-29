import { NavLink, Outlet } from "react-router-dom";

export const BodyMeasurementsLayout = () => {
  const tabClass = (isActive: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-t ${
      isActive
        ? "bg-white border-t border-x border-slate-200 -mb-px text-slate-900"
        : "text-slate-600 hover:text-slate-800"
    }`;

  return (
    <div>
      <div className="border-b border-slate-200 mb-4">
        <nav
          className="flex gap-2"
          role="tablist"
          aria-label="Body measurements tabs"
        >
          <NavLink to="weight" className={({ isActive }) => tabClass(isActive)}>
            Weight
          </NavLink>
          <NavLink to="height" className={({ isActive }) => tabClass(isActive)}>
            Height
          </NavLink>
          <NavLink
            to="body-mass"
            className={({ isActive }) => tabClass(isActive)}
          >
            Body Mass
          </NavLink>
          <NavLink to="fat" className={({ isActive }) => tabClass(isActive)}>
            Fat
          </NavLink>
          <NavLink
            to="measurements"
            className={({ isActive }) => tabClass(isActive)}
          >
            Measurements
          </NavLink>
        </nav>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};
