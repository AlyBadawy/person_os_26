import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Dashboard } from "../Dashboard";

test("renders header and counter works", async () => {
  const user = userEvent.setup();
  render(<Dashboard />);

  expect(screen.getByText(/Welcome to Your Dashboard/i)).toBeInTheDocument();

  const plus = screen.getByRole("button", { name: "+" });
  const minus = screen.getByRole("button", { name: "-" });
  const reset = screen.getByRole("button", { name: /Reset/i });

  // initial count
  expect(screen.getByText("0")).toBeInTheDocument();

  await user.click(plus);
  expect(screen.getByText("1")).toBeInTheDocument();

  await user.click(minus);
  expect(screen.getByText("0")).toBeInTheDocument();

  await user.click(reset);
  expect(screen.getByText("0")).toBeInTheDocument();
});
