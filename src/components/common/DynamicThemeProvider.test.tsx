import React from "react";
import { renderWithRedux } from "src/util/render";
import { DynamicThemeProvider } from "./DynamicThemeProvider";

const setup = () => {
  const ui = <DynamicThemeProvider />;
  return renderWithRedux(ui, { locale: { currentCode: "it" }, palette: { name: "Ravenbridge" } });
};

it("Renders without crashing.", () => {
  expect(() => setup()).not.toThrow();
});
