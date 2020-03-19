import React from "react";
import { FormattedMessage } from "react-intl";
import { renderWithRedux } from "src/util/render";
import { DynamicIntlProvider } from "./DynamicIntlProvider";
import { LocaleCode } from "src/constants";

const setup = (currentCode?: LocaleCode) => {
  const ui = (
    <DynamicIntlProvider>
      <FormattedMessage id="hi" defaultMessage="hello" />
    </DynamicIntlProvider>
  );

  return renderWithRedux(ui, { locale: { currentCode, messages: { hi: "ciao" } } });
};

it("Provides the messages for the current locale.", () => {
  const { queryByText } = setup("it");
  expect(queryByText("ciao")).toBeInTheDocument();
});

it("Does not render anything if the current locale is undefined.", () => {
  const { container } = setup();
  expect(container).toBeEmpty();
});
