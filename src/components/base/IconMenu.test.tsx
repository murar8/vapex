import { AcUnit } from "@material-ui/icons";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IconMenu, IconMenuProps } from "./IconMenu";

const setup = (props?: IconMenuProps<any>) =>
  render(
    <IconMenu
      icon={<AcUnit />}
      label="Menu"
      items={{ fst: "first", snd: "second", trd: "third" }}
      selected="snd"
      {...props}
    />
  );

const setupAndOpen = (props?: IconMenuProps<any>) => {
  const result = setup(props);

  const button = result.getByLabelText("Menu");

  userEvent.click(button);

  return result;
};

it("Opens the menu when the button is clicked.", () => {
  const { getByLabelText, getByText } = setup();

  const button = getByLabelText("Menu");
  const item = getByText("first");

  expect(item).not.toBeVisible();

  userEvent.click(button);

  expect(item).toBeVisible();
});

it("Calls onItemClick when an item is clicked.", () => {
  const onItemClick = jest.fn();
  const { getByText } = setupAndOpen({ onItemClick });

  const item = getByText("first");

  userEvent.click(item);

  expect(onItemClick).toHaveBeenCalledTimes(1);
  expect(onItemClick).toHaveBeenCalledWith(expect.any(Object), "fst");
});

it("Closes the menu when an item is clicked.", () => {
  const { getByText } = setupAndOpen();

  const item = getByText("first");

  userEvent.click(item);

  expect(item).not.toBeVisible();
});

it("Highlights the selected item.", () => {
  const { getByText } = setupAndOpen();

  const item = getByText("second");

  expect(item).toHaveClass("Mui-selected");
});
