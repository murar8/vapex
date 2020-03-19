import userEvent from "@testing-library/user-event";
import React from "react";
import { renderWithRouter } from "src/util/render";
import { LinkTab, LinkTabs } from "./LinkTabs";

const setup = (path = "/") => {
  const item = (
    <LinkTabs>
      <LinkTab value="/path0" label="label0" />
      <LinkTab value="/path1" label="label1" />
      <LinkTab value="/path2" label="label2" />
    </LinkTabs>
  );

  return renderWithRouter(item, path);
};

it("Allows for the pathname not to match any child.", () => {
  expect(() => setup()).not.toThrow();
});

it("Navigates to different tabs.", () => {
  const { getByText, history } = setup();
  userEvent.click(getByText("label1"));
  expect(history.location.pathname).toEqual("/path1");
});

it("Selects tab that matches the current path.", () => {
  const { getByText } = setup("/path1/a/b");
  expect(getByText("label1").parentElement).toHaveClass("Mui-selected");
});
