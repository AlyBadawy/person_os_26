import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./componnets/dashboard/Dashboard";
import { PageNotFound } from "./PageNotFound";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppLayout from "./componnets/AppLayout";
import { HealthLayout } from "./componnets/health/HealthLayout";
import { HealthOverview } from "./componnets/health/HealthOverview";
import { WeightPage } from "./componnets/health/WeightPage";
import { HeartPage } from "./componnets/health/HeartPage";

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
