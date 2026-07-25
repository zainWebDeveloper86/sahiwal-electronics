import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Common/Loader";

const ProtectedRoute = ({ role }) => {
  const {
    isAuthenticated,
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const {
    isSellerAuthenticated,
    seller,
    loading: sellerLoading,
  } = useSelector((state) => state.seller);

  // Admin Route
  if (role === "admin") {
    if (userLoading) {
      return <Loader />;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    // Check if user role is actually "admin"
    if (user?.role && user?.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // User Route
  if (role === "user") {
    if (userLoading) {
      return <Loader />;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    // Extra security: Check it's actually a role of user
    if (user?.role && user.role !== "user") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // Seller Route
  if (role === "seller") {
    if (sellerLoading) {
      return <Loader />;
    }
    if (!isSellerAuthenticated) {
      return <Navigate to="/shop-login" replace />;
    }
    // Extra security: Check it's actually a role of seller
    if (seller?.role && seller.role !== "seller") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // if no any role specify, default user route
  if (!role) {
    if (userLoading) {
      return <Loader />;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }

  // Fallback
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
