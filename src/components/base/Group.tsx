import {
  Grid,
  GridProps,
  makeStyles,
  Paper,
  Box,
  Collapse,
  CollapseProps
} from "@material-ui/core";
import React from "react";

export const GroupArray: React.FC = ({ children, ...props }) => (
  <Grid container>
    <Box p={0.25}>{children}</Box>
  </Grid>
);

export const Group: React.FC = ({ children, ...props }) => {
  return (
    <Grid component={Box} p={0.5} item xs={12} sm={6} {...props}>
      <Grid component={Paper} variant="outlined" container justify="center" alignItems="center">
        {children}
      </Grid>
    </Grid>
  );
};

export const GroupItem: React.FC<GridProps> = props => (
  <Grid component={Box} p={1} item xs={12} {...props} />
);

export const CollapseItem: React.FC = props => <Grid item xs={12} {...props} />;

export const CollapsibleGroupItem: React.FC<CollapseProps> = ({ children, ...props }) => (
  <Collapse
    component={CollapseItem}
    appear={false}
    mountOnEnter={false}
    unmountOnExit={false}
    {...props}>
    <Box p={1}>{children}</Box>
  </Collapse>
);
