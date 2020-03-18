import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Link, matchPath, RouteComponentProps, withRouter } from "react-router-dom";

export const LinkTabsInternal: React.FC<RouteComponentProps> = ({ staticContext, ...props }) => {
  const allowed = React.Children.map(props.children, child => (child as any).props.value) || [];
  const selected = allowed?.find(v => matchPath(props.location.pathname, v));

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={selected !== undefined && selected}
      {...props}
    />
  );
};

export const LinkTabs = withRouter(LinkTabsInternal);

export type LinkTabProps = { children?: React.ReactNode; value: string };

export const LinkTab = ({ children, ...props }: LinkTabProps) => (
  <Tab component={Link} to={props.value} label={children} {...props} />
);
