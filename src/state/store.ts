import { configureStore } from "@reduxjs/toolkit";
import billReducer from "../slices/billSlice";

// Configure the Redux store with the bill slice
const store = configureStore({
  reducer: {
    bills: billReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
