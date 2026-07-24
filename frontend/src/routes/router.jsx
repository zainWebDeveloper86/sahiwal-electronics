import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout, AdminLayout, SellerLayout } from "../Layout/Layout.js";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  ShopCreatePage,
  ShopLoginPage,
  GuestRoute,
  ProtectedRoute,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "./auth.routes.js";
import {
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
} from "./routes.js";
import {
  CheckoutPage,
  OrderDetailsPage,
  OrderSuccessPage,
  PaymentPage,
  ProfilePage,
  TrackOrderResult,
  UserInbox,
} from "./user.routes.js";
import {
  SellerDashboardPage,
  SellerHomepage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCoupounsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailPage,
  ShopAllRefundOrdersPage,
  SellerSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./seller.routes.js";
import {
  AdminAllEventspage,
  AdminAllOrderspage,
  AdminAllProductspage,
  AdminAllSellerspage,
  AdminAllUserspage,
  AdminAllWithdrawsPage,
  AdminDashboardpage,
  AdminSettingsPage,
} from "./admin.routes.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🌍 Public Routes (without headers) */}

      <Route path="activation/:activation_token" element={<ActivationPage />} />
      <Route path="shop/preview/:id" element={<ShopPreviewPage />} />

      <Route path="/" element={<RootLayout />}>
        {/* 🌍 Public Routes (for everyone, no login need) */}
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="best-selling" element={<BestSellingPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="faq" element={<FAQPage />} />

        {/* 🔐 User Protected Routes */}
        <Route element={<ProtectedRoute role="user" />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="inbox" element={<UserInbox />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/user/order/:id" element={<OrderDetailsPage />} />
          <Route path="/user/track/order/:id" element={<TrackOrderResult />} />
        </Route>
      </Route>

      {/* 🏪 Seller Protected Routes */}
      <Route element={<SellerLayout />}>
        <Route element={<ProtectedRoute role="seller" />}>
          <Route path="shop/:id" element={<SellerHomepage />} />
          <Route path="dashboard" element={<SellerDashboardPage />} />
          <Route path="settings" element={<SellerSettingsPage />} />
          <Route
            path="dashboard-create-product"
            element={<ShopCreateProductPage />}
          />
          <Route path="dashboard-all-orders" element={<ShopAllOrdersPage />} />
          <Route path="shop/order/:id" element={<ShopOrderDetailPage />} />
          <Route
            path="dashboard-all-products"
            element={<ShopAllProductsPage />}
          />
          <Route
            path="dashboard-create-event"
            element={<ShopCreateEventPage />}
          />
          <Route path="dashboard-all-events" element={<ShopAllEventsPage />} />
          <Route
            path="dashboard-all-coupouns"
            element={<ShopAllCoupounsPage />}
          />
          <Route
            path="dashboard-all-refunds"
            element={<ShopAllRefundOrdersPage />}
          />
          <Route
            path="dashboard-withdraw-money"
            element={<ShopWithDrawMoneyPage />}
          />
          <Route path="dashboard-messages" element={<ShopInboxPage />} />
        </Route>
      </Route>

      {/*  Admin Protected Routes */}
      <Route element={<AdminLayout />}>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="admin/dashboard" element={<AdminDashboardpage />} />
          <Route path="admin/users" element={<AdminAllUserspage />} />
          <Route path="admin/sellers" element={<AdminAllSellerspage />} />
          <Route path="admin/orders" element={<AdminAllOrderspage />} />
          <Route path="admin/products" element={<AdminAllProductspage />} />
          <Route path="admin/events" element={<AdminAllEventspage />} />
          <Route
            path="admin/withdraw-request"
            element={<AdminAllWithdrawsPage />}
          />
          <Route path="admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* for user */}
      <Route element={<GuestRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      </Route>
      {/* for saller/shop */}
      <Route element={<GuestRoute />}>
        <Route path="shop-login" element={<ShopLoginPage />} />
        <Route path="shop-create" element={<ShopCreatePage />} />
        <Route path="shop/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="shop/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>
    </>,
  ),
);

export default router;
