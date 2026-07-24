import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  successMessage: null,
  users: [],
  usersLoading: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Load User
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("LogoutUser", (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    })
    // Update User Info
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Update Address
    .addCase("updateUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Delete Address
    .addCase("deleteUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Admin - Get all users
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    // Clear messages
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.successMessage = null;
    });
});
