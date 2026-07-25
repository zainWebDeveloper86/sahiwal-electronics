import { axiosServerInstance } from "../../server.js";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "EventCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axiosServerInstance.post(
      "/event/create-event",
      newForm,
      config,
    );
    dispatch({
      type: "EventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "EventCreateFail",
      payload: error.response?.data?.message || "Failed to create event",
    });
  }
};

// get all events
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });
    const { data } = await axiosServerInstance.get(
      `/event/get-all-events-shop/${id}`,
    );
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response?.data?.message || "Failed to get all shop events",
    });
  }
};
// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });
    const { data } = await axiosServerInstance.get(
      `/event/get-all-events`,
    );
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response?.data?.message || "Failed to get all events",
    });
  }
};

// delete a event
export const deleteEventShop  = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });
    const { data } = await axiosServerInstance.delete(
      `/event/delete-shop-event/${id}`,
    );
    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response?.data?.message || "Failed to delete event",
    });
  }
};


// Get all events (Admin only)
export const getAllAdminEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllAdminEventsRequest" });

    const { data } = await axiosServerInstance.get(
      "/event/admin-all-events",
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllAdminEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllAdminEventsFailed",
      payload: error.response?.data?.message || "Failed to fetch events",
    });
  }
};