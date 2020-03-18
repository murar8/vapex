import React from "react";
import { BaseInput, BaseInputProps, HTMLTextFieldElement } from "./BaseInput";

export type NumericInputProps = Omit<BaseInputProps, "value" | "onChange" | "type"> & {
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextFieldElement>, value: number) => void;
};

export const NumericInput = React.forwardRef<HTMLDivElement, NumericInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        type="number"
        value={value === undefined ? undefined : isNaN(value) ? "" : value.toString()}
        onChange={(e, v) => onChange?.(e, parseFloat(v))}
        {...props}
      />
    );
  }
);
