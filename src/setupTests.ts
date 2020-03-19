import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

// Polyfill for Popper.js
global.document.createRange = (): any => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document
  }
});

jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  useIntl: () => ({ formatMessage: (m: any) => m.defaultMessage || m.id })
}));
