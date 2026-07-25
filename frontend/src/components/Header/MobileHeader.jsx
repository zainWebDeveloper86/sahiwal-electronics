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
            <h1 className="text-white flex items-center font-body font-[500]">
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
            <h1 className="text-white flex items-center font-body font-[500]">
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
        <h1 className="text-white flex items-center font-body font-[500]">
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
        } w-full h-[60px] bg-white z-50 top-0 left-0 shadow-sm border-b border-divider 800px:hidden`}
      >
        <div className="w-full h-full flex items-center justify-between px-3">
          <BiMenuAltLeft
            size={40}
            className="cursor-pointer text-ink"
            onClick={() => setOpenSidebar(true)}
          />

          <Link to="/">
            <span className="font-display font-[700] text-[18px] text-ink">
              Sahiwal <span className="text-voltage">Electronics</span>
            </span>
          </Link>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={28} className="text-ink" />
            <span className="absolute right-0 top-0 rounded-full bg-copper w-4 h-4 text-white font-mono text-[10px] leading-tight text-center">
              {cart?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {openSidebar && (
        <div className="fixed w-full bg-ink/40 z-20 h-full top-0 left-0">
          <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div
                className="relative mr-[15px] cursor-pointer"
                onClick={() => {
                  setOpenWishlist(true);
                  closeSidebar();
                }}
              >
                <AiOutlineHeart size={30} className="mt-5 ml-3 text-ink" />
                <span className="absolute right-0 top-0 rounded-full bg-copper w-4 h-4 text-white font-mono text-[10px] leading-tight text-center">
                  {wishlist?.length || 0}
                </span>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5 cursor-pointer text-ink"
                onClick={closeSidebar}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px] relative">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-divider rounded-full focus:border-voltage focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-ink font-body placeholder-ink/40 text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchData && searchData.length !== 0 && (
                <div className="absolute bg-white z-10 shadow-lg w-full left-0 p-3 rounded-b-md max-h-60 overflow-y-auto border border-divider">
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
                      <div className="flex items-center gap-3 p-2 hover:bg-surface rounded-lg transition-colors duration-200">
                        <img
                          src={`${backend_url}${i.images[0]?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] object-cover rounded-md bg-surface"
                        />
                        <h5 className="text-sm font-body font-medium text-ink truncate">
                          {i.name}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Navbar />

            {renderMobileButton()}

            <br />
            <br />
            <br />

            <div className="flex w-full justify-center pb-8">
              {isAuthenticated || isSellerAuthenticated ? (
                <Link to={getProfileLink()} onClick={closeSidebar}>
                  <img
                    src={
                      getAvatarUrl() ||
                      `https://ui-avatars.com/api/?name=${getDisplayName()}&background=2F5FF6&color=fff`
                    }
                    alt={getDisplayName()}
                    className="w-[60px] h-[60px] rounded-full border-[3px] border-voltage object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=2F5FF6&color=fff`;
                    }}
                  />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-ink/70 hover:text-voltage transition-colors font-body"
                    onClick={closeSidebar}
                  >
                    Login /
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[18px] text-ink/70 hover:text-voltage transition-colors font-body"
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