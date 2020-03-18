import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { useUniqueID } from "src/util/hooks";

export type Items = Record<string, React.ReactNode>;

export type IconMenuProps<T extends Items> = {
  icon?: React.ReactNode;
  label?: string;
  items?: T;
  selected?: keyof T;
  onItemClick?: (e: React.MouseEvent, v: keyof T) => void;
};

export const IconMenu = <T extends Items>({
  label,
  icon,
  items,
  selected,
  onItemClick,
  ...props
}: IconMenuProps<T>) => {
  const id = useUniqueID("menu");

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
            <MenuItem key={key} selected={key === selected} onClick={e => handleItemClick(e, key)}>
              {value}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
