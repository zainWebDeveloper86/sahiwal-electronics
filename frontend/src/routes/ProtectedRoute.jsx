// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import Loader from "../components/Common/Loader";

// const ProtectedRoute = ({ role }) => {
//   // const { isAuthenticated, loading } = useSelector((state) => state.user);
//   const {
//     isAuthenticated,
//     loading: userLoading,
//     user,
//   } = useSelector((state) => state.user);
//   const {
//     isSellerAuthenticated,
//     loading: sellerLoading,
//     seller,
//   } = useSelector((state) => state.seller);

//   console.log("1:",user,seller)

//   // Loading state
//   if (userLoading || sellerLoading) {
//     return <Loader/>;
//   }

//   console.log("2:",user,seller)

//   // Agar logged-in nahi hai, login page par bhej do
//   // if (!isAuthenticated) {
//   //   return <Navigate to="/login" replace />;
//   // }

//     // 🔐 User Route (default)
//   if (!role || role === "user") {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }
//     // Extra security: Agar role mismatch ho toh redirect
//     if (user?.role && user.role !== "user") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   }

//   // Agar logged-in hai, andar ke routes render hone do
//   return <Outlet />;
// };

// export default ProtectedRoute;

// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ role }) => {
//   const { isAuthenticated, loading: userLoading, user } = useSelector(
//     (state) => state.user
//   );
//   const {
//     isSellerAuthenticated,
//     loading: sellerLoading,
//     seller,
//   } = useSelector((state) => state.seller);

//   console.log(user,seller)

//   // Loading state
//   if (userLoading || sellerLoading) {
//     return null; // ya yahan <Loader /> daal sakte ho
//   }

//   // 🔐 User Route (default)
//   if (!role || role === "user") {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }
//     // Extra security: Agar role mismatch ho toh redirect
//     if (user?.role && user.role !== "user") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   }

//   // 🏪 Seller Route
//   if (role === "seller") {
//     if (!isSellerAuthenticated) {
//       return <Navigate to="/shop-login" replace />;
//     }
//     // Extra security: Agar role mismatch ho toh redirect
//     if (seller?.role && seller.role !== "seller") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   }

//   // Fallback
//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import Loader from "../components/Common/Loader";

// const ProtectedRoute = ({ role }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   const { isSellerAuthenticated, seller } = useSelector(
//     (state) => state.seller,
//   );

//   // // Loading state
//   // if (userLoading || sellerLoading) {
//   //   return <Loader />; // ya Loader component
//   // }

//   // console.log(user,seller)
//   // 🔐 User Route
//   if (role === "user") {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }
//     // Extra security: Check karo ke user ka role actually "user" hai
//     if (user?.role && user.role !== "user") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   }

//   // 🏪 Seller Route
//   if (role === "seller") {
//     if (!isSellerAuthenticated) {
//       return <Navigate to="/shop-login" replace />;
//     }
//     // // Extra security: Check karo ke seller ka role actually "seller" hai
//     if (seller?.role && seller.role !== "seller") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   }

//   // Agar koi role specify nahi hai, default user route
//   if (!role) {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }
//     return <Outlet />;
//   }

//   // Fallback
//   return <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

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

  // Agar koi role specify nahi hai, default user route
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
