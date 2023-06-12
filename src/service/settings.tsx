import { createSlice } from "@reduxjs/toolkit";

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
  time: 1,
  timeout: 2,
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

export const getTime = (state: RootState) => state.settingsStore.time;
export const getTimeout = (state: RootState) => state.settingsStore.timeout;
export const getAmountOfRepeats = (state: RootState) =>
  state.settingsStore.amountOfRepeats;
export const getAutoStart = (state: RootState) =>
  state.settingsStore.isAutoStart;
export const getMenuStatus = (state: RootState) =>
  state.settingsStore.isMenuOpen;

export const getSettingsDisabled = (state: RootState) =>
  state.settingsStore.isSettingsDisabled;

export const {
  onSetAmountOfRepeats,
  onSetTime,
  onSetTimeout,
  onSetSettingsDisable,
  onSetAutoStart,
  onSetMenuOpen,
} = settingsStore.actions;

export default settingsStore.reducer;
