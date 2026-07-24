// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { axiosServerInstance } from "../../server.js";

// const ResetPasswordPage = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axiosServerInstance.put(
//         `/user/reset-password/${token}`,
//         { password, confirmPassword },
//       );
//       toast.success(data.message);
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Reset failed, try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-2xl font-Poppins">Reset Password</h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
//           <form onSubmit={handleSubmit}>
//             <label className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               required
//               minLength={6}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//             />
//             <label className="block text-sm font-medium text-gray-700 mt-4">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               required
//               minLength={6}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;

import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosServerInstance } from "../../server.js";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.pathname.includes("/shop/") ? "shop" : "user";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        userType === "shop"
          ? `/shop/reset-password/${token}`
          : `/user/reset-password/${token}`;

      const { data } = await axiosServerInstance.put(endpoint, {
        password,
        confirmPassword,
      });
      toast.success(data.message);
      navigate(userType === "shop" ? "/shop-login" : "/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-Poppins">
          {userType === "shop" ? "Shop " : ""}Reset Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;