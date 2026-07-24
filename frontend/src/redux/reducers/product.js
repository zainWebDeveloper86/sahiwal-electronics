import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: null,
  allProducts: null,
  product: null,
  error: null,
  message: null,
  success: false,
  adminProducts: [],
  adminProductsLoading: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("ProductCreateRequest", (state) => {
      state.loading = true;
    })
    .addCase("ProductCreateSuccess", (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("ProductCreateFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("ClearProductSuccess", (state) => {
      state.success = false;
      state.product = null;
    })
    // get all products of shop
    .addCase("getAllProductsShopRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete product of a shop
    .addCase("deleteProductRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("ClearProductDeleteMessage", (state) => {
      state.message = null;
    })
    // get all products
    .addCase("getAllProductsRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Admin: Get all products
    .addCase("getAllAdminProductsRequest", (state) => {
      state.adminProductsLoading = true;
    })
    .addCase("getAllAdminProductsSuccess", (state, action) => {
      state.adminProductsLoading = false;
      state.adminProducts = action.payload;
    })
    .addCase("getAllAdminProductsFailed", (state, action) => {
      state.adminProductsLoading = false;
      state.error = action.payload;
    })

    .addCase("ClearProductErrors", (state) => {
      state.error = null;
    });
});
