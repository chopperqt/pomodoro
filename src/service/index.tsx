import { configureStore } from "@reduxjs/toolkit";

import settingsStore from "./settings";

export const store = configureStore({
  reducer: {
    settingsStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
