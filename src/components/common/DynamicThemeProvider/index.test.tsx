import React from "react";
import { DynamicThemeProvider } from ".";
import { usePalette } from "./PaletteContext";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const spy = jest.spyOn(window.localStorage.__proto__, "getItem");

const Child = () => {
  const { palette, changePalette } = usePalette();
  return (
    <>
      <p>{palette}</p>
      <button onClick={() => changePalette("Sunrise")}>Change Palette</button>
    </>
  );
};

const setup = () =>
  render(
    <DynamicThemeProvider>
      <Child />
    </DynamicThemeProvider>
  );

it("Changes the palette.", () => {
  spy.mockImplementationOnce(() => "Stormy");
  const { getByText, queryByText } = setup();

  userEvent.click(getByText("Change Palette"));

  expect(queryByText("Sunrise")).toBeTruthy();
});
