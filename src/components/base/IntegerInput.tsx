import { InputAdornment, makeStyles } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { useFormatMessage } from "src/util/hooks";
import { BaseIconButton } from "./BaseIconButton";
import { NumericInput, NumericInputProps } from "./NumericInput";

const useStyles = makeStyles(() => ({
  input: {
    '& input[type="number"]::-webkit-inner-spin-button,-webkit-outer-spin-button': {
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      margin: 0
    }
  }
}));

const messages = defineMessages({
  add: { id: "integerinput.add", defaultMessage: "Add" },
  sub: { id: "integerinput.sub", defaultMessage: "Subtract" }
});

export type IntegerInputProps = NumericInputProps & {
  min?: number;
  max?: number;
  step?: number;
};

export const IntegerInput = ({
  min = 0,
  max = Number.MAX_VALUE,
  step = 1,
  inputProps,
  InputProps,
  className,
  value,
  onChange,
  ...props
}: IntegerInputProps) => {
  const classes = useStyles();
  const t = useFormatMessage();

  const [internal, setInternal] = React.useState(0);

  const source = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<any>, v: number) => {
    const next = Math.max(min, Math.min(max, Math.floor(v)));
    if (value === undefined) setInternal(next);
    onChange?.(e, next);
  };

  return (
    <NumericInput
      value={source}
      onChange={handleChange}
      className={classes.input + " " + className}
      inputProps={{ ...inputProps, min, max, step }}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <BaseIconButton label={t(messages.sub)} onClick={e => handleChange(e, source - step)}>
              <Remove />
            </BaseIconButton>
            <BaseIconButton label={t(messages.add)} onClick={e => handleChange(e, source + step)}>
              <Add />
            </BaseIconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
