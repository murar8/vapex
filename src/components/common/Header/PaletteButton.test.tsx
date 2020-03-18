import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { PaletteButton } from "./PaletteButton";

it("Changes current theme.", () => {
  const toggle = jest.fn() as any;
  const { getByRole } = render(<PaletteButton togglePalette={toggle} />);
  userEvent.click(getByRole("button"));
  expect(toggle).toHaveBeenCalledTimes(1);
});
