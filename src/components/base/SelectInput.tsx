import { FormControl, InputLabel, Select, SelectProps } from "@material-ui/core";
import React from "react";
import { useUniqueID } from "src/util/hooks";

export type SelectInputProps = Omit<SelectProps, "onChange"> & {
  label?: string;
  onChange?: (e: React.ChangeEvent, v: unknown) => void;
};

export const SelectInput = ({ label, onChange, ...props }: SelectInputProps) => {
  const id = useUniqueID("select");
  const labelId = React.useMemo(() => `${id}-label`, [id]);

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        onChange={(e: any) => onChange?.(e, e.target.value)}
        {...props}
      />
    </FormControl>
  );
};
