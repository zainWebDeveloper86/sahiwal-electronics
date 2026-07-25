import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
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
  const renderButton = () => {
    if (isSellerAuthenticated && seller?.role === "seller") {
      return (
        <Link to="/dashboard">
          <div className={`${styles.button}`}>
            <h1 className="text-white flex items-center font-body font-[500]">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

    if (isAuthenticated && user?.role === "admin") {
      return (
        <Link to="/admin/dashboard">
          <div className={`${styles.button}`}>
            <h1 className="text-white flex items-center font-body font-[500]">
              Dashboard <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </Link>
      );
    }

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
          <h1 className="text-white flex items-center font-body font-[500]">
            Become Seller <IoIosArrowForward className="ml-1" />
          </h1>
        </div>
      );
    }

    return (
      <div
        className={`${styles.button} cursor-pointer`}
        onClick={() => navigate("/shop-create")}
      >
        <h1 className="text-white flex items-center font-body font-[500]">
          Become Seller <IoIosArrowForward className="ml-1" />
        </h1>
      </div>
    );
  };

  const toggleDropDown = () => {
    setDropDown(!dropDown);
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
      {/* Top Section: Logo + Search + Button */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <span className="font-display font-[700] text-[24px] text-ink">
              Sahiwal <span className="text-voltage">Electronics</span>
            </span>
          </Link>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-divider rounded-full focus:border-voltage focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-ink font-body placeholder-ink/40 text-sm"
              />
              <AiOutlineSearch
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-voltage cursor-pointer transition-colors duration-300"
              />
            </div>

            {searchData && searchData.length !== 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-divider z-[9] max-h-[400px] overflow-y-auto">
                {searchData.map((i, index) => (
                  <Link
                    key={index}
                    to={`/product/${i._id}`}
                    onClick={() => {
                      setSearchTerm("");
                      setSearchData(null);
                    }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors duration-200 border-b border-divider last:border-none">
                      <img
                        src={`${backend_url}${i.images[0]?.url}`}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-surface"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-body font-medium text-ink truncate">
                          {i.name}
                        </h4>
                        <p className="price-tag text-xs text-voltage">
                          ${i.discountPrice}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {renderButton()}
        </div>
      </div>

      {/* Bottom Navbar Section */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-ink h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 text-ink"
              />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-body text-lg font-[500] select-none rounded-t-md text-ink">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer text-ink"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div> */}
          <div onClick={toggleDropDown}>
            <div className="relative cursor-pointer h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 text-ink"
              />
              <button className="cursor-pointer h-[100%] w-full flex justify-between items-center pl-10 bg-white font-body text-lg font-[500] select-none rounded-t-md text-ink">
                All Categories
              </button>
              {dropDown ? (
                <IoIosArrowUp
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer text-ink transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropDown();
                  }}
                />
              ) : (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer text-ink transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropDown();
                  }}
                />
              )}
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          <Navbar />

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart
                  size={30}
                  className="text-white/80 hover:text-white transition-colors"
                />
                <span className="absolute right-0 top-0 rounded-full bg-copper w-4 h-4 text-white font-mono text-[10px] leading-tight text-center">
                  {wishlist?.length || 0}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  className="text-white/80 hover:text-white transition-colors"
                />
                <span className="absolute right-0 top-0 rounded-full bg-copper w-4 h-4 text-white font-mono text-[10px] leading-tight text-center">
                  {cart?.length || 0}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated || isSellerAuthenticated ? (
                  <Link to={getProfileLink()}>
                    <img
                      src={
                        getAvatarUrl() ||
                        `https://ui-avatars.com/api/?name=${getDisplayName()}&background=2F5FF6&color=fff`
                      }
                      className="w-[35px] h-[35px] rounded-full object-cover border-2 border-white/20"
                      alt={getDisplayName()}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=2F5FF6&color=fff`;
                      }}
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile
                      size={30}
                      className="text-white/80 hover:text-white transition-colors"
                    />
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
