// import React from "react";
// import styles from "../../styles/styles.js";
// import { Country, State } from "country-state-city";
// import { Link } from "react-router-dom";

// const ShippingInfo = ({
//   user,
//   country,
//   setCountry,
//   city,
//   setCity,
//   userInfo,
//   setUserInfo,
//   address1,
//   setAddress1,
//   address2,
//   setAddress2,
//   zipCode,
//   setZipCode,
// }) => {
//   return (
//     <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
//       <h5 className="text-[18px] font-[500]">Shipping Address</h5>
//       <br />
//       <form>
//         {/* Name & Email */}
//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Full Name</label>
//             <input
//               type="text"
//               value={user && user.name}
//               readOnly
//               className={`${styles.input} !w-[95%] cursor-not-allowed`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">Email Address</label>
//             <input
//               type="email"
//               value={user && user.email}
//               readOnly
//               className={`${styles.input} cursor-not-allowed`}
//             />
//           </div>
//         </div>

//         {/* Phone & Zip */}
//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Phone Number</label>
//             <input
//               type="number"
//               readOnly
//               value={user && user.phoneNumber || 0}
//               className={`${styles.input} !w-[95%] cursor-not-allowed`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">
//               Zip Code <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={zipCode}
//               onChange={(e) => setZipCode(e.target.value)}
//               required
//               className={`${styles.input}`}
//             />
//           </div>
//         </div>

//         {/* Country & City */}
//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">
//               Country <span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-[95%] border h-[40px] rounded-[5px] px-2"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               required
//             >
//               <option value="">Choose your country</option>
//               {Country &&
//                 Country.getAllCountries().map((item) => (
//                   <option key={item.isoCode} value={item.isoCode}>
//                     {item.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">
//               City <span className="text-red-500">*</span>
//             </label>
//             <select
//               className="w-[95%] border h-[40px] rounded-[5px] px-2"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               required
//             >
//               <option value="">Choose your City</option>
//               {State &&
//                 State.getStatesOfCountry(country).map((item) => (
//                   <option key={item.isoCode} value={item.isoCode}>
//                     {item.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         {/* Address 1 & Address 2 */}
//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">
//               Address 1 <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               value={address1}
//               onChange={(e) => setAddress1(e.target.value)}
//               className={`${styles.input} !w-[95%]`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">Address 2</label>
//             <input
//               type="text"
//               value={address2}
//               onChange={(e) => setAddress2(e.target.value)}
//               className={`${styles.input}`}
//             />
//           </div>
//         </div>
//       </form>

//       {/* Saved Addresses */}
//       <h5
//         className="text-[18px] cursor-pointer inline-block text-blue-500 hover:text-blue-700 transition-colors"
//         onClick={() => setUserInfo(!userInfo)}
//       >
//         {userInfo ? "Hide saved addresses" : "Choose from saved address"}
//       </h5>

//       {userInfo && (
//         <div className="mt-3">
//           {user?.addresses?.map((item, index) => (
//             <div className="w-full flex items-center mt-2" key={index}>
//               <input
//                 type="radio"
//                 name="savedAddress"
//                 className="mr-3 cursor-pointer"
//                 value={item.addressType}
//                 onClick={() => {
//                   setAddress1(item.address1 || "");
//                   setAddress2(item.address2 || "");
//                   setZipCode(item.zipCode || "");
//                   setCountry(item.country || "");
//                   setCity(item.city || "");
//                 }}
//               />
//               <div className="flex flex-wrap">
//                 <span className="font-semibold mr-2">{item.addressType}:</span>
//                 <span>
//                   {item.address1} {item.address2}, {item.city}, {item.country}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {user?.addresses?.length === 0 && (
//             <p className="text-gray-500 text-sm mt-2">
//               No saved addresses. Add one in your profile!{" "}
//               <Link className="hover:text-[#3a24db]" to={`/profile`}>
//                 Go to profile
//               </Link>
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShippingInfo;

import React from "react";
import styles from "../../styles/styles.js";
import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  // ✅ Safe user data with fallbacks
  const safeUser = {
    name: user?.name || "Guest",
    email: user?.email || "No email provided",
    phoneNumber: user?.phoneNumber || "N/A",
    addresses: user?.addresses || [],
  };

  // ✅ Check if user has any saved addresses
  const hasSavedAddresses = safeUser.addresses.length > 0;

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-lg shadow-sm p-5 pb-8">
      <h5 className="text-[18px] font-[600] text-gray-800 border-b pb-3">
        Shipping Address
      </h5>
      <br />

      <form>
        {/* Name & Email */}
        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={safeUser.name}
              readOnly
              className={`${styles.input} !w-[95%] bg-gray-50 cursor-not-allowed`}
            />
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={safeUser.email}
              readOnly
              className={`${styles.input} bg-gray-50 cursor-not-allowed`}
            />
          </div>
        </div>

        {/* Phone & Zip */}
        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              readOnly
              value={safeUser.phoneNumber}
              className={`${styles.input} !w-[95%] bg-gray-50 cursor-not-allowed ${
                safeUser.phoneNumber === "N/A" ? "text-gray-400 italic" : ""
              }`}
            />
            {safeUser.phoneNumber === "N/A" && (
              <p className="text-xs text-yellow-600 mt-1">
                ⚠️ Please update your phone number in{" "}
                <Link to="/profile" className="text-blue-500 hover:underline">
                  profile
                </Link>
              </p>
            )}
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
              required
              placeholder="e.g. 54000"
              className={`${styles.input} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>

        {/* Country & City */}
        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              className="w-[95%] border border-gray-300 h-[40px] rounded-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              {Country?.getAllCountries?.()?.map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <select
              className="w-[95%] border border-gray-300 h-[40px] rounded-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={!country}
            >
              <option value="">
                {country ? "Select your city" : "Select country first"}
              </option>
              {country &&
                State?.getStatesOfCountry?.(country)?.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {!country && (
              <p className="text-xs text-gray-400 mt-1">
                Please select a country first
              </p>
            )}
          </div>
        </div>

        {/* Address 1 & Address 2 */}
        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Address 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address1 || ""}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Street address, P.O. Box, etc."
              className={`${styles.input} !w-[95%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2 text-sm font-medium text-gray-700">
              Address 2 <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              value={address2 || ""}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apartment, suite, unit, etc."
              className={`${styles.input} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>
      </form>

      {/* Saved Addresses Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h5
          className={`text-[16px] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors ${
            hasSavedAddresses
              ? "text-blue-500 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (hasSavedAddresses) {
              setUserInfo(!userInfo);
            }
          }}
        >
          {userInfo ? "▼ Hide saved addresses" : "▶ Choose from saved address"}
          {!hasSavedAddresses && (
            <span className="text-xs text-gray-400 font-normal">
              (No saved addresses)
            </span>
          )}
        </h5>

        {userInfo && hasSavedAddresses && (
          <div className="mt-3 space-y-2">
            {safeUser.addresses.map((item, index) => (
              <div
                className="w-full flex items-start p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer"
                key={index}
                onClick={() => {
                  setAddress1(item.address1 || "");
                  setAddress2(item.address2 || "");
                  setZipCode(item.zipCode || "");
                  setCountry(item.country || "");
                  setCity(item.city || "");
                  setUserInfo(false); // Auto-close after selection
                }}
              >
                <input
                  type="radio"
                  name="savedAddress"
                  className="mt-1 mr-3 cursor-pointer flex-shrink-0"
                  value={item.addressType}
                  checked={
                    address1 === item.address1 &&
                    city === item.city &&
                    country === item.country
                  }
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">
                    {item.addressType}:
                  </span>
                  <span className="text-gray-600 ml-1">
                    {item.address1} {item.address2 && `, ${item.address2}`}
                    {item.city && `, ${item.city}`}
                    {item.country && `, ${item.country}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasSavedAddresses && (
          <div className="mt-2 text-sm text-gray-500">
            <p>
              No saved addresses.{" "}
              <Link
                to="/profile"
                className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
              >
                Go to profile
              </Link>{" "}
              to add one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;