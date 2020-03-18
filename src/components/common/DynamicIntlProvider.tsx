import React from "react";
import { IntlProvider } from "react-intl";
import { connect, ConnectedProps } from "react-redux";
import { defaultLocale } from "src/constants";
import { RootState } from "src/redux/store";

type DynamicIntlProviderProps = ConnectedProps<typeof connector> & { children?: React.ReactNode };

export const DynamicIntlProvider = ({ code, messages, ...props }: DynamicIntlProviderProps) => (
  <IntlProvider locale={code} messages={messages} defaultLocale={defaultLocale} {...props} />
);

const connector = connect(
  ({ locale: { currentCode: code, messages } }: RootState) => ({ code, messages }),
  {}
);

export default connector(DynamicIntlProvider);
