import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./globalReducer"

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})
