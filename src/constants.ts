import { orange, red } from "@material-ui/core/colors";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

export const locales = { en: "English", it: "Italiano" };

export type LocaleCode = keyof typeof locales;

export const defaultLocaleCode: LocaleCode = "en";

export const palettes: Record<"Ravenbridge" | "Stormy" | "Sunrise", PaletteOptions> = {
  Ravenbridge: { primary: { main: "#673ab7" }, secondary: { main: "#2979ff" } },
  Stormy: { primary: { main: "#03a9f4" }, secondary: { main: "#00e676" }, type: "dark" },
  Sunrise: { primary: red, secondary: orange },
};

export type PaletteName = keyof typeof palettes;

export const defaultPaletteName: PaletteName = "Stormy";
