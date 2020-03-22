import { IconButton, InputAdornment, makeStyles, IconButtonProps } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { TextInput, TextInputProps } from "./TextInput";

const useStyles = makeStyles(() => ({
  input: {
    '& input[type="number"]::-webkit-inner-spin-button,-webkit-outer-spin-button': {
      WebkitAppearance: "none"
    },
    '& input[type="number"]': { MozAppearance: "textfield" }
  }
}));

export type NumericInputProps = Omit<TextInputProps, "type">;

export const NumericInput = React.forwardRef<HTMLDivElement, NumericInputProps>(
  ({ className, InputProps, ...props }, ref) => {
    const classes = useStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (action: "stepUp" | "stepDown") => {
      const element = inputRef.current!;
      // element.focus();
      element[action]();
      element.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const endAdornment = (
      <>
        <Spinner onAdd={() => handleClick("stepUp")} onSub={() => handleClick("stepDown")} />
        {InputProps?.endAdornment}
      </>
    );

    return (
      <TextInput
        ref={ref}
        inputRef={inputRef}
        type="number"
        className={classes.input + " " + className}
        InputProps={{ ...InputProps, endAdornment }}
        {...props}
      />
    );
  }
);

type SpinnerProps = { onAdd: React.MouseEventHandler; onSub: React.MouseEventHandler };

const Spinner = ({ onAdd, onSub }: SpinnerProps) => (
  <InputAdornment position="end">
    <InputButton aria-label="step up" onClick={onAdd}>
      <Add />
    </InputButton>
    <InputButton aria-label="step down" onClick={onSub}>
      <Remove />
    </InputButton>
  </InputAdornment>
);

const InputButton = (props: IconButtonProps) => (
  <IconButton onMouseDown={e => e.preventDefault()} tabIndex={-1} {...props} />
);
