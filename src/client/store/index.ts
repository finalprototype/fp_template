import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './app/slice';

const store = configureStore({
  reducer: {
    app: AppReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
