import { useField } from "formik";
import React from "react";
import { NumericInput, NumericInputProps } from "src/components/base/NumericInput";
import { RadioInput, RadioInputProps } from "src/components/base/RadioInput";
import { SelectInput, SelectInputProps } from "src/components/base/SelectInput";

export type FieldProps<T> = { name: string } & T;

export const NumericField = ({ name, ...props }: FieldProps<NumericInputProps>) => {
  const [field, { touched, error }] = useField(name);
  const message = touched && error;
  return (
    <NumericInput
      {...props}
      {...field}
      inputProps={{ min: 0 }}
      error={Boolean(message)}
      helperText={message}
    />
  );
};

export const SelectField = ({ name, ...props }: FieldProps<SelectInputProps>) => {
  const [field] = useField(name);
  return <SelectInput {...props} {...field} />;
};

export const RadioField = ({ name, ...props }: FieldProps<RadioInputProps>) => {
  const [field] = useField(name);
  return <RadioInput {...props} {...field} />;
};
