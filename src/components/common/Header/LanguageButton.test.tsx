import userEvent from "@testing-library/user-event";
import React from "react";
import { MockStoreState } from "src/util/mockStore";
import { renderWithRedux } from "src/util/render";
import { LanguageButton } from "./LanguageButton";

jest.mock("src/redux/actions", () => ({
  localeActions: { fetchLocale: (code: string) => ({ type: "fetchLocale", code }) }
}));

const setup = () => {
  const initialState: MockStoreState = { locale: { currentCode: "en", status: "loaded" } };
  return renderWithRedux(<LanguageButton />, initialState);
};

it("Highlights selected locale.", () => {
  const { getByText } = setup();
  expect(getByText("English")).toHaveClass("Mui-selected");
});

it("Changes current locale.", () => {
  const { getByLabelText, getByText, store } = setup();

  userEvent.click(getByLabelText("Change Language"));
  userEvent.click(getByText("Italiano"));

  const actions = store.getActions();

  expect(actions).toHaveLength(1);
  expect(actions[0]).toEqual({ code: "it", type: "fetchLocale" });
});
