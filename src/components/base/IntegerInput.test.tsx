import { render } from "@testing-library/react";
import React from "react";
import { IntegerInput } from "./IntegerInput";
import userEvent from "@testing-library/user-event";

const setup = (value?: number) => {
  const onChange = jest.fn();
  const result = render(
    <IntegerInput min={-10} max={100} step={2} label="input" onChange={onChange} value={value} />
  );
  return { ...result, onChange, field: result.getByLabelText("input") };
};

it("Uses 'value' as the field content.", () => {
  const { field } = setup(12);
  expect(field).toHaveValue(12);
});

it("Calls 'onChange' when typed onto.", () => {
  const { field, onChange } = setup();
  userEvent.type(field, "73");
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), 73);
});

// it("Does not allow the field content to go below 'min'.", () => {
//   const { field } = setup();
//   userEvent.type(field, "-25");
//   expect(field).toHaveValue(-10);
// });

// it("Does not allow the field content to go above 'max'.", () => {
//   const { field } = setup();
//   userEvent.type(field, "185");
//   expect(field).toHaveValue(100);
// });
