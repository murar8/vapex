import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BaseSelect, BaseSelectProps } from "./BaseSelect";
import { IconMenuProps } from "./IconMenu";
import { BaseRadio, BaseRadioProps } from "./BaseRadio";

const setup = (props?: BaseRadioProps<any>) =>
  render(
    <BaseRadio label="Select" items={{ fst: "first", snd: "second", trd: "third" }} {...props} />
  );

it("Calls onChange when an item is clicked.", () => {
  const onChange = jest.fn();
  const { getByText } = setup({ onChange });

  const item = getByText("first");

  userEvent.click(item);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), "fst");
});
