import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BaseSelect, BaseSelectProps } from "./BaseSelect";

const setup = (props?: BaseSelectProps<any>) =>
  render(
    <BaseSelect
      label="Select"
      items={{ fst: "first", snd: "second", trd: "third" }}
      selected="snd"
      {...props}
    />
  );

const setupAndOpen = (props?: BaseSelectProps<any>) => {
  const result = setup(props);
  const button = result.getByLabelText("Select");

  userEvent.click(button);

  return result;
};

it("Opens the menu when the button is clicked.", () => {
  const { getByLabelText, getByText, queryByText } = setup();

  expect(queryByText("first")).toBeFalsy();

  const button = getByLabelText("Select");
  userEvent.click(button);

  expect(getByText("first")).toBeVisible();
});

it("Calls onChange when an item is clicked.", () => {
  const onChange = jest.fn();
  const { getByText } = setupAndOpen({ onChange });

  const item = getByText("first");

  userEvent.click(item);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), "fst");
});

it("Highlights the selected item.", () => {
  const { getAllByRole } = setupAndOpen();

  const item = getAllByRole("option")[1];

  expect(item).toHaveClass("Mui-selected");
});
