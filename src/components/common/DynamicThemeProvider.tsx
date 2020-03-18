import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { supportedPalettes } from "src/constants";
import { RootState } from "src/redux/store";

export const DynamicThemeProvider: React.FC<ConnectedProps<typeof connector>> = ({
  name,
  children,
  ...props
}) => {
  const theme = React.useMemo(() => createMuiTheme({ palette: supportedPalettes[name] }), [name]);

  return (
    <ThemeProvider theme={theme} {...props}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const connector = connect(({ palette: { name } }: RootState) => ({ name }), {});

export default connector(DynamicThemeProvider);
