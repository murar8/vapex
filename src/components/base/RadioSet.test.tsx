import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { RadioElement, RadioSet, RadioSetProps } from "./RadioSet";

const setup = (props?: RadioSetProps) =>
  render(
    <RadioSet label="Select" {...props}>
      <RadioElement value="fst" label="first" />
      <RadioElement value="snd" label="second" />
      <RadioElement value="trd" label="third" />
    </RadioSet>
  );

it("Calls onChange when an item is clicked.", () => {
  const onChange = jest.fn();
  const { getByText } = setup({ onChange });

  const item = getByText("first");

  userEvent.click(item);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), "fst");
});
