import { FormControl, InputLabel, Select, SelectProps } from "@material-ui/core";
import React from "react";
import { useUniqueID } from "src/util/hooks";

export type SelectInputProps = Omit<SelectProps, "id" | "labelId">;

export const SelectInput = ({
  label,
  variant = "outlined",
  fullWidth = true,
  autoWidth = true,
  ...props
}: SelectInputProps) => {
  const id = "select-" + useUniqueID();
  const labelId = `${id}-label`;

  return (
    <FormControl fullWidth={fullWidth} variant={variant}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        id={id}
        labelId={labelId}
        label={label}
        fullWidth={fullWidth}
        autoWidth={autoWidth}
        {...props}
      />
    </FormControl>
  );
};
