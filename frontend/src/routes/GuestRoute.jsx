import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Common/Loader.jsx";

const GuestRoute = () => {
  const {
    isAuthenticated,
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const {
    isSellerAuthenticated,
    loading: sellerLoading,
    seller,
  } = useSelector((state) => state.seller);

  if (userLoading || sellerLoading) {
    return <Loader />;
  }

  // If admin is logged in → redirect to admin dashboard
  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Seller → seller dashboard
  if (isSellerAuthenticated && seller?.role === "seller") {
    return <Navigate to="/dashboard" replace />;
  }
  // Normal user → home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
