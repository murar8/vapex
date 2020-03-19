import { MockStoreState } from "src/util/mockStore";
import { renderWithRedux } from "src/util/render";
import React from "react";
import { ErrorBanner } from "./ErrorBanner";
import userEvent from "@testing-library/user-event";
import { localeActions } from "src/redux/actions";

jest.mock("src/redux/actions", () => ({
  localeActions: {
    ...jest.requireActual("src/redux/actions").localeActions,
    fetchCurrentLocale: (code: string) => ({ type: "fetchCurrentLocale" })
  }
}));

const setup = (status: any) =>
  renderWithRedux(<ErrorBanner />, { locale: { status, error: "error message." } });

it("Is hidden when no error is present", () => {
  const { container, queryByText } = setup("loaded");
  expect(queryByText("There was a problem while retrieving your data.")).not.toBeVisible();
});

it("Clears the error when clicking on hide button.", () => {
  const { getByText, store } = setup("error");
  userEvent.click(getByText("Hide"));
  expect(store.getActions()).toEqual([localeActions.clearError()]);
});

it("Tries to fetch the data again when clicking on retry button.", () => {
  const { getByText, store } = setup("error");
  userEvent.click(getByText("Retry"));
  expect(store.getActions()).toEqual([{ type: "fetchCurrentLocale" }]);
});
