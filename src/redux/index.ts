import { store } from "./store";
import { EnhancedStore, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import {
  useSelector as useDefaultSelector,
  TypedUseSelectorHook,
  useDispatch as useDefaultDispatch,
  useStore as useDefaultStore
} from "react-redux";

export type RootState = typeof store extends EnhancedStore<infer S> ? S : never;
export type RootDispatch = typeof store.dispatch;
export type RootThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
export const useDispatch = () => useDefaultDispatch<RootDispatch>();
export const useStore = () => useDefaultStore<RootState>();
