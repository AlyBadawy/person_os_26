import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-rose-50 p-6">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-12 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="text-6xl animate-bounce">🚀</div>
        </div>

        <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-indigo-600">
          404
        </h1>
        <p className="text-lg text-slate-700 mb-4">
          Whoops — looks like this page went on an adventure.
        </p>

        <p className="text-sm text-slate-500 mb-6">
          But don’t worry — we packed a map and a button to get you home.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 font-semibold shadow-md transition"
          >
            <span className="text-sm">Take me to the dashboard</span>
          </Link>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-indigo-600 hover:underline self-center"
            aria-disabled="true"
          >
            Report an issue
          </a>
        </div>

        <div className="mt-6 text-xs text-slate-400">
          Tip: try checking the URL or using the navigation menu.
        </div>
      </div>
    </div>
  );
};
