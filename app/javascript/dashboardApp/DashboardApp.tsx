import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./Components/AppLayout";
import { Dashboard } from "./Components/dashboard/Dashboard";
import { HealthLayout } from "./Components/health/HealthLayout";
import { HealthOverview } from "./Components/health/HealthOverview";
import { BodyMassPage } from "./Components/health/bodyMeasurements/BodyMassPage";
import { BodyMeasurementsLayout } from "./Components/health/bodyMeasurements/BodyMeasurementsLayout";
import { FatPage } from "./Components/health/bodyMeasurements/FatPage";
import { HeightPage } from "./Components/health/bodyMeasurements/HeightPage";
import { WeightPage } from "./Components/health/bodyMeasurements/WeightPage";
import { HeartPage } from "./Components/health/heart/HeartPage";
import { SleepPage } from "./Components/health/sleep/SleepPage";
import { PageNotFound } from "./PageNotFound";

export const DashboardApp = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="today" element={<div>Today Page</div>} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="health" element={<HealthLayout />}>
            <Route index element={<HealthOverview />} />
            <Route
              path="body-measurements"
              element={<BodyMeasurementsLayout />}
            >
              <Route
                index
                element={
                  <Navigate to="/health/body-measurements/weight" replace />
                }
              />
              <Route path="weight" element={<WeightPage />} />
              <Route path="height" element={<HeightPage />} />
              <Route path="body-mass" element={<BodyMassPage />} />
              <Route path="fat" element={<FatPage />} />
            </Route>
            <Route path="heart" element={<HeartPage />} />
            <Route path="sleep" element={<SleepPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
