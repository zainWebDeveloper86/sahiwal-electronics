import { axiosServerInstance } from "../../server.js";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "ProductCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axiosServerInstance.post(
      "/product/create-product",
      newForm,
      config,
    );
    dispatch({
      type: "ProductCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "ProductCreateFail",
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

// get all products for seller
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axiosServerInstance.get(
      `/product/get-all-products-shop/${id}`,
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || "Failed to get all products",
    });
  }
};

// delete a product
export const deleteProductShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const { data } = await axiosServerInstance.delete(
      `/product/delete-shop-product/${id}`,
    );
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

// get all products for public
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });

    const { data } = await axiosServerInstance.get("/product/get-all-products");

    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response?.data?.message || "Failed to get all products",
    });
  }
};

// Get all products (Admin only)
export const getAllAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllAdminProductsRequest" });

    const { data } = await axiosServerInstance.get(
      "/product/admin-all-products",
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllAdminProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllAdminProductsFailed",
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};