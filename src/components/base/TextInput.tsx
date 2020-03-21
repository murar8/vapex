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

export type TextInputProps = { completed?: boolean } & Omit<TextFieldProps, "id">;

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  ({ className, completed, variant = "outlined", fullWidth = true, ...props }, ref) => {
    const classes = useStyles({ completed });
    const id = "textfield-" + useUniqueID();

    return (
      <TextField
        id={id}
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        className={classes.textField + " " + className}
        {...props}
      />
    );
  }
);
