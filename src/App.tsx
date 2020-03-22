import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { DynamicIntlProvider } from "src/components/common/DynamicIntlProvider";
import { DynamicThemeProvider } from "src/components/common/DynamicThemeProvider";
import { Header } from "src/components/common/Header";
import { CoilPage } from "src/components/pages/CoilPage";
import { ErrorBanner } from "./components/common/ErrorBanner";

export const App = () => (
  <DynamicIntlProvider>
    <DynamicThemeProvider>
      <BrowserRouter>
        <Header />
        <ErrorBanner />
        <Route path="/coilwrapping">
          <CoilPage />
        </Route>
      </BrowserRouter>
    </DynamicThemeProvider>
  </DynamicIntlProvider>
);
