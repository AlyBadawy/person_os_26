import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/dashboard/Dashboard";
import { PageNotFound } from "./PageNotFound";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppLayout from "./Components/AppLayout";
import { HealthLayout } from "./Components/health/HealthLayout";
import { HealthOverview } from "./Components/health/HealthOverview";
import { WeightPage } from "./Components/health/WeightPage";
import { HeartPage } from "./Components/health/HeartPage";

export const DashboardApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/app">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="health" element={<HealthLayout />}>
              <Route index element={<HealthOverview />} />
              <Route path="weight" element={<WeightPage />} />
              <Route path="heart" element={<HeartPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
