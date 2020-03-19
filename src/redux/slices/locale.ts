import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale, supportedLocales, LocaleCode } from "src/constants";
import { RootThunkAction } from "../store";

export type LocaleState = {
  status: "init" | "loaded" | "loading" | "error";
  currentCode?: LocaleCode;
  nextCode?: LocaleCode;
  messages?: Record<string, string>;
};

const initialState: LocaleState = { status: "init" };

export type SetLocaleAction = PayloadAction<Record<string, string>>;

const { actions, reducer } = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setError: state => ({
      ...state,
      status: "error"
    }),

    clearError: ({ nextCode, ...state }) => ({ ...state, status: "loaded" }),

    setLoading: ({ ...state }, { payload: nextCode }: PayloadAction<LocaleCode>) => ({
      ...state,
      status: "loading",
      nextCode
    }),

    setLoaded: ({ nextCode, ...state }, { payload: messages }: SetLocaleAction) => ({
      ...state,
      status: "loaded",
      currentCode: nextCode!,
      messages
    })
  }
});

const fetchLocale = (code: LocaleCode): RootThunkAction => (dispatch, getState) => {
  const { locale } = getState();

  if (locale.status !== "init" && code === locale.currentCode) return;

  dispatch(actions.setLoading(code));

  return fetch(`locales/${code}.json`)
    .then(res => res.json())
    .then(messages => dispatch(actions.setLoaded(messages)))
    .catch(() => dispatch(actions.setError()));
};

const fetchNextLocale = (): RootThunkAction => (dispatch, getState) => {
  const { locale } = getState();
  return dispatch(fetchLocale(locale.nextCode!));
};

export const localeReducer = reducer;
export const localeActions = { fetchLocale, fetchNextLocale, ...actions };
