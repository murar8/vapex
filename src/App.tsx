import DynamicIntlProvider from "src/components/common/DynamicIntlProvider";
import DynamicThemeProvider from "src/components/common/DynamicThemeProvider";
import Header from "src/components/common/Header";
import CoilPage from "src/components/pages/CoilPage";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "src/redux/store";
import ErrorBanner from "./components/common/ErrorBanner";

export const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <DynamicThemeProvider>
        <DynamicIntlProvider>
          <BrowserRouter>
            <Header />
            <ErrorBanner />
            <Route path="/coilwrapping">
              <CoilPage />
            </Route>
          </BrowserRouter>
        </DynamicIntlProvider>
      </DynamicThemeProvider>
    </PersistGate>
  </Provider>
);
