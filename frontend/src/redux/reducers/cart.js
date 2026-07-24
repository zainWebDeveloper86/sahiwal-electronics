import { createReducer } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];   // if localStorage corrupt/invalid, no crash happens
  }
};

const initialState = {
  cart: getInitialCart(),
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        // Item already in cart — replace it with new data (like updated quantity)
        state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        // new item — add into cart
        state.cart.push(item);
      }
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    })
    .addCase("clearCart", (state) => {
      state.cart = [];
    });
});