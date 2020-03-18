import { makeStyles, TextField, TextFieldProps, Theme } from "@material-ui/core";
import React from "react";
import { useUniqueID } from "src/util/hooks";

const useStyles = makeStyles<Theme, { completed?: boolean }>(({ palette, transitions }) => ({
  textField: {
    "& label:not(.Mui-error).Mui-focused": {
      color: ({ completed }) => (completed ? palette.success.main : false)
    },
    "& .MuiOutlinedInput-root:not(.Mui-error).Mui-focused fieldset, fieldset": {
      borderColor: ({ completed }) => (completed ? palette.success.main : false)
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      transition: transitions.create("border")
    }
  }
}));

export type HTMLTextFieldElement = HTMLTextAreaElement | HTMLInputElement;

export type BaseInputProps = {
  onChange?: (event: React.ChangeEvent<HTMLTextFieldElement>, value: string) => void;
  completed?: boolean;
} & Omit<TextFieldProps, "id" | "onChange">;

export const BaseInput = React.forwardRef<HTMLDivElement, BaseInputProps>(
  ({ className, completed, onChange, ...props }, ref) => {
    const classes = useStyles({ completed });
    const id = useUniqueID("textfield");

    return (
      <TextField
        id={id}
        ref={ref}
        variant="outlined"
        fullWidth
        className={classes.textField + " " + className}
        onChange={e => onChange?.(e, e.target.value)}
        {...props}
      />
    );
  }
);
