import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { mockStore, MockStoreState } from "./mockStore";

export const renderWithIntl = (ui: React.ReactElement) =>
  render(ui, { wrapper: props => <IntlProvider locale="en" {...props} /> });

export const renderWithRouter = (ui: React.ReactElement, path?: string) => {
  const history = createMemoryHistory();
  if (path) history.push(path);
  const result = render(ui, { wrapper: props => <Router history={history} {...props} /> });
  return { ...result, history };
};

export const renderWithRedux = (ui: React.ReactElement, init?: MockStoreState) => {
  const store = mockStore(init);
  const result = render(ui, { wrapper: props => <Provider store={store} {...props} /> });
  return { ...result, store };
};
