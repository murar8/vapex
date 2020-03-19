import React from "react";
import { IntlProvider } from "react-intl";
import { defaultLocale } from "src/constants";
import { useSelector } from "src/redux";

export const DynamicIntlProvider: React.FC = props => {
  const locale = useSelector(({ locale }) => locale.currentCode);
  const messages = useSelector(({ locale }) => locale.messages);

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale} {...props} />
  );
};
