import userEvent from "@testing-library/user-event";
import React from "react";
import { LinkTabsInternal, LinkTab } from "./LinkTabs";
import { Route } from "react-router-dom";
import { renderWithRouter } from "src/util/testUtil";

const setup = (pathname: string) => {
  const result = renderWithRouter(
    <LinkTabsInternal location={{ pathname } as any} {...({} as any)}>
      <LinkTab value="/path0">label0</LinkTab>
      <LinkTab value="/path1">label1</LinkTab>
      <LinkTab value="/path2">label2</LinkTab>
      <Route path="/path1">route1</Route>
    </LinkTabsInternal>
  );

  const tab = result.getByText("label1");
  return { ...result, tab };
};

it("Allows for the pathname not to match any child.", () => {
  expect(() => setup("/path3")).not.toThrow();
});

it("Navigates to different tabs.", () => {
  const { tab, queryByText } = setup("/path0");
  userEvent.click(tab);
  expect(queryByText("route1")).toBeVisible();
});

it("Selects tab that matches the current path.", () => {
  const { tab } = setup("/path1/a/b");
  expect(tab.parentElement).toHaveClass("Mui-selected");
});
