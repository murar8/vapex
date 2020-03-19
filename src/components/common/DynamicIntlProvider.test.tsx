import React from "react";
import { FormattedMessage } from "react-intl";
import { renderWithRedux } from "src/util/render";
import { DynamicIntlProvider } from "./DynamicIntlProvider";

const setup = () => {
  const ui = (
    <DynamicIntlProvider>
      <FormattedMessage id="hi" defaultMessage="hello" />
    </DynamicIntlProvider>
  );

  return renderWithRedux(ui, { locale: { currentCode: "it", messages: { hi: "ciao" } } });
};

it("Provides the messages for the current locale.", () => {
  const { queryByText } = setup();
  expect(queryByText("ciao")).toBeInTheDocument();
});
