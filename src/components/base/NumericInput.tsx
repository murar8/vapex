import { IconButton, InputAdornment, makeStyles, IconButtonProps } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { TextInput, TextInputProps } from "./TextInput";

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

const InputButton = (props: IconButtonProps) => (
  <IconButton onMouseDown={e => e.preventDefault()} tabIndex={-1} {...props} />
);

export type NumericInputProps = Omit<TextInputProps, "type">;

export const NumericInput = React.forwardRef<HTMLDivElement, NumericInputProps>(
  ({ className, InputProps, ...props }, ref) => {
    const classes = useStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (action: "stepUp" | "stepDown") => {
      const element = inputRef.current!;
      element.focus();
      element[action]();
      element.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const adornment = (
      <>
        <InputAdornment position="end">
          <InputButton aria-label="add one" onClick={() => handleClick("stepUp")}>
            <Add />
          </InputButton>
          <InputButton aria-label="subtract one" onClick={() => handleClick("stepDown")}>
            <Remove />
          </InputButton>
        </InputAdornment>
        {InputProps?.endAdornment}
      </>
    );

    return (
      <TextInput
        ref={ref}
        inputRef={inputRef}
        type="number"
        className={classes.input + " " + className}
        InputProps={{ ...InputProps, endAdornment: adornment }}
        {...props}
      />
    );
  }
);
