import React from "react";
import ReactDOM from "react-dom/client";
import { DashboardApp } from "./dashboardApp/DashboardApp";
import { Provider } from "react-redux";
import { store } from "./dashboardApp/store/store";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("dashboard-root");

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <DashboardApp />
        </Provider>
      </React.StrictMode>
    );
  }
});
