import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

// Polyfill for Popper.js
Object.assign(window.document, {
  createRange: () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: { nodeName: "BODY", ownerDocument: document },
  }),
});

jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  useIntl: () => ({ formatMessage: (m: any) => m.defaultMessage || m.id }),
}));
