// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "../../styles/styles.js";
// import { backend_url } from "../../server.js";
// import Ratings from "../Common/Rating.jsx";

// const ProductDetailsInfo = ({ data, shopProducts }) => {
//   const [active, setActive] = useState(1);

//   // console.log(shopProducts);
//   //  Safe data with fallbacks
//   const safeData = {
//     description: data?.description || "No description available.",
//     reviews: data?.reviews || [],
//     ratings: data?.ratings || 0,
//     shop: {
//       _id: data?.shop?._id || "",
//       name: data?.shop?.name || "Unknown Shop",
//       avatar: data?.shop?.avatar || { url: "" },
//       description: data?.shop?.description || "No shop description available.",
//       createdAt: data?.shop?.createdAt || null,
//     },
//   };

//   //  Compute shop stats from all products of the shop
//   const shopProductsArray = shopProducts || [];
//   const totalShopProducts = shopProductsArray.length;

//   //  Shop rating = average of all product ratings
//   const shopRating =
//     totalShopProducts > 0
//       ? shopProductsArray.reduce((acc, prod) => acc + (prod.ratings || 0), 0) /
//         totalShopProducts
//       : 0;

//   //  Total shop reviews = sum of review counts of all products
//   const totalShopReviews = shopProductsArray.reduce(
//     (acc, prod) => acc + (prod.reviews?.length || 0),
//     0,
//   );

//   //  Product-specific counts
//   const totalProductReviews = safeData.reviews.length;
//   const productRating =
//     safeData.ratings ||
//     (totalProductReviews > 0
//       ? safeData.reviews.reduce((sum, rev) => sum + (rev.rating || 0), 0) /
//         totalProductReviews
//       : 0);

//   return (
//     <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
//       {/* ============================================= */}
//       {/* Tabs Header */}
//       {/* ============================================= */}
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(1)}
//           >
//             Product Details
//           </h5>
//           {active === 1 && <div className={`${styles.active_indicator}`} />}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(2)}
//           >
//             Product Reviews ({totalProductReviews})
//           </h5>
//           {active === 2 && <div className={`${styles.active_indicator}`} />}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(3)}
//           >
//             Seller Information
//           </h5>
//           {active === 3 && <div className={`${styles.active_indicator}`} />}
//         </div>
//       </div>

//       {/* ============================================= */}
//       {/* Tab 1: Product Details */}
//       {/* ============================================= */}
//       {active === 1 && (
//         <div className="py-4">
//           <p className="text-[16px] leading-8 pb-4 whitespace-pre-line">
//             {safeData.description}
//           </p>
//           {productRating > 0 && (
//             <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
//               <span className="text-sm font-medium text-gray-600">
//                 Average Rating:
//               </span>
//               <Ratings rating={productRating} />
//               <span className="text-sm text-gray-500">
//                 ({totalProductReviews}{" "}
//                 {totalProductReviews === 1 ? "review" : "reviews"})
//               </span>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ============================================= */}
//       {/* Tab 2: Product Reviews */}
//       {/* ============================================= */}
//       {active === 2 && (
//         <div className="w-full min-h-[40vh] flex flex-col py-4">
//           {totalProductReviews > 0 ? (
//             <>
//               <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold text-gray-800">
//                     {productRating.toFixed(1)}
//                   </span>
//                   <Ratings rating={productRating} />
//                 </div>
//                 <span className="text-sm text-gray-500">
//                   Based on {totalProductReviews}{" "}
//                   {totalProductReviews === 1 ? "review" : "reviews"}
//                 </span>
//               </div>

//               <div className="space-y-4 mt-4">
//                 {safeData.reviews.map((item, index) => (
//                   <div
//                     className="w-full flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
//                     key={index}
//                   >
//                     <img
//                       src={`${backend_url}${item?.user?.avatar?.url || ""}`}
//                       alt={item?.user?.name || "User"}
//                       className="w-[45px] h-[45px] rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://ui-avatars.com/api/?name=" +
//                           (item?.user?.name || "U") +
//                           "&background=random";
//                       }}
//                     />
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h1 className="font-semibold text-gray-800">
//                           {item?.user?.name || "Anonymous"}
//                         </h1>
//                         <Ratings rating={item?.rating || 0} />
//                         <span className="text-xs text-gray-400">
//                           {item?.createdAt
//                             ? new Date(item.createdAt).toLocaleDateString()
//                             : ""}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mt-1 text-sm leading-relaxed">
//                         {item?.comment || "No comment provided."}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="w-full flex flex-col items-center justify-center py-10">
//               <div className="text-5xl mb-4">📝</div>
//               <h5 className="text-xl font-medium text-gray-500">
//                 No Reviews Yet
//               </h5>
//               <p className="text-sm text-gray-400 mt-1">
//                 Be the first to review this product!
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ============================================= */}
//       {/* Tab 3: Seller Information */}
//       {/* ============================================= */}
//       {active === 3 && (
//         <div className="w-full block 800px:flex p-5 gap-6">
//           <div className="w-full 800px:w-[50%]">
//             <Link to={`/shop/preview/${safeData.shop._id}`}>
//               <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                 <img
//                   src={`${backend_url}${safeData.shop.avatar?.url || ""}`}
//                   className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-200"
//                   alt={safeData.shop.name}
//                   onError={(e) => {
//                     e.target.src =
//                       "https://ui-avatars.com/api/?name=" +
//                       safeData.shop.name +
//                       "&background=random";
//                   }}
//                 />
//                 <div>
//                   <h3 className={`${styles.shop_name} text-[18px]`}>
//                     {safeData.shop.name}
//                   </h3>
//                    {/* Dynamic shop rating */}
//                   <h5 className="text-[14px] text-gray-500">
//                     ⭐ {shopRating > 0 ? shopRating.toFixed(1) : "No ratings"} (
//                     {totalShopProducts} products)
//                   </h5>
//                 </div>
//               </div>
//             </Link>
//             <p className="pt-4 text-gray-600 text-[15px] leading-relaxed">
//               {safeData.shop.description}
//             </p>
//           </div>

//           <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex flex-col items-start 800px:items-end">
//             <div className="w-full 800px:w-auto bg-white p-4 rounded-lg shadow-sm border border-gray-100">
//               <h5 className="font-[600] text-gray-700">
//                 Joined on:{" "}
//                 <span className="font-[500] text-gray-500">
//                   {safeData.shop.createdAt
//                     ? new Date(safeData.shop.createdAt).toLocaleDateString(
//                         "en-US",
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         },
//                       )
//                     : "N/A"}
//                 </span>
//               </h5>
//               <h5 className="font-[600] text-gray-700 pt-2">
//                 Total Products:{" "}
//                 <span className="font-[500] text-gray-500">
//                   {totalShopProducts}
//                 </span>
//               </h5>
//               <h5 className="font-[600] text-gray-700 pt-2">
//                 Total Reviews:{" "}
//                 <span className="font-[500] text-gray-500">
//                   {totalShopReviews}
//                 </span>
//               </h5>
//               <Link to={`/shop/preview/${safeData.shop._id}`}>
//                 <div
//                   className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 w-full text-center`}
//                 >
//                   <h4 className="text-white">Visit Shop</h4>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetailsInfo;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { backend_url } from "../../server.js";
import Ratings from "../Common/Rating.jsx";

const ProductDetailsInfo = ({ data, shopProducts }) => {
  const [active, setActive] = useState(1);

  const safeData = {
    description: data?.description || "No description available.",
    reviews: data?.reviews || [],
    ratings: data?.ratings || 0,
    shop: {
      _id: data?.shop?._id || "",
      name: data?.shop?.name || "Unknown Shop",
      avatar: data?.shop?.avatar || { url: "" },
      description: data?.shop?.description || "No shop description available.",
      createdAt: data?.shop?.createdAt || null,
    },
  };

  //  Compute shop stats from all products of the shop
  const shopProductsArray = shopProducts || [];
  const totalShopProducts = shopProductsArray.length;

  //  Shop rating = Weighted Average (Real-World Standard)
  let totalRatingSum = 0;
  let totalReviewCount = 0;

  shopProductsArray.forEach((prod) => {
    const rating = prod.ratings || 0;
    const reviewCount = prod.reviews?.length || 0;
    totalRatingSum += rating * reviewCount;
    totalReviewCount += reviewCount;
  });

  const shopRating =
    totalReviewCount > 0 ? totalRatingSum / totalReviewCount : 0;

  //  Total shop reviews = sum of review counts of all products
  const totalShopReviews = shopProductsArray.reduce(
    (acc, prod) => acc + (prod.reviews?.length || 0),
    0,
  );

  //  Product-specific counts
  const totalProductReviews = safeData.reviews.length;
  const productRating =
    safeData.ratings ||
    (totalProductReviews > 0
      ? safeData.reviews.reduce((sum, rev) => sum + (rev.rating || 0), 0) /
        totalProductReviews
      : 0);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      {/* ============================================= */}
      {/* Tabs Header */}
      {/* ============================================= */}
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews ({totalProductReviews})
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>

      {/* ============================================= */}
      {/* Tab 1: Product Details */}
      {/* ============================================= */}
      {active === 1 && (
        <div className="py-4">
          <p className="text-[16px] leading-8 pb-4 whitespace-pre-line">
            {safeData.description}
          </p>
          {productRating > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-600">
                Average Rating:
              </span>
              <Ratings rating={productRating} />
              <span className="text-sm text-gray-500">
                ({totalProductReviews}{" "}
                {totalProductReviews === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
      )}

      {/* ============================================= */}
      {/* Tab 2: Product Reviews */}
      {/* ============================================= */}
      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col py-4">
          {totalProductReviews > 0 ? (
            <>
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {productRating.toFixed(1)}
                  </span>
                  <Ratings rating={productRating} />
                </div>
                <span className="text-sm text-gray-500">
                  Based on {totalProductReviews}{" "}
                  {totalProductReviews === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="space-y-4 mt-4">
                {safeData.reviews.map((item, index) => (
                  <div
                    className="w-full flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                    key={index}
                  >
                    <img
                      src={`${backend_url}${item?.user?.avatar?.url || ""}`}
                      alt={item?.user?.name || "User"}
                      className="w-[45px] h-[45px] rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          (item?.user?.name || "U") +
                          "&background=random";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-semibold text-gray-800">
                          {item?.user?.name || "Anonymous"}
                        </h1>
                        <Ratings rating={item?.rating || 0} />
                        <span className="text-xs text-gray-400">
                          {item?.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                        {item?.comment || "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-10">
              <div className="text-5xl mb-4">📝</div>
              <h5 className="text-xl font-medium text-gray-500">
                No Reviews Yet
              </h5>
              <p className="text-sm text-gray-400 mt-1">
                Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================= */}
      {/* Tab 3: Seller Information */}
      {/* ============================================= */}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5 gap-6">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${safeData.shop._id}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <img
                  src={`${backend_url}${safeData.shop.avatar?.url || ""}`}
                  className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-200"
                  alt={safeData.shop.name}
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" +
                      safeData.shop.name +
                      "&background=random";
                  }}
                />
                <div>
                  <h3 className={`${styles.shop_name} text-[18px]`}>
                    {safeData.shop.name}
                  </h3>
                  {/* Dynamic shop rating */}
                  <h5 className="text-[14px] text-gray-500">
                    ⭐ {shopRating > 0 ? shopRating.toFixed(1) : "No ratings"} (
                    {totalShopProducts} products)
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-4 text-gray-600 text-[15px] leading-relaxed">
              {safeData.shop.description}
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex flex-col items-start 800px:items-end">
            <div className="w-full 800px:w-auto bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h5 className="font-[600] text-gray-700">
                Joined on:{" "}
                <span className="font-[500] text-gray-500">
                  {safeData.shop.createdAt
                    ? new Date(safeData.shop.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                </span>
              </h5>
              <h5 className="font-[600] text-gray-700 pt-2">
                Total Products:{" "}
                <span className="font-[500] text-gray-500">
                  {totalShopProducts}
                </span>
              </h5>
              <h5 className="font-[600] text-gray-700 pt-2">
                Total Reviews:{" "}
                <span className="font-[500] text-gray-500">
                  {totalShopReviews}
                </span>
              </h5>
              <Link to={`/shop/preview/${safeData.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 w-full text-center`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsInfo;
