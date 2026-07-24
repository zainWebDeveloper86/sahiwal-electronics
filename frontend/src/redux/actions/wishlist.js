// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToWishlist",
    payload: data,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist),
  );
  return data;
};

// remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist),
  );
  return data;
};

// clear wishlist
export const clearWishlist = () => async (dispatch, getState) => {
  dispatch({
    type: "clearWishlist",
  });
  localStorage.setItem("wishlistItems", JSON.stringify([]));
};
