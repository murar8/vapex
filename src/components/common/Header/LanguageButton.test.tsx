import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useDispatch } from "src/redux";
import { LanguageButton } from "./LanguageButton";

jest.mock("src/redux", () => {
  const dispatch = jest.fn();

  return {
    useSelector: (fn: any) => fn({ locale: { currentCode: "en", status: "loaded" } }),
    useDispatch: () => dispatch
  };
});

const setup = () => render(<LanguageButton />);

it("Highlights selected locale.", () => {
  const { getByText } = setup();
  expect(getByText("English")).toHaveClass("Mui-selected");
});

it("Changes current locale.", () => {
  const { getByLabelText, getByText } = setup();

  userEvent.click(getByLabelText("Change Language"));
  userEvent.click(getByText("Italiano"));

  expect(useDispatch()).toHaveBeenCalledTimes(1);
  expect(useDispatch()).toHaveBeenCalledWith(expect.any(Function));
});
