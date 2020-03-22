import { Palette } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { useDispatch } from "react-redux";
import { IconMenu } from "src/components/base/IconMenu";
import { palettes as defaultPalettes, PaletteName } from "src/constants";
import { useSelector } from "src/redux";
import { paletteActions } from "src/redux/slices/palette";
import { useFormatMessage } from "src/util/hooks";
import { usePalette } from "../DynamicThemeProvider/PaletteContext";

const messages = defineMessages({
  palette: { id: "palettebutton.palette", defaultMessage: "Change Palette" },
});

const palettes = Object.fromEntries(Object.keys(defaultPalettes).map((k) => [k, k]));

export const PaletteButton = () => {
  const t = useFormatMessage();
  const { palette, changePalette } = usePalette();

  return (
    <IconMenu
      label={t(messages.palette)}
      icon={<Palette />}
      items={palettes}
      selected={palette}
      onItemClick={(_, v: any) => changePalette(v as PaletteName)}
    />
  );
};
