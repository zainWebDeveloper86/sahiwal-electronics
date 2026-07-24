// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "../../styles/styles.js";
// import { categoriesData } from "../../static/data.jsx";
// import {
//   AiOutlineHeart,
//   AiOutlineSearch,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import DropDown from "./DropDown.jsx";
// import Navbar from "./Navbar.jsx";
// import Cart from "../Cart/Cart.jsx";
// import Wishlist from "../wishlist/Wishlist.jsx";
// import { RxCross1 } from "react-icons/rx";
// import { backend_url } from "../../server.js";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../../redux/actions/product.js";

// const Header = () => {
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   const { isSellerAuthenticated } = useSelector((state) => state.seller);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchData, setSearchData] = useState(null);
//   const [active, setActive] = useState(false);
//   const [dropDown, setDropDown] = useState(false);
//   const [openCart, setOpenCart] = useState(false);
//   const [openWishlist, setOpenWishlist] = useState(false);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { allProducts } = useSelector((state) => state.products);
//   const { cart } = useSelector((state) => state.cart);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 70) {
//         setActive(true);
//       } else {
//         setActive(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // cleanup-when component unmounts, listener removes
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (!allProducts) {
//       dispatch(getAllProducts());
//     }
//   }, [dispatch, allProducts]);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     const filteredProducts =
//       allProducts &&
//       allProducts.filter((product) =>
//         product.name.toLowerCase().includes(term.toLowerCase()),
//       );
//     setSearchData(filteredProducts);
//   };

//   const handleSellerLogin = (e) => {
//     if (isAuthenticated === true && user?.role === "user") {
//       e.preventDefault();
//       toast.error(
//         "Please logout from your user account first to continue as a seller",
//       );
//       return;
//     }
//     navigate("/shop-create");
//   };


//   return (
//     <>
//       <div className={`${styles.section}`}>
//         <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
//           <div>
//             <Link to="/">
//               <img
//                 src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//                 alt=""
//               />
//             </Link>
//           </div>

//           {/* search box*/}
//           <div className="w-[50%] relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-[#3957db] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400 text-sm"
//               />
//               <AiOutlineSearch
//                 size={22}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3957db] cursor-pointer transition-colors duration-300"
//               />
//             </div>

//             {/* Search Results Dropdown - Updated UI */}
//             {searchData && searchData.length !== 0 && (
//               <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[9] max-h-[400px] overflow-y-auto">
//                 {searchData.map((i, index) => (
//                   <Link
//                     to={`/product/${i._id}`}
//                     key={index}
//                     onClick={() => {
//                       setSearchTerm("");
//                       setSearchData(null);
//                     }}
//                   >
//                     <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-none">
//                       <img
//                         src={`${backend_url}${i.images[0]?.url}`}
//                         alt=""
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h4 className="text-sm font-medium text-gray-800 truncate">
//                           {i.name}
//                         </h4>
//                         <p className="text-xs text-gray-500">
//                           ${i.discountPrice}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Role-based Button: Become Seller / Dashboard */}
//           {!isAuthenticated ? (
//             // Guest user → Become Seller
//             <div
//               className={`${styles.button}`}
//               onClick={() => navigate("/shop-create")}
//             >
//               <h1 className="text-[#fff] flex items-center">
//                 Become Seller
//                 <IoIosArrowForward className="ml-1" />
//               </h1>
//             </div>
//           ) : user?.role === "user" ? (
//             // User (logged in) → Become Seller
//             <div
//               className={`${styles.button}`}
//               onClick={() => navigate("/shop-create")}
//             >
//               <h1 className="text-[#fff] flex items-center">
//                 Become Seller
//                 <IoIosArrowForward className="ml-1" />
//               </h1>
//             </div>
//           ) : user?.role === "seller" ? (
//             // Seller → Dashboard
//             <Link to="/dashboard">
//               <div className={`${styles.button}`}>
//                 <h1 className="text-[#fff] flex items-center">
//                   Dashboard
//                   <IoIosArrowForward className="ml-1" />
//                 </h1>
//               </div>
//             </Link>
//           ) : user?.role === "admin" ? (
//             // Admin → Admin Dashboard
//             <Link to="/admin/dashboard">
//               <div className={`${styles.button}`}>
//                 <h1 className="text-[#fff] flex items-center">
//                   Dashboard
//                   <IoIosArrowForward className="ml-1" />
//                 </h1>
//               </div>
//             </Link>
//           ) : null}
//         </div>
//       </div>

//       <div
//         className={`${
//           active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
//         } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
//       >
//         <div
//           className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
//         >
//           <div onClick={() => setDropDown(!dropDown)}>
//             <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
//               <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
//               <button
//                 className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
//               >
//                 All Categories
//               </button>
//               <IoIosArrowDown
//                 size={20}
//                 className="absolute right-2 top-4 cursor-pointer"
//                 onClick={() => setDropDown(!dropDown)}
//               />
//               {dropDown ? (
//                 <DropDown
//                   categoriesData={categoriesData}
//                   setDropDown={setDropDown}
//                 />
//               ) : null}
//             </div>
//           </div>
//           <div className={`${styles.noramlFlex}`}>
//             <Navbar />
//           </div>

//           <div className="flex">
//             <div className={`${styles.noramlFlex}`}>
//               <div
//                 className="relative cursor-pointer mr-[15px]"
//                 onClick={() => setOpenWishlist(true)}
//               >
//                 <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
//                 <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
//                   {wishlist && wishlist.length}
//                 </span>
//               </div>
//             </div>

//             <div className={`${styles.noramlFlex}`}>
//               <div
//                 className="relative cursor-pointer mr-[15px]"
//                 onClick={() => setOpenCart(true)}
//               >
//                 <AiOutlineShoppingCart
//                   size={30}
//                   color="rgb(255 255 255 / 83%)"
//                 />
//                 <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
//                   {cart && cart.length}
//                 </span>
//               </div>
//             </div>

//             <div className={`${styles.noramlFlex}`}>
//               <div className="relative cursor-pointer mr-[15px]">
//                 {isAuthenticated ? (
//                   // Logged in → show avatar with role-based navigation
//                   <Link
//                     to={
//                       user?.role === "admin"
//                         ? "/admin/dashboard"
//                         : user?.role === "seller"
//                           ? "/dashboard"
//                           : "/profile"
//                     }
//                   >
//                     <img
//                       src={`${backend_url}${user?.avatar?.url}`}
//                       className="w-[35px] h-[35px] rounded-full object-cover border-2 border-white"
//                       alt={user?.name || "User"}
//                       onError={(e) => {
//                         e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`;
//                       }}
//                     />
//                   </Link>
//                 ) : (
//                   // Guest → profile icon linking to login
//                   <Link to="/login">
//                     <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

//             {openWishlist ? (
//               <Wishlist setOpenWishlist={setOpenWishlist} />
//             ) : null}
//           </div>
//         </div>
//       </div>

//       {/* mobile header */}
//       <div
//         className={`${
//           active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
//         }
//       w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
//       >
//         <div className="w-full flex items-center justify-between">
//           <div>
//             <BiMenuAltLeft
//               size={40}
//               className="ml-4"
//               onClick={() => setOpen(true)}
//             />
//           </div>
//           <div>
//             <Link to="/">
//               <img
//                 src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//                 alt=""
//                 className="mt-3 cursor-pointer"
//               />
//             </Link>
//           </div>
//           <div>
//             <div
//               className="relative mr-[20px]"
//               onClick={() => setOpenCart(true)}
//             >
//               <AiOutlineShoppingCart size={30} />
//               <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
//                 {/* {cart && cart.length} */}
//               </span>
//             </div>
//           </div>
//           {/* cart popup */}
//           {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

//           {/* wishlist popup */}
//           {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
//         </div>

//         {/* header sidebar */}
//         {open && (
//           <div
//             className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
//           >
//             <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
//               <div className="w-full justify-between flex pr-3">
//                 <div>
//                   <div
//                     className="relative mr-[15px]"
//                     onClick={() => setOpenWishlist(true) || setOpen(false)}
//                   >
//                     <AiOutlineHeart size={30} className="mt-5 ml-3" />
//                     <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
//                       {/* {wishlist && wishlist.length} */}
//                     </span>
//                   </div>
//                 </div>
//                 <RxCross1
//                   size={30}
//                   className="ml-4 mt-5"
//                   onClick={() => setOpen(false)}
//                 />
//               </div>

//               <div className="my-8 w-[92%] m-auto h-[40px relative]">
//                 <input
//                   type="search"
//                   placeholder="Search Product..."
//                   className="h-[46px] w-full px-5 pr-12 bg-white border-2 border-gray-200 rounded-full focus:border-[#3957db] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400 text-sm"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 {/* {searchData && (
//                   <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
//                     {searchData.map((i, index) => {
//                       const d = i.name;

//                       const Product_name = d.replace(/\s+/g, "-");
//                       return (
//                         <Link to={`/product/${Product_name}`} key={index}>
//                           <div className="flex items-center">
//                             <img
//                               src={i.image_Url[0]?.url}
//                               alt=""
//                               className="w-[50px] mr-2"
//                             />
//                             <h5>{i.name}</h5>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )} */}

//                 {searchData && searchData.length !== 0 && (
//                   <div className="absolute bg-[#fff] z-10 shadow-lg w-full left-0 p-3 rounded-b-md max-h-60 overflow-y-auto">
//                     {searchData.map((i, index) => {
//                       // Safe image URL (fallback for image_Url vs images)
//                       // const imgUrl =
//                       //   i.image_Url?.[0]?.url ||
//                       //   i.images?.[0]?.url ||
//                       //   "https://via.placeholder.com/50";
//                       return (
//                         <Link
//                           to={`/product/${i._id}`} // ✅ ID use karo
//                           key={index}
//                           onClick={() => {
//                             setSearchTerm("");
//                             setSearchData(null);
//                           }}
//                         >
//                           <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//                             <img
//                               src={`${backend_url}${i.images[0]?.url}`}
//                               alt=""
//                               className="w-[50px] h-[50px] object-cover rounded-md"
//                             />
//                             <h5 className="text-sm font-medium text-gray-700 truncate">
//                               {i.name}
//                             </h5>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               <Navbar />
//               <div className={`${styles.button} ml-4 !rounded-[4px]`}>
//                 <Link to="/shop-create">
//                   <h1 className="text-[#fff] flex items-center">
//                     Become Seller <IoIosArrowForward className="ml-1" />
//                   </h1>
//                 </Link>
//               </div>
//               <br />
//               <br />
//               <br />

//               <div className="flex w-full justify-center">
//                 {isAuthenticated ? (
//                   <div>
//                     <Link to="/profile">
//                       <img
//                         src={`${backend_url}${user?.avatar?.url}`}
//                         alt=""
//                         className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
//                       />
//                     </Link>
//                   </div>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       className="text-[18px] pr-[10px] text-[#000000b7]"
//                     >
//                       Login /
//                     </Link>
//                     <Link
//                       to="/sign-up"
//                       className="text-[18px] text-[#000000b7]"
//                     >
//                       Sign up
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;


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