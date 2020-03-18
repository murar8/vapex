import { CircularProgress } from "@material-ui/core";
import { Translate } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { IconMenu } from "src/components/base/IconMenu";
import { LocaleCode, supportedLocales } from "src/constants";
import { localeActions } from "src/redux/slices/locale";
import { useDispatch, useSelector } from "src/redux";
import { useFormatMessage } from "src/util/hooks";

const messages = defineMessages({
  language: { id: "languagebutton.language", defaultMessage: "Change Language" }
});

export const LanguageButton = () => {
  const t = useFormatMessage();

  const code = useSelector(({ locale }) => locale.currentCode);
  const status = useSelector(({ locale }) => locale.status);

  const dispatch = useDispatch();
  const changeLocale = (code: LocaleCode) => dispatch(localeActions.fetchLocale(code));

  return (
    <IconMenu
      label={t(messages.language)}
      icon={status === "loading" ? <CircularProgress size={24} color="inherit" /> : <Translate />}
      items={supportedLocales}
      selected={code}
      onItemClick={(_, v) => changeLocale(v)}
    />
  );
};
