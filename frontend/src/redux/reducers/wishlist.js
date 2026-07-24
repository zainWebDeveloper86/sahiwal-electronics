import { createReducer } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  wishlist: getInitialWishlist(),
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    })
    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    })
    .addCase("clearWishlist", (state) => {
      state.wishlist = [];
    });
});