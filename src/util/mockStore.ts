import { configureMockStore } from "@jedmao/redux-mock-store";
import { AnyAction } from "redux";
import thunk from "redux-thunk";
import { RootDispatch, RootState } from "src/redux";

const middleware = [thunk];

export const mockStore = configureMockStore<RootState, AnyAction, RootDispatch>(middleware);

export type MockStoreState = Parameters<typeof mockStore>[0];
