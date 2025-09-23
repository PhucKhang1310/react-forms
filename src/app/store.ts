import { configureStore } from "@reduxjs/toolkit";
import accReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    account: accReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
