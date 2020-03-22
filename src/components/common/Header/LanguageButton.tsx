import { CircularProgress } from "@material-ui/core";
import { Translate } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { IconMenu } from "src/components/base/IconMenu";
import { locales } from "src/constants";
import { useFormatMessage } from "src/util/hooks";
import { useDynamicIntl } from "../DynamicIntlProvider/IntlContext";

const translations = defineMessages({
  language: { id: "languagebutton.language", defaultMessage: "Change Language" },
});

export const LanguageButton = () => {
  const t = useFormatMessage();

  const { locale, changeLocale, status } = useDynamicIntl();

  return (
    <IconMenu
      label={t(translations.language)}
      icon={status === "loading" ? <CircularProgress size={24} color="inherit" /> : <Translate />}
      items={locales}
      selected={locale}
      onItemClick={(_, v: any) => changeLocale(v)}
    />
  );
};
