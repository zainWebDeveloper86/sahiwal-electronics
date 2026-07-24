// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import styles from "../../styles/styles.js";
// import { axiosServerInstance } from "../../server.js";
// import Loader from "../Common/Loader.jsx";
// import { loadUser } from "../../redux/actions/user.js";

// const AdminSettings = () => {
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.user);
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
//   const [password, setPassword] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);

//   // ✅ Update Admin Info
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email) {
//       toast.error("Name and email are required!");
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       await axiosServerInstance.put("/user/update-user-info", {
//         name,
//         email,
//         phoneNumber,
//         password: password || undefined, // Only send if provided
//       });
//       toast.success("Profile updated successfully!");
//       dispatch(loadUser());
//       setPassword(""); // Clear password field
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-6">
//       <h3 className="text-[22px] font-Poppins pb-4">Admin Settings</h3>
//       <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-6">
//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 pb-2">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`${styles.input} !w-full`}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 pb-2">
//               Email Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`${styles.input} !w-full`}
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 pb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className={`${styles.input} !w-full`}
//             />
//           </div>

//           {/* Password (optional) */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 pb-2">
//               New Password{" "}
//               <span className="text-gray-400 text-xs">
//                 (leave blank to keep current)
//               </span>
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={`${styles.input} !w-full`}
//               placeholder="Enter new password..."
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isUpdating}
//             className={`${styles.button} !w-full !h-[45px] text-white text-[16px] font-semibold ${
//               isUpdating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isUpdating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;


import React from "react";
import ProfileInfo from "../User_Profile/ProfileInfo.jsx";

const AdminSettings = () => {
  return (
    <div className="w-full p-6">
      <h3 className="text-[22px] font-Poppins pb-4">Admin Settings</h3>
      <div className="w-full bg-white rounded-lg shadow-sm p-6">
        {/* ✅ Reusing ProfileInfo component — Admin bhi user hai */}
        <ProfileInfo />
      </div>
    </div>
  );
};

export default AdminSettings;