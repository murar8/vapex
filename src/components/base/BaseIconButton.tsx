import { IconButton, Tooltip, IconButtonProps } from "@material-ui/core";
import React from "react";

export type BaseIconButtonProps = IconButtonProps & { label: string };

export const BaseIconButton = ({ label, ...props }: BaseIconButtonProps) => (
  <Tooltip title={label}>
    <IconButton aria-label={label} {...props} />
  </Tooltip>
);
