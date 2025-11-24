import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./Components/AppLayout";
import { Dashboard } from "./Components/dashboard/Dashboard";
import { HealthLayout } from "./Components/health/HealthLayout";
import { HealthOverview } from "./Components/health/HealthOverview";
import { WeightPage } from "./Components/health/bodyMeasurements/WeightPage";
import { HeartPage } from "./Components/health/heart/HeartPage";
import { PageNotFound } from "./PageNotFound";
import { store } from "./store/store";

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
