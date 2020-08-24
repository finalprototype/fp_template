import { createSlice } from '@reduxjs/toolkit';

import { AppState } from './types';

export const getInitialState = (): AppState => ({
  isReady: false,
  config: {
    env: '',
    version: '',
    assetsPath: '',
    manifest: {},
    flags: [],
  },
});

const appSlice = createSlice({
  name: 'app',
  initialState: getInitialState(),
  reducers: {
    init(state, action) {
      state.config = { ...state.config, ...action.payload };
      state.isReady = true;
    },
  },
});

export const { init } = appSlice.actions;

export default appSlice.reducer;
