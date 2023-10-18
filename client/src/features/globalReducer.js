import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearch: false,
  quantity: 0,
  showCart: false,
  totalCart: 0,
  rand: Math.random(),
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleSearch: (state, action) => {
      if (!state.isSearch) {
        state.searchProducts = [];
      }
      state.isSearch = action.payload;
    },
    incrementQuantity: (state) => {
      state.quantity += 1;
    },
    decrementQuantity: (state) => {
      if (state.quantity > 0) {
        state.quantity -= 1;
      }
    },
    toggleShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
    setRand: (state, action) => {
      state.rand = action.payload;
    },
  },
});

export const selectQuantity = (state) => state.product.quantity;
export const showCart = (state) => state.product.showCart;
export const totalCart = (state) => state.product.totalCart;
export const random = (state) => state.product.rand;
export const {
  toggleSearch,
  incrementQuantity,
  decrementQuantity,
  toggleShowCart,
  setTotalCart,
  refetchCart,
  setRand,
} = productSlice.actions;
export default productSlice.reducer;
