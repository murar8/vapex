import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useUniqueID } from "src/util/hooks";

export type Items = Record<string, React.ReactNode> | React.ReactNode[];

export type BaseSelectProps<T extends Items> = {
  label?: string;
  items?: T;
  selected?: keyof T;
  onChange?: (e: React.ChangeEvent<{ name?: string; value: keyof T }>, v: keyof T) => void;
};

export const BaseSelect = <T extends Items>({
  label,
  items,
  selected,
  onChange,
  ...props
}: BaseSelectProps<T>) => {
  const id = useUniqueID("select");
  const labelId = React.useMemo(() => `${id}-label`, [id]);

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={selected}
        onChange={(e: any) => onChange?.(e, e.target.value)}
        {...props}>
        {items &&
          Object.entries(items).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
