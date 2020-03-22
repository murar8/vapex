import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { DynamicIntlProvider } from ".";
import { useDynamicIntl } from "./IntlContext";

jest.unmock("react-intl");

const spy = jest.spyOn(window.localStorage.__proto__, "getItem");

const Child = () => {
  const { t, status, changeLocale, clearError } = useDynamicIntl();

  return (
    <>
      <p>{t({ id: "title", defaultMessage: "Title" })}</p>
      <p>{status === "loading" && "Loading..."}</p>
      <p>{status === "error" && "Fetching failed."}</p>
      <button onClick={() => changeLocale("it")}>Change Locale</button>
      <button onClick={() => clearError()}>Clear Error</button>
    </>
  );
};

const setup = (locale: string) => {
  spy.mockImplementationOnce(() => locale);

  return render(
    <DynamicIntlProvider>
      <Child />
    </DynamicIntlProvider>
  );
};

beforeEach(() => fetchMock.resetMocks());

it("Fetches the messages for the current locale.", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ title: "Titolo" }));
  const { queryByText } = setup("it");

  await waitFor(() => expect(queryByText("Titolo")).toBeTruthy());
});

it("Does not fetch anything for the default locale.", async () => {
  const { queryByText } = setup("en");

  await waitFor(() => expect(queryByText("Title")).toBeTruthy());
  expect(fetchMock).not.toHaveBeenCalled();
});

it("Does not render anything while fetching the messages on the first render.", () => {
  fetchMock.mockImplementationOnce(() => new Promise(() => {}));
  const { container } = setup("it");

  expect(container).toBeEmpty();
});

it("Sets the status to 'loading'.", async () => {
  fetchMock.mockImplementationOnce(() => new Promise(() => {}));
  const { queryByText, getByText } = setup("en");

  userEvent.click(getByText("Change Locale"));

  expect(queryByText("Loading...")).toBeTruthy();
});

const setupWithError = async () => {
  fetchMock.mockRejectOnce(new Error("Fetching failed."));
  const { queryByText, getByText, ...result } = setup("en");

  userEvent.click(getByText("Change Locale"));

  await waitFor(() => expect(queryByText("Fetching failed.")).toBeTruthy());
  return { queryByText, getByText, ...result };
};

it("Sets the status to 'error'.", () => setupWithError());

it("Clears the error.", async () => {
  const { queryByText, getByText } = await setupWithError();
  userEvent.click(getByText("Clear Error"));
  expect(queryByText("Fetching failed.")).toBeFalsy();
});
