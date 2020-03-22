import React from "react";
import { LocaleCode } from "src/constants";
import { useIntl } from "react-intl";

export type IntlStatus = "loaded" | "loading" | "error";

export type IntlContext = {
  changeLocale: (code: LocaleCode) => void;
  clearError: () => void;
  status: IntlStatus;
};

export const IntlContext = React.createContext<IntlContext>({
  changeLocale: () => {},
  clearError: () => {},
  status: "loaded",
});

export const useDynamicIntl = () => {
  const intl = useIntl();
  const dynamic = React.useContext(IntlContext);

  return { ...intl, ...dynamic, t: intl.formatMessage };
};
