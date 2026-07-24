import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/styles.js";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { categoriesData } from "../../static/data.jsx";
import { backend_url } from "../../server.js";
import { toast } from "react-toastify";

const DesktopHeader = ({
  active,
  dropDown,
  setDropDown,
  searchTerm,
  handleSearchChange,
  searchData,
  setSearchTerm,
  setSearchData,
  isAuthenticated,
  isSellerAuthenticated,
  user,
  seller,
  wishlist,
  cart,
  setOpenWishlist,
  setOpenCart,
  navigate,
}) => {
  // console.log(seller.role);
  // Role-based button logic
  // const renderButton = () => {
  //   // 1. Seller logged in → Dashboard
  //   if (isSellerAuthenticated && seller?.role === "seller") {
  //     return (
  //       <Link to="/dashboard">
  //         <div className={`${styles.button}`}>
  //           <h1 className="text-[#fff] flex items-center">
  //             Dashboard <IoIosArrowForward className="ml-1" />
  //           </h1>
  //         </div>
  //       </Link>
  //     );
  //   }

  //   // 2. Admin logged in → Admin Dashboard
  //   if (isAuthenticated && user?.role === "admin") {
  //     return (
  //       <Link to="/admin/dashboard">
  //         <div className={`${styles.button}`}>
  //           <h1 className="text-[#fff] flex items-center">
  //             Dashboard <IoIosArrowForward className="ml-1" />
  //           </h1>
  //         </div>
  //       </Link>
  //     );
  //   }
  //   // 3. Normal User → Become Seller
  //   if (isAuthenticated && user?.role === "user") {
  //     const handleBecomeSeller = () => {
  //       toast.error(
  //         "Please logout from your user account first to continue as a seller",
  //       );
  //       navigate("/shop-create");
  //     };

  //     return (
  //       <div
  //         className={`${styles.button} cursor-pointer`}
  //         onClick={handleBecomeSeller}
  //       >
  //         <h1 className="text-[#fff] flex items-center">
  //           Become Seller <IoIosArrowForward className="ml-1" />
  //         </h1>
  //       </div>
  //     );
  //   }

  //   // 4. Guest → Become Seller
  //   return (
  //     <div
  //       className={`${styles.button} cursor-pointer`}
  //       onClick={() => navigate("/shop-create")}
  //     >
  //       <h1 className="text-[#fff] flex items-center">
  //         Become Seller <IoIosArrowForward className="ml-1" />
  //       </h1>
  //     </div>
  //   );
  // };
  // Role-based button logic
  const renderButton = () => {
    // 1. Seller logged in → Dashboard
    if (isSellerAuthenticated && seller?.role === "seller") {
      return (
        <Link to="/dashboard">
          <div className={`${styles.button}`}>
            <h1 className="text-[#fff] flex items-center">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

    // 2. Admin logged in → Admin Dashboard
    if (isAuthenticated && user?.role === "admin") {
      return (
        <Link to="/admin/dashboard">
          <div className={`${styles.button}`}>
            <h1 className="text-[#fff] flex items-center">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

    // 3. Normal User logged in → Show "Become Seller" (with logout warning)
    if (isAuthenticated && user?.role === "user") {
      const handleSellerClick = () => {
        toast.error(
          "Please logout from your user account first to continue as a seller",
        );
      };

      return (
        <div
          className={`${styles.button} cursor-pointer`}
          onClick={handleSellerClick}
        >
          <h1 className="text-[#fff] flex items-center">
            Become Seller <IoIosArrowForward className="ml-1" />
          </h1>
        </div>
      );
    }

    // 4. Guest (Not logged in) → Become Seller
    return (
      <div
        className={`${styles.button} cursor-pointer`}
        onClick={() => navigate("/shop-create")}
      >
        <h1 className="text-[#fff] flex items-center">
          Become Seller <IoIosArrowForward className="ml-1" />
        </h1>
      </div>
    );
  };

  // Profile avatar with role-based link
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
    return null; // fallback will use UI Avatars
  };

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (seller?.name) return seller.name;
    return "U";
  };

  return (
    <>
      {/* Top Section: Logo + Search + Button */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-[#3957db] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400 text-sm"
              />
              <AiOutlineSearch
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3957db] cursor-pointer transition-colors duration-300"
              />
            </div>

            {/* Search Results */}
            {searchData && searchData.length !== 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[9] max-h-[400px] overflow-y-auto">
                {searchData.map((i, index) => (
                  <Link
                    key={index}
                    to={`/product/${i._id}`}
                    onClick={() => {
                      setSearchTerm("");
                      setSearchData(null);
                    }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-none">
                      <img
                        src={`${backend_url}${i.images[0]?.url}`}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {i.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ${i.discountPrice}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Role-based Button */}
          {renderButton()}
        </div>
      </div>

      {/* Bottom Navbar Section */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories Dropdown */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          <Navbar />

          {/* Icons: Wishlist, Cart, Avatar */}
          <div className="flex">
            {/* Wishlist */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist?.length || 0}
                </span>
              </div>
            </div>

            {/* Cart */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart?.length || 0}
                </span>
              </div>
            </div>

            {/* Avatar */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated || isSellerAuthenticated ? (
                  <Link to={getProfileLink()}>
                    <img
                      src={
                        getAvatarUrl() ||
                        `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`
                      }
                      className="w-[35px] h-[35px] rounded-full object-cover"
                      alt={getDisplayName()}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`;
                      }}
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopHeader;
