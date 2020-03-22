import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";

export const renderWithIntl = (ui: React.ReactElement) =>
  render(ui, { wrapper: (props) => <IntlProvider locale="en" {...props} /> });

export const renderWithRouter = (ui: React.ReactElement, path?: string) => {
  const history = createMemoryHistory();
  if (path) history.push(path);
  const result = render(ui, { wrapper: (props) => <Router history={history} {...props} /> });
  return { ...result, history };
};
