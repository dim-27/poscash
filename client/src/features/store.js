import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./globalReducer.js";
export const store = configureStore({
  reducer: eventSlice,
});
