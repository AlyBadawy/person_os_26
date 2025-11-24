import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dashboard } from "../Components/dashboard/Dashboard";

// Mock subcomponents used by Dashboard so this test focuses on main layout
jest.mock("../Components/dashboard/DashboardCalendar", () => ({
  DashboardCalendar: () => <div data-testid="calendar">Calendar</div>,
}));
jest.mock("../Components/dashboard/DashboardHealth", () => ({
  DashboardHealth: () => <div data-testid="health">Health</div>,
}));
jest.mock("../Components/dashboard/DashboardHabits", () => ({
  DashboardHabits: () => <div data-testid="habits">Habits</div>,
}));

// Mock API hook that provides current user
jest.mock("../store/api/MeApiSlice", () => ({
  useGetMeQuery: () => ({ data: { me: { email: "alice@example.com" } } }),
}));

// Mock store hooks used in the component
jest.mock("../store/store", () => ({
  useAppDispatch: () => jest.fn(),
}));

test("renders dashboard header and main widgets", async () => {
  render(<Dashboard />);

  // greeting should include the mocked user email
  expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();

  // Quick Add button present
  expect(
    screen.getByRole("button", { name: /Quick Add/i })
  ).toBeInTheDocument();

  // mocked sub-widgets render
  expect(screen.getByTestId("calendar")).toBeInTheDocument();
  expect(screen.getByTestId("health")).toBeInTheDocument();
  expect(screen.getByTestId("habits")).toBeInTheDocument();
});
