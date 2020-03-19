import userEvent from "@testing-library/user-event";
import React from "react";
import { localeActions } from "src/redux/actions";
import { renderWithRedux } from "src/util/render";
import { ErrorBanner } from "./ErrorBanner";

jest.mock("src/redux/actions", () => ({
  localeActions: {
    ...jest.requireActual("src/redux/actions").localeActions,
    fetchNextLocale: (code: string) => ({ type: "fetchNextLocale" })
  }
}));

const setup = (state: any) => renderWithRedux(<ErrorBanner />, { locale: state });

it("Is hidden when no error is present", () => {
  const { queryByText } = setup({ status: "loaded" });
  expect(queryByText("There was a problem while retrieving your data.")).not.toBeVisible();
});

it("Clears the error when clicking on hide button.", () => {
  const { getByText, store } = setup({ status: "error" });
  userEvent.click(getByText("Hide"));
  expect(store.getActions()).toEqual([localeActions.clearError()]);
});

it("Tries to fetch the data again when clicking on retry button.", () => {
  const { getByText, store } = setup({ status: "error", nextCode: "it" });
  userEvent.click(getByText("Retry"));
  expect(store.getActions()).toEqual([{ type: "fetchNextLocale" }]);
});
