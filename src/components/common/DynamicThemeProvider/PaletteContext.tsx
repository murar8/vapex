import React from "react";
import { PaletteName } from "src/constants";

export type PaletteContext = { palette: PaletteName; changePalette: (name: PaletteName) => void };

export const PaletteContext = React.createContext<PaletteContext>({
  palette: "Stormy",
  changePalette: () => {},
});

export const usePalette = () => React.useContext(PaletteContext);
