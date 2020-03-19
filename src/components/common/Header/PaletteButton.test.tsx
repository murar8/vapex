import userEvent from "@testing-library/user-event";
import React from "react";
import { paletteActions } from "src/redux/actions";
import { renderWithRedux } from "src/util/render";
import { PaletteButton } from "./PaletteButton";

const setup = () => renderWithRedux(<PaletteButton />, { palette: { name: "Ravenbridge" } });

it("Highlights selected palette.", () => {
  const { getByText } = setup();
  expect(getByText("Ravenbridge")).toHaveClass("Mui-selected");
});

it("Changes current palette.", () => {
  const { getByLabelText, getByText, store } = setup();

  userEvent.click(getByLabelText("Change Palette"));
  userEvent.click(getByText("Stormy"));

  const actions = store.getActions();

  expect(actions).toEqual([paletteActions.setPalette("Stormy")]);
});
