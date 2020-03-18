import "@testing-library/jest-dom/extend-expect";
import { MessageDescriptor } from "react-intl";

// Polyfill for Popper.js
(global as any).document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document
  }
});

jest.mock("src/util/hooks", () => ({
  ...jest.requireActual("src/util/hooks"),
  useFormatMessage: () => (m: MessageDescriptor) => m.defaultMessage || m.id
}));
