import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { InvertColors } from "@material-ui/icons";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { paletteActions } from "src/redux/slices/palette";
import { RootState } from "src/redux/store";
import { supportedPalettes } from "src/constants";
import { useBindMenu, useFormatMessage } from "src/util/hooks";
import { BaseIconButton } from "src/components/base/BaseIconButton";
import { defineMessages } from "react-intl";

const messages = defineMessages({
  palette: { id: "palettebutton.palette", defaultMessage: "Change Palette" }
});

export const PaletteButton = ({ name, setPalette }: ConnectedProps<typeof connector>) => {
  const t = useFormatMessage();
  const { bindControl, bindMenu, bindItem } = useBindMenu();

  return (
    <>
      <BaseIconButton label={t(messages.palette)} {...bindControl}>
        <InvertColors />
      </BaseIconButton>
      <Menu {...bindMenu}>
        {Object.keys(supportedPalettes).map(key => (
          <MenuItem key={key} selected={name === key} {...bindItem(() => setPalette(key as any))}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const connector = connect(({ palette: { name } }: RootState) => ({ name }), {
  setPalette: paletteActions.setPalette
});

export default connector(PaletteButton);
