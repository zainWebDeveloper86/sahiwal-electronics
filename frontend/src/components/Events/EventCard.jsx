// // // import styles from "../../styles/styles.js";
// // // import CountDown from "./CountDown.jsx";
// // // import { Link } from "react-router-dom";
// // // import { toast } from "react-toastify";
// // // import { backend_url } from "../../server.js";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { addTocart } from "../../redux/actions/cart.js";

// // // const EventCard = ({ active, data, onExpire }) => {
// // //   // console.log("EventID: ", data._id)
// // //   const { cart } = useSelector((state) => state.cart);
// // //   const dispatch = useDispatch();

// // //   const addToCartHandler = (item) => {
// // //     const existingItem = cart && cart.find((i) => i._id === item._id);
// // //     if (existingItem) {
// // //       const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
// // //       dispatch(addTocart(updatedItem));
// // //       toast.success(`Quantity increased to ${updatedItem.qty}!`);
// // //     } else {
// // //       if (item.stock < 1) {
// // //         toast.error(`Out of stock!`);
// // //       } else {
// // //         dispatch(addTocart({ ...item, qty: 1 }));
// // //         toast.success("Item added to cart successfully!");
// // //       }
// // //     }
// // //   };
// // //   return (
// // //     <div
// // //       className={`w-full block bg-white rounded-lg  ${
// // //         active ? "unset" : "mb-12"
// // //       }  lg:flex p-2`}
// // //     >
// // //       <div className="w-full lg:-w[50%] m-auto">
// // //         <img src={`${backend_url}${data?.images?.[0]?.url}`} alt="" />
// // //       </div>
// // //       <div className="w-full lg:[w-50%] flex flex-col justify-center">
// // //         <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
// // //         <p>{data?.description}</p>
// // //         <div className="flex py-2 justify-between">
// // //           <div className="flex">
// // //             <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
// // //               {data?.originalPrice}$
// // //             </h5>
// // //             <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
// // //               {data?.discountPrice}$
// // //             </h5>
// // //           </div>
// // //           <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
// // //             {data?.sold_out} sold
// // //           </span>
// // //         </div>
// // //         <CountDown data={data} onExpire={onExpire} />
// // //         <br />
// // //         <div className="flex items-center">
// // //           <Link to={`/product/${data._id}?isEvent=true`}>
// // //             <div className={`${styles.button} text-[#fff]`}>See Details</div>
// // //           </Link>
// // //           <div
// // //             className={`${styles.button} text-[#fff] ml-5`}
// // //             onClick={() => addToCartHandler(data)}
// // //           >
// // //             Add to cart
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default EventCard;


// // import styles from "../../styles/styles.js";
// // import CountDown from "./CountDown.jsx";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { backend_url } from "../../server.js";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addTocart } from "../../redux/actions/cart.js";

// // const EventCard = ({ active, data, onExpire }) => {
// //   const { cart } = useSelector((state) => state.cart);
// //   const dispatch = useDispatch();

// //   const addToCartHandler = (item) => {
// //     const existingItem = cart && cart.find((i) => i._id === item._id);
// //     if (existingItem) {
// //       const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
// //       dispatch(addTocart(updatedItem));
// //       toast.success(`Quantity increased to ${updatedItem.qty}!`);
// //     } else {
// //       if (item.stock < 1) {
// //         toast.error(`Out of stock!`);
// //       } else {
// //         dispatch(addTocart({ ...item, qty: 1 }));
// //         toast.success("Item added to cart successfully!");
// //       }
// //     }
// //   };

// //   return (
// //     <div
// //       className={`w-full block bg-white rounded-lg ${
// //         active ? "unset" : "mb-12"
// //       } lg:flex p-2`}
// //     >
// //       {/* Image wrapper — fixed: correct arbitrary-value syntax + shrink control */}
// //       <div className="w-full lg:w-[50%] m-auto">
// //         <img
// //           src={`${backend_url}${data?.images?.[0]?.url}`}
// //           alt={data?.name || "Event image"}
// //           className="w-full h-auto object-cover rounded-lg"
// //         />
// //       </div>

// //       {/* Text wrapper — fixed: correct arbitrary-value syntax */}
// //       <div className="w-full lg:w-[50%] flex flex-col justify-center pl-0 lg:pl-4">
// //         <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
// //         <p>{data?.description}</p>
// //         <div className="flex py-2 justify-between">
// //           <div className="flex">
// //             <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
// //               {data?.originalPrice}$
// //             </h5>
// //             <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
// //               {data?.discountPrice}$
// //             </h5>
// //           </div>
// //           <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
// //             {data?.sold_out} sold
// //           </span>
// //         </div>
// //         <CountDown data={data} onExpire={onExpire} />
// //         <br />
// //         <div className="flex items-center">
// //           <Link to={`/product/${data._id}?isEvent=true`}>
// //             <div className={`${styles.button} text-[#fff]`}>See Details</div>
// //           </Link>
// //           <div
// //             className={`${styles.button} text-[#fff] ml-5`}
// //             onClick={() => addToCartHandler(data)}
// //           >
// //             Add to cart
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventCard;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import styles from "../../styles/styles.js";
// import CountDown from "./CountDown.jsx";
// import { backend_url } from "../../server.js";
// import { addTocart } from "../../redux/actions/cart.js";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BiDetail } from "react-icons/bi";

// const EventCard = ({ active, data, onExpire }) => {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const addToCartHandler = (item) => {
//     const existingItem = cart && cart.find((i) => i._id === item._id);
//     if (existingItem) {
//       const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
//       dispatch(addTocart(updatedItem));
//       toast.success(`Quantity increased to ${updatedItem.qty}!`);
//     } else {
//       if (item.stock < 1) {
//         toast.error(`Out of stock!`);
//       } else {
//         dispatch(addTocart({ ...item, qty: 1 }));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   return (
//     <div
//       className={`w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 ${
//         active ? "" : "mb-6"
//       }`}
//     >
//       {/* Image Section */}
//       <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
//         <img
//           src={`${backend_url}${data?.images?.[0]?.url}`}
//           alt={data?.name || "Event image"}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//           onError={(e) => {
//             e.target.src =
//               "https://via.placeholder.com/400x300?text=No+Image";
//           }}
//         />
//         {/* Discount Badge */}
//         {data?.discountPrice && data?.originalPrice && (
//           <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//             {Math.round(
//               ((data.originalPrice - data.discountPrice) / data.originalPrice) *
//                 100
//             )}
//             % OFF
//           </div>
//         )}
//         {/* Sold Out Badge */}
//         {data?.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//             <span className="text-white text-xl font-bold bg-red-600 px-6 py-2 rounded-lg">
//               Sold Out
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
//           {data?.name}
//         </h2>

//         <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[40px]">
//           {data?.description}
//         </p>

//         {/* Price & Sold */}
//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center gap-2">
//             {data?.originalPrice && (
//               <span className="text-sm text-gray-400 line-through">
//                 ${data.originalPrice}
//               </span>
//             )}
//             <span className="text-xl font-bold text-[#e94560]">
//               ${data?.discountPrice}
//             </span>
//           </div>
//           <span className="text-sm text-gray-500">
//             {data?.sold_out || 0} sold
//           </span>
//         </div>

//         {/* Countdown Timer */}
//         <div className="mt-3 p-2 bg-gray-50 rounded-lg flex items-center justify-center">
//           <CountDown data={data} onExpire={onExpire} />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3 mt-4">
//           <Link
//             to={`/product/${data._id}?isEvent=true`}
//             className="flex-1"
//           >
//             <button
//               className={`${styles.button} text-white w-full !h-[42px] text-sm flex items-center justify-center gap-2 !rounded-lg`}
//             >
//               <BiDetail size={18} />
//               Details
//             </button>
//           </Link>
//           <button
//             className={`${styles.button} text-white flex-1 !h-[42px] text-sm flex items-center justify-center gap-2 !rounded-lg`}
//             onClick={() => addToCartHandler(data)}
//             disabled={data?.stock === 0}
//           >
//             <AiOutlineShoppingCart size={18} />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../server.js";
import { addTocart } from "../../redux/actions/cart.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";

const EventCard = ({ active, data, onExpire }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    const existingItem = cart && cart.find((i) => i._id === item._id);
    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
      dispatch(addTocart(updatedItem));
      toast.success(`Quantity increased to ${updatedItem.qty}!`);
    } else {
      if (item.stock < 1) {
        toast.error(`Out of stock!`);
      } else {
        dispatch(addTocart({ ...item, qty: 1 }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full h-[400px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
        active ? "" : "mb-6"
      }`}
    >
      {/* Image Section — matched to ProductCard's compact sizing */}
      <div className="relative w-full h-[170px] overflow-hidden">
        <img
          src={`${backend_url}${data?.images?.[0]?.url}`}
          alt={data?.name || "Event image"}
          // className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        {data?.discountPrice && data?.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {Math.round(
              ((data.originalPrice - data.discountPrice) / data.originalPrice) *
                100,
            )}
            % OFF
          </div>
        )}
        {data?.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-bold bg-red-600 px-4 py-1 rounded-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section — no reserved min-height, single-line truncation */}
      <div className="p-3 flex flex-col h-[230px]">
        <h2 className="text-[15px] font-[500] text-gray-800 truncate">
          {data?.name}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
          {data?.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {data?.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${data.originalPrice}
              </span>
            )}
            <span className="text-[17px] font-bold text-[#e94560]">
              ${data?.discountPrice}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {data?.sold_out || 0} sold
          </span>
        </div>

        {/* Countdown — compact, no extra box padding */}
        <div className="mt-2 flex items-center justify-center">
          <CountDown data={data} onExpire={onExpire} />
        </div>

        {/* Buttons pinned to bottom via mt-auto */}
        <div className="flex items-center gap-2 mt-auto">
          <Link to={`/product/${data._id}?isEvent=true`} className="flex-1">
            <button
              className={`${styles.button} text-white w-full !h-[36px] text-xs flex items-center justify-center gap-1 !rounded-lg`}
            >
              <BiDetail size={16} />
              Details
            </button>
          </Link>
          <button
            className={`${styles.button} text-white flex-1 !h-[36px] text-xs flex items-center justify-center gap-1 !rounded-lg`}
            onClick={() => addToCartHandler(data)}
            disabled={data?.stock === 0}
          >
            <AiOutlineShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;