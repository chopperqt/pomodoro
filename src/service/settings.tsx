import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface SettingsStore {
  time: number;
  timeout: number;
  amountOfRepeats: number;
  isSettingsDisabled: boolean;
  isAutoStart: boolean;
  isMenuOpen: boolean;
}

const initialState: SettingsStore = {
  time: 45,
  timeout: 15,
  amountOfRepeats: 5,
  isSettingsDisabled: false,
  isAutoStart: false,
  isMenuOpen: false,
};

export const settingsStore = createSlice({
  name: "settings",
  initialState,
  reducers: {
    onSetTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    onSetTimeout: (state, action: PayloadAction<number>) => {
      state.timeout = action.payload;
    },
    onSetAmountOfRepeats: (state, { payload }: PayloadAction<number>) => {
      state.amountOfRepeats = payload;
    },
    onSetSettingsDisable: (state, { payload }: PayloadAction<boolean>) => {
      state.isSettingsDisabled = payload;
    },
    onSetAutoStart: (state, { payload }: PayloadAction<boolean>) => {
      state.isAutoStart = payload;
    },
    onSetMenuOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMenuOpen = payload;
    },
  },
});

const state = (state: RootState) => state.settingsStore;
export const getTime = createSelector(state, (state) => state.time);
export const getTimeout = createSelector(state, (state) => state.timeout);
export const getAmountOfRepeats = createSelector(
  state,
  (state) => state.amountOfRepeats
);
export const getAutoStart = createSelector(state, (state) => state.isAutoStart);
export const getMenuOpen = createSelector(state, (state) => state.isMenuOpen);

export const getSettingsDisabled = createSelector(
  state,
  (state) => state.isSettingsDisabled
);

export const {
  onSetAmountOfRepeats,
  onSetTime,
  onSetTimeout,
  onSetSettingsDisable,
  onSetAutoStart,
  onSetMenuOpen,
} = settingsStore.actions;

export default settingsStore.reducer;
