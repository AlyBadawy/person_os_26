import React from "react";
import ReactDOM from "react-dom/client";
import { DashboardApp } from "./dashboardApp/DashboardApp";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("dashboard-root");

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <DashboardApp />
      </React.StrictMode>
    );
  }
});
