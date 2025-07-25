import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "../../store";

test("renders logo text in header", () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const logo = screen.getByText(/reddit/i);
  expect(logo).toBeInTheDocument();
});
