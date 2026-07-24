import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { cartReducer } from "./reducers/cart.js";
import { wishlistReducer } from "./reducers/wishlist.js";
import { orderReducer } from "./reducers/order.js";
const store = configureStore({
  reducer: {
    user: userReducer, // User authentication
    seller: sellerReducer, // Seller authentication
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer
  },
});

export default store;
