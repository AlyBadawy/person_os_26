import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../store/api/MeApiSlice";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { useAppDispatch } from "../store/store";
import { closeSidebar } from "../store/slices/LayoutSlice";

export const AppLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMeQuery();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeSidebar());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  const navigate = useNavigate();

  const handleLogout = () => {
    // placeholder logout action; replace with real auth/logout flow
    // eslint-disable-next-line no-console
    console.info("logout requested");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-md px-3 py-1 text-lg font-bold">
                Person OS
              </div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-sm text-slate-600">
                hi, {userData?.me?.email ?? "User"}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                <FiHome className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                <FiSettings className="w-5 h-5 text-slate-700" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Render page content */}
        <Outlet />

        <footer className="mt-8 text-center text-slate-500 text-sm">
          This is a minimal dashboard layout — placeholders can be replaced with
          real widgets.
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
