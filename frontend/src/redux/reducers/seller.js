import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  loading: true,
  seller: null,
  error: null,
  sellers: [],
  sellersLoading: false,
  sellersError: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSellerAuthenticated = true;
      state.loading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isSellerAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("LogoutSeller", (state) => {
      state.isSellerAuthenticated = false;
      state.seller = null;
      state.loading = false;
      state.error = null;
    })
    // Get all sellers (Admin)
    .addCase("getAllSellersRequest", (state) => {
      state.sellersLoading = true;
      state.sellersError = null;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.sellersLoading = false;
      state.sellers = action.payload;
      state.sellersError = null;
    })
    .addCase("getAllSellerFailed", (state, action) => {
      state.sellersLoading = false;
      state.sellersError = action.payload;
    })
    .addCase("ClearSellerErrors", (state) => {
      state.error = null;
      state.sellersError = null;
    });
});
