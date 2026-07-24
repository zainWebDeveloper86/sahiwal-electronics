import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/product.js";
import { getAllEvents } from "../../redux/actions/event.js";
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import Ratings from "../Common/Rating.jsx";
import { backend_url } from "../../server.js";
import Loader from "../Common/Loader.jsx";

const ShopProfileData = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { allProducts, loading: productsLoading } = useSelector(
    (state) => state.products,
  );
  const { allEvents, loading: eventsLoading } = useSelector(
    (state) => state.events,
  );

  const [active, setActive] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getAllProducts());
      dispatch(getAllEvents());
    }
  }, [dispatch, id]);

  const shopProducts = allProducts?.filter((p) => p.shopId === id) || [];
  const shopEvents = allEvents?.filter((e) => e.shopId === id) || [];

  const totalReviews = shopProducts.reduce(
    (acc, p) => acc + (p.reviews?.length || 0),
    0,
  );
  const totalRatingSum = shopProducts.reduce(
    (acc, p) => acc + (p.ratings || 0) * (p.reviews?.length || 0),
    0,
  );
  const shopRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

  const allReviews = shopProducts
    .flatMap((product) => product.reviews || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (productsLoading || eventsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center gap-6">
          <button
            className={`cursor-pointer font-semibold text-[18px] transition-colors ${
              active === 1
                ? "text-[#e94560] border-b-2 border-[#e94560] pb-2"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActive(1)}
          >
            Shop Products ({shopProducts.length})
          </button>
          <button
            className={`cursor-pointer font-semibold text-[18px] transition-colors ${
              active === 2
                ? "text-[#e94560] border-b-2 border-[#e94560] pb-2"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActive(2)}
          >
            Running Events ({shopEvents.length})
          </button>
          <button
            className={`cursor-pointer font-semibold text-[18px] transition-colors ${
              active === 3
                ? "text-[#e94560] border-b-2 border-[#e94560] pb-2"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActive(3)}
          >
            Shop Reviews ({totalReviews})
          </button>
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
              <span className="text-[#fff]">Go Dashboard</span>
            </div>
          </Link>
        )}
      </div>

      {active === 1 && (
        <div className="mt-6">
          {shopProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]">
              {shopProducts.map((product) => (
                <ProductCard data={product} key={product._id} isShop={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">
                No products available for this shop yet.
              </p>
            </div>
          )}
        </div>
      )}

      {active === 2 && (
        <div className="mt-6">
          {shopEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]">
              {shopEvents.map((event) => (
                <ProductCard
                  data={event}
                  key={event._id}
                  isShop={true}
                  isEvent={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No running events for this shop.</p>
            </div>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="mt-6">
          {allReviews.length > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-800">
                  {shopRating.toFixed(1)}
                </span>
                <Ratings rating={shopRating} />
                <span className="text-sm text-gray-500">
                  Based on {totalReviews} review{totalReviews > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {allReviews.map((item, index) => (
                  <div
                    className="w-full flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                    key={index}
                  >
                    <img
                      src={`${backend_url}${item.user?.avatar?.url || ""}`}
                      alt={item.user?.name || "User"}
                      className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          (item.user?.name || "U") +
                          "&background=random";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-semibold text-gray-800">
                          {item.user?.name || "Anonymous"}
                        </h1>
                        <Ratings rating={item.rating || 0} />
                        <span className="text-xs text-gray-400">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "Recently"}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                        {item.comment || "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No reviews for this shop yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
