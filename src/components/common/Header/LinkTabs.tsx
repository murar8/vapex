import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useUniqueID } from "src/util/hooks";

export const LinkTabs: React.FC = props => {
  const location = useLocation();

  const allowed = React.Children.map(props.children, child => (child as any).props.value);
  const selected = allowed?.find(v => matchPath(location.pathname, v));

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      aria-label="navigation tabs"
      value={selected !== undefined && selected}
      {...props}
    />
  );
};

export type LinkTabProps = { value: string; label: string };

export const LinkTab = (props: LinkTabProps) => {
  const id = "tab-" + useUniqueID();
  return <Tab component={Link} id={id} to={props.value} {...props} />;
};
