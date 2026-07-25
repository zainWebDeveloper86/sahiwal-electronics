import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/product.js";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../wishlist/Wishlist.jsx";
import DesktopHeader from "./DesktopHeader.jsx";
import MobileHeader from "./MobileHeader.jsx";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSellerAuthenticated, seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products
  useEffect(() => {
    if (!allProducts) dispatch(getAllProducts());
  }, [dispatch, allProducts]);

  // Search Handler
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = allProducts?.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filtered);
  };

  // Shared functions
  const closeSidebar = () => setOpenSidebar(false);

  return (
    <>
      {/* Desktop Header */}
      <DesktopHeader
        active={active}
        dropDown={dropDown}
        setDropDown={setDropDown}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchData={searchData}
        setSearchTerm={setSearchTerm}
        setSearchData={setSearchData}
        isAuthenticated={isAuthenticated}
        isSellerAuthenticated={isSellerAuthenticated}
        user={user}
        seller={seller}
        wishlist={wishlist}
        cart={cart}
        setOpenWishlist={setOpenWishlist}
        setOpenCart={setOpenCart}
        navigate={navigate}
      />

      {/* Mobile Header */}
      <MobileHeader
        active={active}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        setOpenWishlist={setOpenWishlist}
        setOpenCart={setOpenCart}
        cart={cart}
        wishlist={wishlist}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        searchData={searchData}
        setSearchTerm={setSearchTerm}
        setSearchData={setSearchData}
        isAuthenticated={isAuthenticated}
        isSellerAuthenticated={isSellerAuthenticated}
        user={user}
        seller={seller}
        navigate={navigate}
        closeSidebar={closeSidebar}
      />

      {/* Global Popups */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;