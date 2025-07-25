import { render, screen } from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

test("search input", () => {
  render(<Search />);

  userEvent.type(screen.getByRole("text"), "Hello, World!");
  expect(screen.getByRole("text")).toHaveValue("Hello, World!");
});
