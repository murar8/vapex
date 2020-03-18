import { localeActions as actions, localeReducer, localeActions, LocaleState } from "./locale";
import { defaultLocale, LocaleCode } from "src/constants";

describe("fetchLocale", () => {
  const setup = async (code: LocaleCode) => {
    const dispatch = jest.fn();
    await actions.fetchLocale(code)(dispatch, jest.fn(), null);
    return dispatch;
  };

  it("Changes the current locale.", async () => {
    window.fetch = jest.fn(() => Promise.resolve({ json: () => ({ msg1: "messaggio1" }) } as any));
    const dispatch = await setup("it");
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setLoading("it"));
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.setLoaded({ msg1: "messaggio1" }));
  });

  it("Sets the error flag when it cannot load a locale.", async () => {
    window.fetch = jest.fn(() => Promise.reject({ message: "error message." }));
    const dispatch = await setup("it");
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.setError("error message."));
  });
});

describe("fetchCurrentLocale", () => {
  const setup = async (getState: any) => {
    const dispatch = jest.fn(v => {
      if (typeof v === "function") v(dispatch);
    });

    await actions.fetchCurrentLocale()(dispatch, getState, null);

    return dispatch;
  };

  it("Fetches the data for the next locale.", async () => {
    const dispatch = await setup(() => ({ locale: { currentCode: "en", nextCode: "it" } }));
    expect(dispatch).toBeCalledWith(actions.setLoading("it"));
  });

  it("Fetches the data for the current locale.", async () => {
    const dispatch = await setup(() => ({ locale: { currentCode: "en" } }));
    expect(dispatch).toBeCalledWith(actions.setLoading("en"));
  });
});

const initialState: LocaleState = { currentCode: defaultLocale, messages: {}, status: "loaded" };
const loadingState: LocaleState = { ...initialState, nextCode: "it", status: "loading" };
const errorState: LocaleState = { ...initialState, status: "error" };

describe("setLoading", () => {
  it("Sets the loading status.", () => {
    const got = localeReducer(errorState, localeActions.setLoading("it"));
    expect(got).toMatchObject({ status: "loading", currentCode: "en", nextCode: "it" });
  });
});

describe("setLoaded", () => {
  it("Sets the locale data.", () => {
    const action = localeActions.setLoaded({ hi: "nihao" });
    const got = localeReducer(loadingState, action);
    expect(got).toMatchObject({ status: "loaded", messages: { hi: "nihao" } });
  });
});

describe("setError", () => {
  it("Sets the error status.", () => {
    const got = localeReducer(loadingState, localeActions.setError("error message."));
    expect(got).toMatchObject({ status: "error", error: "error message." });
  });
});

describe("clearError", () => {
  it("Clears the error.", () => {
    const got = localeReducer(errorState, localeActions.clearError());
    expect(got).toMatchObject({ status: "loaded" });
  });
});
