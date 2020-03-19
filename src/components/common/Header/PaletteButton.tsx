import { Palette } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { useDispatch } from "react-redux";
import { IconMenu } from "src/components/base/IconMenu";
import { supportedPalettes, PaletteName } from "src/constants";
import { useSelector } from "src/redux";
import { paletteActions } from "src/redux/slices/palette";
import { useFormatMessage } from "src/util/hooks";

const messages = defineMessages({
  palette: { id: "palettebutton.palette", defaultMessage: "Change Palette" }
});

export const PaletteButton = () => {
  const t = useFormatMessage();
  const palette = useSelector(({ palette }) => palette.name);
  const dispatch = useDispatch();

  const palettes = Object.keys(supportedPalettes) as PaletteName[];

  return (
    <IconMenu
      label={t(messages.palette)}
      icon={<Palette />}
      items={palettes}
      selected={palettes.findIndex(v => v === palette)}
      onItemClick={(_, v: any) => dispatch(paletteActions.setPalette(palettes[v]))}
    />
  );
};
