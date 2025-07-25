import { render, screen } from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";

test("search input", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );

  userEvent.type(screen.getByRole("textbox"), "Hello, World!");
  expect(screen.getByRole("textbox")).toHaveValue("Hello, World!");
});
