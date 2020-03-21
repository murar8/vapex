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

const useGroupStyles = makeStyles(({ spacing }) => ({ root: { margin: spacing(1) } }));

export const GroupPaper: React.FC = props => <Paper elevation={0} {...props} />;

export const Group: React.FC = props => {
  const { root } = useGroupStyles();
  return (
    <Grid item xs={12} className={root} container spacing={0} component={GroupPaper} {...props} />
  );
};

const useGroupItemStyles = makeStyles(({ spacing }) => ({ root: { margin: spacing(2) } }));

export const GroupItem: React.FC<GridProps> = props => {
  const { root } = useGroupItemStyles();
  return <Grid item xs={12} className={root} {...props} />;
};

const CollapsibleItem: React.FC = props => <Grid item xs={12} {...props} />;

export const CollapsibleGroupItem: React.FC<CollapseProps> = ({ children, ...props }) => (
  <Collapse component={CollapsibleItem} appear={false} {...props}>
    <Box p={2}>{children}</Box>
  </Collapse>
);
