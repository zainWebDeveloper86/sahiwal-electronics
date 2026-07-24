// import React from "react";
// import { Link } from "react-router-dom";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
// import { IoIosArrowForward } from "react-icons/io";
// import styles from "../../styles/styles.js";
// import Navbar from "./Navbar.jsx";
// import { backend_url } from "../../server.js";

// const MobileHeader = ({
//   active,
//   openSidebar,
//   setOpenSidebar,
//   setOpenWishlist,
//   setOpenCart,
//   cart,
//   wishlist,
//   searchTerm,
//   handleSearchChange,
//   searchData,
//   setSearchTerm,
//   setSearchData,
//   isAuthenticated,
//   user,
//   navigate,
//   closeSidebar,
// }) => {
//   // Role-based button logic
//   const renderMobileButton = () => {
//     if (!isAuthenticated || user?.role === "user") {
//       return (
//         <div
//           className={`${styles.button} cursor-pointer ml-4`}
//           onClick={() => {
//             navigate("/shop-create");
//             closeSidebar();
//           }}
//         >
//           <h1 className="text-[#fff] flex items-center">
//             Become Seller <IoIosArrowForward className="ml-1" />
//           </h1>
//         </div>
//       );
//     }
//     if (user?.role === "seller") {
//       return (
//         <Link to="/dashboard" onClick={closeSidebar}>
//           <div className={`${styles.button} ml-4`}>
//             <h1 className="text-[#fff] flex items-center">
//               Dashboard <IoIosArrowForward className="ml-1" />
//             </h1>
//           </div>
//         </Link>
//       );
//     }
//     if (user?.role === "admin") {
//       return (
//         <Link to="/admin/dashboard" onClick={closeSidebar}>
//           <div className={`${styles.button} ml-4`}>
//             <h1 className="text-[#fff] flex items-center">
//               Dashboard <IoIosArrowForward className="ml-1" />
//             </h1>
//           </div>
//         </Link>
//       );
//     }
//     return null;
//   };

//   // Profile link
//   const getProfileLink = () => {
//     if (user?.role === "admin") return "/admin/dashboard";
//     if (user?.role === "seller") return "/dashboard";
//     return "/profile";
//   };

//   return (
//     <>
//       {/* Top Mobile Bar */}
//       <div
//         className={`${
//           active ? "shadow-sm fixed top-0 left-0 z-10" : ""
//         } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
//       >
//         <div className="w-full flex items-center justify-between">
//           <BiMenuAltLeft
//             size={40}
//             className="ml-4 cursor-pointer"
//             onClick={() => setOpenSidebar(true)}
//           />

//           <Link to="/">
//             <img
//               src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//               alt=""
//               className="mt-3 cursor-pointer"
//             />
//           </Link>

//           <div
//             className="relative mr-[20px] cursor-pointer"
//             onClick={() => setOpenCart(true)}
//           >
//             <AiOutlineShoppingCart size={30} />
//             <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
//               {cart?.length || 0}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar (Drawer) */}
//       {openSidebar && (
//         <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
//           <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
//             {/* Top Bar: Wishlist + Close */}
//             <div className="w-full justify-between flex pr-3">
//               <div>
//                 <div
//                   className="relative mr-[15px] cursor-pointer"
//                   onClick={() => {
//                     setOpenWishlist(true);
//                     closeSidebar();
//                   }}
//                 >
//                   <AiOutlineHeart size={30} className="mt-5 ml-3" />
//                   <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
//                     {wishlist?.length || 0}
//                   </span>
//                 </div>
//               </div>
//               <RxCross1
//                 size={30}
//                 className="ml-4 mt-5 cursor-pointer"
//                 onClick={closeSidebar}
//               />
//             </div>

//             {/* Search */}
//             <div className="my-8 w-[92%] m-auto h-[40px] relative">
//               <input
//                 type="search"
//                 placeholder="Search Product..."
//                 className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-[#3957db] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400 text-sm"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               {searchData && searchData.length !== 0 && (
//                 <div className="absolute bg-[#fff] z-10 shadow-lg w-full left-0 p-3 rounded-b-md max-h-60 overflow-y-auto">
//                   {searchData.map((i, index) => (
//                     <Link
//                       key={index}
//                       to={`/product/${i._id}`}
//                       onClick={() => {
//                         setSearchTerm("");
//                         setSearchData(null);
//                         closeSidebar();
//                       }}
//                     >
//                       <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//                         <img
//                           src={`${backend_url}${i.images[0]?.url}`}
//                           alt=""
//                           className="w-[50px] h-[50px] object-cover rounded-md"
//                         />
//                         <h5 className="text-sm font-medium text-gray-700 truncate">
//                           {i.name}
//                         </h5>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Navbar />

//             {/* Role-based Button */}
//             {renderMobileButton()}

//             <br />
//             <br />
//             <br />

//             {/* Profile / Login */}
//             <div className="flex w-full justify-center">
//               {isAuthenticated ? (
//                 <Link to={getProfileLink()} onClick={closeSidebar}>
//                   <img
//                     src={`${backend_url}${user?.avatar?.url}`}
//                     alt=""
//                     className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88] object-cover"
//                     onError={(e) => {
//                       e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`;
//                     }}
//                   />
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="text-[18px] pr-[10px] text-[#000000b7] hover:text-[#3957db] transition-colors"
//                     onClick={closeSidebar}
//                   >
//                     Login /
//                   </Link>
//                   <Link
//                     to="/sign-up"
//                     className="text-[18px] text-[#000000b7] hover:text-[#3957db] transition-colors"
//                     onClick={closeSidebar}
//                   >
//                     Sign up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileHeader;

import React from "react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/styles.js";
import Navbar from "./Navbar.jsx";
import { backend_url } from "../../server.js";

const MobileHeader = ({
  active,
  openSidebar,
  setOpenSidebar,
  setOpenWishlist,
  setOpenCart,
  cart,
  wishlist,
  searchTerm,
  handleSearchChange,
  searchData,
  setSearchTerm,
  setSearchData,
  isAuthenticated,
  isSellerAuthenticated,
  user,
  seller,
  navigate,
  closeSidebar,
}) => {
  const renderMobileButton = () => {
    if (isSellerAuthenticated && seller?.role === "seller") {
      return (
        <Link to="/dashboard" onClick={closeSidebar}>
          <div className={`${styles.button} ml-4`}>
            <h1 className="text-[#fff] flex items-center">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

    if (isAuthenticated && user?.role === "admin") {
      return (
        <Link to="/admin/dashboard" onClick={closeSidebar}>
          <div className={`${styles.button} ml-4`}>
            <h1 className="text-[#fff] flex items-center">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

    return (
      <div
        className={`${styles.button} cursor-pointer ml-4`}
        onClick={() => {
          navigate("/shop-create");
          closeSidebar();
        }}
      >
        <h1 className="text-[#fff] flex items-center">
          Become Seller <IoIosArrowForward className="ml-1" />
        </h1>
      </div>
    );
  };

  const getProfileLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (seller?.role === "seller") return "/dashboard";
    return "/profile";
  };

  const getAvatarUrl = () => {
    if (isAuthenticated && user?.avatar?.url) {
      return `${backend_url}${user.avatar.url}`;
    }
    if (isSellerAuthenticated && seller?.avatar?.url) {
      return `${backend_url}${seller.avatar.url}`;
    }
    return null;
  };

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (seller?.name) return seller.name;
    return "U";
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <BiMenuAltLeft
            size={40}
            className="ml-4 cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          />

          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
              className="mt-3 cursor-pointer"
            />
          </Link>

          <div
            className="relative mr-[20px] cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
              {cart?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {openSidebar && (
        <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            {/* Top Bar: Wishlist + Close */}
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px] cursor-pointer"
                  onClick={() => {
                    setOpenWishlist(true);
                    closeSidebar();
                  }}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist?.length || 0}
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5 cursor-pointer"
                onClick={closeSidebar}
              />
            </div>

            {/* Search */}
            <div className="my-8 w-[92%] m-auto h-[40px] relative">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-[#3957db] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchData && searchData.length !== 0 && (
                <div className="absolute bg-[#fff] z-10 shadow-lg w-full left-0 p-3 rounded-b-md max-h-60 overflow-y-auto">
                  {searchData.map((i, index) => (
                    <Link
                      key={index}
                      to={`/product/${i._id}`}
                      onClick={() => {
                        setSearchTerm("");
                        setSearchData(null);
                        closeSidebar();
                      }}
                    >
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <img
                          src={`${backend_url}${i.images[0]?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] object-cover rounded-md"
                        />
                        <h5 className="text-sm font-medium text-gray-700 truncate">
                          {i.name}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Navbar />

            {/* Role-based Button */}
            {renderMobileButton()}

            <br />
            <br />
            <br />

            {/* Profile / Login */}
            <div className="flex w-full justify-center">
              {isAuthenticated || isSellerAuthenticated ? (
                <Link to={getProfileLink()} onClick={closeSidebar}>
                  <img
                    src={
                      getAvatarUrl() ||
                      `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`
                    }
                    alt={getDisplayName()}
                    className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88] object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`;
                    }}
                  />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7] hover:text-[#3957db] transition-colors"
                    onClick={closeSidebar}
                  >
                    Login /
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[18px] text-[#000000b7] hover:text-[#3957db] transition-colors"
                    onClick={closeSidebar}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
