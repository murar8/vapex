import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps
} from "@material-ui/core";
import React from "react";

export type Items = Record<string, React.ReactNode>;

export type RadioSetProps = {
  disabled?: boolean;
  label?: string;
} & RadioGroupProps;

export const RadioSet = ({ disabled, label, ...props }: RadioSetProps) => (
  <FormControl fullWidth component="fieldset" disabled={disabled}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup row aria-label={label} {...props} />
  </FormControl>
);

export const RadioElement = (props: Omit<FormControlLabelProps, "control">) => (
  <FormControlLabel control={<Radio />} {...props} />
);
