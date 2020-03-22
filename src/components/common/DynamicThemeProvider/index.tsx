import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { enUS, itIT } from "@material-ui/core/locale";
import React from "react";
import { LocaleCode, PaletteName, palettes, defaultPaletteName } from "src/constants";
import { useLocalStorage } from "src/util/hooks";
import { useDynamicIntl } from "../DynamicIntlProvider/IntlContext";
import { PaletteContext } from "./PaletteContext";

const localeMap = { it: itIT, en: enUS };

export const DynamicThemeProvider: React.FC = ({ children, ...props }) => {
  const [palette, changePalette] = useLocalStorage("palette", () => defaultPaletteName);

  const { locale } = useDynamicIntl();

  const theme = React.useMemo(
    () => createMuiTheme({ palette: palettes[palette] }, localeMap[locale as LocaleCode]),
    [locale, palette]
  );

  return (
    <PaletteContext.Provider value={{ palette, changePalette }}>
      <ThemeProvider theme={theme} {...props}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PaletteContext.Provider>
  );
};
