import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  FormHelperText
} from "@material-ui/core";
import React from "react";

export type RadioInputProps = RadioGroupProps & {
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
};

export const RadioInput = ({
  label,
  disabled,
  error,
  helperText,
  fullWidth = true,
  row = false,
  ...props
}: RadioInputProps) => (
  <FormControl component="fieldset" {...{ disabled, error, fullWidth }}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup aria-label={label} row={row} {...props} />
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

export type RadioInputItemProps = PartialBy<FormControlLabelProps, "control">;

export const RadioInputButton = ({ control = <Radio />, ...props }: RadioInputItemProps) => (
  <FormControlLabel control={control} {...props} />
);
