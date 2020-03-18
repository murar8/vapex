import {
  Action,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  ThunkAction
} from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { coilPageReducer } from "./slices/coilPage";
import { paletteReducer } from "./slices/palette";
import { localeReducer, localeActions } from "./slices/locale";

export const store = configureStore({
  middleware: getDefaultMiddleware({ serializableCheck: { ignoredActions: [PERSIST] } }),
  reducer: {
    locale: persistReducer({ storage, key: "locale", whitelist: ["code"] }, localeReducer),
    palette: persistReducer({ storage, key: "palette" }, paletteReducer),
    coilPage: coilPageReducer
  }
});

export const persistor = persistStore(store);

persistor.subscribe(() => {
  if (persistor.getState().bootstrapped) {
    store.dispatch(localeActions.fetchCurrentLocale());
  }
});

export type RootState = typeof store extends EnhancedStore<infer S> ? S : never;
export type RootDispatch = typeof store.dispatch;
export type RootThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;
