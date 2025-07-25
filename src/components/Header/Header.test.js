import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("renders logo text in header", () => {
  render(<Header />);
  const logo = screen.getByText(/reddit explorer/i);
  expect(logo).toBeInTheDocument();
});
