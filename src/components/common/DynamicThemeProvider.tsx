import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { supportedPalettes } from "src/constants";
import { useSelector } from "src/redux";
import { itIT, enUS } from "@material-ui/core/locale";

const localeMap = { it: itIT, en: enUS };

export const DynamicThemeProvider: React.FC = ({ children, ...props }) => {
  const palette = useSelector(({ palette }) => palette.name);
  const locale = useSelector(({ locale }) => locale.currentCode);

  const theme = React.useMemo(
    () => createMuiTheme({ palette: supportedPalettes[palette] }, localeMap[locale]),
    [locale, palette]
  );

  return (
    <ThemeProvider theme={theme} {...props}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
