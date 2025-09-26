import { configureStore } from "@reduxjs/toolkit";
import accReducer from "./accountSlice";
import itemReducer from "./itemSlice";

export const store = configureStore({
  reducer: {
    account: accReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
