import { defaultLocale } from "src/constants";
import { mockStore } from "src/util/mockStore";
import { localeActions as actions, localeActions, localeReducer, LocaleState } from "./locale";

describe("fetchLocale", () => {
  const store = mockStore();

  afterEach(() => store.clearActions());

  const run = async () => {
    await store.dispatch(actions.fetchLocale("en"));
    return store.getActions();
  };

  it("Changes the current locale.", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ msg1: "messaggio1" }));
    const done = await run();
    expect(done).toEqual([actions.setLoading("en"), actions.setLoaded({ msg1: "messaggio1" })]);
  });

  it("Sets the error flag when it cannot load a locale.", async () => {
    fetchMock.mockRejectOnce(new Error("error message."));
    const done = await run();
    expect(done).toEqual([actions.setLoading("en"), actions.setError("error message.")]);
  });
});

describe("fetchCurrentLocale", () => {
  fetchMock.mockResponse(JSON.stringify({ msg1: "messaggio1" }));

  const setup = async (init: any) => {
    const store = mockStore(init);
    await store.dispatch(actions.fetchCurrentLocale());
    return store.getActions();
  };

  it("Fetches the data for the current locale.", async () => {
    const done = await setup({ locale: { currentCode: "en" } });
    expect(done).toEqual([actions.setLoading("en"), actions.setLoaded({ msg1: "messaggio1" })]);
  });

  it("Fetches the data for the next locale.", async () => {
    const done = await setup({ locale: { currentCode: "en", nextCode: "it" } });
    expect(done).toEqual([actions.setLoading("it"), actions.setLoaded({ msg1: "messaggio1" })]);
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
