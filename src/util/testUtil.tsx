import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";
import userEvent, { IUserOptions, TargetElement } from "@testing-library/user-event";

export const renderWithIntl = (ui: React.ReactElement) =>
  render(ui, { wrapper: props => <IntlProvider locale="en" {...props} /> });

export const renderWithRouter = (ui: React.ReactElement) => {
  const history = createMemoryHistory();
  return { ...render(ui, { wrapper: props => <Router history={history} {...props} /> }), history };
};

export const typeDistinct = (element: TargetElement, items: string[], userOpts?: IUserOptions) => {
  return Promise.all(items.map(input => userEvent.type(element, input, userOpts)));
};
