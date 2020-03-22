import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { defaultLocaleCode, LocaleCode, locales } from "src/constants";
import { IntlContext, IntlStatus } from "./IntlContext";
import { useLocalStorage } from "src/util/hooks";

const isLocaleCode = (v: string): v is LocaleCode => Object.keys(locales).includes(v);

const getInitialLocale = (): LocaleCode => {
  const preferredLocale = navigator.languages.find((l) => isLocaleCode(l)) as LocaleCode;
  return preferredLocale || defaultLocaleCode;
};

const fetchLocale = (code: string) => fetch(`/locales/${code}.json`).then((res) => res.json());

export const DynamicIntlProvider: React.FC = (props) => {
  const [code, setCode] = useLocalStorage("locale", getInitialLocale);
  const [messages, setMessages] = React.useState<Record<string, string> | undefined>(undefined);
  const [status, setStatus] = React.useState<IntlStatus>("loading");

  const changeLocale = async (code: LocaleCode) => {
    try {
      setStatus("loading");

      const messages = code === defaultLocaleCode ? {} : await fetchLocale(code);

      setCode(code);
      setMessages(messages);
      setStatus("loaded");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    changeLocale(code);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!messages && status === "loading") return <></>;

  return (
    <IntlContext.Provider value={{ changeLocale, clearError: () => setStatus("loaded"), status }}>
      <IntlProvider
        defaultLocale={defaultLocaleCode}
        locale={code}
        messages={messages}
        {...props}
      />
    </IntlContext.Provider>
  );
};
