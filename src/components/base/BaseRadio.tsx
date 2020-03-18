import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps
} from "@material-ui/core";
import React from "react";

export type Items = Record<string, React.ReactNode>;

export type BaseRadioProps<T extends Items> = {
  disabled?: boolean;
  label?: string;
  items?: T;
} & Omit<RadioGroupProps, "aria-label">;

export const BaseRadio = <T extends Items>({
  disabled,
  label,
  items,
  ...props
}: BaseRadioProps<T>) => (
  <FormControl fullWidth component="fieldset" disabled={disabled}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup row aria-label={label} {...props}>
      {items &&
        Object.entries(items).map(([key, value]) => (
          <FormControlLabel control={<Radio />} key={key} value={key} label={value} />
        ))}
    </RadioGroup>
  </FormControl>
);
