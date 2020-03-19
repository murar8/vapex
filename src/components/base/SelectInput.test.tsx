import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SelectInput, SelectInputProps } from "./SelectInput";
import { MenuItem } from "@material-ui/core";

const setup = (props?: SelectInputProps) =>
  render(
    <SelectInput label="Select" value="snd" {...props}>
      <MenuItem value="fst">first</MenuItem>
      <MenuItem value="snd">second</MenuItem>
      <MenuItem value="trd">third</MenuItem>
    </SelectInput>
  );

const setupAndOpen = (props?: SelectInputProps) => {
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
