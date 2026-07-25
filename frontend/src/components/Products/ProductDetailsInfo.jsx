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

  const shopProductsArray = shopProducts || [];
  const totalShopProducts = shopProductsArray.length;

  let totalRatingSum = 0;
  let totalReviewCount = 0;
  shopProductsArray.forEach((prod) => {
    const rating = prod.ratings || 0;
    const reviewCount = prod.reviews?.length || 0;
    totalRatingSum += rating * reviewCount;
    totalReviewCount += reviewCount;
  });
  const shopRating = totalReviewCount > 0 ? totalRatingSum / totalReviewCount : 0;

  const totalShopReviews = shopProductsArray.reduce(
    (acc, prod) => acc + (prod.reviews?.length || 0),
    0,
  );

  const totalProductReviews = safeData.reviews.length;
  const productRating =
    safeData.ratings ||
    (totalProductReviews > 0
      ? safeData.reviews.reduce((sum, rev) => sum + (rev.rating || 0), 0) / totalProductReviews
      : 0);

  const tabClass = (tabId) =>
    `text-[16px] px-1 leading-5 font-body font-[600] cursor-pointer 800px:text-[18px] ${
      active === tabId ? "text-voltage" : "text-ink/60"
    }`;

  return (
    <div className="bg-surface px-3 800px:px-10 py-2 rounded-lg">
      <div className="w-full flex justify-between border-b border-divider pt-10 pb-2">
        <div className="relative">
          <h5 className={tabClass(1)} onClick={() => setActive(1)}>
            Product Details
          </h5>
          {active === 1 && <div className="absolute bottom-[-11px] left-0 h-[3px] w-full bg-voltage" />}
        </div>
        <div className="relative">
          <h5 className={tabClass(2)} onClick={() => setActive(2)}>
            Reviews ({totalProductReviews})
          </h5>
          {active === 2 && <div className="absolute bottom-[-11px] left-0 h-[3px] w-full bg-voltage" />}
        </div>
        <div className="relative">
          <h5 className={tabClass(3)} onClick={() => setActive(3)}>
            Seller Info
          </h5>
          {active === 3 && <div className="absolute bottom-[-11px] left-0 h-[3px] w-full bg-voltage" />}
        </div>
      </div>

      {active === 1 && (
        <div className="py-4">
          <p className="text-[15px] font-body text-ink/70 leading-8 pb-4 whitespace-pre-line">
            {safeData.description}
          </p>
          {productRating > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-divider">
              <span className="text-sm font-body font-medium text-ink/60">Average Rating:</span>
              <Ratings rating={productRating} />
              <span className="text-sm font-body text-ink/40">
                ({totalProductReviews} {totalProductReviews === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
      )}

      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col py-4">
          {totalProductReviews > 0 ? (
            <>
              <div className="flex items-center gap-4 pb-4 border-b border-divider">
                <div className="flex items-center gap-2">
                  <span className="price-tag text-2xl text-ink">{productRating.toFixed(1)}</span>
                  <Ratings rating={productRating} />
                </div>
                <span className="text-sm font-body text-ink/50">
                  Based on {totalProductReviews} {totalProductReviews === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="space-y-4 mt-4">
                {safeData.reviews.map((item, index) => (
                  <div
                    className="w-full flex items-start gap-3 p-3 bg-white rounded-lg border border-divider"
                    key={index}
                  >
                    <img
                      src={`${backend_url}${item?.user?.avatar?.url || ""}`}
                      alt={item?.user?.name || "User"}
                      className="w-[45px] h-[45px] rounded-full object-cover border-2 border-divider flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          (item?.user?.name || "U") +
                          "&background=2F5FF6&color=fff";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-body font-semibold text-ink">
                          {item?.user?.name || "Anonymous"}
                        </h1>
                        <Ratings rating={item?.rating || 0} />
                        <span className="text-xs font-body text-ink/40">
                          {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <p className="text-ink/60 font-body mt-1 text-sm leading-relaxed">
                        {item?.comment || "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-10">
              <h5 className="text-xl font-display font-medium text-ink/50">No Reviews Yet</h5>
              <p className="text-sm font-body text-ink/40 mt-1">
                Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5 gap-6">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${safeData.shop._id}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-divider hover:border-voltage/40 transition-colors">
                <img
                  src={`${backend_url}${safeData.shop.avatar?.url || ""}`}
                  className="w-[60px] h-[60px] rounded-full object-cover border-2 border-divider"
                  alt={safeData.shop.name}
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" + safeData.shop.name + "&background=2F5FF6&color=fff";
                  }}
                />
                <div>
                  <h3 className={`${styles.shop_name} text-[18px]`}>{safeData.shop.name}</h3>
                  <h5 className="text-[14px] font-body text-ink/50">
                    ⭐ {shopRating > 0 ? shopRating.toFixed(1) : "No ratings"} ({totalShopProducts} products)
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-4 text-ink/60 font-body text-[15px] leading-relaxed">
              {safeData.shop.description}
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex flex-col items-start 800px:items-end">
            <div className="w-full 800px:w-auto bg-white p-4 rounded-lg border border-divider">
              <h5 className="font-body font-[600] text-ink/70">
                Joined on:{" "}
                <span className="font-[500] text-ink/50">
                  {safeData.shop.createdAt
                    ? new Date(safeData.shop.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </h5>
              <h5 className="font-body font-[600] text-ink/70 pt-2">
                Total Products: <span className="font-[500] text-ink/50">{totalShopProducts}</span>
              </h5>
              <h5 className="font-body font-[600] text-ink/70 pt-2">
                Total Reviews: <span className="font-[500] text-ink/50">{totalShopReviews}</span>
              </h5>
              <Link to={`/shop/preview/${safeData.shop._id}`}>
                <div className="mt-3 w-full h-[40px] rounded-md bg-voltage flex items-center justify-center hover:opacity-90 transition-opacity">
                  <h4 className="text-white font-body font-[500]">Visit Shop</h4>
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