import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { useUniqueID } from "src/util/hooks";

export type IconMenuProps = {
  icon?: React.ReactNode;
  label?: string;
  items?: Record<string, React.ReactNode> | Record<number, React.ReactNode>;
  selected?: string | number;
  onItemClick?: (e: React.MouseEvent, v: string | number) => void;
};

export const IconMenu = ({
  label,
  icon,
  items,
  selected,
  onItemClick,
  ...props
}: IconMenuProps) => {
  const id = "menu-" + useUniqueID();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleItemClick = (event: React.MouseEvent, key: any) => {
    handleClose();
    onItemClick?.(event, key);
  };

  return (
    <>
      <Tooltip title={label}>
        <IconButton
          aria-label={label}
          aria-controls={id}
          aria-haspopup="true"
          onClick={handleClick}
          {...props}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu id={id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {items &&
          Object.entries(items).map(([key, value]) => (
            <MenuItem
              key={key}
              selected={key === selected?.toString()}
              onClick={e => handleItemClick(e, key)}>
              {value}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
