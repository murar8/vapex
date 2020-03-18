import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { NumericInput } from "./NumericInput";

const setup = (value?: number) => {
  const onChange = jest.fn();
  const result = render(<NumericInput label="input" onChange={onChange} value={value} />);
  return { ...result, onChange, field: result.getByLabelText("input") };
};

it("Uses 'value' as the field content.", () => {
  const { field } = setup(-12);
  expect(field).toHaveValue(-12);
});

it("Allows for NaN to be used as the empty value.", () => {
  const { field } = setup(NaN);
  expect(field).toHaveValue(null as any);
});

it("Calls 'onChange' when typed onto.", () => {
  const { field, onChange } = setup();
  userEvent.type(field, "-73");
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), -73);
});
