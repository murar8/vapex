import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale, supportedLocales, LocaleCode } from "src/constants";
import { RootThunkAction } from "../store";

export type LocaleState = {
  status: "loaded" | "loading" | "error";
  currentCode: LocaleCode;
  nextCode?: LocaleCode;
  messages?: Record<string, string>;
  error?: string;
};

const code = Object.keys(supportedLocales).find(l => navigator.languages.includes(l)) as LocaleCode;

const initialState: LocaleState = {
  currentCode: code || defaultLocale,
  status: "loading"
};

export type SetLocaleAction = PayloadAction<Record<string, string>>;

const { actions, reducer } = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setError: (state, { payload: error }: PayloadAction<string>) => ({
      ...state,
      status: "error",
      error
    }),

    clearError: ({ error, nextCode, ...state }) => ({ ...state, status: "loaded" }),

    setLoading: ({ error, ...state }, { payload: nextCode }: PayloadAction<LocaleCode>) => ({
      ...state,
      status: "loading",
      nextCode
    }),

    setLoaded: ({ error, nextCode, ...state }, { payload: messages }: SetLocaleAction) => ({
      ...state,
      status: "loaded",
      currentCode: nextCode!,
      messages
    })
  }
});

const fetchLocale = (code: LocaleCode): RootThunkAction => dispatch => {
  dispatch(actions.setLoading(code));

  return fetch(`locales/${code}.json`)
    .then(res => res.json())
    .then(messages => dispatch(actions.setLoaded(messages)))
    .catch(e => dispatch(actions.setError(e.message)));
};

const fetchCurrentLocale = (): RootThunkAction => (dispatch, getState) => {
  const { locale } = getState();
  return dispatch(fetchLocale(locale.nextCode || locale.currentCode));
};

export const localeReducer = reducer;
export const localeActions = { fetchLocale, fetchCurrentLocale, ...actions };
