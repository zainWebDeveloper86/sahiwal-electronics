import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  events: null,
  allEvents: null,
  error: null,
  message: null,
  success: false,
  event: null,
  adminEvents: [],
  adminEventsLoading: false,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("EventCreateRequest", (state) => {
      state.loading = true;
    })
    .addCase("EventCreateSuccess", (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("EventCreateFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("ClearEventSuccess", (state) => {
      state.success = false;
      state.event = null;
    })
    // get all events of shop
    .addCase("getAllEventsShopRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.loading = false;
      state.events = action.payload;
    })
    .addCase("getAllEventsShopFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // get all events
    .addCase("getAllEventsRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.loading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAllEventsFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // delete product of a shop
    .addCase("deleteEventRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Admin: Get all events
    .addCase("getAllAdminEventsRequest", (state) => {
      state.adminEventsLoading = true;
    })
    .addCase("getAllAdminEventsSuccess", (state, action) => {
      state.adminEventsLoading = false;
      state.adminEvents = action.payload;
    })
    .addCase("getAllAdminEventsFailed", (state, action) => {
      state.adminEventsLoading = false;
      state.error = action.payload;
    })
    .addCase("ClearEventDeleteMessage", (state) => {
      state.message = null;
    })
    .addCase("ClearEventErrors", (state) => {
      state.error = null;
    });
});
