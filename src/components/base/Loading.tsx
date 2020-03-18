import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

export const Loading = () => (
  <Backdrop open={true}>
    <CircularProgress />
  </Backdrop>
);
