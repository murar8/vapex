import { render } from "@testing-library/react";
import React from "react";
import { BaseInput } from "./BaseInput";
import userEvent from "@testing-library/user-event";

const setup = (value?: string) => {
  const onChange = jest.fn();
  const result = render(<BaseInput label="input" value={value} onChange={onChange} />);
  const field = result.getByLabelText("input");
  return { ...result, onChange, field };
};

it("Uses 'value' as the field content.", () => {
  const { field } = setup("abc");
  expect(field).toHaveValue("abc");
});

it("Calls 'onChange' when typed onto.", () => {
  const { field, onChange } = setup();
  userEvent.type(field, "abc");
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenCalledWith(expect.any(Object), "abc");
});
