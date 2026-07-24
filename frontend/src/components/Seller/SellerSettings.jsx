// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { backend_url, axiosServerInstance } from "../../server.js";
// import { AiOutlineCamera } from "react-icons/ai";
// import styles from "../../styles/styles.js";
// import { loadSeller } from "../../redux/actions/seller.js";
// import { toast } from "react-toastify";

// const SellerSettings = () => {
//   const { seller } = useSelector((state) => state.seller);
//   const [avatar, setAvatar] = useState();
//   const [name, setName] = useState(seller && seller.name);
//   const [description, setDescription] = useState(
//     seller && seller.description ? seller.description : "",
//   );
//   const [address, setAddress] = useState(seller && seller.address);
//   const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
//   const [zipCode, setZipcode] = useState(seller && seller.zipCode);

//   const dispatch = useDispatch();

//   const handleImage = async (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result);
//         axiosServerInstance
//           .put(
//             `/shop/update-shop-avatar`,
//             { avatar: reader.result },
//             {
//               withCredentials: true,
//             },
//           )
//           .then((res) => {
//             dispatch(loadSeller());
//             toast.success("Avatar updated successfully!");
//           })
//           .catch((error) => {
//             toast.error(error.response.data.message);
//           });
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const updateHandler = async (e) => {
//     e.preventDefault();

//     await axiosServerInstance
//       .put(
//         `/shop/update-seller-info`,
//         {
//           name,
//           address,
//           zipCode,
//           phoneNumber,
//           description,
//         },
//         { withCredentials: true },
//       )
//       .then((res) => {
//         toast.success("Shop info updated succesfully!");
//         dispatch(loadSeller());
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center">
//       <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
//         <div className="w-full flex items-center justify-center">
//           <div className="relative">
//             <img
//               src={avatar ? avatar : `${seller.avatar?.url}`}
//               alt=""
//               className="w-[200px] h-[200px] rounded-full cursor-pointer"
//             />
//             <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
//               <input
//                 type="file"
//                 id="image"
//                 className="hidden"
//                 onChange={handleImage}
//               />
//               <label htmlFor="image">
//                 <AiOutlineCamera />
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* shop info */}
//         <form
//           aria-aria-required={true}
//           className="flex flex-col items-center"
//           onSubmit={updateHandler}
//         >
//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <div className="w-full pl-[3%]">
//               <label className="block pb-2">Shop Name</label>
//             </div>
//             <input
//               type="name"
//               placeholder={`${seller.name}`}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//             />
//           </div>
//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <div className="w-full pl-[3%]">
//               <label className="block pb-2">Shop description</label>
//             </div>
//             <input
//               type="name"
//               placeholder={`${
//                 seller?.description
//                   ? seller.description
//                   : "Enter your shop description"
//               }`}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//             />
//           </div>
//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <div className="w-full pl-[3%]">
//               <label className="block pb-2">Shop Address</label>
//             </div>
//             <input
//               type="name"
//               placeholder={seller?.address}
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//             />
//           </div>

//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <div className="w-full pl-[3%]">
//               <label className="block pb-2">Shop Phone Number</label>
//             </div>
//             <input
//               type="number"
//               placeholder={seller?.phoneNumber}
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//             />
//           </div>

//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <div className="w-full pl-[3%]">
//               <label className="block pb-2">Shop Zip Code</label>
//             </div>
//             <input
//               type="number"
//               placeholder={seller?.zipCode}
//               value={zipCode}
//               onChange={(e) => setZipcode(e.target.value)}
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//             />
//           </div>

//           <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
//             <input
//               type="submit"
//               value="Update Shop"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               readOnly
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerSettings;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, axiosServerInstance } from "../../server.js";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { loadSeller } from "../../redux/actions/seller.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader.jsx";

const SellerSettings = () => {
  const dispatch = useDispatch();
  const { seller, loading } = useSelector((state) => state.seller);

  //  Local states
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(seller?.zipCode || "");
  const [isUpdating, setIsUpdating] = useState(false);

  //  Avatar Upload Handler (Using FormData - consistent with ProfileContent)
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosServerInstance.put("/shop/update-shop-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(loadSeller());
      toast.success("Shop avatar updated successfully!");
      setAvatar(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  //  Update Shop Info Handler
  const updateHandler = async (e) => {
    e.preventDefault();

    //  Validate required fields
    if (!name || !address || !phoneNumber || !zipCode) {
      toast.error("Please fill all required fields!");
      return;
    }

    setIsUpdating(true);
    try {
      await axiosServerInstance.put(
        "/shop/update-seller-info",
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true },
      );
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update shop info",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  //  Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  //  Safe seller data
  const safeSeller = {
    name: seller?.name || "",
    description: seller?.description || "",
    address: seller?.address || "",
    phoneNumber: seller?.phoneNumber || "",
    zipCode: seller?.zipCode || "",
    avatar: seller?.avatar || { url: "" },
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8">
      <div className="w-full 800px:w-[80%] flex flex-col justify-center">
        {/* Avatar Section */}
        <div className="w-full flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}${safeSeller.avatar?.url}`
              }
              alt="Shop Avatar"
              className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-200"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=" +
                  safeSeller.name +
                  "&background=random&size=150";
              }}
            />
            <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] hover:bg-gray-300 transition-colors">
              <input
                type="file"
                id="shop-avatar"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleImage}
              />
              <label htmlFor="shop-avatar" className="cursor-pointer">
                <AiOutlineCamera size={18} />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Info Form */}
        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          {/* Shop Name */}
          <div className="w-full 800px:w-[50%] mt-4">
            <label className="block pb-2 font-medium text-gray-700">
              Shop Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter shop name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-full`}
              required
            />
          </div>

          {/* Shop Description */}
          <div className="w-full 800px:w-[50%] mt-4">
            <label className="block pb-2 font-medium text-gray-700">
              Shop Description
            </label>
            <textarea
              placeholder="Describe your shop..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-full min-h-[100px] resize-y`}
              rows={4}
            />
          </div>

          {/* Shop Address */}
          <div className="w-full 800px:w-[50%] mt-4">
            <label className="block pb-2 font-medium text-gray-700">
              Shop Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter shop address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-full`}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="w-full 800px:w-[50%] mt-4">
            <label className="block pb-2 font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-full`}
              required
            />
          </div>

          {/* Zip Code */}
          <div className="w-full 800px:w-[50%] mt-4">
            <label className="block pb-2 font-medium text-gray-700">
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-full`}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full 800px:w-[50%] mt-6">
            <button
              type="submit"
              disabled={isUpdating}
              className={`${styles.button} !w-full !h-[45px] text-white text-[16px] font-semibold rounded-md ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? "Updating..." : "Update Shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerSettings;
