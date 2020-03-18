import { orange, red } from "@material-ui/core/colors";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export const supportedLocales = { en: "English", it: "Italiano" };

export type LocaleCode = keyof typeof supportedLocales;

export const defaultLocale = "en";

export const supportedPalettes: Record<"Ravenbridge" | "Stormy" | "Sunrise", PaletteOptions> = {
  Ravenbridge: { primary: { main: "#673ab7" }, secondary: { main: "#2979ff" } },
  Stormy: { primary: { main: "#03a9f4" }, secondary: { main: "#00e676" }, type: "dark" },
  Sunrise: { primary: red, secondary: orange }
};

export type PaletteName = keyof typeof supportedPalettes;
